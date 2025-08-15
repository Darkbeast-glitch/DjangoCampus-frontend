"use client"

import type React from "react"

import { useState } from "react"
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
import { Calendar, MapPin, Users, Clock, ArrowLeft } from "lucide-react"
import Link from "next/link"

const workshops = [
  {
    id: 1,
    title: "Django Fundamentals",
    description: "Learn the basics of Django web framework from scratch",
    date: "March 15-16, 2025",
    location: "University of Dar es Salaam, CoICT",
    duration: "2 days",
    level: "Beginner",
    spots: 30,
    registered: 18,
    image: "/african-woman-developer-smiling.png",
  },
  {
    id: 2,
    title: "Advanced Django & APIs",
    description: "Build REST APIs and advanced Django applications",
    date: "April 20-21, 2025",
    location: "Mzumbe University, Morogoro",
    duration: "2 days",
    level: "Intermediate",
    spots: 25,
    registered: 8,
    image: "/african-woman-teacher-computer.png",
  },
  {
    id: 3,
    title: "Django + React Integration",
    description: "Create modern web apps with Django backend and React frontend",
    date: "May 25-26, 2025",
    location: "University of Dodoma",
    duration: "2 days",
    level: "Advanced",
    spots: 20,
    registered: 5,
    image: "/placeholder-s8blj.png",
  },
  {
    id: 4,
    title: "Django for E-commerce",
    description: "Build complete e-commerce solutions with Django",
    date: "June 15-16, 2025",
    location: "Ardhi University, Dar es Salaam",
    duration: "2 days",
    level: "Intermediate",
    spots: 25,
    registered: 12,
    image: "/african-woman-developer-smiling.png",
  },
]

export default function WorkshopsPage() {
  const [selectedWorkshop, setSelectedWorkshop] = useState<number | null>(null)
  const [formData, setFormData] = useState({
    user_name: "",
    user_email: "",
    will_attend_physical: true,
    django_experience: "BEGINNER",
  })

  const handleRegister = (workshopId: number) => {
    setSelectedWorkshop(workshopId)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the data to your Django backend
    console.log("Registration data:", {
      workshop: selectedWorkshop,
      ...formData,
      registration_date: new Date().toISOString(),
    })
    alert("Registration submitted successfully!")
    setSelectedWorkshop(null)
    setFormData({
      user_name: "",
      user_email: "",
      will_attend_physical: true,
      django_experience: "BEGINNER",
    })
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/pycon-tanzania-logo.png" alt="PyCon Tanzania Logo" className="h-12 w-12" />
            <div>
              <h1 className="font-serif font-black text-xl text-foreground">Django Girls Tanzania</h1>
              <p className="text-sm text-muted-foreground">Powered by PyCon Tanzania</p>
            </div>
          </div>
          <nav className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2 text-foreground hover:text-primary transition-colors">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
          </nav>
        </div>
      </header>

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
            Tanzania's growing tech community.
          </p>
        </div>
      </section>

      {/* Workshops Grid */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {workshops.map((workshop) => (
              <Card
                key={workshop.id}
                className="border-border bg-card hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <CardHeader className="pb-3">
                  <img
                    src={workshop.image || "/placeholder.svg"}
                    alt={workshop.title}
                    className="w-full h-32 object-cover rounded-md mb-3"
                  />
                  <div className="flex items-center justify-between mb-2">
                    <Badge
                      variant={
                        workshop.level === "Beginner"
                          ? "default"
                          : workshop.level === "Intermediate"
                            ? "secondary"
                            : "destructive"
                      }
                    >
                      {workshop.level}
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      {workshop.registered}/{workshop.spots} spots
                    </span>
                  </div>
                  <CardTitle className="font-serif font-bold text-lg leading-tight">{workshop.title}</CardTitle>
                  <CardDescription className="text-sm">{workshop.description}</CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      {workshop.date}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      {workshop.location}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      {workshop.duration}
                    </div>
                  </div>

                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        className="w-full bg-primary hover:bg-primary/90"
                        onClick={() => handleRegister(workshop.id)}
                        disabled={workshop.registered >= workshop.spots}
                      >
                        {workshop.registered >= workshop.spots ? "Workshop Full" : "Register Now"}
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                      <DialogHeader>
                        <DialogTitle className="font-serif font-bold">Register for Workshop</DialogTitle>
                        <DialogDescription>
                          {workshop.title} - {workshop.date}
                        </DialogDescription>
                      </DialogHeader>
                      <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="user_name">Full Name</Label>
                          <Input
                            id="user_name"
                            value={formData.user_name}
                            onChange={(e) => setFormData({ ...formData, user_name: e.target.value })}
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="user_email">Email Address</Label>
                          <Input
                            id="user_email"
                            type="email"
                            value={formData.user_email}
                            onChange={(e) => setFormData({ ...formData, user_email: e.target.value })}
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="django_experience">Django Experience Level</Label>
                          <Select
                            value={formData.django_experience}
                            onValueChange={(value) => setFormData({ ...formData, django_experience: value })}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="BEGINNER">Beginner</SelectItem>
                              <SelectItem value="INTERMEDIATE">Intermediate</SelectItem>
                              <SelectItem value="ADVANCED">Advanced</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="will_attend_physical"
                            checked={formData.will_attend_physical}
                            onCheckedChange={(checked) =>
                              setFormData({ ...formData, will_attend_physical: checked as boolean })
                            }
                          />
                          <Label htmlFor="will_attend_physical" className="text-sm">
                            I will attend the workshop physically
                          </Label>
                        </div>

                        <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
                          Complete Registration
                        </Button>
                      </form>
                    </DialogContent>
                  </Dialog>
                </CardContent>
              </Card>
            ))}
          </div>
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
                Workshops held across Tanzania to reach women in different regions.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
