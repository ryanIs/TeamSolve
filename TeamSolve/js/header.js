/**
 * header.js
 * Handles saving and loading variables from the users computer (cookie access).
 */

// Config
var BAD_USERNAME = [" ", "<", ">", "&", "\\"];
var BAD_MESSAGE = ["<", ">"];
const TEAMSOLVE_INDEX = "../index.php";

function random(_)
{
	return Math.floor(Math.random() * _);
}

function clientLogin()
{
	setCookie("username", username);
	window.location = "main/index.php?u=" + username;
}

/**
 * Sets a cookie.
 * @param cookieName {String} - The variable name of the desired stored cookie.
 * @param cookieValue {String} - The variable value.
 * @param cookieExpiresInDays {Number} - How many days until the cookie will expire.
 */
function setCookie(cookieName, cookieValue, cookieExpiresInDays)
{
	//if(arugments[2] == null)
	if(cookieExpiresInDays == null)
	{
		cookieExpiresInDays = 120
	}
	
	var _date = new Date();
	_date.setTime(_date.getTime() + (cookieExpiresInDays * 24 * 60 * 60 * 1000));
	var _expires = "expires=" + _date.toUTCString();
	
	document.cookie = cookieName + "=" + cookieValue + ";" + _expires + ";path=/";
}

/**
 * Gets a cookie.
 * @param cookieName {String} - The variable name of the desired stored cookie.
 * @returns {String} - Returns stored value of cookie.
 */
function getCookie(cookieName)
{
	var _cookieName = cookieName + "=";
	var _ca = document.cookie.split(";");
	for(var i = 0; i < _ca.length; i++)
	{
		var _c = _ca[i];
		
		// Handles whitespace
		while(_c.charAt(0) == ' ')
		{
			_c = _c.substring(1);
		}
		
		// If the cookieName matches the param.
		if(_c.indexOf(_cookieName) == 0)
		{
			return _c.substring(_cookieName.length, _c.length);
		}
	}
	return "";
}

/**
 * Gets a window.location.search variable.
 * @param cookieName {String} - The variable name of the desired stored cookie.
 * @returns {String} - Returns value of requested variable
 *					   returns "" if value is null.
 */
function getSearch(varName)
{
	if(window.location.search === "")
	{
		return "";
	}
	var _varName = varName + "=";
	var _ca = (window.location.search).substring(1).split("&");
	for(var i = 0; i < _ca.length; i++)
	{
		var _c = _ca[i];
		
		// If the varName matches the param.
		if(_c.indexOf(_varName) == 0)
		{
			return _c.substring(_varName.length, _c.length);
		}
	}
	return "";
}

/**
 * Gets an associative array of search values
 * @returns {object} - Return assoc object with value key pairs.
 */
function getSearchObject()
{
	/*
	var _varName;
	var _ca = (window.location.search).substring(1).split("&");
	if(window.location.search === "" || _ca.length == 0 || _ca.)
	{
		return null;
	}
	for(var i = 0; i < _ca.length; i++)
	{
		var _c = _ca[i];
		
		// If the varName matches the param.
		if(_c.indexOf(_varName) == 0)
		{
			return _c.substring(_varName.length, _c.length);
		}
	}
	*/
	return "";
}