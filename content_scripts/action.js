function listener(request, sender, sendResponse) {

    const req = new XMLHttpRequest();
    var res = [];

    var base_url = "";

    if(request[0] == "1") base_url += document.location.origin ;
    else if(request[0] == "2") base_url += document.location.href ;
    else if(request[0] == "3"){
        base_url += document.location.href.substring(0,document.location.href.lastIndexOf('/')+1); 
    }
    else {
        base_url += document.location.origin ;
    }

    // first item = use current URL
    for(var i = 1; i < request.length; i++){

        var target = base_url + request[i];
        req.open('HEAD', target, false); 
        req.send(null);
        console.log("check ", target + "..." + req.status);
        res.push( [request[i],req.status]) ;
    }
    
    browser.runtime.sendMessage(res);
    browser.runtime.onMessage.removeListener(listener);

}

/*
Assign listener() as a listener for messages from the extension.
*/
browser.runtime.onMessage.addListener(listener);