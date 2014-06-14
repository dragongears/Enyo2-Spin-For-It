//
// Spin For It
// A spinning decision maker app.
// Copyright 2012-2013 Arthur J. Dahm III
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//


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
		setTimeout(enyo.bind(this, function() {
			this.spin();
		}), 2000);
	},

	resizeHandler: function(){
		this.inherited(arguments);
		this.resizePointer();
		}
});
