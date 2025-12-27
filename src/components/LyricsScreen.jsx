"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { TextAnimate } from "./ui/text-animate"

// EXACT timestamps for the audio file you uploaded
const lyrics = [
    { text: "Jis pe rakhe tum ne qadam", startTime: 4.8, anim: 1.5 },
    { text: "Ab se mera bhi raasta hai", startTime: 8.0, anim: 1.5 },
    { text: "Jaise mera tum se koi", startTime: 11.5, anim: 1.5 },
    { text: "Pichhle janam ka vaasta hai", startTime: 15.0, anim: 2.0 },

    // Fixed Bridge Section - timed to the lofi beats
    { text: "Adhoore adhoore", startTime: 19.5, anim: 1.2 }, 
    { text: "Thhe vo din humare", startTime: 22.3, anim: 1.5 },
    { text: "Tumhare bina jo", startTime: 25.5, anim: 1.2 }, 
    { text: "Guzaare thhe saare..", startTime: 28.7, anim: 1.5 },

    // The Hook
    { text: "Sitaare Sitaare", startTime: 32.5, anim: 2.0 },
    { text: "Mile hain Sitaare", startTime: 35.8, anim: 2.0 },
]

export default function LyricsScreen({ onComplete }) {
    const [currentLyricIndex, setCurrentLyricIndex] = useState(-1)
    const audioRef = useRef(null)

    useEffect(() => {
        const audio = audioRef.current
        if (!audio) return

        const handleSync = () => {
            const time = audio.currentTime
            // This logic finds the correct lyric based on the song's current second
            const index = lyrics.findLastIndex(line => time >= line.startTime)
            
            if (index !== currentLyricIndex) {
                setCurrentLyricIndex(index)
            }

            if (audio.ended && onComplete) {
                onComplete()
            }
        }

        audio.addEventListener("timeupdate", handleSync)
        return () => audio.removeEventListener("timeupdate", handleSync)
    }, [currentLyricIndex, onComplete])

    return (
        <div className="w-full min-h-[400px] flex flex-col items-center justify-center relative">
            {/* Audio AutoPlay - Ensure the filename matches exactly in your public folder */}
            <audio 
                ref={audioRef} 
                src="/sitaare-lofi.mp3" 
                autoPlay 
                playsInline
            />

            <div className="w-full max-w-2xl lg:max-w-3xl flex items-center justify-center">
                <AnimatePresence mode="wait">
                    {currentLyricIndex !== -1 && (
                        <motion.div
                            key={currentLyricIndex}
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -10, scale: 1.05 }}
                            transition={{ duration: 0.4, ease: "easeOut" }}
                            className="text-center"
                        >
                            <TextAnimate
                                by="word"
                                duration={lyrics[currentLyricIndex].anim}
                                animation="blurInUp"
                                className={`text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight text-balance leading-tight
                                    ${lyrics[currentLyricIndex].text.includes("Sitaare") 
                                        ? "text-yellow-200 drop-shadow-[0_0_20px_rgba(253,224,71,0.6)]" 
                                        : "text-foreground drop-shadow-[0_0_10px_rgba(255,255,255,0.1)]"
                                    }`}
                            >
                                {lyrics[currentLyricIndex].text}
                            </TextAnimate>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    )
}
