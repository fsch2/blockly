import sys
import pty
import re
import os

from PyQt5.QtWidgets import QWidget, QApplication
from PyQt5.QtGui import QPainter, QFont
from PyQt5.QtCore import Qt, QPoint, QIODevice, QSocketNotifier

class Model():

    def __init__(self):
        self._pen_down = False
        self._pos = (0,0)
        self._lines = []

    def goto(self, x, y):
        if self._pen_down:
            self._lines.append([self._pos, (x, y)])
        self._pos = (x, y)

    def drop(self):
        self._pen_down = True

    def lift(self):
        self._pen_down = False

    def erase(self):
        self._lines = []

    def getlines(self):
        return self._lines

    def getpos(self):
        return self._pos

    def isPenDown(self):
        return self._pen_down

    def __str__(self):
        return "pos {}, pen {}, lines {}".format(self._pos, self._pen_down, self._lines)

    
class CommandParser():

    DELIM = '\r\n'
    ECHO = True

    def __init__(self, widget, model):
        self._widget = widget
        self._model = model
        self.buffer = ""

        # Setup pty
        m,s = pty.openpty()
        self._ptymaster = m
        self.slave_name = os.ttyname(s)
        self.notifier = QSocketNotifier(m, QSocketNotifier.Read)
        self.notifier.activated.connect(self.onSocketRead)
        
    def onSocketRead(self):
        data = os.read(self._ptymaster, 1)
        if self.ECHO:
            os.write(self._ptymaster, data)
        self.appendBuffer(data.decode())

    def appendBuffer(self, text):        
        self.buffer += text
        if self.buffer.endswith(self.DELIM):
            self._parseBuffer()
        self._widget.update()

    def _parseBuffer(self):
        # parse set command
        m = re.match("set (\d+) (\d+)", self.buffer)
        if m:
            try:
                arg0 = int(m.groups()[0])
                arg1 = int(m.groups()[1])
                if (not arg0 in range(2000, 4001)) or (not arg1 in range(2000, 4001)):
                    raise ValueException("set arguments must be 0-1000")
            except:
                os.write(self._ptymaster, " - ERROR".encode() + self.DELIM.encode())
                self.buffer = ""
                return
            # TODO: change model according to this input
            os.write(self._ptymaster, " - OK".encode() + self.DELIM.encode())
        # parse goto command
        m = re.match("goto (\d+) (\d+)", self.buffer)
        if m:
            try:
                arg0 = int(m.groups()[0])
                arg1 = int(m.groups()[1])
                if (not arg0 in range(0, 1001)) or (not arg1 in range(0, 1001)):
                    raise ValueException("goto arguments must be 0-1000")
            except:
                os.write(self._ptymaster, " - ERROR".encode() + self.DELIM.encode())
                self.buffer = ""
                return
            self._model.goto(int(m.groups()[0]), int(m.groups()[1]))
            os.write(self._ptymaster, " - OK".encode() + self.DELIM.encode())
        # parse drop command
        m = re.match("drop", self.buffer)
        if m:
            self._model.drop()
            os.write(self._ptymaster, " - OK".encode() + self.DELIM.encode())
        # parse lift command
        m = re.match("lift", self.buffer)
        if m:
            self._model.lift()
            os.write(self._ptymaster, " - OK".encode() + self.DELIM.encode())
        # parse erase command
        m = re.match("erase", self.buffer)
        if m:
            self._model.erase()
            os.write(self._ptymaster, " - OK".encode() + self.DELIM.encode())
        # parse get command
        m = re.match("get", self.buffer)
        if m:
            resp = " - {} {} {}".format(*self._model.getpos(),
                    "down" if self._model.isPenDown() else "up")
            os.write(self._ptymaster, resp.encode())
            os.write(self._ptymaster, " - OK".encode() + self.DELIM.encode())
        self.buffer = ""
        return
                
    
class QtDrawbot(QWidget):
    
    WIDTH = 1000
    HEIGHT = 1000
    SCALE = 2
    
    def __init__(self):
        super().__init__()
        self.initUI()

    def initUI(self):
        self._model = Model()
        self._parser = CommandParser(self, self._model)

        # Setup widget
        self.qp = QPainter()
        self.setGeometry(100, 100, self.WIDTH//self.SCALE, self.HEIGHT//self.SCALE)
        self.setWindowTitle('Qt Drawbot on {}'.format(self._parser.slave_name))
        self.show()

    def keyPressEvent(self, e):
        self._parser.appendBuffer(e.text())

    def paintEvent(self, e):
        self.qp.begin(self)
        
        # draw pen
        self.qp.setPen(Qt.blue)
        if self._model.isPenDown():
            self.qp.setBrush(Qt.blue)
        else:
            self.qp.setBrush(Qt.NoBrush)
        coords = [ i//self.SCALE for i in [*self._model.getpos()]]
        self.qp.drawEllipse( QPoint(*coords), 5, 5)

        # draw lines
        self.qp.setPen(Qt.black)
        for ln in self._model.getlines():
            coords = [ i//self.SCALE for i in [*ln[0], *ln[1]]]
            self.qp.drawLine(*coords)

        # draw status
        self.qp.setPen(Qt.black)
        self.qp.setFont(QFont('Monospace', 8))
        self.qp.drawText(QPoint(self.WIDTH//self.SCALE//2 + 4, \
                                self.HEIGHT//self.SCALE - 4), \
                         self._parser.buffer.__repr__())
        self.qp.drawText(QPoint(4, \
                                self.HEIGHT//self.SCALE - 4), \
                         str(self._model.getpos()))
        self.qp.end()


if __name__ == '__main__':
    app = QApplication(sys.argv)
    qdb = QtDrawbot()
    sys.exit(app.exec_())
