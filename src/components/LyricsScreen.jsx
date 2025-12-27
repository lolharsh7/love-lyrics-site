"use client"

export const dynamic = "force-static"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { TextAnimate } from "./ui/text-animate"

const lyrics = [
    // Line 1: Special split logic
    { firstWord: "Jis", restText: "pe rakhe tum ne qadam", duration: 3200, anim: 1.5 },
    { text: "Ab se mera bhi raasta hai", duration: 3400, anim: 1.5 },
    { text: "Jaise mera tum se koi", duration: 3400, anim: 1.5 },
    { text: "Pichhle janam ka vaasta hai", duration: 4200, anim: 1.8 },
    
    // Repetition (The "×2" part in the song)
    { text: "Jis pe rakhe tum ne qadam", duration: 3200, anim: 1.5 },
    { text: "Ab se mera bhi raasta hai", duration: 3400, anim: 1.5 },
    { text: "Jaise mera tum se koi", duration: 3400, anim: 1.5 },
    { text: "Pichhle janam ka vaasta hai", duration: 4500, anim: 1.8 },

    // Bridge
    { text: "Adhoore adhoore", duration: 2800, anim: 1.2 },
    { text: "Thhe vo din humare", duration: 3200, anim: 1.5 },
    { text: "Tumhare bina jo", duration: 3200, anim: 1.2 },
    { text: "Guzaare thhe saare..", duration: 4000, anim: 1.5 },

    // Hook
    { text: "Sitaare Sitaare", duration: 3500, anim: 2.0 },
]

export default function LyricsScreen({ onComplete }) {
    const [currentLyricIndex, setCurrentLyricIndex] = useState(0)
    const [isAnimating, setIsAnimating] = useState(true)

    useEffect(() => {
        if (!isAnimating) return

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
            <AnimatePresence mode="wait">
                {isAnimating && currentLyricIndex < lyrics.length && (
                    <motion.div
                        key={currentLyricIndex}
                        initial={{ opacity: 0, y: 15, filter: "blur(8px)" }}
                        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        exit={{ opacity: 0, y: -15, filter: "blur(8px)" }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        className="text-center"
                    >
                        {currentLyricIndex === 0 ? (
                            <div className="flex flex-wrap justify-center items-center gap-x-3">
                                <TextAnimate
                                    by="word"
                                    duration={1.2}
                                    animation="blurInUp"
                                    className="text-3xl md:text-5xl lg:text-6xl text-foreground font-bold drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]"
                                >
                                    {lyrics[0].firstWord}
                                </TextAnimate>

                                <TextAnimate
                                    by="word"
                                    duration={1.5}
                                    delay={0.4}
                                    animation="blurInUp"
                                    className="text-3xl md:text-5xl lg:text-6xl text-foreground font-bold drop-shadow-[0_0_10px_rgba(255,255,255,0.3)] text-balance"
                                >
                                    {lyrics[0].restText}
                                </TextAnimate>
                            </div>
                        ) : (
                            <TextAnimate
                                by="word"
                                duration={lyrics[currentLyricIndex].anim}
                                animation="blurInUp"
                                className={`text-3xl md:text-5xl lg:text-6xl font-bold text-balance
                                    ${lyrics[currentLyricIndex].text?.includes("Sitaare") 
                                        ? "text-yellow-200 drop-shadow-[0_0_20px_rgba(253,224,71,0.7)]" 
                                        : "text-foreground drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]"
                                    }`}
                            >
                                {lyrics[currentLyricIndex].text}
                            </TextAnimate>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
