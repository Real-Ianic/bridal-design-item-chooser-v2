"use client"

import type React from "react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState, useEffect } from "react"
import { Check } from "lucide-react"
import { HairMakeUpItemData } from "@/lib/google-sheets-config"

export default function HairMakeupSelector({
  selections,
  setSelections,
  items
}: {
  selections: any
  setSelections: any
  items: HairMakeUpItemData[]
}) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [customPriceInput, setCustomPriceInput] = useState<string>("")

  // Local state for hierarchical selection
  const [selectedVendorId, setSelectedVendorId] = useState<string | null>(null)
  const [selectedFreshLook, setSelectedFreshLook] = useState<string | null>(null)
  const [selectedClass, setSelectedClass] = useState<string | null>(null)

  // Initialize from props if already selected
  useEffect(() => {
    if (selections.hairMakeup && !selectedVendorId) {
      setSelectedVendorId(selections.hairMakeup.id)
      // We would need to parse back the options if we wanted to fully restore state,
      // but simpler for now to let user re-select if they open it
    }
  }, []) // Run once on mount

  const handleToggle = () => {
    if (isExpanded) {
      // Collapsing
      setIsExpanded(false)
    } else {
      // Expanding
      setIsExpanded(true)
    }
  }

  const resetSelection = () => {
    setSelections({
      ...selections,
      hairMakeup: null,
      hairMakeupPrice: 0,
    })
    setSelectedVendorId(null)
    setSelectedFreshLook(null)
    setSelectedClass(null)
    setCustomPriceInput("")
    setIsExpanded(false)
  }

  const handleCheckboxClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (selections.hairMakeup) {
      resetSelection()
    }
  }

  const handleVendorSelect = (item: HairMakeUpItemData) => {
    setSelectedVendorId(item.id)

    // Reset child selections when vendor changes
    setSelectedFreshLook(null)
    setSelectedClass(null)
    setCustomPriceInput("")

    // If no child options, we can select immediately
    if (item.freshLookOptions.length === 0 && item.classOptions.length === 0) {
      // Find the single option (usually index 0)
      const option = item.options[0]
      if (option) {
        updateSelection(item, option.price, option.customPrice, "")
      }
    } else {
      // Clear parent selection until child options are picked
      setSelections({
        ...selections,
        hairMakeup: null,
        hairMakeupPrice: 0,
      })
    }
  }

  const handleFreshLookSelect = (look: string) => {
    setSelectedFreshLook(look)
    checkAndCompleteSelection(selectedVendorId, look, selectedClass)
  }

  const handleClassSelect = (cls: string) => {
    setSelectedClass(cls)
    checkAndCompleteSelection(selectedVendorId, selectedFreshLook, cls)
  }

  const checkAndCompleteSelection = (vendorId: string | null, freshLook: string | null, cls: string | null) => {
    if (!vendorId) return

    const vendor = items.find(i => i.id === vendorId)
    if (!vendor) return

    // Check if we have all necessary selections
    // If exact match required (i.e. options exist), variable must be set
    const freshLookValid = vendor.freshLookOptions.length === 0 || freshLook !== null
    const classValid = vendor.classOptions.length === 0 || cls !== null

    if (freshLookValid && classValid) {
      // Find the specific matching option variant
      const match = vendor.options.find(opt =>
        (vendor.freshLookOptions.length === 0 || opt.freshLook === freshLook) &&
        (vendor.classOptions.length === 0 || opt.class === cls)
      )

      if (match) {
        // Construct option display string
        const optionParts = []
        if (match.freshLook) optionParts.push(match.freshLook)
        if (match.class) optionParts.push(match.class)
        const optionString = optionParts.join(" + ")

        updateSelection(vendor, match.price, match.customPrice, optionString)
      }
    }
  }

  const updateSelection = (item: HairMakeUpItemData, price: number, isCustom: boolean, optionString: string) => {
    setSelections({
      ...selections,
      hairMakeup: {
        id: item.id,
        name: item.name,
        description: item.description,
        option: optionString,
        price: isCustom ? 0 : price,
        customPrice: isCustom,
      },
      hairMakeupPrice: isCustom ? 0 : price,
    })
  }

  const handlePriceConfirm = () => {
    if (selections.hairMakeup && customPriceInput) {
      const price = Number.parseFloat(customPriceInput) || 0
      setSelections({
        ...selections,
        hairMakeupPrice: price,
      })
      setCustomPriceInput("")
    }
  }

  const activeVendor = items.find(i => i.id === selectedVendorId)

  return (
    <Card className="border-border">
      <CardHeader className="cursor-pointer" onClick={handleToggle}>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-primary">Hair & Makeup</CardTitle>
            <CardDescription>Select your hair and makeup artist</CardDescription>
          </div>
          <div
            onClick={handleCheckboxClick}
            className={`flex-shrink-0 w-6 h-6 rounded border-2 flex items-center justify-center ml-4 cursor-pointer ${selections.hairMakeup ? "bg-primary border-primary" : "border-border"
              }`}
          >
            {selections.hairMakeup && <Check className="h-4 w-4 text-white" />}
          </div>
        </div>
      </CardHeader>

      {isExpanded && (
        <CardContent className="space-y-6">
          {/* 1. Vendor Selection */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-foreground block">
              Select Artist/Vendor:
            </label>
            <div className="grid gap-2">
              {items.map((item) => (
                <Button
                  key={item.id}
                  variant={selectedVendorId === item.id ? "default" : "outline"}
                  onClick={() => handleVendorSelect(item)}
                  className={`justify-start text-left h-auto p-3 ${selectedVendorId === item.id
                      ? "bg-primary text-primary-foreground"
                      : "hover:border-primary"
                    }`}
                >
                  <div className="font-semibold">{item.name}</div>
                </Button>
              ))}
            </div>
          </div>

          {/* 2. Hierarchical attribute selectors (shown only if vendor selected) */}
          {activeVendor && (
            <>
              {/* Fresh Look Selector */}
              {activeVendor.freshLookOptions.length > 0 && (
                <div className="space-y-3 animate-in fade-in slide-in-from-top-2 duration-300">
                  <label className="text-sm font-medium text-foreground block">
                    Fresh Looks:
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {activeVendor.freshLookOptions.map((opt) => (
                      <Button
                        key={opt}
                        variant={selectedFreshLook === opt ? "default" : "outline"}
                        onClick={() => handleFreshLookSelect(opt)}
                        size="sm"
                        className={selectedFreshLook === opt ? "bg-primary text-primary-foreground" : ""}
                      >
                        {opt}
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              {/* Class Selector */}
              {activeVendor.classOptions.length > 0 && (
                <div className="space-y-3 animate-in fade-in slide-in-from-top-2 duration-300">
                  <label className="text-sm font-medium text-foreground block">
                    Artist Tier/Class:
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {activeVendor.classOptions.map((opt) => (
                      <Button
                        key={opt}
                        variant={selectedClass === opt ? "default" : "outline"}
                        onClick={() => handleClassSelect(opt)}
                        size="sm"
                        className={selectedClass === opt ? "bg-primary text-primary-foreground" : ""}
                      >
                        {opt}
                      </Button>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}

          {/* Custom Price Input */}
          {selections.hairMakeup?.customPrice && (
            <div className="border-t pt-4 space-y-3 animate-in fade-in slide-in-from-top-2">
              <label className="text-sm font-medium text-foreground">
                Enter price for {selections.hairMakeup.name} ($)
              </label>
              <div className="flex gap-2">
                <Input
                  type="number"
                  placeholder="0"
                  value={customPriceInput}
                  onChange={(e) => setCustomPriceInput(e.target.value)}
                  className="flex-1"
                />
                <Button onClick={handlePriceConfirm} className="bg-primary hover:bg-primary/90">
                  Confirm
                </Button>
              </div>
              {selections.hairMakeupPrice > 0 && (
                <p className="text-sm text-green-600 font-medium">Price set: ${selections.hairMakeupPrice}</p>
              )}
            </div>
          )}
        </CardContent>
      )}

      {/* Summary View (Collapsed) */}
      {selections.hairMakeup && !isExpanded && (
        <CardContent className="text-sm border-t pt-3 space-y-2">
          <p>
            <span className="font-semibold">Selected:</span> {selections.hairMakeup.name}
            {selections.hairMakeup.option && ` - ${selections.hairMakeup.option}`}
          </p>
          {selections.hairMakeupPrice > 0 && (
            <p>
              <span className="font-semibold">Price:</span> ${selections.hairMakeupPrice}
            </p>
          )}
        </CardContent>
      )}
    </Card>
  )
}
