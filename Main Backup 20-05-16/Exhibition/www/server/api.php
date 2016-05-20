<?php
header('Access-Control-Allow-Origin: *');//Should work in Cross Domaim ajax Calling request
include 'config.php';
//$devID=array();		//code for serverlocation
$cars = array();
$cars =@$_POST['type'];
$arrlength = count($cars);

$cars1 = array();
$cars1 =@$_POST['type1'];
$arrlength1 = count($cars1);
//print_r($arrlength1);
	 
$cars2 = array();
$cars2 =@$_POST['type2'];
$arrlength2 = count($cars2);
//print_r($arrlength2);
	 
$cars3 = array();
$cars3 =@$_POST['type3'];
$arrlength3 = count($cars3);

for($x =0; $x <$arrlength; $x++) 
{  
	$devID=$cars[$x];
	$chk=mysql_query("select doctorId from doctormobilenumber where doctorId='$devID'");
	$count=mysql_num_rows($chk);
	if($count > 0)
	{
		//echo $cars[$x];
	}
	else
	{
	echo $query=mysql_query("insert into doctormobilenumber(doctorId,mobileNumber,alterMobile1,alterMobile2) values('$cars[$x]','$cars1[$x]','$cars2[$x]','$cars3[$x]')");
	}
}

$devId=array();
$selDeId=mysql_query("select doctorId from doctormobilenumber");
while($row=mysql_fetch_array($selDeId))
{
	$devId[]=$row['doctorId'];
}
$tol=count($devId);
for($i=0; $i<$tol;$i++)
{
	for($y=0; $y <$arrlength1; $y++) 
	{  
		//echo $devId[$i]." <br>" ;
		//echo $cars1[$y]." <br>" ;
		$query=mysql_query("update doctormobilenumber set mobileNumber='$cars1[$y]' where doctorId='$devId[$i]'");	
		if($i == $y)
			break;
	} 
	for($z=0; $z <$arrlength2; $z++) 
	{  
		//echo $devId[$i]." <br>" ;
		//echo $cars1[$y]." <br>" ;
		$query=mysql_query("update doctormobilenumber set alterMobile1='$cars2[$z]' where doctorId='$devId[$i]'");	
		if($i == $z)
			break;
	} 
	for($k=0; $k <$arrlength3; $k++) 
	{  
		//echo $devId[$i]." <br>" ;
		//echo $cars1[$y]." <br>" ;
		$query=mysql_query("update doctormobilenumber set alterMobile2='$cars3[$k]' where doctorId='$devId[$i]'");	
		if($i == $k)
			break;
	} 
}
$cars4 = array();					//code for trans
$cars4 =@$_POST['type4'];
$arrlength4 = count($cars4);

for($x =0; $x <$arrlength4; $x++) 
{  
	$devID=$cars4[$x];
	//echo "De".$cars[$x]."<br>";
	//echo "La".$cars1[$x]."<br>";
	$chk=mysql_query("select pt_transaction from servertransactions where pt_transaction='$devID'");
	$count=mysql_num_rows($chk);
	if($count > 0)
	{
		//echo $cars[$x];
	}
	else
	{
	echo $query=mysql_query("insert into servertransactions(pt_transaction) values('$cars4[$x]')");
	}
}