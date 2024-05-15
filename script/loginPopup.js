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
    }, 500); // Bekleme süresi animasyonun bitiş süresine eşit olmalı
}

const openBtn = document.getElementById('login-popup');
openBtn.addEventListener('click', openPopup);

const loginPopup = document.getElementById('login-popup');

window.addEventListener('click', (event) => {
    if (event.target === loginPopup) {
        closePopup();
    }
});
