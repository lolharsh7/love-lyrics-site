"use client"

export const dynamic = "force-static"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { TextAnimate } from "./ui/text-animate"

const lyrics = [
    // Intro music: 4.8s wait (Vocal start at 0:04.8)
    { text: "Jis pe rakhe tum ne qadam", duration: 3200, anim: 1.5 }, 
    { text: "Ab se mera bhi raasta hai", duration: 3400, anim: 1.5 },
    { text: "Jaise mera tum se koi", duration: 3400, anim: 1.5 },
    { text: "Pichhle janam ka vaasta hai", duration: 4800, anim: 1.8 },
    
    // Repetition
    { text: "Jis pe rakhe tum ne qadam", duration: 3200, anim: 1.5 },
    { text: "Ab se mera bhi raasta hai", duration: 3400, anim: 1.5 },
    { text: "Jaise mera tum se koi", duration: 3400, anim: 1.5 },
    { text: "Pichhle janam ka vaasta hai", duration: 5000, anim: 1.8 },

    // Adhoore Section (Timing tightened here to prevent 'gadbad')
    { text: "Adhoore adhoore", duration: 2800, anim: 1.2 }, 
    { text: "Thhe vo din humare", duration: 3200, anim: 1.5 },
    { text: "Tumhare bina jo", duration: 3200, anim: 1.2 }, 
    { text: "Guzaare thhe saare..", duration: 3800, anim: 1.5 },

    // Hook
    { text: "Sitaare Sitaare", duration: 3500, anim: 2.0 },
    { text: "Mile hain Sitaare", duration: 4000, anim: 2.2 },
]

export default function LyricsScreen({ onComplete }) {
    const [currentLyricIndex, setCurrentLyricIndex] = useState(-1) // Start at -1 to handle intro
    const [isAnimating, setIsAnimating] = useState(false)

    useEffect(() => {
        // Precise intro delay matching the lo-fi beat
        const introTimer = setTimeout(() => {
            setCurrentLyricIndex(0)
            setIsAnimating(true)
        }, 4800)

        return () => clearTimeout(introTimer)
    }, [])

    useEffect(() => {
        if (!isAnimating || currentLyricIndex === -1) return

        const currentDuration = lyrics[currentLyricIndex].duration

        const timer = setTimeout(() => {
            if (currentLyricIndex < lyrics.length - 1) {
                setCurrentLyricIndex(prev => prev + 1)
            } else {
                setIsAnimating(false)
                if (onComplete) onComplete()
            }
        }, currentDuration)

        return () => clearTimeout(timer)
    }, [isAnimating, currentLyricIndex, onComplete])

    return (
        <div className="w-full max-w-2xl lg:max-w-3xl flex flex-col items-center justify-center relative min-h-[400px]">
            {/* Audio: plays automatically */}
            <audio src="/sitaare-lofi.mp3" autoPlay playsInline />

            <AnimatePresence mode="wait">
                {currentLyricIndex >= 0 && (
                    <motion.div
                        key={currentLyricIndex}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -12 }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                        className="text-center"
                    >
                        <TextAnimate
                            by="word"
                            duration={lyrics[currentLyricIndex].anim}
                            animation="blurInUp"
                            className={`text-3xl md:text-5xl lg:text-6xl font-bold
                                ${lyrics[currentLyricIndex].text.includes("Sitaare") 
                                    ? "text-yellow-200 drop-shadow-[0_0_20px_rgba(253,224,71,0.6)]" 
                                    : "text-white"
                                }`}
                        >
                            {lyrics[currentLyricIndex].text}
                        </TextAnimate>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
