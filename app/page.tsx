"use client"

import { useState, useEffect } from "react"
import PackageConfigurator from "@/components/package-configurator"
import OrderSummary from "@/components/order-summary"
import Header from "@/components/header"

// Import the shared Selections type
import { Selections } from "@/lib/selections"
import { fetchAllPricingData, type PricingData } from "@/lib/google-sheets-service"

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)
  const [pricingData, setPricingData] = useState<PricingData | null>(null)

  // Update the selections state with the shared Selections type
  const [selections, setSelections] = useState<Selections>({
    gown: null,
    gownPrice: 0,
    photography: null,
    photographyPrice: 0,
    videography: null,
    videographyPrice: 0,
    hairMakeup: null,
    hairMakeupPrice: 0,
    florist: false,
    floristData: null,
    floristPrice: 0,
    hairMakeupLooks: 1,
    freshLooks: 1,
  })

  // Fetch pricing data from Google Sheets on mount
  useEffect(() => {
    async function loadPricingData() {
      setIsLoading(true)
      try {
        const data = await fetchAllPricingData()
        setPricingData(data)
      } catch (error) {
        console.error("Failed to load pricing data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadPricingData()
  }, [])

  const calculatePrice = () => {
    let total = 0
    if (selections.gownPrice) total += selections.gownPrice
    if (selections.photographyPrice) total += selections.photographyPrice
    if (selections.videographyPrice) total += selections.videographyPrice
    if (selections.hairMakeupPrice) total += selections.hairMakeupPrice
    if (selections.floristPrice) total += selections.floristPrice
    return total
  }

  const isPackageComplete = () => {
    const hasGown = !!selections.gown
    const hasOtherService =
      !!selections.photography || !!selections.videography || !!selections.hairMakeup || selections.florist

    return hasGown && hasOtherService
  }

  if (isLoading) {
    return (
      <main className="min-h-screen bg-background">
        <Header />
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            <p className="mt-4 text-muted-foreground">Loading pricing data...</p>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background">
      <Header />
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance" style={{ fontFamily: 'Caviar Dreams' }}>
            Actual Day Package
          </h1>
          <p className="text-base md:text-lg text-muted-foreground">
            Create your perfect wedding package starting from $7,088. Choose from our curated selection of premium
            vendors and customize every detail of your special day.
          </p>
        </div>

        <div className="grid gap-8">
          <div className="lg:col-span-2">
            <PackageConfigurator
              selections={selections}
              setSelections={setSelections}
              pricingData={pricingData}
            />
          </div>
          <div>
            <OrderSummary selections={selections} totalPrice={calculatePrice()} isComplete={isPackageComplete()} />
          </div>
        </div>
      </div>
    </main>
  )
}
