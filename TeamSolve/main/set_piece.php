<?php
/**
 * set_piece.php
 *
 * Sets a piece to database (UPDATE).
 */

// Check if puzzle is completed
function isPuzzleComplete($_board, $_boardComplete)
{
	return ($_board == $_boardComplete);
}

// Get highest piece based on input level.
function getHighestPiece($_level)
{
	$_highestPiece = 3;
	
	if($_level > 5)
	{
		$_highestPiece = 4;
	}
	if($_level > 11)
	{
		$_highestPiece = 5;
	}
	if($_level > 17)
	{
		$_highestPiece = 6;
	}
	
	return $_highestPiece;
}

// Generates new puzzle
// Returns new board
function iteratePuzzle($_db, $_level)
{
	// New board layout
	$boardValue = "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0";
	
	// todo: generate boards based on puzzle_id accordingly
	$boardCompleteValue = "";
	
	// If the team has successfully beat TeamSolve
	$boardReset = false;
	if($_level > 25)
	{
		$_level = 1;
		$boardCompleteValue = "1 2 3 1 2 3 1 2 3 1 2 3 1 2 3 1 2 3 1 2 3 1 2 3 1";
		$boardReset = true;
		
		// Delete all old TeamSolve game data.
		$query = "DROP TABLE puzzle";
		$result = $_db->query($query);
		
		if($result)
		{
			// Create new TeamSolve game
			// define(NEW_TABLE_QUERY, "");
			$query = "CREATE TABLE puzzle (puzzle_id INT(2) UNSIGNED AUTO_INCREMENT PRIMARY KEY, board VARCHAR(64), board_complete VARCHAR(64))";
			$result = $_db->query($query);
			
			if($result)
			{
				// TeamSolve table created, and setup:
				// continue
			}
			else
			{
				return "PHPError " . $_db->error;
			}
		}
		else
		{
			return "PHPError " . $_db->error;
		}
	}
	
	if(!$boardReset)
	{
		for($i = 0; $i < 25; $i++)
		{
			$boardCompleteValue = $boardCompleteValue . rand(1, getHighestPiece($_level)) . " ";
		}
	}
	
	$boardCompleteValue = trim( $boardCompleteValue );
	
	$query = "INSERT INTO puzzle (board, board_complete) VALUES ('$boardValue', '$boardCompleteValue')";
	
	$result = $_db->query($query);
	
	if($result)
	{
		return "b " . $boardCompleteValue;
	}
	else
	{
		return "PHPError " . $_db->error;
	}
	
}

if(!empty($_GET))
{
	if(!empty($_GET['u']))
	{
		// Init input, & validate
		$puzzleId = "1";
		$targetIndex = "0";
		$piece = "1";
		
		if(isset($_GET['g']))
		{
			$puzzleId = $_GET['g'];
			//echo "puzzle: " . $puzzleId . "\n";
		}
		else die("PHPError Invalid piece");
		if(isset($_GET['p']))
		{
			$piece = $_GET['p'];
			//echo "piece: " . $puzzleId . "\n";
		}
		else die("PHPError Invalid Piece");
		if(isset($_GET['t']))
		{
			//echo "targetIndex: " . $_GET['t'] . "\n\n";
			$targetIndex = (int) $_GET['t'];
		}
		else die("PHPError invalid piece");
		/*
		if(strlen($piece) > 1)
		{
			die("PHPError strlen(piece) > 1");
		}
		*/
		
		// Connect to db
		require_once "db_connection.php";
		
		// This selects all data.
		$query = "SELECT board, board_complete FROM puzzle WHERE puzzle_id = $puzzleId";
		
		$result = $db->query($query);
		
		// Successfully retrieved data
		if($result)
		{
			$last = "";
			while($row = $result->fetch_assoc())
			{
				$last = $row;
			}
			if(!empty($last))
			{
				
				$nextPuzzleId = (int) $puzzleId;
				$nextPuzzleId += 1;
				$strBoard = $last['board'];
				
				$loadedPuzzleComplete = false;
				if(isPuzzleComplete($strBoard, $last['board_complete']))
				{
					$loadedPuzzleComplete = true;
				}
				if($loadedPuzzleComplete == false)
				{
					$newBoard = substr_replace($strBoard, $piece, $targetIndex * 2, 1);
					
					$query = "UPDATE puzzle SET board = '$newBoard' WHERE puzzle_id = $puzzleId";
					
					$result = $db->query($query);
					
					// Successfully updated puzzle board.
					if($result)
					{
						// If, after updating, puzzle is complete:
						if(isPuzzleComplete($newBoard, $last['board_complete']))
						{
							// Go to next puzzle.
							$out = iteratePuzzle($db, $nextPuzzleId);
							echo $out;
						}
						else
						{
							echo $result;
						}
					}
					else
					{
						echo "PHPError " . $db->error;
					}
				}
				// If puzzle is complete before placing the piece, tell user to move on.
				// This solves placing the wrong piece and being left to die on [n-1] puzzle.
				else
				{
					echo "c";
				}
				
			}
			else
			{
				echo "PHPError row empty";
			}
		}
		else
		{
			echo "PHPError " + $db->error;
		}
		
		$db->close();
	}
	else
	{
		die("PHPError User not logged in.");
	}
}
else
{
	echo "PHPError User not found.";
}
?>