import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const packageDetails = [
  {
    category: "Gown",
    vendor: "THE PROPOSAL",
    includes: ["Gown rental: 1 gown from folder 1, 2, 3", "Others (top-up required)"],
  },
  {
    category: "Photography",
    vendor: "KENT WONG",
    includes: ["8 hours Photography", "Post-wedding slideshow in HD", "No physical album"],
  },
  {
    category: "Videography",
    vendor: "STEPH LEE FILMS",
    includes: ["8 hours Videography", "Post-wedding Highlights in HD"],
  },
  {
    category: "Hair & Make-up",
    vendor: "AUTELIER MAKE-UP / ALYCIA TAN / THE MAKE-UP ROOM",
    includes: [
      "Wedding Day Hair & Make-up",
      "1 fresh look",
      "2 fresh looks (top-up required)",
      "Trial session not included",
    ],
  },
  {
    category: "Florist",
    vendor: "THE FLORAL ATELIER",
    includes: ["Bridal Bouquet", "Groom's Boutonniere", "Bridal Car Floral (car door & bonnet)"],
  },
]

export default function PackageDetails() {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold text-foreground">What's Included</h2>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {packageDetails.map((detail) => (
          <Card key={detail.category} className="border-border">
            <CardHeader>
              <CardTitle className="text-primary">{detail.category}</CardTitle>
              <CardDescription className="text-sm font-medium">{detail.vendor}</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {detail.includes.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm">
                    <span className="text-primary mt-1">•</span>
                    <span className="text-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
