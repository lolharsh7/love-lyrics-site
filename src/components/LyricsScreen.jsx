"use client"

export const dynamic = "force-static"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { TextAnimate } from "./ui/text-animate"

const lyrics = [
    // 00:00.00 -> 00:06.35
    { text: "Jis pe rakhe tum ne qadam", duration: 6350, anim: 2.0 }, 
    // 00:06.35 -> 00:09.21
    { text: "Ab se mera bhi raasta hai", duration: 2860, anim: 1.2 }, 
    // 00:09.21 -> 00:12.75
    { text: "Jaise mera tum se koi", duration: 3540, anim: 1.5 },
    // 00:12.75 -> 00:15.31 (Pacing fixed)
    { text: "Pichhle janam ka vaasta hai", duration: 2560, anim: 1.5 },
    
    // Adhoore Section (Timing matching your LRC file)
    { text: "Adhoore adhoore", duration: 3120, anim: 1.2 }, 
    { text: "Thhe vo din humare", duration: 3620, anim: 1.5 },
    { text: "Tumhare bina jo", duration: 2950, anim: 1.2 }, 
    // Music yahan lamba pause leta hai (~6.5 seconds)
    { text: "Guzaare thhe saare..", duration: 6500, anim: 1.5 },

    // Hook (Starts exactly after the music pause)
    { text: "Sitaare Sitaare", duration: 5000, anim: 2.5 },
]

export default function LyricsScreen({ onComplete }) {
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
    }, [isAnimating, currentLyricIndex, onComplete])

    return (
        <div className="w-full max-w-2xl lg:max-w-3xl flex flex-col items-center justify-center relative min-h-[400px]">
            <audio src="/sitaare-lofi.mp3" autoPlay playsInline />

            <AnimatePresence mode="wait">
                {isAnimating && currentLyricIndex < lyrics.length && (
                    <motion.div
                        key={currentLyricIndex}
                        initial={{ opacity: 0, y: 12, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -12, scale: 1.02 }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                        className="text-center px-4"
                    >
                        <TextAnimate
                            by="word"
                            duration={lyrics[currentLyricIndex].anim}
                            animation="blurInUp"
                            className={`text-3xl md:text-5xl lg:text-6xl font-bold leading-tight
                                ${lyrics[currentLyricIndex].text.includes("Sitaare") 
                                    ? "text-yellow-200 drop-shadow-[0_0_25px_rgba(253,224,71,0.7)]" 
                                    : "text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]"
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
