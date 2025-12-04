"use client"

import type React from "react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"

export default function FloristSelector({ selections, setSelections }: any) {
  const handleToggle = () => {
    setSelections({
      ...selections,
      florist: !selections.florist,
    })
  }

  const handleCheckboxClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    setSelections({
      ...selections,
      florist: !selections.florist,
    })
  }

  return (
    <Card className="border-border">
      <CardHeader className="cursor-pointer" onClick={handleToggle}>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-primary">Florist</CardTitle>
            <CardDescription>Add professional florist services</CardDescription>
          </div>
          <div
            onClick={handleCheckboxClick}
            className={`flex-shrink-0 w-6 h-6 rounded border-2 flex items-center justify-center ml-4 cursor-pointer ${
              selections.florist ? "bg-primary border-primary" : "border-border"
            }`}
          >
            {selections.florist && <Check className="h-4 w-4 text-white" />}
          </div>
        </div>
      </CardHeader>
      {!selections.florist && (
        <CardContent>
          <Button variant="outline" onClick={handleToggle} className="w-full bg-transparent">
            <span className="font-semibold">Add Florist Service</span>
          </Button>
        </CardContent>
      )}
      {selections.florist && (
        <CardContent className="text-sm border-t pt-3">
          <p>
            <span className="font-semibold">Status:</span> Florist Service Included
          </p>
        </CardContent>
      )}
    </Card>
  )
}
