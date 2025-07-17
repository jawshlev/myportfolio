"use client"

import { useEffect, useState } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"

interface CursorState {
  size: number
  variant: "default" | "text" | "button" | "link" | "image"
  mixBlendMode: "normal" | "difference"
}

export default function DynamicCursor() {
  const [cursorState, setCursorState] = useState<CursorState>({
    size: 32,
    variant: "default",
    mixBlendMode: "normal",
  })
  const [isVisible, setIsVisible] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  const cursorX = useMotionValue(0)
  const cursorY = useMotionValue(0)

  const springConfig = { damping: 25, stiffness: 700, mass: 0.5 }
  const cursorXSpring = useSpring(cursorX, springConfig)
  const cursorYSpring = useSpring(cursorY, springConfig)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768) // md breakpoint
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  useEffect(() => {
    if (isMobile) return

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - cursorState.size / 2)
      cursorY.set(e.clientY - cursorState.size / 2)
    }

    const handleMouseEnter = () => setIsVisible(true)
    const handleMouseLeave = () => setIsVisible(false)

    // Handle different cursor states based on element attributes
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const cursorType = target.getAttribute("data-cursor")

      if (cursorType === "text") {
        const target = e.target as HTMLElement
        // Only change size for big titles (h1, h2 elements)
        if (target.tagName === "H1" || target.tagName === "H2") {
          const fontSize = Number.parseInt(window.getComputedStyle(target).fontSize)
          setCursorState({
            size: fontSize * 1.5,
            variant: "text",
            mixBlendMode: "difference",
          })
        } else {
          // For other text elements, keep default size but apply styling
          setCursorState({
            size: 32,
            variant: "text",
            mixBlendMode: "difference",
          })
        }
      } else if (cursorType === "button") {
        setCursorState({
          size: 70,
          variant: "button",
          mixBlendMode: "difference",
        })
      } else if (cursorType === "link") {
        setCursorState({
          size: 45,
          variant: "link",
          mixBlendMode: "difference",
        })
      } else if (cursorType === "image") {
        setCursorState({
          size: 80,
          variant: "image",
          mixBlendMode: "difference",
        })
      } else if (target.tagName === "BUTTON" || target.closest("button")) {
        // Check if it's a nav button or main action button
        const isNavButton = target.closest("nav")
        const isMainButton =
          target.textContent?.includes("View My Work") || target.textContent?.includes("Send Message")

        if (isNavButton) {
          setCursorState({
            size: 45,
            variant: "text",
            mixBlendMode: "difference",
          })
        } else if (isMainButton) {
          setCursorState({
            size: 70,
            variant: "button",
            mixBlendMode: "difference",
          })
        } else {
          setCursorState({
            size: 55,
            variant: "button",
            mixBlendMode: "difference",
          })
        }
      } else if (target.tagName === "A" || target.closest("a")) {
        setCursorState({
          size: 45,
          variant: "link",
          mixBlendMode: "difference",
        })
      } else {
        setCursorState({
          size: 32,
          variant: "default",
          mixBlendMode: "normal",
        })
      }
    }

    const handleMouseOut = () => {
      setCursorState({
        size: 32,
        variant: "default",
        mixBlendMode: "normal",
      })
    }

    document.addEventListener("mousemove", moveCursor)
    document.addEventListener("mouseenter", handleMouseEnter)
    document.addEventListener("mouseleave", handleMouseLeave)
    document.addEventListener("mouseover", handleMouseOver)
    document.addEventListener("mouseout", handleMouseOut)

    return () => {
      document.removeEventListener("mousemove", moveCursor)
      document.removeEventListener("mouseenter", handleMouseEnter)
      document.removeEventListener("mouseleave", handleMouseLeave)
      document.removeEventListener("mouseover", handleMouseOver)
      document.removeEventListener("mouseout", handleMouseOut)
    }
  }, [cursorX, cursorY, cursorState.size, isMobile])

  const getCursorVariants = () => {
    switch (cursorState.variant) {
      case "text":
        return {
          backgroundColor: "white",
          border: "1px solid black",
        }
      case "button":
        return {
          backgroundColor: "black",
          border: "2px solid white",
        }
      case "link":
        return {
          backgroundColor: "transparent",
          border: "2px solid black",
        }
      case "image":
        return {
          backgroundColor: "rgba(0, 0, 0, 0.8)",
          border: "2px solid white",
        }
      default:
        return {
          backgroundColor: "black",
          border: "none",
        }
    }
  }

  // Don't render cursor on mobile
  if (isMobile) {
    return null
  }

  return (
    <>
      <style jsx global>{`
        * {
          cursor: none !important;
        }
        @media (max-width: 768px) {
          * {
            cursor: auto !important;
          }
        }
      `}</style>
      <motion.div
        className="fixed pointer-events-none z-[9999] flex items-center justify-center rounded-full"
        style={{
          left: cursorXSpring,
          top: cursorYSpring,
          mixBlendMode: cursorState.mixBlendMode,
          opacity: isVisible ? 1 : 0,
        }}
        animate={{
          width: cursorState.size,
          height: cursorState.size,
          ...getCursorVariants(),
        }}
        initial={{
          width: 32,
          height: 32,
          backgroundColor: "black",
        }}
        transition={{
          type: "spring",
          damping: 20,
          stiffness: 300,
          mass: 0.8,
        }}
      />
    </>
  )
}
