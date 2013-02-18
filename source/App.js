enyo.kind({
	name: "Spinner",
	kind: "enyo.Control",
	handlers: {'ontap': 'spin'},
	style: "width:100%",
	components: [
		{name: 'pointer', style: "-webkit-transform:translateZ(0);-o-transform:translateZ(0);-moz-transform:translateZ(0);transform:translateZ(0);", kind: enyo.Image, src: "assets/hand_1024.png"},
		{name: "animator", kind: enyo.Animator, duration: 4000, onStep: "stepAnimation"}
	],

	stepAnimation: function(inSender, inValue) {
		enyo.dom.transform(this.$.pointer, {rotate: (inSender.value) + 'deg'});
	},

	spin: function() {
		this.$.animator.play({startValue: 0, endValue: (360*4) + (Math.floor(Math.random() * 360)), easingFunction: enyo.easing.cubicOut});
	},

	resizePointer: function() {
		var min = Math.min(this.hasNode().clientWidth *.70, this.hasNode().clientHeight *.70, 1024);
		this.$.pointer.applyStyle("width", min+"px");
		this.$.pointer.applyStyle("margin-top", this.hasNode().clientHeight/2-min/2+"px");
	},

	rendered: function() {
		this.inherited(arguments);
		this.resizePointer();
	},

	resizeHandler: function(){
		this.inherited(arguments);
		this.resizePointer();
		}
});

enyo.kind({
	name: "App",
	kind: "FittableColumns",
	classes: "enyo-center",
	components: [
		{kind: 'Spinner', name: 'spinner'}
	]
});
