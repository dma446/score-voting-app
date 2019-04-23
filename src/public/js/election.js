//04/16/19


function handleClick(count) {  
    const req = new XMLHttpRequest();
    req.open('GET', 'create', true);
    req.addEventListener('load', (evt) => {
        const div = document.body.appendChild(document.createElement('div'));
        div.className = 'candidate';
        div.appendChild(document.createElement('br'));
        div.appendChild(document.createElement('span')).textContent = 'Candidate #' + count;
        div.appendChild(document.createElement('br'));
        const name = div.appendChild(document.createElement('span'));
        name.textContent = 'Name: ';
        name.appendChild(document.createElement('input')).name = 'name-c' + count;
        div.appendChild(document.createElement('br'));
        const party = div.appendChild(document.createElement('span'));
        party.textContent = "Party: ";
        div.appendChild(document.createElement('input')).name = 'party-c' + count;
        div.appendChild(document.createElement('br'));
        document.querySelector('#num').value = count;
        document.querySelector('#start').appendChild(div);
    });
    req.addEventListener('error', (evt) => {
        console.log('oh noes');
    });
    req.send();
    
}

function validate() {
    const candidates = document.querySelector('#start').getElementsByClassName('candidate');
    for (let i = 0; i < candidates.length; i++) {
        const name = candidates[i].getElementsByTagName('input')[0];
        if (name.value === "") {
            alert('Please enter candidate name!');
            name.focus();
            return false;
        }
    }
    return (true);
}

function main() {
    const btnAdd = document.querySelector('#btn-add');
    let count = 0;
    btnAdd.addEventListener('click', () => { 
        count++;
        handleClick(count); 
    });
}

document.addEventListener('DOMContentLoaded', main);