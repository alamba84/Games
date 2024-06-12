<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title> Kids Game Page </title>
    
    <link href="./bootstrap-5.1.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <script src="./bootstrap-5.1.3/dist/js/bootstrap.bundle.min.js"></script>
    
    <link href="./dist/css/Styles.css" rel="stylesheet">
    
    <link href="./dist/fontawesome/css/all.css" rel="stylesheet">
    <link href="./dist/fontawesome/css/all.css" rel="stylesheet">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.4/Chart.js"></script>
    <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js" type="text/javascript"></script> 
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.css">
    
</head>
<body>
    <div class="zoom-background">
    	<div class="main"></div>
    </div>
    <div class="content">
        <nav class="navbar navbar-expand-lg">
		    <div class="container-fluid">
		        <a class="navbar-brand" href="#">
					<img src="./images/SANSAC.png" alt="SANSA Logo">
				</a>
		        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
		            <span class="navbar-toggler-icon"></span>
		        </button>
		        <div class="collapse navbar-collapse" id="navbarNav">
		            <ul class="navbar-nav ms-auto">
		                <li class="nav-item">
		                    <a class="nav-link" href="#"> Home </a>
		                </li>
		                <li class="nav-item">
		                    <a class="nav-link" href="#"> Learn </a>
		                </li>
		                <li class="nav-item">
		                    <a class="nav-link" href="#"> Fun </a>
		                </li>
		                <li class="nav-item">
		                    <a class="nav-link" href="#"> Contact </a>
		                </li>
		            </ul>
		        </div>
		    </div>
		</nav>
        <section class="main-content">
        	<div class="text-center" id="loadingMessage"> 
				<p class="text-center"> Please wait while data loading...</p> 
				<div class="spinner-border"></div>
			</div>
        
        	<div class = "container">
    			<h3 class = "fw-bold">Welcome to Satellite Navigation Game</h3>
		       	<div class="card">
				  	<div class="card-header">
				  		<div class="input-group mb-2 games" style="width: 100%;">
						    <input id="gamespeed" type="text" class="form-control" placeholder = "Game speed - default speed is 5">
						    <button id="startgame" onclick="startGame()" class="input-group-text">Start</button>
						    <button id="pausegame" onclick="pauseGame()" class="input-group-text" disabled>Pause</button>
						    <button id="resumegame" onclick="resumeGame()" class="input-group-text" disabled>Resume</button>
						    <button id="stopgame" onclick="stopGame()" class="input-group-text" disabled>Stop</button>
						</div>
				  	</div>
				  	<div class="card-body">
				  		<div class = "score" id = "score"> Score: 0 </div>
				  		<div id="gameContainer">
						    <div id="satellite"></div>
						</div>
				  	</div>
				  	<div class="card-footer">
				  		<div class="btn-group groups">
						    <button type="button" class="btn">Low Earth Orbit</button>
						    <button type="button" class="btn geo">Geo-Stationary Orbit</button>
						    <button type="button" class="btn">Medium Earth Orbit</button>
						</div>
				  	</div>
				</div>
        	</div>            
        </section>
    </div>
    <script src="./dist/js/Script.js"></script>
</body>
</html>

