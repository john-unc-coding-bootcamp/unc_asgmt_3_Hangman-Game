window.onload = function () {

  //Array of letters in the alphabet-these will be button options for players to guess from
  var alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h',
        'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's',
        't', 'u', 'v', 'w', 'x', 'y', 'z'];

  var categories;         // Arrays of words for comp to choose from
  var chosenCategory;     // Selected catagory
  var word ;              // Slected random word from categories
  var guess ;             // Geuss
  var geusses = [ ];      // Empty array of stored geusses
  var lives ;             // Lives
  var counter ;           // Count correct geusses
  var space;              // Number of spaces in word '-'

  // Get elements
  var showLives = document.getElementById("player-lives");
  var showCatagory = document.getElementById("scatagory");



  // create alphabet buttons ul
  var buttons = function () {
    buttons = document.getElementById('buttons');
    letters = document.createElement('ul');

    for (var i = 0; i < alphabet.length; i++) {
      letters.id = 'alphabet';
      list = document.createElement('li');
      list.id = 'letter';
      list.innerHTML = alphabet[i];
      check();
      buttons.appendChild(letters);
      letters.appendChild(list);
    }
  }


  //Catagory to select from
  var selectCat = function () {
    if (chosenCategory === categories[0]) {
      catagoryName.innerHTML = "The Chosen Category Is Star Wars Locations";
    } else if (chosenCategory === categories[1]) {
      catagoryName.innerHTML = "The Chosen Category Is Star Wars Characters";
    } else if (chosenCategory === categories[2]) {
      catagoryName.innerHTML = "The Chosen Category Is Star Wars Space Ships";
    }
  }

  // Create geusses ul
   result = function () {
    wordHolder = document.getElementById('hold');
    correct = document.createElement('ul');

    for (var i = 0; i < word.length; i++) {
      correct.setAttribute('id', 'my-word');
      guess = document.createElement('li');
      guess.setAttribute('class', 'guess');
      if (word[i] === "-") {
        guess.innerHTML = " ";      //If the [i] in the word is "-"(space) then enter space into hmtl or else its "_"
        space = 1; //Assigns value of 1 to var space
      } else {
        guess.innerHTML = "_";
      }

      geusses.push(guess);
      wordHolder.appendChild(correct);
      correct.appendChild(guess);
    }
  }

  //Player lives
   comments = function () {
    showLives.innerHTML = "You have " + lives + " lives";
    //Lose
    if (lives === 0) {  //could also do (lives < 1)
      showLives.innerHTML = "Game Over";
    }
    //Win
    for (var i = 0; i < geusses.length; i++) {
      if (counter + space === geusses.length) { //accounts for space in word
        showLives.innerHTML = "You Win!";
      }
    }
  }


  // OnClick Function
   check = function () {
    list.onclick = function () {
      var geuss = (this.innerHTML);
      this.setAttribute("class", "active");
      this.onclick = null;
      for (var i = 0; i < word.length; i++) {
        if (word[i] === geuss) {
          geusses[i].innerHTML = geuss;
          counter += 1;
        }
      }
      var j = (word.indexOf(geuss));
      if (j === -1) {
        lives -= 1; //lives = lives - 1
        comments();

      } else {
        comments();
      }
    }
  }


  //Game loop
  play = function () {

    //Array w/ nested array of words in chosenCategory
    categories = [
 /*[0]*/["tattooine", "coruscunt", "hoth", "endor", "korriban", "jakuu", "naboo"], //Star Wars locations
 /*[1]*/["darth-vader", "luke-skywalker", "chewbacca", "han-solo", "princess-leia"], //Star Wars characters
 /*[2]*/["death-star", "executor", "millennium-falcon"], //Star Wars ships
    ];

    chosenCategory = categories[Math.floor(Math.random() * categories.length)];
    word = chosenCategory[Math.floor(Math.random() * chosenCategory.length)];
    word = word.replace(/\s/g, " ");
    console.log(word);
    buttons();

    geusses = [ ];
    lives = 10;
    counter = 0;
    space = 0;
    result();
    comments();
    selectCat();
  }

  play();


   //Reset function-once button is clicked =

   document.getElementById('reset').onclick = function() {
    correct.parentNode.removeChild(correct);
    letters.parentNode.removeChild(letters);
    play();
  }
}
