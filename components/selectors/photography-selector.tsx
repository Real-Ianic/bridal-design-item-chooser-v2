"use client"

import type React from "react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { Check } from "lucide-react"
import { PRICING_CONFIG } from "@/lib/pricing-config"

const photographyOptions = Object.values(PRICING_CONFIG.photography)

export default function PhotographySelector({ selections, setSelections }: any) {
  const [isExpanded, setIsExpanded] = useState(false)

  const handleToggle = () => {
    if (isExpanded) {
      setSelections({
        ...selections,
        photography: null,
      })
      setIsExpanded(false)
    } else {
      setIsExpanded(true)
    }
  }

  const handleCheckboxClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (selections.photography) {
      setSelections({
        ...selections,
        photography: null,
      })
      setIsExpanded(false)
    }
  }

  const handleSelect = (photography: any) => {
    setSelections({
      ...selections,
      photography,
    })
  }

  return (
    <Card className="border-border">
      <CardHeader className="cursor-pointer" onClick={handleToggle}>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-primary">Photography</CardTitle>
            <CardDescription>Select your photographer</CardDescription>
          </div>
          <div
            onClick={handleCheckboxClick}
            className={`flex-shrink-0 w-6 h-6 rounded border-2 flex items-center justify-center ml-4 cursor-pointer ${
              selections.photography ? "bg-primary border-primary" : "border-border"
            }`}
          >
            {selections.photography && <Check className="h-4 w-4 text-white" />}
          </div>
        </div>
      </CardHeader>

      {isExpanded && (
        <CardContent className="space-y-3">
          <div className="grid gap-3">
            {photographyOptions.map((photo) => (
              <Button
                key={photo.id}
                variant={selections.photography?.id === photo.id ? "default" : "outline"}
                onClick={() => handleSelect(photo)}
                className={`h-auto p-4 justify-start text-left flex flex-col items-start ${
                  selections.photography?.id === photo.id
                    ? "bg-primary text-primary-foreground"
                    : "hover:border-primary"
                }`}
              >
                <div className="font-semibold">{photo.name}</div>
                {photo.topUp > 0 ? (
                  <div className="text-xs text-yellow-600 font-medium">Top Up Required</div>
                ) : (
                  <div className="text-xs text-gray-500 font-medium">Included in base package</div>
                )}
              </Button>
            ))}
          </div>
        </CardContent>
      )}

      {selections.photography && !isExpanded && (
        <CardContent className="text-sm border-t pt-3">
          <p>
            <span className="font-semibold">Selected:</span> {selections.photography.name}
          </p>
        </CardContent>
      )}
    </Card>
  )
}
