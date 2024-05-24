//veri tabanında mevcut olan her bir haber nesnesi için ayrı card oluşturup kullanıcı türüne göre o karta ekstra buttonlar ekleyen fonksiyon
async function getCards(userType){
	
	try{
        var response = await fetch('http://localhost:3000/getCards', {
            method: 'GET',
            headers: {
            'Content-Type':'application/json'
            },
        });
        var result = await response.json();
		var userType = await getUserType();
		if (result.length>=1) {
            const container = document.getElementById('card-container');
				result.forEach((card) => {
				const cardElement = document.createElement('div');
				cardElement.classList.add('card', 'mb-2');

				const buttonContainer = document.createElement('div');
				buttonContainer.style.display = 'flex';
				buttonContainer.style.justifyContent = 'space-between';
				buttonContainer.style.alignItems = 'center';

				const cardDate = document.createElement('p');
				cardDate.classList.add('card-text');
				cardDate.textContent = `Yayınlanma Tarihi: ${card.row.date}`;
				const cardImage = document.createElement('img');
				cardImage.classList.add('card-img-top');
				cardImage.src = `data:image/png;base64,${card.base64Image}`;
				cardImage.alt = 'Post Image';

				const cardBody = document.createElement('div');
				cardBody.classList.add('card-body');

				const cardTitle = document.createElement('h2');
				cardTitle.classList.add('card-title');
				cardTitle.textContent = card.row.name;

				const cardText = document.createElement('p');
				cardText.classList.add('card-text');
				cardText.textContent = card.row.detail;

		
				buttonContainer.appendChild(cardDate);

				cardBody.appendChild(cardTitle);
				cardBody.appendChild(cardText);
				cardBody.appendChild(buttonContainer);

				
				cardElement.appendChild(cardImage);
				cardElement.appendChild(cardBody);

				container.appendChild(cardElement);


				if(userType === 'admin'){
				const deleteButton = document.createElement('button');
				deleteButton.textContent = 'Sil';
				deleteButton.id = 'deleteButton';
				deleteButton.classList = 'btn btn-danger';
				deleteButton.addEventListener('click', async () => {
					const isConfirmed = window.confirm ('Silmek istediğinize emin misiniz?');

					if(isConfirmed){
						deleteCard(card.row.id);
					}
				});

				const updateButton = document.createElement('button');
				updateButton.textContent = 'Düzenle';
				updateButton.id = 'updateButton';
				updateButton.classList = 'btn btn-primary';
				updateButton.style.marginRight = '10px';
				updateButton.addEventListener('click', async () => {
					window.location.href = '/createNews.html?id='+card.row.id;

				});


				const buttonGroup = document.createElement('div');
				buttonGroup.style.display='flex';
				buttonGroup.appendChild(updateButton);
				buttonGroup.appendChild(deleteButton);
				buttonContainer.appendChild(buttonGroup);
				}
				

			
			})
          }
    } catch (error) {
    }


};

//kullanıcı adı ile oluşturulan benzersiz tokenin decode edildiği fonksiyon
function decodeJWT(jwtToken) {
    if(jwtToken === null){
        return false;
    }
    try {
        const [header, payload, signature] = jwtToken.split('.');

        const decodedPayload = JSON.parse(atob(payload));

        return decodedPayload.username;
    } catch (error) {
        console.error('Error decoding JWT:', error);
        return null;
    }
}

//kullanıcın türünün elde edildiği fonksiyon
async function getUserType(){
	const token = localStorage.getItem('token');
	const username = decodeJWT(token);
	if(username === false){
		return false;
	}
	try {
	var response = await fetch('http://localhost:3000/getUser',{
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({username})
	});
	var result = await response.json();

	return result.user.userType;
	} catch {

	}
}

//Haberi silmek için kullanılan fonksiyon
async function deleteCard(id){
    try{
        var response = await fetch('http://localhost:3000/deleteCard', {
            method: 'POST',
            headers: {
            'Content-Type':'application/json'
            },
            body: JSON.stringify({id})
            
        });
        var result = await response.json();
        if (result.success) {
            window.location.reload();
          }
    } catch (error) {
        console.log('Error:', error);
    }

}


document.addEventListener('DOMContentLoaded', async function(){
    getCards();
	

  });
 
