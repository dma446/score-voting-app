//04/16/19


function handleClick(count) {  
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
}

function validate() {
    const start = document.querySelector('#start');
    const position = document.querySelector('#position');
    const candidates = start.getElementsByClassName('candidate');

    if (position.value === "") {
        alert('Please enter a position!');
        position.focus();
        return false;
    }
    for (let i = 0; i < candidates.length; i++) {
        const name = candidates[i].getElementsByTagName('input')[0];
        if (name.value === "") {
            alert('Please enter candidate name!');
            name.focus();
            return false;
        }
    }
    return true;
}

function main() {
    const btnAdd = document.querySelector('#btn-add');
    let count = 0;
    btnAdd.addEventListener('click', () => { 
        count++;
        handleClick(count); 
    });
    const btnStart = document.querySelector('#btn-start');
    btnStart.addEventListener('click', () => { 
        const start = document.querySelector('#start');
        const candidates = start.getElementsByClassName('candidate');

        for (let i = 0; i < candidates.length; i++) {
            const names = start.appendChild(document.createElement('input'));
            const parties = start.appendChild(document.createElement('input'));
            names.name = "names";
            parties.name = "parties";
            names.type = "hidden";
            parties.type = "hidden";
            const name = candidates[i].getElementsByTagName('input')[0].value;
            let party = candidates[i].getElementsByTagName('input')[1].value;
            if (party === "") {
                party = "Independent";
            }
            names.value = name;
            parties.value = party;
        }
    });
}

document.addEventListener('DOMContentLoaded', main);