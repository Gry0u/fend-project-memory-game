let counter = document.querySelector('.moves');
let moves = 0;
let start;

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

function showAll() {
for (let child of deck.children) {
  child.classList.add('open');
  child.classList.add('show');
  child.classList.remove('match');
  }
}

function hideAll() {
  for (let child of deck.children) {
    child.classList.remove('open');
    child.classList.remove('show');
    }
  }

function startGame() {
//1.Shuffle cards
  cards = shuffle(cards)

//2.Add each card to HTML
//Note that with appendChild, if an element already exists it will be moved rather than duplicated!
  for (const card of cards) {
    deck.appendChild(card);
  }

//3. Show all cards for a bit and hide them
showAll();
setTimeout(hideAll, 1000);

//4. reset counter
counter.textContent = moves;

//5. start timer
start = window.performance.now();
}
/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)*/
function showCard(evt) {
  evt.target.classList.toggle('show');
  evt.target.classList.toggle('open');
}

//add Event Listener to flip cards
deck.addEventListener('click', showCard);


 /*
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 */
 let openCards = [];
 function openCard(evt) {
   openCards.push(evt.target);
   /*
   *  - if the list already has another card, check to see if the two cards match
   + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
   */
   if (openCards.length > 0) {
     if (openCards[0].firstElementChild.getAttribute('class') == openCards[1].firstElementChild.getAttribute('class')) {
       match()
       if (checkAllMatches()) {
         win();
       }
     }
     else {
       noMatch();
     }
     moves += 1;
     counter.textContent = moves;
   }
 }
 deck.addEventListener('click', openCard);

 /*
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 */
 function match() {
   for (let c of ['show', 'open', 'match']) {
     openCards[0].classList.toggle(c);
     openCards[1].classList.toggle(c);
   }
   openCards = [];
 }
 /*
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 */
 function noMatch() {
   setTimeout(function() {
     for (let c of ['show', 'open']) {
       openCards[0].classList.toggle(c);
       openCards[1].classList.toggle(c);
     }
     openCards = [];
   }, 1000);
 }

 function win() {
   window.alert(`Congratulations, you completed the memory game in ${(window.performance.now() - start).toPrecision(2)/1000} seconds after ${moves} moves!`);
 }

 function checkAllMatches() {
   let finish = 1;
   for (let child of deck.children) {
     finish *= child.classList.contains('match');
   }
   return finish;
 }

 /*
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
