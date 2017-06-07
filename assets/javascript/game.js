window.onload = function () { //Will run once window is loaded

  //Globals

  //var numbers = [1,2,3.....]

  //Array of letters in the alphabet-these will be the button options for players to guess from
  var alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h','i', 'j', 'k', 'l', 'm',
                  'n', 'o', 'p', 'q', 'r', 's','t', 'u', 'v', 'w', 'x', 'y', 'z'];

  var categories;         // Arrays of categories to choose from
  var chosenCategory;     // Selected catagory
  var word ;              // Selected random word from chosenCategories
  var guess ;             // Geuss
  // nitpick - no need for empty space in array here
  var geusses = [];      // Empty array to store player geusses
  var lives ;             // Lives
  var counter ;           // Count correct geusses
  var space;              // Number of spaces in word '-'

  //var showLives = document.getElementById("player-lives");
  var showCatagory = document.getElementById("scatagory");



  //Function creates alphabet buttons ul
  var buttons = function () {
    gameButtons = document.getElementById('buttons'); //Grab div id="buttons"-gameButtons = local var
    letters = document.createElement('ul'); //Create ul element in div id="buttons"

    for (var i = 0; i < alphabet.length; i++) {
      letters.setAttribute("id", "alphabet"); //Giv ul id="alphabet"
      //letters.id = 'alphabet';
      list = document.createElement('li'); //Create li inside of ul
      list.setAttribute("id", "letter"); //Give li id="letter"
      //list.id = 'letter';
      list.innerHTML = alphabet[i]; //Enter letters of [alphabet] into HTML (li element created above)
      buttonClick(list); //Call buttonClick function ()
      gameButtons.appendChild(letters); //Put ul in parent div id="buttons"
      letters.appendChild(list); //Put li in parent div id="alphabet"
    }
  }


  //Catagories to select from-Game loop will select random word from array of categories
  // cool feature!
  var selectCat = function () {
    if (chosenCategory === categories[0]) {
      catagoryName.innerHTML = "Star Wars Locations";
    } else if (chosenCategory === categories[1]) {
      catagoryName.innerHTML = "Star Wars Characters";
    } else if (chosenCategory === categories[2]) {
      catagoryName.innerHTML = "Star Wars Space Ships";
    }
  }

  // Create geusses ul
   chosenWord = function () {
    wordHolder = document.getElementById('hold'); //Grabs div id="hold"
    correct = document.createElement('ul'); //Creates ul element

    for (var i = 0; i < word.length; i++) {
      correct.setAttribute('id', 'chosen-word'); //Give ul id="chosen-word"
      guess = document.createElement('li'); //Create li element
      guess.setAttribute('class', 'guess'); //Give li id="guess"
      if (word[i] === "-") {
        guess.innerHTML = "-"; //If the [i] in the word is "-"(space) then enter space into hmtl or else its "_"
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

     //Arrays of random comments for win/lose/half-lives
     var winQuotes = ["The Force is Strong With You!", "Impressive. Most Impressive. Obi-Wan has Taught You Well"];
     var winComment = winQuotes[Math.floor(Math.random() * winQuotes.length)];

     // lmao at Rebel Scum :)
     var loseQuotes = ["I Find Your Lack of Faith Disturbing", "Rebel Scum!", "A Jedi You are Not"]
     var loseComment = loseQuotes[Math.floor(Math.random() * loseQuotes.length)];

     // getting a message halfway through was really cool, but I did think I lost when I saw it!
     // maybe still show the lives count (not code related, just a comment :) )
     var halfQuotes = ["Do or Do Not. There is No Try", "Use the Force", "Patience Young Padawan", "Never Tell Me the Odds", "That's Not How the Force Works"];
     var halfComment = halfQuotes[Math.floor(Math.random() * halfQuotes.length)];


     var showLives = document.getElementById("player-lives");

    showLives.innerHTML = "Lives: " + lives;
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


  // OnClick Function/Player-Guess
  // I would have this function take list as an argument. This function could be used
  // elsewhere and 'list' may not be defined.
   buttonClick = function (list) {
    list.onclick = function () {
      var geuss = (this.innerHTML);
      this.setAttribute("class", "active"); //
      this.onclick = null;
      for (var i = 0; i < word.length; i++) {
        if (word[i] === geuss) {
          geusses[i].innerHTML = geuss;
          counter += 1; //counter = counter + 1
        }
      }
      // try to avoid single letter variables except in loops (i=0)
      var j = (word.indexOf(geuss));
      if (j === -1) {
        lives -= 1; //lives = lives - 1

      }
      // since comments returned in the "if" and the "else" blocks, it will always return
      // so we can just put it down here.
      comments();
    }
  }

  // KeyPress Function
  //keyPress = function () { same as buttonClick but keyboard; maybe document.onkeyup = function(event) {}?





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
    word = word.replace(/\s/g, "-");
    console.log(word);
    //buttons();

    geusses = [ ]; //Empty guesses array
    lives = 10; //Set lives = 10
    counter = 0; //Set counter to 0
    space = 0; //Set word space to 0
    chosenWord(); //Call result of chosen word function
    comments(); //Call win/lose/half-lives function
    selectCat(); //Call select category function
    buttons(); //Call alphabet buttons function
  }

  play();


   //Reset function-once button is clicked
   document.getElementById('reset').onclick = function() {
    correct.parentNode.removeChild(correct);
    letters.parentNode.removeChild(letters);
    comments();
    play();
  }
}
