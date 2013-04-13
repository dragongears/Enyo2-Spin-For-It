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
	published: {
		duration: "normal",
		pointer: "hand"
	},
	durations: {
		short: {time: 1 * 1000, rotations: 360 * 2},
		normal: {time: 5 * 1000, rotations: 360 * 10},
		long: {time: 10 *1000, rotations: 360 * 20},
		very_long: {time: 20 * 1000, rotations: 360 * 40}
	},
	pointers: {
		hand: "hand",
		arrow: "arrow",
		spinner: "spinner",
		bottle: "bottle"
	},
	components: [
		{name: 'pointer', classes: "enable3d", kind: enyo.Image, src: "assets/hand_512.png"},
		{name: "animator", kind: enyo.Animator, onStep: "stepAnimation"}
	],

	pointerChanged: function(inOldValue) {
		this.$.pointer.setAttribute('src', 'assets/' + this.pointers[this.pointer] + '_512.png');
  },

	stepAnimation: function(inSender, inValue) {
		enyo.dom.transform(this.$.pointer, {rotate: (inSender.value % 360) + 'deg'});
//		this.$.pointer.setStyle('-webkit-transform: rotate('+ (inSender.value % 360) +'deg)');
	},

	spin: function() {
		this.$.animator.play({duration: this.durations[this.duration].time, startValue: 0, endValue: (this.durations[this.duration].rotations) + (Math.floor(Math.random() * 360)), easingFunction: enyo.easing.cubicOut});
	},

	resizePointer: function() {
		var min = Math.min(this.hasNode().clientWidth *.70, this.hasNode().clientHeight *.70, 512);
		this.$.pointer.applyStyle("width", min+"px");
		this.$.pointer.applyStyle("margin-top", this.hasNode().clientHeight/2-min/2+"px");
	},

	create: function () {
		this.inherited(arguments);
		this.setPointer("spinner");
	},

	rendered: function() {
		this.inherited(arguments);
		this.resizePointer();
		setTimeout(enyo.bind(function() {
			this.spin();
		}, 1000), this);
	},

	resizeHandler: function(){
		this.inherited(arguments);
		this.resizePointer();
		}
});
