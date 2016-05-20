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
			
			$('#alphabet').append('<div class="list-block media-list" style="margin:0px 0px" ><ul><li><a href="exhibitorProfile2.html" class="item-link item-content" id="'+id[i]+'" onclick="getEachExhibitor(this)"><div class="item-media"><img src="'+link[i]+'" width="100"></div><div class="item-inner"><div class="item-title-row"><div class="item-title"><b>'+companyName[i]+'</b></div><div class="item-after"></div></div><div class="item-subtitle">'+sectorName[i]+'</div><div class="item-text">'+description[i]+'</div></div></a></li></ul></div>');
			
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



function getEachExhibitor(item)
{
	myApp.showPreloader();
	var request = createCORSRequest( "post", "http://radio.tekticks.com" );
	if(request)
	{
	var exhibitorId = $(item).attr("id");	
	var data = {"exhibitor":[{"exhibitorId":exhibitorId}]};
	localStorage.setItem("exhibitorId", exhibitorId);
	
	var sendData = function(data)
	{		
		$.ajax({
		url:"http://radio.tekticks.com/exhibition/exhibitorDetails.php",
		type: 'POST',
		dataType:"json",
		data: JSON.stringify(data),
		contentType: 'application/json',
		success:function(response)
		{
			if(JSON.stringify(response.status)==200)
			{
				var id= JSON.stringify(response.exhibitorsDetails[0].id).replace(/"/g,"");
				var about= JSON.stringify(response.exhibitorsDetails[0].about).replace(/"/g,"");
				var primEmail= JSON.stringify(response.exhibitorsDetails[0].primEmail).replace(/"/g,"");
				var secEmail= JSON.stringify(response.exhibitorsDetails[0].secEmail).replace(/"/g,"");
				var primContact= JSON.stringify(response.exhibitorsDetails[0].primContact).replace(/"/g,"");
				var secContact= JSON.stringify(response.exhibitorsDetails[0].secContact).replace(/"/g,"");
				var website= JSON.stringify(response.exhibitorsDetails[0].website).replace(/"/g,"");
				var companyName= JSON.stringify(response.exhibitorsDetails[0].companyName).replace(/"/g,"");
				var mobileNo= JSON.stringify(response.exhibitorsDetails[0].mobileNo).replace(/"/g,"");
				var address1= JSON.stringify(response.exhibitorsDetails[0].address1).replace(/"/g,"");
				var address2= JSON.stringify(response.exhibitorsDetails[0].address2).replace(/"/g,"");
				var landmark= JSON.stringify(response.exhibitorsDetails[0].landmark).replace(/"/g,"");
				var pincode= JSON.stringify(response.exhibitorsDetails[0].pincode).replace(/"/g,"");
				var maplink= JSON.stringify(response.exhibitorsDetails[0].maplink).replace(/"/g,"");
				var link= JSON.stringify(response.exhibitorsDetails[0].link).replace(/"/g,"");
				
				localStorage.setItem("about", about);
				localStorage.setItem("primEmail", primEmail);
				localStorage.setItem("secEmail", secEmail);
				localStorage.setItem("primContact", primContact);
				localStorage.setItem("secContact", secContact);
				localStorage.setItem("website", website);
				localStorage.setItem("companyName", companyName);
				localStorage.setItem("mobileNo", mobileNo);
				localStorage.setItem("address1", address1);
				localStorage.setItem("address2", address2);
				localStorage.setItem("landmark", landmark);
				localStorage.setItem("pincode", pincode);
				localStorage.setItem("maplink", maplink);
				localStorage.setItem("link", link);
				myApp.hidePreloader();
				
				initialize5();
				
			}	
		
		}
		});
}
sendData(data);	
console.log(data);
}
}



 function initialize5()
{		
	var show = document.getElementById('exhibitorProfile');
	//alert(show);
    show.style.visibility = 'visible';
	
	var about = localStorage.getItem("about"); 
	//alert(about);
	var primEmail = localStorage.getItem("primEmail"); 
	var secEmail= localStorage.getItem("secEmail");
	var primContact = localStorage.getItem("primContact");
	var secContact = localStorage.getItem("secContact");
	var website = localStorage.getItem("website");
	var companyName = localStorage.getItem("companyName");
	var mobileNo = localStorage.getItem("mobileNo");
	var address1 = localStorage.getItem("address1");
	var address2 = localStorage.getItem("address2");
	//alert(address2);
	var landmark = localStorage.getItem("landmark");
	var pincode = localStorage.getItem("pincode");
	var maplink = localStorage.getItem("maplink");
	var link = localStorage.getItem("link");
	
	if(about.replace(/\s/g,"") == "")
	{
	
		$("#about").fadeOut();
	}
	else
	{
	    $("#about").fadeIn();
		$("#about").text(about);
          		  
	}
	
	if(primEmail.replace(/\s/g,"") == "")
	{
	
		$("#primEmail").fadeOut();
	}
	else
	{
	    $("#primEmail").fadeIn();
		$("#primEmail").text(primEmail);
          		  
	}
	
	if(secEmail.replace(/\s/g,"") == "")
	{
	
		$("#secEmail").fadeOut();
	}
	else
	{
	    $("#secEmail").fadeIn();
		$("#secEmail").text(secEmail);
          		  
	}
	
	if(primContact.replace(/\s/g,"") == "")
	{
	
		$("#primContact").fadeOut();
	}
	else
	{
	    $("#primContact").fadeIn();
		$("#primContact").text(primContact);
          		  
	}
	
	if(secContact.replace(/\s/g,"") == "")
	{
	
		$("#secContact").fadeOut();
	}
	else
	{
	    $("#secContact").fadeIn();
		$("#secContact").text(secContact);
          		  
	}
	
	if(website.replace(/\s/g,"") == "")
	{
	
		$("#website").fadeOut();
	}
	else
	{
	    $("#website").fadeIn();
		$("#website").text(website);
          		  
	}
	
	
	if(link.replace(/\s/g,"") == "")
	{
	
		$("#link").fadeOut();
	}
	else
	{
	    $("#link").fadeIn();
		$("#link").attr("src",link);    		  
	}

	if(maplink.replace(/\s/g,"") == "")
	{
	
		$("#maplink").fadeOut();
	}
	else
	{
	    $("#maplink").fadeIn();
		$("#maplink").attr("src",maplink);    		  
	}

	if(companyName.replace(/\s/g,"") == "")
	{
	
		$("#companyName").fadeOut();
		$("#company").fadeOut();
		$("#company1").fadeOut();
	}
	else
	{
	    $("#companyName").fadeIn();
		$("#company").fadeIn();
		$("#company1").fadeIn();
		$("#companyName").text(companyName);
		$("#company").text(companyName);
        $("#company1").text(companyName);		  
	}
	
	if(mobileNo.replace(/\s/g,"") == "")
	{
	
		$("#mobileNo").fadeOut();
	}
	else
	{
	    $("#mobileNo").fadeIn();
		$("#mobileNo").text(mobileNo);
          		  
	}
	
	if(address1.replace(/\s/g,"") == "")
	{
	
		$("#address1").fadeOut();
	}
	else
	{
	    $("#address1").fadeIn();
		$("#address1").text(address1);
          		  
	}
	
	if(address2.replace(/\s/g,"") == "")
	{
	
		$("#address2").fadeOut();
		$("#address21").fadeOut();
	}
	else
	{
	    $("#address2").fadeIn();
		$("#address21").fadeIn();
		$("#address2").text(address2);
		$("#address21").text(address2);
          		  
	}
	
	if(landmark.replace(/\s/g,"") == "")
	{
	
		$("#landmark").fadeOut();
	}
	else
	{
	    $("#landmark").fadeIn();
		$("#landmark").text(landmark);
          		  
	}
	
	if(pincode.replace(/\s/g,"") == "")
	{
	
		$("#pincode").fadeOut();
	}
	else
	{
	    $("#pincode").fadeIn();
		$("#pincode").text(pincode);
          		  
	}
	
	
		
	
} 




function sectors()
{
$("#pclose").fadeOut();
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
		$("#sector").find("div").remove();
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
			
			 $('#sector').append('<div class="list-block accordion-list" style="margin:0px 0px" id="ml"><ul><li class="accordion-item"><a href="#" class="item-content item-link open-popup" data-popup=".demo-rateus" id="'+id[i]+'" onclick="eachSector(this)"><div class="item-inner"><div class="item-title" style="word-wrap:break-word">'+sectorName[i]+'</div></div></a></li></ul></div>'); 
			
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


//to fetch exhibitors within a particular sector
function eachSector(item)
{
myApp.showPreloader();
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
				myApp.hidePreloader();
				$("#pclose").fadeIn();
				$("#sectorContent").find("div").remove();
				var id=[];
				var companyName=[];
				var about=[];
				var logolink=[];
				
				for(var i=0;i<response.secExhibitorInformation.length;i++)
				{
					id[i]= JSON.stringify(response.secExhibitorInformation[i].id).replace(/"/g,"");
					companyName[i]= JSON.stringify(response.secExhibitorInformation[i].companyName).replace(/"/g,"");
					about[i]= JSON.stringify(response.secExhibitorInformation[i].about).replace(/"/g,"");
					logolink[i]= JSON.stringify(response.secExhibitorInformation[i].link).replace(/"/g,"");
				}
				

				
				for(var j=0;j<response.secExhibitorInformation.length;j++)
				{ 

				$('#sectorContent').append('<div class="list-block media-list" style="margin:0px 0px" ><ul><li><a href="exhibitorProfile2.html" class="item-link item-content" id="'+id[j]+'" onclick="getEachExhibitor(this)"><div class="item-media"><img src="'+logolink[j]+'" width="100"></div><div class="item-inner"><div class="item-title-row"><div class="item-title"><b>'+companyName[j]+'</b></div><div class="item-after"></div></div><div class="item-text" style="text-align:left">'+about[j]+'</div></div></a></li></ul></div>');
				} 
				
			}	
		
		}
		});
}
sendData(data);	
console.log(data);
}
}

function getData(value)
{
	//myApp.showPreloader();
	var request = createCORSRequest( "post", "http://radio.tekticks.com" );
	if(request)
	{
	var keyword = document.getElementById('search').value;	
	var data = {"search":[{"keyword":keyword}]};
	var sendData = function(data)
	{		
		$.ajax({
		url:"http://radio.tekticks.com/exhibition/liveSearch.php",
		type: 'POST',
		dataType:"json",
		data: JSON.stringify(data),
		contentType: 'application/json',
		success:function(response)
		{
			if(JSON.stringify(response.status)==200)
			{
				$("#alphabet").find("div").remove();
				$("#search").fadeIn();
				var id=[];
				var companyName=[];
				var sectorName=[];
				var logolink=[];
				var description=[];
				
				for(var i=0;i<response.searchedInformation.length;i++)
				{
					id[i]= JSON.stringify(response.searchedInformation[i].id).replace(/"/g,"");
					companyName[i]= JSON.stringify(response.searchedInformation[i].companyName).replace(/"/g,"");
					sectorName[i]= JSON.stringify(response.searchedInformation[i].sectorName).replace(/"/g,"");
					logolink[i]= JSON.stringify(response.searchedInformation[i].link).replace(/"/g,"");
					description[i]= JSON.stringify(response.searchedInformation[i].description).replace(/"/g,"");
					
				}
				
				for(var j=0;j<response.searchedInformation.length;j++)
				{ 
				$('#alphabet').append('<div class="list-block media-list" style="margin:0px 0px" ><ul><li><a href="exhibitorProfile2.html" class="item-link item-content" id="'+id[j]+'" onclick="getEachExhibitor(this)"><div class="item-media"><img src="'+logolink[j]+'" width="100"></div><div class="item-inner"><div class="item-title-row"><div class="item-title"><b>'+companyName[j]+'</b></div><div class="item-after"></div></div><div class="item-subtitle">'+sectorName[j]+'</div><div class="item-text">'+description[j]+'</div></div></a></li></ul></div>');
				}
				
				
		/*  var m=Object.keys(data.searchedInformation).length;
		alert(m);
		if(m>0)
		{
		var id = []; // create array here
		$.each(data.searchedInformation, function (index, searchedInformation) {
        id.push(searchedInformation.id); //push values here
		});
		alert(id);
		//array for company name
		var companyName = []; // create array here
		$.each(data.searchedInformation, function (index, searchedInformation) {
        companyName.push(searchedInformation.companyName); //push values here
		});
		//companyName.sort();
		alert(companyName);
		
		var link = []; // create array here
		$.each(data.searchedInformation, function (index, searchedInformation) {
        link.push(searchedInformation.link); //push values here
		});
		
		var sectorName = []; // create array here
		$.each(data.searchedInformation, function (index, searchedInformation) {
        sectorName.push(searchedInformation.sectorName); //push values here
		});
		
		var description = []; // create array here
		$.each(data.searchedInformation, function (index, searchedInformation) {
        description.push(searchedInformation.description); //push values here
		});
		
		for(var i=0;i<n;i++)
		{ 
			$('#alphabet').append('<div class="list-block media-list" style="margin:0px 0px" ><ul><li><a href="exhibitorProfile2.html" class="item-link item-content" id="'+id[i]+'" onclick="getEachExhibitor(this)"><div class="item-media"><img src="'+link[i]+'" width="100"></div><div class="item-inner"><div class="item-title-row"><div class="item-title"><b>'+companyName[i]+'</b></div><div class="item-after"></div></div><div class="item-subtitle">'+sectorName[i]+'</div><div class="item-text">'+description[i]+'</div></div></a></li></ul></div>');
			
		}
		}
		else
		{
				
			myApp.alert('There are no more Exhibitors for you.','Exhibitors');
		} */
				
				
				
			}	
		
		}
		});
}
sendData(data);	
console.log(data);
}
	
	
}
