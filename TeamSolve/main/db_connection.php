<?php
/**
 * connection.php
 *
 * Connects to database.
 */

// Configeration
define("DB_HOST", "[DB_HOST]");
define("DB_USER", "[DB_USER]");
define("DB_PASS", "[DB_PASS]");
define("DB_DB", "[DB_DB]");

// Connection
$db = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_DB);

// Check connection
if($db->connect_errno)
{
	die("PHPError " . $db->connect_error);
}

?>