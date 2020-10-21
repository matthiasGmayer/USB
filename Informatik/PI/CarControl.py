#!/usr/bin/env python
import socket
import picamera
import time
import io
from IO import Wheel, Channel as c
import traceback
from time import sleep

PORT = 65432

rw1 = Wheel(c(4),c(5),c(6))
rw2 = Wheel(c(4),c(7),c(8))
lw1 = Wheel(c(4),c(9),c(10))
lw2 = Wheel(c(4),c(11),c(12))

def find_between(s, start, end):
  return (s.split(start))[1].split(end)[0]
with picamera.PiCamera() as camera:
    camera.resolution = (640,480)

    while True:
        s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        try:
            s.bind(("", PORT))
            s.listen()
            conn, addr = s.accept()
            with conn:
                print('Connected by', addr)

                stream = io.BytesIO()
                for pic in enumerate(camera.capture_continuous(stream, format= 'jpeg', use_video_port = True, quality=10)):
                    stream.truncate()
                    stream.seek(0)
                    v = stream.getvalue();
                    conn.sendall(len(v).to_bytes(32, byteorder='little'))
                    conn.sendall(v)
                    data = conn.recv(1024)
                    if not data:
                        break
                    sp = find_between(data.decode("ASCII"), ";", "#")
                    spa = sp.split(":");
                    x = float(spa[0])
                    x2 = float(spa[1])
                    lw1.speed = x
                    lw2.speed = x
                    rw1.speed = x2
                    rw2.speed = x2

                conn.close()
        except:
            traceback.print_exc()
        finally:
            s.close()
            sleep(1)

