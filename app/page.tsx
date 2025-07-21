"use client"

import { SiGithub, SiLinkedin } from "react-icons/si";
import { HiOutlineMail } from "react-icons/hi";
import { FiExternalLink } from "react-icons/fi";
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useEffect, useState, useRef } from "react"
import Magnetic from "@/components/magnetic"
import DynamicCursor from "@/components/dynamic-cursor"
import EmailForm from "@/components/emailForm";

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("about")
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 })
  const navRef = useRef<HTMLDivElement>(null)

  const navItems = [
    { id: "about", label: "ABOUT" },
    { id: "projects", label: "PROJECTS" },
    { id: "contact", label: "CONTACT" },
  ]

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["about", "projects", "contact"]
      const scrollPosition = window.scrollY + 200

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const offsetTop = element.offsetTop
          const offsetHeight = element.offsetHeight

          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    if (navRef.current) {
      const activeButton = navRef.current.querySelector(`[data-section="${activeSection}"]`) as HTMLElement
      if (activeButton) {
        const navRect = navRef.current.getBoundingClientRect()
        const buttonRect = activeButton.getBoundingClientRect()

        setIndicatorStyle({
          left: buttonRect.left - navRect.left,
          width: buttonRect.width,
        })
      }
    }
  }, [activeSection])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <div className="min-h-screen bg-white text-black font-aktiv">
      <DynamicCursor />

      {/* Glass Navigation Bar */}
      <nav
        className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 px-1.5 py-1.5 rounded-lg backdrop-blur-md bg-gray-200/40 border border-gray-300/30 shadow-lg md:top-6 md:left-1/2 md:transform md:-translate-x-1/2 
                max-md:top-auto max-md:bottom-6 max-md:left-1/2 max-md:transform max-md:-translate-x-1/2"
      >
        <div ref={navRef} className="flex items-center space-x-1 relative">
          {/* Sliding indicator */}
          <div
            className="absolute top-0 bottom-0 rounded-lg transition-all duration-300 ease-out border-t border-l border-t-white border-l-white"
            style={{
              left: `${indicatorStyle.left}px`,
              width: `${indicatorStyle.width}px`,
              boxShadow: "1px 1px 0px rgba(156, 163, 175, 0.6)",
            }}
          />

          {navItems.map((item) => (
            <div key={item.id}>
              <button
                data-section={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`relative px-5 py-2 rounded-md text-sm font-medium transition-all duration-300 z-10 ${
                  activeSection === item.id ? "text-gray-800" : "text-gray-700 hover:text-gray-900"
                }`}
              >
                {item.label}
              </button>
            </div>
          ))}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center px-12 lg:px-36 py-24">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left side - Text content */}
            <div className="space-y-8 text-center lg:text-left pt-12">
              <div className="space-y-6">
                <h1
                  className="text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-none"
                  data-cursor="text"
                >
                  JOSHUA
                  <br />
                  LEVANO
                </h1>
                <p className="text-xl md:text-2xl text-black/70 font-medium" data-cursor="text">
                  Full Stack Developer & Creative Technologist
                </p>
                <p className="text-lg text-black/60 max-w-lg leading-relaxed mx-auto lg:mx-0" data-cursor="text">
                Passionate about exploring the intersection of art and technology by designing user-centered applications that blend aesthetic intention with functional innovation.
                </p>
              </div>
              <div className="flex justify-center lg:justify-start">
                <Magnetic>
                  <Button
                    onClick={() => scrollToSection("projects")}
                    data-cursor="button"
                    className="bg-black hover:bg-black/90 text-white rounded-md px-8 py-6 text-lg font-medium"
                  >
                    View My Work
                  </Button>
                </Magnetic>
              </div>
            </div>

            {/* Right side - Portrait image */}
            <div className="flex justify-center">
              <Magnetic>
                <div
                  className="w-80 h-96 bg-gray-100 rounded-2xl overflow-hidden border border-black/10 shadow-lg"
                  data-cursor="image"
                >
                  <img
                    src="/placeholder.svg?height=480&width=320"
                    alt="Josh Levnao Portrait"
                    className="w-full h-full object-cover"
                  />
                </div>
              </Magnetic>
            </div>
          </div>
        </div>
      </section>

      {/* Section Divider */}
      <div className="w-full h-px bg-black/10"></div>

      {/* About Me Section */}
      <section id="about" className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-bold mb-16 text-left tracking-tight" data-cursor="text">
            About Me
          </h2>
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <p className="text-lg text-black/80 leading-relaxed" data-cursor="text">
              I'm a full-stack developer with a creative edge, combining solid React and Next.js skills with a strong eye for design.
              I've crafted UI for freelance clients and enjoy exploring new technologies to build interfaces that are both functional and visually compelling.
              Whether building dynamic web apps or compelling interfaces, I bring both precision and play to the work I create.
              </p>
              <p className="text-lg text-black/80 leading-relaxed" data-cursor="text">
                When I'm not coding, you can find me at a cafe researching technologies to add to my repertoire,
                volunteering in clean up efforts/general aid for my community, or at the local concert venue.
              </p>
              <div className="flex space-x-4 pt-4">
                <a href="https://github.com/jawshlev" target="_blank" rel="noopener noreferrer">
                    <Button
                      variant="outline"
                      size="icon"
                      data-cursor="link"
                      className="rounded-full border-black/20 text-black hover:bg-black hover:text-white transition-colors bg-transparent"
                    >
                      <SiGithub className="h-5 w-5" />
                    </Button>
                </a>
                <a href="https://www.linkedin.com/in/josh-levano-746908263/" target="_blank" rel="noopener noreferrer">
                    <Button
                      variant="outline"
                      size="icon"
                      data-cursor="link"
                      className="rounded-full border-black/20 text-black hover:bg-black hover:text-white transition-colors bg-transparent"
                    >
                      <SiLinkedin className="h-5 w-5" />
                    </Button>
                </a>
                <Magnetic>
                <Button
                    onClick={() => scrollToSection("contact")}
                    variant="outline"
                    data-cursor="link"
                    className="flex items-center gap-2 rounded-full border border-black/20 text-black hover:bg-black hover:text-white transition-colors bg-transparent px-4 py-2"
                  >
                    <HiOutlineMail className="h-5 w-5" />
                    joshuadlevano@gmail.com
                  </Button>
                </Magnetic>
              </div>
            </div>
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold mb-6" data-cursor="text">
                  Core Technologies
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { skill: "React & Next.js", years: "5+ years" },
                    { skill: "TypeScript", years: "4+ years" },
                    { skill: "Node.js", years: "4+ years" },
                    { skill: "UI/UX Design", years: "3+ years" },
                  ].map((item, index) => (
                    <div key={index}>
                      <div className="border border-black/10 rounded-lg p-4 hover:border-black/20 transition-colors cursor-pointer">
                        <h2 className="font-semibold text-base mb-1" data-cursor="text">{item.skill}</h2>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-semibold mb-4" data-cursor="text">
                  Additional Skills
                </h3>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Python",
                    "C++",
                    "Firebase",
                    "Adobe Photoshop",
                    "Adobe Illustrator",
                    "Git",
                    "Figma",
                    "Tailwind",
                    "React Native",
                    "REST APIs",
                  ].map((skill, index) => (
                    <div key={index}>
                      <span className="px-3 py-1 bg-black/5 border border-black/10 rounded-full text-sm font-medium hover:bg-black/10 transition-colors cursor-pointer" data-cursor="text">
                        {skill}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section Divider */}
      <div className="w-full h-px bg-black/10"></div>

      {/* Projects Section */}
      <section id="projects" className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-bold mb-16 text-center tracking-tight" data-cursor="text">
            Featured Projects
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Refor(me)d",
                description: "An interactive application that utilizes ML Technologies to produce a portrait of the current user in the form of drag and drop windows that the user can use to manipulate their image.",
                image: "/reformed.png?height=200&width=300",
                tech: ["Next.js", "Javascript", "TensorFlow"],
                github: "https://github.com/jawshlev/reformed/",
                live: "https://jawshlev.github.io/reformed/",
              },
              {
                title: "YELLOWMind Course",
                description: "A hi-fi mockup of a therapy course made to help those with eating disorders and body dysmorphia. Made for a freelance client.",
                image: "/YELLOWMindPreview.png?height=200&width=300",
                tech: ["Figma", "Adobe Photoshop",],
                github: "#",
                live: "#",
              },
              {
                title: "Weather Dashboard",
                description: "A beautiful weather dashboard with location-based forecasts and interactive maps.",
                image: "/digitalValentine.png?height=200&width=300",
                tech: ["React", "API Integration", "Chart.js", "Tailwind"],
                github: "#",
                live: "#",
              },
            ].map((project, index) => (
              <Magnetic key={index}>
                <Card
                  className="border border-black/10 hover:border-black/20 transition-all duration-300 group overflow-hidden cursor-pointer"
                  data-cursor="button"
                >
                  <div className="aspect-video bg-black/5 relative overflow-hidden">
                    <img
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle className="text-xl font-bold">{project.title}</CardTitle>
                    <CardDescription className="text-black/70">{project.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tech.map((tech, techIndex) => (
                        <span key={techIndex} className="px-3 py-1 bg-black/10 rounded-full text-sm font-medium">
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="flex space-x-3">
                      <div>
                        <a href={project.github} target="_blank" rel="noopener noreferrer">
                          <Button
                            size="sm"
                            variant="outline"
                            data-cursor="link"
                            className="border-black/20 text-black hover:bg-black hover:text-white transition-colors bg-transparent"
                          >
                            <SiGithub className="h-4 w-4 mr-2" />
                            Code
                          </Button>
                        </a>
                      </div>
                      <div>
                        <a href={project.live} target="_blank" rel="nonopener noreferrer">
                          <Button
                            size="sm"
                            variant="outline"
                            data-cursor="link"
                            className="border-black/20 text-black hover:bg-black hover:text-white transition-colors bg-transparent"
                          >
                            <FiExternalLink className="h-4 w-4 mr-2" />
                            Live
                          </Button>
                        </a>
                        
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Magnetic>
            ))}
          </div>
        </div>
      </section>

      {/* Section Divider */}
      <div className="w-full h-px bg-black/10"></div>

      {/* Contact Section */}
      <section id="contact" className="py-24 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-bold mb-16 text-center tracking-tight" data-cursor="text">
            Get In Touch
          </h2>
          <div className="grid md:grid-cols-2 gap-16">
            <div className="space-y-8">
              <h3 className="text-3xl font-bold mb-6" data-cursor="text">
                Let's work together
              </h3>
              <p className="text-black/80 text-lg leading-relaxed" data-cursor="text">
                I'm always interested in new opportunities and exciting projects. Whether you have a question or just
                want to say hi, feel free to reach out!
              </p>
             
            </div>

            <Card className="border border-black/10">
              <CardContent className="p-8">
                <EmailForm/>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Section Divider */}
      <div className="w-full h-px bg-black/10"></div>

      {/* Footer */}
      <footer className="py-12 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-black/60 text-lg" data-cursor="text">
            © 2025 Josh Levano. Built with Next.js and Tailwind CSS.
          </p>
        </div>
      </footer>
    </div>
  )
}
