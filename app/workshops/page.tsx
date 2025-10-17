"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Calendar, MapPin, Users, Clock, ArrowLeft, CheckCircle, Mail } from "lucide-react"
import Link from "next/link"
import Header from "@/components/layouts/Header"
import Footer from "@/components/layouts/Footer"
import { workshopService } from "@/services/workshopService"
import { Workshop, Registration } from "@/types/api"
import { countries } from "@/lib/data"

export default function WorkshopsPage() {
  const [workshops, setWorkshops] = useState<Workshop[]>([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [selectedWorkshop, setSelectedWorkshop] = useState<number | null>(null)
  const [showSuccessPopup, setShowSuccessPopup] = useState(false)
  const [registeredWorkshopName, setRegisteredWorkshopName] = useState("")
  const [registeredWorkshopDate, setRegisteredWorkshopDate] = useState("")
  const [registeredWorkshopTime, setRegisteredWorkshopTime] = useState("")
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone_number: "",
    country: "",
    experience_level: "Beginner",
    will_attend_physical: true,
    django_experience: "Beginner",
  })

  // Fetch workshops on component mount
  useEffect(() => {
    const fetchWorkshops = async () => {
      try {
        setLoading(true)
        const data = await workshopService.getWorkshops()
        setWorkshops(data)
      } catch (error) {
        alert('Failed to load workshops. Please try again later.')
      } finally {
        setLoading(false)
      }
    }

    fetchWorkshops()
  }, [])

  const handleRegister = (workshopId: number) => {
    setSelectedWorkshop(workshopId)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!selectedWorkshop) return

    try {
      setSubmitting(true)
      
      const registration: Registration = {
        workshop: selectedWorkshop,
        user_name: formData.full_name,
        user_email: formData.email,
        phone_number: formData.phone_number,
        country: formData.country,
        will_attend_physical: formData.will_attend_physical,
        django_experience: formData.django_experience as 'Beginner' | 'Intermediate' | 'Advanced',
      }

      await workshopService.registerForWorkshop(registration)
      
      // Find the workshop name for the success popup
      const workshop = workshops.find((w: Workshop) => w.id === selectedWorkshop)
      setRegisteredWorkshopName(workshop?.workshop_name || "the workshop")
      setRegisteredWorkshopDate(workshop?.workshop_date ? formatDate(workshop.workshop_date) : "")
      setRegisteredWorkshopTime(workshop?.workshop_time || "")
      
      // Show success popup
      setShowSuccessPopup(true)
      
      // Reset form and close dialog
      setSelectedWorkshop(null)
      setFormData({
        full_name: "",
        email: "",
        phone_number: "",
        country: "",
        experience_level: "Beginner",
        will_attend_physical: true,
        django_experience: "Beginner",
      })

      // Refresh workshops to update registration counts
      const updatedWorkshops = await workshopService.getWorkshops()
      setWorkshops(updatedWorkshops)
      
    } catch (error) {
      console.error('Error submitting registration:', error)
      alert('Failed to submit registration. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const getRegistrationsCount = (registrationsCount: string) => {
    return parseInt(registrationsCount) || 0
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Loading workshops...</p>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <section className="py-16 px-4 bg-gradient-to-br from-card to-background">
        <div className="container mx-auto text-center max-w-4xl">
          <Badge className="mb-6 bg-secondary text-secondary-foreground">Free Django Workshops</Badge>
          <h1 className="font-serif font-black text-4xl md:text-6xl text-foreground mb-6 leading-tight">
            Upcoming
            <br />
            <span className="text-primary">Workshops</span>
          </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
              Join our hands-on Django workshops designed for women of all skill levels. Learn, build, and connect with
              the global tech community.
            </p>
        </div>
      </section>

      {/* Workshops Grid */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-7xl">
          {workshops.length === 0 ? (
            <div className="text-center py-20">
              <h3 className="text-2xl font-semibold text-muted-foreground mb-4">No workshops available</h3>
              <p className="text-muted-foreground">Check back soon for upcoming workshops!</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8">
              {workshops.map((workshop: Workshop) => (
                <Card
                  key={workshop.id}
                  className={`border-border bg-card hover:shadow-lg transition-all duration-300 hover:-translate-y-1 min-h-[420px] ${
                    workshop.is_ended ? 'opacity-60 grayscale' : ''
                  }`}
                >
                  <CardHeader className="pb-4">
                    {workshop.workshop_image_header && (
                      <div className="relative">
                        <img
                          src={workshop.workshop_image_header}
                          alt={workshop.workshop_name}
                          className={`w-full h-40 object-cover rounded-md mb-4 ${
                            workshop.is_ended ? 'grayscale' : ''
                          }`}
                        />
                        {workshop.is_ended && (
                          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-md mb-4">
                            <Badge variant="destructive" className="text-white">
                              Event Ended
                            </Badge>
                          </div>
                        )}
                      </div>
                    )}
                    <div className="flex items-center justify-between mb-3">
                      <Badge variant="default">
                        Workshop
                      </Badge>
                      <span className="text-sm text-muted-foreground">
                        {getRegistrationsCount(workshop.registrations_count)} registered
                      </span>
                    </div>
                    <CardTitle className={`font-serif font-bold text-xl leading-tight mb-2 ${
                      workshop.is_ended ? 'text-muted-foreground' : ''
                    }`}>
                      {workshop.workshop_name}
                      {workshop.is_ended && (
                        <span className="ml-2 text-sm text-destructive font-normal">
                          (Ended)
                        </span>
                      )}
                    </CardTitle>
                    <CardDescription className="text-sm leading-relaxed mb-3">
                      {workshop.workshop_description || "Join us for an exciting Django workshop where you'll learn web development fundamentals and build real projects."}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        {formatDate(workshop.workshop_date)}
                      </div>
                      {workshop.workshop_time && (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Clock className="h-4 w-4" />
                          {workshop.workshop_time}
                        </div>
                      )}
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        {workshop.workshop_location}
                      </div>
                      {workshop.venue && (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Users className="h-4 w-4" />
                          {workshop.venue}
                        </div>
                      )}
                    </div>

                    <Dialog 
                      open={selectedWorkshop === workshop.id} 
                      onOpenChange={(open: boolean) => {
                        if (!open) {
                          setSelectedWorkshop(null)
                        }
                      }}
                    >
                      <DialogTrigger asChild>
                        <Button
                          className="w-full bg-primary hover:bg-primary/90"
                          onClick={() => handleRegister(workshop.id)}
                          disabled={workshop.is_ended}
                        >
                          {workshop.is_ended ? "Event Ended" : "Register Now"}
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                          <DialogTitle className="font-serif font-bold">Register for Workshop</DialogTitle>
                          <DialogDescription>
                            {workshop.workshop_name} - {formatDate(workshop.workshop_date)}
                            {workshop.workshop_time && ` at ${workshop.workshop_time}`}
                          </DialogDescription>
                        </DialogHeader>
                        <form onSubmit={handleSubmit} className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="user_name">Full Name</Label>
                            <Input
                              id="user_name"
                              value={formData.full_name}
                              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, full_name: e.target.value })}
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="user_phone">Phone Number</Label>
                            <Input
                              id="user_phone"
                              value={formData.phone_number}
                              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, phone_number: e.target.value })}
                              required
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="user_email">Email Address</Label>
                            <Input
                              id="user_email"
                              type="email"
                              value={formData.email}
                              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, email: e.target.value })}
                              required
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="country">Country</Label>
                              <Select
                                value={formData.country}
                                onValueChange={(value: string) => setFormData((prev) => ({ ...prev, country: value }))}
                              >
                                <SelectTrigger className="w-full">
                                  <SelectValue placeholder="Select your country" />
                                </SelectTrigger>
                                <SelectContent>
                                  {countries.map((country) => (
                                    <SelectItem key={country} value={country}>
                                      {country}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="django_experience">Django Experience Level</Label>
                            <Select
                              value={formData.django_experience}
                              onValueChange={(value: string) => setFormData({ ...formData, django_experience: value })}
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Beginner">Beginner</SelectItem>
                                <SelectItem value="Intermediate">Intermediate</SelectItem>
                                <SelectItem value="Advanced">Advanced</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="will_attend_physical"
                              checked={formData.will_attend_physical}
                              onCheckedChange={(checked: boolean) =>
                                setFormData({ ...formData, will_attend_physical: checked })
                              }
                            />
                            <Label htmlFor="will_attend_physical" className="text-sm">
                              I will attend the workshop physically
                            </Label>
                          </div>

                          <Button 
                            type="submit" 
                            className="w-full bg-primary hover:bg-primary/90"
                            disabled={submitting}
                          >
                            {submitting ? "Submitting..." : "Complete Registration"}
                          </Button>
                        </form>
                      </DialogContent>
                    </Dialog>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Info Section */}
      <section className="py-16 px-4 bg-card/30">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="font-serif font-black text-3xl md:text-4xl text-foreground mb-6">What to Expect</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="space-y-3">
              <div className="mx-auto p-3 bg-primary/10 rounded-full w-fit">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-serif font-bold text-lg">Small Groups</h3>
              <p className="text-muted-foreground text-sm">
                Maximum 30 participants per workshop for personalized attention and better learning.
              </p>
            </div>
            <div className="space-y-3">
              <div className="mx-auto p-3 bg-secondary/10 rounded-full w-fit">
                <Calendar className="h-8 w-8 text-secondary" />
              </div>
              <h3 className="font-serif font-bold text-lg">2-Day Format</h3>
              <p className="text-muted-foreground text-sm">
                Intensive weekend workshops with hands-on coding and project building.
              </p>
            </div>
            <div className="space-y-3">
              <div className="mx-auto p-3 bg-accent/10 rounded-full w-fit">
                <MapPin className="h-8 w-8 text-accent" />
              </div>
              <h3 className="font-serif font-bold text-lg">Multiple Cities</h3>
              <p className="text-muted-foreground text-sm">
                Workshops held across the globe to reach women in different regions.
              </p>
            </div>
          </div>
        </div>
      </section>
      <Footer />

      {/* Success Popup Animation */}
      {showSuccessPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="relative mx-4 w-full max-w-lg">
            {/* Animated Background */}
            <div className="absolute inset-0 animate-pulse rounded-2xl bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 opacity-20"></div>
            
            {/* Main Card - Remove bouncing animation */}
            <div className="relative rounded-2xl bg-white p-8 shadow-2xl animate-fade-in">
              {/* Success Icon with gentle pulse */}
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
                <CheckCircle className="h-12 w-12 animate-pulse text-green-500" />
              </div>
              
              {/* Confetti Animation - only decorative elements bounce */}
              <div className="absolute left-1/2 top-4 -translate-x-1/2">
                <div className="animate-bounce text-4xl">🎉</div>
              </div>
              <div className="absolute right-8 top-8">
                <div className="animate-pulse text-2xl">✨</div>
              </div>
              <div className="absolute left-8 top-12">
                <div className="animate-bounce text-2xl delay-300">🎊</div>
              </div>
              
              {/* Content */}
              <div className="text-center">
                <h2 className="mb-4 font-serif text-3xl font-bold text-gray-900">
                  Congratulations! 🎉
                </h2>
                <p className="mb-6 text-lg text-gray-600">
                  You've successfully registered for <br />
                  <span className="font-bold text-primary">{registeredWorkshopName}</span>
                  {registeredWorkshopDate && (
                    <>
                      <br />
                      <span className="text-sm font-medium text-gray-700">
                        <Calendar className="mr-1 inline-block h-4 w-4" />
                        {registeredWorkshopDate}
                        {registeredWorkshopTime && (
                          <>
                            <Clock className="ml-2 mr-1 inline-block h-4 w-4" />
                            {registeredWorkshopTime}
                          </>
                        )}
                      </span>
                    </>
                  )}
                </p>
                
                {/* Email Icon with Animation */}
                <div className="mb-6 flex items-center justify-center gap-2 text-gray-500">
                  <Mail className="h-5 w-5 animate-pulse" />
                  <span className="text-sm">Keep an eye on your email for further information</span>
                </div>
                
                {/* Close Button */}
                <Button
                  onClick={() => setShowSuccessPopup(false)}
                  className="bg-gradient-to-r from-green-500 to-blue-500 px-8 py-3 font-semibold text-white transition-all duration-300 hover:from-green-600 hover:to-blue-600 hover:scale-105"
                >
                  Awesome! Got it
                </Button>
              </div>
              
              {/* Animated Stars */}
              <div className="absolute -top-2 left-1/4">
                <div className="animate-ping text-yellow-400">⭐</div>
              </div>
              <div className="absolute -top-1 right-1/4">
                <div className="animate-ping delay-150 text-yellow-400">⭐</div>
              </div>
              <div className="absolute bottom-2 left-1/3">
                <div className="animate-pulse delay-500 text-pink-400">💖</div>
              </div>
              <div className="absolute bottom-4 right-1/3">
                <div className="animate-pulse delay-700 text-blue-400">🚀</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
