import { MapPin, Mail, PhoneCall, Twitter, Facebook, Instagram, Linkedin } from "lucide-react"
import Link from "next/link"
import Webring from "@/components/Webring"


export default function Footer() {
  const iconStyle = "p-2 bg-primary text-white rounded-md cursor-pointer transition-all duration-300 ease-in-out transform hover:scale-110 hover:text-limeTxt hover:bg-accent hover:shadow-[0_0_10px_rgba(0,255,150,0.7)]";
  const contactIconStyle = "p-2 bg-primary text-white rounded-full cursor-pointer transition-all duration-300 ease-in-out hover:text-limeTxt hover:bg-accent hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2";
  
  const navLinks = [
    { label: "About Us", href: "/#about" },
    { label: "Workshops", href: "/workshops" },
    { label: "Community", href: "/#community" },
    { label: "Resources", href: "#" },
  ]

  return (
    <footer className="py-12 px-4 bg-card border-t border-border">
      <div className="mt-8 mb-4">
          <Webring />
      </div>
      <div className="container mx-auto max-w-6xl">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <img src="/Campus_crop.png" alt="Django Campus" className="h-10 w-20" />
              <div>
                <h3 className="font-serif font-bold text-lg">Django Campus</h3>
                <p className="text-sm text-muted-foreground">Powered by Django</p>
              </div>
            </div>
            <p className="text-muted-foreground mb-4 w-full md:max-w-[75%]">
              Empowering youth to learn programming through free Django workshops across the world.
            </p>
            <div className="flex gap-4">
                <Link 
                  href="#" 
                  className="text-muted-foreground hover:text-primary transition-colors"
                  aria-label="Visit our Twitter profile"
                >
                  <Twitter size={35} className={iconStyle} />
                </Link>
              
              <Link 
                href="#" 
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Visit our Facebook page"
              >
                <Facebook size={35} className={iconStyle}/>
              </Link>
              <Link 
                href="#" 
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Visit our Instagram profile"
              >
                <Instagram size={35} className={iconStyle} />
              </Link>
              <Link 
                href="https://www.linkedin.com/company/djangocampus/" 
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Visit our LinkedIn"
              >
                <Linkedin size={35} className={iconStyle}/>
              </Link>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-muted-foreground">
                {
                  navLinks.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-muted-foreground">
              <div className="flex gap-3 items-center">
                <Mail size={35} className={contactIconStyle} aria-hidden="true"/>
                <li>campus.django@gmail.com</li>
              </div>
              <div className="flex gap-3 items-center">
                <MapPin size={35} className={contactIconStyle} aria-hidden="true"/>
                <li>Accra, Ghana</li>
              </div>
              <div className="flex gap-3 items-center">
                  <PhoneCall size={35} className={contactIconStyle} aria-hidden="true"/>
                <li>+233 50 015 9892</li>
              </div>
            </ul>
          </div>
        </div>
        <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground">
          <p>&copy; 2025 Django Campus. We are building a community of vibrant Django Developers.</p>
        </div>
      </div>
    </footer>
  )
}