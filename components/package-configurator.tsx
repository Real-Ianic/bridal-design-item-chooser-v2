"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import PackageDetails from "./package-details"
import GownSelector from "./selectors/gown-selector"
import PhotographySelector from "./selectors/photography-selector"
import VideographySelector from "./selectors/videography-selector"
import HairMakeupSelector from "./selectors/hair-makeup-selector"
import FloristSelector from "./selectors/florist-selector"
import Link from "next/link"
import { Selections } from "@/lib/selections"

export default function PackageConfigurator({
  selections,
  setSelections,
}: {
  selections: Selections
  setSelections: (s: Selections) => void
}) {
  const [showDetails, setShowDetails] = useState(true)

  const isPackageComplete = () => {
    const hasGown = !!selections.gown
    const hasOtherService =
      !!selections.photography || !!selections.videography || !!selections.hairMakeup || selections.florist

    return hasGown && hasOtherService
  }

  const createSummaryParams = () => {
    const params = new URLSearchParams()
    if (selections.gown) params.set("gown", JSON.stringify(selections.gown))
    params.set("gownPrice", selections.gownPrice.toString())
    if (selections.photography) params.set("photography", JSON.stringify(selections.photography))
    if (selections.videography) params.set("videography", JSON.stringify(selections.videography))
    if (selections.hairMakeup) params.set("hairMakeup", JSON.stringify(selections.hairMakeup))
    params.set("freshLooks", selections.freshLooks?.toString() || "1")
    params.set("florist", selections.florist.toString())
    return params.toString()
  }

  return (
    <div className="space-y-6">
      {showDetails ? (
        <>
          <PackageDetails />
          <Button
            onClick={() => setShowDetails(false)}
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90 h-12 text-base"
          >
            Start Customizing Your Package
          </Button>
        </>
      ) : (
        <>
          <GownSelector selections={selections} setSelections={setSelections} />
          <PhotographySelector selections={selections} setSelections={setSelections} />
          <VideographySelector selections={selections} setSelections={setSelections} />
          <HairMakeupSelector selections={selections} setSelections={setSelections} />
          <FloristSelector selections={selections} setSelections={setSelections} />

          <Link
            href={`/summary?${createSummaryParams()}`}
            className={`w-full bg-primary text-primary-foreground hover:bg-primary/90 h-12 text-base inline-flex items-center justify-center rounded-md font-medium transition-colors ${!isPackageComplete() ? "opacity-50 cursor-not-allowed pointer-events-none" : ""
              }`}
          >
            Review Your Package
          </Link>

          <Button variant="outline" onClick={() => setShowDetails(true)} className="w-full">
            Back to Package Details
          </Button>
        </>
      )}
    </div>
  )
}
