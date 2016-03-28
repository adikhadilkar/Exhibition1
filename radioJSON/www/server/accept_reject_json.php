<?php
//Access Control Headers
date_default_timezone_set("Asia/Kolkata");
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Headers: Content-Type');

//Include Files
include 'jsonFormat.php';
include 'jsonDeliver.php';
include 'config.php';

//Fetch and decode JSON

$json = file_get_contents("php://input");
$data = json_decode($json, true);
$jsonresponse =	"";
$flag=$data['transaction'][0]['flag'];
$createdOn=date('Y-m-d h:i:s', time());
//$transactionId=$data['transaction'][0]['transactionId'];

$query="insert into servertransactions(flag,createdOn) VALUES('$flag','$createdOn')";
$res=mysql_query($query,$conn);

$jsonresponse=$flag;
json_encode($jsonresponse);
deliver_response(200,"Transaction Accepted","transaction",$jsonresponse);

/*if($flag==0)
{
	deliver_response(201,"Transaction rejected","transaction",$jsonresponse);
}
else if($flag==1)
{
		$jsonresponse=$flag;
		json_encode($jsonresponse);
		deliver_response(200,"Transaction Accepted","transaction",$jsonresponse);

}*/	
?>