using System;
using System.Net;
using System.Net.Sockets;
using System.Text;
using System.Threading;
using System.Globalization;
using System.Linq;
using System.Drawing;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using System.IO;

public class Client : MonoBehaviour
{
    private string hostName;
    public int port;
    public Image image;
    public InputField addressField;
    public Text text;
    public Slider updateSlider;
    private float x, x2;

    bool connected;

    private CultureInfo culture = new CultureInfo("en-US");

    Thread sendThread;
    Texture2D tex;

    // Start is called before the first frame update
    void Start()
    {
        tex = new Texture2D(2, 2);
        image.material.mainTexture = tex;
        Screen.orientation = ScreenOrientation.LandscapeRight;
    }

    // Update is called once per frame
    bool changed = false;
    public void Connect()
    {
        abort = false;
        hostName = addressField.text;
        if ("".Equals(hostName))
        {
            StartBlueToothClient();
        }
        else
        {
            StartWiFiClient();
        }
    }
    public void Disconnect()
    {
        Print("Disconnected");
        abort = true;
    }
    void Update()
    {
        if (changed)
        {
            tex.LoadImage(picture);
            changed = false;
        }
    }

    byte[] bytes = new byte[1024];
    List<byte[]> byteList = new List<byte[]>();
    byte[] picture;
    Socket sender;
    public void StartWiFiClient()
    {
        try
        {
            Print($"trying to connect to {hostName}");
            IPHostEntry ipHostInfo = Dns.GetHostEntry(hostName);
            IPAddress ipAddress = ipHostInfo.AddressList[0];
            Print($"IpAdress is {ipAddress.ToString()}");
            IPEndPoint remoteEP = new IPEndPoint(ipAddress, port);


            // Create a TCP/IP  socket.  
            sender = new Socket(ipAddress.AddressFamily,
                SocketType.Stream, ProtocolType.Tcp);

            Print("Trying to connect...");
            // Connect the socket to the remote endpoint. Catch any errors.  
            try
            {
                sender.Connect(remoteEP);
                Print($"Socket connected to {sender.RemoteEndPoint.ToString()}");
                connected = true;

                new Thread(send).Start();
                new Thread(receive).Start();
                void send()
                {
                    while (!abort)
                    {
                        byte[] msg = Encoding.ASCII.GetBytes($" ;{x.ToString(culture)}:{x2.ToString(culture)}#");
                        int bytesSent = sender.Send(msg);
                        Thread.Sleep((int)updateSlider.value);
                    }
                    sender.Shutdown(SocketShutdown.Both);
                    sender.Close();
                }

                void receive()
                {
                    List<byte> byteList = new List<byte>();
                    List<byte> finishedBytes = new List<byte>();

                    int length = 0;
                    while (!abort)
                    {
                        int rec = sender.Receive(bytes);
                        byteList.AddRange(bytes.Take(rec));

                        if (length == 0)
                        {
                            picture = finishedBytes.ToArray();
                            finishedBytes.Clear();
                            changed = true;
                            length = BitConverter.ToInt32(byteList.Take(32).ToArray(), 0);
                            byteList = byteList.Skip(32).ToList();
                        }

                        int arrayLength = byteList.Count();
                        if (arrayLength > length)
                        {
                            finishedBytes.AddRange(byteList.Take(length));
                            byteList = byteList.Skip(length).ToList();
                            length = 0;
                        }
                        else
                        {
                            finishedBytes.AddRange(byteList);
                            length -= arrayLength;
                            byteList.Clear();
                        }
                    }
                    sender.Shutdown(SocketShutdown.Both);
                    sender.Close();
                }
            }
            catch (ArgumentNullException ane)
            {
                Print($"ArgumentNullException : {ane.ToString()}");
            }
            catch (SocketException se)
            {
                connected = false;
                Print($"SocketException : {se.ToString()}");
            }
            catch (Exception e)
            {
                Print($"Unexpected exception : {e.ToString()}");
            }

        }
        catch (Exception e)
        {
            Console.WriteLine(e.ToString());
        }
    }


    public void StartBlueToothClient()
    {
        //BluetoothClient client = new BluetoothClient();
        //BluetoothDeviceInfo[] devices = client.DiscoverDevices();
        //string s = "";
        //foreach(var b in devices)
        //{
        //    s += b.DeviceName + "\n";
        //}
        //Print(s);
    }

    bool abort = false;

    public void OnApplicationQuit()
    {
        abort = true;
    }

    public void Print(string s)
    {
        print(s);
        text.text = s;
    }

    public void SetX(float x)
    {
        this.x = x;
        //Send();
    }
    public void SetX2(float x2)
    {
        this.x2 = x2;
        //Send();
    }
    //private void Send()
    //{
    //    if (sender == null) return;
    //    byte[] msg = Encoding.ASCII.GetBytes($" ;{x.ToString(culture)}:{x2.ToString(culture)}#");
    //    int bytesSent = sender.Send(msg);
    //}
}
