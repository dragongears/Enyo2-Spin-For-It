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
		this.$.hand.setChecked(true);
		this.$.normal.setChecked(true);
	},

	pointerGroupActivated: function(inSender, inEvent) {
		console.log(">>>> groupActivated " + inEvent.originator.getName() + " " + inEvent.originator.getActive());
		this.doPrefsPointerChange({pointer: inEvent.originator.getName()});
	},

	durationGroupActivated: function(inSender, inEvent) {
		console.log(">>>> groupActivated " + inEvent.originator.getName() + " " + inEvent.originator.getActive());
		this.doPrefsDurationChange({duration: inEvent.originator.getName()});
	}
});
