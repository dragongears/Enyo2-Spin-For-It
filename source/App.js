enyo.kind({
	name: "Spinner",
	kind: "enyo.Control",
	handlers: {'ontap': 'spin'},
	style: "width:100%",
	components: [
		{name: 'pointer', kind: enyo.Image, src: "assets/arrow_1024.png"},
		{name: "animator", kind: enyo.Animator, duration: 4000, onStep: "stepAnimation"}
	],

	stepAnimation: function(inSender, inValue) {
		enyo.dom.transform(this.$.pointer, {rotate: (inSender.value) + 'deg'});
	},

	spin: function() {
		this.$.animator.play({startValue: 0, endValue: (360*4) + (Math.floor(Math.random() * 360)), easingFunction: enyo.easing.cubicOut});
	},

	resizePointer: function() {
		var min = Math.min(this.hasNode().clientWidth, this.hasNode().clientHeight, 1024) * .70;
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
