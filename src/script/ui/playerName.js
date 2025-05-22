export function enterPlayerName() {
    const playFriend = document.querySelector('.play-friend')
    const playComputer = document.querySelector('.play-computer')
    playFriend.addEventListener('click', () => displayPlayerNameForm(2))
    playComputer.addEventListener('click', () => displayPlayerNameForm(1))
}

function displayPlayerNameForm(numPlayers) {
    document.querySelector('.choose-player').style.display = 'none'
    console.log('click')
    if (numPlayers === 1) {
        const singlePlayerNameDiv = document.querySelector('.single-player-name')
        singlePlayerNameDiv.style.display = 'flex'
        
    }
    else if (numPlayers === 2) {
        document.querySelector('.two-player-name').style.display = 'flex'
    }
}