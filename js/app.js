//Strict mode execution
(function() {
  'use strict';
  //Variables declarations
  let counter = document.querySelector('.moves');
  let moves = 0; //number of moves
  let start; // start time
  let stars = document.getElementsByClassName('fa-star'); //rating
  let openCards = [];
  let timer = new Timer();
  const modal = document.getElementById('myModal'); //get the Modal
  const span = document.getElementsByClassName("close")[0]; //get the span element that closes the modal
  /*
  * Create a list that holds all  cards
  Spread HTML collection into array
  */

  let deck = document.querySelector('.deck'); //list holding all cards
  let cards = [...document.getElementsByClassName('card')]; //Spread deck HTML collection into array

  //shuffle the list of cards (see source in README)
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
    //0.0 reset moves counter
    moves = 0;
    counter.textContent = moves;
    //0.1 reset stars rating
    for (let star of stars) {
      star.style.display = 'inline-block';
    }
    //0.2 reset timer
    timer.stop();
    document.getElementById('basicUsage').innerHTML = timer.getTimeValues().toString();

    //1.Shuffle cards
    cards = shuffle(cards)

    //2.Add each card to HTML
    //Note that with appendChild, if an element already exists it will be moved rather than duplicated!
    for (const card of cards) {
      deck.appendChild(card);
    }

    //3. Show all cards for a bit
    showAll();
    setTimeout(function(){
      //4. Hide cards
      hideAll();
      //5. Start timer
      timer.start();
      //6. Update timer
      timer.addEventListener('secondsUpdated', function (e) {
        document.getElementById('basicUsage').innerHTML = timer.getTimeValues().toString();
      });
    }, 8000);

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
    if (openCards.length > 1) {
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
    //Pause Timer
    timer.pause();
    //update modal text Content
    document.querySelector('.modal-content > p').textContent = `Congratulations, you completed the memory game in ${timer.getTimeValues().toString()} after ${moves} moves!`;

    //Display Modal
    modal.style.display = "block";
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

  //Start game on page load
  window.onload = startGame;

  // When the user clicks on <span> (x), close the modal
  span.onclick = function() {
    modal.style.display = "none";
  }

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }
}());
