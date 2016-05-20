<?php
//header("refresh:5;");
include 'config.php';
// sending data to server from doctors table 
$doctor_Mobile=array();
$sel_doct_mobile=mysql_query("select doctorId,mobileNumber,alterMobile1,alterMobile2 from doctormobilenumber where alterMobile1 !='' or alterMobile2 !=''");
$numRows=mysql_num_rows($sel_doct_mobile);
if($numRows>0)
{
	while($row=mysql_fetch_assoc($sel_doct_mobile))
	{
		$doctor_Mobile[]=$row;
	}		
}
echo json_encode($doctor_Mobile);
?>