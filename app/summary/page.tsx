"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"
import { Suspense } from "react"
import Header from "@/components/header"

function SummaryContent() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const basePrice = 7088

  // Parse selections from URL params
  const selections = {
    gown: searchParams.get("gown") ? JSON.parse(decodeURIComponent(searchParams.get("gown") || "")) : null,
    gownPrice: Number(searchParams.get("gownPrice") || 0),
    photography: searchParams.get("photography")
      ? JSON.parse(decodeURIComponent(searchParams.get("photography") || ""))
      : null,
    videography: searchParams.get("videography")
      ? JSON.parse(decodeURIComponent(searchParams.get("videography") || ""))
      : null,
    hairMakeup: searchParams.get("hairMakeup")
      ? JSON.parse(decodeURIComponent(searchParams.get("hairMakeup") || ""))
      : null,
    freshLooks: Number(searchParams.get("freshLooks") || 1),
    florist: searchParams.get("florist") === "true",
  }

  const calculatePrice = () => {
    let total = basePrice
    if (selections.gownPrice) total += selections.gownPrice
    if (selections.photography?.topUp) total += selections.photography.topUp
    if (selections.videography?.topUp) total += selections.videography.topUp
    if (selections.hairMakeup?.topUp) total += selections.hairMakeup.topUp
    if (selections.freshLooks === 2) total += 500
    return total
  }

  const totalPrice = calculatePrice()

  return (
    <main className="min-h-screen bg-background">
      <Header />
      <div className="max-w-2xl mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">Package Summary</h2>
          <p className="text-muted-foreground">Review your selected services</p>
        </div>

        <div className="grid gap-4">
          {/* Gown */}
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-lg text-primary">Gown</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-semibold text-foreground">{selections.gown?.name}</p>
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
              <CardContent>
                <p className="font-semibold text-foreground">{selections.photography.name}</p>
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
              <CardContent>
                <p className="font-semibold text-foreground">{selections.videography.name}</p>
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
              <CardContent className="space-y-1">
                <p className="font-semibold text-foreground">{selections.hairMakeup.vendor}</p>
                <p className="text-sm text-foreground">{selections.hairMakeup.name}</p>
                {selections.freshLooks === 2 && <p className="text-sm text-foreground">Fresh Looks: 2</p>}
                {selections.freshLooks === 1 && <p className="text-sm text-foreground">Fresh Looks: 1</p>}
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
                <p className="text-sm text-foreground">Included</p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Total Investment */}
        <Card className="border-primary bg-accent mt-8">
          <CardContent className="pt-6">
            <div className="flex justify-between items-center">
              <span className="text-xl font-semibold text-accent-foreground">Total Investment</span>
              <span className="text-3xl font-bold text-accent-foreground">${totalPrice.toLocaleString()}</span>
            </div>
          </CardContent>
        </Card>

        <div className="mt-6">
          <Button onClick={() => router.back()} variant="outline" className="w-full">
            Back to Customization
          </Button>
        </div>
      </div>
    </main>
  )
}

export default function SummaryPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SummaryContent />
    </Suspense>
  )
}
