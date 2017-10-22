/**
 * @license
 * Visual Blocks Editor
 *
 * Copyright 2012 Google Inc.
 * https://developers.google.com/blockly/
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Colour blocks for Blockly.
 *
 * This file is scraped to extract a .json file of block definitions. The array
 * passed to defineBlocksWithJsonArray(..) must be strict JSON: double quotes
 * only, no outside references, no functions, no trailing commas, etc. The one
 * exception is end-of-line comments, which the scraper will remove.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

goog.provide('Blockly.Blocks.drawbot');  // Deprecated
goog.provide('Blockly.Constants.Drawbot');

goog.require('Blockly.Blocks');
goog.require('Blockly');


/**
 * Common HSV hue for all blocks in this category.
 * This should be the same as Blockly.Msg.DRAWBOT_HUE.
 * @readonly
 */
Blockly.Constants.Drawbot.HUE = 65;
/** @deprecated Use Blockly.Constants.Drawbot.HUE */
Blockly.Blocks.drawbot.HUE = Blockly.Constants.Drawbot.HUE;

Blockly.defineBlocksWithJsonArray([  // BEGIN JSON EXTRACT
    // Block for drawbot initialization
    {
	"type": "drawbot_init",
	"message0": "%{BKY_DRAWBOT_INIT_TITLE} %1 %{BKY_DRAWBOT_INIT_PORT} %2",
	"args0": [
	    {
		"type": "input_dummy"
	    },
	    {
		"type": "input_value",
		"name": "port",
		"check": "String",
		"align": "RIGHT"
	    }
	],
	"colour": "%{BKY_DRAWBOT_HUE}",
	"helpUrl": "%{BKY_DRAWBOT_INIT_HELPURL}",
	"tooltip": "%{BKY_DRAWBOT_INIT_TOOLTIP}",
	"extensions": ["parent_tooltip_when_inline"]
    },

    // Block for lifting pen up or dropping pen down.
    {
	"type": "drawbot_set_pen",
	"message0": "%{BKY_DRAWBOT_SET_PEN_TITLE} %1",
	"args0": [
	    {
		"type": "field_dropdown",
		"name": "state",
		"options": [
		    ["%{BKY_DRAWBOT_SET_PEN_UP}", "PEN_UP"],
		    ["%{BKY_DRAWBOT_SET_PEN_DOWN}", "PEN_DOWN"]
		]
	    }
	],
	"previousStatement": null,
	"nextStatement": null,
	"colour": "%{BKY_DRAWBOT_HUE}",
	"helpUrl": "%{BKY_DRAWBOT_SET_PEN_HELPURL}",
	"tooltip": "%{BKY_DRAWBOT_SET_PEN_TOOLTIP}",
	"extensions": ["parent_tooltip_when_inline"]
    },

    // Block for driving a servo to the given angle.
    {
	"type": "drawbot_set_angle",
	"message0": "%{BKY_DRAWBOT_SET_ANGLE_TITLE} %1 %{BKY_DRAWBOT_SET_ANGLE_SERVO1} %2 %{BKY_DRAWBOT_SET_ANGLE_SERVO2} %3",
	"args0": [
	    {
		"type": "input_dummy"
	    },
	    {
		"type": "input_value",
		"name": "servo1",
		"check": "Number",
		"align": "RIGHT"
	    },
	    {
		"type": "input_value",
		"name": "servo2",
		"check": "Number",
		"align": "RIGHT"
	    }
	],
	"previousStatement": null,
	"nextStatement": null,
	"colour": "%{BKY_DRAWBOT_HUE}",
	"helpUrl": "%{BKY_DRAWBOT_SET_ANGLE_HELPURL}",
	"tooltip": "%{BKY_DRAWBOT_SET_ANGLE_TOOLTIP}",
	"extensions": ["parent_tooltip_when_inline"]
    },

    // Block for driving the pen to a given position.
    {
	"type": "drawbot_goto",
	"message0": "%{BKY_DRAWBOT_GOTO_TITLE} %1 %{BKY_DRAWBOT_GOTO_X} %2 %{BKY_DRAWBOT_GOTO_Y} %3",
	"args0": [
	    {
		"type": "input_dummy"
	    },
	    {
		"type": "input_value",
		"name": "x",
		"check": "Number",
		"align": "RIGHT"
	    },
	    {
		"type": "input_value",
		"name": "y",
		"check": "Number",
		"align": "RIGHT"
	    }
	],
	"previousStatement": null,
	"nextStatement": null,
	"colour": "%{BKY_DRAWBOT_HUE}",
	"helpUrl": "%{BKY_DRAWBOT_GOTO_HELPURL}",
	"tooltip": "%{BKY_DRAWBOT_GOTO_TOOLTIP}",
	"extensions": ["parent_tooltip_when_inline"]
    },

    // Block for getting the x or y coordinate.
    {
	"type": "drawbot_get",
	"message0": "%1 %{BKY_DRAWBOT_GET_TITLE}",
	"args0": [
	    {
		"type": "field_dropdown",
		"name": "coordinate",
		"options": [
		    ["x", "XPOS"],
		    ["y", "YPOS"]
		]
	    }
	],	
	"output": "Number",
	"colour": "%{BKY_DRAWBOT_HUE}",
	"helpUrl": "%{BKY_DRAWBOT_GET_HELPURL}",
	"tooltip": "%{BKY_DRAWBOT_GET_TOOLTIP}",
	"extensions": ["parent_tooltip_when_inline"]
    },

    // Block for getting the vertical position.
    {
	"type": "drawbot_gety",
	"message0": "%{BKY_DRAWBOT_GETY_TITLE}",
	"output": "Number",
	"colour": "%{BKY_DRAWBOT_HUE}",
	"helpUrl": "%{BKY_DRAWBOT_GETY_HELPURL}",
	"tooltip": "%{BKY_DRAWBOT_GETY_TOOLTIP}",
	"extensions": ["parent_tooltip_when_inline"]
    },

    // Block for erasing.
    {
	"type": "drawbot_erase",
	"message0": "%{BKY_DRAWBOT_ERASE_TITLE}",
	"previousStatement": null,
	"nextStatement": null,
	"colour": "%{BKY_DRAWBOT_HUE}",
	"helpUrl": "%{BKY_DRAWBOT_ERASE_HELPURL}",
	"tooltip": "%{BKY_DRAWBOT_ERASE_TOOLTIP}",
	"extensions": ["parent_tooltip_when_inline"]
    }
    
]);  // END JSON EXTRACT (Do not delete this comment.)
