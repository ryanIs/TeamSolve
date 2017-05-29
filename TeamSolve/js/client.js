/**
 * client.js
 *
 * This javascript file handles the majority of the client-side functionality
 * of TeamSolve. The most important of which are: 
 * 		> Saving and loading user data.
 		> Configuring and displaying UI/UX
 		> Sending and receving data from the PHP web server.
 		> Handling TeamSolve game commands.
 *
 */
 
// Associative object containing players number of colors and pieces.
var pieces;
// 1 red 2 green 3 blue 4 cyan 5 magenta 6 yellow
var piece = 1;
// 1 square 2 triangle 3 pentagon 4 circle
var shape = 1;
// Chosen color-set (1 rgb, 0 cmy)

// rgb is a switch used for determining what color-set is in use.
var rgb = 1;
var rgbPiece = 1;
var cmyPiece = 4;

// Local puzzle 
// 0 red 1 green ...
var puzzles;
var puzzlesC; // Completed puzzle

// Deprecated: puzzle shapes were removed in the 4th critical analysis.
//			   as the combination of both shape and color became too
//			   confusing for players.
// 0 squ 1 tri ...
var puzzlesS = []; 
var puzzlesSC = [];

// Global (shared) puzzle
var globalPuzzleId = 1;
var globalPuzzle = [0, 0, 0, 0, 0,
					0, 0, 0, 0, 0,
					0, 0, 0, 0, 0,
					0, 0, 0, 0, 0,
					0, 0, 0, 0, 0];
var globalPuzzleC = [1, 2, 1, 2, 1,
					 2, 1, 2, 1, 2,
					 1, 2, 1, 2, 1,
					 2, 1, 2, 1, 2,
					 1, 2, 1, 2, 1];
					 
// Array of HTMLDom board objects
var globalBoard;
var globalRequest = 0;
var globalClientSet = [1, 0];
var globalNextPuzzle = [];
var globalNextPuzzleC = [];
var globalComplete = false;
// var globalPuzzlesHistory;
// var globalPuzzlesHighscores;

var MAX_PUZZLES = 25;
const MAX_BOARD_PIECES = 25;

// Experience level-up amount.
var xpM = 45;

// JavaScript & CSS UI/UX display parameters
var BUTT_SEL = "#34344f";
var BUTT_SELN = "#aaa";
var RGB_PUZZLE_SIDE = "192px";
var RGB_PUZZLE_PADDING = "20px";
var RGB_PUZZLE_SIDEI = "152px";
var RGB_PUZZLE_PADDINGI = "0";
var CMY_PUZZLE_SIDE = "260px";
var CMY_PUZZLE_PADDING = "20px";
var CMY_PUZZLE_SIDEI = "222px";
var CMY_PUZZLE_PADDINGI = "0";
var TAB_XP_BACKGROUND = "linear-gradient(#0f0, #070)"; 
var TAB_XP_BACKGROUNDL = "linear-gradient(#ff5, #990)";
var COLOR_RED = "#ebb"; // "radial-gradient(#ebb,  #a88)"
var COLOR_GREEN = "#beb";
var COLOR_BLUE = "#bbe";
var COLOR_CYAN = "#bee";
var COLOR_MAGENTA = "#ebe";
var COLOR_YELLOW = "#eeb";
var SHAPE_SQUARE = "url('../img/shape-square.png') #eee";
var SHAPE_CIRCLE = "url('../img/shape-circle.png') #eee";
var SHAPE_TRIANGLE = "url('../img/shape-triangle.png') #eee";
var SHAPE_PENTAGON = "url('../img/shape-pentagon.png') #eee";
var SHAPE_SQUARE_ = "../img/shape-square.png";
var SHAPE_CIRCLE_ = "../img/shape-circle.png";
var SHAPE_TRIANGLE_ = "../img/shape-triangle.png";
var SHAPE_PENTAGON_ = "../img/shape-pentagon.png";
var DEFAULT_HEAD_TEXT = "TeamSolve - Puzzle #" + globalPuzzleId;// + " / " + MAX_PUZZLES;

// Auto-logout feature
var updateInterval = -1, messageTimeout = -1;
var AUTO_UPDATE = true;
var AUTO_UPDATE_TIME = 10000;
var autoLogoutInterval = -1;
var AUTO_LOGOUT_TIME = 45000; // 45000
var autoLogoutChecks = 0;
var windowBlur = false, tabBlur = false;
var totalUpdatesThisLevel = 0;
var TOTAL_UPDATES_THIS_LEVEL_MAX = 180;

// Implementation of a tutorial using p-tags was mentioned, however the
// application proved to be intuitive enough in design. Not required.
var tut = 0;

// Client login information
var username;

// Set the log in based on the search (provided by the root/index.php login form).
var clientLoggedIn = checkLoggedInStatus( username = getSearch("u") );

var TAB_CLOSED_VAR = "85%";
var tabOpened = false;
var winTimeout = -1, messageTimeout = -1;

// JavaScript AJAX variables. These are used to asynchronously converse with the PHP (and MySQL) server.
var xGetBoard = new XMLHttpRequest(), xSetPiece = new XMLHttpRequest(), xBoard = new XMLHttpRequest();

/**
 * Handles the XML http request for receiving the initial state
 * of the board. This is called when [a new user] connects to 
 * the server and when a puzzle is complete.
 */
