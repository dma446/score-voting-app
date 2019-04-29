function validateRegister() {
    const username = document.querySelector('#username');
    const password = document.querySelector('#password');
    const confirm = document.querySelector('#confirm');

    if (username.value === "") {
        username.focus();
        return false;
    }
    if (password.value === "") {
        password.focus();
        return false;
    } 
    if (password.value !== confirm.value) {
        password.focus();
        return false;
    }
    return true;
}

function validateLogin() {
    const username = document.querySelector('#username');
    const password = document.querySelector('#password');
    
    if (username.value === "") {
        username.focus();
        return false;
    }
    if (password.value === "") {
        password.focus();
        return false;
    } 
    return true;
}