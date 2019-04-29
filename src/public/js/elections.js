//const mongoose = require('moçngoose');
//const Election = mongoose.model('Election');

function main() {
    const results = document.querySelectorAll('.results');
    results.forEach((result) => {
        const btnResults = result.querySelector("#show-results");
        const modalResults = result.querySelector('#modal-results');
        btnResults.addEventListener('click', () => {
            modalResults.style.display = "block";

            const btnClose = result.querySelector('#close-results');
            btnClose.addEventListener('click', () => {
                modalResults.style.display = "none";
            });
        });
    });
}

document.addEventListener('DOMContentLoaded', main);