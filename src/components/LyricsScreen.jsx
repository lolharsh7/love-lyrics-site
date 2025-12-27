"use client"

export const dynamic = "force-static"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { TextAnimate } from "./ui/text-animate"

// Audio timing ke mutabiq updated lyrics
// duration ms mein hai aur anim seconds mein
const lyrics = [
    { text: "Jiss pe rakhe tumne kadam", duration: 3500, anim: 2.0 },
    { text: "Ab se mera bhi raasta hai", duration: 4000, anim: 1.8 },
    { text: "Jaise mera tum se koi", duration: 7500, anim: 2.2 },
    { text: "Pichhle janam ka vaasta hai", duration: 5500, anim: 1.8 },
    { text: "Adhoore adhoore, thhe woh din hamare", duration: 7200, anim: 2.4 },
    { text: "Tumhare bina jo, guzaare thhe saare", duration: 7800, anim: 2.4 },
    { text: "Sitaare sitaare, mile hain sitaare", duration: 5200, anim: 1.8 },
    { text: "Tabhi toh huye hain, nazaare tumhare", duration: 7500, anim: 2.2 },
    { text: "Bas... tum se milne ki der thi", duration: 5000, anim: 1.5 },
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
        <div className="w-full max-w-2xl lg:max-w-3xl flex flex-col items-center justify-center relative min-h-[200px]">
            <AnimatePresence mode="wait">
                {isAnimating && currentLyricIndex < lyrics.length && (
                    <motion.div
                        key={currentLyricIndex}
                        initial={{ opacity: 0, y: 10, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.97 }}
                        transition={{ duration: 0.6, ease: "easeInOut" }}
                        className="text-center"
                    >
                        {/* Pehli line ke liye special split logic */}
                        {currentLyricIndex === 0 ? (
                            <div className="flex flex-wrap justify-center items-center gap-x-3">
                                <TextAnimate
                                    by="word"
                                    duration={1.2}
                                    animation="blurInUp"
                                    className="text-3xl md:text-5xl lg:text-6xl text-foreground drop-shadow-[0_0_10px_rgba(155,77,255,0.35)]"
                                >
                                    Jiss pe rakhe
                                </TextAnimate>

                                <TextAnimate
                                    by="word"
                                    duration={1.2}
                                    delay={1.2}
                                    animation="blurInUp"
                                    className="text-3xl md:text-5xl lg:text-6xl text-foreground drop-shadow-[0_0_10px_rgba(155,77,255,0.35)] text-balance leading-normal"
                                >
                                    tumne kadam
                                </TextAnimate>
                            </div>
                        ) : (
                            <TextAnimate
                                by="word"
                                duration={lyrics[currentLyricIndex].anim}
                                animation="blurInUp"
                                className="text-3xl md:text-5xl lg:text-6xl text-foreground drop-shadow-[0_0_10px_rgba(155,77,255,0.35)] text-balance leading-normal"
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
