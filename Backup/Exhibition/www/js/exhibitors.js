function getExhibitors()
{
myApp.showPreloader();	
var request = createCORSRequest( "post", "http://radio.tekticks.com" );
	if(request)
	{
	$.ajax({
		url:"http://radio.tekticks.com/exhibition/getExhibitors.php",
		dataType:"json",
		contentType: 'application/json',
		success:function(data)
		{
		
		myApp.hidePreloader();
		var n=Object.keys(data.exhibitorsInformation).length;
		
		if(n>0)
		{
		var id = []; // create array here
		$.each(data.exhibitorsInformation, function (index, exhibitorsInformation) {
        id.push(exhibitorsInformation.id); //push values here
		});
		//alert(id);
		//array for company name
		var companyName = []; // create array here
		$.each(data.exhibitorsInformation, function (index, exhibitorsInformation) {
        companyName.push(exhibitorsInformation.companyName); //push values here
		});
		//alert(companyName);
		for(var i=0;i<n;i++)
		{ 
			/* $('#alphabet').append('<a href="eachExhibitor.html"  class="item-link close-panel" id="'+id[i]+'" onclick="getEachExhibitor(this)"><li class="item-content"><div class="item-inner"><div class="item-title">'+companyName[i]+'</div></div></li></a>'); */
			
			$('#alphabet').append('<div class="list-block media-list" style="margin:0px 0px"><ul><li><a href="eachExhibitor.html" class="item-link item-content" id="'+id[i]+'" onclick="getEachExhibitor(this)"><div class="item-inner"><div class="item-title-row"><div class="item-title">'+companyName[i]+'</div></div></div></a></li></ul></div>');
			
		}
		}
		else
		{
				myApp.hidePreloader();
			myApp.alert('There are no more Exhibitors for you.','Exhibitors');
		}
		
		}
}
	)};
}