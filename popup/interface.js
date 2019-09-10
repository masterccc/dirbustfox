// execute the script now so it can listen to the messages sent by the code below
browser.tabs.executeScript(null, { file: "/content_scripts/action.js" });

function checkuncheck(checked){
	n = document.getElementsByTagName('input');
	n = document.querySelectorAll('input[type="checkbox"]');
	for (item of n) {
		item.checked = checked ;
	}
}

document.addEventListener("click", (e) => {
	
	if (e.target.classList.contains("starttest")) {

		scan_obj = [];
		scan_obj.push(document.querySelector('input[name="url"]:checked').value);

		var a = document.getElementsByClassName('itemvalue');

		for(var i = 0; i < a.length ; i++){
			if(a[i].childNodes[0].checked){
				scan_obj.push(a[i].getAttribute('value'));
			}	
		}
		if(scan_obj.length > 0){
			var gettingActiveTab = browser.tabs.query({active: true, currentWindow: true});
			gettingActiveTab.then((tabs) => {
				browser.tabs.sendMessage(tabs[0].id, scan_obj);
			});
		}
	}
	else if(e.target.classList.contains("checkall")){
		checkuncheck(true);
	}
	else if (e.target.classList.contains("uncheck")) {
		checkuncheck(false);
	}
});

function getColorFromCode(val){

	if(val == 200) return "#b9fb98";
	else if(val == 404) return "#fb9898";
	else return "#e4e4e4";	
}

function getDivByValueAndSetColor(val, code){

	var list_div = document.getElementsByClassName('testitem');

	for(var j = 0; j < list_div.length; j++){
		if(list_div[j].getAttribute('value') == val){
			list_div[j].style.backgroundColor = getColorFromCode(code);
		}
	}
}

function dothis(data){

	var a = document.getElementsByClassName('testitem');

	for(var i = 0; i < data.length;i++){
		//console.log("ligne :", i, "/", data.length, data[i][0], data[i][1]);
		getDivByValueAndSetColor(data[i][0], data[i][1]);
	}
}

browser.runtime.onMessage.addListener(dothis);