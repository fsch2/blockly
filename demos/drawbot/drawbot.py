import sys
import time
import serial
import streamexpect

global ser
global exp
ser = None
exp = None

TIMEOUT = 5.0
DELIM = '\r\n'

def drawbot_init(port):
    global ser
    global exp
    # close, if port was openend before
    try:
        ser.close()
    except:
        pass
    try:
        ser = serial.Serial(port, baudrate=2400, timeout=0)
        exp = streamexpect.wrap(ser)
    except:
        print("Unable to open '{}!'".format(port))
        return
    ser.write(b"get\r\n")
    exp.expect_regex(b"([A-Z]+)\r\n", timeout=TIMEOUT)

def write_command(cmd, args=[]):
    print(cmd, args)
    global ser
    ser.write(cmd.encode())
    if args:
        argsstr = ' '.join(map(str, map(int, args)))
        ser.write(' '.encode())
        ser.write(argsstr.encode())
    ser.write(DELIM.encode())
    
def drawbot_command(cmd, args=[]):
    global exp
    write_command(cmd, args)
    m = exp.expect_regex(b" - ([A-Z]+)\r\n", timeout=TIMEOUT)
    if m.groups[0] != b"OK":
        print("Command {}, arguments {} failed!".format(cmd, args))

def drawbot_command_response(cmd, args=[]):
    global exp
    write_command(cmd, args)
    m = exp.expect_regex(b" - ([a-zA-Z0-9 ]+) - ([A-Z]+)\r\n", timeout=TIMEOUT)
    if m.groups[1] != b"OK":
        print("Command {}, arguments {} failed!".format(cmd, args))
    return m.groups[0].decode().split()

def drawbot_delay(delaysecs):
    print("Wait a few seconds", end="")
    for i in range(int(delaysecs)):
        print(".", end="")
        sys.stdout.flush()
        time.sleep(1)
    print("")

if __name__ == "__main__":
    drawbot_init('/dev/pts/9')
    drawbot_command('goto', ['142', '57'])
    drawbot_command('drop')
    drawbot_command('goto', ['67', '217'])
    drawbot_command('goto', ['807', '280'])
    drawbot_delay(3.2)
    drawbot_command('move', ['40', '40'])
    drawbot_command('move', ['40', '-40'])
    drawbot_command('move', ['-40', '-40'])
