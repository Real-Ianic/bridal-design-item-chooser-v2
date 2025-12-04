"use client"

import type React from "react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { Check } from "lucide-react"
import { PRICING_CONFIG } from "@/lib/pricing-config"

const videographyOptions = Object.values(PRICING_CONFIG.videography)

export default function VideographySelector({ selections, setSelections }: any) {
  const [isExpanded, setIsExpanded] = useState(false)

  const handleToggle = () => {
    if (isExpanded) {
      setSelections({
        ...selections,
        videography: null,
      })
      setIsExpanded(false)
    } else {
      setIsExpanded(true)
    }
  }

  const handleCheckboxClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (selections.videography) {
      setSelections({
        ...selections,
        videography: null,
      })
      setIsExpanded(false)
    }
  }

  const handleSelect = (videography: any) => {
    setSelections({
      ...selections,
      videography,
    })
  }

  return (
    <Card className="border-border">
      <CardHeader className="cursor-pointer" onClick={handleToggle}>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-primary">Videography</CardTitle>
            <CardDescription>Choose your videographer</CardDescription>
          </div>
          <div
            onClick={handleCheckboxClick}
            className={`flex-shrink-0 w-6 h-6 rounded border-2 flex items-center justify-center ml-4 cursor-pointer ${
              selections.videography ? "bg-primary border-primary" : "border-border"
            }`}
          >
            {selections.videography && <Check className="h-4 w-4 text-white" />}
          </div>
        </div>
      </CardHeader>

      {isExpanded && (
        <CardContent className="space-y-3">
          <div className="grid gap-3">
            {videographyOptions.map((video) => (
              <Button
                key={video.id}
                variant={selections.videography?.id === video.id ? "default" : "outline"}
                onClick={() => handleSelect(video)}
                className={`h-auto p-4 justify-start text-left flex flex-col items-start ${
                  selections.videography?.id === video.id
                    ? "bg-primary text-primary-foreground"
                    : "hover:border-primary"
                }`}
              >
                <div className="font-semibold">{video.name}</div>
                {video.topUp > 0 ? (
                  <div className="text-xs text-yellow-600 font-medium">Top Up Required</div>
                ) : (
                  <div className="text-xs text-gray-500 font-medium">Included in base package</div>
                )}
              </Button>
            ))}
          </div>
        </CardContent>
      )}

      {selections.videography && !isExpanded && (
        <CardContent className="text-sm border-t pt-3">
          <p>
            <span className="font-semibold">Selected:</span> {selections.videography.name}
          </p>
        </CardContent>
      )}
    </Card>
  )
}
