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
		$selectQuery="select * from serverlocation";
		$result=mysql_query($selectQuery,$conn);
		$numRows=mysql_num_rows($result);
		
		if($numRows>0)
		{
			while($row=mysql_fetch_array($result))
			{
			//$response['LoID']=$row['locationId'];
			$response['ser_Id']=$row['locationId'];
			$response['DeID']=$row['deviceId'];
			$response['Lati']=$row['latitude'];
			$response['Longi']=$row['longitude'];			
			$response['CreOn']=$row['createdOn'];
			//$jsonresponse[] = $row;
			array_push($data,$response);
		
			}
		json_encode($data);
		deliver_response(200,"New Location created","location",$data);			
		}
?>
