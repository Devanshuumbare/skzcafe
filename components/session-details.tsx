"use client"

import { useState } from "react"
import {
  Monitor,
  Clock,
  Pause,
  Play,
  DollarSign,
  Gamepad2,
  Coffee,
  User,
  Calendar,
  Timer,
  Ban,
  Power,
  MessageSquare,
  X,
} from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Types for our stations
type StationStatus = "available" | "in-use" | "paused" | "maintenance"
type StationType = "pc" | "ps" | "cafeteria"

interface Station {
  id: string
  type: StationType
  status: StationStatus
  time?: number // in minutes
  cost?: number // in dollars
  name: string
}

interface SessionDetailsProps {
  station: Station
  onClose: () => void
}

// Sample log entries for the selected station
const getStationLogs = (stationName: string) => [
  { time: "16:08:56", message: `${stationName}: Session started.`, type: "info" },
  { time: "16:08:56", message: `${stationName}: Update process is completed.`, type: "info" },
  { time: "16:08:50", message: `${stationName}: Session started.`, type: "info" },
  { time: "16:09:03", message: `${stationName}: Session has been converted to time limited.`, type: "info" },
  { time: "16:09:14", message: `${stationName}: Session closed. [ Usage: 3,00 $ , Total: 3,00 $ ]`, type: "error" },
  { time: "16:09:15", message: `${stationName}: Administrator session started.`, type: "warning" },
  { time: "16:09:20", message: `${stationName}: Session Paused.`, type: "info" },
]

// Sample messages for the selected station
const getStationMessages = (stationName: string) => [
  { time: "16:05:32", from: "User", to: "Admin", message: "Can I get help with printing?", read: true },
  { time: "16:06:15", from: "Admin", to: "User", message: "Sure, I'll be right there.", read: true },
  { time: "16:10:45", from: "User", to: "Admin", message: "Can I order a coffee?", read: false },
]

