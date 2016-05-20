<?
$doctorId=$_GET['doctorId'];
$mobileNumber=$_GET['mobileNumber'];
$alterMobile1=$_GET['alterMobile1'];
$alterMobile2=$_GET['alterMobile2'];
// Create connection
$conn = mysqli_connect('localhost','tekticks_radio','demo@123','tekticks_radio');
// Check connection
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}
		$selectDoctrId=mysqli_query($conn,"select doctorId from doctormobilenumber where doctorId='$doctorId'");
		$CountCheck=mysqli_num_rows($selectDoctrId);
		if($CountCheck > 0)
		{
			$updateData=mysqli_query($conn,"update doctormobilenumber set mobileNumber='$mobileNumber',alterMobile1='$alterMobile1',alterMobile2='$alterMobile2' where doctorId='$doctorId'");
		}
		else
		{
			$insertData=mysqli_query($conn,"INSERT INTO doctormobilenumber(doctorId, mobileNumber, alterMobile1, alterMobile2)
VALUES('$doctorId','$mobileNumber','$alterMobile1','$alterMobile2')");
		}
/* $sql = "INSERT INTO doctormobilenumber(doctorId, mobileNumber, alterMobile1, alterMobile2)
VALUES('$doctorId','$mobileNumber','$alterMobile1','$alterMobile2')";
if (mysqli_query($conn, $sql)) {
    echo "New record created successfully";
} else {
    echo "Error: " . $sql . "<br>" . mysqli_error($conn);
} */
mysqli_close($conn);
//echo "Send Successfully ....";
?>