<?php
date_default_timezone_set("Asia/Kolkata");
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Headers: Content-Type');
include 'jsonFormat.php';
include 'jsonDeliver.php';
include 'config.php';
//$josn = '{"signUp":[{"name":"abc","password":"abc","mobileNo":789456124,"emailId":"abc@gmail.com"}]}';
//$json = '{"news":[{"id":1}]}';  
$json = file_get_contents("php://input");
$data = json_decode($json, true);
$jsonresponse=array();
$newsId=$data['news'][0]['newsId'];
//$visitorId=$data['news'][0]['visitorId'];

	//select news information
	$selectNewsQuery1 = "SELECT `title`, `imageLink`, `description`, `tagline`, `author`, `source`, `createdOn` FROM `news` WHERE `id`='$newsId'";
	$selectNews1 = mysql_query($selectNewsQuery1,$conn) or die(mysql_error());
	$selectNewsRows1 = mysql_num_rows($selectNews1);
	
	if($selectNewsRows1 > 0)
	{
			$selectNewsResult=mysql_fetch_assoc($selectNews1);
			$date= $selectNewsResult['createdOn'];
			$newDate = date("d-m-Y", strtotime($date));
			$title=$selectNewsResult['title'];
			$jsonresponse['newsTitle']=$title;
			$jsonresponse['imageLink']=$selectNewsResult['imageLink'];
			$description=$selectNewsResult['description'];	
			
			$jsonresponse['description']=$description;			
			$jsonresponse['author']=$selectNewsResult['author'];
			$jsonresponse['source']=$selectNewsResult['source'];
			$jsonresponse['createdOn']=$newDate;
			json_encode($jsonresponse);
			deliver_response(200,"News Information","news",$jsonresponse);
	}
	else
	{
		deliver_response(201,"News Information","news",$jsonresponse);
	}

	
?>