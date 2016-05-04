<?php
    //header("refresh:5;");
?>
<?php
//Access Control Headers
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Headers: Content-Type');

//Include Files
include 'jsonFormat.php';
include 'jsonDeliver.php';
include 'config.php';
		//for device id
		$jsonresponse=[];
		$data=[];
		$selectQuery="select * from doctormobilenumber where flag=1 or flag=2";
		$result=mysql_query($selectQuery,$conn);
		$numRows=mysql_num_rows($result);
		
		if($numRows>0)
		{
			while($row=mysql_fetch_array($result))
			{		
			$response['dctrID']=$row['doctorId'];
			/* $response['dctrM']=$row['mobileNumber'];
			$response['Alter1']=$row['alterMobile1'];
			$response['Alter2']=$row['alterMobile2']; */
			$response['flag']=$row['flag'];
			$response['stDate']=$row['statusDate'];			
			//$jsonresponse[] = $row;
			array_push($data,$response);
		
			}
		json_encode($data);
		deliver_response(200,"New Location created","doctors",$data);			
		}
	
?>