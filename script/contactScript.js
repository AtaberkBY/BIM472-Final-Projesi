const sendFormBtn = document.getElementById('sendFormBtn');

async function getUser() {
    const token = localStorage.getItem('token');
    const username = decodeJWT(token);
    if (username === false) {
        return false;
    }
    try {
        var response = await fetch('http://localhost:3000/getUser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username })
        });
        var result = await response.json();

        return result.user;
    } catch {

    }
}

async function getUserType() {
    const token = localStorage.getItem('token');
    const username = decodeJWT(token);
    if (username === false) {
        return false;
    }
    try {
        var response = await fetch('http://localhost:3000/getUser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username })
        });
        var result = await response.json();

        return result.user.userType;
    } catch {

    }
}
function decodeJWT(jwtToken) {
    if (jwtToken === null) {
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

function blockContactForm() {
    document.getElementById("contactForm").style.display = "none";
}

function blockSendBtn() {
    document.getElementById("sendFormBtn").disabled = true;
    document.getElementById("sendFormBtn").style.opacity = "0.5";
    document.getElementById("sendFormBtn").textContent = "Gönderebilmek için giriş yapmalısınız.";
}

function blockAdminMessagePanel() {
    document.getElementById("adminMessagePanel").style.display = "none";
}

document.getElementById('searchInput').addEventListener('input', async function (event) {
    const searchQuery = document.getElementById('searchInput').value.toLowerCase();
    const messages = await getAllMessages();
    const filteredMessages = messages.filter(message => message.message.toLowerCase().includes(searchQuery));
    clearMessageContainer();
    displayMessages(filteredMessages);
    showMessageDetail();
});

function clearMessageContainer() {
    var messageContainerDiv = document.getElementById('messageContainer');
    while (messageContainerDiv.firstChild) {
        messageContainerDiv.removeChild(messageContainerDiv.firstChild);
    }
}

document.getElementById('messageDeleteButton').addEventListener('click', function () {
    const isConfirmed = window.confirm ('Silmek istediğinize emin misiniz?');
    if (!isConfirmed) { return; }
    var id = $('#modalBody').data('id')
    deleteMessage(id);
});

async function deleteMessage(id){
    var messageDetailModal = $('#messageDetailModal'); 
    try {
        var response = await fetch('http://localhost:3000/deleteMessage', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id })
        });
        var result = await response.json();
        console.log(result)
        if (result.success) {
            messageDetailModal.modal('hide');
            clearMessageContainer();
            getAllMessages().then(messages => {
                displayMessages(messages);
                showMessageDetail();
            });
        }
    } catch (error) {
        console.log(error);
    }
}
sendFormBtn.addEventListener('click', async function () {
    event.preventDefault();
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var message = document.getElementById('message').value;
    var errorMessage = document.getElementById('errorMessage');
    var emailChecker = email.split('@')[1]
    console.log(name);
    if (name.length < 2) {
        errorMessage.style.display = "block";
        errorMessage.textContent = "İsim alanı boş olamaz!"
        return;
    }
    if (message.length < 30) {
        errorMessage.style.display = "block";
        errorMessage.textContent = "Mesajınız 30 karakterden az olamaz!"
        return;
    }
    if (email.length < 8 && (emailChecker === "gmail.com" || emailChecker === "icloud.com" || emailChecker === "yandex.com")) {
        errorMessage.style.display = "block";
        errorMessage.textContent = "Geçerli bir mail adresi giriniz!"
        return;
    }
    try {
        var response = await fetch('http://localhost:3000/addMessage', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, message })

        })
        var result = response.json();
        if (result.success) {
            errorMessage.style.display = "block";
            errorMessage.textContent = "Mesajınız başarıyla gönderildi!"
        }
    } catch (error) {
        console.log("Hata:" + error);
    }

})
function showMessageDetail() {

    var msgBoxes = document.querySelectorAll('.message-box');
    var messageDetailModal = $('#messageDetailModal');

    msgBoxes.forEach((msgBox) => {
        const clone = msgBox.cloneNode(true);
        msgBox.parentNode.replaceChild(clone, msgBox);
    });

    msgBoxes = document.querySelectorAll('.message-box');

    msgBoxes.forEach((msgBox) => {
        msgBox.addEventListener('click', function (event) {
            event.stopPropagation();

            msgId = msgBox.dataset.id;

            messageDetailModal.find('#messageDetailModalLabel').text(msgBox.querySelector('.message-sender').textContent);
            messageDetailModal.find('#modalMessageContent').text(msgBox.querySelector('.message-content').textContent);
            messageDetailModal.find('#modalMessageDate').text(msgBox.querySelector('.message-date').textContent);
            $('#modalBody').data('id', msgId);
            messageDetailModal.modal('show');
        });
    });

}



async function getAllMessages() {
    try {
        var response = await fetch('http://localhost:3000/getMessage', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        var result = await response.json();
        return result.messages;
    } catch (error) {
        console.log(error);
    }
}

function dateFormatter(date) {
    return date.toLocaleDateString('tr-TR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

function displayMessages(messages) {
    var messageContainerDiv = document.getElementById('messageContainer');

    messages.forEach(message => {
        var messageBoxDiv = document.createElement('div');
        var messageHeaderDiv = document.createElement('div');
        var messageSenderSpan = document.createElement('span');
        var messageDateSpan = document.createElement('span');
        var messageContentP = document.createElement('p');

        messageBoxDiv.dataset.id = message.id

        messageBoxDiv.classList.add('message-box');
        messageHeaderDiv.classList.add('message-header');
        messageSenderSpan.classList.add('message-sender');
        messageDateSpan.classList.add('message-date');
        messageContentP.classList.add('message-content');

        messageSenderSpan.textContent = message.name;
        messageDateSpan.textContent = dateFormatter(new Date(message.sendDate));;
        messageContentP.textContent = message.message;

        messageSenderSpan.id = "messageSender";
        messageDateSpan.id = "messageDate";
        messageContentP.id = "messageContent";


        messageHeaderDiv.appendChild(messageSenderSpan);
        messageHeaderDiv.appendChild(messageDateSpan);

        messageBoxDiv.appendChild(messageHeaderDiv);
        messageBoxDiv.appendChild(messageContentP);

        messageContainerDiv.appendChild(messageBoxDiv);
    });
}


document.addEventListener("DOMContentLoaded", async function () {

    if (localStorage.getItem("token") != null) {
        blockAdminMessagePanel();
        var user = await getUser();
        document.getElementById('name').value = user.name + " " + user.surname;
        var userType = await getUserType();
        if (userType === 'admin') {
            blockContactForm();
            getAllMessages().then(messages => {
                displayMessages(messages);
                showMessageDetail()
            });
            document.getElementById("adminMessagePanel").style.display = "block";
        }
    }
    else if (localStorage.getItem("token") == null) {
        blockSendBtn();
        blockAdminMessagePanel();
    }


});