/**
 * Created with JetBrains PhpStorm.
 * User: Art
 * Date: 3/10/13
 * Time: 10:50 PM
 * To change this template use File | Settings | File Templates.
 */

// PrefsPanel Kind

enyo.kind({
	name: "PrefsPanel",
	kind: "FittableRows",
	events: {
		onPrefsPointerChange: "",
		onPrefsDurationChange: ""
	},
	components: [
		{kind: "onyx.Groupbox", classes: "prefs-groupbox", components: [
			{kind: "onyx.GroupboxHeader", content: "Pointer Style"},
			{kind: "onyx.RadioGroup", defaultKind: "onyx.Checkbox", classes: "onyx-sample-tools group", onActivate:"pointerGroupActivated", highlander: true, components: [
				{name: "hand", content: "Hand"},
				{name: "arrow", content: "Arrow"},
				{name: "spinner", content: "Spinner"},
				{name: "bottle", content: "Bottle"}
			]}
		]},
		{kind: "onyx.Groupbox", classes: "prefs-groupbox", components: [
			{kind: "onyx.GroupboxHeader", content: "Spin Duration"},
			{kind: "onyx.RadioGroup", defaultKind: "onyx.Checkbox", classes: "onyx-sample-tools group", onActivate:"durationGroupActivated", highlander: true, components: [
				{name: "short", content: "Short"},
				{name: "normal", content: "Normal"},
				{name: "long", content: "Long"},
				{name: "very_long", content: "Very Long"}
			]}
		]}
	],

	rendered: function() {
		this.inherited(arguments);

		var ptr = localStorage.pointer;
		if (ptr) {
			this.$[ptr].setChecked(true);
		} else {
			this.$.hand.setChecked(true);
//			localStorage.pointer = "hand";
		}

		var dur = localStorage.duration;
		if (dur) {
			this.$[dur].setChecked(true);
		} else {
			this.$.normal.setChecked(true);
//			localStorage.duration = "normal";
		}
	},

	pointerGroupActivated: function(inSender, inEvent) {
		var ptr = inEvent.originator.getName();
		this.doPrefsPointerChange({pointer: ptr});
		localStorage.pointer = ptr;
	},

	durationGroupActivated: function(inSender, inEvent) {
		var dur = inEvent.originator.getName();
		this.doPrefsDurationChange({duration: dur});
		localStorage.duration = dur;
	}
});
