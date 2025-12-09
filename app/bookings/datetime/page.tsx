"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";
import { EyelashLogo } from "@/components/eyelash-logo";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useBookingStore } from "@/lib/booking-store";
import { ArrowLeft, CalendarIcon, Clock } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";

const TIME_SLOTS_WEEKDAY = ["13:00", "14:00", "15:00", "16:00", "17:00", "18:00"]

const TIME_SLOTS_SATURDAY = ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00"]

export default function DateTimePage() {
  const router = useRouter()
  const { service, length, price, setDateTime, selectedDate: storedDate, selectedTime: storedTime } = useBookingStore()
  const [date, setDate] = useState<Date | undefined>(storedDate || undefined)
  const [time, setTime] = useState<string | null>(storedTime)

  if (!service || !length) {
    router.push("/booking/services")
    return null
  }

  const isAvailableDate = (date: Date) => {
    const day = date.getDay()
    // Thursday = 4, Friday = 5, Saturday = 6
    return day === 4 || day === 5 || day === 6
  }

  const getAvailableTimeSlots = () => {
    if (!date) return []
    const day = date.getDay()
    return day === 6 ? TIME_SLOTS_SATURDAY : TIME_SLOTS_WEEKDAY
  }

  const handleContinue = () => {
    if (date && time) {
      setDateTime(date, time)
      router.push("/booking/details")
    }
  }

  const timeSlots = getAvailableTimeSlots()

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/80 backdrop-blur-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button variant="ghost" size="sm" onClick={() => router.push("/booking/services")} className="gap-2">
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
            <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
              2
            </div>
            <span className="text-sm font-medium hidden sm:inline">Date & Time</span>
          </div>
          <div className="w-12 h-0.5 bg-border" />
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-muted text-muted-foreground flex items-center justify-center font-bold">
              3
            </div>
            <span className="text-sm font-medium text-muted-foreground hidden sm:inline">Details</span>
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
          <h2 className="text-3xl md:text-4xl font-bold">Pick Your Date & Time</h2>
          <p className="text-muted-foreground text-lg">Available Thursday - Saturday</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Calendar */}
          <Card className="p-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-lg font-bold">
                <CalendarIcon className="w-5 h-5 text-primary" />
                <h3>Select a Date</h3>
              </div>
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                disabled={(date) => {
                  const today = new Date()
                  today.setHours(0, 0, 0, 0)
                  return date < today || !isAvailableDate(date)
                }}
                className="rounded-xl border-0"
              />
              <div className="text-sm text-muted-foreground bg-muted/50 p-3 rounded-lg">
                <p className="font-medium mb-1">Availability:</p>
                <ul className="space-y-1">
                  <li>• Thursday - Friday: 13:00 - 18:00</li>
                  <li>• Saturday: 09:00 - 18:00</li>
                </ul>
              </div>
            </div>
          </Card>

          {/* Time Slots */}
          <Card className="p-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-lg font-bold">
                <Clock className="w-5 h-5 text-primary" />
                <h3>Select a Time</h3>
              </div>

              {!date ? (
                <div className="h-64 flex items-center justify-center text-muted-foreground">
                  Please select a date first
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {timeSlots.map((slot) => (
                    <Button
                      key={slot}
                      variant={time === slot ? "default" : "outline"}
                      className={`py-6 ${
                        time === slot
                          ? "bg-primary hover:bg-primary/90 text-primary-foreground"
                          : "border-2 hover:border-primary hover:text-primary"
                      }`}
                      onClick={() => setTime(slot)}
                    >
                      {slot}
                    </Button>
                  ))}
                </div>
              )}

              {date && time && (
                <div className="animate-in fade-in slide-in-from-bottom-2 duration-300 pt-4">
                  <Card className="bg-primary/5 border-primary/20 p-4">
                    <p className="text-sm font-medium mb-2">Selected Appointment:</p>
                    <p className="text-lg font-bold">
                      {date.toLocaleDateString("en-ZA", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                    <p className="text-lg font-bold text-primary">{time}</p>
                  </Card>
                </div>
              )}
            </div>
          </Card>
        </div>

        {/* Continue Button */}
        {date && time && (
          <div className="mt-8 max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
            <Button
              onClick={handleContinue}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-6 text-lg rounded-full"
              size="lg"
            >
              Continue to Your Details
            </Button>
          </div>
        )}
      </main>
    </div>
  )
}
