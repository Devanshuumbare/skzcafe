"use client"

import { useState } from "react"
import { Monitor, Clock, Pause, Play, DollarSign, Gamepad2, Coffee } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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

export function CafeOverview() {
  const [selectedStation, setSelectedStation] = useState<Station | null>(null)
  const [sessionDialogOpen, setSessionDialogOpen] = useState(false)

  // Sample data - in a real app this would come from an API
  const [stations, setStations] = useState<Station[]>([
    // PCs
    ...Array.from({ length: 27 }, (_, i) => ({
      id: `pc-${i + 1}`,
      type: "pc" as StationType,
      status: i === 0 ? "in-use" : i === 1 ? "in-use" : i === 2 ? "maintenance" : "available",
      time: i === 1 ? 23 : undefined,
      cost: i === 0 ? 3 : i === 2 ? 0 : undefined,
      name: `PC-${String(i + 1).padStart(2, "0")}`,
    })),

    // PlayStation stations
    ...Array.from({ length: 9 }, (_, i) => ({
      id: `ps-${i + 1}`,
      type: "ps" as StationType,
      status:
        i === 0
          ? "in-use"
          : i === 1
            ? "in-use"
            : i === 2
              ? "in-use"
              : i === 3
                ? "in-use"
                : i === 4
                  ? "in-use"
                  : "available",
      time: i === 2 ? 229 : i === 3 ? 43 : undefined,
      cost: i === 0 ? 0.6 : i === 4 ? 0.6 : undefined,
      name: `PS-${String(i + 1).padStart(2, "0")}`,
    })),

    // Cafeteria items
    ...Array.from({ length: 5 }, (_, i) => ({
      id: `cafeteria-${i + 1}`,
      type: "cafeteria" as StationType,
      status: i === 2 ? "in-use" : "available",
      cost: i === 2 ? 6.5 : undefined,
      name: `CAFETERIA-${String(i + 1).padStart(2, "0")}`,
    })),
  ])

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

  // Function to get the appropriate color for a station's status
  const getStatusColor = (status: StationStatus) => {
    switch (status) {
      case "available":
        return "bg-green-100 dark:bg-green-900/20 border-green-200 dark:border-green-800"
      case "in-use":
        return "bg-blue-100 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800"
      case "paused":
        return "bg-yellow-100 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800"
      case "maintenance":
        return "bg-red-100 dark:bg-red-900/20 border-red-200 dark:border-red-800"
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

  const handleStationClick = (station: Station) => {
    setSelectedStation(station)
    setSessionDialogOpen(true)
  }

  return (
    <>
      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All Stations</TabsTrigger>
          <TabsTrigger value="pc">Computers</TabsTrigger>
          <TabsTrigger value="ps">Gaming</TabsTrigger>
          <TabsTrigger value="cafeteria">Cafeteria</TabsTrigger>
        </TabsList>

        {["all", "pc", "ps", "cafeteria"].map((tabValue) => (
          <TabsContent key={tabValue} value={tabValue} className="mt-4">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8 gap-4">
              {stations
                .filter((station) => tabValue === "all" || station.type === tabValue)
                .map((station) => (
                  <Card
                    key={station.id}
                    className={`border-2 transition-all hover:shadow-md cursor-pointer ${getStatusColor(station.status)}`}
                    onClick={() => handleStationClick(station)}
                  >
                    <CardContent className="p-4 flex flex-col items-center">
                      <div className="mb-2">{getStationIcon(station)}</div>

                      <h3 className="font-medium text-center mb-1">{station.name}</h3>

                      {getStatusBadge(station.status)}

                      <div className="mt-2 flex flex-wrap justify-center gap-2">
                        {station.time !== undefined && (
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

                      <div className="mt-3 flex gap-1">
                        {station.status === "in-use" && (
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-7 w-7 p-0"
                            onClick={(e) => {
                              e.stopPropagation()
                              // Handle pause action
                            }}
                          >
                            <Pause className="h-3 w-3" />
                          </Button>
                        )}

                        {station.status === "paused" && (
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-7 w-7 p-0"
                            onClick={(e) => {
                              e.stopPropagation()
                              // Handle play action
                            }}
                          >
                            <Play className="h-3 w-3" />
                          </Button>
                        )}

                        <Button
                          size="sm"
                          variant="outline"
                          className="h-7 text-xs"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleStationClick(station)
                          }}
                        >
                          Manage
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>

      <Dialog open={sessionDialogOpen} onOpenChange={setSessionDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-auto">
          {selectedStation && <SessionDetails station={selectedStation} onClose={() => setSessionDialogOpen(false)} />}
        </DialogContent>
      </Dialog>
    </>
  )
}
