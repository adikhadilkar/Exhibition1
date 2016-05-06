function createCORSRequest(method, url){
    var xhr = new XMLHttpRequest();
	if ("withCredentials" in xhr){
        xhr.open(method, url, true);
	} else if (typeof XDomainRequest != "undefined"){ // if IE use XDR
        xhr = new XDomainRequest();
        xhr.open(method, url);
    } else {
        xhr = null;
    }
    return xhr;

}