export function SessionDetails({ station, onClose }: SessionDetailsProps) {
  const [activeTab, setActiveTab] = useState("overview")
  const logs = getStationLogs(station.name)
  const messages = getStationMessages(station.name)
  const [newMessage, setNewMessage] = useState("")

  // Function to get the appropriate icon for a station
  const getStationIcon = (station: Station) => {
    switch (station.type) {
      case "pc":
        return <Monitor className="h-6 w-6" />
      case "ps":
        return <Gamepad2 className="h-6 w-6" />
      case "cafeteria":
        return <Coffee className="h-6 w-6" />
    }
  }

  // Function to get the appropriate badge for a station's status
  const getStatusBadge = (status: StationStatus) => {
    switch (status) {
      case "available":
        return (
          <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">
            Available
          </Badge>
        )
      case "in-use":
        return (
          <Badge variant="outline" className="bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400">
            In Use
          </Badge>
        )
      case "paused":
        return (
          <Badge variant="outline" className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400">
            Paused
          </Badge>
        )
      case "maintenance":
        return (
          <Badge variant="outline" className="bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400">
            Maintenance
          </Badge>
        )
    }
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-full bg-slate-100 dark:bg-slate-800">{getStationIcon(station)}</div>
          <div>
            <h2 className="text-2xl font-bold">{station.name}</h2>
            <div className="flex items-center gap-2">
              {getStatusBadge(station.status)}
              {station.time && (
                <div className="flex items-center text-sm">
                  <Clock className="h-3 w-3 mr-1" />
                  <span>{station.time} min</span>
                </div>
              )}
              {station.cost !== undefined && (
                <div className="flex items-center text-sm">
                  <DollarSign className="h-3 w-3 mr-1" />
                  <span>{station.cost.toFixed(2)}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>

      <Tabs defaultValue="overview" onValueChange={setActiveTab} className="flex-1">
        <TabsList className="grid grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="control">Control</TabsTrigger>
          <TabsTrigger value="logs">Logs</TabsTrigger>
          <TabsTrigger value="messages">Messages</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4 mt-4">
          <div className="grid md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Session Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">User: Guest</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Started: 16:08:50</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Timer className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Duration: {station.time || 0} min</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Cost: ${station.cost?.toFixed(2) || "0.00"}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-2">
                  {station.status === "in-use" ? (
                    <Button variant="outline" className="flex items-center gap-2">
                      <Pause className="h-4 w-4" />
                      Pause Session
                    </Button>
                  ) : station.status === "paused" ? (
                    <Button variant="outline" className="flex items-center gap-2">
                      <Play className="h-4 w-4" />
                      Resume Session
                    </Button>
                  ) : (
                    <Button variant="outline" className="flex items-center gap-2">
                      <Play className="h-4 w-4" />
                      Start Session
                    </Button>
                  )}
                  <Button variant="outline" className="flex items-center gap-2">
                    <Ban className="h-4 w-4" />
                    End Session
                  </Button>
                  <Button variant="outline" className="flex items-center gap-2">
                    <Power className="h-4 w-4" />
                    Restart
                  </Button>
                  <Button variant="outline" className="flex items-center gap-2">
                    <MessageSquare className="h-4 w-4" />
                    Send Message
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {logs.slice(0, 5).map((log, index) => (
                  <div
                    key={index}
                    className={`text-sm py-1 ${
                      log.type === "error"
                        ? "text-rose-600 dark:text-rose-400"
                        : log.type === "warning"
                          ? "text-amber-600 dark:text-amber-400"
                          : "text-emerald-600 dark:text-emerald-400"
                    }`}
                  >
                    <span className="font-mono">{log.time}</span> - {log.message}
                  </div>
                ))}
              </div>
              <Button variant="link" className="mt-2 p-0 h-auto" onClick={() => setActiveTab("logs")}>
                View all logs
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="control" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Session Control</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="session-type">Session Type</Label>
                  <Select defaultValue="time">
                    <SelectTrigger id="session-type">
                      <SelectValue placeholder="Select session type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="time">Time Limited</SelectItem>
                      <SelectItem value="prepaid">Prepaid</SelectItem>
                      <SelectItem value="unlimited">Unlimited</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="time-limit">Time Limit (minutes)</Label>
                  <Input id="time-limit" type="number" defaultValue={station.time || 60} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="rate">Rate ($/hour)</Label>
                  <Input id="rate" type="number" defaultValue="3.00" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="user">Assign User</Label>
                  <Select defaultValue="guest">
                    <SelectTrigger id="user">
                      <SelectValue placeholder="Select user" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="guest">Guest</SelectItem>
                      <SelectItem value="member1">John Doe</SelectItem>
                      <SelectItem value="member2">Jane Smith</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Separator />

              <div className="flex flex-wrap gap-2">
                <Button className="flex items-center gap-2">
                  <Play className="h-4 w-4" />
                  Start Session
                </Button>
                <Button variant="outline" className="flex items-center gap-2">
                  <Ban className="h-4 w-4" />
                  End Session
                </Button>
                <Button variant="outline" className="flex items-center gap-2">
                  <Pause className="h-4 w-4" />
                  Pause Session
                </Button>
                <Button variant="outline" className="flex items-center gap-2">
                  <Power className="h-4 w-4" />
                  Restart
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Remote Control</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                <Button variant="outline">Lock Screen</Button>
                <Button variant="outline">Shutdown</Button>
                <Button variant="outline">Log Off</Button>
                <Button variant="outline">Remote View</Button>
                <Button variant="outline">Block Internet</Button>
                <Button variant="outline">Block USB</Button>
                <Button variant="outline">Take Screenshot</Button>
                <Button variant="outline">Send File</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="logs" className="mt-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Session Logs</CardTitle>
              <Button variant="outline" size="sm">
                Export Logs
              </Button>
            </CardHeader>
            <CardContent>
              <div className="font-mono text-xs space-y-1">
                {logs.map((entry, index) => (
                  <div
                    key={index}
                    className={`py-1 border-b last:border-b-0 flex ${
                      entry.type === "error"
                        ? "text-rose-600 dark:text-rose-400"
                        : entry.type === "warning"
                          ? "text-amber-600 dark:text-amber-400"
                          : "text-emerald-600 dark:text-emerald-400"
                    }`}
                  >
                    <span className="w-16">{entry.time}</span>
                    <span>{entry.message}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="messages" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Messages</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border rounded-lg p-4 h-64 overflow-y-auto">
                  {messages.map((msg, index) => (
                    <div key={index} className="mb-3">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold">{msg.from}</span>
                        <span className="text-xs text-muted-foreground">{msg.time}</span>
                        {!msg.read && (
                          <Badge
                            variant="outline"
                            className="bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400"
                          >
                            New
                          </Badge>
                        )}
                      </div>
                      <div className="pl-4 border-l-2 border-slate-200 dark:border-slate-700">{msg.message}</div>
                    </div>
                  ))}
                </div>

                <div className="flex gap-2">
                  <Input
                    placeholder="Type a message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                  />
                  <Button>Send</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Station Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="station-name">Station Name</Label>
                  <Input id="station-name" defaultValue={station.name} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="station-type">Station Type</Label>
                  <Select defaultValue={station.type}>
                    <SelectTrigger id="station-type">
                      <SelectValue placeholder="Select station type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pc">Computer</SelectItem>
                      <SelectItem value="ps">Gaming Console</SelectItem>
                      <SelectItem value="cafeteria">Cafeteria</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="default-rate">Default Rate ($/hour)</Label>
                  <Input id="default-rate" type="number" defaultValue="3.00" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="ip-address">IP Address</Label>
                  <Input id="ip-address" defaultValue="192.168.1.100" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="mac-address">MAC Address</Label>
                  <Input id="mac-address" defaultValue="00:1A:2B:3C:4D:5E" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="station-group">Station Group</Label>
                  <Select defaultValue="default">
                    <SelectTrigger id="station-group">
                      <SelectValue placeholder="Select group" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="default">Default</SelectItem>
                      <SelectItem value="vip">VIP</SelectItem>
                      <SelectItem value="gaming">Gaming</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Separator />

              <div className="flex justify-end gap-2">
                <Button variant="outline">Reset</Button>
                <Button>Save Changes</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
