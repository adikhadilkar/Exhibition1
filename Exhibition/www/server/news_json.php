<?php
header("Content-Type: text/html; charset=utf-8");
//Access Control Headers
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Headers: Content-Type');
//Include Files
include 'jsonFormat.php';
include 'jsonDeliver.php';
include 'config.php';
$data=array();
$response=array();
//select news details
@$selectNewsQuery="SELECT id,newsTitle,imageLink,description,tagLine,source,author,createdOn as date FROM news order by createdOn desc";
@$selectNews=mysql_query($selectNewsQuery,$conn) or die(mysql_error());
@$newsRows=mysql_num_rows($selectNews);
  while($news=mysql_fetch_array($selectNews))
  {
		//$createdOn=$news['createdOn'];
		//$date = date("d/m/Y", strtotime($createdOn));
		
		$date= $selectNewsResult['createdOn'];
		$newDate = date("d-m-Y", strtotime($date));
		
		$tagLine=urldecode($news['tagLine']);
		$tagline =$info = mb_convert_encoding($tagLine, "HTML-ENTITIES", "UTF-8");
		$newsTitle=urldecode($news['newsTitle']);
		$newsTitle =$info = mb_convert_encoding($newsTitle, "HTML-ENTITIES", "UTF-8");
		$author=urldecode($news['author']);
		$author =$info = mb_convert_encoding($author, "HTML-ENTITIES", "UTF-8");
		$source=urldecode($news['source']);
		$source =$info = mb_convert_encoding($source, "HTML-ENTITIES", "UTF-8");
		$description=urldecode($news['description']);
		$description =$info = mb_convert_encoding($description, "HTML-ENTITIES", "UTF-8");
		$id=$news['id'];
		$response['id'] = $id;
		$response['tagLine'] = $tagLine;
		$response['newsTitle']=$newsTitle;
		$response['imageLink']=$news['imageLink'];
		$response['description']=$description;
		$response['author']=$author;
		$response['date']=$newDate;
		$response['source']=$source;
		 
		array_push($data,$response);
		
}
    $json= json_encode($data,JSON_NUMERIC_CHECK);     
deliver_response(200,"news","newsInformation",$data);

?>