xGetBoard.onreadystatechange = function()
{
	// Begin with no-error.
	var _xError = "";
	
	// Connection to PHP server command successful.
	if(this.readyState == 4 && this.status == 200)
	{
		// Catch for PHP server errors.
		if(this.responseText.toLowerCase().indexOf("phperror") > -1)
		{
			_xError = this.responseText.substring(9);
			message("Error: " + _xError);
			console.log(_xError);
		}
		// No errors - parse board data.
		else
		{
			// Use JSON class to parse the incomming data from the server.
			// The format used in TeamSolve for server/client contact is:
			// JSON (associative arrays).
			var _puzzleData = JSON.parse(this.responseText);
			
			// Append the globalPuzzleId (as int). Also supply error trapping for NaN.
			globalPuzzleId = parseInt( _puzzleData['puzzle_id'] );
			if(isNaN(globalPuzzleId)) { globalPuzzleId = 1; console.log("globalPuzzleId NaN e"); }
			
			// Append the puzzle board data, and the puzzle board complete data to [this] client data.
			globalPuzzle = new String( _puzzleData['board'] ).split(" ");
			globalPuzzleC = new String( _puzzleData['board_complete'] ).split(" ");
			
			// Parse to int (from JSON string)
			for(var i = 0; i < globalPuzzle.length; i++) {
				globalPuzzle[i] = parseInt( globalPuzzle[i] );
				if(isNaN(globalPuzzle[i])) { globalPuzzle[i] = 0; console.log("globalPuzzle NaN e"); }
			}
			
			for(var i = 0; i < globalPuzzleC.length; i++) {
				globalPuzzleC[i] = parseInt( globalPuzzleC[i] );
				if(isNaN(globalPuzzleC[i])) { globalPuzzleC[i] = 1; console.log("globalPuzzleC NaN e"); }
			}
			
			// Update the UI
			document.getElementById("title-message").innerHTML = DEFAULT_HEAD_TEXT = "TeamSolve - Puzzle #" + globalPuzzleId;// + " / " + MAX_PUZZLES;
			
			// Update the global puzzle board.
			updateGlobal();
		}
	}
};

/**
 * Handles the XML http request for sending (placing) a piece
 * on the global board. The 'global puzzle board' is a MySQL
 * table that contains the data {string} of the board, and
 * the completed board.
 */
xSetPiece.onreadystatechange = function()
{
	
	var _xError = "";
	
	if(this.readyState == 4 && this.status == 200)
	{
		// Server UPDATE unsuccessful, display error
		if(this.responseText.toLowerCase().indexOf("phperror") > -1)
		{
			_xError = this.responseText.substring(9);
			message("Piece error: " + _xError);
			console.log(_xError);
		}
		// Server UPDATE successful, apply to [sender] client
		else
		{
			
			//console.log(this.responseText);
			
			// The first character of the responseText will be special character 'b'
			// if the result of xSetPiece.send(...) successfully completed the
			// global puzzle.
			if(this.responseText.charAt(0) == "b")
			{
				// Get the new puzzle from the server.
				var _newPuzzleStr = this.responseText.substr(2);
				
				// Parse
				globalNextPuzzleC = _newPuzzleStr.split(" ");
				
				for(var i = 0; i < globalNextPuzzleC.length; i++) {
					globalNextPuzzleC[i] = parseInt( globalNextPuzzleC[i] );
					if(isNaN(globalNextPuzzleC[i])) { globalNextPuzzleC[i] = 1; console.log("globalPuzzle NaN e"); }
				}
				
				resetGlobalNextPuzzle();
				
				globalPuzzleComplete();
				
				// console.log(globalPuzzleC);
			}
			
			// Special character 'c' is used when [my] AJAX call was 'beat' by
			// someone else (catch case for simultaneous global puzzle updating).
			// No (MySQL) UPDATE was made, display puzzle complete, move on.
			else if(this.responseText.charAt(0) == "c")
			{
				globalNextPuzzle = [];
				globalNextPuzzleC = [];
				globalPuzzle = globalPuzzleC;
				globalPuzzleComplete();
				updateGlobal();
			}
			
			// Puzzle piece placement worked successfully.
			else
			{
				message("Piece successfully placed!");
				globalPuzzle[globalClientSet[1]] = globalClientSet[0];
			}
			
			updateGlobal();
			
		}
	}
};

/**
 * Handles the XML http request for updating the global board.
 * This request is used instead of xGetBoard because there is
 * no need to retrieve unnecessary additional data about the
 * main global puzzle while the puzzle is simply having pieces
 * added to it. 
 *
 * This request is made every [10 seconds]. In earlier versions
 * of TeamSolve, the lower the number (meaning higher AJAX requests
 * made to the server*), meant slower server-response time. This 
 * solves the traffic-overload issue.
 */
xBoard.onreadystatechange = function()
{
	var _xError = "";
	if(this.readyState == 4 && this.status == 200)
	{
		if(this.responseText.toLowerCase().indexOf("phperror") > -1)
		{
			_xError = this.responseText.substring(9);
			message("Piece error: " + _xError);
			console.log(_xError);
		}
		else
		{
			//alert("p: "+this.responseText);
			
			var _puzzleData = JSON.parse(this.responseText);
			
			globalPuzzle = new String( _puzzleData['board'] ).split(" ");
			
			for(var i = 0; i < globalPuzzle.length; i++) {
				globalPuzzle[i] = parseInt( globalPuzzle[i] );
				if(isNaN(globalPuzzle[i])) { globalPuzzle[i] = 0; console.log("globalPuzzleNaN e"); }
			}
			
			// If [the user] is watching the board be completed by other players,
			// update the state of completion upon receiving a new version of the
			// global board.
			if(isGlobalPuzzleComplete())
			{
				// Complete the global board.
				globalPuzzleComplete();
			}
			
			updateGlobal();
		}
	}
};

/**
 * Checks completion of the global puzzle.
 * @returns {Boolean} - Board complete.
 */
function isGlobalPuzzleComplete()
{
	var _complete = true;
	for(var i = 0; i < MAX_BOARD_PIECES; i++)
	{
		if(globalPuzzle[i] != globalPuzzleC[i])
		{
			_complete = false;
			break;
		}
	}
	return _complete;
}

/** 
 * nextPuzzle iterates the local puzzle.
 * Local puzzles are used to gain experience and pieces to use
 * on the main puzzle.
 */
