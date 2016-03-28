
var files1=[];

$("#filename").change(function(e) {
    var ext = $("input#filename").val().split(".").pop().toLowerCase();

	files1 = this.files;
	alert(files1[0]);

    if($.inArray(ext, ["csv"]) == -1) {
    alert('Upload CSV');
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
          alert(final);
		localStorage.setItem("final",JSON.stringify(final));
		myApp.alert('File Loaded','CSV');
		myDelete();
        };
        reader.readAsText(e.target.files.item(0));
    }
    return false;
	
}); 

function myDelete()
{
	alert("myDelete called..");
	alert(files1[0]);
   
	window.requestFileSystem(window.TEMPORARY, 1024*1024, function(fs) {
  fs.root.getFile('files1[0]', {create: false}, function(fileEntry) {

    fileEntry.remove(function() {
      alert("File removed");
    }, errorHandler);

  }, errorHandler);
}, errorHandler);


	
}	