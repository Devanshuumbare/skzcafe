"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { RefreshCw, Wifi, WifiOff, Activity, Download, Upload, BarChart } from "lucide-react"

export default function NetworkPage() {
  // Sample network devices
  const devices = [
    { id: 1, name: "Router", ip: "192.168.1.1", mac: "00:1A:2B:3C:4D:5E", status: "online" },
    { id: 2, name: "Switch 1", ip: "192.168.1.2", mac: "00:1A:2B:3C:4D:6F", status: "online" },
    { id: 3, name: "Access Point 1", ip: "192.168.1.3", mac: "00:1A:2B:3C:4D:7G", status: "online" },
    { id: 4, name: "Access Point 2", ip: "192.168.1.4", mac: "00:1A:2B:3C:4D:8H", status: "offline" },
  ]

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Network Management</h1>
        <Button variant="outline" size="sm" className="flex items-center gap-1">
          <RefreshCw className="h-4 w-4" />
          Refresh
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Network Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Wifi className="h-5 w-5 text-green-500" />
              <div className="text-xl font-bold">Online</div>
            </div>
            <p className="text-xs text-muted-foreground">Last checked: Just now</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Download Speed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Download className="h-5 w-5 text-blue-500" />
              <div className="text-xl font-bold">95.5 Mbps</div>
            </div>
            <p className="text-xs text-muted-foreground">Average over last hour</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Upload Speed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Upload className="h-5 w-5 text-blue-500" />
              <div className="text-xl font-bold">25.2 Mbps</div>
            </div>
            <p className="text-xs text-muted-foreground">Average over last hour</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="devices">
        <TabsList>
          <TabsTrigger value="devices">Network Devices</TabsTrigger>
          <TabsTrigger value="traffic">Traffic Monitor</TabsTrigger>
          <TabsTrigger value="bandwidth">Bandwidth Control</TabsTrigger>
        </TabsList>

        <TabsContent value="devices" className="mt-4 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Network Devices</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>IP Address</TableHead>
                    <TableHead>MAC Address</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {devices.map((device) => (
                    <TableRow key={device.id}>
                      <TableCell>{device.id}</TableCell>
                      <TableCell>{device.name}</TableCell>
                      <TableCell>{device.ip}</TableCell>
                      <TableCell>{device.mac}</TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={
                            device.status === "online"
                              ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
                              : "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400"
                          }
                        >
                          {device.status === "online" ? (
                            <div className="flex items-center gap-1">
                              <Wifi className="h-3 w-3" />
                              <span>Online</span>
                            </div>
                          ) : (
                            <div className="flex items-center gap-1">
                              <WifiOff className="h-3 w-3" />
                              <span>Offline</span>
                            </div>
                          )}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          Configure
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="traffic" className="mt-4 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Network Traffic</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80 flex items-center justify-center bg-slate-100 dark:bg-slate-800 rounded-md">
                <div className="flex flex-col items-center gap-2 text-muted-foreground">
                  <Activity className="h-10 w-10" />
                  <span>Network Traffic Chart</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="bandwidth" className="mt-4 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Bandwidth Allocation</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80 flex items-center justify-center bg-slate-100 dark:bg-slate-800 rounded-md">
                <div className="flex flex-col items-center gap-2 text-muted-foreground">
                  <BarChart className="h-10 w-10" />
                  <span>Bandwidth Allocation Chart</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