function nextPuzzle()
{
	globalPuzzleId += 1;
	totalUpdatesThisLevel = 0;
	
	if(globalPuzzleId > MAX_PUZZLES)
	{
		globalPuzzleId = 1;
	}
	
	resetGlobalPuzzle();
	
	// If user already has next puzzle data
	if(globalNextPuzzleC.length > 0)
	{
		globalPuzzleC = globalNextPuzzleC;
		globalNextPuzzle = [];
		globalNextPuzzleC = [];
	}
	
	// Get board data.
	else
	{
		// get_board must be used because the complete board changes as well.
		p("get_board");
		resetAutoUpdate();
	}
	
	document.getElementById("title-message").innerHTML = DEFAULT_HEAD_TEXT = "TeamSolve - Puzzle #" + globalPuzzleId;// + " / " + MAX_PUZZLES;
	updateGlobal();
}

// This timeout variable was used for debugging purposes.
var puzzleCompleteTimeout = -1;

/**
 * This function is called after the global puzzle animation
 * is complete. This is a callback function.
 */
function globalPuzzleCompleteEnd()
{
	globalComplete = false;
	nextPuzzle();
}

/**
 * This function is called when the global puzzle is complete.
 * This is called from a variety of places when communicating with
 * the server (updating the board, regular interval checks, or piece
 * placing).
 */
function globalPuzzleComplete()
{
	globalPuzzle = globalPuzzleC;
	if(globalPuzzleId < 25)
	{
		message("Puzzle # " + globalPuzzleId + " complete!", 4000);
	}
	// (global) Game victory
	else
	{
		message("TeamSolve Victory! Puzzle # " + globalPuzzleId + " complete!", 4000);
	}
	puzzleCompleteTimeout = setTimeout(globalPuzzleCompleteEnd, 4000);
	
	globalComplete = true;
}

/**
 * This resets the global puzzle. This is useful for after
 * global puzzles are complete. It is resourceful to place
 * this command in a function for variability in future use.
 */
function resetGlobalPuzzle()
{
	globalPuzzle = [0, 0, 0, 0, 0,
					0, 0, 0, 0, 0,
					0, 0, 0, 0, 0,
					0, 0, 0, 0, 0,
					0, 0, 0, 0, 0];
}

/**
 * This resets the global next puzzle. It is slightly depricated.
 * I say that because it is called only when [this client] completes
 * the global board.
 */
function resetGlobalNextPuzzle()
{
	globalNextPuzzle = [0, 0, 0, 0, 0,
					0, 0, 0, 0, 0,
					0, 0, 0, 0, 0,
					0, 0, 0, 0, 0,
					0, 0, 0, 0, 0];
}

/**
 * Update the UI with global puzzle data.
 */
function updateGlobal()
{
	//document.getElementById("title-message").innerHTML = DEFAULT_HEAD_TEXT = "TeamSolve - Puzzle " + globalPuzzleId + " / " + MAX_PUZZLES;
	for(var i = 0; i < MAX_BOARD_PIECES; i++)
	{
		globalBoard[i].style.backgroundColor = getBGPieceColor(globalPuzzle[i]);
		globalBoard[i].style.borderColor = getBDPieceColor(globalPuzzleC[i]);
	}
}

/**
 * Handles reseting the in-game header text.
 */
function messageEnd()
{
	document.getElementById("title-message").innerHTML = DEFAULT_HEAD_TEXT;
}

/**
 * Shows a message for a period of time; if -1, displays infinitely.
 * @param _message {String} - The message to be displayed to the user.
 * @param _duration {Number} - The length (ms) for the message to be displayed.
 *
 * I use if(_duration == null) instead of setting a temp variable
 * because some Hamline University users' phones were using an outdated
 * version of JavaScript which does not allow default parameters.
 */
function message(_message, _duration)
{
	if(_duration == null)
	{
		_duration = 4000;
	}
	document.getElementById("title-message").innerHTML = _message;
	
	if(_message == "0")
	{
		document.getElementById("title-message").innerHTML = DEFAULT_HEAD_TEXT;
	}
	
	if(messageTimeout > -1)
	{
		clearTimeout(messageTimeout);
	}
	if(_duration > -1)
	{
		messageTimeout = setTimeout(messageEnd, _duration);
	}
}

/**
 * This resets the interval for calling the server.
 * This function is called when a recent call was made to the 
 * server. This is useful in ensuring the server does not get
 * overloaded.
 */
function resetAutoUpdate(_newTime)
{
	if(_newTime == null)
	{
		_newTime = AUTO_UPDATE_TIME	
	}
	
	clearInterval(updateInterval)
	updateInterval = setInterval(updateHandler, AUTO_UPDATE_TIME = _newTime);
}

/**
 * This function handles the auto logout system. If the user is not focused
 * on any puzzle board (say, they clicked a different tab in browser), then
 * they are logged out.
 *
 * The purpose for this ensure the server isn't being overloaded by players
 * leave their TeamSolve client application open, however are not using the 
 * application.
 *
 * This function is called every 10 seconds (unless resetAutoUpdate is used).
 * This functioin makes a request to the server for global puzzle data.
 */
function updateHandler()
{
	// If the user is FOCUSED on the application or the tab application
	if(windowBlur == false || tabBlur == false)
	{
		if(AUTO_UPDATE && clientLoggedIn)
		{
			// Get data from board.
			p("board");
			
			$("#server-bar").animate({
				width: "0%"
			}, AUTO_UPDATE_TIME, "linear", function() { 
				$(this).css("width", "100%");
			});
			if(++totalUpdatesThisLevel > TOTAL_UPDATES_THIS_LEVEL_MAX)
			{
				window.location = TEAMSOLVE_INDEX + "?rdr=3";
			}
			if(globalRequest != 0)
			{
				globalRequest = 0;
			}
			if(document.getElementById("title-message").innerHTML.indexOf("must wait") > -1)
			{
				message("0");
			}
		}
	}
}

