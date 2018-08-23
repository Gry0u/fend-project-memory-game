/*
 * Create a list that holds all of your cards
 */
 //Spread HTML collection into array
let deck = document.querySelector('.deck');

let cards = [...document.getElementsByClassName('card')];

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function StartGame() {
//1.Shuffle cards
  cards = shuffle(cards)

//2.Add each card to HTML
//Note that with appendChild, if an element already exists it will be moved rather than duplicated!
  for (const card of cards) {
    deck.appendChild(card);
  }
}
/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)*/
function ShowCard(evt) {
  evt.target.classList.toggle('show');
  evt.target.classList.toggle('open');
}

//add Event Listener to flip cards
deck.addEventListener('click', ShowCard);







 /*
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
