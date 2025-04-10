"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Sample log entries
const logEntries = [
  { time: "16:08:56", station: "PC-02", message: "Session started.", type: "info" },
  { time: "16:08:56", station: "PC-02", message: "Update process is completed.", type: "info" },
  { time: "16:08:50", station: "PC-02", message: "Session started.", type: "info" },
  { time: "16:09:03", station: "PC-02", message: "Session has been converted to time limited.", type: "info" },
  { time: "16:09:06", station: "PC-03", message: "Session started.", type: "info" },
  { time: "16:09:14", station: "PC-03", message: "Session closed. [ Usage: 3,00 $ , Total: 3,00 $ ]", type: "error" },
  { time: "16:09:15", station: "PC-03", message: "Administrator session started.", type: "warning" },
  { time: "16:09:20", station: "PC-03", message: "Session Paused.", type: "info" },
]

interface ActivityLogProps {
  onSessionClick?: (stationId: string) => void
}

export function ActivityLog({ onSessionClick }: ActivityLogProps) {
  const [activeTab, setActiveTab] = useState("log")

  const handleSessionClick = (stationId: string) => {
    if (onSessionClick) {
      onSessionClick(stationId)
    }
  }

  return (
    <div className="h-48 overflow-hidden">
      <Tabs defaultValue="log" onValueChange={setActiveTab}>
        <div className="flex items-center justify-between px-4 py-2 bg-slate-100 dark:bg-slate-800">
          <TabsList>
            <TabsTrigger value="log">Log</TabsTrigger>
            <TabsTrigger value="messages">Messages</TabsTrigger>
          </TabsList>

          <div className="text-sm text-muted-foreground">
            {activeTab === "log" ? "System Activity Log" : "User Messages"}
          </div>
        </div>

        <TabsContent value="log" className="h-36 overflow-y-auto p-0 m-0">
          <div className="font-mono text-xs">
            {logEntries.map((entry, index) => (
              <div
                key={index}
                className={`px-4 py-1 border-b last:border-b-0 flex ${
                  entry.type === "error"
                    ? "text-rose-600 dark:text-rose-400"
                    : entry.type === "warning"
                      ? "text-amber-600 dark:text-amber-400"
                      : "text-emerald-600 dark:text-emerald-400"
                }`}
              >
                <span className="w-16">{entry.time}</span>
                <span className="w-16 cursor-pointer hover:underline" onClick={() => handleSessionClick(entry.station)}>
                  {entry.station}:
                </span>
                <span>{entry.message}</span>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="messages" className="h-36 overflow-y-auto p-4 m-0">
          <div className="text-center text-muted-foreground">No new messages</div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
