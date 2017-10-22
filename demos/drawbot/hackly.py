import os.path
import traceback

from PyQt5.QtCore import QUrl, Qt, QEvent, QObject
from PyQt5.QtWidgets import QApplication
from PyQt5.QtWebEngineWidgets import QWebEngineView


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
view.load(QUrl.fromLocalFile(os.path.abspath('index.html')))
view.show()

app.exec_()
