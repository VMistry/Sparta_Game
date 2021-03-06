// This links to the div tags, enabling them to be accessed.
var clickableOBJ = $(".display");
// This will hold an array, which will be generated by computer, user would need to copy the combo correctly
var arraySequence1 = [];
var arraySequence2 = [];
// This will be an array which will hold user input.
var playerInsert;
// This will hold how many colors are flashed, this increases throughout the game.
var numberFlash = 1;
// This will hold the player number, e.g. player one or player 2.
var player = 1;
//This holds a boolean value saying if the user has made a mistake.
var player1Out = false;
var player2Out = false;

var sequenceBlink = 2000;
var blink = 1000;

var winner = "";


//assign a background colour to all the sections on the screen.
var red = $(".innerSquare", "#red").css('background-color', 'red').hide();
var blue = $(".innerSquare", "#blue").css('background-color', 'blue').hide();
var green = $(".innerSquare", "#green").css('background-color', 'green').hide();
var yellow = $(".innerSquare", "#yellow").css('background-color', 'yellow').hide();

var modal = document.getElementById('login');

//Start the game by creating the sequence.
$("#patternSet").on("click", createLevel);
$("#submit").on("click", loginResults);


//This is used to create the squence for the level.
async function createLevel(){
  $('#updatingTXT3').text("Processing...");
  //Reset the below variables.
  winner = "";
  playerInsert = [];
  amountInsert = 0;
  createLevelPattern(player);
  //show the colour, wait 1 second, hide the colour, wait 1 second.
  if(player == 1){
    for (var i = 0; i < numberFlash; i++) {
      //Change the colour of the chosen square, and wait 1 second before turning white.
      colorChanger(arraySequence1[i], blink);
      //Wait 1 second before looping
      await sleep(sequenceBlink);
    }
  }
  //show the colour, wait 1 second, hide the colour, wait 1 second.
  if(player == 2){
    for (var i = 0; i < numberFlash; i++) {
      //Change the colour of the chosen square, and wait 1 second before turning white.
      colorChanger(arraySequence2[i], blink);
      //Wait 1 second before looping
      await sleep(sequenceBlink);
    }
  }
  //Turn off the patternSelector button.
  $("#patternSet").off("click");
  //Look at if the button has been pressed or not.
  clickableOBJ.on("click", clickAction);
  $('#updatingTXT3').text("Ready");
}

//Sleep function stops the code, before starting the next line.
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


//Generate a pattern for the level
function createLevelPattern(player){
  //Adds each element using Math.random and converting numbers in to colors.
  //randomly generate number
  var generateNumber = Math.floor(Math.random() * 4 + 1);
  if(player == 1){
    arraySequence1.push(colorChoise(generateNumber));
    console.log(arraySequence1);
  }
  else if(player == 2){
    //push the generated number in to array.
    arraySequence2.push(colorChoise(generateNumber));
    console.log(arraySequence2);
  }
  //console.log(arraySequence);
}

//Takes in numbers 1, 2, 3, 4, then converts it to red, green, blue yellow.
function colorChoise(number){
  switch (number) {
    case 1:
      return "red";
      break;

    case 2:
      return "green";
      break;

    case 3:
      return "blue";
      break;

    case 4:
      return "yellow";
      break;
  }
}
//compare the computer generated array with the array created by player.
function checkForError(computerInsert, playerInsert){
  //So far no errors detected.
  var foundError = false;
  //For loop to chech each element of the array.
  for (var i = 0; i < computerInsert.length; i++) {
    //If the input is not the same as the computer generation, made error as true.
    if(computerInsert[i] != playerInsert[i]){
      foundError = true;
      $("#updatingTXT3").text("Pattern Incorrect (Ready to Process)");
      break;
    }
    else{
      $("#updatingTXT3").text("Pattern Correct (Ready to Process)");
      if(player == 2)
      sequenceBlink = sequenceBlink - 20;
      blink = blink - 10
    }
  }
  return foundError;
}

//This select what colour needs to be displayed.
async function colorChanger(div, number){
  //This will connect to a inner tag.
  var divInnerSquare;
  //Find the color
  switch (div) {
    case "red":
      divInnerSquare = $('.innerSquare', "#red");
      red.show();
      await sleep(number);
      red.hide();
      break;
    case "blue":
      divInnerSquare = $('.innerSquare', "#blue");
      blue.show();
      await sleep(number);
      blue.hide();
      break;
    case "green":
      divInnerSquare = $('.innerSquare', "#green");
      green.show();
      await sleep(number);
      green.hide();
      break;
    case "yellow":
      divInnerSquare = $('.innerSquare', "#yellow");
      yellow.show();
      await sleep(number);
      yellow.hide();
      break;
  }
}

//triggered when div is clicked on to.
function clickAction(){
  //push selected element id in to playerInsert array.
  playerInsert.push(this.id);
  colorChanger(this.id, 400);
  //if statment to check if the user has inserted the right amount of number in to game.
  if(playerInsert.length == numberFlash){
    //Check for errors.
    if(player == 1){
      player1Out = checkForError(arraySequence1, playerInsert);
    }
    else if(player == 2){
      player2Out = checkForError(arraySequence2, playerInsert);
    }
    //If there was no mistake, create a new level.
    if(player == 2 && (player1Out == true || player2Out == true)){
      if(player1Out == true && player2Out == false){
        $('#updatingTXT1').text("Player 2 wins");
        clickableOBJ.off("click");
        winner = "player2";
        $("#updatingTXT3").text("End of game");
      }

      else if(player1Out == false && player2Out == true){
        $('#updatingTXT1').text("Player 1 wins");
        clickableOBJ.off("click");
        winner = "player1";
        $("#updatingTXT3").text("End of game");
      }

      else if(player1Out == true && player2Out == true){
        $('#updatingTXT1').text("Its a draw");
        clickableOBJ.off("click");
        winner = "Draw";
        $("#updatingTXT3").text("End of game");
      }
      //Show Login
      modal.style.display = "block";
      console.log(winner);
    }
    else{
      $("#patternSet").on("click", createLevel);
      clickableOBJ.off("click");
      if(player == 2){
        //change to player 1
        player--;
        //Display message saying its player ones turn.
        $('#updatingTXT1').text("Player " + player + "'s turn");
        //Increase the level.
        numberFlash++;
        //display what level it is.
        $('#updatingTXT2').text("Level " + numberFlash);
      }
      else{
        //change to player 1
        player++;
        //Display message saying its player ones turn.
        $('#updatingTXT1').text("Player " + player + "'s turn");
      }
    }
  }
}

//This code takes in players information and stores it in to an object.
function loginResults(){
  var currentGame = {};
  var gameID = "SS_"+ $("#nameGame").val() +"";
  currentGame["Player1"] = ""+ $("#player1").val() +"";
  currentGame["Player2"] = ""+ $("#player2").val() +"";
  currentGame["Level"] = numberFlash;
  if(winner == "player1"){
    winner = ""+ $("#player1").val() +"";
  }
  else if(winner == "player2"){
    winner = ""+ $("#player2").val() +"";
  }
  else{
    winner = winner;
  }
  currentGame["Winner"] = winner;
  //The object would then be stored in to local store and used on the leader board. Relaod the page when done.
  localStorage.setItem(JSON.stringify(gameID), JSON.stringify(currentGame));
  location.reload();
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

$("#refresh").on("click", function(){
  playerInsert = [];
});
