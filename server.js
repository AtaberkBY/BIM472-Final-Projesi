const express = require('express');
const path = require('path');
const fs = require('fs');
const sql = require('mssql');
const multer = require('multer');
const jwt = require('jsonwebtoken');
const User = require('./models/Users.js');
const News = require('./models/News.js');
const cookieParser = require('cookie-parser');
const { type } = require('os');
const $ = require('jquery');
const app = express();
const port = 3000;

const SECRET_KEY = 'JWTKey';
const upload = multer({ storage: multer.memoryStorage() });



const config = {
  user: 'sa',
  password: '123456',
  server: 'localhost',
  database: 'GHDB',
  options: {
    encrypt: true,
    trustServerCertificate: true
  }
};




app.use('/style', express.static(path.join(__dirname, 'style')));
app.use('/script', express.static(path.join(__dirname, 'script')));
app.use('/logo', express.static(path.join(__dirname, 'style/logo')));
app.use('/bootstrap', express.static(path.join(__dirname, 'node_modules/bootstrap/dist')));
app.use('/bootstrap', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')));
app.use('/jquery', express.static(path.join(__dirname, 'node_modules/jquery/dist')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(upload.single('image'));
const pool = new sql.ConnectionPool(config);
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'home.html'));
});

app.get('/home.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'home.html'));
});

app.get('/about.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'about.html'));
});

app.get('/contact.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'contact.html'));
});
app.get('/createNews.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'createNews.html'));
});
app.get('/getCards', async (req, res) => {
  try {
    await sql.connect(config);

    const result = await sql.query('SELECT * FROM News ORDER BY News.date desc');
    const dataWithBase64 = result.recordset.map(row => {
      const base64Image = row.imageData.toString('base64');
      return { row, base64Image };
    })


    res.json(dataWithBase64);
  } catch (error) {
    console.error('Error retrieving data:', error);
    res.status(500).json({ error: 'Internal server error' });
  } finally {
    await sql.close();
  }
});
app.post('/addNews', async (req, res) => {
  if (!req.body.name || !req.body.detail) {
    res.status(400).send('Name and detail are required');
    return;
}

if (!req.file) {
    res.status(400).send('Image file is required');
    return;
}

  const name = req.body.name
  const detail = req.body.detail;
  const image = req.file.buffer;



  const query = `INSERT INTO news (name, detail, date, imageData) VALUES (@name, @detail, @date, @imageData)`;

  const params = [
    { name: 'name', type: sql.NVarChar, value: name },
    { name: 'detail', type: sql.NVarChar, value: detail },
    { name: 'imageData', type: sql.VarBinary(sql.MAX), value: image },
    { name: 'date', type: sql.Date, value: new Date() },
  ];

  let connection;

  try {
    connection = await sql.connect(config);
    const request = connection.request();
    console.log(params)
    params.forEach(param => {
      request.input(param.name, param.type, param.value);
    });
    await request.query(query);
    res.send({ success: true, message: 'Haber girildi!' });
  } catch (err) {
    console.log('Haber girilirken hata:' + err);
    res.status(500).send({ error: 'Veritabanı Hatası' })
  }
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ success: false, message: 'Kullanıcı adı ve şifre alanları girilmelidir.' });
  }
  const result = await checkLogin(username, password);
  if (result.success) {
    res.cookie('token', result.token);
    res.json(result);
  }
  if (!result.success) {
    res.json(result);
  }


});

app.post('/getUser', async (req, res) => {
  const { username } = req.body;
  try {
    await sql.connect(config);
    const result = await sql.query`SELECT * FROM Users WHERE username = ${username}`;
    var user = result.recordset[0];
    res.status(200).json({ success: true, message: 'Kullanıcı başarıyla getirildi', user });
  } catch {

  }
})

app.post('/deleteCard', async (req, res) => {
  const { id } = req.body;
  try {
    await sql.connect(config);

    const result = await sql.query`DELETE FROM News WHERE id = ${id}`;

    res.status(200).json({ success: true, message: 'Card deleted successfully' });
  } catch (error) {
    console.error('Error deleting card:', error);
    res.status(500).json({ success: false, message: 'An error occurred while deleting the card' });
  } finally {

    await sql.close();
  }
});

app.post('/updateCardGetData', async (req, res) => {
  const { id } = req.body;
  try {
    await sql.connect(config);
    const result = await sql.query`SELECT * FROM News WHERE id = ${id}`;
    data = result.recordset[0];

    res.status(200).json({ success: true, message: 'haber verileri düzenlenmek için getirildi.', data })
  } catch {
    res.status(500).json({ success: false, message: 'Haber verisi alınırken bir hata oldu.' });
  }
})

