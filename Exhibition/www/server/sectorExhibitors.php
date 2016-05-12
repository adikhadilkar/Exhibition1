<?php
date_default_timezone_set("Asia/Kolkata");
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Headers: Content-Type');
include 'jsonFormat.php';
include 'jsonDeliver.php';
include 'config.php'; 
$json = file_get_contents("php://input");
$data = json_decode($json, true);
$selectedExhibitors=array();
$jsonresponse=array();
$sectorId=$data['sectors'][0]['sectorId'];

	//select sectors exhibitors
	$selectSectorsQuery1 = "SELECT `exhibitorId` FROM `exhibitor_exhibitionSector` WHERE `exhibitionSectorId`='$sectorId'";
	$selectSectors1 = mysql_query($selectSectorsQuery1,$conn) or die(mysql_error());
	$selectSectorsRows1 = mysql_num_rows($selectSectors1);
	
	  if($selectSectorsRows1 > 0)
	{
		
		while($selectSectorsResult=mysql_fetch_assoc($selectSectors1))
		{
			$json=$selectSectorsResult['exhibitorId'];
			
			
			$selectSectorsInfoQuery1 = "SELECT `companyName` FROM `exhibitor` WHERE `id`='$json'";
			$selectSectorsInfo1 = mysql_query($selectSectorsInfoQuery1,$conn) or die(mysql_error());
			
			$sectors1=mysql_fetch_assoc($selectSectorsInfo1);
			
				$jsonresponse['companyName'] = $sectors1['companyName'];
				
			array_push($data,$jsonresponse);
			//json_encode($jsonresponse);
			deliver_response(200,"News Information","news",$jsonresponse);
			
		}
			
	}
	else
	{
		deliver_response(201,"News Information","news",$jsonresponse);
	}
	 
	 
	 
	 
	/*  while($sector=mysql_fetch_array($selectSectors1))
	{
		$eid= $sector['exhibitorId'];
		
		$selectSectorsInfoQuery1 = "SELECT `companyName` FROM `exhibitor` WHERE `id`='$eid'";
		$selectSectorsInfo1 = mysql_query($selectSectorsInfoQuery1,$conn) or die(mysql_error());
		
		while($sectors1=mysql_fetch_array($selectSectorsInfo1))
		{
			$response['companyName'] = $sectors1['companyName'];
		}
		array_push($data,$response);
	}
	
    $json= json_encode($data,JSON_NUMERIC_CHECK);     
	deliver_response(200,"sectors","sectorsInformation",$data); */

	
?>