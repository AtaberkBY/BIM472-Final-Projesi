function checkData() {
    var popup = document.getElementById("login-popup");
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    var errorMsg = document.getElementById("errorMsg");
    var found = false;

    fetch('userData.json')
       .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch userData.json');
            }
            return response.json();
        })
       .then(userData => {
           userData.forEach(user => {
                if(username === user.username && password === user.password){
                    localStorage.setItem("token", user.token);
                    found = true;
                    window.location.reload();
                    popup.style.display ="none";
                }
           });
           if (!found) {
                errorMsg.innerHTML = "Geçersiz Kullanıcı adı veya şifre";
                errorMsg.style.display ="block";
           }
        })
       .catch(error => {
            console.log('Error loading userData.json:', error);
        });
}
