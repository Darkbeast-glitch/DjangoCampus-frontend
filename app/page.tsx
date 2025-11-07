"use client"

import { useState, useEffect, FormEvent } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, Code, Heart, Calendar, MapPin, Mail, Github, Linkedin, Twitter, Instagram, Facebook, ExternalLink, ChevronLeft, ChevronRight, CheckCircle2, XCircle, Info, Clock } from "lucide-react"
import Link from "next/link"
import Header from "@/components/layouts/Header"
import Footer from "@/components/layouts/Footer"
import Hero from "@/components/Hero"
import HoverLiftCard from "@/components/HoverLiftCard"
import TextReveal from "@/components/TextReveal"
import FloatingButton from "@/components/FloatingButton"
import { workshopService } from "@/services/workshopService"
import { teamService } from "@/services/teamService"
import { newsletterService, DuplicateSubscriptionError } from "@/services/newsletterService"
import { Workshop, TeamMember, NewsletterSubscription } from "@/types/api"
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function Home() {
  const [nextWorkshop, setNextWorkshop] = useState<Workshop | null>(null)
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([])
  const [loading, setLoading] = useState(true)
  const [teamLoading, setTeamLoading] = useState(true)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [isPaused, setIsPaused] = useState(false)
  
  // Newsletter subscription states
  const [newsletterEmail, setNewsletterEmail] = useState('')
  const [newsletterName, setNewsletterName] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [subscriptionSuccess, setSubscriptionSuccess] = useState(false)
  const [subscriptionError, setSubscriptionError] = useState<string | null>(null)
  const [isDuplicateError, setIsDuplicateError] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [socialsDialogOpen, setSocialsDialogOpen] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch workshop data
        const workshops = await workshopService.getUpcomingWorkshops()
        if (workshops.length > 0) {
          setNextWorkshop(workshops[0])
        }
      } catch (error) {
        console.error('Error fetching workshops:', error)
      } finally {
        setLoading(false)
      }
    }

    const fetchTeamMembers = async () => {
      try {
        const members = await teamService.getTeamMembers()
        setTeamMembers(members)
      } catch (error) {
        console.error('Error fetching team members:', error)
      } finally {
        setTeamLoading(false)
      }
    }

    fetchData()
    fetchTeamMembers()
  }, [])

  // Carousel control functions for pausing/resuming auto-scroll
  const pauseCarousel = () => {
    setIsPaused(true)
    setIsAutoPlaying(false)
  }

  const resumeCarousel = () => {
    setIsPaused(false)
    setIsAutoPlaying(true)
  }

  const handleArrowClick = () => {
    pauseCarousel()
    // Resume after 10 seconds
    setTimeout(() => {
      resumeCarousel()
    }, 10000)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  // Function to get social media icon based on platform
  const getSocialIcon = (platform: string) => {
    const platformLower = platform.toLowerCase()
    switch (platformLower) {
      case 'github':
        return <Github className="h-4 w-4" />
      case 'linkedin':
        return <Linkedin className="h-4 w-4" />
      case 'twitter':
        return <Twitter className="h-4 w-4" />
      case 'instagram':
        return <Instagram className="h-4 w-4" />
      case 'facebook':
        return <Facebook className="h-4 w-4" />
      default:
        return <ExternalLink className="h-4 w-4" />
    }
  }

  // Function to get social platform color
  const getSocialColor = (platform: string) => {
    const platformLower = platform.toLowerCase()
    switch (platformLower) {
      case 'github':
        return 'hover:bg-gray-600/10 hover:text-gray-600'
      case 'linkedin':
        return 'hover:bg-blue-600/10 hover:text-blue-600'
      case 'twitter':
        return 'hover:bg-blue-400/10 hover:text-blue-400'
      case 'instagram':
        return 'hover:bg-pink-600/10 hover:text-pink-600'
      case 'facebook':
        return 'hover:bg-blue-700/10 hover:text-blue-700'
      default:
        return 'hover:bg-primary/10 hover:text-primary'
    }
  }

  // Function to handle email contact
  const handleContactEmail = () => {
    const email = 'campus.django@gmail.com'
    const subject = 'Interest in Joining DjangoCampus Team'
    const body = `Hello DjangoCampus Team,

I'm interested in joining the DjangoCampus team as an educator/mentor.

Here are my details:

Name: 
Experience: 
Skills: 
Motivation: 

Thank you for your time!

Best regards`

    const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    
    // Try to open email client
    try {
      window.location.href = mailtoLink
    } catch (error) {
      // Fallback: copy email to clipboard and show alert
      navigator.clipboard.writeText(email).then(() => {
        alert(`Please send an email to: ${email}\n\nEmail address copied to clipboard!`)
      }).catch(() => {
        alert(`Please send an email to: ${email}`)
      })
    }
  }
  
  // Function to handle newsletter subscription
  const handleNewsletterSubmit = async (e: FormEvent) => {
    e.preventDefault()
    
    if (!newsletterEmail) {
      setSubscriptionError('Email is required')
      setIsDuplicateError(false)
      return
    }

    if (!/\S+@\S+\.\S+/.test(newsletterEmail)) {
      setSubscriptionError('Please enter a valid email address')
      setIsDuplicateError(false)
      return
    }

    setIsSubmitting(true)
    setSubscriptionError(null)

    try {
      const subscription: NewsletterSubscription = {
        email: newsletterEmail,
        name: newsletterName || undefined // Only include name if provided
      }

      await newsletterService.subscribe(subscription)
      setSubscriptionSuccess(true)
      setIsDuplicateError(false)
      
      // Reset form after successful submission
      setTimeout(() => {
        setNewsletterEmail('')
        setNewsletterName('')
        // Close dialog after showing success message for 3 seconds
        setTimeout(() => {
          setDialogOpen(false)
          setSubscriptionSuccess(false)
        }, 3000)
      }, 500)
    } catch (error: any) {
      console.error('Subscription error:', error)
      
      // Check if this is our custom duplicate error
      if (error.name === 'DuplicateSubscriptionError') {
        setIsDuplicateError(true)
        setSubscriptionError(error.message || 'This email is already subscribed to our newsletter.')
      } else {
        setIsDuplicateError(false)
        setSubscriptionError('Failed to subscribe. Please try again later.')
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
    
      <Header />

      {/* Main Content */}
      {/* Hero Section */}
      <Hero />

      {/* About Section */}
      <section id="about" className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <TextReveal>
              <h2 className="font-serif font-black text-3xl md:text-4xl text-foreground mb-4">What is DjangoCampus?</h2>
            </TextReveal>
            <TextReveal delay={0.2}>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                We're a dedicated team that organizes free Django workshops on different campuses. We're open for partnerships to bring quality programming education to more students.
              </p>
            </TextReveal>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <HoverLiftCard className="border-border bg-card rounded-lg">
              <Card className="h-full border-0 bg-transparent">
                <CardHeader className="text-center">
                  <div className="mx-auto mb-4 p-3 bg-primary/10 rounded-full w-fit">
                    <Code className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="font-serif font-bold">Learn to Code</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center">
                    Master Django web framework through hands-on tutorials and real projects. No prior experience needed!
                  </CardDescription>
                </CardContent>
              </Card>
            </HoverLiftCard>

            <HoverLiftCard className="border-border bg-card rounded-lg">
              <Card className="h-full border-0 bg-transparent">
                <CardHeader className="text-center">
                  <div className="mx-auto mb-4 p-3 bg-secondary/10 rounded-full w-fit">
                    <Users className="h-8 w-8 text-secondary" />
                  </div>
                  <CardTitle className="font-serif font-bold">Build Community</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center">
                    Connect with like-minded peers, find mentors, and become part of a vibrant global tech community.
                  </CardDescription>
                </CardContent>
              </Card>
            </HoverLiftCard>

            <HoverLiftCard className="border-border bg-card rounded-lg">
              <Card className="h-full border-0 bg-transparent">
                <CardHeader className="text-center">
                  <div className="mx-auto mb-4 p-3 bg-accent/10 rounded-full w-fit">
                    <Heart className="h-8 w-8 text-accent" />
                  </div>
                  <CardTitle className="font-serif font-bold">Make Impact</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center">
                    Use your new skills to create solutions that matter to your community and beyond.
                  </CardDescription>
                </CardContent>
              </Card>
            </HoverLiftCard>
          </div>
        </div>
      </section>

      {/* Workshop Info */}
      <section id="workshops" className="py-16 px-4 bg-card/30">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <TextReveal>
              <h2 className="font-serif font-black text-3xl md:text-4xl text-foreground mb-4">Free Django Workshops</h2>
            </TextReveal>
            <TextReveal delay={0.2}>
              <p className="text-lg text-muted-foreground">
                Join our upcoming workshops and start your coding journey today
              </p>
            </TextReveal>
          </div>

          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
              <p className="mt-2 text-muted-foreground">Loading workshop information...</p>
            </div>
          ) : nextWorkshop ? (
            <Card className="border-border bg-background">
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <CardTitle className="font-serif font-bold text-xl">
                      Next Workshop: {nextWorkshop.workshop_name}
                    </CardTitle>
                    <CardDescription className="flex items-center gap-2 mt-2">
                      <Calendar className="h-4 w-4" />
                      {formatDate(nextWorkshop.workshop_date)}
                    </CardDescription>
                    {nextWorkshop.workshop_time && (
                      <CardDescription className="flex items-center gap-2 mt-1">
                        <Clock className="h-4 w-4" />
                        {nextWorkshop.workshop_time}
                      </CardDescription>
                    )}
                    <CardDescription className="flex items-center gap-2 mt-1">
                      <MapPin className="h-4 w-4" />
                      {nextWorkshop.workshop_location}
                    </CardDescription>
                    {nextWorkshop.venue && (
                      <CardDescription className="flex items-center gap-2 mt-1">
                        <Users className="h-4 w-4" />
                        {nextWorkshop.venue}
                      </CardDescription>
                    )}
                  </div>
                  <Button size="lg" className="bg-primary hover:bg-primary/90" asChild>
                    <Link href="/workshops">
                      Register Now
                    </Link>
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {nextWorkshop.workshop_description && (
                  <div className="mb-6">
                    <p className="text-muted-foreground">{nextWorkshop.workshop_description}</p>
                  </div>
                )}
               
                <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
                  <Users className="h-4 w-4" />
                  {parseInt(nextWorkshop.registrations_count) || 0} people registered
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="border-border bg-background">
              <CardContent className="text-center py-12">
                <h3 className="font-semibold text-xl mb-4">No Upcoming Workshops</h3>
                <p className="text-muted-foreground mb-6">
                  We're currently planning our next workshop. Check back soon or join our community to be notified!
                </p>
                <Button asChild>
                  <Link href="/workshops">
                    View Past Workshops
                  </Link>
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </section>

      {/* Community Stories */}
      <section id="community" className="py-16 px-4 overflow-hidden">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="font-serif font-black text-3xl md:text-4xl text-foreground mb-4">Growing Community</h2>
            <p className="text-lg text-muted-foreground">
              Meet some of the passionate individuals joining our Django learning journey
            </p>
          </div>

          {/* Auto-flowing Carousel with Controls */}
          <div className="relative">
            <div className="overflow-hidden mx-12">
              <div 
                className={`flex gap-8 ${isAutoPlaying && !isPaused ? 'animate-scroll' : ''}`}
                style={{
                  width: 'calc(320px * 6)', // 3 cards * 2 for seamless loop
                  animationPlayState: isPaused ? 'paused' : 'running'
                }}
                onMouseEnter={pauseCarousel}
                onMouseLeave={resumeCarousel}
              >
                {/* First set of cards */}
                <Card className="border-border bg-card flex-shrink-0 w-80">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <img src="/juli.jpeg" alt="Juliana" className="h-12 w-12 rounded-full" />
                      <div>
                        <CardTitle className="text-lg">Juliana Lawson</CardTitle>
                        <CardDescription>Member Care/IT Support</CardDescription>

                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      "Just started my coding journey with DjangoCampus. Excited to learn web development and build my first app!"
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-border bg-card flex-shrink-0 w-80">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <img src="/placeholder-s8blj.png" alt="Grace" className="h-12 w-12 rounded-full" />
                      <div>
                        <CardTitle className="text-lg">Grace Mwangi</CardTitle>
                        <CardDescription>CS Student</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      "The community here is amazing! Looking forward to attending my first workshop and meeting fellow learners."
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-border bg-card flex-shrink-0 w-80">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <img src="/african-woman-teacher-computer.png" alt="Fatuma" className="h-12 w-12 rounded-full" />
                      <div>
                        <CardTitle className="text-lg">Fatuma Ally</CardTitle>
                        <CardDescription>Teacher & Early Supporter</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      "Joined the DjangoCampus community from day one. Can't wait to see how this initiative grows!"
                    </p>
                  </CardContent>
                </Card>

                {/* Duplicate cards for seamless loop */}
                <Card className="border-border bg-card flex-shrink-0 w-80">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <img src="/juli.jpeg" alt="Juliana" className="h-12 w-12 rounded-full" />
                      <div>
                        <CardTitle className="text-lg">Juliana Lawson</CardTitle>
                        <CardDescription>Member Care/IT Support</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      "Just started my coding journey with DjangoCampus. Excited to learn web development and build my first app!"
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-border bg-card flex-shrink-0 w-80">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <img src="/placeholder-s8blj.png" alt="Grace" className="h-12 w-12 rounded-full" />
                      <div>
                        <CardTitle className="text-lg">Grace Mwangi</CardTitle>
                        <CardDescription>CS Student</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      "The community here is amazing! Looking forward to attending my first workshop and meeting fellow learners."
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-border bg-card flex-shrink-0 w-80">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <img src="/african-woman-teacher-computer.png" alt="Fatuma" className="h-12 w-12 rounded-full" />
                      <div>
                        <CardTitle className="text-lg">Fatuma Ally</CardTitle>
                        <CardDescription>Teacher & Early Supporter</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      "Joined the DjangoCampus community from day one. Can't wait to see how this initiative grows!"
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Navigation Arrows */}
            <Button
              variant="outline"
              size="icon"
              className="absolute left-0 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-background/80 backdrop-blur-sm border-2 hover:bg-primary hover:text-primary-foreground transition-all duration-200"
              onClick={handleArrowClick}
              onMouseEnter={pauseCarousel}
            >
              <ChevronLeft className="h-5 w-5" />
              <span className="sr-only">Pause and control carousel</span>
            </Button>

            <Button
              variant="outline"
              size="icon"
              className="absolute right-0 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-background/80 backdrop-blur-sm border-2 hover:bg-primary hover:text-primary-foreground transition-all duration-200"
              onClick={handleArrowClick}
              onMouseEnter={pauseCarousel}
            >
              <ChevronRight className="h-5 w-5" />
              <span className="sr-only">Pause and control carousel</span>
            </Button>

            {/* Auto-play indicator */}
            <div className="flex justify-center items-center gap-2 mt-8">
              <div className={`h-2 w-2 rounded-full ${isAutoPlaying && !isPaused ? 'bg-green-500 animate-pulse' : 'bg-gray-400'} transition-colors`} />
              <span className="text-xs text-muted-foreground">
                {isAutoPlaying && !isPaused ? 'Auto-flowing' : 'Paused'}
              </span>
            </div>

            {/* Call to Action */}
            <div className="text-center mt-8">
              <p className="text-muted-foreground mb-4">Be part of our growing community!</p>
                <a href="https://whatsapp.com/channel/0029VbB2boDEawdueVgsYC39">
              <Button variant="outline" className="group">
                <Users className="mr-2 h-4 w-4 group-hover:animate-pulse" />
                Join the Community
              </Button></a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-primary text-primary-foreground">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="font-serif font-black text-3xl md:text-4xl mb-4">Ready to Start Your Journey?</h2>
          <p className="text-lg mb-8 opacity-90">
            Join hundreds of youth who've discovered the joy of programming with Django Campus
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Dialog 
              open={dialogOpen} 
              onOpenChange={(open) => {
                setDialogOpen(open)
                if (open) {
                  // Reset states when dialog is opened
                  setSubscriptionError(null)
                  setIsDuplicateError(false)
                  setSubscriptionSuccess(false)
                }
              }}
            >
              <DialogTrigger asChild>
                <Button size="lg" variant="secondary">
                  <Mail className="mr-2 h-5 w-5" />
                  Get Workshop Updates
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle className="text-xl font-serif font-bold">
                    {subscriptionSuccess ? 'Thank You!' : 'Get Workshop Updates'}
                  </DialogTitle>
                  <DialogDescription>
                    {subscriptionSuccess 
                      ? 'You have successfully subscribed to our workshop updates!'
                      : 'Subscribe to our newsletter to get the latest workshop updates.'}
                  </DialogDescription>
                </DialogHeader>
                
                {subscriptionSuccess ? (
                  <div className="relative py-8 flex flex-col items-center overflow-hidden">
                    {/* Confetti Animation */}
                    <div className="absolute inset-0 pointer-events-none">
                      {/* Confetti pieces with staggered animations */}
                      {[...Array(20)].map((_, i) => (
                        <div
                          key={i}
                          className="absolute animate-confetti"
                          style={{
                            left: `${Math.random() * 100}%`,
                            top: '-10px',
                            animationDelay: `${Math.random() * 0.5}s`,
                            animationDuration: `${2 + Math.random() * 2}s`,
                          }}
                        >
                          <div
                            className="w-2 h-2 rounded-full"
                            style={{
                              backgroundColor: ['#10b981', '#3b82f6', '#f59e0b', '#ec4899', '#8b5cf6'][i % 5],
                            }}
                          />
                        </div>
                      ))}
                    </div>

                    {/* Animated Background Rings */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="w-32 h-32 rounded-full bg-green-500/10 animate-ping" />
                      <div className="absolute w-24 h-24 rounded-full bg-green-500/20 animate-pulse" />
                    </div>

                    {/* Success Icon with Animation */}
                    <div className="relative z-10 mb-6">
                      <div className="relative">
                        {/* Glow effect */}
                        <div className="absolute inset-0 bg-green-500/30 rounded-full blur-xl animate-pulse" />
                        {/* Icon */}
                        <CheckCircle2 className="relative h-20 w-20 text-green-500 animate-scale-in" />
                      </div>
                    </div>

                    {/* Success Message with Fade In */}
                    <div className="relative z-10 text-center space-y-3 animate-fade-in-up px-4">
                      <h3 className="text-2xl font-bold text-foreground">
                        🎉 You're In!
                      </h3>
                      <p className="text-muted-foreground font-medium max-w-sm">
                        Thank you for subscribing! We're excited to have you join our community.
                      </p>
                      <p className="text-sm text-muted-foreground/80">
                        Check your inbox for a confirmation email 📧
                      </p>
                    </div>

                    {/* Sparkle Elements */}
                    <div className="absolute top-8 left-8 text-2xl animate-bounce">✨</div>
                    <div className="absolute top-12 right-12 text-2xl animate-bounce" style={{ animationDelay: '0.2s' }}>🎊</div>
                    <div className="absolute bottom-8 left-16 text-2xl animate-bounce" style={{ animationDelay: '0.4s' }}>⭐</div>
                    <div className="absolute bottom-12 right-8 text-2xl animate-bounce" style={{ animationDelay: '0.6s' }}>🎉</div>
                  </div>
                ) : (
                  <form onSubmit={handleNewsletterSubmit} className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name (Optional)</Label>
                      <Input 
                        id="name" 
                        value={newsletterName}
                        onChange={(e) => setNewsletterName(e.target.value)}
                        placeholder="Your name" 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email <span className="text-red-500">*</span></Label>
                      <Input 
                        id="email" 
                        type="email" 
                        value={newsletterEmail}
                        onChange={(e) => setNewsletterEmail(e.target.value)}
                        placeholder="Your email address" 
                        required 
                      />
                    </div>
                    
                    {subscriptionError && (
                      <div className={`border rounded-md p-3 text-sm flex items-center ${
                        isDuplicateError 
                          ? "bg-blue-50 border-blue-300 text-blue-800" 
                          : "bg-red-100 border-red-300 text-red-800"
                      }`}>
                        {isDuplicateError 
                          ? <Info className="h-4 w-4 mr-2 flex-shrink-0 text-blue-500" />
                          : <XCircle className="h-4 w-4 mr-2 flex-shrink-0" />
                        }
                        {subscriptionError}
                      </div>
                    )}
                    
                    <div className="flex justify-end gap-3 pt-2">
                      <DialogClose asChild>
                        <Button type="button" variant="outline">Cancel</Button>
                      </DialogClose>
                      <Button 
                        type="submit" 
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? 'Subscribing...' : 'Subscribe'}
                      </Button>
                    </div>
                  </form>
                )}
              </DialogContent>
            </Dialog>
            
            {/* Social Media Dialog */}
            <Dialog open={socialsDialogOpen} onOpenChange={setSocialsDialogOpen}>
              <DialogTrigger asChild>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary bg-transparent"
                >
                  Follow Us on Social
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md bg-background/95 backdrop-blur-sm border-primary/20">
                <DialogHeader>
                  <DialogTitle className="text-center text-2xl font-serif font-bold">Connect With Us</DialogTitle>
                  <DialogDescription className="text-center">
                    Follow us on social media to stay updated with our latest workshops and events.
                  </DialogDescription>
                </DialogHeader>
                <div className="flex justify-center gap-6 py-8">
                  {/* Instagram */}
                  <a 
                    href="https://www.instagram.com/djangocampus?igsh=N2I3MXB0aXdjMjEz" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="social-icon-link group"
                  >
                    <div className="social-icon-container instagram-icon">
                      <Instagram 
                        className="h-8 w-8 text-pink-600 group-hover:text-pink-700 transition-all duration-300"
                      />
                      <span className="social-label">Instagram</span>
                    </div>
                  </a>
                  
                  {/* LinkedIn */}
                  <a 
                    href="https://www.linkedin.com/company/djangocampus/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="social-icon-link group"
                  >
                    <div className="social-icon-container linkedin-icon">
                      <Linkedin className="h-8 w-8 text-blue-600 group-hover:text-blue-700 transition-all duration-300" />
                      <span className="social-label">LinkedIn</span>
                    </div>
                  </a>
                  
                  {/* Mastodon */}
                  <a 
                    href="https://mastodon.social/@djangocampus" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="social-icon-link group"
                  >
                    <div className="social-icon-container mastodon-icon">
                      <svg 
                        viewBox="0 0 24 24" 
                        className="h-8 w-8 text-purple-600 group-hover:text-purple-700 transition-all duration-300"
                        fill="currentColor"
                      >
                        <path d="M23.268 5.313c-.35-2.578-2.617-4.61-5.304-5.004C17.51.242 15.792 0 11.813 0h-.03c-3.98 0-4.835.242-5.288.309C3.882.692 1.496 2.518.917 5.127.64 6.412.61 7.837.661 9.143c.074 1.874.088 3.745.26 5.611.118 1.24.325 2.47.62 3.68.55 2.237 2.777 4.098 4.96 4.857 2.336.792 4.849.923 7.256.38.265-.061.527-.132.786-.213.585-.184 1.27-.39 1.774-.753a.057.057 0 0 0 .023-.043v-1.809a.052.052 0 0 0-.02-.041.053.053 0 0 0-.046-.01 20.282 20.282 0 0 1-4.709.545c-2.73 0-3.463-1.284-3.674-1.818a5.593 5.593 0 0 1-.319-1.433.053.053 0 0 1 .066-.054c1.517.363 3.072.546 4.632.546.376 0 .75 0 1.125-.01 1.57-.044 3.224-.124 4.768-.422.038-.008.077-.015.11-.024 2.435-.464 4.753-1.92 4.989-5.604.008-.145.03-1.52.03-1.67.002-.512.167-3.63-.024-5.545zm-3.748 9.195h-2.561V8.29c0-1.309-.55-1.976-1.67-1.976-1.23 0-1.846.79-1.846 2.35v3.403h-2.546V8.663c0-1.56-.617-2.35-1.848-2.35-1.112 0-1.668.668-1.67 1.977v6.218H4.822V8.102c0-1.31.337-2.35 1.011-3.12.696-.77 1.608-1.164 2.74-1.164 1.311 0 2.302.5 2.962 1.498l.638 1.06.638-1.06c.66-.999 1.65-1.498 2.96-1.498 1.13 0 2.043.395 2.74 1.164.675.77 1.012 1.81 1.012 3.12z"/>
                      </svg>
                      <span className="social-label">Mastodon</span>
                    </div>
                  </a>
                  
                  {/* X (Twitter) */}
                  <a 
                    href="https://x.com/djangocampus" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="social-icon-link group"
                  >
                    <div className="social-icon-container x-icon">
                      <svg 
                        viewBox="0 0 24 24" 
                        className="h-8 w-8 text-gray-900 group-hover:text-black transition-all duration-300"
                        fill="currentColor"
                      >
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                      </svg>
                      <span className="social-label">X</span>
                    </div>
                  </a>
                </div>
                <style jsx global>{`
                  .social-icon-link {
                    position: relative;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                  }
                  
                  .social-icon-container {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    height: 64px;
                    width: 64px;
                    border-radius: 50%;
                    transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
                    position: relative;
                  }
                  
                  .social-icon-link:hover .social-icon-container {
                    transform: translateY(-8px);
                  }
                  
                  .medium-icon {
                    background-color: rgba(0, 0, 0, 0.05);
                  }
                  
                  .instagram-icon {
                    background-color: rgba(225, 48, 108, 0.1);
                  }
                  
                  .linkedin-icon {
                    background-color: rgba(10, 102, 194, 0.1);
                  }
                  
                  .mastodon-icon {
                    background-color: rgba(99, 100, 255, 0.1);
                  }
                  
                  .x-icon {
                    background-color: rgba(0, 0, 0, 0.05);
                  }
                  
                  .social-icon-link:hover .medium-icon {
                    background-color: rgba(0, 0, 0, 0.15);
                    box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.2);
                  }
                  
                  .social-icon-link:hover .instagram-icon {
                    background-color: rgba(225, 48, 108, 0.2);
                    box-shadow: 0 10px 25px -5px rgba(225, 48, 108, 0.4);
                  }
                  
                  .social-icon-link:hover .linkedin-icon {
                    background-color: rgba(10, 102, 194, 0.2);
                    box-shadow: 0 10px 25px -5px rgba(10, 102, 194, 0.4);
                  }
                  
                  .social-icon-link:hover .mastodon-icon {
                    background-color: rgba(99, 100, 255, 0.2);
                    box-shadow: 0 10px 25px -5px rgba(99, 100, 255, 0.4);
                  }
                  
                  .social-icon-link:hover .x-icon {
                    background-color: rgba(0, 0, 0, 0.15);
                    box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.2);
                  }
                  
                  .social-label {
                    opacity: 0;
                    transform: translateY(10px);
                    transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
                    position: absolute;
                    bottom: -24px;
                    font-size: 0.875rem;
                    font-weight: 500;
                  }
                  
                  .social-icon-link:hover .social-label {
                    opacity: 1;
                    transform: translateY(0);
                  }
                  
                  @keyframes pulse {
                    0% { transform: scale(1); }
                    50% { transform: scale(1.1); }
                    100% { transform: scale(1); }
                  }
                  
                  .social-icon-container:hover svg {
                    animation: pulse 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) infinite;
                  }
                `}</style>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-16 px-4 bg-card/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="font-serif font-black text-3xl md:text-4xl text-foreground mb-4">Meet Our Team</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              The passionate educators and mentors who make DjangoCampus workshops possible
            </p>
          </div>

          {teamLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(3)].map((_, i) => (
                <Card key={i} className="border-border bg-background animate-pulse">
                  <CardHeader className="text-center pb-4">
                    <div className="h-24 w-24 rounded-full bg-gray-300 mx-auto mb-4"></div>
                    <div className="h-6 bg-gray-300 rounded mb-2"></div>
                    <div className="h-4 bg-gray-300 rounded"></div>
                  </CardHeader>
                  <CardContent>
                    <div className="h-16 bg-gray-300 rounded mb-4"></div>
                    <div className="flex justify-center gap-3">
                      <div className="h-9 w-9 bg-gray-300 rounded"></div>
                      <div className="h-9 w-9 bg-gray-300 rounded"></div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : teamMembers.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {teamMembers.map((member) => (
                <Card key={member.id} className="border-border bg-background hover:shadow-lg transition-all duration-300 group">
                  <CardHeader className="text-center pb-4">
                    <div className="relative mx-auto mb-4">
                      <img 
                        src={member.image_url} 
                        alt={member.fullName}
                        className="h-24 w-24 rounded-full object-cover border-4 border-primary/10 group-hover:border-primary/30 transition-colors"
                        onError={(e) => {
                          e.currentTarget.src = "/placeholder-user.jpg"
                        }}
                      />
                    </div>
                    <CardTitle className="font-serif font-bold text-xl">{member.fullName}</CardTitle>
                    <CardDescription className="text-primary font-medium">
                      {member.position}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
                      {member.bio}
                    </p>
                    
                    {/* Social Links */}
                    {member.socials && member.socials.length > 0 && (
                      <div className="flex justify-center gap-3">
                        {member.socials.map((social) => (
                          <Button
                            key={social.id}
                            size="sm"
                            variant="ghost"
                            className={`h-9 w-9 p-0 ${getSocialColor(social.platform)}`}
                            asChild
                          >
                            <a 
                              href={social.url} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              title={`${member.fullName} on ${social.platform}`}
                            >
                              {getSocialIcon(social.platform)}
                              <span className="sr-only">{social.platform}</span>
                            </a>
                          </Button>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Users className="h-16 w-16 text-muted-foreground mx-auto mb-4 opacity-50" />
              <p className="text-muted-foreground">No team members found at the moment.</p>
            </div>
          )}

          {/* Join Team CTA */}
          <div className="text-center mt-12">
            <Card className="border-dashed border-2 border-primary/30 bg-primary/5 max-w-md mx-auto">
              <CardContent className="py-8">
                <Users className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="font-semibold text-lg mb-2">Want to Join Our Team?</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  We're always looking for passionate educators and mentors
                </p>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={handleContactEmail}
                  className="inline-flex items-center"
                >
                  <Mail className="mr-2 h-4 w-4" />
                  Get In Touch
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Support Community Section */}
      <section className="py-16 px-4 bg-gradient-to-br from-primary/5 to-secondary/5">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="mb-8">
            <Heart className="h-16 w-16 text-primary mx-auto mb-6" />
            <h2 className="font-serif font-black text-3xl md:text-4xl text-foreground mb-4">
              Support Our Movement
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              Help us reach more students across campuses. Your donation enables us to organize free workshops, 
              provide learning materials, and build a stronger tech community for the next generation.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <Card className="border-primary/20 bg-background/50 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <div className="text-2xl font-bold text-primary mb-2">$10</div>
                <p className="text-sm text-muted-foreground">Sponsor learning materials for one student</p>
              </CardContent>
            </Card>
            
            <Card className="border-primary/30 bg-primary/10 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <div className="text-2xl font-bold text-primary mb-2">$50</div>
                <p className="text-sm text-muted-foreground">Fund a complete workshop session</p>
              </CardContent>
            </Card>
            
            <Card className="border-primary/20 bg-background/50 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <div className="text-2xl font-bold text-primary mb-2">$100</div>
                <p className="text-sm text-muted-foreground">Support an entire campus outreach program</p>
              </CardContent>
            </Card>

            <Card className="border-dashed border-2 border-primary/30 bg-secondary/5 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <div className="text-2xl font-bold text-secondary mb-2">Custom</div>
                <p className="text-sm text-muted-foreground">Any amount helps build our community</p>
              </CardContent>
            </Card>
          </div>

          {/* Benefits Section */}
          <div className="mb-8 p-6 bg-background/50 rounded-lg backdrop-blur-sm">
            <h3 className="font-semibold text-lg text-center mb-4">Why Your Donation Matters</h3>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div className="text-center">
                <div className="mb-2">🎓</div>
                <p className="font-medium">Direct Impact</p>
                <p className="text-muted-foreground">100% goes to students - no overhead costs</p>
              </div>
              <div className="text-center">
                <div className="mb-2">🌱</div>
                <p className="font-medium">Long-term Growth</p>
                <p className="text-muted-foreground">Students become mentors, creating sustainable impact</p>
              </div>
              <div className="text-center">
                <div className="mb-2">📊</div>
                <p className="font-medium">Transparent Updates</p>
                <p className="text-muted-foreground">Regular reports on how your donation is used</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90"
              onClick={() => window.open('https://paystack.shop/pay/djangocampus-50', '_blank')}
            >
              <Heart className="mr-2 h-5 w-5" />
              Donate $50
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => window.open('https://paystack.shop/pay/djangocampus-donate', '_blank')}
            >
              <Heart className="mr-2 h-5 w-5" />
              Custom Amount
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => {
                const email = 'campus.django@gmail.com'
                const subject = 'Partnership & Sponsorship Inquiry - DjangoCampus'
                const body = `Hello Julius,

I'm interested in partnering with or sponsoring DjangoCampus to support your mission of bringing Django education to more students.

Please let me know more about:
- Partnership opportunities
- Sponsorship packages
- How I can contribute to the movement

Looking forward to hearing from you.

Best regards`
                
                const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
                try {
                  window.location.href = mailtoLink
                } catch (error) {
                  navigator.clipboard.writeText(email).then(() => {
                    alert(`Please send an email to: ${email}\n\nEmail address copied to clipboard!`)
                  }).catch(() => {
                    alert(`Please send an email to: ${email}`)
                  })
                }
              }}
            >
              <Users className="mr-2 h-5 w-5" />
              Become a Partner
            </Button>
          </div>

          {/* Additional Benefits */}
          <div className="mb-6 text-center">
            <p className="text-sm text-muted-foreground mb-2">
              <span className="font-medium">🎁 Donor Benefits:</span> Recognition on our website • Quarterly impact reports • Exclusive community updates
            </p>
            <p className="text-xs text-muted-foreground">
              All donations are used directly for educational programs. Tax receipts available upon request.
            </p>
          </div>

          <div className="mt-8 p-4 bg-background/30 rounded-lg backdrop-blur-sm">
            <p className="text-sm text-muted-foreground">
              🌟 Every contribution, no matter the size, helps us empower more young developers across Africa and beyond.
              <br />
              <span className="font-medium">Together, we're building the next generation of tech leaders.</span>
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />

      {/* Floating Action Button */}
      <FloatingButton 
        className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white p-4 rounded-full shadow-2xl border-0"
        onClick={() => window.location.href = '/workshops'}
      >
        <div className="flex items-center gap-2">
          <Calendar className="h-6 w-6" />
          <span className="font-semibold">Join Workshop</span>
        </div>
      </FloatingButton>
    </div>
  )
}
