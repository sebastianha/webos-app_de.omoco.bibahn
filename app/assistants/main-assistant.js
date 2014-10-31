/*
BiBahn - An application to view the timetable of Bielefeld subway.
Version 1.1.0 (14. Feb 2010)

Copyright (C) 2010 Sebastian Hammerl (E-Mail: bibahn@omoco.de)

This program is free software; you can redistribute it and/or
modify it under the terms of the GNU General Public License as
published by the Free Software Foundation; either version 3 of
the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU
General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program; if not, see <http://www.gnu.org/licenses/>.
*/

function MainAssistant() {

}

var foundTimes = [];
var listModel = {listTitle:$L('Gefundene Zeiten'), items:foundTimes};

var selectorsModel = {currentToStation: homeStation, currentFromStation: "Bitte Station auswählen..."};

MainAssistant.prototype.setup = function() {
	this.appMenuModel = {
		visible: true,
		items: [
			{ label: "Einstellungen", command: 'prefs' },
			{ label: "Aktualisieren", command: 'refreshLocation' },
			{ label: "Netzplan", command: 'overview' },
    		{ label: "Hilfe", command: 'help' },
			{ label: "Über", command: 'about' }
		]
	};

	this.controller.setupWidget(Mojo.Menu.appMenu, {omitDefaultItems: true}, this.appMenuModel);
	
	
	this.controller.setupWidget(
		"foundTimesList",
		this.attributes = {
			itemTemplate: 'main/static-list-entry', listTemplate: 'main/static-list-container', emptyTemplate:'main/emptylist'
		},
		listModel
	);

	this.controller.listen("foundTimesList", Mojo.Event.listTap, this.foundTimesListTapped.bindAsEventListener(this));

	this.controller.setupWidget("drawer", {});

	this.spinnerLAttrs = {spinnerSize: 'large'};
	this.spinnerModel = {spinning: false};
	this.controller.setupWidget('large-activity-spinner', this.spinnerLAttrs, this.spinnerModel);

	this.controller.listen('fromStationSelector', Mojo.Event.propertyChange, this.selectorChanged.bindAsEventListener(this));
	this.controller.listen('toStationSelector', Mojo.Event.propertyChange, this.selectorChanged.bindAsEventListener(this));
	this.controller.setupWidget('fromStationSelector', {label: $L('Start'), choices: stations, modelProperty:'currentFromStation'}, selectorsModel);
	this.controller.setupWidget('toStationSelector', {label: $L('Ziel'), choices: stations, modelProperty:'currentToStation'}, selectorsModel);
	
	this.controller.listen($('map_it_button'),Mojo.Event.tap, this.handleMapButtonPressed.bind(this));
	
	if(showMapButton == "off")
		$('map_it_button').hide();
	
	if(autoLocate == "on")
		this.refreshLocation();
};

MainAssistant.prototype.activate = function(event) {

};

MainAssistant.prototype.deactivate = function(event) {

};

MainAssistant.prototype.cleanup = function(event) {

};

MainAssistant.prototype.handleCommand = function(event){
    if(event.type == Mojo.Event.command) {	
		switch (event.command) {
			case 'prefs':
				Mojo.Controller.stageController.pushScene("prefs");
				break;
			case 'refreshLocation':
				this.refreshLocation();
				break;
			case 'overview':
				Mojo.Controller.stageController.pushScene("overview");
				break;
			case 'help':
				Mojo.Controller.stageController.pushScene("help");
				break;
			case 'about':
				Mojo.Controller.stageController.pushScene("about");
				break;
		}
	}
}

MainAssistant.prototype.foundTimesListTapped = function(event) {
	if (showDetailsButton == "on") {
		var rowID = event.index;
		var drawers = this.controller.document.getElementsByName("drawer");
		drawers[rowID].mojo.toggleState();
	}
}

MainAssistant.prototype.selectorChanged = function(event) {
	this.vrrRequest(selectorsModel.currentFromStation, selectorsModel.currentToStation);
}

