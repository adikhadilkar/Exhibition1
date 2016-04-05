 function eachnews()
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
		/* console.log(data.newsInformation); */
		/* 
		var div=document.createElement('div'); */
		var n=Object.keys(data.newsInformation).length;
		/* alert(n); */
		//array for id
		/* var newsid = []; // create array here
		$.each(data.newsInformation, function (index, newsInformation) {
        newsid.push(newsInformation.id); //push values here
		});
		console.log(newsid); */
		/* alert(newsid); */
		
		//array for newsTitle
		/* var newsTitle = []; // create array here
		$.each(data.newsInformation, function (index, newsInformation) {
        newsTitle.push(newsInformation.newsTitle); //push values here
		});
		console.log(newsTitle); */
		 /* alert(newsTitle);  */
		
		//array for newimage
		/* var imageLink = []; // create array here
		$.each(data.newsInformation, function (index, newsInformation) {
        imageLink.push(newsInformation.imageLink); //push values here
		});
		console.log(imageLink); */
		/* alert(imageLink); */
		
		//array for description
		/* var description = []; // create array here
		$.each(data.newsInformation, function (index, newsInformation) {
        description.push(newsInformation.description); //push values here
		});
		console.log(description); */
		/* alert(description); */
	
		
	/* 	
	 for(var i=0;i<n;i++)
	{  */
/* var arr =[$.parseJSON(data.newsInformation[i].id)]; */
 /* alert(arr); */
 /* var arr1 =[$.parseJSON(data.newsInformation[i].imageLink)];
alert(arr1);  */
/* $('#output').append('<a href="sw_eachNews.html" onclick="getnews()" class="item-link close-panel"><div class="card ks-facebook-card" id="output"><div class="card-content"><div class="card-content-inner"><div class="row"><div class="col-33"><input type="hidden" id='+newsid[i]+'> <img src="'+imageLink[i]+'" class="lazy lazy-fadeIn ks-demo-lazy"/></div><div class="col-66"><h3>'+newsTitle[i]+'</h3><span>'+description[i]+'</span><span> | Source</span></div></div></div></div></div></a>');
	}
		 */
 
      
            
                

    } 
			
			 
		
		
	
	
	

	});
}
};
	
	 