<?php
/**
 * get_board.php
 *
 * Retrieves most recent board.
 */

if(!empty($_POST))
{
	// Connect to db
	require_once "db_connection.php";
	
	// This selects all data.
	$query = "SELECT * FROM puzzle";
	
	$result = $db->query($query);
	
	// Successfully retrieved data, get the most current one.
	if($result)
	{
		$last = "0";
		while($row = $result->fetch_assoc())
		{
			$last = $row;
		}
		
		// puzzle_id = very last puzzle
		//$currentPuzzle = count($array);
		
		// Return JSON data of current puzzle
		echo json_encode($last);
		//echo JSONEncode($array[$currentPuzzle-1]);
	}
	else
	{
		echo "PHPError " + $db->error;
	}
	
	$db->close();
}
else
{
	echo "PHPError User not found.";
}
?>