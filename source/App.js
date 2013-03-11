// Spin For It
// A spinning decision maker app.


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

