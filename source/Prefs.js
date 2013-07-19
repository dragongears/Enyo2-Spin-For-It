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


// PrefsPanel Kind

enyo.kind({
	name: "PrefsPanel",
	kind: "FittableRows",
	events: {
		onPrefsPointerChange: "",
		onPrefsDurationChange: ""
	},
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
		{classes: "prefs-groupbox", allowHtml: true, content: "Version 1.1.0<br />dragongears.com" }
	],

	rendered: function() {
		this.inherited(arguments);

		var ptr = localStorage.pointer;
		if (ptr) {
			this.$[ptr].setChecked(true);
		} else {
			this.$.hand.setChecked(true);
		}

		var dur = localStorage.duration;
		if (dur) {
			this.$[dur].setChecked(true);
		} else {
			this.$.normal.setChecked(true);
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
