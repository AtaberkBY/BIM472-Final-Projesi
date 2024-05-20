function openPopup() {
    const loginPopup = document.getElementById('login-popup');
    loginPopup.style.display = 'block';
    loginPopup.style.animation = 'fade-in 0.5s';
}

function closePopup() {
    const loginPopup = document.getElementById('login-popup');
    loginPopup.style.animation = 'fade-out 0.5s';
    setTimeout(() => {
        loginPopup.style.display = 'none';
    }, 500);
}

function createLoginButton(){
    var row = document.getElementById("rowId");
    var divCol = document.createElement("div");
    divCol.classList.add("col-md-2");

    var nav = document.createElement("nav");

    var ul = document.createElement("ul");

    var li = document.createElement("li");

    var button = document.createElement("button");
    button.classList.add("btn", "btn-outline-info");
    button.id = "login-btn";
    button.textContent = "Giriş Yap";
    button.addEventListener("click", openPopup);


    li.appendChild(button);
    ul.appendChild(li);
    nav.appendChild(ul);
    divCol.appendChild(nav);
    row.appendChild(divCol);

}

function createLogoutButton(){
    var row = document.getElementById("rowId");
    var divCol = document.createElement("div");
    divCol.classList.add("col-md-2");

    var nav = document.createElement("nav");

    var ul = document.createElement("ul");

    var li = document.createElement("li");

    var button = document.createElement("button");
    button.classList.add("btn", "btn-outline-danger");
    button.id = "logout-btn";
    button.textContent = "Çıkış Yap";
    button.addEventListener("click", logout);


    li.appendChild(button);
    ul.appendChild(li);
    nav.appendChild(ul);
    divCol.appendChild(nav);
    row.appendChild(divCol);
}


function logout(){
    localStorage.removeItem("token");
    window.location.reload();
}

function createWelcome(){
    var UnorderedList = document.getElementById('unorderedListId');
    var p = document.createElement('p');
    var username = decodeJWT(localStorage.getItem('token'));
    p.textContent = 'Hoşgeldin, '+username;
    p.style.fontWeight = 'bold';
    p.style.marginLeft = '440px';
    UnorderedList.appendChild(p);
}

function createAddButton(){
    var btnContainer = document.getElementById('button-container');
    var addButton = document.createElement('button');
    addButton.textContent = "Yeni haber ekle";
    addButton.classList.add('btn', 'btn-success');
    addButton.addEventListener('click', function () {
        window.location.href = 'createNews.html';
    })
    btnContainer.appendChild(addButton);
}

function decodeJWT(jwtToken) {
    try {
        const [header, payload, signature] = jwtToken.split('.');

        const decodedPayload = JSON.parse(atob(payload));

        return decodedPayload.username;
    } catch (error) {
        console.error('Error decoding JWT:', error);
        return null;
    }
}

async function getUserType(){
	const token = localStorage.getItem('token');
	const username = decodeJWT(token);
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
const loginPopup = document.getElementById('login-popup');

window.addEventListener('click', (event) => {
    if (event.target === loginPopup) {
        closePopup();
    }
});


document.addEventListener("DOMContentLoaded", async function() {
    if(localStorage.getItem("token") != null){
        createLogoutButton();
        createWelcome();
        var userType = await getUserType();
        if(userType === 'admin'){
            createAddButton();
        }
    }
    else if(localStorage.getItem("token") == null){
        createLoginButton();
    }
    
    
});
