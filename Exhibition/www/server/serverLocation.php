<?php
include 'config.php';
		$serverlocation=array();
		$selectQuery="select * from serverlocation";
		$result=mysql_query($selectQuery,$conn);
		$numRows=mysql_num_rows($result);
		
		if($numRows>0)
		{
			while($row=mysql_fetch_assoc($result))
			{		
				$serverlocation[] = $row;		
			}
		}
		echo json_encode($serverlocation);		
		
?>

