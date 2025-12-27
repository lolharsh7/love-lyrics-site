"use client"

export const dynamic = "force-static"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { TextAnimate } from "./ui/text-animate"

const lyrics = [
    [span_1](start_span)// Timing matching your LRC file[span_1](end_span)
    [span_2](start_span){ text: "Jis pe rakhe tum ne qadam", duration: 6350, anim: 1.5 }, // 00:00.00 to 00:06.35[span_2](end_span)
    [span_3](start_span){ text: "Ab se mera bhi raasta hai", duration: 2860, anim: 1.2 }, // to 00:09.21[span_3](end_span)
    [span_4](start_span){ text: "Jaise mera tum se koi", duration: 3540, anim: 1.2 },    // to 00:12.75[span_4](end_span)
    [span_5](start_span){ text: "Pichhle janam ka vaasta hai", duration: 2560, anim: 1.5 }, // to 00:15.31[span_5](end_span)
    
    // Bridge Section (Strictly as per LRC)
    [span_6](start_span){ text: "Adhoore adhoore", duration: 3120, anim: 1.0 },         // to 00:18.43[span_6](end_span)
    [span_7](start_span){ text: "Thhe vo din humare", duration: 3620, anim: 1.2 },      // to 00:22.05[span_7](end_span)
    [span_8](start_span){ text: "Tumhare bina jo", duration: 2950, anim: 1.0 },         // to 00:25.00[span_8](end_span)
    { text: "Guzaare thhe saare..", duration: 4000, anim: 1.5 },    // Transition to Sitaare
    
    // Hook
    { text: "Sitaare Sitaare", duration: 5000, anim: 2.0 },
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
    }, [currentLyricIndex, isAnimating, onComplete])

    return (
        <div className="w-full max-w-2xl lg:max-w-3xl flex flex-col items-center justify-center relative min-h-[400px]">
            {/* Audio: ensure the path is correct in your public folder */}
            <audio src="/sitaare-lofi.mp3" autoPlay playsInline />

            <AnimatePresence mode="wait">
                {isAnimating && (
                    <motion.div
                        key={currentLyricIndex}
                        initial={{ opacity: 0, y: 15, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -15, scale: 1.02 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        className="text-center"
                    >
                        <TextAnimate
                            by="word"
                            duration={lyrics[currentLyricIndex].anim}
                            animation="blurInUp"
                            className={`text-4xl md:text-6xl font-bold tracking-tight
                                ${lyrics[currentLyricIndex].text.includes("Sitaare") 
                                    ? "text-yellow-200 drop-shadow-[0_0_20px_rgba(253,224,71,0.6)]" 
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
