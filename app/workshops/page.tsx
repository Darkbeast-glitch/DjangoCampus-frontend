"use client"

import type React from "react"
import { useState, useEffect, useMemo } from "react"
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
import { Calendar, MapPin, Users, Clock, ArrowLeft, CheckCircle, Mail, Sparkles, TrendingUp, Award, Star, Search, X } from "lucide-react"
import Link from "next/link"
import Header from "@/components/layouts/Header"
import Footer from "@/components/layouts/Footer"
import { workshopService } from "@/services/workshopService"
import { Workshop, Registration } from "@/types/api"

export default function WorkshopsPage() {
  const [workshops, setWorkshops] = useState<Workshop[]>([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [selectedWorkshop, setSelectedWorkshop] = useState<number | null>(null)
  const [showSuccessPopup, setShowSuccessPopup] = useState(false)
  const [registeredWorkshopName, setRegisteredWorkshopName] = useState("")
  const [registeredWorkshopDate, setRegisteredWorkshopDate] = useState("")
  const [registeredWorkshopTime, setRegisteredWorkshopTime] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone_number: "",
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

  //Filter workshop based on search (must be before conditional returns)
  const filteredWorkshops = useMemo(() => {
    if (!searchQuery.trim()) {
      return workshops
    }

    const query = searchQuery.toLowerCase()
    return workshops.filter((workshop) => {
      const nameMatch = workshop.workshop_name?.toLowerCase().includes(query)
      const locationMatch = workshop.workshop_location?.toLowerCase().includes(query)
      return nameMatch || locationMatch
    })
  }, [workshops, searchQuery])

  const handleClearSearch = () => {
    setSearchQuery("")
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

          {/* Search Input */}
          <div className="max-w-xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search by workshop name or location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-12 py-4 rounded-lg border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all"
              />
              {searchQuery && (
                <button
                  onClick={handleClearSearch}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-muted rounded-full transition-colors"
                  aria-label="Clear search"
                >
                  <X className="h-5 w-5 text-muted-foreground" />
                </button>
              )}
            </div>
            {searchQuery && (
              <p className="mt-3 text-sm text-muted-foreground">
                Found {filteredWorkshops.length} workshop{filteredWorkshops.length !== 1 ? 's' : ''}
              </p>
            )}
          </div>
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
          ) : filteredWorkshops.length === 0 ? (
            <div className="text-center py-20">
              <Search className="h-16 w-16 text-muted-foreground mx-auto mb-4 opacity-50" />
              <h3 className="text-2xl font-semibold text-muted-foreground mb-4">No workshops found</h3>
              <p className="text-muted-foreground mb-6">
                No workshops match your search "{searchQuery}"
              </p>
              <button
                onClick={handleClearSearch}
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
              >
                <X className="h-4 w-4" />
                Clear search
              </button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8">
              {filteredWorkshops.map((workshop: Workshop, index: number) => (
                <Card
                  key={workshop.id}
                  className={`group relative border-0 bg-gradient-to-br from-card via-card to-card/50 hover:shadow-2xl hover:shadow-primary/20 transition-all duration-700 hover:-translate-y-3 overflow-hidden backdrop-blur-sm ${
                    workshop.is_ended ? 'opacity-60' : ''
                  }`}
                  style={{
                    animationDelay: `${index * 100}ms`,
                  }}
                >
                  {/* Gradient Overlay Border Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-secondary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                  
                  {/* Animated Corner Accent */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/10 to-transparent rounded-bl-full opacity-50 group-hover:scale-150 transition-transform duration-700" />

                  {/* Image Header with Creative Overlay */}
                  {workshop.workshop_image_header && (
                    <div className="relative overflow-hidden h-52">
                      {/* Gradient Overlay for better text readability */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent z-10" />
                      
                      <img
                        src={workshop.workshop_image_header}
                        alt={workshop.workshop_name}
                        className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-1 ${
                          workshop.is_ended ? 'grayscale' : ''
                        }`}
                      />
                      
                      {workshop.is_ended && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/70 backdrop-blur-md z-20">
                          <div className="text-center">
                            <Badge variant="destructive" className="text-white font-bold px-6 py-2 text-base shadow-xl">
                              Event Ended
                            </Badge>
                          </div>
                        </div>
                      )}
                      
                      {/* Creative Date Badge with Sparkle */}
                      {!workshop.is_ended && (() => {
                        const workshopDate = new Date(workshop.workshop_date);
                        return (
                          <div className="absolute top-4 right-4 z-20 group/date">
                            {/* Sparkle Effect */}
                            <div className="absolute -top-1 -right-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                              <Sparkles className="h-4 w-4 text-yellow-400 animate-pulse" />
                            </div>
                            
                            <div className="bg-gradient-to-br from-primary to-primary/80 text-white rounded-xl shadow-2xl p-3 text-center min-w-[75px] transform group-hover/date:scale-110 transition-transform duration-300">
                              <div className="text-3xl font-black leading-none">
                                {workshopDate.getDate()}
                              </div>
                              <div className="text-[10px] font-bold uppercase tracking-wider mt-1 opacity-90">
                                {workshopDate.toLocaleDateString('en-US', { month: 'short' })}
                              </div>
                            </div>
                          </div>
                        );
                      })()}

                      {/* Status Badge Bottom Left */}
                      <div className="absolute bottom-4 left-4 z-20 flex gap-2">
                        <Badge className="bg-white/95 text-primary border-0 font-bold shadow-lg backdrop-blur-sm px-3 py-1">
                          <Award className="h-3 w-3 mr-1" />
                          Workshop
                        </Badge>
                      </div>
                    </div>
                  )}

                  <CardHeader className="pb-4 pt-6 px-6 relative z-10">
                    {/* Registration Count with Trending Icon */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2 bg-primary/5 rounded-full px-3 py-1.5 border border-primary/10">
                        <TrendingUp className="h-4 w-4 text-primary animate-pulse" />
                        <div className="flex items-center gap-1 text-sm">
                          <span className="font-black text-primary text-lg">
                            {getRegistrationsCount(workshop.registrations_count)}
                          </span>
                          <span className="text-muted-foreground text-xs font-medium">registered</span>
                        </div>
                      </div>
                      
                      {/* Rating/Quality Indicator */}
                      {!workshop.is_ended && (
                        <div className="flex items-center gap-0.5" role="img" aria-label="5 out of 5 rating">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star key={star} className="h-3 w-3 fill-yellow-400 text-yellow-400" aria-hidden="true" />
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Workshop Title with Gradient on Hover */}
                    <CardTitle className="font-serif font-black text-2xl leading-tight mb-3 relative group/title">
                      <span className={`${
                        workshop.is_ended 
                          ? 'text-muted-foreground' 
                          : 'bg-gradient-to-r from-foreground to-foreground bg-clip-text group-hover/title:from-primary group-hover/title:to-secondary group-hover/title:text-transparent transition-all duration-500'
                      }`}>
                        {workshop.workshop_name}
                      </span>
                    </CardTitle>

                    {/* Description with Better Styling */}
                    <CardDescription className="text-sm leading-relaxed text-muted-foreground line-clamp-2 mb-4 font-medium">
                      {workshop.workshop_description || "Join us for an exciting Django workshop where you'll learn web development fundamentals and build real projects."}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="pt-0 px-6 pb-6 relative z-10">
                    {/* Workshop Details with Glass Morphism Effect */}
                    <div className="relative rounded-xl overflow-hidden mb-6">
                      {/* Glass morphism background */}
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background/50 to-secondary/5 backdrop-blur-sm" />
                      
                      <div className="relative space-y-3 p-4 border border-primary/10">
                        {/* Date and Time Row */}
                        <div className="flex items-start gap-3 group/item">
                          <div className="relative">
                            <div className="absolute inset-0 bg-primary/20 rounded-lg blur-sm group-hover/item:blur-md transition-all" />
                            <div className="relative p-2.5 bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg">
                              <Calendar className="h-4 w-4 text-primary" />
                            </div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-bold text-foreground flex items-center gap-2">
                              {formatDate(workshop.workshop_date)}
                            </div>
                            {workshop.workshop_time && (
                              <div className="text-xs text-muted-foreground mt-1 flex items-center gap-1.5 font-medium">
                                <Clock className="h-3.5 w-3.5" />
                                <span>{workshop.workshop_time}</span>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Divider */}
                        <div className="h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

                        {/* Location Row */}
                        <div className="flex items-start gap-3 group/item">
                          <div className="relative">
                            <div className="absolute inset-0 bg-secondary/20 rounded-lg blur-sm group-hover/item:blur-md transition-all" />
                            <div className="relative p-2.5 bg-gradient-to-br from-secondary/10 to-secondary/5 rounded-lg">
                              <MapPin className="h-4 w-4 text-secondary" />
                            </div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-bold text-foreground">
                              {workshop.workshop_location}
                            </div>
                            {workshop.venue && (
                              <div className="text-xs text-muted-foreground mt-1 font-medium">
                                📍 {workshop.venue}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Creative Call-to-Action Button with Animation */}
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
                          className={`relative w-full font-bold py-6 text-base transition-all duration-500 overflow-hidden group/btn ${
                            workshop.is_ended 
                              ? 'bg-muted text-muted-foreground cursor-not-allowed' 
                              : 'bg-gradient-to-r from-primary via-primary to-secondary hover:from-secondary hover:via-primary hover:to-primary text-primary-foreground shadow-lg hover:shadow-2xl hover:shadow-primary/40'
                          }`}
                          onClick={() => handleRegister(workshop.id)}
                          disabled={workshop.is_ended}
                        >
                          {/* Shine Effect */}
                          {!workshop.is_ended && (
                            <div className="absolute inset-0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                          )}
                          
                          {workshop.is_ended ? (
                            <span className="flex items-center justify-center gap-2">
                              Event Ended
                            </span>
                          ) : (
                            <span className="relative flex items-center justify-center gap-2">
                              <Sparkles className="h-5 w-5 group-hover/btn:rotate-12 transition-transform" />
                              <span>Register Now</span>
                              <ArrowLeft className="h-5 w-5 rotate-180 group-hover/btn:translate-x-2 transition-transform" />
                            </span>
                          )}
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
              <h3 className="font-serif font-bold text-lg">Open To All</h3>
              <p className="text-muted-foreground text-sm">
               Open to everyone to encourage shared learning and collaboration.
              </p>
            </div>
            <div className="space-y-3">
              <div className="mx-auto p-3 bg-secondary/10 rounded-full w-fit">
                <Calendar className="h-8 w-8 text-secondary" />
              </div>
              <h3 className="font-serif font-bold text-lg">Interactive Sessions</h3>
              <p className="text-muted-foreground text-sm">
                Intensive workshops with hands-on coding and project building.
              </p>
            </div>
            <div className="space-y-3">
              <div className="mx-auto p-3 bg-accent/10 rounded-full w-fit">
                <MapPin className="h-8 w-8 text-accent" />
              </div>
              <h3 className="font-serif font-bold text-lg">Multiple Cities</h3>
              <p className="text-muted-foreground text-sm">
                Workshops held across the globe to reach every young person in different regions.
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
