$("#filename").change(function(e) {
    var ext = $("input#filename").val().split(".").pop().toLowerCase();

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
          //alert(final);
		localStorage.setItem("final",JSON.stringify(final));
		myApp.alert('File Loaded','CSV');
        };
        reader.readAsText(e.target.files.item(0));
    }
    return false;
	
});    