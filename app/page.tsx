"use client"

import { useState } from "react"
import PackageConfigurator from "@/components/package-configurator"
import OrderSummary from "@/components/order-summary"
import Header from "@/components/header"

// Import the shared Selections type
import { Selections } from "@/lib/selections"

export default function Home() {
  // Update the selections state with the shared Selections type
  const [selections, setSelections] = useState<Selections>({
    gown: null,
    gownPrice: 0,
    photography: null,
    videography: null,
    hairMakeup: null,
    florist: false,
    hairMakeupLooks: 1,
    freshLooks: 1, // Default value to match the shared type
  })

  const basePrice = 7088

  const calculatePrice = () => {
    let total = basePrice
    if (selections.gownPrice) total += selections.gownPrice
    if (selections.photography?.price) total += selections.photography.price
    if (selections.videography?.price) total += selections.videography.price
    if (selections.hairMakeup?.price) total += selections.hairMakeup.price
    if (selections.hairMakeupLooks === 2) total += 500 // Example top-up for 2 fresh looks
    return total
  }

  const isPackageComplete = () => {
    const hasGown = !!selections.gown
    const hasOtherService =
      !!selections.photography || !!selections.videography || !!selections.hairMakeup || selections.florist

    return hasGown && hasOtherService
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
            <PackageConfigurator selections={selections} setSelections={setSelections} />
          </div>
          <div>
            <OrderSummary selections={selections} totalPrice={calculatePrice()} isComplete={isPackageComplete()} />
          </div>
        </div>
      </div>
    </main>
  )
}
