/**
 * app.js
 *
 * This is the first file loaded. It sets up the Renderer,
 * Scene and Camera. It also starts the render loop and
 * handles window resizes.
 *
 */

// import { WebGLRenderer, PerspectiveCamera, Vector3 } from 'three';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
// import { DemoScene } from 'scenes';
import { Gameplay } from './components/gameplay';

var theme = '#ff8f00';
var highscore = 0;

// set background color
document.body.style.background = theme;

// Title 
var title = document.createElement('div');
title.id = 'title';
title.innerText = 'CRASH FOR CASH';
title.style.color = 'white';
title.style.fontFamily = "'Raleway', sans-serif";
title.style.fontSize = '62px';
title.style.fontWeight = '800';
title.style.lineHeight = '200px';
title.style.margin = '0 0 24px';
title.style.textAlign = 'center';
title.style.textTransform = 'uppercase';
document.body.append(title);


// Description of game 

var gameDescription = "Use the arrow keys to move your chracter and collect as many coins as you can under 60 seconds. But watch out! If you get pulled over "  +
"by the cops, you will freeze for 5 seconds and lose precious time. Think you can take on the " +
"challenge? Press start to begin!"

var des = document.createElement('div');
des.id = 'description';
des.innerText = gameDescription;
des.style.color = 'white';
des.style.textAlign = 'center';
des.style.lineHeight = '36px';
des.style.fontFamily = "'Raleway', sans-serif";
des.style.fontSize = '20px';
document.body.append(des);


//container for button
var container = document.createElement('div');
container.id = 'container';
// container.style.background = 'black';
container.style.textAlign = 'center';
container.style.lineHeight = '200px';
container.style.height = '100px';

document.body.append(container);

// Start, begin, whatever you want to call it button
var start = document.createElement('BUTTON');
start.id = 'start';
start.innerHTML = "Start";
start.style.fontFamily = "'Raleway', sans.serif";
start.style.fontSize = '10px';
start.style.background = theme;
start.style.color = 'white';
start.style.width = '50%';
start.style.height = '50px';
start.onclick = function() {clicked()};
start.onmouseover = function() {start.style.background = 'black'};
start.onmouseleave = function() {start.style.background = theme};
document.getElementById('container').append(start);


// onclick function
function clicked() {

    var title = document.getElementById('title');
    var des = document.getElementById('description');
    var start = document.getElementById('start');
    
    document.body.removeChild(title);
    document.body.removeChild(des);
    var contain = document.getElementById('container');
    contain.removeChild(start);
    document.body.removeChild(contain);

    var newGame = new Gameplay(highscore); 
    newGame.run();

    var running = null;
    function timeLeft() {
        var time = newGame.scoreboard.getTime();
        if (time == 0) {
            newGame.kill();
            // window.cancelAnimationFrame(newGame.requestId);
            clearInterval(running);
            var finalscore = newGame.scoreboard.getScore();
            var high = newGame.scoreboard.getHighScore();

            if (finalscore > highscore) {
                newGame.scoreboard.setHighScore(finalscore);
                highscore = finalscore;
            }

            high = newGame.scoreboard.getHighScore();
            gameOver(finalscore, high);
        }
    }

    running = setInterval(timeLeft, 1000);

}


function gameOver(finalscore, highscore) {

    // Game over page
    var title = document.createElement('div');
    title.id = 'title';
    title.innerText = 'Game Over!';
    title.style.color = 'white';
    title.style.fontFamily = "'Raleway', sans-serif";
    title.style.fontSize = '62px';
    title.style.fontWeight = '800';
    title.style.lineHeight = '200px';
    title.style.margin = '0 0 24px';
    title.style.textAlign = 'center';
    title.style.textTransform = 'uppercase';
    document.body.append(title);

    // Finalscore and restart message
    var gameDescription = "Your final score: " + finalscore +  "     Current high score: " + highscore + "     Press Restart to Play Again and Beat Your Highscore!";

    var des = document.createElement('div');
    des.id = 'description';
    des.innerText = gameDescription;
    des.style.color = 'white';
    des.style.textAlign = 'center';
    des.style.lineHeight = '36px';
    des.style.fontFamily = "'Raleway', sans-serif";
    des.style.fontSize = '20px';
    document.body.append(des);

    // Restart button
    //container for button
    var container = document.createElement('div');
    container.id = 'container';
    // container.style.background = 'black';
    container.style.textAlign = 'center';
    container.style.lineHeight = '200px';
    container.style.height = '100px';

    document.body.append(container);

    // Start, begin, whatever you want to call it button
    var start = document.createElement('BUTTON');
    start.id = 'start';
    start.innerHTML = "Restart";
    start.style.fontFamily = "'Raleway', sans.serif";
    start.style.fontSize = '10px';
    start.style.background = theme;
    start.style.color = 'white';
    start.style.width = '50%';
    start.style.height = '50px';
    start.onclick = function() {clicked()};
    start.onmouseover = function() {start.style.background = 'black'};
    start.onmouseleave = function() {start.style.background = theme};
    document.getElementById('container').append(start);

}


