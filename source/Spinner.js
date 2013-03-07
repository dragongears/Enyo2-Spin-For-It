/**
 * Created with JetBrains PhpStorm.
 * User: art.dahm
 * Date: 3/7/13
 * Time: 11:54 AM
 * To change this template use File | Settings | File Templates.
 */

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
