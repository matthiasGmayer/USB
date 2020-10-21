import socket
import picamera
import time
import io
import traceback
from time import sleep

#HOST = socket.gethostbyname(socket.getfqdn()) # Standard loopback interface address (localhost)
PORT = 65432        # Port to listen on (non-privileged ports are > 1023)
#HOST = '192.168.178.46'
#print(HOST)

camera = picamera.PiCamera()
camera.resolution = (640,480)
#camera.framerate = 60
#camera.shutter_speed = 800


def find_between(s, start, end):
  return (s.split(start))[1].split(end)[0]

while True:
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
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
                    print(sp);
                    #print(sp[sp.rfind(startstr)+len(startstr):sp.find(endstr)])
                    spa = sp.split(":");
                    x = float(spa[0])
                    x2 = float(spa[1])

                conn.close()
        except:
            traceback.print_exc()
        finally:
            s.close()
            sleep(1)
