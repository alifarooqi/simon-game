var on = false;
var started = false;
var strict = false;
var huTurn = false;
var score = 0;
var aiSequence = [];
var seqIndex = 0;
var gameSpeed = 1000; //in ms

$(document).ready(function(){
  
});

function onOff(){
  on = !on;
  if (on){
    $("#screen").html("00");
    setTimeout(function(){$("#screen").css("color", "grey")}, 200);
    setTimeout(function(){$("#screen").css("color", "white")}, 400);
    setTimeout(function(){$("#screen").css("color", "grey")}, 600);
    setTimeout(function(){$("#screen").css("color", "white")}, 800);
  }
  else {
    strict = false;
    $("#strictLight").css("background-color", "#600");
    reset();
    $("#screen").html("");
    started = false;
    on = false;
  }
}
var CPUturn = function(){
  add2Sequence();
  playSequence();
}
function huClick(color){
  if (on && started && huTurn){
    $("#"+color).fadeIn(1);
    $("#"+color).fadeOut(gameSpeed*5/10);
    if (aiSequence[seqIndex] == color){
      document.getElementById('sound-'+color).play();
      if (seqIndex+1 < aiSequence.length){
        seqIndex++;
      }
      else {
        seqIndex = 0;
        score++;
        updateScore();
        huTurn = false;
        if (score == 20){
          setTimeout(function(){$("#screen").css("color", "green")}, 200);
      setTimeout(function(){$("#screen").css("color", "white")}, 400);
      setTimeout(function(){$("#screen").css("color", "green")}, 600);
      setTimeout(function(){$("#screen").css("color", "white")}, 800);
      document.getElementById('victory').play();
          reset();
          setTimeout(updateScore, 900);
        }
        setTimeout(CPUturn, 1100);
      }
    }
    else {
      $("#screen").html("!!!!");
      setTimeout(function(){$("#screen").css("color", "red")}, 200);
      setTimeout(function(){$("#screen").css("color", "white")}, 400);
      setTimeout(function(){$("#screen").css("color", "red")}, 600);
      setTimeout(function(){$("#screen").css("color", "white")}, 800);
      document.getElementById('error').play();
      huTurn = false;
      seqIndex = 0;
      setTimeout(updateScore, 1000);
      if (strict){
        reset();
        updateScore();
        setTimeout(CPUturn, 1000);
      }
      else {
        setTimeout(function(){playSequence();}, 1000)
      }
    }
  }
}
function reset(){
  huTurn = false;
  score = 0;
  aiSequence = [];
  seqIndex = 0;
  gameSpeed = 1000;
}
function add2Sequence(){
  if (on && started) {
    var colors = ['r', 'g', 'b', 'y'];
    var random = Math.floor(Math.random()*4)
    aiSequence.push(colors[random]);
  }
}
function playSequence(){
  var i = 0;
  var play = setInterval(function(){
    $("#"+aiSequence[i]).fadeIn(1);
    $("#"+aiSequence[i]).fadeOut(gameSpeed*7/10);
    document.getElementById('sound-'+aiSequence[i]).play();
    i++;
    if (i>= aiSequence.length){
      huTurn = true;
      clearInterval(play);
    }
  },gameSpeed);
  
}
function updateScore(){
  var html = String("0"+score).slice(-2);
  $("#screen").html(html);
}
function start(){
  if (on && !started){
    started = true;
    setTimeout(CPUturn, 300);
  }
}
function btnStrict(){
  if (on){
    strict = !strict;
    if (strict){
      $("#strictLight").css("background-color", "#F00");
    }
    else {
      $("#strictLight").css("background-color", "#600");
    }
  }
}