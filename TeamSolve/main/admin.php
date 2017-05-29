<!doctype html>
<?php
/**
 * admin.php
 *
 * Handles custom database commands, puzzle mangement, and player banning.
 *
 * PHP version at ryanisler.com: 5.2.17
 * Note: Special thanks to Ramsey Isler for web & database hosting.
 */

$adminOut = "Admin";
$adminResult = "";

if(!empty($_POST))
{
	
	$adminControls = false; // false
	
	if($_POST['p'] == "[p]")
	{
		$adminControls = true;
	}
	else
	{
		$adminOut = "admin";
	}
	if($adminControls)
	{
		// Get $db
		require_once "db_connection.php";
		
		$query;
		
		$result;
		
		if($_POST["r"] == "debug" || $_POST["r"] == "d")
		{
			//phpinfo();
			
			// New board layout
			echo $PHP_SELF;
			//print_r(scandir(session_save_path()));
		}
		// Hard and fast client reset - if things get tough during runtime.
		else if($_POST["r"] == "reset")
		{
			$boardValue = "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0";
			$boardCompleteValue = "1 2 3 1 2 3 1 2 3 1 2 3 1 2 3 1 2 3 1 2 3 1 2 3 1";
			
			$query = "DROP TABLE puzzle";
			$result = $db->query($query);
			
			if($result)
			{
				// Create new TeamSolve game
				// define(NEW_TABLE_QUERY, "");
				$query_ = "CREATE TABLE puzzle (puzzle_id INT(2) UNSIGNED AUTO_INCREMENT PRIMARY KEY, board VARCHAR(64), board_complete VARCHAR(64))";
				$result = $db->query($query_);
				
				if($result)
				{
					$query__ = "INSERT INTO puzzle (board, board_complete) VALUES ('$boardValue', '$boardCompleteValue')";
	
					$result = $db->query($query__);
					
					if($result)
					{
						$adminOut = "Successfully reset $query; $query_; $query__;";
					}
					else
					{
						$adminOut = "PHPError " . $db->error;
					}
				}
				else
				{
					$adminOut = "PHPError " . $db->error;
				}
			}
			else
			{
				$adminOut = "PHPError " . $db->error;
			}
		}
		// Create new table
		else if($_POST["r"] == "create")
		{
			//$query = "CREATE TABLE coolKids (id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY, first VARCHAR(32), last VARCHAR(32), age INT(3))";
			
			$query = "CREATE TABLE puzzle (puzzle_id INT(2) UNSIGNED AUTO_INCREMENT PRIMARY KEY, board VARCHAR(64), board_complete VARCHAR(64))";
			
			$result = $db->query($query);
			
			if($result)
			{
				$adminOut = "Table successfully created. <span style='opacity: 0.5;'>$query</span>";
			}
			else
			{
				$adminOut = "PHPError Table creation failure " . $db->error;
			}
		}
		// View table
		else if($_POST["r"] == "view")
		{
			$query = "SELECT * FROM puzzle";
			
			$result = $db->query($query);
			
			if($result)
			{
				$adminOut = "Displaying puzzle table <span style='opacity: 0.5;'>$query</span>";
				
				$adminResult = "<table>";
				$adminResult = $adminResult . "<tr>";
				$adminResult = $adminResult . "<th>puzzle_id</th>";
				$adminResult = $adminResult . "<th>board</th>";
				$adminResult = $adminResult . "<th>board_complete</th>";
				$adminResult = $adminResult . "</tr>";
				while($row = $result->fetch_assoc())
				{
					$adminResult = $adminResult . "<tr>";
					$adminResult = $adminResult . "<td>" . $row["puzzle_id"] . "</td>";
					$adminResult = $adminResult . "<td>" . $row["board"] . "</td>";
					$adminResult = $adminResult . "<td>" . $row["board_complete"] . "</td>";
					$adminResult = $adminResult . "</tr>";
				}
				$adminResult = $adminResult . "</table>";
			}
			else
			{
				$adminOut = "PHPError " . $db->error;
			}
		}
		// Insert new table
		else if($_POST["r"] == "insert")
		{
			$boardValue = $_POST["a1"];
			$boardCompleteValue = $_POST["a2"];
			
			if($boardValue == "") 
				$boardValue = "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0";
			if($boardCompleteValue == "") 
				$boardCompleteValue = "1 2 3 1 2 3 1 2 3 1 2 3 1 2 3 1 2 3 1 2 3 1 2 3 1";
			
			$query = "INSERT INTO puzzle (board, board_complete) VALUES ('$boardValue', '$boardCompleteValue')";
			
			$result = $db->query($query);
			
			if($result)
			{
				$adminOut = "Successfully inserted <span style='opacity: 0.5;'>[id] | $boardValue | $boardCompleteValue</span>";
			}
			else
			{
				$adminOut = "PHPError " . $db->error;
			}
		}
		// Add table (insert with defaults)
		else if($_POST["r"] == "add")
		{
			$boardValue = "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0";
			$boardCompleteValue = "1 2 3 1 2 3 1 2 3 1 2 3 1 2 3 1 2 3 1 2 3 1 2 3 1";
			
			$query = "INSERT INTO puzzle (board, board_complete) VALUES ('$boardValue', '$boardCompleteValue')";
			
			$result = $db->query($query);
			
			if($result)
			{
				$adminOut = "ADD: Successfully inserted <span style='opacity: 0.5;'>[id] | $boardValue | $boardCompleteValue</span>";
			}
			else
			{
				$adminOut = "PHPError " . $db->error;
			}
		}
		// Update MySQL table
		else if($_POST["r"] == "update")
		{
			$boardID = $_POST["a1"];
			$boardValue = $_POST["a2"];
			$boardCompleteValue = $_POST["a3"];
			
			if(empty($boardID) || empty($boardValue) || empty($boardCompleteValue))
			{
				echo "PHPErorr Update failed: a1, a2, or a3 is ''";
			}
			else
			{
				$query = "UPDATE puzzle SET board = '$boardValue', board_complete = '$boardCompleteValue' WHERE puzzle_id = $boardID";
				
				$result = $db->query($query);
				
				if($result)
				{
					$adminOut = "Successfully updated ID $boardID <span style='opacity: 0.5;'>$boardID | $boardValue | $boardCompleteValue</span>";
				}
				else
				{
					$adminOut = "PHPError " . $db->error;
				}
			}
		}
		// Delete table (not required)
		else if($_POST["r"] == "delete")
		{
			// todo: delete, update, alter AUTO_INCREMENT.
		}
		// Drop entire table.
		else if($_POST["r"] == "drop")
		{
			$query = "DROP TABLE puzzle";
			
			$result = $db->query($query);
			
			if($result)
			{
				$adminOut = "Successfully dropped table.";
			}
			else
			{
				$adminOut = "PHPError " . $db->error;
			}
		}
		
		// $result->free();
		if($db) $db->close();
	}
}


