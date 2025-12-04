"use client"

import type React from "react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { Check } from "lucide-react"

export default function GownSelector({ selections, setSelections }: any) {
  const folderOptions = [{ id: "folders", name: "1 Gown from Folder 1,2,3", price: 0 }]

  const [otherGownPrice, setOtherGownPrice] = useState<string>("")

  const handleSelectFolder = (gown: any) => {
    setSelections({
      ...selections,
      gown,
      gownPrice: 0,
      gownPriceType: "folder",
    })
  }

  const handleOtherGown = () => {
    const price = Number.parseFloat(otherGownPrice) || 0
    setSelections({
      ...selections,
      gown: { id: "other", name: "Other Gowns (Outside Folders)", price },
      gownPrice: price,
      gownPriceType: "other",
    })
  }

  const handleCheckboxClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (selections.gown) {
      setSelections({
        ...selections,
        gown: null,
        gownPrice: 0,
      })
    }
  }

  const isOtherGownSelected = selections.gown?.id === "other"

  return (
    <Card className="border-border cursor-pointer" onClick={handleCheckboxClick}>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-primary">Gown Selection</CardTitle>
            <CardDescription>Choose your bridal gown (mandatory)</CardDescription>
          </div>
          <div
            className={`flex-shrink-0 w-6 h-6 rounded border-2 flex items-center justify-center ml-4 ${
              selections.gown ? "bg-primary border-primary" : "border-border"
            }`}
          >
            {selections.gown && <Check className="h-4 w-4 text-white" />}
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4" onClick={(e) => e.stopPropagation()}>
        <div className="grid gap-3">
          {folderOptions.map((gown) => (
            <Button
              key={gown.id}
              variant={selections.gown?.id === gown.id ? "default" : "outline"}
              onClick={() => handleSelectFolder(gown)}
              className={`h-auto p-4 justify-start text-left flex flex-col items-start ${
                selections.gown?.id === gown.id ? "bg-primary text-primary-foreground" : "hover:border-primary"
              }`}
            >
              <div className="font-semibold">{gown.name}</div>
              <div className="text-xs text-gray-500 font-medium">Included in base package</div>
            </Button>
          ))}
        </div>

        <div className="border-t pt-4 space-y-3">
          <Button
            variant={isOtherGownSelected ? "default" : "outline"}
            onClick={() =>
              setSelections({ ...selections, gown: { id: "other", name: "Other Gowns (Outside Folders)" } })
            }
            className={`w-full h-auto p-4 justify-start text-left flex flex-col items-start ${
              isOtherGownSelected ? "bg-primary text-primary-foreground" : "hover:border-primary"
            }`}
          >
            <div className="font-semibold">Other Gowns (Outside Folders)</div>
            <div className="text-xs text-yellow-600 font-medium">Top Up Required</div>
          </Button>

          {isOtherGownSelected && (
            <div className="pl-4 space-y-2">
              <label className="text-sm font-medium text-foreground">Enter gown price ($)</label>
              <div className="flex gap-2">
                <Input
                  type="number"
                  placeholder="0"
                  value={otherGownPrice}
                  onChange={(e) => setOtherGownPrice(e.target.value)}
                  className="flex-1"
                />
                <Button onClick={handleOtherGown} className="bg-primary hover:bg-primary/90">
                  Confirm
                </Button>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
