"use client"

export const dynamic = "force-static"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "with-framer-motion" // Check your import path
import { TextAnimate } from "./ui/text-animate"

[span_0](start_span)// Durations calculated from your provided timestamps[span_0](end_span)
const lyrics = [
    { text: "Jiss pe rakhe tumne kadam,", duration: 3500, anim: 1.5 },
    { text: "ab se mera bhi raasta hai", duration: 6530, anim: 1.5 },
    { text: "Jaise mera tum se koi pichhle janam ka vaasta hai", duration: 6230, anim: 2.2 },
    { text: "Adhoore-adhoore the woh din humare", duration: 6400, anim: 2.0 },
    { text: "Tumhare bina jo guzaare the saare", duration: 6960, anim: 2.0 },
    { text: "O, sitaare, sitaare, mile hain sitaare", duration: 5880, anim: 2.0 },
    { text: "Tabhi toh huye hain nazaare tumhare", duration: 3630, anim: 1.8 },
    { text: "Bas tum se milne ki der thi", duration: 4000, anim: 1.5 },
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
        <div className="w-full max-w-2xl lg:max-w-3xl flex flex-col items-center justify-center relative">
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
                        {currentLyricIndex === 0 ? (
                            <div className="flex flex-wrap justify-center items-center gap-x-3">
                                <TextAnimate
                                    by="word"
                                    duration={1.2}
                                    animation="blurInUp"
                                    className="text-3xl md:text-5xl lg:text-6xl text-foreground drop-shadow-[0_0_10px_rgba(155,77,255,0.35)]"
                                >
                                    Jiss
                                </TextAnimate>

                                <TextAnimate
                                    by="word"
                                    duration={1.2}
                                    delay={0.8}
                                    animation="blurInUp"
                                    className="text-3xl md:text-5xl lg:text-6xl text-foreground drop-shadow-[0_0_10px_rgba(155,77,255,0.35)] text-balance leading-normal"
                                >
                                    pe rakhe tumne kadam,
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
