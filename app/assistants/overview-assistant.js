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

function OverviewAssistant() {
	
}

OverviewAssistant.prototype.setup = function() {
	this.appMenuModel = {
		visible: true,
		items: []
	};

	this.controller.setupWidget(Mojo.Menu.appMenu, {omitDefaultItems: true}, this.appMenuModel);


	var attributes = {
    };
	this.model = {
	}
	
	this.controller.setupWidget('ImageId', attributes, this.model);
	this.myPhotoDivElement = $('ImageId');
}

OverviewAssistant.prototype.activate = function(event) {
	this.controller.enableFullScreenMode(true);
	
	this.myPhotoDivElement.mojo.manualSize(320,480);
	this.myPhotoDivElement.mojo.centerUrlProvided('images/liniennetz.jpg');
}

OverviewAssistant.prototype.deactivate = function(event) {

}

OverviewAssistant.prototype.cleanup = function(event) {
	this.controller.enableFullScreenMode(false);
}
