let satellite;
let gameContainer;
let obstacles = [];
let obstacleIntervals = [];
let gameSpeed = 8;
let gameInterval;
let isPaused = false;
let score = 0;

document.getElementById("startgame").disabled = false;
document.getElementById("pausegame").disabled = true;
document.getElementById("stopgame").disabled = true;
document.getElementById("resumegame").disabled = true;

function startGame() {
    satellite = document.getElementById('satellite');
    gameContainer = document.getElementById('gameContainer');
    document.addEventListener('keydown', moveSatellite);
    gameInterval = setInterval(createObstacle, 1000);
    
    document.getElementById("startgame").disabled = true;
    document.getElementById("pausegame").disabled = false;
    document.getElementById("stopgame").disabled = false;
    document.getElementById("resumegame").disabled = true;
    document.getElementById("score").style.display = "block";
    
    score = 0;
    updateScore();
}

function moveSatellite(event) {
    if (isPaused) return;

    const key = event.key;
    const satelliteRect = satellite.getBoundingClientRect();
    const gameRect = gameContainer.getBoundingClientRect();

    if (key === 'ArrowUp' && satelliteRect.top > gameRect.top) {
        satellite.style.top = satellite.offsetTop - 15 + 'px';
    }
    if (key === 'ArrowDown' && satelliteRect.bottom < gameRect.bottom) {
        satellite.style.top = satellite.offsetTop + 15 + 'px';
    }
    if (key === 'ArrowLeft' && satelliteRect.left > gameRect.left) {
        satellite.style.left = satellite.offsetLeft - 15 + 'px';
    }
    if (key === 'ArrowRight' && satelliteRect.right < gameRect.right) {
        satellite.style.left = satellite.offsetLeft + 15 + 'px';
    }
}

function createObstacle() {
    const obstacle = document.createElement('div');
    obstacle.classList.add('obstacle');

    obstacle.style.top = '400px';
    
    const obstacleType = Math.floor(Math.random() * 3);

    switch (obstacleType) {
        case 0: 
            obstacle.style.backgroundImage = "url('https://www.pngall.com/wp-content/uploads/12/Asteroid-Meteor-PNG-Picture.png')";
            obstacle.style.width = '50px';
            obstacle.style.height = '50px';
            break;
        case 1: // Group of rocks
            obstacle.style.backgroundImage = "url('https://static.vecteezy.com/system/resources/previews/028/086/336/original/fire-asteroid-isolated-on-transparent-background-file-cut-out-ai-generated-png.png')";
            obstacle.style.width = '100px';
            obstacle.style.height = '100px';
            break;
        case 2: // Disjointed rocks
            obstacle.style.backgroundImage = "url('https://pngimg.com/d/asteroid_PNG5.png')";
            obstacle.style.width = '150px';
            obstacle.style.height = '150px';
            break;
        default:
            break;
    }

    obstacle.style.backgroundSize = 'contain';
    obstacle.style.backgroundRepeat = 'no-repeat';
    
    const containerWidth = gameContainer.clientWidth;
    const obstacleWidth = parseInt(obstacle.style.width);
    const position = Math.floor(Math.random() * (containerWidth - obstacleWidth));

    obstacle.style.left = position + 'px';
    
    gameContainer.appendChild(obstacle);
    obstacles.push(obstacle);
    moveObstacle(obstacle); 
}

function moveObstacle(obstacle) {
    const obstacleLeft = obstacle.offsetLeft;
    const containerWidth = gameContainer.clientWidth;
    
    var value = document.getElementById("gamespeed").value;
    if(value == "" || value == null)
    	gameSpeed = gameSpeed;
	else 
		gameSpeed = value;	
    

    let speedMultiplier;
    if (obstacleLeft < containerWidth / 3) {
        speedMultiplier = 1;
    } else if (obstacleLeft < 2 * containerWidth / 3) {
        speedMultiplier = 0.5;
    } else {
        speedMultiplier = 0.25;
    }

    const move = setInterval(() => {
        if (isPaused) return;

        if (obstacle.offsetTop <= -50) {
            obstacle.remove();
            clearInterval(move);
            score++;
            updateScore();
        } else {
            obstacle.style.top = obstacle.offsetTop - gameSpeed * speedMultiplier + 'px';
        }

        // Check for collision
        if (checkCollision(satellite, obstacle)) {
            gameOver();
            clearInterval(move);
        }
    }, 20);

    obstacleIntervals.push(move);
}

