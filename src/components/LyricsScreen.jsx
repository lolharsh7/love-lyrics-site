"use client"

export const dynamic = "force-static"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { TextAnimate } from "./ui/text-animate"

const lyrics = [
    { text: "Jiss pe rakhe tumne kadam,", duration: 3500, anim: 0.8 }, 
    { text: "ab se mera bhi raasta hai", duration: 6500, anim: 0.8 }, 
    { text: "Jaise mera tum se koi pichhle janam ka vaasta hai", duration: 6200, anim: 1.0 },
    { text: "Adhoore-adhoore the woh din humare", duration: 6400, anim: 1.0 },
    { text: "Tumhare bina jo guzaare the saare", duration: 6900, anim: 1.0 },
    { text: "O, sitaare, sitaare, mile hain sitaare", duration: 5800, anim: 1.0 },
    { text: "Tabhi toh huye hain nazaare tumhare", duration: 3600, anim: 0.8 },
    { text: "Bas tum se milne ki der thi", duration: 4000, anim: 0.8 },
]

export default function LyricsScreen({ onComplete }) {
    const [currentLyricIndex, setCurrentLyricIndex] = useState(-1)
    const [isAnimating, setIsAnimating] = useState(true)

    useEffect(() => {
        if (!isAnimating) return

        // 1. Shuruati music ke liye wait (3.3s par trigger taaki 3.66s par word dikh jaye)
        if (currentLyricIndex === -1) {
            const initialTimer = setTimeout(() => {
                setCurrentLyricIndex(0)
            [span_2](start_span)}, 3300)[span_2](end_span)
            return () => clearTimeout(initialTimer)
        }

        // 2. Agli line kab aayegi (Timestamps based on your file)
        const currentDuration = lyrics[currentLyricIndex].duration

        const timer = setTimeout(() => {
            if (currentLyricIndex < lyrics.length - 1) {
                setCurrentLyricIndex(prev => prev + 1)
            } else {
                setIsAnimating(false)
                if (onComplete) onComplete()
            }
        [span_3](start_span)}, currentDuration)[span_3](end_span)

        return () => clearTimeout(timer)
    }, [isAnimating, currentLyricIndex, onComplete])

    return (
        <div className="w-full max-w-2xl lg:max-w-3xl flex flex-col items-center justify-center relative min-h-[300px]">
            <AnimatePresence mode="wait">
                {isAnimating && currentLyricIndex >= 0 && (
                    <motion.div
                        key={currentLyricIndex}
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        transition={{ duration: 0.3 }} // Exit delay ko minimize kiya hai
                        className="text-center"
                    >
                        {currentLyricIndex === 0 ? (
                            <div className="flex flex-wrap justify-center items-center gap-x-3">
                                <TextAnimate
                                    by="word"
                                    duration={0.6}
                                    animation="blurInUp"
                                    className="text-3xl md:text-5xl lg:text-6xl text-foreground drop-shadow-[0_0_10px_rgba(155,77,255,0.35)] font-bold"
                                >
                                    Jiss
                                </TextAnimate>
                                <TextAnimate
                                    by="word"
                                    duration={0.6}
                                    delay={0.3}
                                    animation="blurInUp"
                                    className="text-3xl md:text-5xl lg:text-6xl text-foreground drop-shadow-[0_0_10px_rgba(155,77,255,0.35)] font-bold"
                                >
                                    pe rakhe tumne kadam,
                                </TextAnimate>
                            </div>
                        ) : (
                            <TextAnimate
                                by="word"
                                duration={lyrics[currentLyricIndex].anim}
                                animation="blurInUp"
                                className="text-3xl md:text-5xl lg:text-6xl text-foreground drop-shadow-[0_0_10px_rgba(155,77,255,0.35)] font-bold"
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
