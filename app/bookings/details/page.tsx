"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { EyelashLogo } from "@/components/eyelash-logo"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { useBookingStore } from "@/lib/booking-store"
import { ArrowLeft, User, Mail, Phone, MapPin } from "lucide-react"

export default function DetailsPage() {
  const router = useRouter()
  const {
    service,
    length,
    selectedDate,
    selectedTime,
    setCustomerDetails,
    customerName: storedName,
    customerEmail: storedEmail,
    customerPhone: storedPhone,
    isHouseCall: storedIsHouseCall,
    address: storedAddress,
    transportCost: storedTransportCost,
  } = useBookingStore()

  const [name, setName] = useState(storedName)
  const [email, setEmail] = useState(storedEmail)
  const [phone, setPhone] = useState(storedPhone)
  const [isHouseCall, setIsHouseCall] = useState(storedIsHouseCall)
  const [address, setAddress] = useState(storedAddress)
  const [transportCost, setTransportCost] = useState(String(storedTransportCost ?? ""))

useEffect(() => {
  if (!service || !length || !selectedDate || !selectedTime) {
    router.push("/booking/services")
  }
}, [service, length, selectedDate, selectedTime])

if (!service || !length || !selectedDate || !selectedTime) {
  return null
}


  const handleContinue = () => {
    if (name && email && phone) {
      if (isHouseCall && (!address || !transportCost)) {
        alert("Please provide your address and transport cost for house calls")
        return
      }
      setCustomerDetails({
        name,
        email,
        phone,
        isHouseCall,
        address: isHouseCall ? address : "",
        transportCost: isHouseCall ? Number.parseFloat(transportCost) : 0,
      })
      router.push("/booking/payment")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/80 backdrop-blur-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button variant="ghost" size="sm" onClick={() => router.push("/booking/datetime")} className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
            <div className="flex items-center gap-3">
              <EyelashLogo className="w-12 h-6 text-primary" />
              <h1 className="text-xl font-bold text-primary">Lash Luxe</h1>
            </div>
            <div className="w-20" />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 max-w-6xl">
        {/* Progress Steps */}
        <div className="flex items-center justify-center gap-2 mb-12">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold">
              ✓
            </div>
            <span className="text-sm font-medium text-primary hidden sm:inline">Service</span>
          </div>
          <div className="w-12 h-0.5 bg-primary/50" />
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold">
              ✓
            </div>
            <span className="text-sm font-medium text-primary hidden sm:inline">Date & Time</span>
          </div>
          <div className="w-12 h-0.5 bg-primary/50" />
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
              3
            </div>
            <span className="text-sm font-medium hidden sm:inline">Details</span>
          </div>
          <div className="w-12 h-0.5 bg-border" />
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-muted text-muted-foreground flex items-center justify-center font-bold">
              4
            </div>
            <span className="text-sm font-medium text-muted-foreground hidden sm:inline">Payment</span>
          </div>
        </div>

        <div className="text-center space-y-2 mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">Your Details</h2>
          <p className="text-muted-foreground text-lg">We'll need some information to confirm your booking</p>
        </div>

        <div className="max-w-2xl mx-auto space-y-6">
          {/* Personal Information */}
          <Card className="p-6">
            <h3 className="text-xl font-bold mb-6">Personal Information</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="flex items-center gap-2">
                  <User className="w-4 h-4 text-primary" />
                  Full Name *
                </Label>
                <Input
                  id="name"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="border-2"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-primary" />
                  Email Address *
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border-2"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-primary" />
                  Phone Number *
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="(+27) 123 456 7890"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="border-2"
                  required
                />
              </div>
            </div>
          </Card>

          {/* House Call Option */}
          <Card className="p-6">
            <h3 className="text-xl font-bold mb-6">Appointment Location</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Checkbox
                  id="houseCall"
                  checked={isHouseCall}
                  onCheckedChange={(checked) => setIsHouseCall(checked as boolean)}
                  className="mt-1"
                />
                <div className="space-y-1">
                  <Label htmlFor="houseCall" className="flex items-center gap-2 cursor-pointer">
                    <MapPin className="w-4 h-4 text-primary" />
                    Request House Call
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    We'll come to you! You'll need to cover transport costs.
                  </p>
                </div>
              </div>

              {isHouseCall && (
                <div className="space-y-4 pl-7 animate-in fade-in slide-in-from-top-2 duration-300">
                  <div className="space-y-2">
                    <Label htmlFor="address">Your Address *</Label>
                    <Input
                      id="address"
                      placeholder="Enter your full address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="border-2"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="transportCost">Transport Cost (R) *</Label>
                    <Input
                      id="transportCost"
                      type="number"
                      placeholder="e.g., 50"
                      value={transportCost}
                      onChange={(e) => setTransportCost(e.target.value)}
                      className="border-2"
                      required
                    />
                    <p className="text-xs text-muted-foreground">This will be added to your total amount</p>
                  </div>
                </div>
              )}
            </div>
          </Card>

          {/* Continue Button */}
          <Button
            onClick={handleContinue}
            disabled={!name || !email || !phone || (isHouseCall && (!address || !transportCost))}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-6 text-lg rounded-full disabled:opacity-50"
            size="lg"
          >
            Continue to Payment
          </Button>
        </div>
      </main>
    </div>
  )
}
    