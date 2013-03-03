enyo.kind({
	name: "Spinner",
	kind: "enyo.Control",
	handlers: {'ontap': 'spin'},
	style: "width:100%",
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
		{kind: "Signals", ondeviceready: "deviceready"},
		{kind: 'Spinner', name: 'spinner'}
	],

	deviceready: function() {
		this.$.Spinner.spin();
	}


});
