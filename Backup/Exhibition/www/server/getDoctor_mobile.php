<?php
include 'config.php';
		$doctorMobile=array();
		$selectQuery="select doctorId,flag,statusDate from doctormobilenumber where flag=1 or flag=2";
		$result=mysql_query($selectQuery,$conn);
		$numRows=mysql_num_rows($result);
		
		if($numRows>0)
		{
			while($row=mysql_fetch_assoc($result))
			{		
				$doctorMobile[] = $row;		
			}
		}
		echo json_encode($doctorMobile);		
		
?>

