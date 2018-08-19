//Grabs all the data from Game 1 and stores them in to an array.
function scoreBoard(){
  var score = [];
  for (var i = 0; i < localStorage.length; i++) {
    var key = localStorage.key(i);
    var dataCode = JSON.parse(key).substring(0, 2);
    if(dataCode == "SS"){
      var valuer = JSON.parse(localStorage[key]);
      var data = {};
      data.Level = valuer.Level;
      data.Player1 = valuer.Player1;
      data.Player2 = valuer.Player2;
      data.Winner = valuer.Winner;
      score.push(data);
    }
  }
  console.log(score);
  score.sort(function (a,b){
    return b.Level - a.Level;
  });
  //Using the array, it then creates a table, displaying the imformation in that table.
  var Board = "<table>";
  Board += "<tr><th>Rank</th> <th>Level</th> <th>Player 1</th> <th>Player 2</th> <th>Winner</th> </tr>";
  var i;
  for (i = 0; i < score.length; i++) {
    //gets the top ten people.
    if(!(i === 10)){
      var value = score[i];
      Board += "<tr><th>" + (i + 1) + "</th> <th>" + value.Level + "</th> <th>" + value.Player1 + "</th> <th>" + value.Player2 + "</th> <th>" + value.Winner + "</th> </tr>";
    }
    else{
      break;
    }
  }
  //
  var goes = 10 - i;
  for (var j = 0; j < goes.length; i++) {
   Board += "<tr> <td>" + (j + i + 1) + "</td> <td></td> <td></td> <td></td> <td></td> </tr>";
  }
  Board += "</table>";
  $("#LeaderBoard").html(Board);
  scoreBoard2();
}

function scoreBoard2(){
  var score = [];
  for (var i = 0; i < localStorage.length; i++) {
    var key = localStorage.key(i);
    var dataCode = JSON.parse(key).substring(0, 3);

    if(dataCode == "RPS"){
      var valuer = JSON.parse(localStorage[key]);
      var data = {};
      data.Player1 = valuer.Player1;
      data.p1points = valuer.p1points;
      data.p2points = valuer.p2points;
      data.totalpoints = valuer.totalpoints;
      score.push(data);
    }
  }

  score.sort(function (a,b){
    return b.totalpoints - a.totalpoints;
  });

  var Board = "<table>";
  Board += "<tr><th>Rank</th> <th>Player</th> <th>Player points</th> <th>Computer points</th> <th>Points gained by player</th> </tr>";
  var i;
  for (i = 0; i < score.length; i++) {
    //gets the top ten people.
    if(!(i === 10)){
      var value = score[i];
      Board += "<tr><th>" + (i + 1) + "</th> <th>" + value.Player1 + "</th> <th>" + value.p1points + "</th> <th>" + value.p2points + "</th> <th>" + value.totalpoints + "</th> </tr>";
    }
    else{
      break;
    }
  }
  //If there are more than ten people who recorded thier score, this will be activated to display to how how many have played the game.
  var numberOfPlayers = 10 - i;
  for (var j = 0; j < numberOfPlayers.length; i++) {
    Board += "<tr> <td>" + (j + i + 1) + "</td> <td></td> <td></td> <td></td> <td></td> </tr>";
  }
  Board += "</table>";
  $("#LeaderBoard2").html(Board);
}
//This will allow you to display content one at a time
function openPage(pageName, elmnt, color) {
    // Hide all elements with class="tabcontent" by default */
    var i, tabContent, tablinks;
    tabcontent = document.getElementsByClassName("tabContent");
    for (i = 0; i < tabcontent.length; i++) {
        //display none of the tables at first.
        tabcontent[i].style.display = "none";
    }

    // Remove the background color of all tablinks/buttons
    tablinks = document.getElementsByClassName("tablink");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].style.backgroundColor = "";
    }

    // Show the specific tab content
    document.getElementById(pageName).style.display = "block";

    // Add the specific color to the button used to open the tab content
    elmnt.style.backgroundColor = color;
}

// Get the element with id="defaultOpen" and click on it
document.getElementById("defaultOpen").click();
