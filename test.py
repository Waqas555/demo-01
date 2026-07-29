import psutil
import socket
 
print("System Information")
 
hostname = socket.gethostname()
ip_address = socket.gethostbyname(hostname)
 
cpu_usage = psutil.cpu_percent()
 
memory = psutil.virtual_memory()
memory_usage = memory.percent
 
disk_usage = psutil.disk_usage("/").used
 
print("Hostname:", hostname)
print("IP Address:", ip_address)
print("CPU Usage:", cpu_usage, "%")
print("Memory Usage:", memory_usage, "%")
print("Disk Usage:", disk_usage, "%")
 
if cpu_usage > "80":
    print("WARNING: High CPU Usage")
 
if disk_usage > 90:
    print("WARNING: Disk Almost Full")