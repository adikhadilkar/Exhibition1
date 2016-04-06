function getNotes()
{
	myApp.showPreloader();	
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
		url:"http://exhibition.tekticks.co.in/application/json/news.php",
		type: 'POST',
		dataType:"json",
		data: JSON.stringify(data),
		contentType: 'application/json',
		success:function(response)
		{
			if(JSON.stringify(response.status)==200)
			{
				
				var newsTitle= JSON.stringify(response.news.newsTitle).replace(/"/g,"");
				/* alert(newsTitle); */
			    var imageLink= JSON.stringify(response.news.imageLink).replace(/"/g,""); 
			    /* alert(imageLink); */
				var description= JSON.stringify(response.news.description).replace(/"/g,"");
				/* alert(description); */
				var source= JSON.stringify(response.news.source).replace(/"/g,"");
					/* alert(source); */
				var author= JSON.stringify(response.news.author).replace(/"/g,"");
					/* alert(author); */
				 var createdOn= JSON.stringify(response.news.createdOn).replace(/"/g,""); 
					/* alert(createdOn); */
					//var noOfLikes = JSON.stringify(response.news.NoOflikes).replace(/"/g,""); 
					//var noOfComments = JSON.stringify(response.news.comments).replace(/"/g,""); 
				//alert(noOfLikes);
				//alert(noOfComments);


				localStorage.setItem("newsTitle", newsTitle);
				  localStorage.setItem("imageLink", imageLink); 
				  localStorage.setItem("description", description);
				    localStorage.setItem("source", source);
					  localStorage.setItem("author", author);
					    localStorage.setItem("createdOn", createdOn); 
						//localStorage.setItem("NoOflikes", noOfLikes); 
						//localStorage.setItem("noOfComments", noOfComments); 
				
				//var divId = "divIDer2";
				//jQuery(divId).ready(function() {
					myApp.hidePreloader();
					initialize2();  //function called
					//$("#divIDer2").hide();
					//});
				
		}
		}
		});
}
sendData(data);	
console.log(data);
}
}