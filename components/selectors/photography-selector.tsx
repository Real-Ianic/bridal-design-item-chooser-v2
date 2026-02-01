"use client"

import type React from "react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { Check } from "lucide-react"
import { ItemData } from "@/lib/google-sheets-config"

export default function PhotographySelector({
  selections,
  setSelections,
  items
}: {
  selections: any
  setSelections: any
  items: ItemData[]
}) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [customPrice, setCustomPrice] = useState<string>("")
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(null)

  const handleToggle = () => {
    if (isExpanded) {
      setSelections({
        ...selections,
        photography: null,
        photographyPrice: 0,
      })
      setIsExpanded(false)
      setCustomPrice("")
      setSelectedOptionIndex(null)
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
        photographyPrice: 0,
      })
      setIsExpanded(false)
      setCustomPrice("")
      setSelectedOptionIndex(null)
    }
  }

  const handleSelect = (item: ItemData, optionIndex: number) => {
    const option = item.options[optionIndex]

    setSelections({
      ...selections,
      photography: {
        id: item.id,
        name: item.name,
        description: item.description,
        option: option.optionValues.join(", "),
        price: option.customPrice ? 0 : option.price,
        customPrice: option.customPrice,
      },
      photographyPrice: option.customPrice ? 0 : option.price,
    })
    setSelectedOptionIndex(optionIndex)
    setCustomPrice("")
  }

  const handlePriceConfirm = () => {
    if (selections.photography && customPrice) {
      const price = Number.parseFloat(customPrice) || 0
      setSelections({
        ...selections,
        photographyPrice: price,
      })
      setCustomPrice("")
    }
  }

  const isSelected = (item: ItemData, optionIndex: number) => {
    if (!selections.photography) return false
    const option = item.options[optionIndex]
    return (
      selections.photography.id === item.id &&
      selections.photography.option === option.optionValues.join(", ")
    )
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
            className={`flex-shrink-0 w-6 h-6 rounded border-2 flex items-center justify-center ml-4 cursor-pointer ${selections.photography ? "bg-primary border-primary" : "border-border"
              }`}
          >
            {selections.photography && <Check className="h-4 w-4 text-white" />}
          </div>
        </div>
      </CardHeader>

      {isExpanded && (
        <CardContent className="space-y-3">
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

          {selections.photography && items.find(item => item.id === selections.photography.id)?.options.find(opt => opt.optionValues.join(", ") === selections.photography.option)?.customPrice && (
            <div className="border-t pt-4 space-y-3">
              <label className="text-sm font-medium text-foreground">
                Enter price for {selections.photography.name} ($)
              </label>
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
              {selections.photographyPrice > 0 && (
                <p className="text-sm text-green-600 font-medium">Price set: ${selections.photographyPrice}</p>
              )}
            </div>
          )}
        </CardContent>
      )}

      {selections.photography && !isExpanded && (
        <CardContent className="text-sm border-t pt-3 space-y-2">
          <p>
            <span className="font-semibold">Selected:</span> {selections.photography.name}
            {selections.photography.option && ` - ${selections.photography.option}`}
          </p>
          {selections.photographyPrice > 0 && (
            <p>
              <span className="font-semibold">Price:</span> ${selections.photographyPrice}
            </p>
          )}
        </CardContent>
      )}
    </Card>
  )
}
