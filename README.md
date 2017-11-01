# Drawbot Code

This is a tiny web application using Google Blockly, a "web-based visual programming editor". It can be used to program the Drawbot, a 3-servo drawing robot.

## Installation

1. Install PyQt5 from pypi
1. Clone repo
1. Clone Google's closure-library in the same directory next to "blockly". See https://developers.google.com/closure/library/
1. Run 'python build.py' in the blockly directory to build

## Running

1. Go to demos/drawbot
2. Run 'python3 hackly.py'
3. To run the Drawbot mock, run 'python3 qt_pts_drawbot.py'

## Examples

Koch Snowflake Order 3:
![](https://github.com/fsch2/blockly/raw/master/doc/kochflake3.png)

Koch Snowflake Order 4:
![](https://github.com/fsch2/blockly/raw/master/doc/kochflake4.png)

Sierpinski Arrowhead Curve Order 6:
![](https://github.com/fsch2/blockly/raw/master/doc/arrowhead6.png)
