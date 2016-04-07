function getNotes()
{
	alert("getNotes called");
	//myApp.showPreloader();	
	var request = createCORSRequest( "post", "http://exhibition.tekticks.co.in" );
	if(request)
	{
	$.ajax({
		url:"http://exhibition.tekticks.co.in/application/json/getNotesJson.php",
		dataType:"json",
		contentType: 'application/json',
		success:function(data)
		{
		
		//myApp.hidePreloader();
		var n=Object.keys(data.notesInformation).length;
		
		
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
	 
	 
	 
	/* $("#eachName").text(newsTitle); 
	$("#eachImage").attr("src",imageLink);
	 $("#eachDescription").text(description);
	 // $("#eachSource").text(source);
	 // $("#eachAuthor").text(author);
	$("#eachCreatedOn").text(createdOn);	
	//$("#noOfLikes").text(NoOflikes);	
	//$("#noOfComments").text(noOfComments); */	
	
	
} 
