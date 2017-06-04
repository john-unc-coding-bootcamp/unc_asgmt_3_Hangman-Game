window.onload = function () {

  //Array of letters in the alphabet-these will be button options for players to guess from
  var alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h',
        'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's',
        't', 'u', 'v', 'w', 'x', 'y', 'z'];

  var categories;         // Arrays of words for comp to choose from
  var chosenCategory;     // Selected catagory
  var word ;              // Slected random word from categories
  var guess ;             // Geuss
  var geusses = [ ];      // Empty array to store player geusses
  var lives ;             // Lives
  var counter ;           // Count correct geusses
  var space;              // Number of spaces in word '-'

  // Get elements
  var showLives = document.getElementById("player-lives");
  var showCatagory = document.getElementById("scatagory");



  //Function creates alphabet buttons ul
  var buttons = function () {
    gameButtons = document.getElementById('buttons'); //Grab div id="buttons"
    letters = document.createElement('ul');

    for (var i = 0; i < alphabet.length; i++) {
      letters.id = 'alphabet';
      list = document.createElement('li');
      list.id = 'letter';
      list.innerHTML = alphabet[i];
      check();
      gameButtons.appendChild(letters);
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

     var winQuotes = ["The Force is Strong With You!", "Impressive. Most Impressive. Obi-Wan has Taught You Well"];
     var winComment = winQuotes[Math.floor(Math.random() * winQuotes.length)];

     var loseQuotes = ["I Find Your Lack of Faith Disturbing", "Rebel Scum!", "A Jedi You are Not"]
     var loseComment = loseQuotes[Math.floor(Math.random() * loseQuotes.length)];

     var halfQuotes = ["Do or Do Not. There is No Try", "Use the Force", "Patience Young Padawan", "Never Tell Me the Odds"]
     var halfComment = halfQuotes[Math.floor(Math.random() * halfQuotes.length)];

    showLives.innerHTML = "You have " + lives + " lives";
    //Lose
    if (lives === 0) {  //could also do (lives < 1)
      showLives.innerHTML = loseComment;
    }
    //Half of lives
    if (lives === 5) {
      showLives.innerHTML = halfComment;
    }
    //Win
    for (var i = 0; i < geusses.length; i++) {
      if (counter + space === geusses.length) { //accounts for space in word
        showLives.innerHTML = winComment;
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

    chosenCategory = categories[Math.floor(Math.random() * categories.length)]; //Choose random catagory array
    word = chosenCategory[Math.floor(Math.random() * chosenCategory.length)]; //Choose random word from chosenCategory array
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
    comments();
    play();
  }
}