/**
 * This function is the most important function in this program.
 * It contacts the PHP server with requests of _request type.
 * Depending on the response, the server will 
 *
 * @param _request {String} - This is the type of request the server will respond to.
 * @params ... {*} - Additional arguments are supplied upon type of request
 *		@param _pieceValue {Number} - (Used with "set_piece" request) Type of the piece to set.
 *		@param _pieceValue {Number} - (Used with "set_piece" request) Index in puzzle to set the piece.
 */
function p(_request)
{
	if(clientLoggedIn)
	{
		if(_request == "get_board")
		{
			var _postData = "u=" + username;
			xGetBoard.open("POST", "../main/get_board.php");
			xGetBoard.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			xGetBoard.send(_postData);
		}
		else if(_request == "board")
		{
			// if not currently viewing victory fanfare.
			if(globalComplete == false)
			{
				var _getData = "u=" + username + "&g=" + globalPuzzleId;
				xBoard.open("GET", "../main/board.php?" + _getData);
				xBoard.send();
			}
		}
		else if(_request == "set_piece")
		{
			if(globalRequest == 0)
			{
				var _pieceVal = arguments[1], _targetVal = arguments[2];
				if(_pieceVal == null) _pieceVal = 1;
				if(_targetVal == null) _targetVal = 0;
				
				var _getData = "u=" + username + "&g=" + globalPuzzleId + "&p=" + _pieceVal + "&t=" + _targetVal;
				xSetPiece.open("GET", "../main/set_piece.php?" + _getData);
				xSetPiece.send();
				
				resetAutoUpdate();
				
				globalRequest = 1;
				message("Placing piece...");
			}
		}
	}
}

/**
 * Gets the experience for leveling-up at "level" level.
 * The experience is used to boost player morale.
 * @param level {Number} - Level to calculate experience.
 * @returns {Number} - XP for the input level.
 */
function getXPForLevel(level)
{
	// _xp += 45 + ((i * 10)):
	// 1	 2		3	 4	 	5	 6		7	 	8	 9		 10
	// 45	 100 	165	 240 	325	 420 	525 	640	 765	 900 
	var _xp = 0;
	for(var i = 0; i < level; i++)
	{
		_xp += 45 + ((i * 10));
	}
	return _xp;
}

/**
 * This uses the client's cookie data to (hopefully) load in
 * the TeamSolve pieces object. This contains all important, 
 * useful information in the involvment of the TeamSolve
 * gameful executions.
 */
function loadUserInfo()
{
	// Account already has data - load it
	var _accountData = getCookie(username + "_pieces");
	if(_accountData !== "")
	{
		// load info
		pieces = JSON.parse(_accountData);
		xpM = getXPForLevel(pieces.level);
		return 1;
	}
	// Create new account 
	else
	{
		pieces = {
			rgb: 0,
			cmy: 0,
			level: 1, 
			xp: 0
		};
		xpM = getXPForLevel(pieces.level);
			
		return 0;
	}
	return 0;
}

/**
 * This saves the primary TeamSolve "pieces" object to
 * the users computer via cookie.
 */
function saveUserInfo()
{
	if(pieces != null)
	{
		setCookie(username + "_pieces", JSON.stringify(pieces));
		return 1;
	}
	return 0;
}


/**
 * Tests client-side logged in status. Boot from this page is invalid.
 * @param user {String} - Username supplied by the user.
 * @returns {Boolean} - flag for logged in status
 */
function checkLoggedInStatus(user)
{
	if(user == null || user == "")
	{
		window.location = TEAMSOLVE_INDEX; // cya noob
		return false;
	}
	return true;
}

/**
 * Clicking on the primary, green tab button.
 * This opens the tab interface (IFrame, animation).
 * @param target {HTMLDomElement} - The clicked object.
 */
function tabButtonClick(target)
{
	if(tabOpened == false)
	{
		tabIFrame.style.top = "1%";
		tabOpened = true;
		tabDoc.getElementById("tab-tri").style.borderTop = "30px solid transparent";
		tabDoc.getElementById("tab-tri").style.borderRight = "30px solid #272";
	}
	else
	{
		tabIFrame.style.top = TAB_CLOSED_VAR; // 85%
		tabOpened = false;
		tabDoc.getElementById("tab-tri").style.borderTop = "30px solid #272";
		tabDoc.getElementById("tab-tri").style.borderRight = "30px solid transparent";
	}
}

/**
 * Clicking on the (bottom-right) color button.
 * This changes the color of the current piece to place (RGB).
 * @param target {HTMLDomElement} - The clicked object.
 */
function colorButtonClick(target)
{
	// todo: here
	var _colBut = document.getElementById("tab-iframe").contentDocument.getElementById("color-butt");
	if(rgb == 1)
	{
		if(piece == 1) 
		{
			piece = 2;
			rgbPiece = piece;
			_colBut.style.background = COLOR_GREEN;
		}
		else if(piece == 2) 
		{
			piece = 3;
			rgbPiece = piece;
			_colBut.style.background = COLOR_BLUE;
		}
		else if(piece == 3) 
		{
			piece = 1;
			rgbPiece = piece;
			_colBut.style.background = COLOR_RED;
		}
	}
	else 
	{
		rgb = 1;
		piece = rgbPiece;
	}
	updateTabInterface();
}

/**
 * This populates the tab IFrame with accurate internal data.
 * This is used when updating the UI.
 */
function updateTabInterface()
{
	var _shapeText = document.getElementById("tab-iframe").contentDocument.getElementById("shape-text");
	var _shapeBut = document.getElementById("tab-iframe").contentDocument.getElementById("shape-butt");
	var _colText = document.getElementById("tab-iframe").contentDocument.getElementById("color-text");
	var _colBut = document.getElementById("tab-iframe").contentDocument.getElementById("color-butt");
	_colText.innerHTML = pieces.rgb;
	_shapeText.innerHTML = pieces.cmy;
	if(rgb == 1)
	{
		if(_shapeBut.className.indexOf("tab-sel") > -1) _shapeBut.classList.remove("tab-sel");
		if(_colBut.className.indexOf("tab-sel") == -1) _colBut.classList.add("tab-sel");
		_colText.style.color = BUTT_SEL;
		_shapeText.style.color = BUTT_SELN;
	}
	else if(rgb == 0)
	{
		if(_colBut.className.indexOf("tab-sel") > -1) _colBut.classList.remove("tab-sel");
		if(_shapeBut.className.indexOf("tab-sel") == -1) _shapeBut.classList.add("tab-sel");
		_colText.style.color = BUTT_SELN;
		_shapeText.style.color = BUTT_SEL;
	}
}

