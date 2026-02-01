"use client"

import type React from "react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Check } from "lucide-react"
import { useState } from "react"
import { ItemData } from "@/lib/google-sheets-config"

export default function FloristSelector({
  selections,
  setSelections,
  items
}: {
  selections: any
  setSelections: any
  items: ItemData[]
}) {
  const [customPrice, setCustomPrice] = useState<string>("")
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(null)

  const handleToggle = () => {
    setSelections({
      ...selections,
      florist: !selections.florist,
      floristPrice: !selections.florist ? 0 : selections.floristPrice,
    })
    setCustomPrice("")
    setSelectedOptionIndex(null)
  }

  const handleCheckboxClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    setSelections({
      ...selections,
      florist: !selections.florist,
      floristPrice: !selections.florist ? 0 : selections.floristPrice,
    })
    setCustomPrice("")
    setSelectedOptionIndex(null)
  }

  const handleSelect = (item: ItemData, optionIndex: number) => {
    const option = item.options[optionIndex]

    setSelections({
      ...selections,
      florist: true,
      floristData: {
        id: item.id,
        name: item.name,
        description: item.description,
        option: option.optionValues.join(", "),
        price: option.customPrice ? 0 : option.price,
        customPrice: option.customPrice,
      },
      floristPrice: option.customPrice ? 0 : option.price,
    })
    setSelectedOptionIndex(optionIndex)
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

  const isSelected = (item: ItemData, optionIndex: number) => {
    if (!selections.floristData) return false
    const option = item.options[optionIndex]
    return (
      selections.floristData.id === item.id &&
      selections.floristData.option === option.optionValues.join(", ")
    )
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

      {selections.florist && (
        <CardContent className="space-y-3 border-t pt-3">
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
                    className={`h-auto p-4 justify-start text-left flex flex-col items-start ${selected
                      ? "bg-primary text-primary-foreground"
                      : "hover:border-primary"
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

          {selections.floristData && items.find(item => item.id === selections.floristData.id)?.options.find(opt => opt.optionValues.join(", ") === selections.floristData.option)?.customPrice && (
            <div className="border-t pt-4 space-y-3">
              <label className="text-sm font-medium text-foreground">Enter florist service price ($)</label>
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
              {selections.floristPrice > 0 && (
                <p className="text-sm text-green-600 font-medium">Price set: ${selections.floristPrice}</p>
              )}
            </div>
          )}

          {selections.floristData && (
            <div className="text-sm border-t pt-3">
              <p>
                <span className="font-semibold">Selected:</span> {selections.floristData.name}
                {selections.floristData.option && ` - ${selections.floristData.option}`}
              </p>
              {selections.floristPrice > 0 && (
                <p className="mt-1">
                  <span className="font-semibold">Price:</span> ${selections.floristPrice}
                </p>
              )}
            </div>
          )}
        </CardContent>
      )}
    </Card>
  )
}
