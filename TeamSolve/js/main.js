/**
 * main.js
 * This file is used for starting the client processes.
 */

"use_strict";

// Config

var newUser;
var clientLoggedIn;

function unloadHandler()
{
	saveUserInfo();
	// peace out
}

function initClient()
{
	newUser = loadUserInfo();
}

/**
 * Includes a script, placed after this script tag.
 * @param url {String} - location of script.
 */
function include(url)
{
	document.write('<script src="' + url + '"></script>');
	return false; // Allows DOM to continue.
}

// Init

if(clientLoggedIn == null)
{
	window.location = "../index.php?rdr=2";
}
if(clientLoggedIn)
{
	initClient();
}

window.addEventListener("unload", unloadHandler);