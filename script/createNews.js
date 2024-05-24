//Yeni bir haber girildiğinde çalışan fonksiyon
document.getElementById('createCardBtn').addEventListener('click', function() {
    const formData = new FormData();
    const imageInput = document.getElementById('imageInput').files[0];
    const titleInput = document.getElementById('titleInput').value;
    const detailInput = document.getElementById('detailInput').value;
    var errorMsg = document.getElementById('newsErrorMsg');
    if(imageInput === undefined || titleInput === undefined || detailInput === undefined){
        errorMsg.style.display = "block";
        errorMsg.textContent = "Bütün alanlar doldurulmalıdır.";
        return;
    }
    

    formData.append('name',titleInput);
    formData.append('detail',detailInput);
    formData.append('image', imageInput);

    fetch('/addNews', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        errorMsg.style.color = 'green';
        errorMsg.textContent = data.message;        
    })
    .catch(error => {
        console.log('Error:', error);
    });
})

//Haberin içeriğini düzenlemek için önce halihazırda var olan bilgileri getiren fonksiyon
async function updateCardGetData(id){

    const createBtn = document.getElementById('createCardBtn');
    createBtn.style.display = 'none';

    const container = document.getElementById('publish-card');
    const updateCardBtn = document.createElement('button');
    updateCardBtn.textContent = 'Güncelle';
    updateCardBtn.classList.add('btn','btn-primary');
    updateCardBtn.style.marginTop = '15px'
    updateCardBtn.id = 'updateCardBtn';
    updateCardBtn.addEventListener('click', async function(){
       updateCard(id);

    });
    container.appendChild(updateCardBtn);
	try {
		var response = await fetch('http://localhost:3000/updateCardGetData', {
			method: 'POST',
			headers: {
				'Content-Type':'application/json'
			},
			body: JSON.stringify({id})
		});
		var result = await response.json();

		cardData = result.data;
        document.getElementById('titleInput').value = cardData.name;
		document.getElementById('detailInput').textContent = cardData.detail;

        
       

	} catch (error) {
		console.log('error:'+error);
	}
}

//girilen alanlardaki verileri aynı id'ye sahip alana yazan fonksiyon
async function updateCard(id){
    const formData = new FormData();
                
    const titleInput = document.getElementById('titleInput').value;
    const detailInput = document.getElementById('detailInput').value;
    const imageInput = document.getElementById('imageInput').files[0];
    var errorMsg = document.getElementById('newsErrorMsg');

    formData.append('id',id);
    formData.append('name',titleInput);
    formData.append('detail',detailInput);
    if(imageInput !== undefined){
        formData.append('image', imageInput);
    }
    try{
        var response= await fetch('http://localhost:3000/updateCard', {
            method: 'POST',
            body: formData
        });
        var data = await response.json();
        console.log(data);
        errorMsg.textContent = data.message;
        errorMsg.style.color = 'green';
    } catch (error) {
    }
}

document.addEventListener('DOMContentLoaded', function(){
    var id = (window.location.href).split('?id=')[1];
    if(id !== undefined){
        updateCardGetData(id);
    }
        
})


  
 