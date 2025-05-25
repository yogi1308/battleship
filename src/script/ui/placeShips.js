export function placeShips(numPlayers) {
    if (numPlayers === 1) {
        document.querySelector('.player-name').style.display = 'none'
        const placeShips = document.querySelector('.place-ships')
        placeShips.style.display = 'flex';
        document.querySelector('.axis > .x-axis').style.color = 'rgb(4, 29, 33)'
        document.querySelector('.axis > .x-axis').style.background = 'rgb(80, 207, 208)';
        document.querySelector('.place-ship-player-name').textContent = document.querySelector('.player-name-input').value
        document.querySelectorAll('.ship-pallete > div').forEach(div => {
            div.addEventListener('click', shipClicked);
        });
        document.querySelectorAll('.axis > button').forEach(button => {
            button.addEventListener('click', axisClicked);
        });
    }
    else {
        const placeShips = document.querySelector('.place-ships')
        document.querySelector('.player-name').style.display = 'none'
        placeShips.style.display = 'flex';
        document.querySelector('.axis > .x-axis').style.color = 'rgb(4, 29, 33)'
        document.querySelector('.axis > .x-axis').style.background = 'rgb(80, 207, 208)';
        document.querySelector('.place-ship-player-name').textContent = document.querySelector('.player-name-one-input').value
        placeShips.querySelector('.done').addEventListener('click', () => document.querySelector('.place-ship-player-name').textContent = document.querySelector('.player-name-two-input').value)
                document.querySelectorAll('.ship-pallete > div').forEach(div => {
            div.addEventListener('click', shipClicked);
        });
        document.querySelectorAll('.axis > button').forEach(button => {
            button.addEventListener('click', axisClicked);
        });
    }
}

function shipClicked(event) {
    document.querySelectorAll('.ship-pallete img').forEach(img => {
        img.style.filter = ''; // reset others
    });
    const img = event.currentTarget.querySelector('img');
    img.style.filter = 'brightness(0) invert(1)';
}

function axisClicked(event) {
    document.querySelectorAll('.axis > button').forEach(button => {
        button.style.background = ''; // reset others
        button.style.color = ''
    });
    const button = event.currentTarget;
    button.style.background = 'rgb(80, 207, 208)';
    button.style.color = 'rgb(4, 29, 33)'
}