var files1=[];
var ex;
$("#filename").change(function(e) {
    var ext = $("input#filename").val().split(".").pop().toLowerCase();
	ex=$("input#filename").val().replace(/^.*[\\\/]/, '');
	var x = document.getElementById("filename").value;
	//alert(x);
	alert(ex);
	//alert(ext);
	files1 = this.files;
	//alert(files1);

    if($.inArray(ext, ["csv"]) == -1) {
    myApp.alert('Upload CSV');
    return false;
    }

    if (e.target.files != undefined) {
		//alert(e);
		//alert(e.target);
		//alert(e.target.files);
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
	else
	{
		myApp.alert('data is selected once');
	}
    return false;
	
}); 

function myDelete()
{
	//alert("myDelete called..");
	//alert(ex);
	/* window.requestFileSystem(window.TEMPORARY, 5*1024*1024, gotFS, fail); */ 
	
	/* $.ajax
				({
				url: 'getname.php',
				type:"post",
				data:{type:ex},
				cache: false, 
				 success: function(response)
					{
						alert("success");
						
					}
				});	 */
	
	$.ajax({
			type: "POST",
			url: "http://localhost/csv/www/js/getname.php",
			data: {data1 : ex}, 
			cache: false,
			success: function(){
            alert("OK");
							},
							error: function()
							{
								alert("error");
							}
					}); 
	
	
	/* alert("myDelete called..");
	alert(files1[0]);
   
		var root = getFileSystemRoot();
        var remove_file = function(entry) {
                entry.remove(function() {
                    navigator.notification.alert(entry.toURI(), null, 'Entry deleted');                    
                }, onFileSystemError);
            };
            
            // retrieve a file and truncate it
            root.getFile(ex, {create: false}, remove_file, onFileSystemError);
			alert("file deleted");  */
}	

	/*  function gotFS(fileSystem) 
	{
		alert("inside gotfs");
        fileSystem.root.getFile(ex, {create: true, exclusive: false}, gotFileEntry, fail);
    }
	
	function gotFileEntry(fileEntry) 
	{
		alert("inside gotfileentry");
        fileEntry.createWriter(gotFileWriter, fail);
    }
	
	function gotFileWriter(writer) 
	{
		alert("inside gotfilewriter");
        writer.onwriteend = function(evt) {
            console.log("contents of file now 'some sample text'");
            writer.truncate(11);  
            writer.onwriteend = function(evt) {
                console.log("contents of file now 'some sample'");
                writer.seek(4);
                writer.write(" different text");
                writer.onwriteend = function(evt){
                    console.log("contents of file now 'some different text'");
                }
            };
        };
        writer.write("some sample text");
    } 
	
	  function fail(error) {
        console.log(error.code);
    } 
 */
 function onFileSystemError(error) 
 {
	var msg = 'file system error: ' + error.code;
	navigator.notification.alert(msg, null, 'File System Error');
 } 