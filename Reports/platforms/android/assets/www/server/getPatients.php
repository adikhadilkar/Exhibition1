<?php
//Access Control Headers
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Headers: Content-Type');
//Include Files
include 'jsonFormat.php';
include 'jsonDeliver.php';
include 'config.php';

//select news details
@$selectPatientsQuery="SELECT name,newsTitle,imageLink,description,tagline,source,author,createdOn FROM news order by createdOn desc";
@$selectNews=mysql_query($selectNewsQuery,$conn) or die(mysql_error());
@$newsRows=mysql_num_rows($selectNews);
    for ($count = 0; $count < $newsRows; $count++) 
	{
        $data[] = mysql_fetch_assoc($selectNews);
    }

    $json= json_encode($data,JSON_NUMERIC_CHECK);     
deliver_response(200,"news","newsInformation",$data);

?>