/**
 * Clicking on the (bottom-left) color button.
 * This changes the color of the current piece to place (CMY).
 *
 * Internally, this is named "shapeButtonClick" because the original
 * feature was to have shapes be implemented as well. However, during 
 * critical analysis sessions, this feature turned out to be too confusing.
 *
 * @param target {HTMLDomElement} - The clicked object.
 */
function shapeButtonClick(target)
{
	var _shapeBut = document.getElementById("tab-iframe").contentDocument.getElementById("shape-butt");
	if(rgb == 0)
	{
		if(piece == 4) 
		{
			cmyPiece = 5;
			piece = 5;
			_shapeBut.style.background = COLOR_MAGENTA;
		}
		else if(piece == 5) 
		{
			cmyPiece = 6;
			piece = 6;
			_shapeBut.style.background = COLOR_YELLOW;
		}
		else if(piece == 6) 
		{
			cmyPiece = 4;
			piece = 4;
			_shapeBut.style.background = COLOR_CYAN;
		}
	}
	else
	{
		rgb = 0;
		piece = cmyPiece;
	}
	updateTabInterface();
}

/**
 * Generates completed puzzle array based on user level.
 * These (random) puzzles are what the borders of the puzzle pieces
 * will appear to be. Players are prompted to fill in the color
 * to this (completed) color.
 */
function getPuzzleC(_puzzleId)
{
	var __max = 3;
	var _puzz = [1 + random(__max), 1 + random(__max), 1 + random(__max), 1 + random(__max)];
	
	if(pieces != null)
	{
		if(pieces.level > 4) __max = 4; // cyan included in puzzles.
		if(pieces.level > 9) __max = 5; // magenta included in puzzles.
		if(pieces.level > 14) __max = 6; // yellow included in puzzles.
	}
	
	switch(_puzzleId)
	{
		case 0:
		case 1:
		case 2:
		default:
			_puzz = [1 + random(__max), 1 + random(__max), 1 + random(__max), 1 + random(__max)];
		break;
		
		case 3:
		case 4:
		case 5:
		case 6:
			_puzz = [1 + random(__max), 1 + random(__max), 1 + random(__max),
					 1 + random(__max), 1 + random(__max), 1 + random(__max),
					 1 + random(__max), 1 + random(__max), 1 + random(__max)];
		break;
	}
	return _puzz;
}

/**
 * Generates a new set of (client) puzzles for the user to complete.
 * Again, puzzleS is depricated, as shapes were too confusing.
 */
function generatePuzzles()
{
	puzzles = [ 
		[0,0,0,0],
		[0,0,0,0],
		[0,0,0,0],
		[0,0,0,
		 0,0,0,
		 0,0,0
		],
		[0,0,0,
		 0,0,0,
		 0,0,0
		],
		[0,0,0,
		 0,0,0,
		 0,0,0
		],
		[0,0,0,
		 0,0,0,
		 0,0,0
		]
	];
	/*
	puzzlesS = [ 
		[1,1,1,1],
		[1,1,1,1],
		[1,1,1,1],
		[1,1,1,
		 1,1,1,
		 1,1,1
		],
		[1,1,1,
		 1,1,1,
		 1,1,1
		],
		[1,1,1,
		 1,1,1,
		 1,1,1
		],
		[1,1,1,
		 1,1,1,
		 1,1,1
		]
	];
	*/
	puzzlesC = [
		getPuzzleC(0),
		getPuzzleC(1),
		getPuzzleC(2),
		
		getPuzzleC(3),
		 
		getPuzzleC(4),
		 
		getPuzzleC(5),
		 
		getPuzzleC(6)
	];
	/*
	puzzlesSC = [
		[1,1,1,1], // squares only
		[1,1,1,1],
		[1,1,1,1],
		
		[1 + random(2), 1 + random(2), 1 + random(2), // squ: squares and tri
		 1 + random(2), 1 + random(2), 1 + random(2),
		 1 + random(2), 1 + random(2), 1 + random(2)],
		 
		 [1 + random(2), 1 + random(2), 1 + random(2), // tri: squares and tri
		 1 + random(2), 1 + random(2), 1 + random(2),
		 1 + random(2), 1 + random(2), 1 + random(2)],
		 
		 [1 + random(3), 1 + random(3), 1 + random(3), // pent: squares and tri
		 1 + random(3), 1 + random(3), 1 + random(3),
		 1 + random(3), 1 + random(3), 1 + random(3)],
		 
		 [1 + random(4), 1 + random(4), 1 + random(4), // cir: squares and tri
		 1 + random(4), 1 + random(4), 1 + random(4),
		 1 + random(4), 1 + random(4), 1 + random(4)]
	];
	*/
}

/**
 * Returns the CSS color value for type of piece.
 * @param _piece {Number} - Type of piece.
 * @returns {String} - HEX value color.
 */
function getBGPieceColor(_piece)
{
	var _col = "#f00";
	switch(_piece)
	{
		case 0:
			_col = "transparent";
		break;
		case 1:
		default:
			_col = "#f00"; //COLOR_RED;
		break;
		case 2:
			_col = "#0f0"; //COLOR_GREEN;
		break;
		case 3:
			_col = "#00f"; //COLOR_BLUE;
		break;
		case 4:
			_col = "#0ff";
		break;
		case 5:
			_col = "#f0f"
		break;
		case 6:
			_col = "#ff0"; 
		break;
	}
	return _col;
}

