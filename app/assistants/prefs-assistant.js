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

function PrefsAssistant() {

}

var selectorsModel2 = {currentHomeStation1: homeStation1, currentHomeStation2: homeStation2};
var tattr = {trueLabel: 'An', trueValue: 'on', falseLabel: 'Aus', falseValue: 'off'};
var tModel = {value: autoLocate, disabled: false};
var tattr2 = {trueLabel: 'An', trueValue: 'on', falseLabel: 'Aus', falseValue: 'off'};
var tModel2 = {value: showMapButton, disabled: false};
var tattr3 = {trueLabel: 'An', trueValue: 'on', falseLabel: 'Aus', falseValue: 'off'};
var tModel3 = {value: showDetailsButton, disabled: false};

PrefsAssistant.prototype.setup = function() {
	this.appMenuModel = {
		visible: true,
		items: []
	};

	this.controller.setupWidget(Mojo.Menu.appMenu, {omitDefaultItems: true}, this.appMenuModel);
	
	this.togglePressed = this.togglePressed.bindAsEventListener(this);
	this.controller.setupWidget('autoLocateToggle', tattr, tModel);
	Mojo.Event.listen(this.controller.get('autoLocateToggle'),Mojo.Event.propertyChange,this.togglePressed);

	this.controller.setupWidget('showMapButtonToggle', tattr2, tModel2);
	Mojo.Event.listen(this.controller.get('showMapButtonToggle'),Mojo.Event.propertyChange,this.togglePressed);

	this.controller.setupWidget('showDetailsButtonToggle', tattr3, tModel3);
	Mojo.Event.listen(this.controller.get('showDetailsButtonToggle'),Mojo.Event.propertyChange,this.togglePressed);

	this.controller.listen('homeStation1Selector', Mojo.Event.propertyChange, this.selectorChanged2.bindAsEventListener(this));
	this.controller.listen('homeStation2Selector', Mojo.Event.propertyChange, this.selectorChanged2.bindAsEventListener(this));
	this.controller.setupWidget('homeStation1Selector', {label: $L('Ziel'), choices: stations, modelProperty:'currentHomeStation1'}, selectorsModel2);
	this.controller.setupWidget('homeStation2Selector', {label: $L('Ziel'), choices: stations, modelProperty:'currentHomeStation2'}, selectorsModel2);
	
	this.controller.listen($('deleteSettings'),Mojo.Event.tap, this.deleteSettingsPressed.bind(this));
}

PrefsAssistant.prototype.selectorChanged2 = function(event) {
	this.savechanges();
}

PrefsAssistant.prototype.togglePressed = function(event){
	this.savechanges();
}

PrefsAssistant.prototype.savechanges = function() {
	var cookie = new Mojo.Model.Cookie("BiBahnPrefs");
	cookie.put({
		homeStation1: selectorsModel2.currentHomeStation1, 
		homeStation2: selectorsModel2.currentHomeStation2, 
		autoLocate: tModel.value,
		showMapButton: tModel2.value,
		showDetailsButton: tModel3.value,
	});
	var BiBahnPrefs = cookie.get();
	homeStation1 = BiBahnPrefs.homeStation1;
	homeStation2 = BiBahnPrefs.homeStation2;
	autoLocate = BiBahnPrefs.autoLocate;
	showMapButton = BiBahnPrefs.showMapButton;
	showDetailsButton = BiBahnPrefs.showDetailsButton;
}

PrefsAssistant.prototype.deleteSettingsPressed = function(event) {
	this.controller.showAlertDialog({
		onChoose: function(value) {this.reallyDelete(value)},
		title: $L("Bestätigung"),
		message: $L("Einstellungen wirklich zurücksetzen?"),
		choices:[
			{label:$L('Ja'), value:"yes", type:'affirmative'},  
			{label:$L("Nein"), value:"no", type:'negative'}    
		]
	});
}

PrefsAssistant.prototype.reallyDelete = function(value){
	if(value == "yes")
	{
		var cookie = new Mojo.Model.Cookie("BiBahnPrefs");
		cookie.remove();

		homeStation1 = "Hauptbahnhof";
		homeStation2 = "Hauptbahnhof";
		homeStation = homeStation1;
		autoLocate = "on";
		showMapButton = "on";
		showDetailsButton = "on";			
		cookie.put({
			homeStation1: "Hauptbahnhof", 
			homeStation2: "Hauptbahnhof", 
			autoLocate: "on",
			showMapButton: "on",
			showDetailsButton: "on"
		});
		
		selectorsModel2.currentHomeStation1 = homeStation1;
		this.controller.modelChanged(selectorsModel2);
		selectorsModel2.currentHomeStation2 = homeStation2;
		this.controller.modelChanged(selectorsModel2);
		tModel.value = autoLocate;
		this.controller.modelChanged(tModel);
		tModel2.value = showMapButton;
		this.controller.modelChanged(tModel2);
		tModel3.value = showDetailsButton;
		this.controller.modelChanged(tModel3);
		
		Mojo.Controller.errorDialog("Die Anwendung muss neugestartet werden, damit die Änderungen angezeigt werden.");
	}
}

PrefsAssistant.prototype.activate = function(event) {

}

PrefsAssistant.prototype.deactivate = function(event) {

}

PrefsAssistant.prototype.cleanup = function(event) {
	Mojo.Event.stopListening(this.controller.get('homeStation1Selector'), Mojo.Event.propertyChange, this.selectorChanged2);
	Mojo.Event.stopListening(this.controller.get('homeStation2Selector'), Mojo.Event.propertyChange, this.selectorChanged2);
	Mojo.Event.stopListening(this.controller.get('autoLocateToggle'),Mojo.Event.propertyChange,this.togglePressed);
	Mojo.Event.stopListening(this.controller.get('showMapButtonToggle'),Mojo.Event.propertyChange,this.togglePressed);
	Mojo.Event.stopListening(this.controller.get('showDetailsButtonToggle'),Mojo.Event.propertyChange,this.togglePressed);
}
