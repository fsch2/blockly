/**
 * @license
 * Visual Blocks Language
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
 * @fileoverview Generating Python for drawbot blocks.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

goog.provide('Blockly.Python.drawbot');

goog.require('Blockly.Python');

Blockly.Python['drawbot_init'] = function(block) {
    var value_port = Blockly.Python.valueToCode(block, 'port', Blockly.Python.ORDER_FUNCTION_CALL);
    Blockly.Python.definitions_['import_drawbot'] = 'from drawbot import *\n';
    var code = 'drawbot_init(port=' + value_port + ')\nprint("Using serial port object:\\n", ser)\n';
    return code;
};

Blockly.Python['drawbot_set_pen'] = function(block) {
    var state = block.getFieldValue('state');
    var code = '';    
    switch (state) {
    case 'PEN_UP':
	code = 'drawbot_command("lift")\n';
	break;
    case 'PEN_DOWN':
	code = 'drawbot_command("drop")\n';
	break;
    default:
	throw 'Unknown state: ' + state;
    }
    return code;
};

Blockly.Python['drawbot_erase'] = function(block) {
    var code = 'drawbot_command("erase")\n';
    return code;
};

Blockly.Python['drawbot_set_angle'] = function(block) {
    var value_servo1 = Blockly.Python.valueToCode(block, 'servo1', Blockly.Python.ORDER_FUNCTION_CALL);
    var value_servo2 = Blockly.Python.valueToCode(block, 'servo2', Blockly.Python.ORDER_FUNCTION_CALL);
    var code = 'drawbot_command("set",[' + value_servo1 + ',' + value_servo2 + '])\n';
    return code;
};

Blockly.Python['drawbot_goto'] = function(block) {
    var value_x = Blockly.Python.valueToCode(block, 'x', Blockly.Python.ORDER_NONE);
    var value_y = Blockly.Python.valueToCode(block, 'y', Blockly.Python.ORDER_NONE);
    var code = 'drawbot_command("goto",[' + value_x + ',' + value_y + '])\n';
    return code;
};

Blockly.Python['drawbot_move'] = function(block) {
    var value_dx = Blockly.Python.valueToCode(block, 'dx', Blockly.Python.ORDER_NONE);
    var value_dy = Blockly.Python.valueToCode(block, 'dy', Blockly.Python.ORDER_NONE);
    var code = 'drawbot_command("move",[' + value_dx + ',' + value_dy + '])\n';
    return code;
};

Blockly.Python['drawbot_get'] = function(block) {
    var coordinate = block.getFieldValue('coordinate');
    var code = 'drawbot_command_response("get")';
    switch (coordinate) {
    case 'XPOS':
	code = 'int(' + code + '[0])'
	break;
    case 'YPOS':
	code = 'int(' + code + '[1])'
	break;
    default:
	throw 'Unknown coordinate: ' + coordinate;
    }
    return [code, Blockly.Python.ORDER_FUNCTION_CALL];
};

Blockly.Python['drawbot_delay'] = function(block) {
    Blockly.Python.definitions_['import_sleep'] = 'import time\n';
    var value_delaysecs = Blockly.Python.valueToCode(block, 'delaysecs', Blockly.Python.ORDER_NONE);
    var code = 'drawbot_delay' + '(' + value_delaysecs + ')\n';
    return code;
};