?>
<html>
	<head>
		<title>Admin</title>
		<meta charset="UTF-8">
		<style>
			body {
				margin: 50px;
				font-family: "Consolas", "Lucida Console", "Arial";
				font-size: 16px;
			}
			table, th, td {
				border: 1px solid black;
			}
			input {
				font-family: "Consolas";
				margin: 5px
			}
			input[type="text"] {
				width: 700px;
				height: 40px;
				padding: 5px 5px;
				font-size: 1.2em;
				
				border: 3px ridge #aaa;
				background: #fff;
				background: repeating-linear-gradient(to right, #fff, #eee 14.2%, #ddd 15.2%);
			}
			input[type="text"]:hover, input[type="text"]:active, input[type="text"]:focus {
				border: 3px ridge #aff;
			}
			input[type="text"]:hover {
				border: 3px ridge #acc;
			}
			input[type="submit"] {
				width: 100px;
				height: 30px;
			}
			input[type="text"][name="p"] {
				
			}
		</style>
	</head>
	<body>
		<p><?php echo $adminOut;?></p>
		<form method="POST" action="<?php echo $PHP_SELF;?>">
			<input type="password" name="p"><br>
			<input type="text" name="r"><br>
			<input type="text" name="a1"><br>
			<input type="text" name="a2"><br>
			<input type="text" name="a3"><br>
			<input type="submit" value="Execute">
		</form>
		<br/>
		<?php echo $adminResult;?>
		
	</body>
</html>