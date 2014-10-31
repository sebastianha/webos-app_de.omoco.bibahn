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

var stations = [];

stations.push({stationname:"Adenauerplatz", label:$L("Adenauerplatz"), value:"Adenauerplatz", name:"Adenauerplatz", gpslong:8.52545500000001, gpslat:52.0172125});
stations.push({stationname:"Auf der Hufe", label:$L("Auf der Hufe"), value:"Auf der Hufe", name:"Auf der Hufe", gpslong:8.52301959999998, gpslat:52.0412864});
stations.push({stationname:"23005052", label:$L("August-Bebel-Straße"), value:"August-Bebel-Straße", name:"August-Bebel-Straße", gpslong:8.5363984, gpslat:52.0127422});
stations.push({stationname:"23005053", label:$L("August-Schroeder-Straße"), value:"August-Schroeder-Straße", name:"August-Schroeder-Straße", gpslong:8.53905920000001, gpslat:52.0197413});
stations.push({stationname:"23005520", label:$L("Babenhausen Süd"), value:"Babenhausen Süd", name:"Babenhausen Süd", gpslong:8.51843830000002, gpslat:52.0554461});
stations.push({stationname:"23005460", label:$L("Baumheide"), value:"Baumheide", name:"Baumheide", gpslong:8.59548209999999, gpslat:52.0499569});
stations.push({stationname:"Beckhausstraße", label:$L("Beckhausstraße"), value:"Beckhausstraße", name:"Beckhausstraße", gpslong:8.543694, gpslat:52.0334524});
stations.push({stationname:"23005083", label:$L("Bethel"), value:"Bethel", name:"Bethel", gpslong:8.52112050000001, gpslat:52.0130129});
stations.push({stationname:"Brackwede", label:$L("Brackwede"), value:"Brackwede", name:"Brackwede Bahnhof", gpslong:8.50190520000001, gpslat:51.9981594});
stations.push({stationname:"Brackwede Kirche", label:$L("Brackwede Kirche"), value:"Brackwede Kirche", name:"Brackwede Kirche", gpslong:8.5148871, gpslat:51.9877543});
stations.push({stationname:"Bueltmannshof", label:$L("Bültmannshof"), value:"Bültmannshof", name:"Bültmannshof", gpslong:8.50444260000001, gpslat:52.0358648});
stations.push({stationname:"Deciusstraße", label:$L("Deciusstraße"), value:"Deciusstraße", name:"Deciusstraße", gpslong:8.54401590000002, gpslat:52.0463213});
stations.push({stationname:"Eggeweg", label:$L("Eggeweg"), value:"Eggeweg", name:"Eggeweg", gpslong:8.51037030000002, gpslat:52.0056429});
stations.push({stationname:"Elpke", label:$L("Elpke"), value:"Elpke", name:"Elpke", gpslong:8.57722159999998, gpslat:52.0047975});
stations.push({stationname:"Finkenstraße", label:$L("Finkenstraße"), value:"Finkenstraße", name:"Finkenstraße", gpslong:8.5644329, gpslat:52.0381648});
stations.push({stationname:"Friedrich-List-Straße", label:$L("Friedrich-List-Straße"), value:"Friedrich-List-Straße", name:"Friedrich-List-Straße", gpslong:8.51765510000001, gpslat:52.0100941});
stations.push({stationname:"Gaswerkstraße", label:$L("Gaswerkstraße"), value:"Gaswerkstraße", name:"Gaswerkstraße", gpslong:8.50641129999999, gpslat:51.9942619});
stations.push({stationname:"Gesamtschule Stieghorst", label:$L("Gesamtschule Stieghorst"), value:"Gesamtschule Stieghorst", name:"Gesamtschule Stieghorst", gpslong:8.5851502, gpslat:52.0019508});
stations.push({stationname:"Graf-von-Stauffenberg-Straße", label:$L("Graf-von-Stauffenberg-Straße"), value:"Graf-von-Stauffenberg-Straße", name:"Graf-von-Stauffenberg-Straße", gpslong:8.5089755, gpslat:52.0329607});
stations.push({stationname:"Hartlager Weg", label:$L("Hartlager Weg"), value:"Hartlager Weg", name:"Hartlager Weg", gpslong:8.55665450000001, gpslat:52.0133431});
stations.push({stationname:"Hauptbahnhof", label:$L("Hauptbahnhof"), value:"Hauptbahnhof", name:"Hauptbahnhof", gpslong:8.53369470000003, gpslat:52.0289837});
stations.push({stationname:"Heidegaerten", label:$L("Heidegärten"), value:"Heidegärten", name:"Heidegärten", gpslong:8.5452175, gpslat:52.052563});
stations.push({stationname:"Jahnplatz", label:$L("Jahnplatz"), value:"Jahnplatz", name:"Jahnplatz", gpslong:8.53351240000002, gpslat:52.0233857});
stations.push({stationname:"23005274", label:$L("Johannesstift"), value:"Johannesstift", name:"Johannesstift", gpslong:8.54334000000001, gpslat:52.0406924});
stations.push({stationname:"23005284", label:$L("Kattenkamp"), value:"Kattenkamp", name:"Kattenkamp", gpslong:8.54396220000001, gpslat:52.0493103});
stations.push({stationname:"23005304", label:$L("Koblenzer Straße"), value:"Koblenzer Straße", name:"Koblenzer Straße", gpslong:8.52171059999999, gpslat:52.0494423});
stations.push({stationname:"Krankenhaus Mitte", label:$L("Krankenhaus Mitte"), value:"Krankenhaus Mitte", name:"Krankenhaus Mitte", gpslong:8.54586119999998, gpslat:52.0155948});
stations.push({stationname:"Landgericht", label:$L("Landgericht"), value:"Landgericht", name:"Landgericht", gpslong:8.53340510000001, gpslat:52.0175954});
stations.push({stationname:"23005329", label:$L("Lange Straße"), value:"Lange Straße", name:"Lange Straße", gpslong:8.52256890000002, gpslat:52.0451798});
stations.push({stationname:"23005341", label:$L("Lohmannshof"), value:"Lohmannshof", name:"Lohmannshof", gpslong:8.48522190000001, gpslat:52.0453051});
stations.push({stationname:"Luther-Kirche", label:$L("Luther-Kirche"), value:"Luther-Kirche", name:"Luther-Kirche", gpslong:8.56259819999999, gpslat:52.0087601});
stations.push({stationname:"23005364", label:$L("Milse"), value:"Milse", name:"Milse", gpslong:8.61110330000001, gpslat:52.05792});
stations.push({stationname:"Mozartstraße", label:$L("Mozartstraße"), value:"Mozartstraße", name:"Mozartstraße", gpslong:8.54285720000003, gpslat:52.0086809});
stations.push({stationname:"Nordpark", label:$L("Nordpark"), value:"Nordpark", name:"Nordpark", gpslong:8.52353450000002, gpslat:52.038145});
stations.push({stationname:"Normannenstraße", label:$L("Normannenstraße"), value:"Normannenstraße", name:"Normannenstraße", gpslong:8.51055259999999, gpslat:51.9909653});
stations.push({stationname:"Oststraße", label:$L("Oststraße"), value:"Oststraße", name:"Oststraße", gpslong:8.55140810000002, gpslat:52.0142345});
stations.push({stationname:"Prießallee", label:$L("Prießallee"), value:"Prießallee", name:"Prießallee", gpslong:8.5482323, gpslat:52.0066005});
stations.push({stationname:"Rathaus", label:$L("Rathaus"), value:"Rathaus", name:"Rathaus", gpslong:8.53455309999999, gpslat:52.0205336});
stations.push({stationname:"23005466", label:$L("Ravensberger Straße"), value:"Ravensberger Straße", name:"Ravensberger Straße", gpslong:8.53970289999999, gpslat:52.0177869});
stations.push({stationname:"Roggenkamp", label:$L("Roggenkamp"), value:"Roggenkamp", name:"Roggenkamp", gpslong:8.57008699999999, gpslat:52.0075846});
stations.push({stationname:"23005470", label:$L("Rosenhöhe"), value:"Rosenhöhe", name:"Rosenhöhe", gpslong:8.52627039999997, gpslat:51.9832018});
stations.push({stationname:"Rudolf-Oetker-Halle", label:$L("Rudolf-Oetker-Halle"), value:"Rudolf-Oetker-Halle", name:"Rudolf-Oetker-Halle", gpslong:8.5132027, gpslat:52.0292279});
stations.push({stationname:"Schelpmilser Weg", label:$L("Schelpmilser Weg"), value:"Schelpmilser Weg", name:"Schelpmilser Weg", gpslong:8.60292789999999, gpslat:52.0529721});
stations.push({stationname:"23005040", label:$L("Schildesche"), value:"Schildesche", name:"Schildesche", gpslong:8.54544279999997, gpslat:52.0558617});
stations.push({stationname:"Schillerstraße", label:$L("Schillerstraße"), value:"Schillerstraße", name:"Schillerstraße", gpslong:8.5592508, gpslat:52.0369967});
stations.push({stationname:"Schueco", label:$L("Schüco"), value:"Schüco", name:"Schüco", gpslong:8.57649209999998, gpslat:52.0430879});
stations.push({stationname:"23005502", label:$L("Seidenstickerstraße"), value:"Seidenstickerstraße", name:"Seidenstickerstraße", gpslong:8.5895276, gpslat:52.048347});
stations.push({stationname:"23005505", label:$L("Sennefriedhof"), value:"Sennefriedhof", name:"Sennefriedhof", gpslong:8.52953199999997, gpslat:51.980737});
stations.push({stationname:"23005503", label:$L("Senne"), value:"Senne", name:"Senne", gpslong:8.53412390000001, gpslat:51.9789594});
stations.push({stationname:"Siegfriedplatz", label:$L("Siegfriedplatz"), value:"Siegfriedplatz", name:"Siegfriedplatz", gpslong:8.52247239999999, gpslat:52.0278219});
stations.push({stationname:"23005081", label:$L("Sieker"), value:"Sieker", name:"Sieker", gpslong:8.55872509999999, gpslat:52.0045597});
stations.push({stationname:"23005394", label:$L("Sieker Mitte"), value:"Sieker Mitte", name:"Sieker Mitte", gpslong:8.56259819999999, gpslat:52.0126497});
stations.push({stationname:"23005523", label:$L("Stadtheider Straße"), value:"Stadtheider Straße", name:"Stadtheider Straße", gpslong:8.55426190000001, gpslat:52.0359011});
stations.push({stationname:"Stieghorst Zentrum", label:$L("Stieghorst Zentrum"), value:"Stieghorst Zentrum", name:"Stieghorst Zentrum", gpslong:8.58934519999998, gpslat:52.0010922});
stations.push({stationname:"Sudbrackstraße", label:$L("Sudbrackstraße"), value:"Sudbrackstraße", name:"Sudbrackstraße", gpslong:8.53866220000001, gpslat:52.0359539});
stations.push({stationname:"23005545", label:$L("Teutoburger Straße"), value:"Teutoburger Straße", name:"Teutoburger Straße", gpslong:8.53954200000003, gpslat:52.0107149});
stations.push({stationname:"Universitaet", label:$L("Universität"), value:"Universität", name:"Universität", gpslong:8.4969914, gpslat:52.0395111});
stations.push({stationname:"23005179", label:$L("Voltmannstraße"), value:"Voltmannstraße", name:"Voltmannstraße", gpslong:8.51966139999998, gpslat:52.0529094});
stations.push({stationname:"23005594", label:$L("Wellensiek"), value:"Wellensiek", name:"Wellensiek", gpslong:8.48969579999999, gpslat:52.0427778});
stations.push({stationname:"Windelsbleicher Straße", label:$L("Windelsbleicher Straße"), value:"Windelsbleicher Straße", name:"Windelsbleicher Straße", gpslong:8.51954340000001, gpslat:51.985303});
stations.push({stationname:"Wittekindstraße", label:$L("Wittekindstraße"), value:"Wittekindstraße", name:"Wittekindstraße", gpslong:8.52593779999999, gpslat:52.0326273});
stations.push({stationname:"23005614", label:$L("Ziegelstraße"), value:"Ziegelstraße", name:"Ziegelstraße", gpslong:8.56950760000002, gpslat:52.0393066});

var homeStation = "";
var homeStation1 = "";
var homeStation2 = "";
var autoLocate = "";
var showMapButton = "";
var showDetailsButton = "";

function StageAssistant() {
}

StageAssistant.prototype.setup = function() {
	var cookie = new Mojo.Model.Cookie("BiBahnPrefs");
	var BiBahnPrefs = cookie.get();
	if(BiBahnPrefs != null)	{
		homeStation1 = BiBahnPrefs.homeStation1;
		homeStation2 = BiBahnPrefs.homeStation2;
		//homeStation = homeStation1;
		var d = new Date();
		var curr_hour = d.getHours();
		if(curr_hour < 12)
			homeStation = homeStation1;
		else
			homeStation = homeStation2;
		autoLocate = BiBahnPrefs.autoLocate;
		showMapButton = BiBahnPrefs.showMapButton;
		
		if(BiBahnPrefs.showDetailsButton != null)
			showDetailsButton = BiBahnPrefs.showDetailsButton;
		else
			showDetailsButton = "on";
	}
	else {
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
	}
	
	this.controller.pushScene("main");
}



var feedList = [];

