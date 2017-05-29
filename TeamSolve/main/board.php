<?php
/**
 * board.php
 *
 * board.php is a high-traffic verson of get_board.php.
 * This is called every 10 seconds by each session.
 */

if(!empty($_GET))
{
	if(!empty($_GET['u']) && !empty($_GET['g']))
	{
		$puzzleId = $_GET['g'];
		
		// Connect to db
		require_once "db_connection.php";
		
		// This selects all data.
		$query = "SELECT board FROM puzzle WHERE puzzle_id = $puzzleId";
		
		$result = $db->query($query);
		
		// Successfully retrieved data, get the most current one.
		if($result)
		{
			$last = "";
			while($row = $result->fetch_assoc())
			{
				$last = $row;
			}
			
			// todo: if $last == "
			
			echo json_encode($last);
		}
		else
		{
			echo "PHPError " + $db->error;
		}
		
		$db->close();
	}
}
else
{
	echo "PHPError User not found.";
}
?>