/**
 * script.js
 * TeamSolve is created by Ryan Isler - 2017.
 */

const MAX_INPUT_LENGTH = 20;
var rdr = getSearch("rdr");
var u = getSearch("u");

/**
 * Includes a script, placed after this script tag.
 * @param url {String} - location of script.
 */
function include(url)
{
	document.write('<script src="' + url + '"></script>');
	return false; // Allows DOM to continue.
}

/**
 * Notifies the user of information.
 * @param output {String} - Text to display
 * @param _dur {String} - Duration (unimplemented).
 */
function notify(output, _dur)
{
	if(_dur == null)
	{
		_dur = 5000;
	}
	alert(output);
}

/**
 * Checks to see if username is permitted based on character inputs.
 * @param inputText {String} - Input username.
 * @returns {Number} - Success flag.
 */
function usernameOkay(inputText)
{
	for(var i = 0; i < BAD_USERNAME.length; i++)
	{
		if(inputText.indexOf(BAD_USERNAME[i]) >= 0)
		{
			return 0;
		}
	}
	return 1;
}

/**
 * Handles clicking on a button
 * @param target {object (HTMLDomObject)} - Object clicked on.
 */
function loginButtonClick(target)
{
	var _username = document.getElementById("username-text").value;
	
	if(_username == "")
	{
		notify("Please enter some text");
		return;
	}
	
	var _usernameState = usernameOkay(_username);
	if(_usernameState == 1)
	{
		username = _username;
		clientLogin();
	} 
	else if(_usernameState == 0)
	{
		notify('Your username has illeagal characters (" ", "<", ">").)');
	}
}

/**
 * Handles rediret message
 */
function handleRdr()
{
	if(rdr == "")
	{
		return;
	}
	else if(rdr == "1")
	{
		notify("You've been logged out due to inactivity.");
	}
	else if(rdr == "2")
	{
		notify("User information corrupt or not found.");
	}
	else if(rdr == "3")
	{
		notify("Session timed out.");
	}
}

// Connect JavaScript to the HTMLDomElements
//document.getElementById("login-button").addEventListener("click", loginButtonClick);

// Redirect reason
handleRdr();

// username auto-input
if(u != "" && u.length < MAX_INPUT_LENGTH)
{
	document.getElementById("username-text").value = u;
}