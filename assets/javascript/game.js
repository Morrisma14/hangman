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
      "              |___| |___| " ,
      "              |###/ \###| ",
      "              \##/   \##/ ",
      "               ``     ``"];

      var words = ['PIE', 'CAKE', 'ICECREAM', 'COOKIE', 'BROWNIE', 'CHOCOLATE', 'CHEESECAKE', 'CANNOLI'];
      var numberOfGuesses = 6;
      var word= "";
      var WordWithGuesses= "";
      var lettersGuessed = [];
      var winCounter= 0;
      var alphabet = "abcdefghijklmnopqrstuvwxyz";

      var getRandomWord = function(){
        return words[Math.floor(Math.random() * words.length)];
      };

      var getBlankedWord = function(length){
        var result = '';
        for (var i = 0; i < length; i++){
          result = result + "- ";
        }
        return result.slice(0, result.length - 2);
      };

      var updateWordWithGuesses = function(){
        document.getElementById("correct-guesses").innerHTML = WordWithGuesses;
        return;
      };

      var startGame = function(){
        word = getRandomWord();
        WordWithGuesses = getBlankedWord(word.length);
        updateWordWithGuesses(WordWithGuesses);
      };
      
      document.onkeypress = function(event){
        handleKeyPress(event);
      };

      var checkLetter = function(letter){
        return word.indexOf(letter) > -1 && !checkLetterAlreadyChosen(letter);
      };

      var handleKeyPress = function(event){
              var guess = event.key;
              if (alphabet.indexOf(guess) === -1) {
                return;
              }
        if (checkLetter(guess)){
          handleCorrectLetter(guess, word, WordWithGuesses);
        }else{
          handleIncorrectLetter(guess, word, WordWithGuesses);
        }
      };

      var fillInGuesses = function(letter, word, WordWithGuesses){
        var str = WordWithGuesses;
        var word = word;
        var pos;
        while(word.indexOf(letter) > -1){
          console.log(pos, word, str);
          pos = word.indexOf(letter);
          str = str.slice(0,pos) + letter + str.slice(pos + 1);
          word = word.slice(0,pos) + "0" + word.slice(pos + 1);
        }
        return str;
      };


      var handleCorrectLetter = function(){
        alert("You Guessed Correctly");
        var result = updateWordWithGuesses();
        updateLetters;
      }

      var handleIncorrectLetter = function(letter){
        alert("You Guessed Incorrectly");
        lettersGuessed.push(letter);
        updatelettersGuessed(lettersGuessed.join(','));
        if (checkIfOutOfGuesses()){
          handleLoss();
          return;
        }
        updateHangmanArt();
      };

      var updatelettersGuessed = function(string){
        var element = document.getElementById("incorrect-guesses");
        element.innerHTML = string;
      };
      var updateCorrectGuesses = function(string){
        var element = document.getElementById("correct-guesses");
        element.innerHTML = string;
      };

      var updateHangmanArt = function(){
        var totalLines = asciiArtArrays.length;
        var percentage = lettersGuessed.length / numberOfGuesses;
        var linesToShow = Math.floor(totalLines * percentage);
        var art = '';
        for (var i = 0; i < linesToShow; i++){
          art = art + asciiArtArrays[i] +"\n";
        }
        var element = document.getElementById('hangman-art');
        element.innerHTML = art;
      };
      
      var checkIfOutOfGuesses = function(){
        return lettersGuessed.length > numberOfGuesses;
      };

      var checkIfWordIsComplete = function(string){
        return string.indexOf("_") < 0;
      };

      var checkLetterAlreadyChosen = function(letter){
        return lettersGuessed.indexOf(letter) > -1;
      };

      var handleLetterAlreadyChosen = function(){
      };
      
      var handleWin = function(){
        alert("You Win!");
        if (confirm("Play again?")){
          winCounter = winCounter++;
          updateIncorrectGuesses('');
          startGame();
        }
      };

      var handleLoss = function(){
        alert("You Lose!");
        if (confirm("Play again?")){
          updateIncorrectGuesses('');
          startGame();
        }
      };
      startGame();
    