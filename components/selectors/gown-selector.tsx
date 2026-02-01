"use client"

import type React from "react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { Check } from "lucide-react"
import { ItemData } from "@/lib/google-sheets-config"

export default function GownSelector({
  selections,
  setSelections,
  items
}: {
  selections: any
  setSelections: any
  items: ItemData[]
}) {
  const [customPrice, setCustomPrice] = useState<string>("")

  const handleCheckboxClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (selections.gown) {
      setSelections({
        ...selections,
        gown: null,
        gownPrice: 0,
      })
      setCustomPrice("")
    }
  }

  const handleSelect = (item: ItemData, optionIndex: number) => {
    const option = item.options[optionIndex]

    setSelections({
      ...selections,
      gown: {
        id: item.id,
        name: item.name,
        description: item.description,
        option: option.optionValues.join(", "),
        price: option.customPrice ? 0 : option.price,
        customPrice: option.customPrice,
      },
      gownPrice: option.customPrice ? 0 : option.price,
    })
    setCustomPrice("")
  }

  const handlePriceConfirm = () => {
    if (selections.gown?.customPrice && customPrice) {
      const price = Number.parseFloat(customPrice) || 0
      setSelections({
        ...selections,
        gownPrice: price,
      })
      setCustomPrice("")
    }
  }

  const isSelected = (item: ItemData, optionIndex: number) => {
    if (!selections.gown) return false
    const option = item.options[optionIndex]
    return (
      selections.gown.id === item.id &&
      selections.gown.option === option.optionValues.join(", ")
    )
  }

  return (
    <Card className="border-border cursor-pointer" onClick={handleCheckboxClick}>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-primary">Gown Selection</CardTitle>
            <CardDescription>Choose your bridal gown (mandatory)</CardDescription>
          </div>
          <div
            className={`flex-shrink-0 w-6 h-6 rounded border-2 flex items-center justify-center ml-4 ${selections.gown ? "bg-primary border-primary" : "border-border"
              }`}
          >
            {selections.gown && <Check className="h-4 w-4 text-white" />}
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4" onClick={(e) => e.stopPropagation()}>
        <div className="grid gap-3">
          {items.map((item) =>
            item.options.map((option, optionIndex) => {
              const selected = isSelected(item, optionIndex)
              const displayName = option.optionValues.length > 0
                ? `${item.name} - ${option.optionValues.join(" + ")}`
                : item.name

              return (
                <Button
                  key={`${item.id}-${optionIndex}`}
                  variant={selected ? "default" : "outline"}
                  onClick={() => handleSelect(item, optionIndex)}
                  className={`h-auto p-4 justify-start text-left flex flex-col items-start ${selected ? "bg-primary text-primary-foreground" : "hover:border-primary"
                    }`}
                >
                  <div className="font-semibold">{displayName}</div>
                  {option.description && (
                    <div className="text-xs opacity-80 mt-1">{option.description}</div>
                  )}
                </Button>
              )
            })
          )}
        </div>

        {selections.gown && items.find(item => item.id === selections.gown.id)?.options.find(opt => opt.optionValues.join(", ") === selections.gown.option)?.customPrice && (
          <div className="border-t pt-4 space-y-3">
            <label className="text-sm font-medium text-foreground">Enter gown price ($)</label>
            <div className="flex gap-2">
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
            {selections.gownPrice > 0 && (
              <p className="text-sm text-green-600 font-medium">Price set: ${selections.gownPrice}</p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
