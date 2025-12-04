import Image from "next/image"

export default function Header() {
  return (
    <header className="bg-white border-b border-border">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center">
          <Image
            src="/images/the-proposal-logo.png"
            alt="The Proposal Logo"
            width={250}
            height={60}
            className="h-auto"
          />
        </div>
      </div>
    </header>
  )
}
