function validateRegister() {
    const username = document.querySelector('#username');
    const password = document.querySelector('#password');
    const confirm = document.querySelector('#confirm');

    if (username.value === "") {
        alert('Please enter a username!');
        username.focus();
        return false;
    }
    if (password.value === "") {
        alert('Please enter a password!');
        password.focus();
        return false;
    } 
    if (password.value !== confirm.value) {
        alert('Please confirm password!');
        password.focus();
        return false;
    }
    return true;
}

function validateLogin() {
    const username = document.querySelector('#username');
    const password = document.querySelector('#password');
    
    if (username.value === "") {
        alert('Please enter username!');
        username.focus();
        return false;
    }
    if (password.value === "") {
        alert('Please enter password!');
        password.focus();
        return false;
    } 
    return true;
}