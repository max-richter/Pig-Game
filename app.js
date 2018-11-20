/**
 * @author Max R
 */

 // var's used throughout program
var scores, roundScore, activePlayer, gamePlaying;

// start game
init();

/**
 * If the roll button is clicked, an anonymous function is used to
 * implement the dice & score functionality
 */
document.querySelector('.btn-roll').addEventListener('click', function () {

    if (gamePlaying) {
        // generate random number
        var dice = Math.floor(Math.random() * 6) + 1;

        // display random number
        var diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-' + dice + '.png';

        // update round score
        if (dice !== 1) {
            // add to score
            roundScore += dice;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } else {
            // next player
            nextPlayer();
        }
    }
});

/**
 * Holds the functionality for the hold button, updates the UI and 
 * determines whether a player has won or not
 */
document.querySelector('.btn-hold').addEventListener('click', function () {
    if (gamePlaying) {
        // add current score to player score
        scores[activePlayer] += roundScore;

        // update UI 
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        // check if player won the game
        if (scores[activePlayer] >= 100) {
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
        } else {
            // switch to next player
            nextPlayer();
        }
    }
});

/**
 * Function that switches between users
 */
function nextPlayer() {
    // switch activePlayer to 0 or 1
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
    
    // set's current score
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    
    // toggle's between player 1 and 2 panels
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
    
    // initially hide dice when players switch
    document.querySelector('.dice').style.display = 'none';
}

/**
 * When user clicks the 'new game' button, the event listener
 * calls the init function
 */
document.querySelector('.btn-new').addEventListener('click', init);

/**
 * Setup the game and clear any info from previous game
 */
function init() {
    scores = [0, 0];
    activePlayer = 0;
    roundScore = 0;
    gamePlaying = true;

    document.querySelector('.dice').style.display = 'none';
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}