//Created and assign variables
var player1;
var player2;
var player1points = 0;
var player2points = 0;
var playerTurn;

//Make sure the rock, paper, scissors buttons are turned off.
$(".choseButton").off("click");
$("#submit").on("click", loginResults);
//Turn on the new game button to start a new game.
$("#enterNewGame").on("click", StartRound);

//This will start off the new game by resetting the text and players turn.
function StartRound(){
  // Make player 1 start first
  playerTurn = 1;
  //turn off make new game button
  $("#enterNewGame").off("click");
  //Show that game is in progress
  $("#editedText3").text("Game in progress....");
  //Show that its player 1's turn.
  $("#turnText").text("Choose your object");
  //set player 1 and player 2 strings to choice, and show.
  player1 = "Choice";
  player2 = "Choice";
  $("#editedText1").text(player1);
  $("#editedText2").text(player2);
  //turn on ROCK, PAPER, SCISSORS button.
  $(".choseButton").on("click", selectionButton);
}

//Takes in player 1's and players two input, then checks who won
function selectionButton(){
    //assign selection with player 1
    player1 = this.id;
    //chnage to player 2
    playerTurn++;

    //Assign selection with player 2
    var computerChoice = Math.floor(Math.random() * 3 + 1);
    player2 = playerChoise(computerChoice);
    //Display players choice
    $("#editedText1").text(player1.toUpperCase());
    $("#editedText2").text(player2.toUpperCase());
    //Check if the play one or player two wins.
    checker(player1, player2);
    //turn off the choice button
    $(".choseButton").off("click");
}

//check who wins
function checker(player1, player2){
  if(player1 == player2){
    $("#turnText").text("Both equally matched: Draw");
  }

  else if(player1 == "rock"){
    if(player2 == "scissors"){
      $("#turnText").text("Rock crushes scissors: Player 1 wins");
      player1points++;
    }
    else if(player2 == "paper"){
      $("#turnText").text("Paper covers rock: Player 2 wins");
      player2points++;
    }
  }

  else if(player1 == "paper"){
    if(player2 == "rock"){
      $("#turnText").text("Paper covers rock: Player 1 wins");
      player1points++;
    }
    else if(player2 == "scissors"){
      $("#turnText").text("Scissors cuts paper: Player 2 wins");
      player2points++;
    }
  }

  else if(player1 == "scissors"){
    if(player2 == "paper"){
      $("#turnText").text("Scissors cuts paper: Player 1 wins");
      player1points++;
    }
    else if(player2 == "rock"){
      $("#turnText").text("Rock crushes scissors: Player 2 wins");
      player2points++;
    }
  }
  $("#player1Score").text(player1points);
  $("#player2Score").text(player2points);
  $("#editedText3").text("Start new game");
  $(".choseButton").off("click");
  $("#enterNewGame").on("click", StartRound);

}

function playerChoise(number){
  switch (number) {
    case 1:
      return "rock";
      break;

    case 2:
      return "paper";
      break;

    case 3:
      return "scissors";
      break;
  }
}

function loginResults(){
  var currentGame = {};

  var gameID = "RPS_"+ $("#nameGame").val() +"";
  currentGame["Player1"] = ""+ $("#player1").val() +"";
  currentGame["p1points"] = player1points;
  currentGame["p2points"] = player2points;
  currentGame["totalpoints"] = player1points - player2points;
  localStorage.setItem(JSON.stringify(gameID), JSON.stringify(currentGame));
  location.reload();
}
