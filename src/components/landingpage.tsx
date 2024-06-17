
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button"
import { SheetTrigger, SheetContent, Sheet } from "@/components/ui/sheet"
import  { SVGProps } from "react"
import { ConnectButton } from "@arweave-wallet-kit/react";


export function Landingpage() {
  return (
    <div className="flex flex-col min-h-[100dvh] bg-[#0D1117] text-gray-50">
      <header className="flex items-center justify-between px-6 py-4 border-b border-gray-700">
        <Link className="flex items-center gap-2" to="#">
          <RocketIcon className="w-6 h-6 text-[#9945FF]" />
          <span className="text-xl font-bold">AOFroms</span>
        </Link>
        <div className="flex items-center gap-4">
          <nav className="hidden md:flex items-center gap-4">
            <Link className="text-sm font-medium hover:text-[#9945FF] transition-colors" to="#">
              Features
            </Link>
            <Link className="text-sm font-medium hover:text-[#9945FF] transition-colors" to="#">
              Pricing
            </Link>
            <Link className="text-sm font-medium hover:text-[#9945FF] transition-colors" to="#">
              About
            </Link>
            <Link className="text-sm font-medium hover:text-[#9945FF] transition-colors" to="#">
              Contact
            </Link>
          </nav>
          
            <ConnectButton
        profileModal={true}
        showBalance={false}
        showProfilePicture={true}
      />
          
          <Sheet>
            <SheetTrigger asChild>
              <Button className="md:hidden" variant="ghost">
                <MenuIcon className="w-6 h-6" />
              </Button>
            </SheetTrigger>
            <SheetContent className="bg-[#0D1117]" side="right">
              <div className="flex flex-col items-start gap-4 p-6">
                <Link className="text-lg font-medium hover:text-[#9945FF] transition-colors" to="#">
                  Features
                </Link>
                <Link className="text-lg font-medium hover:text-[#9945FF] transition-colors" to="#">
                  Pricing
                </Link>
                <Link className="text-lg font-medium hover:text-[#9945FF] transition-colors" to="#">
                  About
                </Link>
                <Link className="text-lg font-medium hover:text-[#9945FF] transition-colors" to="#">
                  Contact
                </Link>
                <Button className="flex items-center gap-2 bg-[#9945FF] hover:bg-[#8035d6] transition-colors">
                  <WalletIcon className="w-4 h-4" />
                  Connect Wallet
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>
      <main className="flex-1">
        <section className="relative py-24 px-6 md:px-12 lg:px-24 overflow-hidden">
          <div className="max-w-5xl mx-auto text-center space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              Decentralized FormBuiler for the Future
            </h1>
            <div className="flex flex-col items-center justify-center gap-4">
              <div className="relative w-full max-w-[800px] h-[500px] rounded-xl overflow-hidden">
                <img
                  alt="Dashboard"
                  className="w-full h-full object-cover"
                  height={500}
                  src="/placeholder.svg"
                  style={{
                    aspectRatio: "800/500",
                    objectFit: "cover",
                  }}
                  width={800}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0D1117] to-transparent" />
              </div>
              <div className="text-lg md:text-xl">Unlock the Power of Decentralized SaaS</div>
            </div>
            <div className="text-lg md:text-xl">
              Revolutionize your business with our cutting-edge decentralized SaaS platform.
            </div>
            <div className="flex justify-center items-center z-80">
            <Link to="/dashboard" style={{ zIndex: 1000, position: 'relative' }}>
  <Button className="flex items-center gap-1 bg-[#9945FF] hover:bg-[#8035d6] transition-colors ">
    <RocketIcon className="w-4 h-4" />
    Get Started
  </Button>
</Link>
            </div>
          </div>
          <div className="absolute inset-x-0 bottom-0 h-[50%] bg-gradient-to-t from-[#0D1117] to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-[50%] bg-gradient-to-t from-[#0D1117] to-transparent animate-pulse" />
        </section>
        <section className="relative py-24 px-6 md:px-12 lg:px-24 overflow-hidden">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">Revolutionize Your Business</h2>
            <div className="text-lg md:text-xl">
              Our decentralized SaaS platform empowers you to take control of your data and operations, unlocking new
              levels of efficiency and innovation.
            </div>
            <div className="container mx-auto p-6">
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
    {/* Large Card */}
    <div className="bg-white rounded-lg shadow-lg p-5 md:col-span-2 lg:col-span-2 row-span-2">
      <img className="rounded-t-lg w-full h-48 object-cover" src="/image-large.jpg" alt="Large Image" />
      <h5 className="text-lg font-bold mt-2">Large Card Title</h5>
      <p className="text-sm">This is a larger card with more detailed content.</p>
    </div>
    {/* Medium Card */}
    <div className="bg-white rounded-lg shadow-lg p-5 md:col-span-2 lg:col-span-1 row-span-1">
      <img className="rounded-t-lg w-full h-24 object-cover" src="/image-medium.jpg" alt="Medium Image" />
      <h5 className="text-lg font-bold mt-2">Medium Card Title</h5>
      <p className="text-sm">This is a medium-sized card.</p>
    </div>
    {/* Small Cards */}
    <div className="bg-white rounded-lg shadow-lg p-5 md:col-span-1 lg:col-span-1 row-span-1">
      <img className="rounded-t-lg w-full h-24 object-cover" src="/image-small1.jpg" alt="Small Image 1" />
      <h5 className="text-lg font-bold mt-2">Small Card 1</h5>
      <p className="text-sm">A smaller card.</p>
    </div>
    <div className="bg-white rounded-lg shadow-lg p-5 md:col-span-1 lg:col-span-1 row-span-1">
      <img className="rounded-t-lg w-full h-24 object-cover" src="/image-small2.jpg" alt="Small Image 2" />
      <h5 className="text-lg font-bold mt-2">Small Card 2</h5>
      <p className="text-sm">Another small card.</p>
    </div>
    {/* Add more cards as needed */}
  </div>
</div>
            </div>
          <div className="absolute inset-x-0 bottom-0 h-[50%] bg-gradient-to-t from-[#0D1117] to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-[50%] bg-gradient-to-t from-[#0D1117] to-transparent animate-pulse" />
        </section>
        <section className="relative py-24 px-6 md:px-12 lg:px-24 overflow-hidden">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">Secure and Scalable</h2>
            <div className="text-lg md:text-xl">
              Our decentralized infrastructure ensures your data is safe and your application can scale effortlessly to
              meet your growing needs.
            </div>
            <div className="flex justify-center">
              <div className="relative w-full max-w-[600px] h-[400px] rounded-xl overflow-hidden">
                <img
                  alt="Security"
                  className="w-full h-full object-cover"
                  height={400}
                  src="/placeholder.svg"
                  style={{
                    aspectRatio: "600/400",
                    objectFit: "cover",
                  }}
                  width={600}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0D1117] to-transparent" />
              </div>
            </div>
          </div>
          <div className="absolute inset-x-0 bottom-0 h-[50%] bg-gradient-to-t from-[#0D1117] to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-[50%] bg-gradient-to-t from-[#0D1117] to-transparent animate-pulse" />
        </section>
      </main>
      <footer className="bg-[#0D1117] py-8 px-6 md:px-12 lg:px-24 border-t border-gray-700 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <RocketIcon className="w-6 h-6 text-[#9945FF]" />
          <span className="text-lg font-bold">Decentralized SaaS</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm">Powered by</span>
          <Link className="flex items-center gap-2" to="#">
            <AArrowUpIcon className="w-6 h-6 text-[#9945FF]" />
            <span className="text-sm font-medium">AO</span>
          </Link>
          <span className="text-sm">and</span>
          <Link className="flex items-center gap-2" to="#">
            <WavesIcon className="w-6 h-6 text-[#9945FF]" />
            <span className="text-sm font-medium">Arweave</span>
          </Link>
        </div>
      </footer>
    </div>
  )
}

function AArrowUpIcon(props:SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3.5 13h6" />
      <path d="m2 16 4.5-9 4.5 9" />
      <path d="M18 16V7" />
      <path d="m14 11 4-4 4 4" />
    </svg>
  )
}


function MenuIcon(props:SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  )
}


function RocketIcon(props:SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
      <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
      <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
    </svg>
  )
}


function WalletIcon(props:SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1" />
      <path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4" />
    </svg>
  )
}


function WavesIcon(props:SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" />
      <path d="M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" />
      <path d="M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" />
    </svg>
  )
}