/**
 * Returns the CSS color value for border of piece.
 * Borders are slightly lighter to enhance ability to discern
 * what goes where.
 * @param _piece {Number} - Type of piece.
 * @returns {String} - HEX value color.
 */
function getBDPieceColor(_piece)
{
	var _col = "#f88";
	switch(_piece)
	{
		case 1:
		default:
			_col = "#f88"; //COLOR_RED;
		break;
		case 2:
			_col = "#8f8"; //COLOR_GREEN;
		break;
		case 3:
			_col = "#88f"; //COLOR_BLUE;
		break;
		case 4:
			_col = "#8ff";
		break;
		case 5:
			_col = "#f8f"
		break;
		case 6:
			_col = "#ff8"; 
		break;
	}
	return _col;
}

/**
 * DEPRICATED
 * Returns shape image url based on input piece
 * @param _piece {Number} - Type of piece.
 * @returns {String} - shape image url
 */
function getBGShapeImage(_piece)
{
	var _sha = SHAPE_SQUARE_;
	switch(_piece)
	{
		case 1:
		default:
			_sha = SHAPE_SQUARE_;
		break;
		case 2:
			_sha = SHAPE_TRIANGLE_;
		break;
		case 3:
			_sha = SHAPE_PENTAGON_;
		break;
		case 4:
			_sha = SHAPE_CIRCLE_;
		break;
	}
	return _sha;
}

// Global variable used to dertimine current puzzle.
var onPuzzle = 0;

/**
 * This functiion populates the (client) puzzle with data from
 * internal sources.
 * @param puzzleId {Number} - index of puzzle.
 */
function displayPuzzle(puzzleId)
{
	onPuzzle = puzzleId;
	tabDoc.getElementById("tab-puzzles").value = puzzleId;
	// puzzle for color
	if(puzzleId < 3)
	{
		tabDoc.getElementById("board-2x2").style.display = "block";
		tabDoc.getElementById("board-3x3").style.display = "none";
		for(var i = 0; i < 4; i++)
		{
			puzzles[onPuzzle][ i ] = 0;
			//puzzlesS[onPuzzle][ i ] = 0;
			tabReds[i].style.backgroundColor = "transparent";
			tabReds[i].style.borderColor = getBDPieceColor(puzzlesC[puzzleId][i]);
			//tabReds[i].childNodes[0].src = getBGShapeImage(puzzlesSC[puzzleId][i]);
			//tabReds[i].childNodes[0].style.opacity = "0.3";
			
		}
	}
	// puzzle for shape
	else
	{
		tabDoc.getElementById("board-2x2").style.display = "none";
		tabDoc.getElementById("board-3x3").style.display = "block";
		
		for(var i = 0; i < 9; i++)
		{
			puzzles[onPuzzle][ i ] = 0;
			//puzzlesS[onPuzzle][ i ] = 0;
			tabSquares[i].style.backgroundColor = "transparent";
			tabSquares[i].style.borderColor = getBDPieceColor(puzzlesC[puzzleId][i]);
			//tabSquares[i].childNodes[0].src = getBGShapeImage(puzzlesSC[puzzleId][i]);
			//tabSquares[i].childNodes[0].style.opacity = "0.3";
		}
	}
	if(puzzleId == 0)
	{
		
	}
	else if(puzzleId == 1)
	{
	}
}

// This is call-by-value. Assets inside IFrame not loaded when accessing at this runtime point.
// Leave null for now.
var tabIFrame;
var tabDoc; // Document of our tabIFrame.

// (depricated, kind-of) Used for indexing HTMLDomObject.
// (originally used as individual board aliases, but that got changed in TeamSolve version 0.3.
var tabReds, tabGreens, tabBlues, tabSquares, tabTriangles, tabPentagons, tabCircles;

/**
 * Updates the puzzle UI in the tab Interface.
 */
function updatePuzzleUI()
{
	var __left, __right;
	tabDoc.getElementById("tab-xp-text").innerHTML = "Level: " + pieces.level + " Exp: " + pieces.xp + " / " + getXPForLevel(pieces.level);
	if(pieces.level > 1)
	{
		__left = pieces.xp - getXPForLevel(pieces.level - 1);
		__right = getXPForLevel(pieces.level) - getXPForLevel(pieces.level - 1);
	}
	else
	{
		__left = pieces.xp
		__right = getXPForLevel(pieces.level);	
	}
	tabDoc.getElementById("tab-xp").style.width = ( (__left / __right) * 100) + "%";
	
}

/**
 * Increase the player's XP.
 * This also handles leveling up.
 */
function gainXP()
{
	var _amt = 10;
	if(onPuzzle == 1) _amt = 12;
	else if(onPuzzle == 2) _amt = 14;
	else if(onPuzzle == 3) _amt = 20; // square
	else if(onPuzzle == 4) _amt = 24;
	else if(onPuzzle == 5) _amt = 28;
	else if(onPuzzle == 6) _amt = 35;
	
	pieces.xp += _amt;
	if(pieces.xp >= getXPForLevel(pieces.level)) {
		pieces.level += 1;
	}
	
	updatePuzzleUI();
	return _amt;
}

/**
 * Client puzzle completion handling. This gives the player more
 * pieces to use on the global puzzle.
 *
 * This also handles visual congratulatory effects.
 */
