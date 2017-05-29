<!doctype html>
<?php
/**
 * display.php
 *
 * This is the display for the Hamline University 2017 Digital Media Arts
 * Senior showcase.
 */

?>
<html>
	<head>
		<title>Display</title>
		<meta charset="UTF-8">
		
		<meta name="viewport" content="width=device-width, initial-scale=1">
		
		<link rel="icon" type="image/png" sizes="16x16" href="../img/favicon-16x16.png">
		<link rel="icon" type="image/png" sizes="32x32" href="../img/favicon-32x32.png">
		<link rel="icon" type="image/png" sizes="96x96" href="../img/favicon-96x96.png">
		<link rel="apple-touch-icon" sizes="57x57" href="../img/apple-touch-icon-57x57.png">
		<link rel="apple-touch-icon" sizes="60x60" href="../img/apple-touch-icon-60x60.png">
		<link rel="apple-touch-icon" sizes="72x72" href="../img/apple-touch-icon-72x72.png">
		<link rel="apple-touch-icon" sizes="76x76" href="../img/apple-touch-icon-76x76.png">
		<link rel="apple-touch-icon" sizes="114x114" href="../img/apple-touch-icon-114x114.png">
		<link rel="apple-touch-icon" sizes="120x120" href="../img/apple-touch-icon-120x120.png">
		<link rel="apple-touch-icon" sizes="144x144" href="../img/apple-touch-icon-144x144.png">
		<link rel="apple-touch-icon" sizes="152x152" href="../img/apple-touch-icon-152x152.png">
		<link rel="manifest" href="../js/manifest.json">
		<link rel="mask-icon" href="../img/safari-pinned-tab.svg" color="#5bbad5">
		<meta name="msapplication-TileColor" content="#ffffff">
		<meta name="msapplication-TileImage" content="../img/mstile-144x144.png">
		<meta name="theme-color" content="#ffffff">
		
		<script src="../js/jquery.min.js" type="text/javascript"></script>
		<link rel="stylesheet" href="../css/bootstrap.min.css">
		<script src="../js/bootstrap.min.js" type="text/javascript"></script>
		<link rel="stylesheet" href="../css/style.css">
		
		<style>
		body {
			font-family: "Robotica", "Georgia";
			
			/* From my Expanded Poem projects */
		    background-image: url("../img/leaf.png");
		    background-color: #fff;
		    background-position: left top;
		    
		    animation: bgColor 50s ease 2s infinite alternate;
		    -webkit-animation: bgColor 50s ease 2s infinite alternate;
		}
		@keyframes bgColor {
		    0% { background-color: #fff; background-position: left top; }
		    100% { background-color: #eee; background-position: right 500px; } 
		}
		@-webkit-keyframes bgColor {
		    0% { background-color: #fff; background-position: left top; }
		    100% { background-color: #eee; background-position: right 500px; } 
		}
		.display-wrapper {
			width: 1000px;
			margin: 0 auto;
			display: block;
		}
		.display-header {
			width: 450px;
			height: 100px;
			margin: 20px auto;
		}
		.display-header h1 {
			width: 300px;
			float: left;
			margin: 5px 0 0 10px;
			padding: 0;
			letter-spacing: 2.5px;
			font-size: 4em; 
		}
		.display-header h5 {
			margin: 5px 0 0 15px;
			padding: 0;
			float: left;
			letter-spacing: 1.2px;
			font-size: 1.3em;
			color: #777;
		}
		.display-header img {
			width: 100px;
			height: 100px;
			float: left;
			padding: 10px 0 0 10px;
			display: block;
			
			border:1px solid #bbb;
			border-radius: 20px;
			
			border-left-color: #ff9999;
			border-top-color: #ff3;
			border-right-color: #9f9;
			border-bottom-color: #99f;
			
			box-shadow: 0 0 2px 2px rgba(0,0,0,0.1);
			/* transform: translateX(10px); */
		}
		.url-wrapper {
			width: 1000px;
			height: 200px;
			
		}
		.url-text {
			width: 100%;
			padding: 0;
			letter-spacing: 1.4px;
			text-align: center;
			font-size: 7em;
			color: #f77;
			font-family: "Georgia", "Arial";
			
			text-shadow: 2px 2px 2px rgba(0,0,0,0.5);
			
			border-top: 1px solid #ddd;
			
			animation: urlAni 20s infinite alternate;
			-webkit-animation: urlAni 20s infinite alternate;
		}
		@keyframes urlAni {
			0% {
				color: #c33;
			}
			33% {
				color: #3c3;
			}
			66% {
				color: #33c;
			}
			100% {
				color: #cc3;
			}
		}
		.display-board {
			width: 1000px;
			height: 500px;
			
		}
		
		.display-footer {
			width: 1000px;
			height: 100px;
			margin: 0 auto;
			padding-top: 30px;
			border-top: 1px solid #ddd;
		}
		#audioDiv {
			width: 400px;
			margin: 0 auto;
			display: block;
		}
		#audio-output {
			width: 100%;
		}
		.display-rgb-row {
			width: 1000px;
			height: 80px;
		}
		.display-square {
			width: 60px;
			height: 60px;
			float: left;
			border-radius: 30px;
			margin-right: 10px;
			
			box-shadow: 2px 2px 2px 1px rgba(0,0,0,0.2);
		}
		.display-rgb-row p {
			margin: 5px 17px 5px 0;
			float: left;
			font-size: 2.5em;
		}
		.display-square-complete {
			background: #00f;
			background: -webkit-linear-gradient(#dfd, #afa);
			background: linear-gradient(#dfd, #afa);
			border-right: 2px solid #0a0;
		}
		.display-square-incomplete {
			background: #33f;
			background: -webkit-linear-gradient(#ddf, #aaf);
			background: linear-gradient(#ddf, #aaf);
			border-right: 1px solid #00f;
		}
		.display-square-on {
			background: #66f;
			background: -webkit-linear-gradient(#ffd, #ffa);
			background: linear-gradient(#ffd, #ffa);
			border-right: 1px solid #ff0;
		}
		/*
		1 2 3 4 5 
		if($_level > 5) 6 7 8 9 10 11
		{
			$_highestPiece = 4;
		}
		if($_level > 11) 12 13 14 15 16 17
		{
			$_highestPiece = 5;
		}
		if($_level > 17) 18 19 20 21 22 23 24 25
		{
			$_highestPiece = 6;
		}
		*/
		</style>
		<script type="text/javascript">
			
			var xGetBoard = new XMLHttpRequest();
			var globalPuzzleId = 1;
			
			function updateDisplay()
			{
				for(var i = 0; i < squares.length; i++)
				{
					if(squares[i].classList.contains("display-square-incomplete"))
						squares[i].classList.remove("display-square-incomplete");
					if(squares[i].classList.contains("display-square-complete"))
						squares[i].classList.remove("display-square-complete");
					if(squares[i].classList.contains("display-square-on"))
						squares[i].classList.remove("display-square-on");
					
					if(parseInt( squares[i].getAttribute("data-id") ) < globalPuzzleId)
					{
						squares[i].classList.add("display-square-complete");
					}
					else if(parseInt( squares[i].getAttribute("data-id") ) == globalPuzzleId)
					{
						squares[i].classList.add("display-square-on");
					}
					else
					{
						squares[i].classList.add("display-square-incomplete");
					}
					
				}
			}
			
			xGetBoard.onreadystatechange = function()
			{
				var _xError = "";
				if(this.readyState == 4 && this.status == 200)
				{
					if(this.responseText.toLowerCase().indexOf("phperror") > -1)
					{
						_xError = this.responseText.substring(9);
						message("Error: " + _xError);
						console.log(_xError);
					}
					else
					{
						var _puzzleData = JSON.parse(this.responseText);
						
						globalPuzzleId = parseInt( _puzzleData['puzzle_id'] );
						if(isNaN(globalPuzzleId)) { globalPuzzleId = 1; console.log("globalPuzzleId NaN e"); }
						
						
						updateDisplay();
						/*
							globalPuzzle = new String( _puzzleData['board'] ).split(" ");
							globalPuzzleC = new String( _puzzleData['board_complete'] ).split(" ");
							
							for(var i = 0; i < globalPuzzle.length; i++) {
								globalPuzzle[i] = parseInt( globalPuzzle[i] );
								if(isNaN(globalPuzzle[i])) { globalPuzzle[i] = 0; console.log("globalPuzzle NaN e"); }
							}
							
							for(var i = 0; i < globalPuzzleC.length; i++) {
								globalPuzzleC[i] = parseInt( globalPuzzleC[i] );
								if(isNaN(globalPuzzleC[i])) { globalPuzzleC[i] = 1; console.log("globalPuzzleC NaN e"); }
							}
							
							document.getElementById("title-message").innerHTML = DEFAULT_HEAD_TEXT = "TeamSolve - Puzzle " + globalPuzzleId + " / " + MAX_PUZZLES;
							updateGlobal();
						*/
					}
				}
			};
			var username = "88f-dis";
			function getDisplayBoardData()
			{
				var _postData = "u=" + username;
				xGetBoard.open("POST", "../main/get_board.php");
				xGetBoard.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
				xGetBoard.send(_postData);
			}
		</script>
	</head>
	<body>
		<div class="display-wrapper">
			<div class="display-header">
				<img src="../img/safari-pinned-tab.svg" type="image/svg">
				<h1>TeamSolve</h1>
				<h5>By Ryan Isler</h5>
			</div>
			<div class="url-wrapper">
				<p class="url-text">ryanisler.com/ts</p>
			</div>
			<div class="display-board">
				<div class="display-rgb-row display-rgbcmy">
					<p class='display-rgb-text'>RGBCMY</p>
					<div data-id='18' class='display-square display-square-incomplete'></div>
					<div data-id='19' class='display-square display-square-incomplete'></div>
					<div data-id='20' class='display-square display-square-incomplete'></div>
					<div data-id='21' class='display-square display-square-incomplete'></div>
					<div data-id='22' class='display-square display-square-incomplete'></div>
					<div data-id='23' class='display-square display-square-incomplete'></div>
					<div data-id='24' class='display-square display-square-incomplete'></div>
					<div data-id='25' class='display-square display-square-incomplete'></div>
				</div>
				<div class="display-rgb-row display-rgbcm">
					<p class='display-rgb-text'>RGBCM</p>
					<div data-id='12' class='display-square display-square-incomplete'></div>
					<div data-id='13' class='display-square display-square-incomplete'></div>
					<div data-id='14' class='display-square display-square-incomplete'></div>
					<div data-id='15' class='display-square display-square-incomplete'></div>
					<div data-id='16' class='display-square display-square-incomplete'></div>
					<div data-id='17' class='display-square display-square-incomplete'></div>
				</div>
				<div class="display-rgb-row display-rgbc">
					<p class='display-rgb-text'>RGBC</p>
					<div data-id='6' class='display-square display-square-incomplete'></div>
					<div data-id='7' class='display-square display-square-incomplete'></div>
					<div data-id='8' class='display-square display-square-incomplete'></div>
					<div data-id='9' class='display-square display-square-incomplete'></div>
					<div data-id='10' class='display-square display-square-incomplete'></div>
					<div data-id='11' class='display-square display-square-incomplete'></div>
				</div>
				<div class="display-rgb-row display-rgb">
					<p class='display-rgb-text'>RGB</p>
					<div data-id='1' class='display-square display-square-incomplete'></div>
					<div data-id='2' class='display-square display-square-incomplete'></div>
					<div data-id='3' class='display-square display-square-incomplete'></div>
					<div data-id='4' class='display-square display-square-incomplete'></div>
					<div data-id='5' class='display-square display-square-incomplete'></div>
				</div>
			</div>
		</div>
		<div class="display-footer">
			<div id = "audioDiv" title = '"Ambience" - by Ryan Isler'>
				<audio id = "audio-output" onmouseup = "javascript:aud_click(this);" loop="true" controls="true" autoplay="true"><source src="../img/Ambience.mp3" type="audio/mpeg" /></audio>
			</div>
			<script type = "text/javascript">
			
			var squares = document.getElementsByClassName("display-square");
			
				// From my Expanded Poem:
				// https://dma.hamline.edu/~risler01/webDesign/projects/expandedPoem/index.html
				// (url subject to change)
			
				var aud = document.getElementById("audio-output");
				var aud_in = cGetAudio(), aud_muted = aud.muted, aud_volume = aud.volume;
				
				function cWrite(isMuted, vol_int) {
					/*
				    var d = new Date(); d.setTime(d.getTime() + ((90)*24*60*60*1000)); var end = "expires="+d.toUTCString() + "; path=/";
				    document.cookie = "muted=" + isMuted + "; "; 
				    document.cookie = "vol=" + vol_int + "; " + end; 
				    //console.log(d, d.toUTCString());
				    //document.cookie = "username=John Doe; " + end;
				    */
				    return;
				}
				function cGetAudio() {
				    var d = ["false", "1.0"];
				    /*
				    if(document.cookie != "") {
				        var at = document.cookie.indexOf("muted"); // muted=false; | muted=true;
				        var at2 = document.cookie.indexOf("vol"); // vol=0; | vol=0.99;
				        if(at != -1) {
				            d[0] = ( (String(document.cookie).substring(at, (at + 12)) ).split("=")[1] ).split(";")[0];
				        }
				        if(at2 != -1) {
				            d[1] = ( (String(document.cookie).substring(at2, (at2 + 8)) ).split("=")[1] ).split(";")[0];
				        }
				    }
				    */
				    return d;
				}
				
				function aud_click(e) { 
					/*
				    setTimeout(function() {
				    //aud_muted = aud.muted;
				   // aud_volume = aud.volume;
				    cWrite(aud.muted, aud.volume);
				}, 100);
				*/
				    return;
				}
				aud.muted = ((aud_in[0] == "true") ? true : false); 
				aud.volume = parseFloat(aud_in[1]); 
				//console.log(aud_in[1]);
	        </script>
	        <script type="text/javascript">
				getDisplayBoardData();
				
				// What a descriptive variable name!
				var ___ = setInterval(function(){
					getDisplayBoardData();
				}, 25000);
	        </script>
		</div>
	</body>
</html>