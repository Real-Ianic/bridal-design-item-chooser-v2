"use client"

import type React from "react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Check } from "lucide-react"
import { useState } from "react"

export default function FloristSelector({ selections, setSelections }: any) {
  const [customPrice, setCustomPrice] = useState<string>("")

  const handleToggle = () => {
    setSelections({
      ...selections,
      florist: !selections.florist,
      floristPrice: !selections.florist ? 0 : selections.floristPrice,
    })
    setCustomPrice("")
  }

  const handleCheckboxClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    setSelections({
      ...selections,
      florist: !selections.florist,
      floristPrice: !selections.florist ? 0 : selections.floristPrice,
    })
    setCustomPrice("")
  }

  const handlePriceConfirm = () => {
    if (selections.florist && customPrice) {
      const price = Number.parseFloat(customPrice) || 0
      setSelections({
        ...selections,
        floristPrice: price,
      })
      setCustomPrice("")
    }
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
            className={`flex-shrink-0 w-6 h-6 rounded border-2 flex items-center justify-center ml-4 cursor-pointer ${selections.florist ? "bg-primary border-primary" : "border-border"
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
        <CardContent className="space-y-3 border-t pt-3">
          <div>
            <label className="text-sm font-medium text-foreground">Enter florist service price ($)</label>
            <div className="flex gap-2 mt-2">
              <Input
                type="number"
                placeholder="0"
                value={customPrice}
                onChange={(e) => setCustomPrice(e.target.value)}
                className="flex-1"
              />
              <Button onClick={handlePriceConfirm} className="bg-primary hover:bg-primary/90">
                Confirm
              </Button>
            </div>
            {selections.floristPrice > 0 && (
              <p className="text-sm text-green-600 font-medium mt-2">Price set: ${selections.floristPrice}</p>
            )}
          </div>
          <div className="text-sm border-t pt-3">
            <p>
              <span className="font-semibold">Status:</span> Florist Service Included
            </p>
          </div>
        </CardContent>
      )}
    </Card>
  )
}
