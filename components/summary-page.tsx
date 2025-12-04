"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"

export default function SummaryPage({ selections, onBack }: any) {
  const basePrice = 7088

  const calculatePrice = () => {
    let total = basePrice
    if (selections.gownPrice) total += selections.gownPrice
    if (selections.photography?.topUp) total += selections.photography.topUp
    if (selections.videography?.topUp) total += selections.videography.topUp
    if (selections.hairMakeup?.topUp) total += selections.hairMakeup.topUp
    if (selections.hairMakeupLooks === 2) total += 500
    return total
  }

  const totalPrice = calculatePrice()

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-foreground mb-2">Package Summary</h2>
        <p className="text-muted-foreground">Review your selected services and pricing</p>
      </div>

      <div className="grid gap-4">
        {/* Gown */}
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="text-lg text-primary">Gown</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="font-semibold">{selections.gown.name}</p>
            {selections.gownPrice > 0 && <p className="text-sm text-muted-foreground">${selections.gownPrice}</p>}
          </CardContent>
        </Card>

        {/* Photography */}
        {selections.photography && (
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-lg text-primary flex items-center gap-2">
                <Check className="h-5 w-5 text-green-600" />
                Photography
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="font-semibold">{selections.photography.name}</p>
              {selections.photography.topUp > 0 && (
                <p className="text-sm text-muted-foreground">${selections.photography.topUp} top-up</p>
              )}
            </CardContent>
          </Card>
        )}

        {/* Videography */}
        {selections.videography && (
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-lg text-primary flex items-center gap-2">
                <Check className="h-5 w-5 text-green-600" />
                Videography
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="font-semibold">{selections.videography.name}</p>
              {selections.videography.topUp > 0 && (
                <p className="text-sm text-muted-foreground">${selections.videography.topUp} top-up</p>
              )}
            </CardContent>
          </Card>
        )}

        {/* Hair & Makeup */}
        {selections.hairMakeup && (
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-lg text-primary flex items-center gap-2">
                <Check className="h-5 w-5 text-green-600" />
                Hair & Make-up
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="font-semibold">{selections.hairMakeup.vendor}</p>
              <p className="text-sm">{selections.hairMakeup.name}</p>
              {selections.hairMakeup.topUp > 0 && (
                <p className="text-sm text-muted-foreground">${selections.hairMakeup.topUp} top-up</p>
              )}
              {selections.hairMakeupLooks === 2 && (
                <p className="text-sm text-muted-foreground">Fresh Looks (2) - $500 top-up</p>
              )}
            </CardContent>
          </Card>
        )}

        {/* Florist */}
        {selections.florist && (
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-lg text-primary flex items-center gap-2">
                <Check className="h-5 w-5 text-green-600" />
                Florist Services
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm">Included in package</p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Pricing Breakdown */}
      <Card className="border-primary bg-accent">
        <CardHeader>
          <CardTitle className="text-primary">Pricing Breakdown</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex justify-between">
            <span>Base Package</span>
            <span>${basePrice}</span>
          </div>
          {selections.gownPrice > 0 && (
            <div className="flex justify-between">
              <span>Gown Selection</span>
              <span>${selections.gownPrice}</span>
            </div>
          )}
          {selections.photography?.topUp > 0 && (
            <div className="flex justify-between">
              <span>Photography Top-up</span>
              <span>${selections.photography.topUp}</span>
            </div>
          )}
          {selections.videography?.topUp > 0 && (
            <div className="flex justify-between">
              <span>Videography Top-up</span>
              <span>${selections.videography.topUp}</span>
            </div>
          )}
          {selections.hairMakeup?.topUp > 0 && (
            <div className="flex justify-between">
              <span>Hair & Make-up Top-up</span>
              <span>${selections.hairMakeup.topUp}</span>
            </div>
          )}
          {selections.hairMakeupLooks === 2 && (
            <div className="flex justify-between">
              <span>Fresh Looks (2)</span>
              <span>$500</span>
            </div>
          )}
          <div className="border-t pt-2 flex justify-between text-lg font-bold text-primary">
            <span>Total</span>
            <span>${totalPrice.toLocaleString()}</span>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-2 gap-3">
        <Button variant="outline" onClick={onBack} className="col-span-2 bg-transparent">
          Back to Customization
        </Button>
      </div>
    </div>
  )
}