MainAssistant.prototype.refreshLocation = function(event) {
	selectorsModel.currentFromStation = "Suche nächste Station...";
	this.controller.modelChanged(selectorsModel);
	
	foundTimes = []
	listModel.items = foundTimes;
	this.controller.modelChanged(listModel);
	this.spinnerModel.spinning = true;
	this.controller.modelChanged(this.spinnerModel);
	
	this.controller.serviceRequest('palm://com.palm.location', {
		method : 'getCurrentPosition',
		parameters: {
			responseTime: 1,
			subscribe: false
		},
		onSuccess: this.handleServiceResponse.bind(this),
		onFailure: this.handleServiceResponseError.bind(this)
	});
};

MainAssistant.prototype.handleServiceResponse = function(event){
	if(event.errorCode != 0)
		Mojo.Controller.errorDialog("Mit der Position ist irgendwas faul...");
	
	var position = [event.longitude, event.latitude];
	this.getNextStation(position);
}

MainAssistant.prototype.handleServiceResponseError = function(event){
	this.spinnerModel.spinning = false;
	this.controller.modelChanged(this.spinnerModel);
	
	Mojo.Controller.errorDialog("Konnte die Position nicht bestimmen.");
}

MainAssistant.prototype.vrrRequest = function(fromStation, toStation) {
	if (fromStation != toStation) {
		foundTimes = []
		listModel.items = foundTimes;
		this.controller.modelChanged(listModel);
		this.spinnerModel.spinning = true;
		this.controller.modelChanged(this.spinnerModel);
		
		
		for (var i = 0; i < stations.length; i++) {
			if (stations[i].label == fromStation) 
				fromStation = stations[i].stationname;
			if (stations[i].label == toStation) 
				toStation = stations[i].stationname;
		}
		
		var url = "http://217.70.161.103/WAP?Sp=&TrID=&Vn=&ANFRAGE=VONNACH_VERIFY&VonOrt=Bielefeld&VonHst=" + fromStation + "&VHTyp=&NachOrt=Bielefeld&NachHst=" + toStation + "&NHTyp=&AnAb=Sofort&Zeit=&Datum=";
		var request = new Ajax.Request(url, {
			method: 'get',
			evalJSON: 'false',
			onSuccess: this.vrrRequestSuccess.bind(this),
			onFailure: this.vrrRequestFailure.bind(this)
		});
	} else {
		foundTimes = []
		listModel.items = foundTimes;
		this.controller.modelChanged(listModel);
		this.spinnerModel.spinning = false;
		this.controller.modelChanged(this.spinnerModel);
	}
};

