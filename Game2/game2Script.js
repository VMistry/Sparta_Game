var player1;
var player2;
var player1points = 0;
var player2points = 0;
var playerTurn;

$(".choseButton").off("click");
$("#enterNewGame").on("click", StartRound);



function StartRound(){
  playerTurn = 1;
  $("#enterNewGame").off("click");
  $("#editedText3").text("Game in progress....");
  $("#turnText").text("Players 1's turn");
  player1 = "Choice";
  player2 = "Choice";
  $("#editedText1").text(player1);
  $("#editedText2").text(player2);
  $(".choseButton").on("click", selectionButton);
}

function selectionButton(){
  if(playerTurn != 2){
    player1 = this.id;
    playerTurn++;
    $("#turnText").text("Players 2's turn");
  }
  else{
    player2 = this.id;
    $("#editedText1").text(player1.toUpperCase());
    $("#editedText2").text(player2.toUpperCase());
    checker(player1, player2);
    $(".choseButton").off("click");
  }
}

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