function puzzleComplete()
{
	var __rgb = 1;
	var __rgbT = '<span>R</span><span>G</span><span>B</span> piece';
	var __cmyT = '<span></span><span></span><span></span><span>C</span><span>M</span><span>Y</span> piece';
	
	if(onPuzzle == 0) pieces.rgb++;
	if(onPuzzle == 1) pieces.rgb++;
	if(onPuzzle == 2) pieces.rgb++;
	if(onPuzzle == 3) { pieces.cmy++; __rgb = 0; }
	if(onPuzzle == 4) { pieces.cmy++; __rgb = 0; }
	if(onPuzzle == 5) { pieces.cmy++; __rgb = 0; }
	if(onPuzzle == 6) { pieces.cmy++; __rgb = 0; }
	
	updateTabInterface();
	
	var __level = parseInt( pieces.level ); // Make it call-by-value
	var _amtGained = gainXP();
	
	if(__level == pieces.level)
	{
		document.getElementById("tab-iframe").contentDocument.getElementById("win-text").innerHTML = "Puzzle complete! + " + _amtGained + "  XP & 1 " + ((__rgb) ? __rgbT : __cmyT);
	}
	else
	{
		document.getElementById("tab-iframe").contentDocument.getElementById("win-text").innerHTML = "Level up! + " + _amtGained + " XP & 1 " + ((__rgb) ? __rgbT : __cmyT);
		document.getElementById("tab-iframe").contentDocument.getElementById("tab-xp").style.background = TAB_XP_BACKGROUNDL;
	}
	
	// Reverts display text and inits next local puzzle.
	var _winTextOut = function()
	{
		generatePuzzles();
		displayPuzzle(onPuzzle);	
		document.getElementById("tab-iframe").contentDocument.getElementById("win-text").innerHTML = "&nbsp; ";
		document.getElementById("tab-iframe").contentDocument.getElementById("tab-xp").style.background = TAB_XP_BACKGROUND;
		doPuzzleAni(1);
		winTimeout = -1;
	};
	
	doPuzzleAni(0);
	winTimeout = setTimeout(_winTextOut, 2500);
}

/**
 * Animates puzzle board HTMLDomObjects.
 * @param _aniID {Number} - Animation ID.
 */
function doPuzzleAni(_aniID)
{
	if(_aniID == 0)
	{
		_RGBBoard = document.getElementById("tab-iframe").contentDocument.getElementById("board-2x2");
		_CMYBoard = document.getElementById("tab-iframe").contentDocument.getElementById("board-3x3");
		_RGBBoard.style.width = _RGBBoard.style.height = RGB_PUZZLE_SIDEI;
		_RGBBoard.style.padding = RGB_PUZZLE_PADDINGI;
		_CMYBoard.style.width = _CMYBoard.style.height = CMY_PUZZLE_SIDEI;
		_CMYBoard.style.padding = CMY_PUZZLE_PADDINGI;
	}
	else if(_aniID == 1)
	{
		_RGBBoard = document.getElementById("tab-iframe").contentDocument.getElementById("board-2x2");
		_CMYBoard = document.getElementById("tab-iframe").contentDocument.getElementById("board-3x3");
		_RGBBoard.style.width = _RGBBoard.style.height = RGB_PUZZLE_SIDE;
		_RGBBoard.style.padding = RGB_PUZZLE_PADDING;
		_CMYBoard.style.width = _CMYBoard.style.height = CMY_PUZZLE_SIDE;
		_CMYBoard.style.padding = CMY_PUZZLE_PADDING;
	}
}

/**
 * Used to determine if the client puzzles are complete.
 */
function checkComplete()
{
	if(onPuzzle < 3)
	{
		var _golden = true;
		for(var i = 0; i < 4; i++)
		{
			if(puzzles[onPuzzle][i] != puzzlesC[onPuzzle][i])
			{ 
				_golden = false;
			}
			/*
			if(puzzlesS[onPuzzle][i] != puzzlesSC[onPuzzle][i])
			{
				_golden = false;
			}
			*/
		}
		if(_golden)
		{
			puzzleComplete();
		}
	}
	else
	{
		var __golden = true;
		for(var i = 0; i < 9; i++)
		{
			if(puzzles[onPuzzle][i] != puzzlesC[onPuzzle][i])
			{
				__golden = false;
			}
			/*
			if(puzzlesS[onPuzzle][i] != puzzlesSC[onPuzzle][i])
			{
				__golden = false;
			}
			*/	
		}
		if(__golden)
		{
			puzzleComplete();
		}
	}
}

/**
 * Use a piece on the client board.
 * Returns {Boolean} - Successfully placed piece.
 */
function usePiece()
{
	if(piece < 4)
	{
		if(pieces.rgb > 0)
		{
			pieces.rgb -= 1;
			updateTabInterface();
			return true;
		}
		else
		{
			message("You have no RGB pieces to set.");
			return false;
		}
	}
	else
	{
		if(pieces.cmy > 0)
		{
			pieces.cmy -= 1;
			updateTabInterface();
			return true;
		}
		else
		{
			message("You have no CMY pieces to set.");
			return false;
		}
	}
	return false;
}

/**
 * Handles clicking on the global board (piece).
 * @param _tar {HTMLDomObject} - Clicked (div) piece.
 * @param _id {Number} - Puzzle index of insert. (Also _targetPieceId).
 */
function gPuzClick(_tar, _id)
{ 
	var _targetPieceId = parseInt( this.name );
	if(globalRequest == 0)
	{
		if(globalPuzzle[_targetPieceId] != piece && globalComplete == false)
		{
			if(usePiece() == true)
			{
				globalClientSet = [piece, _targetPieceId];
				p("set_piece", piece, _targetPieceId);
			}
		}
		else
		{
			message("That piece is the same color");
		}
	}
	else
	{
		message("You must wait before placing another piece.", 10000);
	}
}

/**
 * Handles clicking on the client board (piece).
 * @param _tar {HTMLDomObject} - Clicked (div) piece.
 * @param _id {Number} - Puzzle index of insert. (Also _targetPieceId).
 */
function puzClick(_tar, _id)
{
	if(_id == null)
	{
		_id = null
	}
	
	puzzles[onPuzzle][ parseInt( this.name ) ] = parseInt( piece );
	//puzzlesS[onPuzzle][ parseInt( this.name ) ] = shape;
	this.style.backgroundColor = getBGPieceColor( parseInt( piece ) );
	//this.childNodes[0].src = getBGShapeImage( shape );
	//this.childNodes[0].style.opacity = "1";
	checkComplete();
}

