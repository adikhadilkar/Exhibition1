 function getPatients()
{	  
var request = createCORSRequest( "post", "http://socialworker.tekticks.co.in" );
	if(request)
	{
	$.ajax({
		url:"http://socialworker.tekticks.co.in/json/sw_news_json.php",
		dataType:"json",
		contentType: 'application/json',
		success:function(data)
		{
		
		var n=Object.keys(data.newsInformation).length;
		
		//array for Patient Name
		var patientName = []; // create array here
		$.each(data.newsInformation, function (index, newsInformation) {
        newsid.push(newsInformation.id); //push values here
		});
		
		
		//array for newsTitle
		var newsTitle = []; // create array here
		$.each(data.newsInformation, function (index, newsInformation) {
        newsTitle.push(newsInformation.newsTitle); //push values here
		});
		/* console.log(newsTitle); */
		 /* alert(newsTitle);  */
		
		//array for newimage
		var imageLink = []; // create array here
		$.each(data.newsInformation, function (index, newsInformation) {
        imageLink.push(newsInformation.imageLink); //push values here
		});
		/* console.log(imageLink); */
		/* alert(imageLink); */
		
		//array for description
		var description = []; // create array here
		$.each(data.newsInformation, function (index, newsInformation) {
        description.push(newsInformation.description); //push values here
		});
		/* console.log(description); */
		/* alert(description); */
		
		//array for source
		var source = []; // create array here
		$.each(data.newsInformation, function (index, newsInformation) {
        source.push(newsInformation.source); //push values here
		});
		/* console.log(source); */
		/* alert(source); */
					
		//array for author
		var author = []; // create array here
		$.each(data.newsInformation, function (index, newsInformation) {
        author.push(newsInformation.author); //push values here
		});
		/* console.log(description); */
		/* alert(description); */
		
		//array for Tagline
		var tagline = []; // create array here
		$.each(data.newsInformation, function (index, newsInformation) {
        tagline.push(newsInformation.tagline); //push values here
		});
		/* console.log(description); */
		/* alert(description); */
		
			
		//array for createdOn
		var createdOn = []; // create array here
		$.each(data.newsInformation, function (index, newsInformation) {
        createdOn.push(newsInformation.createdOn); //push values here
		});
		/* console.log(description); */
		/* alert(description); */
		
		
		for(var i=0;i<n;i++)
	{ 

/* $('#output').append('<a href="sw_eachNews.html"  class="item-link close-panel" id="'+newsid[i]+'" onclick="geteachnews(this)"><div class="card ks-facebook-card" ><div class="card-content"><div class="card-content-inner"><div class="row"><div class="col-33"><img src="'+imageLink[i]+'" class="lazy lazy-fadeIn ks-demo-lazy"/></div><div class="col-66"><h3>'+newsTitle[i]+'</h3><span>'+tagline[i]+'<span>......Read More</span></span><p>'+source[i]+'  |  '+author[i]+'</p><p><span>Posted On:-</span>'+createdOn[i]+'</div></div></div></div></div></a>');
 */
  $('#Output').append('<a href="sw_eachNews.html"  class="item-link close-panel" id="'+newsid[i]+'" onclick="geteachnews(this)"><div class="card ks-card-header-pic"><div style="background-image:url('+imageLink[i]+')" valign="bottom" class="card-header color-white no-border"></div><div class="card-content"> <div class="card-content-inner"> <p class="color-gray"><h3>'+newsTitle[i]+'</h3></p><p><span>Posted On:-</span>'+createdOn[i]+'</p></div></div></div> </a>');
 

		}}
}
	)};
}





 function geteachnews(item)
{	
var request = createCORSRequest( "post", "http://socialworker.tekticks.co.in" );
	if(request)
	{
		var newsId = $(item).attr("id");
		/* alert(newsId); */
	var data = {"news":[{"newsId":newsId}]};
	localStorage.setItem("newsId", newsId);
			var sendData = function(data)
			{
				
		$.ajax({
		url:"http://socialworker.tekticks.co.in/json/news.php",
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
					var noOfLikes = JSON.stringify(response.news.NoOflikes).replace(/"/g,""); 
					var noOfComments = JSON.stringify(response.news.comments).replace(/"/g,""); 
				//alert(noOfLikes);
				//alert(noOfComments);


				localStorage.setItem("newsTitle", newsTitle);
				  localStorage.setItem("imageLink", imageLink); 
				  localStorage.setItem("description", description);
				    localStorage.setItem("source", source);
					  localStorage.setItem("author", author);
					    localStorage.setItem("createdOn", createdOn); 
						localStorage.setItem("NoOflikes", noOfLikes); 
						localStorage.setItem("noOfComments", noOfComments); 
				
				var divId = "divIDer2";
				jQuery(divId).ready(function() {
					initialize2();  //function called
					//$("#divIDer2").hide();
					});
				
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
	var typeId= document.getElementById("likes").getAttribute("value");
	localStorage.setItem("typeId", typeId); 
	 var newsTitle = localStorage.getItem("newsTitle"); 
	var imageLink = localStorage.getItem("imageLink");
	var description = localStorage.getItem("description"); 
	var source= localStorage.getItem("source");

	 var author = localStorage.getItem("author");
	var createdOn = localStorage.getItem("createdOn");
	var like = localStorage.getItem("like");
	var NoOflikes = localStorage.getItem("NoOflikes");
	var noOfComments = localStorage.getItem("noOfComments");
		
	
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
	 if(like=="1")
	 {
		document.getElementById('likes').style.color = '#55D4FF';
	 }
	 else if(like=="0" || like=="null")//!like
	 {
		 	document.getElementById('likes').style.color = '#000000';
	 }
	 
	$("#eachName").text(newsTitle); 
	$("#eachImage").attr("src",imageLink);
	 $("#eachDescription").text(description);
	 // $("#eachSource").text(source);
	 // $("#eachAuthor").text(author);
	$("#eachCreatedOn").text(createdOn);	
	$("#noOfLikes").text(NoOflikes);	
	$("#noOfComments").text(noOfComments);	
	
	
} 


function newsLike()
{	
var like = localStorage.getItem("like");
	var visitorId= localStorage.getItem("visitorId");
//	var NoOflikes= localStorage.getItem("NoOflikes");
		if(visitorId=="" || !visitorId)
		{
			//alert("please login");
			resetStorage();
		}
		else
		{
 if(like=="0" || like===null)
	 {	like="1";
		document.getElementById('likes').style.color = '#55D4FF';
		localStorage.setItem("like", like); 
		var NoOflikes= localStorage.getItem("NoOflikes");
		var span = 1;
		//alert(NoOflikes);
	var	likeIncrease=Number(NoOflikes)+	Number(span);
		
	
	$("#noOfLikes").text(likeIncrease);	
		localStorage.setItem("NoOflikes",likeIncrease); 
		
	 }
	 else if(like=="1")
	 {	like="0";
		 	document.getElementById('likes').style.color = '#000000';
			localStorage.setItem("like", like); 
			var NoOflikes= localStorage.getItem("NoOflikes");
			
			var span = 1;
			//alert(NoOflikes);
			var	likeDecrease=Number(NoOflikes)-Number(span);
		
	$("#noOfLikes").text(likeDecrease);	
		localStorage.setItem("NoOflikes", likeDecrease); 
			
	 }
		
	var request = createCORSRequest( "post", "http://socialworker.tekticks.co.in" );
	if(request)
	{
var visitorId= localStorage.getItem("visitorId");
var newsId= localStorage.getItem("newsId");
var typeId= localStorage.getItem("typeId");
//var like="1";
/* alert(visitorId);
alert(newsId);

alert(typeId);
alert(like); */
		
		var data = {"news":[{"visitorId ":visitorId,"newsId":newsId,"typeId":typeId,"likes":like}]};
		var sendData = function(data)
		{
				
				$.ajax({
					url:"http://socialworker.tekticks.co.in/json/like_news_json.php",
					type: 'POST',
					dataType:"json",
					data: JSON.stringify(data),
					contentType: 'application/json',
					success:function(response)
					{
						if(JSON.stringify(response.status)==200)
						{
								var divId = "divEachNews";
							jQuery(divId).ready(function() {
								buttonRefresh(); 
		
	
								});

					}
					}
		});
		}
		sendData(data);	
		console.log(data)
	}
		}
}

function buttonRefresh()
{	
	var like= localStorage.getItem("like");
	 
	 if(like=="1")
	 {
		document.getElementById('likes').style.color = '#55D4FF';
		
		
	 }
	 else if(like=="0" || !like)
	 {
		 	document.getElementById('likes').style.color = '#000000';
	 }
	 
	
	
	
}

/* function resetStorage() {
	localStorage.removeItem('bazaarrepos');
	localStorage.removeItem('timestoreversion');
		localStorage.clear();
		myApp.addNotification({

			closeIcon: false,
      message: '<span style="margin-top:5px;vertical-align:center;">Deleting...</span>',
    });
		 setTimeout(function() { myApp.closeNotification(".notification-item"); myApp.addNotification({

			closeIcon: false,
      message: '<span style="margin-top:5px;vertical-align:center;">Adding and Refreshing...</span>',
    });
			location.reload(true);
		}, 5000);
		 
	
} */

function shareNews()
{
	var share = localStorage.getItem("share");
	var newsTitle = 'Social Worker: '+$("#eachName").text()+'...Know More on: ';
	var subject = 'Social Worker: '+$("#eachName").text();
	//alert(title);
	var imageLink = $("#eachImage").attr("src");
	//alert(imageLink);
	var link = "https://goo.gl/BxkAo";
	//window.plugins.socialsharing.share(title, null, 'https://www.google.nl/images/srpr/logo4w.png', link);
	//window.plugins.socialsharing.share(newsTitle, null, imageLink, link);
	
	var request = createCORSRequest( "post", "http://socialworker.tekticks.co.in" );
	if(request)
	{
	var visitorId= localStorage.getItem("visitorId");
	var newsId= localStorage.getItem("newsId");
	
	var data = {"news":[{"visitorId":visitorId,"newsId":newsId,"share":share}]};
		var sendData = function(data)
		{
				
				$.ajax({
					url:"http://socialworker.tekticks.co.in/json/shares_news_json.php",
					type: 'POST',
					dataType:"json",
					data: JSON.stringify(data),
					contentType: 'application/json',
					success:function(response)
					{
						window.plugins.socialsharing.share(newsTitle,subject,imageLink,link);
					}
	
				});
}
              sendData(data);	
		console.log(data);

		}
}


function getComment()
{			/* var a = document.getElementById('getComment');
							a.setAttribute("href","sw_newsComments.html");
							document.getElementById('getComment').click(); */
	
	
	var newsId= localStorage.getItem("newsId");
		var typeId= localStorage.getItem("typeId");
	var request = createCORSRequest( "post", "http://socialworker.tekticks.co.in" );
	if(request)
	{
	//var visitorId= localStorage.getItem("visitorId");
	
	var data = {"news":[{"typeId":typeId,"newsId":newsId}]};
		var sendData = function(data)
		{
				
				$.ajax({
					url:"http://socialworker.tekticks.co.in/json/commentRetrive_json.php",
					type: 'POST',
					dataType:"json",
					data: JSON.stringify(data),
					contentType: 'application/json',
					success:function(response)
					{
							var n=Object.keys(response.comments).length;
						var name=[];
					
						$.each(response.comments, function (index, comments) {
						name.push(comments.name); //push values here
							});
				
				var photoLink=[];
					
						$.each(response.comments, function (index, comments) {
						photoLink.push(comments.photoLink); //push values here
							});
	
						var createdOn=[];
						
						$.each(response.comments, function (index, comments) {
						createdOn.push(comments.createdOn); //push values here
							}); 
							
						var comment=[];
						
						$.each(response.comments, function (index, comments) {
						comment.push(comments.comment); //push values here
							});
	
						for(i=0;i<n;i++)
						{
	$('#getOutput').append('<div class="card ks-facebook-card"><div class="card-header">  <div class="ks-facebook-avatar" id="imageNews"><img src="'+photoLink[i]+'" width="34" height="34" class="lazy"/></div> <div class="ks-facebook-name" style="text-align:left;" id="nameNews" >'+name[i]+'</div><div class="ks-facebook-date" style="text-align:left;" id="dateTime">'+createdOn[i]+'</div></div><div class="card-content"> <div class="card-content-inner"><p style="text-align:left;word-wrap:break-word;" id="datanews">'+comment[i]+'</p></div></div></div>');
						}
					
						$("#enteryourcomment").fadeIn();	
					}
	
				});
}
              sendData(data);	
		console.log(data);

		}
}

function postComment()
{
	var visitorId= localStorage.getItem("visitorId");
//	var NoOflikes= localStorage.getItem("NoOflikes");
		if(visitorId=="" || !visitorId)
		{
			//alert("please login");
			resetStorage();
		}
		else
		{
	
		var noOfComments= localStorage.getItem("noOfComments");
		var span = 1;
		//alert(NoOflikes);
	var	commentIncrease=Number(noOfComments)+Number(span);
		
	
	$("#noOfComments").text(commentIncrease);	
		
	localStorage.setItem("noOfComments",commentIncrease); 
	
	var request = createCORSRequest( "post", "http://socialworker.tekticks.co.in" );
	if(request)
	{
	var visitorId= localStorage.getItem("visitorId");
	var newsId= localStorage.getItem("newsId");
	var typeId= localStorage.getItem("typeId");
	var profileName= localStorage.getItem("profileName");
	var profileImage= localStorage.getItem("profileImage");
	var comment= document.getElementById("commentTextArea").value;
	var data = {"news":[{"visitorId":visitorId,"newsId":newsId,"typeId":typeId,"comment":comment}]};
		var sendData = function(data)
		{
				
				$.ajax({
					url:"http://socialworker.tekticks.co.in/json/comment_json.php",
					type: 'POST',
					dataType:"json",
					data: JSON.stringify(data),
					contentType: 'application/json',
					success:function(response)
					{
					var currentdate = new Date();

			var date =  currentdate.getDate() + "/"+(currentdate.getMonth()+1) 
			+ "/" + currentdate.getFullYear() +  " " 
			+ currentdate.getHours() + ":" 
			+ currentdate.getMinutes() + ":" + currentdate.getSeconds();
			
  $('#getOutput').prepend('<div class="card ks-facebook-card"><div class="card-header">  <div class="ks-facebook-avatar" id="imageNews"><img src="'+profileImage+'" width="34" height="34" class="lazy"/></div> <div class="ks-facebook-name" style="text-align:left;" id="nameNews" >'+profileName+'</div><div class="ks-facebook-date" style="text-align:left;" id="dateTime">'+date+'</div> </div><div class="card-content"> <div class="card-content-inner"><p style="text-align:left;word-wrap:break-word;" id="datanews">'+comment+'</p></div></div></div>');
				document.getElementById("commentTextArea").value="";
				    
				}
	
				});
}
              sendData(data);	
		console.log(data);

		}
		}
		}

function deletenews()
{
	$( "#newsOutput" ).empty();
}

