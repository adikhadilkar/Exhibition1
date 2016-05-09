var files1=[];
var ex;
$("#filename").change(function(e) {
    var ext = $("input#filename").val().split(".").pop().toLowerCase();
	ex=$("input#filename").val().replace(/^.*[\\\/]/, '');
	var x = document.getElementById("filename").value;
	localStorage.setItem("selectedFile",JSON.stringify(ex));
	files1 = this.files;

    if($.inArray(ext, ["csv"]) == -1) {
    myApp.alert('Upload CSV File');
    return false;
    }

    if (e.target.files != undefined) {
        var reader = new FileReader();
        var csvLines;
        var csvValues;
        var i,j;
        var val=[];
        var final=[];

        reader.onload = function(e) {
            csvLines = e.target.result.split("\n");
            for(i=0; i<csvLines.length; i++){
                csvValues = csvLines[i].split(",");
                //alert(csvValues);
                for(j=0;j<csvValues.length;j++)
                {
                	val[j] = csvValues[j].split(",");
                  final.push(val[j]);
                }    
            }
        //alert(final);
		localStorage.setItem("final",JSON.stringify(final));
		myApp.alert(ex,'File Loaded');
		send();
        };
        reader.readAsText(e.target.files.item(0));
    }
	else
	{
		myApp.alert('data is selected once');
	}
    return false;
	
}); 

function myDelete()
{
	//alert("myDelete called..");
	var u=localStorage.getItem("uuid");
	
	var path = "file:///storage/emulated/0";
	var filename =JSON.parse(localStorage.getItem("selectedFile"));

	window.resolveLocalFileSystemURL(path, function(dir) {
	dir.getFile(filename, {create:false}, function(fileEntry) {
              fileEntry.remove(function(){
                  myApp.alert("The file has been removed succesfully",filename);
              },function(error){
                  myApp.alert("Error deleting the file",filename);
              },function(){
                 myApp.alert("The file doesn't exist",filename);
              });
		});
	});
}	

	