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




	/* select  a.id, a.companyName, c.link from exhibitor a , exhibitorProfile b,media c,exhibitionSector d, exhibitor_exhibitionSector e where e.exhibitionSectorId=1 and e.exhibitorId=a.id and c.id=b.`logoMediaId`  */ 


	//select sectors exhibitors
	$selectSectorsQuery1 = "SELECT `exhibitorId` FROM `exhibitor_exhibitionSector` WHERE `exhibitionSectorId`='$sectorId'";
	$selectSectors1 = mysql_query($selectSectorsQuery1,$conn) or die(mysql_error());
	$da=mysql_fetch_array($selectSectors1);
	$selectSectorsRows1 = mysql_num_rows($selectSectors1);
	
	  if($selectSectorsRows1 > 0)
	{
		
		/* while($selectSectorsResult=mysql_fetch_assoc($selectSectors1))
		{
			$json=$selectSectorsResult['exhibitorId'];
			
			
			$selectSectorsInfoQuery1 = "SELECT `companyName` FROM `exhibitor` WHERE `id`='$json'";
			$selectSectorsInfo1 = mysql_query($selectSectorsInfoQuery1,$conn) or die(mysql_error());
			
			$sectors1=mysql_fetch_assoc($selectSectorsInfo1);
			
				$jsonresponse['companyName'] = $sectors1['companyName'];*/
				
			array_push($data,$selectSectors1); 
			//json_encode($jsonresponse);
			deliver_response(200,"News Information","news",$da);
			
		}
			
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