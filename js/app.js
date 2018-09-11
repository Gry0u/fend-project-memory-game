//Variables declarations
let counter = document.querySelector('.moves');
let moves = 0; //number of moves
let start; // start time
let stars = document.getElementsByClassName('fa-star'); //rating
let openCards = [];
/*
 * Create a list that holds all  cards
 Spread HTML collection into array
 */

let deck = document.querySelector('.deck'); //list holding all cards
let cards = [...document.getElementsByClassName('card')]; //Spread deck HTML collection into array

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 Shuffle function from http://stackoverflow.com/a/2450976
 */

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

//Show all cards
function showAll() {
  for (let child of deck.children) {
    child.classList.add('open');
    child.classList.add('show');
    child.classList.remove('match');
  }
}

//Hide all cards
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

 //display the card's symbol
function showCard(evt) {
  evt.target.classList.toggle('show');
  evt.target.classList.toggle('open');
}

//add Event Listener to flip cards
deck.addEventListener('click', showCard);

//Function managing gameplay:
function play(evt) {
  //add clicked card to a list of open cards
  openCards.push(evt.target);
  //if the list already has another card, check if cards match
  if (openCards.length > 0) {
    if (openCards[0].firstElementChild.getAttribute('class') == openCards[1].firstElementChild.getAttribute('class')) {
      match()
      //if all cards have been matched, show winning message
      if (checkAllMatches()) {
        win();
      }
    }
  //Otherwise hide back cards
  else {
    noMatch();
  }
  //increment counter
  moves += 1;
  //Update stars rating
  updateRating(moves);
  counter.textContent = moves;
  }
}

//Add event listener for gameplay functionalities
deck.addEventListener('click', play);

//if the cards do match, lock cards in  open position
function match() {
 for (let c of ['show', 'open', 'match']) {
   openCards[0].classList.toggle(c);
   openCards[1].classList.toggle(c);
 }
 openCards = [];
}

//if the cards do not match, remove the cards from the list and hide the card's symbol
function noMatch() {
 //allow some delay before hiding back
 setTimeout(function() {
   for (let c of ['show', 'open']) {
     openCards[0].classList.toggle(c);
     openCards[1].classList.toggle(c);
   }
   openCards = [];
 }, 1000);
}

//Display winning message including ellapsed time and number of moves
function win() {
 window.alert(`Congratulations, you completed the memory game in ${(window.performance.now() - start).toPrecision(2)/1000} seconds after ${moves} moves!`);
}

//Check if all cards have been matched
function checkAllMatches() {
 let finish = 1;
 for (let child of deck.children) {
   finish *= child.classList.contains('match');
 }
 return finish;
}

//Update number of stars based on number of moves
function updateRating(moves) {
 if (moves <15) {

 }
 else if (moves < 25) {
  stars[0].style.display = 'none';
 }
 else {
   stars[0].style.display = 'none';
   stars[1].style.display = 'none';
 }
}

//Reset game on click on corresponding button
document.querySelector('.restart').addEventListener('click', startGame);
