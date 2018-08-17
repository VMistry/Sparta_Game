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
  var goes = 10 - i;
  for (var j = 0; j < goes.length; i++) {
    Board += "<tr> <td>" + (j + i + 1) + "</td> <td></td> <td></td> <td></td> <td></td> </tr>";
  }
  Board += "</table>";
  $("#LeaderBoard2").html(Board);
}