app.post('/deleteMessage' , async (req,res) => {
  const id = req.body.id;

  try {
    await sql.connect(config);
    const result = await sql.query`DELETE FROM Messages WHERE id = ${id}`;
    res.status(200).json({success:true,message:'Mesaj başarıyla silindi.'});
  } catch (error) {
    console.log(error);
    res.status(500).json({success:false,message:'Mesaj silinirken bir hata oldu.'});
  }
})

app.post('/updateCard', async (req, res) => {
  const id = req.body.id;
  const name = req.body.name;
  const detail = req.body.detail;
  let image = '';
  if (req.file?.buffer) {
    image = req.file.buffer;
  }
  try {
    const pool = await sql.connect(config);
    let sqlQuery = '';
    let params = [];

    if (image) {
      sqlQuery = 'UPDATE News SET name = @name, detail = @detail, imageData = @image WHERE id = @id';
      params = {
        name: { type: sql.NVarChar, value: name },
        detail: { type: sql.NVarChar, value: detail },
        image: { type: sql.VarBinary(sql.MAX), value: image },
        id: { type: sql.Int, value: id }
      };

      await pool.request().input('id', sql.Int, id)
        .input('name', sql.NVarChar, name)
        .input('detail', sql.NVarChar, detail)
        .input('image', sql.VarBinary(sql.MAX), image)
        .query(sqlQuery);


    } else {
      sqlQuery = 'UPDATE News SET name = @name, detail = @detail WHERE id = @id';
      params = {
        name: { type: sql.NVarChar, value: name },
        detail: { type: sql.NVarChar, value: detail },
        id: { type: sql.Int, value: id }
      };

      await pool.request().input('id', sql.Int, id)
        .input('name', sql.NVarChar, name)
        .input('detail', sql.NVarChar, detail)
        .query(sqlQuery);

    }

    res.status(200).json({ success: true, message: 'Haber başarıyla güncellendi.' });



  } catch (error) {
    console.log('Error updating card:', error);
    res.status(500).json({ success: false, message: 'Kart güncellenirken bir hata oldu.' });
  }
})

app.post('/addMessage', async (req, res) => {
  const { name, email, message } = req.body;
  const date = new Date();
  console.log("name:"+name+", email:"+email+", message:"+message+", date:"+date);
  try {
    await sql.connect(config);
    const result = await sql.query`INSERT INTO Messages (name, email, message, sendDate) VALUES (${name}, ${email}, ${message}, ${date})`;
    res.status(200).json({ success: true, message: 'Mesaj başarıyla gönderildi.' });
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: 'Mesaj gönderilirken bir hata oldu.' });
  }

})

app.get('/getMessage', async (req,res) => {
  try {
    await sql.connect(config);
    const result = await sql.query`SELECT * FROM Messages`;
    res.status(200).json({ success: true, message: 'Mesajlar başarıyla getirildi.', messages: result.recordset });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: 'Mesajlar getirilirken bir hata oldu.' });
  }
});

// const data = JSON.parse(fs.readFileSync('cardData.json', 'utf8'));
// sql.connect(config, (err) => {
//   if (err) {
//     console.error('Error connecting to the database:', err);
//     return;
//   }
//   console.log('Connected to the database');


//   const insertData = async (data) => {
//     try {




//       for (let item of data) {
//         const { name,detail,date,image} = item;

//         const imageDataBLOB = fs.readFileSync(path.resolve(__dirname, image));
//         const request = new sql.Request();


//         const query = `
//           INSERT INTO News ( name,detail,date,imageData)
//           VALUES (@name,@detail,@date,@imageData)
//         `;
//         console.log(imageDataBLOB);
//         request.input('name',sql.NVarChar(50),name);
//         request.input('detail',sql.NVarChar(1000),detail);
//         request.input('date', sql.Date, date);
//         request.input('imageData', sql.VarBinary(sql.MAX), imageDataBLOB);

//         await request.query(query);
//         console.log('Data inserted successfully:', item);
//       }

//     } catch (err) {
//       console.error('Error inserting data:', err);
//     } finally {

//       sql.close();
//     }
//   };


//   insertData(data);
// });


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});

async function checkLogin(username, password) {
  try {
    await sql.connect(config);

    const user = await User.findOne({ where: { username, password } });

    if (user !== null) {
      const token = jwt.sign({ username: user.username }, SECRET_KEY, { expiresIn: '1h' });
      return { success: true, message: 'Login successful', token };

    } else {
      return { success: false, message: 'Geçersiz Kullanıcı adı veya şifre' };
    }
  } catch (err) {
    console.error('Error while checking login:', err);
  } finally {
    await sql.close();
  }
}