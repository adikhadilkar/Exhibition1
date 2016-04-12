function getNotes()
{
	myApp.showPreloader();
	$("#nodata").fadeOut();	
	var request = createCORSRequest( "post", "http://exhibition.tekticks.co.in" );
	if(request)
	{
	$.ajax({
		url:"http://exhibition.tekticks.co.in/application/json/getNotesJson.php",
		dataType:"json",
		contentType: 'application/json',
		success:function(data)
		{
		
		myApp.hidePreloader();
		var n=Object.keys(data.notesInformation).length;
		
		if(n>0)
		{
		var id = []; // create array here
		$.each(data.notesInformation, function (index, notesInformation) {
        id.push(notesInformation.id); //push values here
		});
		
		//array for notesTitle
		var notesTitle = []; // create array here
		$.each(data.notesInformation, function (index, notesInformation) {
        notesTitle.push(notesInformation.notesTitle); //push values here
		});
		
		
		//array for notes description
		var notes = []; // create array here
		$.each(data.notesInformation, function (index, notesInformation) {
        notes.push(notesInformation.notes); //push values here
		});

		
		for(var i=0;i<n;i++)
		{ 
			$('#notesOutput').append('<a href="eachNote.html" class="item-link close-panel" id="'+id[i]+'" onclick="getEachNote(this)"><div class="card"><div class="card-header"><b>'+notesTitle[i]+'</b></div><div class="card-content"><div class="card-content-inner"><p class="color-black">'+notes[i]+'</p></div></div></div> </a>');
		}
		}
		else
		{
			myApp.hidePreloader();
			myApp.alert('There are no more Notes for you.','Notes');
			$("#nodata").fadeIn();
			$("#nodata").text("No Data Available");
		}
		}
	}
	)};
}

 function getEachNote(item)
{	
myApp.showPreloader();
var request = createCORSRequest( "post", "http://exhibition.tekticks.co.in" );
	if(request)
	{
		var id = $(item).attr("id");
		var data = {"notes":[{"notesId":id}]};
		localStorage.setItem("notesId", id);
	
			var sendData = function(data)
			{
				
		$.ajax({
		url:"http://exhibition.tekticks.co.in/application/json/notes.php",
		type: 'POST',
		dataType:"json",
		data: JSON.stringify(data),
		contentType: 'application/json',
		success:function(response)
		{
			if(JSON.stringify(response.status)==200)
			{
				
				var notesTitle= JSON.stringify(response.notes.notesTitle).replace(/"/g,"");
				
				var notes= JSON.stringify(response.notes.notes).replace(/"/g,"");


				localStorage.setItem("notesTitle", notesTitle);
				  
				  localStorage.setItem("notes", notes);
				    
					myApp.hidePreloader();
					initialize3();  
				
		}
		}
		});
}
sendData(data);	
console.log(data);
}
}


function initialize3()
{	
	myApp.showPreloader();	
	 var show = document.getElementById('divNote');
    show.style.visibility = 'visible';
	
	 var notesTitle = localStorage.getItem("notesTitle"); 
	var notes = localStorage.getItem("notes"); 
	
	
		  
	if(notesTitle.replace(/\s/g,"") == "")
	{
	
		$("#noteTitle").fadeOut();
	}
	else
	{
	    $("#noteTitle").fadeIn();
		$("#noteTitle").text(notesTitle);
          		  
	}
	
	 
		 
	if(notes.replace(/\s/g,"") == "")
	{
		 $("#description").fadeOut();
	}
	else
	{
		 $("#description").fadeIn();
		 $("#description").text(notes);
	}  
	myApp.hidePreloader();
} 

function editNote()
{
	myApp.showPreloader();
	var request = createCORSRequest( "post", "http://exhibition.tekticks.co.in" );
	if(request)
	{
		var notesId = localStorage.getItem("notesId");
		var data = {"notes":[{"notesId":notesId}]};
		
		var getData = function(data)
		{
		$.ajax({
		url:"http://exhibition.tekticks.co.in/application/json/retrivalNotes_json.php",
		type: 'POST',
		contentType: 'application/json',
		data: JSON.stringify(data),
		dataType:"json",
		success:function(response)
		{
					$(".floating-label").hide();
					$("#title1").val(JSON.stringify(response.notes[0].notesTitle).replace(/"/g,""));
					$("#note").text(JSON.stringify(response.notes[0].notes).replace(/"/g,""));
					myApp.hidePreloader();
		
		}
		});
		}
			getData(data);
	}
	
}

function updateNote()
{
	myApp.showPreloader();	

	var title = document.getElementById('title1').value;
	var content = document.getElementById('note').value;
	var nId = localStorage.getItem("notesId");
	var request = createCORSRequest( "post", "http://exhibition.tekticks.co.in" );

	if(request)
	{
		var data = {"notesUpdate":[{"notesId":nId,"notesTitle":title,"notes":content}]};
		var sendData = function(data)
		{
		$.ajax({
		url:"http://exhibition.tekticks.co.in/application/json/notesUpdate.php",
		type: 'POST',
		contentType: 'application/json',
		data: JSON.stringify(data),
		dataType:"json",
		success:function(response)
		{
					if(JSON.stringify(response.status)==200)
						{
							myApp.hidePreloader();	
							myApp.alert('Successfully Updated','Note');
							var a = document.getElementById('nextNote');
							a.setAttribute("href","logo.html");
							document.getElementById('nextNote').click();
						}
		}
	  
		});
		} 
	sendData(data);
	}
}


function deleteNote()
{
	myApp.showPreloader();
	var request = createCORSRequest( "post", "http://exhibition.tekticks.co.in" );
	if(request)
	{
		var notesId = localStorage.getItem("notesId");
		var data = {"notes":[{"notesId":notesId}]};
		
		var getData = function(data)
		{
		$.ajax({
		url:"http://exhibition.tekticks.co.in/application/json/deleteNote.php",
		type: 'POST',
		contentType: 'application/json',
		data: JSON.stringify(data),
		dataType:"json",
		success:function(response)
		{
			if(JSON.stringify(response.status)==200)
			{
					myApp.hidePreloader();	
					myApp.alert('Successfully Deleted','Note');
					var a = document.getElementById('deleteNext');
					a.setAttribute("href","logo.html");
					document.getElementById('deleteNext').click();	
			}
		}
		});
		}
			getData(data);
	}
}
