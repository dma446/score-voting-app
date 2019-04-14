const form = document.getElementsByTagName('form')[0];
const password = document.getElementById('password');
const error = document.querySelector('.error');

password.addEventListener('input', (event) => {
    if (password.validity.valid) {
        error.innerHTML = '';
        error.className = "error";
    }
}, false);

form.addEventListener('submit', (event) => {
    if (!password.validity.valid) {
        error.innerHTML = "Invalid password!";
        error.className = "error active";
        event.preventDefault();
    }
}, false);