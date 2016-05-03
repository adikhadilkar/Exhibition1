function getNews()
{
myApp.showPreloader();	
var request = createCORSRequest( "post", "http://radio.tekticks.com" );
	if(request)
	{
	$.ajax({
		url:"http://radio.tekticks.com/exhibition/news_json.php",
		dataType:"json",
		contentType: 'application/json',
		success:function(data)
		{
		
		myApp.hidePreloader();
		var n=Object.keys(data.newsInformation).length;
		
		if(n>0)
		{
		var newsid = []; // create array here
		$.each(data.newsInformation, function (index, newsInformation) {
        newsid.push(newsInformation.id); //push values here
		});
		//alert(newsid);
		//array for newsTitle
		var newsTitle = []; // create array here
		$.each(data.newsInformation, function (index, newsInformation) {
        newsTitle.push(newsInformation.newsTitle); //push values here
		});
		
		//array for newimage
		var imageLink = []; // create array here
		$.each(data.newsInformation, function (index, newsInformation) {
        imageLink.push(newsInformation.imageLink); //push values here
		});
		
		//array for description
		var description = []; // create array here
		$.each(data.newsInformation, function (index, newsInformation) {
        description.push(newsInformation.description); //push values here
		});
		
		//array for source
		var source = []; // create array here
		$.each(data.newsInformation, function (index, newsInformation) {
        source.push(newsInformation.source); //push values here
		});
		
		//array for author
		var author = []; // create array here
		$.each(data.newsInformation, function (index, newsInformation) {
        author.push(newsInformation.author); //push values here
		});
		
		//array for Tagline
		var tagLine = []; // create array here
		$.each(data.newsInformation, function (index, newsInformation) {
        tagLine.push(newsInformation.tagLine); //push values here
		});
	
		//array for createdOn
		var createdOn = []; // create array here
		$.each(data.newsInformation, function (index, newsInformation) {
        createdOn.push(newsInformation.date); //push values here
		});
		
		
		for(var i=0;i<n;i++)
		{ 
			$('#newsOutput').append('<a href="eachNews.html"  class="item-link close-panel" id="'+newsid[i]+'" onclick="geteachnews(this)"><div class="card demo-card-header-pic"><div style="background-image:url('+imageLink[i]+')"  class="card-header color-white no-border" style="display: block;"></div><div class="card-content"> <div class="card-content-inner"> <p class="color-black"><b><big>'+newsTitle[i]+'</big></b></p><p class="color-black">Author - '+author[i]+'</p></div></div></div> </a>');
		}
		}
		else
		{
				myApp.hidePreloader();
			myApp.alert('There are no more news for you.','News');
		}
		
		}
}
	)};
}





 function geteachnews(item)
{	
	myApp.showPreloader();
var request = createCORSRequest( "post", "http://radio.tekticks.com" );
	if(request)
	{
		var newsId = $(item).attr("id");
		/* alert(newsId); */
	var data = {"news":[{"newsId":newsId}]};
	localStorage.setItem("newsId", newsId);
	
			var sendData = function(data)
			{
				
		$.ajax({
		url:"http://radio.tekticks.com/exhibition/news.php",
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


 function initialize2()
{		
	 var show = document.getElementById('divIDer2');
    show.style.visibility = 'visible';
	//var typeId= document.getElementById("likes").getAttribute("value");
	//localStorage.setItem("typeId", typeId); 
	 var newsTitle = localStorage.getItem("newsTitle"); 
	var imageLink = localStorage.getItem("imageLink");
	var description = localStorage.getItem("description"); 
	var source= localStorage.getItem("source");

	 var author = localStorage.getItem("author");
	var createdOn = localStorage.getItem("createdOn");
	//var like = localStorage.getItem("like");
	//var NoOflikes = localStorage.getItem("NoOflikes");
	//var noOfComments = localStorage.getItem("noOfComments");
		
	
	  if(source.replace(/\s/g,"") == "")
	  {
		  
		$("#eachSource").fadeOut();
		$("#publish").fadeOut();
		$("#line").fadeOut();
		  
	if(author.replace(/\s/g,"") == "")
	{
	
		$("#eachAuthor").fadeOut();
	}
	else
	{
	    $("#publish").fadeIn();
		$("#eachAuthor").text(author);
          		  
	}
	
	  }
	 else
	 {
		 $("#publish").fadeIn();
		  $("#eachSource").text(source);
		 
	if(author.replace(/\s/g,"") == "")
	{
		 $("#line").fadeOut();
	}
	else
	{
		 $("#line").fadeIn();
		 $("#eachAuthor").text(author);
	}  
	 
	 }
	 //check if the news is liked or not 
	/* if(like=="1")
	 {
		document.getElementById('likes').style.color = '#55D4FF';
	 }
	 else if(like=="0" || like=="null")//!like
	 {
		 	document.getElementById('likes').style.color = '#000000';
	 }*/
	 
	$("#eachName").text(newsTitle); 
	$("#eachImage").attr("src",imageLink);
	 $("#eachDescription").text(description);
	 // $("#eachSource").text(source);
	 // $("#eachAuthor").text(author);
	$("#eachCreatedOn").text(createdOn);	
	//$("#noOfLikes").text(NoOflikes);	
	//$("#noOfComments").text(noOfComments);	
	
	
} 