function checkCollision(satellite, obstacle) {
    const satelliteRect = satellite.getBoundingClientRect();
    const obstacleRect = obstacle.getBoundingClientRect();

    return !(
        satelliteRect.top > obstacleRect.bottom ||
        satelliteRect.bottom < obstacleRect.top ||
        satelliteRect.right < obstacleRect.left ||
        satelliteRect.left > obstacleRect.right
    );
}

function gameOver() {
    clearInterval(gameInterval);
    obstacleIntervals.forEach(clearInterval);
    obstacleIntervals = [];
    obstacles.forEach(obstacle => obstacle.remove());
    obstacles = [];

	setTimeout(function() {
		cancel();
	}, 1000);
	document.getElementById('loadingMessage').style.display = 'block';
	document.getElementById('loadingMessage').innerHTML = 'Game Over! Your score: ' + score;
    
    document.getElementById("startgame").disabled = false;
    document.getElementById("pausegame").disabled = true;
    document.getElementById("stopgame").disabled = true;
    document.getElementById("resumegame").disabled = true;

    satellite.style.top = '175px';
    satellite.style.left = '275px';

    startGame();
}

function pauseGame() {
    isPaused = true;
    
    document.getElementById("startgame").disabled = true;
    document.getElementById("pausegame").disabled = true;
    document.getElementById("stopgame").disabled = false;
    document.getElementById("resumegame").disabled = false;
}

function resumeGame() {
    isPaused = false;
    
    document.getElementById("startgame").disabled = true;
    document.getElementById("pausegame").disabled = true;
    document.getElementById("stopgame").disabled = false;
    document.getElementById("resumegame").disabled = true;
}

function stopGame() {

    clearInterval(gameInterval);
    obstacleIntervals.forEach(clearInterval);
    obstacleIntervals = [];
    obstacles.forEach(obstacle => obstacle.remove());
    obstacles = [];

    document.removeEventListener('keydown', moveSatellite);
    
    document.getElementById("startgame").disabled = false;
    document.getElementById("pausegame").disabled = true;
    document.getElementById("stopgame").disabled = true;
    document.getElementById("resumegame").disabled = true;
    document.getElementById("score").style.display = "none";

    satellite.style.top = '175px';
    satellite.style.left = '275px';
    
    if(score > 0){
    	setTimeout(function() {
			cancel();
		}, 1000);
    	document.getElementById('loadingMessage').style.display = 'block';
    	document.getElementById('loadingMessage').innerHTML = 'Game Stopped! Your score: ' + score;
	}
}

function cancel() {
	document.getElementById("loadingMessage").style.display = "none";	
}

function updateScore() {
    document.getElementById('score').innerText = 'Score: ' + score;
   	
   	if(score == 400){
   		stopGame();
   		document.getElementById('loadingMessage').style.display = 'block';
   		document.getElementById('loadingMessage').innerHTML = 'Congratulations! Record broken ' +
   		'<p class = "text-center mt-3">' + 
   			'<button type="button" onclick="redirect()" class="btn btn-outline-secondary sr-2"> Upgrade </button>' + 
   			'<button type="button" onclick="cancel()" class="btn btn-outline-secondary"> Cancel </button>' + 
   		'</p>';
   	}
   	
   	else if (score >= 50 && score <= 405 && score % 50 === 0) {
        gameSpeed++;
        pauseGame(); 
        document.getElementById("gamespeed").value = gameSpeed;
        
        setTimeout(function() {
			cancel();
		}, 7000);
    	document.getElementById('loadingMessage').style.display = 'block';
    	document.getElementById('loadingMessage').innerHTML = 'Ask if user wants to upgrade | Game speed increased to ' + gameSpeed + 
    	' <button type="button" onclick="redirect()" class="btn btn-outline-secondary"> Upgrade </button>';
    }
}





