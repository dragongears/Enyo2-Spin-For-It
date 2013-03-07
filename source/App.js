// Spin For It
// A spinning decision maker app.




// PrefsPanel Kind

enyo.kind({
	name: "PrefsPanel",
	kind: "FittableRows",
	components: [
		{kind: "onyx.Groupbox", classes: "prefs-groupbox", components: [
			{kind: "onyx.GroupboxHeader", content: "Pointer Style"},
			{kind: "onyx.RadioGroup", defaultKind: "onyx.Checkbox", classes: "onyx-sample-tools group", onActivate:"groupActivated", highlander: true, components: [
				{content: "Hand"},
				{content: "Arrow"},
				{content: "Spinner"},
				{content: "Bottle"}
			]}
		]},
		{kind: "onyx.Groupbox", classes: "prefs-groupbox", components: [
			{kind: "onyx.GroupboxHeader", content: "Spin Duration"},
			{kind: "onyx.RadioGroup", defaultKind: "onyx.Checkbox", classes: "onyx-sample-tools group", onActivate:"groupActivated", highlander: true, components: [
				{content: "Short"},
				{content: "Normal"},
				{content: "Long"},
				{content: "Very Long"}
			]}
		]}
	],

	groupActivated: function() {
		console.log(">>>> groupActivated");
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
			{kind: 'Spinner', fit: true, name: 'spinner'}
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
	components:[
		{kind: "Panels", name:"appPanels", index: 1, narrowFit: false, classes:"enyo-fit", arrangerKind: "CollapsingArranger", components: [
			{kind: "PrefsPanel"},
			{kind: "DragPanel", title: "Spin For It", onGrabberTap: "togglePanel"}
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
	}
});

