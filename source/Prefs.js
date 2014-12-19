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

// PrefsModel model
enyo.kind({
	name: 'PrefsModel',
	kind: 'enyo.Model',
	source: 'localStorage',
	options: {
		commit: true
	},

	defaults: {
		pointer: 'bottle',
		duration: 'short'
	}
});

// PrefsPanel Kind
enyo.kind({
	name: "PrefsPanel",
	kind: "FittableRows",
	events: {
		onPrefsPointerChange: "",
		onPrefsDurationChange: ""
	},
	published: {
		pointer: "hand",
		duration: "normal"
	},

	model: "",

	bindings: [
		{from: ".model.pointer", to: ".pointer"},
		{from: ".model.duration", to: ".duration"}
	],
	components: [
        {kind: "enyo.Scroller", touch: true, fit: true, components: [
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
        ]},
		{classes: "prefs-groupbox", allowHtml: true, content: "Version 1.2.0<br />dragongears.com" }
	],

	create: function() {
		this.inherited(arguments);
		this.model = new PrefsModel({
			pointer: 'bottle',
			duration: 'short'
		});
	},

	rendered: function() {
		this.inherited(arguments);

		var ptr = this.model.get('pointer');
		this.$[ptr].setChecked(true);

		var dur = this.model.get('duration');
		this.$[dur].setChecked(true);
	},

	pointerGroupActivated: function(inSender, inEvent) {
		var ptr = inEvent.originator.getName();
		this.doPrefsPointerChange({pointer: ptr});
		this.model.set("pointer", ptr);
	},

	durationGroupActivated: function(inSender, inEvent) {
		var dur = inEvent.originator.getName();
		this.doPrefsDurationChange({duration: dur});
		this.model.set("duration", dur);
	}
});
