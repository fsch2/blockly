import os.path
import traceback

from PyQt5.QtCore import QUrl, Qt, QEvent, QObject, pyqtSlot
from PyQt5.QtWidgets import QApplication
from PyQt5.QtWebEngineWidgets import QWebEngineView
from PyQt5.QtWebChannel import QWebChannel

PATH = "domsave.xml"

class QtHandler(QObject):

    @pyqtSlot(str)
    def save(self, xml):
        with open(PATH, "w+") as f:
            f.write(xml)

    @pyqtSlot()
    def load(self):
        with open(PATH, "r") as f:
            xml = f.read()
            view.page().runJavaScript("Code.loadBlocks('{}');".format(xml))


class Filter(QObject):

    def eventFilter(self, obj, event):
        if event.type() != QEvent.KeyPress:
            return False

        if event.key() != Qt.Key_F5:
            return False

        view.page().runJavaScript(
            "Blockly.Python.workspaceToCode(Code.workspace);", run_code)
        return True


def run_code(src):
    print(src.strip())
    try:
        code = compile(src, '<string>', 'exec')
        exec(code)
    except Exception as e:
        traceback.print_exc()
        

app = QApplication([])
filt = Filter()
app.installEventFilter(filt)
view = QWebEngineView()
channel = QWebChannel()
qthandler = QtHandler()

channel.registerObject('qthandler', qthandler)
view.page().setWebChannel(channel)
view.load(QUrl.fromLocalFile(os.path.abspath('index.html')))
view.show()

app.exec_()
