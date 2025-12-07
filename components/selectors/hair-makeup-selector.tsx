"use client"

import type React from "react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { ChevronDown, Check } from "lucide-react"
import { PRICING_CONFIG } from "@/lib/pricing-config"

const hairMakeupVendors = Object.values(PRICING_CONFIG.hairMakeup).map((vendor, index) => ({
  id: index + 1,
  vendor: vendor.vendor,
  options: vendor.options,
}))

export default function HairMakeupSelector({ selections, setSelections }: any) {
  const [expandedVendor, setExpandedVendor] = useState<number | null>(null)
  const [expandedFreshLooks, setExpandedFreshLooks] = useState(false)

  const handleSelect = (option: any, vendor: string) => {
    setSelections({
      ...selections,
      hairMakeup: {
        ...option,
        vendor,
      },
      freshLooks: 1,
    })
  }

  const handleFreshLooksSelect = (count: number) => {
    setSelections({
      ...selections,
      freshLooks: count,
    })
  }

  const handleVendorToggle = (vendorId: number) => {
    if (expandedVendor === vendorId) {
      if (selections.hairMakeup?.vendor === hairMakeupVendors.find((v) => v.id === vendorId)?.vendor) {
        setSelections({
          ...selections,
          hairMakeup: null,
        })
      }
      setExpandedVendor(null)
    } else {
      setExpandedVendor(vendorId)
    }
  }

  const handleCheckboxClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (selections.hairMakeup) {
      setSelections({
        ...selections,
        hairMakeup: null,
        freshLooks: 0,
      })
      setExpandedVendor(null)
      setExpandedFreshLooks(false)
    }
  }

  const isSelected = !!selections.hairMakeup || (selections.freshLooks ?? 0) > 0

  return (
    <Card className="border-border">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-primary">Hair & Make-up</CardTitle>
            <CardDescription>Select your make-up artist and fresh looks</CardDescription>
          </div>
          <div
            onClick={handleCheckboxClick}
            className={`flex-shrink-0 w-6 h-6 rounded border-2 flex items-center justify-center ml-4 cursor-pointer ${isSelected ? "bg-primary border-primary" : "border-border"
              }`}
          >
            {isSelected && <Check className="h-4 w-4 text-white" />}
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-3">
          {hairMakeupVendors.map((vendor) => (
            <div key={vendor.id} className="space-y-2">
              <Button
                variant="outline"
                onClick={() => handleVendorToggle(vendor.id)}
                className="w-full justify-between"
              >
                <span className="font-semibold">{vendor.vendor}</span>
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${expandedVendor === vendor.id ? "rotate-180" : ""}`}
                />
              </Button>

              {expandedVendor === vendor.id && (
                <div className="pl-4 space-y-2 border-l-2 border-primary">
                  {vendor.options.map((option) => (
                    <Button
                      key={option.id}
                      variant={selections.hairMakeup?.id === option.id ? "default" : "outline"}
                      onClick={() => handleSelect(option, vendor.vendor)}
                      className={`w-full justify-start text-left text-sm h-auto p-3 flex flex-col items-start ${selections.hairMakeup?.id === option.id
                        ? "bg-primary text-primary-foreground"
                        : "hover:border-primary"
                        }`}
                    >
                      <span className="font-semibold">{option.name}</span>
                      {option.topUp > 0 ? (
                        <span className="text-xs text-yellow-600 font-medium">Top Up Required</span>
                      ) : (
                        <span className="text-xs text-gray-500 font-medium">Included in base package</span>
                      )}
                    </Button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="border-t pt-4">
          <Button
            variant="outline"
            onClick={() => setExpandedFreshLooks(!expandedFreshLooks)}
            className="w-full justify-between"
          >
            <span className="font-semibold">Fresh Looks</span>
            <ChevronDown className={`h-4 w-4 transition-transform ${expandedFreshLooks ? "rotate-180" : ""}`} />
          </Button>

          {expandedFreshLooks && (
            <div className="mt-2 pl-4 space-y-2 border-l-2 border-primary">
              <Button
                variant={selections.freshLooks === 1 ? "default" : "outline"}
                onClick={() => handleFreshLooksSelect(1)}
                className={`w-full justify-start text-left text-sm h-auto p-3 flex flex-col items-start ${selections.freshLooks === 1 ? "bg-primary text-primary-foreground" : "hover:border-primary"
                  }`}
              >
                <span className="font-semibold">Fresh Looks - 1 Look</span>
                <span className="text-xs text-gray-500 font-medium">Included in base package</span>
              </Button>
              <Button
                variant={selections.freshLooks === 2 ? "default" : "outline"}
                onClick={() => handleFreshLooksSelect(2)}
                className={`w-full justify-start text-left text-sm h-auto p-3 flex flex-col items-start ${selections.freshLooks === 2 ? "bg-primary text-primary-foreground" : "hover:border-primary"
                  }`}
              >
                <span className="font-semibold">Fresh Looks - 2 Looks</span>
                <span className="text-xs text-yellow-600 font-medium">Top Up Required</span>
              </Button>
            </div>
          )}
        </div>

        {isSelected && (
          <div className="border-t pt-3 text-sm">
            {selections.hairMakeup && (
              <p className="text-foreground">
                <span className="font-semibold">MUA:</span> {selections.hairMakeup.vendor} -{" "}
                {selections.hairMakeup.name}
              </p>
            )}
            {selections.freshLooks && (
              <p className="text-foreground mt-1">
                <span className="font-semibold">Fresh Looks:</span> {selections.freshLooks}{" "}
                {selections.freshLooks === 1 ? "Look" : "Looks"}
              </p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
