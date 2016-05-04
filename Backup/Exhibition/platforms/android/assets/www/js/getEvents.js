function getEvents()
{
myApp.showPreloader();	
var request = createCORSRequest( "post", "http://radio.tekticks.com" );
	if(request)
	{
	$.ajax({
		url:"http://radio.tekticks.com/exhibition/getEvents_json.php",
		dataType:"json",
		contentType: 'application/json',
		success:function(data)
		{
		myApp.hidePreloader();
		var n=Object.keys(data.eventsInformation).length;

		if(n>0)
		{
		var id = []; // create array here
		$.each(data.eventsInformation, function (index, eventsInformation) {
        id.push(eventsInformation.id); //push values here
		});
		//alert(id);
		
		//array for eventTitle
		var eventTitle = []; // create array here
		$.each(data.eventsInformation, function (index, eventsInformation) {
        eventTitle.push(eventsInformation.eventTitle); //push values here
		});
		//alert(eventTitle);

		//array for description
		var description = []; // create array here
		$.each(data.eventsInformation, function (index, eventsInformation) {
        description.push(eventsInformation.description); //push values here
		});
		//alert(description);
		
		//array for date
		var date = []; // create array here
		$.each(data.eventsInformation, function (index, eventsInformation) {
        date.push(eventsInformation.date); //push values here
		});
		//alert(date);
		
		//array for starttime
		var starttime = []; // create array here
		$.each(data.eventsInformation, function (index, eventsInformation) {
        starttime.push(eventsInformation.starttime); //push values here
		});
		//alert(starttime);
		
		//array for endtime
		var endtime = []; // create array here
		$.each(data.eventsInformation, function (index, eventsInformation) {
        endtime.push(eventsInformation.endtime); //push values here
		});
		//alert(endtime);
	
		//array for venue
		var venueName = []; // create array here
		$.each(data.eventsInformation, function (index, eventsInformation) {
        venueName.push(eventsInformation.venueName); //push values here
		});
		//alert(venueName);
		
		//array for imagelink
		var imageLink = []; // create array here
		$.each(data.eventsInformation, function (index, eventsInformation) {
        imageLink.push(eventsInformation.imageLink); //push values here
		});
		//alert(imageLink);
		
		
		for(var i=0;i<n;i++)
		{ 
			$('#eventsOutput').append('<div class="list-block media-list" style="margin:0px 0px"><ul><li><a href="eachEvent.html" class="item-link item-content" id="'+id[i]+'" onclick="getEachEvent(this)"><div class="item-media"><img src="'+imageLink[i]+'" width="100"></div><div class="item-inner"><div class="item-title-row"><div class="item-title"><b>'+eventTitle[i]+'</b></div><div class="item-after"></div></div><div class="item-subtitle">'+date[i]+'</div><div class="item-text">'+venueName[i]+'</div></div></a></li></ul></div>');
		}
		}
		else
		{
			myApp.hidePreloader();
			myApp.alert('There are no more events for you.','Events');
		}
		
		}
}
	)};
}



 function getEachEvent(item)
{	
	myApp.showPreloader();
	var request = createCORSRequest( "post", "http://radio.tekticks.com" );
	if(request)
	{
		var id = $(item).attr("id");
		
	var data = {"events":[{"id":id}]};
	localStorage.setItem("eventsId", id);
	
			var sendData = function(data)
			{
				
		$.ajax({
		url:"http://radio.tekticks.com/exhibition/eachEvents.php",
		type: 'POST',
		dataType:"json",
		data: JSON.stringify(data),
		contentType: 'application/json',
		success:function(response)
		{
			if(JSON.stringify(response.status)==200)
			{
				
				var eventTitle= JSON.stringify(response.events.eventTitle).replace(/"/g,"");
				var description= JSON.stringify(response.events.description).replace(/"/g,"");
				var starttime= JSON.stringify(response.events.starttime).replace(/"/g,"");
				var endtime= JSON.stringify(response.events.endtime).replace(/"/g,"");
				var eventTitle= JSON.stringify(response.events.eventTitle).replace(/"/g,"");
				var venueName= JSON.stringify(response.events.venueName).replace(/"/g,"");
				var date= JSON.stringify(response.events.date).replace(/"/g,"");
				var imageLink= JSON.stringify(response.events.imageLink).replace(/"/g,"");
				//alert(imageLink);
				localStorage.setItem("eventTitle", eventTitle); 
				  localStorage.setItem("description", description);
				    localStorage.setItem("starttime", starttime);
					  localStorage.setItem("endtime", endtime);
					    localStorage.setItem("date", date); 
						localStorage.setItem("venueName", venueName);
						localStorage.setItem("imageLink", imageLink); 
						
					myApp.hidePreloader();
					initialize4();  //function called
					
				
		}
		}
		});
}
sendData(data);	
console.log(data);
}
}


 function initialize4()
{		
	 var show = document.getElementById('divEvent');
    show.style.visibility = 'visible';
	
	 var eventTitle = localStorage.getItem("eventTitle"); 
	var description = localStorage.getItem("description"); 
	var starttime= localStorage.getItem("starttime");
	 var endtime = localStorage.getItem("endtime");
	var date = localStorage.getItem("date");
	var venueName = localStorage.getItem("venueName");
	var imageLink = localStorage.getItem("imageLink");
	
	if(eventTitle.replace(/\s/g,"") == "")
	{
	
		$("#eachEventName").fadeOut();
	}
	else
	{
	    $("#eachEventName").fadeIn();
		$("#eachEventName").text(eventTitle);
          		  
	}
	
	if(description.replace(/\s/g,"") == "")
	{
	
		$("#eventDescription").fadeOut();
	}
	else
	{
	    $("#eventDescription").fadeIn();
		$("#eventDescription").text(description);
          		  
	}
	
	if(starttime.replace(/\s/g,"") == "")
	{
	
		$("#starttime").fadeOut();
	}
	else
	{
	    $("#starttime").fadeIn();
		$("#starttime").text(starttime);
          		  
	}
	
	if(endtime.replace(/\s/g,"") == "")
	{
	
		$("#endtime").fadeOut();
	}
	else
	{
	    $("#endtime").fadeIn();
		$("#endtime").text(endtime);
          		  
	}
	
	if(date.replace(/\s/g,"") == "")
	{
	
		$("#eachCreatedOn").fadeOut();
	}
	else
	{
	    $("#eachCreatedOn").fadeIn();
		$("#eachCreatedOn").text(date);
          		  
	}
	
	if(venueName.replace(/\s/g,"") == "")
	{
	
		$("#eventLocation").fadeOut();
	}
	else
	{
	    $("#eventLocation").fadeIn();
		$("#eventLocation").text(venueName);
          		  
	}
	
	
	if(imageLink.replace(/\s/g,"") == "")
	{
	
		$("#eachEventImage").fadeOut();
	}
	else
	{
	    $("#eachEventImage").fadeIn();
		$("#eachEventImage").attr("src",imageLink);    		  
	}
	
	
	
} 


