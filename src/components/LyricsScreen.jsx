"use client"

export const dynamic = "force-static"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { TextAnimate } from "./ui/text-animate"

// These are the EXACT seconds where Arijit starts singing each line in your file
const lyrics = [
    { text: "Jis pe rakhe tum ne qadam", startTime: 12.4, anim: 1.5 },
    { text: "Ab se mera bhi raasta hai", startTime: 15.8, anim: 1.5 },
    { text: "Jaise mera tum se koi", startTime: 19.3, anim: 1.5 },
    { text: "Pichhle janam ka vaasta hai", startTime: 22.8, anim: 2.0 },
    
    // Repetition (Second time he sings the verse)
    { text: "Jis pe rakhe tum ne qadam", startTime: 26.2, anim: 1.5 },
    { text: "Ab se mera bhi raasta hai", startTime: 29.6, anim: 1.5 },
    { text: "Jaise mera tum se koi", startTime: 33.1, anim: 1.5 },
    { text: "Pichhle janam ka vaasta hai", startTime: 36.6, anim: 2.0 },

    // Bridge
    { text: "Adhoore adhoore", startTime: 40.8, anim: 1.2 },
    { text: "Thhe vo din humare", startTime: 43.8, anim: 1.5 },
    { text: "Tumhare bina jo", startTime: 47.4, anim: 1.2 },
    { text: "Guzaare thhe saare..", startTime: 50.4, anim: 1.5 },

    // Hook
    { text: "Sitaare Sitaare", startTime: 54.6, anim: 2.0 },
    { text: "Mile hain Sitaare", startTime: 58.0, anim: 2.2 },
]

export default function LyricsScreen({ onComplete }) {
    const [currentLyricIndex, setCurrentLyricIndex] = useState(-1)
    const audioRef = useRef(null)

    useEffect(() => {
        const audio = audioRef.current
        if (!audio) return

        const syncLyrics = () => {
            const currentTime = audio.currentTime
            // Find the correct line based on actual song time
            const index = lyrics.findLastIndex(l => currentTime >= l.startTime)
            
            if (index !== currentLyricIndex) {
                setCurrentLyricIndex(index)
            }
        };

        audio.addEventListener("timeupdate", syncLyrics)
        return () => audio.removeEventListener("timeupdate", syncLyrics)
    }, [currentLyricIndex])

    return (
        <div className="w-full max-w-2xl lg:max-w-3xl flex flex-col items-center justify-center relative min-h-[400px]">
            {/* Audio starts playing immediately on load */}
            <audio 
                ref={audioRef}
                src="/sitaare-arijit.mp3" 
                autoPlay 
                controls={false} // Hidden for a clean look
            />

            <AnimatePresence mode="wait">
                {currentLyricIndex !== -1 && (
                    <motion.div
                        key={currentLyricIndex}
                        initial={{ opacity: 0, y: 10, filter: "blur(10px)" }}
                        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        exit={{ opacity: 0, y: -10, filter: "blur(10px)" }}
                        transition={{ duration: 0.4 }}
                        className="text-center"
                    >
                        <TextAnimate
                            by="word"
                            duration={lyrics[currentLyricIndex].anim}
                            animation="blurInUp"
                            className={`text-3xl md:text-5xl lg:text-6xl font-bold
                                ${lyrics[currentLyricIndex].text.includes("Sitaare") 
                                    ? "text-yellow-200 drop-shadow-[0_0_20px_rgba(253,224,71,0.6)]" 
                                    : "text-white"}`}
                        >
                            {lyrics[currentLyricIndex].text}
                        </TextAnimate>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
