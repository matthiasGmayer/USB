from IO import Channel, Wheel, Sensor
from time import sleep
import time
from math import sin

w = Wheel(Channel(4), Channel(5), Channel(6))
w.speed = 1
