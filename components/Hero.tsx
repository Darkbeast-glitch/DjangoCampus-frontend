"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Code, Sparkles, Rocket, Users, ArrowRight, Terminal } from "lucide-react"
import Typewriter from 'typewriter-effect'
import SplitText from "./SplitText"
import MagneticButton from "./MagneticButton"
import TextReveal from "./TextReveal"
import BlurText from "./BlurText"

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-950 via-gray-900 to-black">
      {/* Animated Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f15_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f15_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>

      {/* Floating Code Symbols */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-[10%] text-primary/20 text-6xl font-mono animate-float">{'<>'}</div>
        <div className="absolute top-40 right-[15%] text-green-500/20 text-5xl font-mono animate-float-delayed">{'{ }'}</div>
        <div className="absolute bottom-32 left-[20%] text-blue-500/20 text-7xl font-mono animate-float-slow">{'( )'}</div>
        <div className="absolute top-[60%] right-[25%] text-purple-500/20 text-6xl font-mono animate-float">{'[ ]'}</div>
        <div className="absolute bottom-[20%] right-[10%] text-orange-500/20 text-5xl font-mono animate-float-delayed">{'=>'}</div>
      </div>

      {/* Glowing Orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-green-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          
          {/* Badge */}
          <div className="mb-8 flex justify-center">
            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-6 py-2 backdrop-blur-sm">
              <Sparkles className="w-4 h-4 text-primary animate-pulse" />
              <BlurText 
                text="Empowering Women in Tech" 
                className="text-sm font-semibold bg-gradient-to-r from-primary to-green-400 bg-clip-text text-transparent"
                delay={0.1}
              />
              <Sparkles className="w-4 h-4 text-primary animate-pulse" />
            </div>
          </div>

          {/* Main Heading */}
          <div className="mb-8">
            <h1 className="font-black text-5xl sm:text-6xl md:text-7xl lg:text-8xl mb-6 leading-tight tracking-tight">
              <div className="text-white mb-2">
                <SplitText 
                  text="Learn Django," 
                  className="inline-block"
                  delay={0.3}
                />
              </div>
              <div className="bg-gradient-to-r from-primary via-green-400 to-blue-400 bg-clip-text text-transparent font-serif">
                <Typewriter
                  options={{
                    strings: [
                      'Build Amazing Apps',
                      'Create Your Future',
                      'Code with Purpose',
                      'Join Our Community',
                      'Transform Your Life'
                    ],
                    autoStart: true,
                    loop: true,
                    delay: 80,
                    deleteSpeed: 50,
                  }}
                />
              </div>
            </h1>
          </div>

          {/* Subtitle */}
          <TextReveal className="mb-12" delay={0.5}>
            <p className="text-lg md:text-xl lg:text-2xl text-gray-300 font-light max-w-3xl mx-auto leading-relaxed">
              <BlurText 
                text="Free Django workshops designed for women across Africa. From beginner to builder—we'll take you there." 
                delay={1.5}
                className="block"
              />
              <span className="flex items-center justify-center gap-2 mt-4 text-primary font-semibold tracking-wide">
                <Terminal className="w-5 h-5" />
                <BlurText  
                  text="No experience required. Just bring your passion!" 
                  delay={2.5}
                />
              </span>
            </p>
          </TextReveal>

          {/* Stats Bar */}
          <div className="mb-12 flex flex-wrap justify-center gap-8 text-center">
            <div className="group">
              <div className="text-4xl font-bold text-white group-hover:text-primary transition-colors">
                <BlurText text="500+" delay={2.0} />
              </div>
              <div className="text-sm text-gray-400 mt-1">Youth Trained</div>
            </div>
            <div className="w-px h-16 bg-gray-700 hidden sm:block"></div>
            <div className="group">
              <div className="text-4xl font-bold text-white group-hover:text-green-400 transition-colors">
                <BlurText text="5+" delay={2.2} />
              </div>
              <div className="text-sm text-gray-400 mt-1">Workshops</div>
            </div>
            <div className="w-px h-16 bg-gray-700 hidden sm:block"></div>
            <div className="group">
              <div className="text-4xl font-bold text-white group-hover:text-blue-400 transition-colors">
                <BlurText text="3+" delay={2.4} />
              </div>
              <div className="text-sm text-gray-400 mt-1">Cities</div>
            </div>
          </div>

          {/* Call to Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <MagneticButton 
              className="group bg-gradient-to-r from-primary to-green-500 hover:from-primary/90 hover:to-green-500/90 text-white text-lg px-8 py-4 rounded-xl shadow-2xl border-0 cursor-pointer transition-all hover:shadow-primary/50"
              strength={0.3}
            >
              <a href="/workshops" className="flex items-center gap-3">
                <Rocket className="h-6 w-6 group-hover:rotate-12 transition-transform" />
                <span>Join a Workshop</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </MagneticButton>

            <MagneticButton 
              className="group bg-white/10 hover:bg-white/20 text-white text-lg px-8 py-4 rounded-xl border-2 border-white/20 hover:border-white/40 cursor-pointer backdrop-blur-sm transition-all"
              strength={0.2}
            >
              <a href="/#about" className="flex items-center gap-3">
                <Users className="h-6 w-6 group-hover:scale-110 transition-transform" />
                <span>Learn More</span>
              </a>
            </MagneticButton>
          </div>

          {/* Scroll Indicator */}
          <div className="mt-20 flex flex-col items-center gap-2 animate-bounce">
            <div className="text-gray-500 text-sm font-medium">Scroll to explore</div>
            <div className="w-[2px] h-16 bg-gradient-to-b from-primary to-transparent"></div>
          </div>
        </div>
      </div>
    </section>
  )
}
