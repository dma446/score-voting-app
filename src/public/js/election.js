//04/16/19


function handleClick(count) {  
    const req = new XMLHttpRequest();
    req.open('GET', 'create', true);
    req.addEventListener('load', (evt) => {
        const div = document.body.appendChild(document.createElement('div'));
        div.id = 'candidate';
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
        const numOfCandidates = document.body.appendChild(document.createElement('input'));
        numOfCandidates.type = 'hidden';
        numOfCandidates.name = 'num-of-candidates';
        numOfCandidates.value = count;
        document.querySelector('#start').appendChild(div);
        document.querySelector('#start').appendChild(numOfCandidates);
    });
    req.addEventListener('error', (evt) => {
        console.log('oh noes');
    });
    req.send();
    
}

function main() {
    const btn = document.querySelector('#btn');
    let count = 0;
    btn.addEventListener('click', () => { 
        count++;
        handleClick(count); 
    });
}

document.addEventListener('DOMContentLoaded', main);