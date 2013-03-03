// Spin For It
// A spinning decision maker app.


// Spinner kind

enyo.kind({
	name: "Spinner",
	kind: "enyo.Control",
	handlers: {'ontap': 'spin'},
	style: "width:100%; text-align:center",
	components: [
		{name: 'pointer', style: "-webkit-transform:translateZ(0);-o-transform:translateZ(0);-moz-transform:translateZ(0);transform:translateZ(0);", kind: enyo.Image, src: "assets/hand_512.png"},
		{name: "animator", kind: enyo.Animator, duration: 5000, onStep: "stepAnimation"}
	],

	stepAnimation: function(inSender, inValue) {
		enyo.dom.transform(this.$.pointer, {rotate: (inSender.value % 360) + 'deg'});
//		this.$.pointer.setStyle('-webkit-transform: rotate('+ (inSender.value % 360) +'deg)');
	},

	spin: function() {
		this.$.animator.play({startValue: 0, endValue: (3600) + (Math.floor(Math.random() * 360)), easingFunction: enyo.easing.cubicOut});
	},

	resizePointer: function() {
		var min = Math.min(this.hasNode().clientWidth *.70, this.hasNode().clientHeight *.70, 512);
		this.$.pointer.applyStyle("width", min+"px");
		this.$.pointer.applyStyle("margin-top", this.hasNode().clientHeight/2-min/2+"px");
	},

	rendered: function() {
		this.inherited(arguments);
		this.resizePointer();
		var self = this;
		setTimeout(function() {
			self.spin();
		}, 2000);
	},

	resizeHandler: function(){
		this.inherited(arguments);
		this.resizePointer();
		}
});


// PrefsPanel Kind

enyo.kind({
	name: "PrefsPanel",
	kind: "FittableRows",
	components: [
		{kind: "onyx.Groupbox", classes: "prefs-groupbox", components: [
			{kind: "onyx.GroupboxHeader", content: "Pointer Style"},
			{kind: "Group", classes: "onyx-sample-tools group", onActivate:"groupActivated", highlander: true, components: [
				{kind:"onyx.Checkbox", checked: true},
				{content: "Hand", classes:"enyo-inline"},
				{tag:"br"},
				{kind:"onyx.Checkbox"},
				{content: "Arrow", classes:"enyo-inline"},
				{tag:"br"},
				{kind:"onyx.Checkbox"},
				{content: "Spinner", classes:"enyo-inline"},
				{tag:"br"},
				{kind:"onyx.Checkbox"},
				{content: "Bottle", classes:"enyo-inline"}
			]}
		]},
		{kind: "onyx.Groupbox", classes: "prefs-groupbox", components: [
			{kind: "onyx.GroupboxHeader", content: "Spin Duration"},
			{kind: "Group", classes: "onyx-sample-tools group", onActivate:"groupActivated", highlander: true, components: [
				{kind:"onyx.Checkbox", checked: true},
				{content:"Slow", classes:"enyo-inline"},
				{tag:"br"},
				{kind:"onyx.Checkbox"},
				{content:"Normal", classes:"enyo-inline"},
				{tag:"br"},
				{kind:"onyx.Checkbox"},
				{content:"Fast", classes:"enyo-inline"}
			]}
		]}
	]
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

