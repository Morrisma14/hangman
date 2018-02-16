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
      var word;
      var WordWithGuesses;
      var lettersGuessed;
      var winCounter;

      var startGame = function(word){
        word = getRandomWord();
        WordWithGuesses = getBlankedWord();
        updateWordWithGuesses(WordWithGuesses);
        listenForKeyPress();
      };

      var getRandomWord = function(){
        return words[Math.floor(Math.random() * words.length)];
      };

      var getBlankedWord = function(length){
        var result = '';
        for (var i = 0; i < length; i++){
          result = result + "- ";
        }
        return result.slice(-1, 0);
      };

      var listenForKeyPress = function(){
        document.onkeypress = handleKeyPress;
      };

      var checkLetter = function(letter, word){
        return word.indexOf(letter) > -1 && !checkLetterAlreadyChosen(letter);
      };

      var updateWordWithGuesses = function(letter, word, WordWithGuesses){
        return;
      }
      
      var handleKeyPress = function(event){
        var guess = event.key;
        if (checkLetter(guess)){
          handleCorrectLetter(guess, word, WordWithGuesses);
        }else{
          handleIncorrectLetter(guess, word, WordWithGuesses)
        }
      }

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


      var handleCorrectLetter = function(letter, word, WordWithGuesses){
        alert("You Guessed Correctly");
        var result = updateWordWithGuesses(letter, word, WordWithGuesses);
        updateLetters;
      }

      var handleIncorrectLetter = function(letter){
        alert("You Guessed Incorrectly");
        lettersGuessed.push(guess);
        updatelettersGuessed(lettersGuessed.join(','));
        if (checkIfOutOfGuesses()){
          handleLoss();
          return;
        }
        updateHangmanArt();
      };

      var updateIncorrectGuesses = function(string){
        var element = document.getElementById("incorrect-guesses");
        element.innerHTML = string;
      };
      var updateCorrectGuesses = function(string){
        var element = document.getElementById("correct-guesses");
        element.innerHTML = string;
      };

      var updateHangmanArt = function(){
        var totalLines = asciiArtArray.length;
        var percentage = lettersGuessedIncorrectly.length / numOfGuesses;
        var linesToShow = Math.floor(totalLines * percentage);
        var art = '';
        for (var i = 0; i < linesToShow; i++){
          art = art + asciiArtArray[i] +"\n";
        }
        var element = document.getElementById('hangman-art');
        element.innerHTML = art;
      };
      
      var checkIfOutOfGuesses = function(){
        return lettersGuessed.length > numberofGuesses;
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
    