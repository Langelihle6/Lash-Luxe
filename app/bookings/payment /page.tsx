"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { EyelashLogo } from "@/components/eyelash-logo"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useBookingStore } from "@/lib/booking-store"
import { ArrowLeft, Check, Calendar, Clock, MapPin, User, CreditCard } from "lucide-react"

export default function PaymentPage() {
  const router = useRouter()
  const bookingStore = useBookingStore()
  const [isProcessing, setIsProcessing] = useState(false)
  const [isComplete, setIsComplete] = useState(false)

  const {
    service,
    length,
    price,
    selectedDate,
    selectedTime,
    customerName,
    customerEmail,
    isHouseCall,
    address,
    transportCost,
    depositAmount,
    getTotalAmount,
  } = bookingStore

  if (!service || !length || !selectedDate || !selectedTime || !customerName) {
    router.push("/booking/services")
    return null
  }

  const totalAmount = getTotalAmount()

  const handlePayment = async () => {
    setIsProcessing(true)
    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsProcessing(false)
    setIsComplete(true)
  }

  if (isComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-background flex items-center justify-center p-4">
        <Card className="max-w-2xl w-full p-8 md:p-12 text-center space-y-6">
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
            <Check className="w-10 h-10 text-primary" />
          </div>

          <div className="space-y-2">
            <h2 className="text-3xl md:text-4xl font-bold">Booking Confirmed!</h2>
            <p className="text-lg text-muted-foreground">Your appointment has been successfully booked</p>
          </div>

          <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6 space-y-4 text-left">
            <div className="flex items-start gap-3">
              <User className="w-5 h-5 text-primary mt-0.5" />
              <div>
                <p className="text-sm text-muted-foreground">Name</p>
                <p className="font-medium">{customerName}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Calendar className="w-5 h-5 text-primary mt-0.5" />
              <div>
                <p className="text-sm text-muted-foreground">Date</p>
                <p className="font-medium">
                  {selectedDate.toLocaleDateString("en-ZA", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-primary mt-0.5" />
              <div>
                <p className="text-sm text-muted-foreground">Time</p>
                <p className="font-medium">{selectedTime}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CreditCard className="w-5 h-5 text-primary mt-0.5" />
              <div>
                <p className="text-sm text-muted-foreground">Service</p>
                <p className="font-medium capitalize">
                  {service} - {length} length
                </p>
              </div>
            </div>

            {isHouseCall && (
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary mt-0.5" />
                <div>
                  <p className="text-sm text-muted-foreground">House Call Address</p>
                  <p className="font-medium">{address}</p>
                </div>
              </div>
            )}
          </div>

          <div className="space-y-2 text-sm text-muted-foreground">
            <p>A confirmation email has been sent to {customerEmail}</p>
            <p>We look forward to seeing you!</p>
          </div>

          <Button
            onClick={() => {
              bookingStore.reset()
              router.push("/")
            }}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-6 text-lg rounded-full"
            size="lg"
          >
            Return to Home
          </Button>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/80 backdrop-blur-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button variant="ghost" size="sm" onClick={() => router.push("/booking/details")} className="gap-2">
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
            <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold">
              ✓
            </div>
            <span className="text-sm font-medium text-primary hidden sm:inline">Details</span>
          </div>
          <div className="w-12 h-0.5 bg-primary/50" />
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
              4
            </div>
            <span className="text-sm font-medium hidden sm:inline">Payment</span>
          </div>
        </div>

        <div className="text-center space-y-2 mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">Secure Your Booking</h2>
          <p className="text-muted-foreground text-lg">Pay your deposit to confirm your appointment</p>
        </div>

        <div className="max-w-2xl mx-auto space-y-6">
          {/* Booking Summary */}
          <Card className="p-6">
            <h3 className="text-xl font-bold mb-6">Booking Summary</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-2">
                <span className="text-muted-foreground">Service</span>
                <span className="font-medium capitalize">
                  {service} - {length} length
                </span>
              </div>
              <div className="flex justify-between items-center pb-2">
                <span className="text-muted-foreground">Date & Time</span>
                <span className="font-medium">
                  {selectedDate.toLocaleDateString("en-ZA", { month: "short", day: "numeric" })} at {selectedTime}
                </span>
              </div>
              <div className="flex justify-between items-center pb-2">
                <span className="text-muted-foreground">Service Price</span>
                <span className="font-medium">R{price}</span>
              </div>
              {isHouseCall && (
                <div className="flex justify-between items-center pb-2">
                  <span className="text-muted-foreground">Transport Cost</span>
                  <span className="font-medium">R{transportCost}</span>
                </div>
              )}
              <div className="border-t pt-4 flex justify-between items-center">
                <span className="font-bold">Total Amount</span>
                <span className="text-2xl font-bold text-primary">R{totalAmount}</span>
              </div>
            </div>
          </Card>

          {/* Deposit Information */}
          <Card className="p-6 bg-primary/5 border-primary/20">
            <h3 className="text-xl font-bold mb-4">Deposit Required</h3>
            <div className="space-y-3">
              <p className="text-muted-foreground">To secure your booking, a 50% deposit is required.</p>
              <div className="flex justify-between items-center py-3 px-4 bg-card rounded-lg border border-primary/30">
                <span className="font-medium">Deposit Amount (50%)</span>
                <span className="text-3xl font-bold text-primary">R{depositAmount}</span>
              </div>
              <p className="text-sm text-muted-foreground">
                The remaining R{totalAmount - depositAmount} will be paid on the day of your appointment.
              </p>
            </div>
          </Card>

          {/* Payment Button */}
          <Button
            onClick={handlePayment}
            disabled={isProcessing}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-6 text-lg rounded-full disabled:opacity-50"
            size="lg"
          >
            {isProcessing ? (
              <span className="flex items-center gap-2">
                <EyelashLogo className="w-8 h-4 animate-pulse" />
                Processing Payment...
              </span>
            ) : (
              `Pay Deposit (R${depositAmount})`
            )}
          </Button>

          <p className="text-center text-xs text-muted-foreground">
            By confirming your booking, you agree to our terms and conditions
          </p>
        </div>
      </main>
    </div>
  )
}
