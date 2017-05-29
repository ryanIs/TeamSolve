<!doctype html>
<!-- Created by Ryan Isler - 2017 -->
<!-- Thanks to Ramsey Isler for web & server Hosting -->
<html>
	<head>
	
		<title>TeamSolve</title>
		
		<meta name="author" content="Ryan Isler">
		<meta name="description" content="TeamSolve is a web game that pushes players to think in creative ways in order to solve puzzles using teamwork and cooperation.">
		<meta name="keywords" content="TeamSolve, Ryan, Isler, Hamline University, Digital Media Arts">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<meta charset="UTF-8">
		
		<link rel="icon" type="image/png" sizes="16x16" href="img/favicon-16x16.png">
		<link rel="icon" type="image/png" sizes="32x32" href="img/favicon-32x32.png">
		<link rel="icon" type="image/png" sizes="96x96" href="img/favicon-96x96.png">
		<link rel="apple-touch-icon" sizes="57x57" href="img/apple-touch-icon-57x57.png">
		<link rel="apple-touch-icon" sizes="60x60" href="img/apple-touch-icon-60x60.png">
		<link rel="apple-touch-icon" sizes="72x72" href="img/apple-touch-icon-72x72.png">
		<link rel="apple-touch-icon" sizes="76x76" href="img/apple-touch-icon-76x76.png">
		<link rel="apple-touch-icon" sizes="114x114" href="img/apple-touch-icon-114x114.png">
		<link rel="apple-touch-icon" sizes="120x120" href="img/apple-touch-icon-120x120.png">
		<link rel="apple-touch-icon" sizes="144x144" href="img/apple-touch-icon-144x144.png">
		<link rel="apple-touch-icon" sizes="152x152" href="img/apple-touch-icon-152x152.png">
		<link rel="manifest" href="js/manifest.json">
		<link rel="mask-icon" href="img/safari-pinned-tab.svg" color="#5bbad5">
		<meta name="msapplication-TileColor" content="#ffffff">
		<meta name="msapplication-TileImage" content="img/mstile-144x144.png">
		<meta name="theme-color" content="#ffffff">
		
		<!-- JQUERY -->
		<script src="js/jquery.min.js" type="text/javascript"></script>
		
		<!-- BOOTSTRAP -->
		<link rel="stylesheet" href="css/bootstrap.min.css">
		<script src="js/bootstrap.min.js" type="text/javascript"></script>
		
		<!-- CSS -->
		<link rel="stylesheet" href="css/style.css">
		
		<!-- JAVASCRIPT -->
		<script src="js/header.js" type="text/javascript"></script>
		<script src="js/script.js" type="text/javascript"></script>
		
	</head>
	<body>
		<div class="welcome">
			<div class="welcome-wrapper">
				<img src="img/safari-pinned-tab.svg" type="image/svg">
				<h1>Welcome to TeamSolve!</h1>
				<h4>TeamSolve is a puzzle game that is completed through teamwork!</h4>
				<span id="welcome-ui">
					<p style="font-size: 0.8em; color: #888;">Login to TeamSolve (account created automatically)</p>
					<p id="welcome-username">USERNAME</p>
					<form action="javascript:void(0);" onsubmit="return loginButtonClick(this);">
						<input id="username-text" type="text" maxlength="20" value="">
						<input id="login-button" type="submit" value="Login">
					</form>
				</span>
			</div>
		</div>
		<div class="artist">
			<div class="artist-wrapper">
				<h1>Artist Statement</h1>
				<p>
				
				My work is about bringing a community to one virtual place and asking them how they can be creative in solving problems through teamwork. A large influence for me designing this project is seeing how people choose to interact with one another once they know how much good (or bad) they can do in solving these puzzles. The interactions using the TeamSolve chat system, placing pieces, and possibly complicating the outcome are indicative of the level of swiftness, accuracy and creativity at which puzzles are completed.  The psychology of gaming (specifically online-gaming) allows users to be more deviant because of how the virtual medium of online video gaming removes the person-to-person contact. I believe that when people are given the power to be able to act without consequence, a new realm of behavior is explored. This is carefree state of mind is what intrigues me the most.

				</p>
			</div>
		</div>
		<div class="about">
			<div class="about-wrapper">
				<h1>About - TeamSolve</h1>
				<h4>TeamSolve is a game designed to get people to worked together.</h4>
				<h4>It is developed for mobile devices, however can be played on desktop too.</h4>
				<h4>Players earn puzzle pieces and colors by completing local puzzles.</h4>
				<h4>Then they are able to use those gained pieces on the group puzzle.</h4>
				<br>
				<div class='how-to' style="background: rgba(255,255,255,0.5); border-radius: 40px; padding: 20px;">
					<h1 style="text-align: left;">How to Play</h1>
					<h4 style="text-align: left;">1. Once you create a login, click on the green arrow to begin.</h4>
					<h4 style="text-align: left;">2. Tap the dashed squares in the center to place pieces.</h4>
					<h4 style="text-align: left;">3. Tap the top-right (red/green/blue) circle to change color.</h4>
					<h4 style="text-align: left;">4. Once you complete the puzzle, you will earn global pieces.</h4>
					<h4 style="text-align: left;">5. Click the green arrow to access the global puzzle. </h4>
					<h4 style="text-align: left;">6. Tap on any square to place your piece. </h4>
				</div>
				<h4>Have fun!</h4>
				<h1>About - Author</h1>
				<h4>Ryan Isler is a graduating senior majoring in:</h4>
				<h4>Digital Media Arts at Hamline University</h4>
				<h4>He loves to play/make games, write music, and design webs!</h4>
				<h4>In addition to that, he greatly enjoys the company of cats. </h4>
				<h4>Have fun!</h4>
			</div>
		</div>
		
		<div class="footer">
			<div class="footer-wrapper gray-text">
				<p>Created by <a class="footer-link" href="https://dma.hamline.edu/~risler01/">Ryan Isler</a> - 2017</p>
				<div class="social-link-wrapper">
					<a class="social-link" href="mailto:risler01@hamline.edu">e</a>
					<a class="social-link" href="https://www.facebook.com/RyanIslerDesigner/">f</a>
					<a class="social-link" href="https://twitter.com/ryanisl">t</a>
					<a class="social-link" href="https://www.youtube.com/user/ryanisl">yt</a>
					<a class="social-link" href="https://www.linkedin.com/in/ryan-isler-184907ba">in</a>
					<a class="social-link" href="http://www.ryanisler.com/">r</a>
				</div>
			</div>
		</div>
		
		<div class="container"></div>
		
	</body>
</html>