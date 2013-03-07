// Spin For It
// A spinning decision maker app.


// PrefsPanel Kind

enyo.kind({
	name: "PrefsPanel",
	kind: "FittableRows",
	events: {
		onPrefsPointerChange: "",
		onPrefsDurationChange: ""
	},
	components: [
		{kind: "onyx.Groupbox", classes: "prefs-groupbox", components: [
			{kind: "onyx.GroupboxHeader", content: "Pointer Style"},
			{kind: "onyx.RadioGroup", defaultKind: "onyx.Checkbox", classes: "onyx-sample-tools group", onActivate:"pointerGroupActivated", highlander: true, components: [
				{name: "hand", content: "Hand"},
				{name: "arrow", content: "Arrow"},
				{name: "spinner", content: "Spinner"},
				{name: "bottle", content: "Bottle"}
			]}
		]},
		{kind: "onyx.Groupbox", classes: "prefs-groupbox", components: [
			{kind: "onyx.GroupboxHeader", content: "Spin Duration"},
			{kind: "onyx.RadioGroup", defaultKind: "onyx.Checkbox", classes: "onyx-sample-tools group", onActivate:"durationGroupActivated", highlander: true, components: [
				{name: "short", content: "Short"},
				{name: "normal", content: "Normal"},
				{name: "long", content: "Long"},
				{name: "very_long", content: "Very Long"}
			]}
		]}
	],

	rendered: function() {
		this.inherited(arguments);
		this.$.hand.setChecked(true);
		this.$.normal.setChecked(true);
	},

	pointerGroupActivated: function(inSender, inEvent) {
		console.log(">>>> groupActivated " + inEvent.originator.getName() + " " + inEvent.originator.getActive());
		this.doPrefsPointerChange({pointer: inEvent.originator.getName()});
	},

	durationGroupActivated: function(inSender, inEvent) {
		console.log(">>>> groupActivated " + inEvent.originator.getName() + " " + inEvent.originator.getActive());
		this.doPrefsDurationChange({duration: inEvent.originator.getName()});
	}
});


// DragPanel Kind

enyo.kind({
	name: "DragPanel",
	kind: "FittableRows",
	style: "background-color:#ccc",
	published: {
		title: "",
		dragAnywhere: false
	},
	events: {
		onGrabberTap: ""
	},
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
	},

	prefsPointerChange: function(pointer) {
		this.$.spinner.setPointer(pointer);
	},

	prefsDurationChange: function(duration) {
		this.$.spinner.setDuration(duration);
	}

});


// App kind

enyo.kind({
	name: "App",
	kind: "FittableColumns",
	fit: true,
	components:[
		{kind: "Panels", name:"appPanels", index: 1, narrowFit: false, classes:"enyo-fit", arrangerKind: "CollapsingArranger", components: [
			{kind: "PrefsPanel", onPrefsPointerChange: "prefsPointerChange", onPrefsDurationChange: "prefsDurationChange"},
			{name: "dp", kind: "DragPanel", title: "Spin For It", onGrabberTap: "togglePanel"}
		]}
	],

	create: function() {
		this.inherited(arguments);
	},

	rendered: function() {
		this.inherited(arguments);
	},

	togglePanel: function() {
		this.$.appPanels.setIndex(!this.$.appPanels.index);
	},

	prefsPointerChange: function(inSender, inValue) {
		this.$.dp.prefsPointerChange(inValue.pointer);
	},

	prefsDurationChange: function(inSender, inValue) {
		this.$.dp.prefsDurationChange(inValue.duration);
	}
});

