"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Calendar, 
  Clock, 
  Users, 
  Github, 
  GitBranch, 
  GitPullRequest, 
  Trophy, 
  Target,
  CheckCircle,
  ExternalLink,
  Code,
  Heart,
  Globe,
  Award
} from "lucide-react"
import Header from "@/components/layouts/Header"
import Footer from "@/components/layouts/Footer"
import HoverLiftCard from "@/components/HoverLiftCard"
import TextReveal from "@/components/TextReveal"
import BlurText from "@/components/BlurText"
import MagneticButton from "@/components/MagneticButton"

export default function HacktoberfestPage() {
  const [activeTimelineItem, setActiveTimelineItem] = useState(0)

  const instructors = [
    {
      name: "Julius Boakye",
      role: " Software Engineer",
      expertise: "Full-Stack Development, Open Source Advocate",
      image: "/Julius.jpg",
      github: "https://github.com/Darkbeast-glitch",
      linkedin: "https://linkedin.com/in/juliusboakye"
    },
    {
      name: "Johanan O. Amoateng",
      role: "Software Engineer", 
      expertise: "Backend Development, ",
      image: "/Johanan.jpeg",
      github: "https://github.com/JohananOppongAmoateng",
      linkedin: "https://www.linkedin.com/in/johanan-oppong-amoateng/"
    },
    {
      name: "Ezra Yendau",
      role: "Software Engineer",
      expertise: "Backend Development",
      image: "/Ezra.jpg",
      github: "https://github.com/Ezi-code",
      linkedin: "https://www.linkedin.com/in/ezra-yendau-601ba3246/"
    }
  ]

  const timeline = [
    {
      date: "Oct 13",
      title: "Onboarding Session",
      description: "Get started with Hacktoberfest, learn about open source, and set up your development environment.",
      type: "workshop",
      time: "2:00 PM GMT"
    },
    {
      date: "Oct 15",
      title: "Git & GitHub Fundamentals",
      description: "Master version control, branching, and collaboration workflows essential for open source.",
      type: "workshop",
      time: "2:00 PM GMT"
    },
    {
      date: "Oct 18",
      title: "First Pull Request Workshop",
      description: "Learn how to find beginner-friendly issues and make your first contribution to open source.",
      type: "workshop", 
      time: "2:00 PM GMT"
    },
    {
      date: "Oct 22",
      title: "Code Review & Best Practices",
      description: "Understanding code quality, documentation, and effective communication in open source projects.",
      type: "workshop",
      time: "2:00 PM GMT"
    },
    {
      date: "Oct 25",
      title: "Django Contributions",
      description: "Focus on contributing to Django and Python projects, with hands-on guidance.",
      type: "workshop",
      time: "2:00 PM GMT"
    },
    {
      date: "Oct 29",
      title: "Final Sprint & Celebration",
      description: "Complete your pull requests, celebrate achievements, and plan for continued contributions.",
      type: "celebration",
      time: "2:00 PM GMT"
    },
    {
      date: "Oct 31",
      title: "Hacktoberfest Wrap-up",
      description: "Reflect on contributions, share experiences, and commit to ongoing open source participation.",
      type: "celebration", 
      time: "2:00 PM GMT"
    }
  ]

  const participationSteps = [
    {
      step: 1,
      title: "Register",
      description: "Sign up for Hacktoberfest on the official website between September 15 and October 31.",
      icon: <Users className="h-6 w-6" />
    },
    {
      step: 2,
      title: "Contribute",
      description: "Submit 6 high-quality pull/merge requests to participating repositories between October 1-31.",
      icon: <GitPullRequest className="h-6 w-6" />
    },
    {
      step: 3,
      title: "Get Approved",
      description: "Project maintainers must accept your PRs by merging, approving, or adding the 'hacktoberfest-accepted' label.",
      icon: <CheckCircle className="h-6 w-6" />
    },
    {
      step: 4,
      title: "Earn Rewards", 
      description: "Get your digital badge and level it up with each accepted PR. Super contributors (6 PRs) get exclusive swag!",
      icon: <Trophy className="h-6 w-6" />
    }
  ]

  return (
    <div className="min-h-screen bg-[#0D1117] text-white">
      <Header />

      {/* Hero Section */}
      <section className="relative py-12 sm:py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-64 h-64 bg-[#FF6B35]/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-[#FF8E3C]/10 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#D9376E]/10 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 container mx-auto text-center max-w-6xl px-4 sm:px-6">
          <TextReveal>
            <div className="flex justify-center mb-12 md:mb-8">
              <img 
                src="/HF-Stacked-Color-Light.png" 
                alt="Hacktoberfest Logo" 
                className="h-24 md:h-20 w-auto"
                onError={(e) => {
                  // Fallback if logo doesn't exist yet
                  e.currentTarget.style.display = 'none'
                  e.currentTarget.parentElement!.innerHTML = '<div class="text-6xl">🎃</div>'
                }}
              />
            </div>
          </TextReveal>

          {/* Hide Hacktoberfest text on mobile, show on desktop */}
          <TextReveal delay={0.2}>
            <h1 className="hidden md:block text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black mb-6 bg-gradient-to-r from-[#FF6B35] via-[#FF8E3C] to-[#D9376E] bg-clip-text text-transparent font-serif tracking-tight">
              Hacktoberfest
            </h1>
          </TextReveal>

          <TextReveal delay={0.4}>
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-8 md:mb-8 text-[#FF8E3C]">
              Open Source. For Everyone.
            </h2>
          </TextReveal>

          <TextReveal delay={0.6}>
            <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
              Join DjangoCampus for Hacktoberfest 2025! Learn, contribute, and celebrate open source 
              software with developers around the world. Make your mark on the global tech community.
            </p>
          </TextReveal>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <MagneticButton className="bg-gradient-to-r from-[#FF6B35] to-[#D9376E] hover:from-[#FF8E3C] hover:to-[#FF6B35] text-white text-base px-6 py-2 rounded-lg shadow-md border-0 cursor-pointer font-semibold h-12 min-h-0 flex items-center">
                <a href="https://events.mlh.io/events/13113-hactoberfest-2025-in-accra" target="_blank" rel="noopener noreferrer" className="flex items-center whitespace-nowrap">
                    <ExternalLink className="mr-2 h-5 w-5" />
                    Register for Hacktoberfest
                </a>
            </MagneticButton>

            <MagneticButton className="border-2 border-[#FF8E3C] text-[#FF8E3C] hover:bg-[#FF8E3C] hover:text-black text-lg px-8 py-4 rounded-lg bg-black/50 backdrop-blur-sm cursor-pointer font-semibold">
              <a href="/workshops" className="flex items-center">
                <Calendar className="mr-3 h-6 w-6" />
                Join Our Workshops
              </a>
            </MagneticButton>
          </div>
        </div>
      </section>

      {/* What is Hacktoberfest Section */}
      <section className="py-16 px-4 bg-[#161B22]">
        <div className="container mx-auto max-w-6xl">
          <TextReveal>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-center mb-12 text-[#FF8E3C] font-serif">
              What is Hacktoberfest?
            </h2>
          </TextReveal>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <TextReveal delay={0.2}>
              <div>
                <p className="text-xl text-gray-300 mb-6 leading-relaxed">
                  Hacktoberfest is a month-long celebration of open source software run by DigitalOcean. 
                  During the month of October, everyone is invited to join this global movement and contribute to open source projects.
                </p>
                <p className="text-xl text-gray-300 mb-6 leading-relaxed">
                  Whether you're a seasoned developer or just starting your coding journey, Hacktoberfest is the perfect 
                  opportunity to give back to the open source community and develop your skills.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Badge className="bg-[#FF6B35] text-white px-4 py-2 text-base">Open Source</Badge>
                  <Badge className="bg-[#FF8E3C] text-white px-4 py-2 text-base">Community</Badge>
                  <Badge className="bg-[#D9376E] text-white px-4 py-2 text-base">Learning</Badge>
                  <Badge className="bg-[#0969DA] text-white px-4 py-2 text-base">Collaboration</Badge>
                </div>
              </div>
            </TextReveal>

            <TextReveal delay={0.4}>
              <div className="grid grid-cols-2 gap-6">
                <HoverLiftCard className="text-center p-6 bg-gradient-to-br from-[#FF6B35]/20 to-[#FF8E3C]/20 rounded-lg border border-[#FF8E3C]/30">
                  <div className="text-4xl font-bold text-[#FF6B35] mb-2">10+</div>
                  <div className="text-gray-300">Years Running</div>
                </HoverLiftCard>
                <HoverLiftCard className="text-center p-6 bg-gradient-to-br from-[#D9376E]/20 to-[#FF6B35]/20 rounded-lg border border-[#D9376E]/30">
                  <div className="text-4xl font-bold text-[#D9376E] mb-2">500K+</div>
                  <div className="text-gray-300">Participants</div>
                </HoverLiftCard>
                <HoverLiftCard className="text-center p-6 bg-gradient-to-br from-[#0969DA]/20 to-[#FF8E3C]/20 rounded-lg border border-[#0969DA]/30">
                  <div className="text-4xl font-bold text-[#0969DA] mb-2">2M+</div>
                  <div className="text-gray-300">Pull Requests</div>
                </HoverLiftCard>
                <HoverLiftCard className="text-center p-6 bg-gradient-to-br from-[#FF8E3C]/20 to-[#D9376E]/20 rounded-lg border border-[#FF8E3C]/30">
                  <div className="text-4xl font-bold text-[#FF8E3C] mb-2">6</div>
                  <div className="text-gray-300">PRs for Swag</div>
                </HoverLiftCard>
              </div>
            </TextReveal>
          </div>
        </div>
      </section>

      {/* How to Participate Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <TextReveal>
            <h2 className="text-4xl md:text-5xl font-black text-center mb-12 text-[#FF8E3C] font-serif">
              How to Participate
            </h2>
          </TextReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {participationSteps.map((step, index) => (
              <TextReveal key={index} delay={0.2 * index}>
                <HoverLiftCard className="text-center p-8 bg-gradient-to-br from-[#161B22] to-[#0D1117] border border-[#FF8E3C]/20 rounded-lg">
                  <div className="mb-6 inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-[#FF6B35] to-[#D9376E] rounded-full text-white text-2xl font-bold">
                    {step.step}
                  </div>
                  <div className="mb-4 text-[#FF8E3C]">
                    {step.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-white">{step.title}</h3>
                  <p className="text-gray-300 leading-relaxed">{step.description}</p>
                </HoverLiftCard>
              </TextReveal>
            ))}
          </div>

          <TextReveal delay={0.8}>
            <div className="text-center mt-12">
              <Button className="bg-gradient-to-r from-[#FF6B35] to-[#D9376E] hover:from-[#FF8E3C] hover:to-[#FF6B35] text-white text-lg px-8 py-4" asChild>
                <a href="https://hacktoberfest.com/participation/" target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="mr-2 h-5 w-5" />
                  Learn More About Participation
                </a>
              </Button>
            </div>
          </TextReveal>
        </div>
      </section>

      {/* Instructors Section */}
      <section className="py-16 px-4 bg-[#161B22]">
        <div className="container mx-auto max-w-6xl">
          <TextReveal>
            <h2 className="text-4xl md:text-5xl font-black text-center mb-4 text-[#FF8E3C] font-serif">
              Meet Your Instructors
            </h2>
          </TextReveal>
          <TextReveal delay={0.2}>
            <p className="text-xl text-gray-300 text-center mb-12 max-w-3xl mx-auto">
              Learn from experienced software engineers who are passionate about open source and helping others grow in their development journey.
            </p>
          </TextReveal>

          <div className="grid md:grid-cols-3 gap-8">
            {instructors.map((instructor, index) => (
              <TextReveal key={index} delay={0.3 + 0.2 * index}>
                <HoverLiftCard className="bg-gradient-to-br from-[#0D1117] to-[#161B22] border border-[#FF8E3C]/20 rounded-lg overflow-hidden">
                  <div className="p-8">
                    <div className="text-center mb-6">
                      <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-r from-[#FF6B35] to-[#D9376E] p-0.5">
                        <img 
                          src={instructor.image} 
                          alt={instructor.name}
                          className="w-full h-full rounded-full object-cover bg-[#161B22]"
                        />
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2">{instructor.name}</h3>
                      <p className="text-[#FF8E3C] font-semibold mb-2">{instructor.role}</p>
                      <p className="text-gray-300 text-sm">{instructor.expertise}</p>
                    </div>
                    <div className="flex justify-center gap-4">
                      <Button variant="outline" size="sm" className="border-[#FF6B35] text-[#FF6B35] hover:bg-[#FF6B35] hover:text-white" asChild>
                        <a href={instructor.github} target="_blank" rel="noopener noreferrer">
                          <Github className="h-4 w-4" />
                        </a>
                      </Button>
                      <Button variant="outline" size="sm" className="border-[#0969DA] text-[#0969DA] hover:bg-[#0969DA] hover:text-white" asChild>
                        <a href={instructor.linkedin} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      </Button>
                    </div>
                  </div>
                </HoverLiftCard>
              </TextReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <TextReveal>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-center mb-4 text-[#FF8E3C] font-serif">
              Our Hacktoberfest Journey
            </h2>
          </TextReveal>
          <TextReveal delay={0.2}>
            <p className="text-xl text-gray-300 text-center mb-12 max-w-3xl mx-auto">
              Join us for a structured learning experience throughout October. From onboarding to celebration, 
              we'll guide you every step of the way.
            </p>
          </TextReveal>

          <div className="relative">
            {/* Timeline Line - Responsive positioning */}
            <div className="absolute left-4 md:left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#FF6B35] via-[#FF8E3C] to-[#D9376E]"></div>

            <div className="space-y-8 md:space-y-12">
              {timeline.map((event, index) => (
                <TextReveal key={index} delay={0.1 * index}>
                  <div className="relative">
                    {/* Timeline Dot - Smaller on mobile, larger on desktop */}
                    <div className={`absolute left-0 md:left-0 flex items-center justify-center w-8 h-8 md:w-16 md:h-16 rounded-full border-2 md:border-4 border-[#0D1117] ${
                      event.type === 'workshop' 
                        ? 'bg-gradient-to-r from-[#FF6B35] to-[#FF8E3C]' 
                        : 'bg-gradient-to-r from-[#D9376E] to-[#FF6B35]'
                    } z-10`}>
                      {event.type === 'workshop' ? (
                        <Code className="h-3 w-3 md:h-6 md:w-6 text-white" />
                      ) : (
                        <Trophy className="h-3 w-3 md:h-6 md:w-6 text-white" />
                      )}
                    </div>

                    {/* Date Badge - Prominent and outside card */}
                    <div className="ml-12 md:ml-20 mb-3">
                      <div className="inline-block bg-gradient-to-r from-[#FF6B35] to-[#FF8E3C] text-white px-3 py-1.5 md:px-4 md:py-2 rounded-full text-sm md:text-base font-bold shadow-lg">
                        📅 {event.date}
                      </div>
                    </div>

                    {/* Event Content Card */}
                    <HoverLiftCard className="ml-12 md:ml-20 p-4 md:p-6 bg-gradient-to-br from-[#161B22] to-[#0D1117] border border-[#FF8E3C]/20 rounded-lg">
                      <div className="flex flex-col gap-3 md:gap-4">
                        {/* Title and Badge */}
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                          <h3 className="text-lg md:text-xl font-bold text-white leading-tight">
                            {event.title}
                          </h3>
                          <Badge className={`${
                            event.type === 'workshop' 
                              ? 'bg-[#FF8E3C] text-white' 
                              : 'bg-[#D9376E] text-white'
                          } px-2 py-1 text-xs md:text-sm whitespace-nowrap self-start`}>
                            {event.type === 'workshop' ? '🎓 Workshop' : '🎉 Celebration'}
                          </Badge>
                        </div>

                        {/* Time Info */}
                        <div className="flex items-center gap-2 text-xs md:text-sm text-gray-400">
                          <Clock className="h-3 w-3 md:h-4 md:w-4" />
                          <span>{event.time}</span>
                        </div>

                        {/* Description */}
                        <p className="text-sm md:text-base text-gray-300 leading-relaxed">
                          {event.description}
                        </p>
                      </div>
                    </HoverLiftCard>
                  </div>
                </TextReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-[#FF6B35]/10 via-[#FF8E3C]/10 to-[#D9376E]/10">
        <div className="container mx-auto max-w-4xl text-center">
          <TextReveal>
            <h2 className="text-4xl md:text-5xl font-black mb-6 text-[#FF8E3C] font-serif">
              Ready to Hack?
            </h2>
          </TextReveal>
          <TextReveal delay={0.2}>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Join thousands of developers in making meaningful contributions to open source. 
              Let's build the future of technology together!
            </p>
          </TextReveal>
          <TextReveal delay={0.4}>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <MagneticButton className="bg-gradient-to-r from-[#FF6B35] to-[#D9376E] hover:from-[#FF8E3C] hover:to-[#FF6B35] text-white text-lg px-8 py-4 rounded-lg shadow-2xl border-0 cursor-pointer font-semibold">
                <a href="https://hacktoberfest.com" target="_blank" rel="noopener noreferrer" className="flex items-center">
                  <ExternalLink className="mr-3 h-6 w-6" />
                  Start Your Journey
                </a>
              </MagneticButton>
              <MagneticButton className="border-2 border-[#FF8E3C] text-[#FF8E3C] hover:bg-[#FF8E3C] hover:text-black text-lg px-8 py-4 rounded-lg bg-black/50 backdrop-blur-sm cursor-pointer font-semibold">
                <a href="https://whatsapp.com/channel/0029VbB2boDEawdueVgsYC39" className="flex items-center">
                  <Users className="mr-3 h-6 w-6" />
                  Join Our Community
                </a>
              </MagneticButton>
            </div>
          </TextReveal>
        </div>
      </section>

      <Footer />
    </div>
  )
}