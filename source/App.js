enyo.kind({
	name: "Spinner",
	kind: "enyo.Control",
	handlers: {'ontap': 'spin'},
	style: "width:100%",
	components: [
		{name: 'pointer', kind: enyo.Image, src: "assets/arrow_1024.png"},
		{name: "animator", kind: enyo.Animator, duration: 1000, onStep: "stepAnimation"}
	],

	stepAnimation: function(inSender, inValue) {
		this.$.pointer.applyStyle('-webkit-transform', 'rotate(' + (inSender.value) + 'deg)');
	},

	spin: function() {
		this.$.animator.play({startValue: 0, endValue: 1000 + (Math.floor(Math.random() * 360)), easingFunction: enyo.easing.cubicOut});
	},

	resizePointer: function() {
		var min = Math.min(this.hasNode().clientWidth, this.hasNode().clientHeight, 1024) * .70;
		this.$.pointer.applyStyle("width", min+"px");
		this.$.pointer.applyStyle("margin-top", (min * .20)+"px");
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
