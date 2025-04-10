"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CafeOverview } from "@/components/cafe-overview"
import { ActivityLog } from "@/components/activity-log"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { SessionDetails } from "@/components/session-details"

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

export default function CyberCafeManagement() {
  const [selectedStation, setSelectedStation] = useState<Station | null>(null)
  const [sessionDialogOpen, setSessionDialogOpen] = useState(false)

  // Function to handle session click from log
  const handleSessionClick = (stationId: string) => {
    // Find the station by name
    const station = {
      id: `${stationId.toLowerCase()}`,
      type: stationId.startsWith("PC") ? "pc" : stationId.startsWith("PS") ? "ps" : "cafeteria",
      status: "in-use",
      time: 30,
      cost: 3.0,
      name: stationId,
    }

    setSelectedStation({
      id: stationId.toLowerCase(),
      type: stationId.startsWith("PC") ? "pc" : stationId.startsWith("PS") ? "ps" : "cafeteria" as StationType,
      status: "in-use" as StationStatus,
      time: 30,
      cost: 3.0,
      name: stationId
    })
    setSessionDialogOpen(true)
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-auto p-4">
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="terminal">Terminal View</TabsTrigger>
            <TabsTrigger value="screen">Screen View</TabsTrigger>
            <TabsTrigger value="performance">Performance Monitoring</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <CafeOverview />
          </TabsContent>

          <TabsContent value="terminal">
            <div className="text-center p-8 text-muted-foreground">Terminal view content</div>
          </TabsContent>

          <TabsContent value="screen">
            <div className="text-center p-8 text-muted-foreground">Screen view content</div>
          </TabsContent>

          <TabsContent value="performance">
            <div className="text-center p-8 text-muted-foreground">Performance monitoring content</div>
          </TabsContent>
        </Tabs>
      </div>

      <div className="border-t dark:border-slate-700">
        <ActivityLog onSessionClick={handleSessionClick} />
      </div>

      <Dialog open={sessionDialogOpen} onOpenChange={setSessionDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-auto">
          {selectedStation && <SessionDetails station={selectedStation} onClose={() => setSessionDialogOpen(false)} />}
        </DialogContent>
      </Dialog>
    </div>
  )
}
