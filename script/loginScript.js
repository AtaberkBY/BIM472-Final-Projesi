document.getElementById('login-btn').addEventListener('click', async function(event){
    event.preventDefault();


    var popup = document.getElementById("login-popup");
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    var errorMsg = document.getElementById("errorMsg");


    try{
        var response = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
            'Content-Type':'application/json'
            },
            body: JSON.stringify({username,password})
            
        });
        var result = await response.json();
        if (result.success) {
            localStorage.setItem('token', result.token);
            popup.style.display = "none";
            window.location.reload();
          }
        if(!result.sucess){
            errorMsg.style.display = "block";
            errorMsg.textContent = result.message;

        }
    } catch (error) {
        console.error('Error:', error);
        errorMsg.textContent = result.message;
    }

})