MainAssistant.prototype.vrrRequestSuccess = function(transport){
	//var time11 = transport.responseText.split("FahrtNr=0\">1.: ");	
	var time11 = transport.responseText.split("1.: ");
	time11 = time11[1].split(" ");
	var time12 = transport.responseText.split("1.: ");
	time12 = time12[1].split(" ab ");
	time12 = time12[1].split(" ");
	line11 = "e";
	line12 = "e";	
	
	if (showDetailsButton == "on") {
		line11 = "n";
		line12 = "n";
		var url1 = transport.responseText.split("href=\"")[1];
		url1 = url1.split("\">")[0];
		url1 = url1.split("#38;");
		url1 = url1[0] + url1[1] + url1[2] + url1[3] + url1[4];
		var request = new Ajax.Request(url1, {
			method: 'get',
			evalJSON: 'false',
			onSuccess: this.vrrDetail1RequestSuccess.bind(this),
			onFailure: this.vrrDetail1RequestFailure.bind(this)
		});
	}

	
	//var time21 = transport.responseText.split("FahrtNr=1\">2.: ");
	var time21 = transport.responseText.split("2.: ");
	time21 = time21[1].split(" ");
	var time22 = transport.responseText.split("2.: ");
	time22 = time22[1].split(" ab ");
	time22 = time22[1].split(" ");
	line21 = "e";
	line22 = "e";

	if (showDetailsButton == "on") {
		line21 = "n";
		line22 = "n";
		var url2 = transport.responseText.split("href=\"")[2];
		url2 = url2.split("\">")[0];
		url2 = url2.split("#38;");
		url2 = url2[0] + url2[1] + url2[2] + url2[3] + url2[4];
		var request = new Ajax.Request(url2, {
			method: 'get',
			evalJSON: 'false',
			onSuccess: this.vrrDetail2RequestSuccess.bind(this),
			onFailure: this.vrrDetail2RequestFailure.bind(this)
		});
	}

	//var time31 = transport.responseText.split("FahrtNr=2\">3.: ");
	var time31 = transport.responseText.split("3.: ");
	time31 = time31[1].split(" ");
	var time32 = transport.responseText.split("3.: ");
	time32 = time32[1].split(" ab ");
	time32 = time32[1].split(" ");
	line31 = "e";
	line32 = "e";

	if (showDetailsButton == "on") {
		line31 = "n";
		line32 = "n";
		var url3 = transport.responseText.split("href=\"")[3];
		url3 = url3.split("\">")[0];
		url3 = url3.split("#38;");
		url3 = url3[0] + url3[1] + url3[2] + url3[3] + url3[4];
		var request = new Ajax.Request(url3, {
			method: 'get',
			evalJSON: 'false',
			onSuccess: this.vrrDetail3RequestSuccess.bind(this),
			onFailure: this.vrrDetail3RequestFailure.bind(this)
		});
	}

	foundTimes = [
		{time1:$L(time11[0]), time2:$L(time12[0]), line1:$L(line11), line2:$L(line12), details:$L("")},
		{time1:$L(time21[0]), time2:$L(time22[0]), line1:$L(line21), line2:$L(line22), details:$L("")},
		{time1:$L(time31[0]), time2:$L(time32[0]), line1:$L(line31), line2:$L(line32), details:$L("")}
	]
	listModel.items = foundTimes;
	this.controller.modelChanged(listModel);
	this.spinnerModel.spinning = false;
	this.controller.modelChanged(this.spinnerModel);
};

MainAssistant.prototype.vrrRequestFailure = function(transport) {
	this.spinnerModel.spinning = false;
	this.controller.modelChanged(this.spinnerModel);
	
	Mojo.Controller.errorDialog("Konnte die Zeiten nicht abfragen.");
};

MainAssistant.prototype.vrrDetail1RequestSuccess = function(transport){
	linieAbfahrt = transport.responseText.split("Stadtbahn ")[1];
	linieAbfahrt = linieAbfahrt.split("<")[0];
	foundTimes[0].line1 = linieAbfahrt;
	
	if (transport.responseText.split("Stadtbahn ").length > 2) {
		linieAnkunft = transport.responseText.split("Stadtbahn ")[2];
		linieAnkunft = linieAnkunft.split("<")[0];
		foundTimes[0].line2 = linieAnkunft;
	} else {
		foundTimes[0].line2 = linieAbfahrt;
	}
	
	if(foundTimes[0].line1 != "1" && foundTimes[0].line1 != "2" && foundTimes[0].line1 != "3" && foundTimes[0].line1 != "4") {
		foundTimes[0].line1 = "f";
	}
	
	if(foundTimes[0].line2 != "1" && foundTimes[0].line2 != "2" && foundTimes[0].line2 != "3" && foundTimes[0].line2 != "4") {
		foundTimes[0].line2 = "f";
	}
	
	foundTimes[0].details = transport.responseText.split("<p>")[1].split("</p>")[0];
	
	listModel.items = foundTimes;
	this.controller.modelChanged(listModel);
};

MainAssistant.prototype.vrrDetail1RequestFailure = function(transport){
	foundTimes[0].line1 = "f";
	foundTimes[0].line2 = "f"
	listModel.items = foundTimes;
	this.controller.modelChanged(listModel);	
};

