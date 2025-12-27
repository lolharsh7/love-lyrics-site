"use client"

export const dynamic = "force-static"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { TextAnimate } from "./ui/text-animate"

const lyrics = [
    // Pehli line mein humne Intro ka 4.8s + Lyric ka 3.2s add kar diya hai = 8000ms
    { text: "Jis pe rakhe tum ne qadam", duration: 8000, anim: 1.5 }, 
    { text: "Ab se mera bhi raasta hai", duration: 3400, anim: 1.5 },
    { text: "Jaise mera tum se koi", duration: 3400, anim: 1.5 },
    { text: "Pichhle janam ka vaasta hai", duration: 4800, anim: 1.8 },
    
    { text: "Jis pe rakhe tum ne qadam", duration: 3200, anim: 1.5 },
    { text: "Ab se mera bhi raasta hai", duration: 3400, anim: 1.5 },
    { text: "Jaise mera tum se koi", duration: 3400, anim: 1.5 },
    { text: "Pichhle janam ka vaasta hai", duration: 5000, anim: 1.8 },

    // Adhoore Section
    { text: "Adhoore adhoore", duration: 2800, anim: 1.2 }, 
    { text: "Thhe vo din humare", duration: 3200, anim: 1.5 },
    { text: "Tumhare bina jo", duration: 3200, anim: 1.2 }, 
    { text: "Guzaare thhe saare..", duration: 3800, anim: 1.5 },

    // Hook
    { text: "Sitaare Sitaare", duration: 3500, anim: 2.0 },
    { text: "Mile hain Sitaare", duration: 4000, anim: 2.2 },
]

export default function LyricsScreen({ onComplete }) {
    // Seedha 0 se start taaki screen blank na rahe
    const [currentLyricIndex, setCurrentLyricIndex] = useState(0)
    const [isAnimating, setIsAnimating] = useState(true)

    useEffect(() => {
        if (!isAnimating || currentLyricIndex >= lyrics.length) return

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
    }, [currentLyricIndex, isAnimating, onComplete])

    return (
        <div className="w-full max-w-2xl lg:max-w-3xl flex flex-col items-center justify-center relative min-h-[400px]">
            {/* Audio autoPlay with muted if needed by browser */}
            <audio src="/sitaare-lofi.mp3" autoPlay playsInline />

            <AnimatePresence mode="wait">
                {isAnimating && (
                    <motion.div
                        key={currentLyricIndex}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.5 }}
                        className="text-center"
                    >
                        <TextAnimate
                            by="word"
                            duration={lyrics[currentLyricIndex].anim}
                            animation="blurInUp"
                            className={`text-4xl md:text-6xl font-bold
                                ${lyrics[currentLyricIndex].text.includes("Sitaare") 
                                    ? "text-yellow-200 drop-shadow-[0_0_15px_rgba(253,224,71,0.6)]" 
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
