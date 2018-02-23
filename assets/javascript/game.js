      var asciiArtArrays = [
          "                 |_______________``",
          "                  [/]           [  ]",
          "                  [\]           | ||",
          "                  [/]           |  |",
          "                  [\]           |  |",
          "                  [/]           || |",
          "                 [---]          |  |",
          "                 [---]          |@ |",
          "                 [---]          |  |",
          "                oOOOOOo         |  |",
          "              oO/|||||\Oo       |  |",
          "              OO/|||||\OOo      |  |",
          "              *O\ x x /OO*      |  |",
          "              /*|  c  |O*\      |  |",
          "                 \_O_/    \     |  |",
          "                  \#/     |     |  |",
          "               |       |  |     | ||",
          "               |       |  |_____| ||__",
          "              _/_______\__|  \  ||||  \ ",
          "              /         \_|\  _ | ||\  \ ",
          "              |    V    |\\  \\/\  \  \\  \ ",
          "              |    |    | __/ / \  \  \  \ ",
          "              |    |    |\|/|\  \  \  \  \ ",
          "              ------------\--- \  \  \  \  \ ",
          "              \  \  \  \  \  \  \  \  \  \  \ ",
          "              _\__\__\__\__\__\__\__\__\__\__\ ",
          "              __|__|__|__|__|__|__|__|__|__|__| ",
          "              |___| |___| ",
          "              |###/ \###| ",
          "              \##/   \##/ ",
          "               ``     ``"
      ];

      var words = ['pie', 'cake', 'icecream', 'cookie', 'brownie', 'chocolate', 'cheesecake', 'cannoli'];
      var numberOfGuesses = 6;
      var word = "";
      var guess;
      var WordWithGuesses = "";
      var lettersGuessed = [];
      var winCounter = 0;
      var alphabet = "abcdefghijklmnopqrstuvwxyz";

      var getRandomWord = function() {
          return words[Math.floor(Math.random() * words.length)];
      };

      var getBlankedWord = function(length) {
          var result = '';
          for (var i = 0; i < length; i++) {
              result = result + "-";
          }
          return result;
      };

      var updateWordWithGuesses = function() {
          document.getElementById("correct-guesses").innerHTML = WordWithGuesses;
          return;
      };

      var startGame = function() {
          word = getRandomWord();
          WordWithGuesses = getBlankedWord(word.length);
          updateWordWithGuesses(WordWithGuesses);
      };

       var handleCorrectLetter = function(guess) {
          console.log("You Guessed Correctly");
          WordWithGuesses = fillInGuesses(guess, word, WordWithGuesses);
          updateCorrectGuesses(WordWithGuesses);
          if (checkIfWordIsComplete(WordWithGuesses)) {
              handleWin();
              return;
          }
          var audio = new Audio('Front_Desk.wav');
          audio.volume = 0.1;
          audio.play();
          updateHangmanArt();
      };

      var handleIncorrectLetter = function(letter) {
          alert("You Guessed Incorrectly");
          lettersGuessed.push(letter);
          updatelettersGuessed(lettersGuessed.join(','));
          if (checkIfOutOfGuesses()) {
              handleLoss();
              return;
          }
          updateHangmanArt();
      };

      var handleKeyPress = function(event) {
          guess = event.key;
          console.log(guess)
          if (alphabet.indexOf(guess) === -1) {
              return;
          }
          if (checkLetter(guess)) {
              handleCorrectLetter(guess, word, WordWithGuesses);
          } else {
              handleIncorrectLetter(guess, word, WordWithGuesses);
          }
      };

      document.onkeypress = function(event) {
          handleKeyPress(event);
      };

      var checkLetter = function(letter) {
          return word.indexOf(letter) > -1 && !checkLetterAlreadyChosen(letter);
      };

      var updatelettersGuessed = function(string) {
          var element = document.getElementById("incorrect-guesses");
          element.innerHTML = string;
      };
      var updateCorrectGuesses = function(string) {
          var element = document.getElementById("correct-guesses");
          element.innerHTML = string;
      };

      
      var fillInGuesses = function(letter, word, WordWithGuesses) {
          var str = WordWithGuesses;
          var word = word;
          var pos;
          while (word.indexOf(letter) > -1) {
              console.log(pos, word, str);
              pos = word.indexOf(letter);
              str = str.slice(0, pos) + letter + str.slice(pos + 1);
              word = word.slice(0, pos) + "0" + word.slice(pos + 1);
          }
          return str;
      };

     
      var updateHangmanArt = function() {
          var totalLines = asciiArtArrays.length;
          var percentage = lettersGuessed.length / numberOfGuesses;
          var linesToShow = Math.floor(totalLines * percentage);
          var art = '';
          for (var i = 0; i < linesToShow; i++) {
              art = art + asciiArtArrays[i] + "\n";
          }
          var element = document.getElementById('hangman-art');
          element.innerHTML = art;
      };

      var checkIfOutOfGuesses = function() {
          return lettersGuessed.length > numberOfGuesses;
      };

      var checkIfWordIsComplete = function(string) {
          return string.indexOf("-") < 0;
      };

      var checkLetterAlreadyChosen = function(letter) {
          return lettersGuessed.indexOf(letter) > -1;
      };

      var handleLetterAlreadyChosen = function() {};

      var handleWin = function() {
          alert("You Win!");
          if (confirm("Play again?")) {
              winCounter = winCounter++;
              lettersGuessed = [];
              document.getElementById("incorrect-guesses").innerHTML = ''
              startGame();
          }
      };

      var handleLoss = function() {
          alert("You Lose!");
          if (confirm("Play again?")) {
              lettersGuessed = [];
              document.getElementById("incorrect-guesses").innerHTML = ''
              startGame();
          }
      };
      startGame();