/**
 * Handles clicking on the client board (CMY piece).
 * @param _tar {HTMLDomObject} - Clicked (div) piece.
 */
function tabPuzClick(_tar)
{
	
	puzzles[onPuzzle][ parseInt( this.name ) ] = parseInt( piece );
	//puzzlesS[onPuzzle][ parseInt( this.name ) ] = shape;
	this.style.backgroundColor = getBGPieceColor( parseInt( piece ) );
	//this.childNodes[0].src = getBGShapeImage( shape );
	//this.childNodes[0].style.opacity = "1";
	checkComplete();
}

/**
 * User request for RGB client board display.
 * @param _tar {HTMLDomObject} - Clicked button.
 */
function RGBButtonClick(_tar)
{
	var _shapeBut = document.getElementById("tab-iframe").contentDocument.getElementById("rgb-butt");
	var _colBut = document.getElementById("tab-iframe").contentDocument.getElementById("cmy-butt");
	displayPuzzle(0);
	
	if(_colBut.className.indexOf("butt-sel") > -1) _colBut.classList.remove("butt-sel");
	if(_shapeBut.className.indexOf("butt-sel") == -1) _shapeBut.classList.add("butt-sel");
}

/**
 * User request for CMY client board display.
 * @param _tar {HTMLDomObject} - Clicked button.
 */
function CMYButtonClick(_tar)
{
	var _shapeBut = document.getElementById("tab-iframe").contentDocument.getElementById("cmy-butt");
	var _colBut = document.getElementById("tab-iframe").contentDocument.getElementById("rgb-butt");
	displayPuzzle(3);
	
	if(_colBut.className.indexOf("butt-sel") > -1) _colBut.classList.remove("butt-sel");
	if(_shapeBut.className.indexOf("butt-sel") == -1) _shapeBut.classList.add("butt-sel");
}

/**
 * Inits logout for user.
 * @param _sea {String} - GET string for reason of logout (or special request).
 */
function doLogout(_sea)
{
	if(_sea == null)
	{
		_sea = "";
	}
	
	if(TEAMSOLVE_INDEX != null)
	{
		window.location = TEAMSOLVE_INDEX + _sea;
	}
	else
	{
		window.location = "../index.php" + _sea;
	}
}

/**
 * Handles auto logout.
 */
function autoLogoutHandler()
{
	// reason: idle
	if(windowBlur && tabBlur)
	{
		if(++autoLogoutChecks > 1)
		{
			doLogout("?rdr=1");
			//doLogout("?rdr=1&u="+username);
		}
	}
}

/**
 * Handles auto logout (focus).
 */
function focusCheck(_win)
{
	if(_win == "win")
	{
		
	}
	else
	{
		
	}
}

/**
 * Clicking on the logout button.
 * @param _e {HTMLDomElement} - Clicked element.
 */
function logoutButtonClick(_e)
{
	doLogout();
}

// init

// Solution to TabIFrame Problem: call-by-value (use the actual object).
document.getElementById("tab-iframe").contentWindow.onload = function()
{
	tabIFrame = document.getElementById("tab-iframe");
	tabDoc = tabIFrame.contentDocument || tabIFrame.contentWindow.document;
	
	tabDoc.getElementById("tab-butt").addEventListener("click", tabButtonClick);
	tabDoc.getElementById("color-butt").addEventListener("click", colorButtonClick);
	tabDoc.getElementById("shape-butt").addEventListener("click", shapeButtonClick);
	
	tabDoc.getElementById("rgb-butt").addEventListener("click", RGBButtonClick);
	tabDoc.getElementById("cmy-butt").addEventListener("click", CMYButtonClick);
	//tabDoc.getElementById("tab-puzzles").addEventListener("click", tabPuzClick);
	/*
	$(tabDoc.getElementsByClassName("opt-puz")).click(function() {
		displayPuzzle(this.value);
        return;
    });
	*/
	tabReds = tabDoc.getElementsByClassName("puzzle-piece-2x2");
	tabSquares = tabDoc.getElementsByClassName("puzzle-piece-3x3");
	
	for(var i = 0; i < 4; i++)
	{
		tabReds[i].name = "" + i;
		tabReds[i].addEventListener("click", puzClick, tabReds[i]);
	}
	for(var i = 0; i < 9; i++)
	{
		tabSquares[i].name = "" + i;
		tabSquares[i].addEventListener("click", puzClick, tabSquares[i]);
	}
	
	// post-iframe load init:
	displayPuzzle(0);
	updateTabInterface();
	updatePuzzleUI();
	
};

// Display username.
document.getElementById("login-username").innerHTML = username;

// Attach logout function.
document.getElementById("logout-button").addEventListener("click", logoutButtonClick, document.getElementById("logout-button"));

// Alias the global board HTMLDom objects
globalBoard = document.getElementsByClassName("puzzle-piece-5x5");

// Apply click attributes to global board
for(var i = 0; i < MAX_BOARD_PIECES; i++)
{
	globalBoard[i].name = "" + i;
	globalBoard[i].addEventListener("click", gPuzClick, globalBoard[i]);
}

// Init offline puzzles
generatePuzzles();

// Get server board
document.getElementById("title-message").innerHTML = DEFAULT_HEAD_TEXT = "TeamSolve - Loading Puzzle...";
p("get_board");

// Set server update
updateInterval = setInterval(updateHandler, AUTO_UPDATE_TIME);

// (mobile) handle changing tabs
$(window).focus(function() {
	windowBlur = false;
	autoLogoutChecks = 0;
});
$(window).blur(function() {
	windowBlur = true;
});
$(document.getElementById("tab-iframe").contentWindow).focus(function() {
	tabBlur = false;
	autoLogoutChecks = 0;
});
$(document.getElementById("tab-iframe").contentWindow).blur(function() {
	tabBlur = true;
});

// Auto logout set function handler
autoLogoutInterval = setInterval(autoLogoutHandler, AUTO_LOGOUT_TIME);