MainAssistant.prototype.vrrDetail2RequestSuccess = function(transport){
	linieAbfahrt = transport.responseText.split("Stadtbahn ")[1];
	linieAbfahrt = linieAbfahrt.split("<")[0];
	foundTimes[1].line1 = linieAbfahrt;
	
	if (transport.responseText.split("Stadtbahn ").length > 2) {
		linieAnkunft = transport.responseText.split("Stadtbahn ")[2];
		linieAnkunft = linieAnkunft.split("<")[0];
		foundTimes[1].line2 = linieAnkunft;
	} else {
		foundTimes[1].line2 = linieAbfahrt;
	}

	if(foundTimes[1].line1 != "1" && foundTimes[1].line1 != "2" && foundTimes[1].line1 != "3" && foundTimes[1].line1 != "4") {
		foundTimes[1].line1 = "f";
	}
	
	if(foundTimes[1].line2 != "1" && foundTimes[1].line2 != "2" && foundTimes[1].line2 != "3" && foundTimes[1].line2 != "4") {
		foundTimes[1].line2 = "f";
	}
	
	foundTimes[1].details = transport.responseText.split("<p>")[1].split("</p>")[0];
	
	listModel.items = foundTimes;
	this.controller.modelChanged(listModel);
};

MainAssistant.prototype.vrrDetail2RequestFailure = function(transport){
	foundTimes[1].line1 = "f";
	foundTimes[1].line2 = "f"
	listModel.items = foundTimes;
	this.controller.modelChanged(listModel);	
};

MainAssistant.prototype.vrrDetail3RequestSuccess = function(transport){
	linieAbfahrt = transport.responseText.split("Stadtbahn ")[1];
	linieAbfahrt = linieAbfahrt.split("<")[0];
	foundTimes[2].line1 = linieAbfahrt;
	
	if (transport.responseText.split("Stadtbahn ").length > 2) {
		linieAnkunft = transport.responseText.split("Stadtbahn ")[2];
		linieAnkunft = linieAnkunft.split("<")[0];
		foundTimes[2].line2 = linieAnkunft;
	} else {
		foundTimes[2].line2 = linieAbfahrt;
	}
	
	if(foundTimes[2].line1 != "1" && foundTimes[2].line1 != "2" && foundTimes[2].line1 != "3" && foundTimes[2].line1 != "4") {
		foundTimes[2].line1 = "f";
	}
	
	if(foundTimes[2].line2 != "1" && foundTimes[2].line2 != "2" && foundTimes[2].line2 != "3" && foundTimes[2].line2 != "4") {
		foundTimes[2].line2 = "f";
	}
	
	foundTimes[2].details = transport.responseText.split("<p>")[1].split("</p>")[0];
	
	listModel.items = foundTimes;
	this.controller.modelChanged(listModel);
};

MainAssistant.prototype.vrrDetail3RequestFailure = function(transport){
	foundTimes[2].line1 = "f";
	foundTimes[2].line2 = "f"
	listModel.items = foundTimes;
	this.controller.modelChanged(listModel);	

};

MainAssistant.prototype.getNextStation = function(position) {
	var mindistance = 9999;
	var foundStation = 0;
	
	for (var i = 0; i < stations.length; i++) {
		var tmpdist = Math.sqrt(Math.pow((stations[i].gpslong - position[0]),2) + Math.pow((stations[i].gpslat - position[1]),2));
		if(tmpdist < mindistance) {
			mindistance = tmpdist;
			foundStation = i;
		}
	}
	
	selectorsModel.currentFromStation = stations[foundStation].name;
	this.controller.modelChanged(selectorsModel);
	this.spinnerModel.spinning = false;
	this.controller.modelChanged(this.spinnerModel);
	
	this.vrrRequest(selectorsModel.currentFromStation, selectorsModel.currentToStation);
};

MainAssistant.prototype.handleMapButtonPressed = function(event) {
	for (var i = 0; i < stations.length; i++) {
		if (stations[i].label == selectorsModel.currentFromStation) {
			latitude = stations[i].gpslat;
			longitude = stations[i].gpslong;
		}
	}
	
	this.controller.serviceRequest('palm://com.palm.applicationManager', {
	method: 'launch',
	parameters: {
		id:"com.palm.app.maps",
		params:{"query":+latitude+","+longitude}
		}
	});
};