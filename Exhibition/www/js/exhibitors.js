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
		//companyName.sort();
		//alert(companyName);
		
		var link = []; // create array here
		$.each(data.exhibitorsInformation, function (index, exhibitorsInformation) {
        link.push(exhibitorsInformation.link); //push values here
		});
		
		var sectorName = []; // create array here
		$.each(data.exhibitorsInformation, function (index, exhibitorsInformation) {
        sectorName.push(exhibitorsInformation.sectorName); //push values here
		});
		
		var description = []; // create array here
		$.each(data.exhibitorsInformation, function (index, exhibitorsInformation) {
        description.push(exhibitorsInformation.description); //push values here
		});
		
		for(var i=0;i<n;i++)
		{ 
			/* $('#alphabet').append('<a href="eachExhibitor.html"  class="item-link close-panel" id="'+id[i]+'" onclick="getEachExhibitor(this)"><li class="item-content"><div class="item-inner"><div class="item-title">'+companyName[i]+'</div></div></li></a>'); */
			
			/* $('#alphabet').append('<div class="list-block media-list" style="margin:0px 0px"><ul><li><a href="eachExhibitor.html" class="item-link item-content" id="'+id[i]+'" onclick="getEachExhibitor(this)"><div class="item-inner"><div class="item-title-row"><div class="item-title">'+companyName[i]+'</div></div></div></a></li></ul></div>'); */
			
			$('#alphabet').append('<div class="list-block media-list" style="margin:0px 0px" ><ul><li><a href="eachExhibitor.html" class="item-link item-content" id="'+id[i]+'" onclick="getEachExhibitor(this)"><div class="item-media"><img src="'+link[i]+'" width="100"></div><div class="item-inner"><div class="item-title-row"><div class="item-title"><b>'+companyName[i]+'</b></div><div class="item-after"></div></div><div class="item-subtitle">'+sectorName[i]+'</div><div class="item-text">'+description[i]+'</div></div></a></li></ul></div>');
			
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



function sectors()
{

myApp.showPreloader();	
var request = createCORSRequest( "post", "http://radio.tekticks.com" );
	if(request)
	{
	$.ajax({
		url:"http://radio.tekticks.com/exhibition/getSectors.php",
		dataType:"json",
		contentType: 'application/json',
		success:function(data)
		{
		//$("#sector").find("div").remove();
		myApp.hidePreloader();
		//to remove div and load it everytime to resolve redundancy
		
		var n=Object.keys(data.sectorsInformation).length;
		
		if(n>0)
		{
		var id = []; // create array here
		$.each(data.sectorsInformation, function (index, sectorsInformation) {
        id.push(sectorsInformation.id); //push values here
		});
		//alert(id);
		//array for company name
		var sectorName = []; // create array here
		$.each(data.sectorsInformation, function (index, sectorsInformation) {
        sectorName.push(sectorsInformation.sectorName); //push values here
		});
		
		var description = []; // create array here
		$.each(data.sectorsInformation, function (index, sectorsInformation) {
        description.push(sectorsInformation.description); //push values here
		});
		
		
		for(var i=0;i<n;i++)
		{ 
			
			/* $('#alphabet').append('<div class="list-block media-list" style="margin:0px 0px"><ul><li><a href="eachExhibitor.html" class="item-link item-content" id="'+id[i]+'" onclick="getEachExhibitor(this)"><div class="item-inner"><div class="item-title-row"><div class="item-title">'+companyName[i]+'</div></div></div></a></li></ul></div>'); */
			
			$('#sector').append('<div class="list-block accordion-list" style="margin:0px 0px" id="ml"><ul><li class="accordion-item"><a href="#" class="item-content item-link" id="'+id[i]+'" onclick="eachSector(this)"><div class="item-inner"><div class="item-title" style="word-wrap:break-word">'+sectorName[i]+'</div></div></a></li></ul></div>');
		}
		}
		else
		{
				myApp.hidePreloader();
			myApp.alert('There are no Sectors','Exhibitors');
		}
		
		}
}
	)};
}

function eachSector(item)
{
//myApp.showPreloader();
var request = createCORSRequest( "post", "http://radio.tekticks.com" );
	if(request)
	{
	var sectorId = $(item).attr("id");	
	var data = {"sectors":[{"sectorId":sectorId}]};
	localStorage.setItem("sectorId", sectorId);
	
	var sendData = function(data)
	{		
		$.ajax({
		url:"http://radio.tekticks.com/exhibition/sectorExhibitors.php",
		type: 'POST',
		dataType:"json",
		data: JSON.stringify(data),
		contentType: 'application/json',
		success:function(response)
		{
			if(JSON.stringify(response.status)==200)
			{
				//myApp.hidePreloader();
				
				
				var selectedExhibitors= JSON.stringify(response[0].news.companyName).replace(/"/g,"");
				alert(selectedExhibitors);
				
				/* var n=Object.keys(data.sectorsInformation).length;
				
				if(n>0)
				{
				
				var exhibitorId = []; // create array here
				$.each(data.sectorsInformation, function (index, sectorsInformation) {
				exhibitorId.push(sectorsInformation.exhibitorId); //push values here
				});
				alert(exhibitorId);
				}
				else
				{
					myApp.hidePreloader();
					alert("no records");	
				} */
				/* var selectedExhibitors= JSON.stringify(response.sectors[0].exhibitorId).replace(/"/g,"");
				alert(selectedExhibitors);	 */
		}
		}
		});
}
sendData(data);	
console.log(data);
}
}

