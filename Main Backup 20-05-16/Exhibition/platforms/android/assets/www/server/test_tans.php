<?php
    //header("refresh:5;");
?>
<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Headers: Content-Type');
include 'jsonFormat.php';
include 'jsonDeliver.php';
include 'config.php';
		$jsonresponse=[];
		$data=[];
		$selectQuery="select * from servertransactions where flag=1 or flag=2 ";
		$result=mysql_query($selectQuery,$conn);
		$numRows=mysql_num_rows($result);		
		if($numRows>0)
		{
			while($row=mysql_fetch_array($result))
			{	
			$response['T_Id']=$row['pt_transaction'];
			$response['flag']=$row['flag'];
			array_push($data,$response);		
			}
		json_encode($data);
		deliver_response(200,"New Location created","transaction",$data);			
		}	
?>