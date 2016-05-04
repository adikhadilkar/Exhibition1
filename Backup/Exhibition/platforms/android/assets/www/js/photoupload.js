
var pictureSource; // picture source
var destinationType; // sets the format of returned value
// Wait for device API libraries to load
//
document.addEventListener("deviceready", onDeviceReady, false);
// device APIs are available
//

function onDeviceReady() {
	
    pictureSource = navigator.camera.PictureSourceType;
    destinationType = navigator.camera.DestinationType;
	//alert("hiii");
}
// Called when a photo is successfully retrieved
//

 /* function onPhotoDataSuccess(imageURI) {
	alert("fire");  */
    // Uncomment to view the base64-encoded image data
    /*  console.log(imageURI);  */
    // Get image handle
    //
   /*  var cameraImage = document.getElementById('image');  */
    // Unhide image elements
    //
 /*    cameraImage.style.display = 'block';  */
    // Show the captured photo
    // The inline CSS rules are used to resize the image
    //
 /*   cameraImage.src = imageURI;
}  */
// Called when a photo is successfully retrieved
//

function onPhotoURISuccess(imageURI) {
	alert("fire");
    // Uncomment to view the image file URI
    alert(imageURI);
    // Get image handle
    //
    var galleryImage = document.getElementById('profilePic');
    // Unhide image elements
    //
   galleryImage.style.display = 'block';
  // galleryImage.style = 'width:720px;height:1280px';
    // Show the captured photo
    // The inline CSS rules are used to resize the image
    //
    galleryImage.src = imageURI;
	//myApp.alert('Updated','ProfilePic');
	//alert(imageURI);
}
// A button will call this function
//

/* function capturePhoto() { */
    // Take picture using device camera and retrieve image as base64-encoded string
   /*  navigator.camera.getPicture(onPhotoDataSuccess, onFail, { */
    /*     quality: 30,
        targetWidth: 600,
        targetHeight: 600,
        destinationType: destinationType.FILE_URI,
        saveToPhotoAlbum: true
    });
} */
// A button will call this function
//

function getPhoto(source) {
	alert("getphotocalled");
    // Retrieve image file location from specified source
navigator.camera.getPicture(onPhotoURISuccess, onFail, {
	    quality: 30, 
        targetWidth: 600,
        targetHeight: 600,
        destinationType: destinationType.FILE_URI,
        sourceType: source
    });
}
// Called if something bad happens.
//

function onFail(message) {
    alert('Failed because: ' + message);
}

function upload() {

//alert("upload");
	/* function win(r) {
    alert("Code = " + r.responseCode);
    alert("Response = " + r.response);
    alert("Sent = " + r.bytesSent);
	}

	function fail(error) {
    alert("An error has occurred: Code = " + error.code);
    alert("upload error source " + error.source);
    alert("upload error target " + error.target);
	} */
    var img = document.getElementById('profilePic');
    var imageURI = img.src;
    var options = new FileUploadOptions();
    options.fileKey = "file";
    options.fileName = imageURI.substr(imageURI.lastIndexOf('/') + 1);
    options.mimeType = "image/jpeg";
    var params = new Object();
    options.params = params;
    options.chunkedMode = true;
	
    var ft = new FileTransfer();
	//ft.upload(fileEntry.toURL(), encodeURI("http://socialworker.tekticks.co.in/json/uploadProfile.php"), onSuccess, onError, getFileUploadOptions(fileEntry.fullPath));	

    ft.upload(imageURI, encodeURI("http://radio.tekticks.com/exhibition/uploadProfile.php"), win, fail, options);
	return imageURI.substr(imageURI.lastIndexOf('/'));
	
} 
 
/* 
 function uploadPhoto(imageURI) {
            var options = new FileUploadOptions();
            options.fileKey="file";
            options.fileName=imageURI.substr(imageURI.lastIndexOf('/')+1);
            options.mimeType="image/jpeg";

            var params = {};
            params.value1 = "test";
            params.value2 = "param";

            options.params = params;

            var ft = new FileTransfer();
            ft.upload(imageURI, encodeURI("http://some.server.com/upload.php"), win, fail, options);
        }



 */


function win(r) {
    console.log("Code = " + r.responseCode);
    console.log("Response = " + r.response);
    console.log("Sent = " + r.bytesSent);
}

function fail(error) {
    alert("An error has occurred: Code = " + error.code);
    console.log("upload error source " + error.source);
    console.log("upload error target " + error.target);
}   