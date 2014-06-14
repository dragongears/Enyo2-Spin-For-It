//
// Spin For It
// A spinning decision maker app.
// Copyright 2012-2013 Arthur J. Dahm III
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//


// DragPanel Kind

enyo.kind({
	name: "DragPanel",
	kind: "FittableRows",
	style: "background-color:#ccc",
	published: {
		title: "",
		dragAnywhere: false,
		duration: "normal",
		pointer: "hand"
	},
	events: {
		onGrabberTap: ""
	},
	bindings: [
		{from: ".pointer", to: ".$.spinner.pointer"},
		{from: ".duration", to: ".$.spinner.duration"}
	],
	components: [
		{name: "toolbar", kind: "onyx.Toolbar", components: [
			{name: "grabber", kind: "onyx.Grabber", ontap: "grabberTapped"},
			{name: "title"}
		]},
		{kind: "FittableRows", fit: true, ondragstart: "dragStart", components: [
			{name: 'spinner', kind: 'Spinner', fit: true}
		]}
	],

	create: function() {
		this.inherited(arguments);
		this.titleChanged();
	},

	titleChanged: function() {
		this.$.title.setContent(this.title);
	},

	dragStart: function() {
		return !this.dragAnywhere
	},

	grabberTapped: function() {
		this.doGrabberTap();
	}

});


// App kind

enyo.kind({
	name: "App",
	kind: "FittableColumns",
	fit: true,
	published: {
		pointer: "hand",
		duration: "normal"
	},
	components:[
		{kind: "Signals", ondeviceready: "deviceready"},
		{name: "test", content: "Test"},
		{kind: "Panels", name:"appPanels", index: 1, narrowFit: false, classes:"enyo-fit", arrangerKind: "CollapsingArranger", components: [
			{name: "pp", kind: "PrefsPanel", onPrefsPointerChange: "prefsPointerChange", onPrefsDurationChange: "prefsDurationChange"},
			{name: "dp", kind: "DragPanel", title: "Spin For It", onGrabberTap: "togglePanel"}
		]}
	],

	bindings: [
		{from: ".$.pp.pointer", to: ".pointer"},
		{from: ".$.pp.duration", to: ".duration"},
		{from: ".pointer", to: ".$.dp.pointer"},
		{from: ".duration", to: ".$.dp.duration"}
	],

	deviceready: function() {
		navigator.splashscreen.hide();
	},

	create: function() {
		this.inherited(arguments);
	},

	rendered: function() {
		this.inherited(arguments);
	},

	togglePanel: function() {
		this.$.appPanels.setIndex(!this.$.appPanels.index);
	}
});

