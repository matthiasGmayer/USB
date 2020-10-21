from time import sleep
import time
import RPi.GPIO as g
from threading import Thread

inn = g.IN
out = g.OUT
high = g.HIGH
low = g.LOW

g.setmode(g.BCM)
#g.setmode(g.BOARD)
g.setwarnings(False)

class Channel:
    def __init__(self, position):
        self.position = position
        self.isOut = False
        self.setOut()
        self.output(False)
    
    def setOut(self):
        if(not(self.isOut)):
            self.isOut = True
            g.setup(self.position, out)
    def setIn(self):
        if(self.isOut):
            self.isOut=False
            g.setup(self.position, inn)
    def output(self, out):
        self.state = out
        self.setOut()
        if(out):
            g.output(self.position, high)
        else:
            g.output(self.position, low)
    
    def toggle(self):
        self.output(not(self.state))
    
    def input(self):
        self.setIn()
        return g.input(self.position) == high
            
class Sensor:
    def __init__(self, sender, receiver):
        self.sender = sender
        self.receiver = receiver
        self.distance = 0
        Thread(target = self.threadFunc).start()
        
        
    def send(self):
        self.sender.output(True)
        sleep(0.01)
        self.sender.output(False)
    
    
    def threadFunc(self):
        while True:
            
            sleep(0.1)
            
            self.send()
            start = time.time()
            error = start
            errortime = 0.1
            #print("1")
            while ((not (self.receiver.input() ))or not(start - error > errortime)):
                start = time.time()
                print(start - error)
            #print("2")  
            end = time.time()
            error = end
            while ((self.receiver.input()) or not(end - error > errortime)):
                end = time.time()
                print(end - error)
            #print("3")
            self.distance = (end - start) * 340
    

class Wheel:
    def __init__(self, t, f, b):
        self.t = t
        t.output(True)
        self.f = f
        f.output(False)
        self.b = b
        b.output(False)
        self.speed = 0
        Thread(target = self.threadFunc).start()
    
    def threadFunc(self):
        
        timeInterval = 0.01
        
        while True:
            c = self.b
            speed = self.speed = max(-1, min(self.speed, 1))
            if(speed > 0):
                c = self.f
            else:
                speed = -speed
            if(speed != 0):
                c.output(True)
            sleep(speed*timeInterval)
            if(not(speed >= 1 or speed <= -1)):
                c.output(False)
            sleep((1-speed)*timeInterval)
