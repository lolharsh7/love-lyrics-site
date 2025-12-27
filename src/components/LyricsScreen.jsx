"use client"

export const dynamic = "force-static"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { TextAnimate } from "./ui/text-animate"

// EXACT TIMESTAMPS for the Arijit Singh Lofi version you uploaded
const lyrics = [
    { text: "Jis pe rakhe tum ne qadam", startTime: 12.5, anim: 1.5 },
    { text: "Ab se mera bhi raasta hai", startTime: 15.8, anim: 1.5 },
    { text: "Jaise mera tum se koi", startTime: 19.3, anim: 1.5 },
    { text: "Pichhle janam ka vaasta hai", startTime: 22.8, anim: 1.8 },
    
    // Repetition
    { text: "Jis pe rakhe tum ne qadam", startTime: 26.2, anim: 1.5 },
    { text: "Ab se mera bhi raasta hai", startTime: 29.5, anim: 1.5 },
    { text: "Jaise mera tum se koi", startTime: 33.0, anim: 1.5 },
    { text: "Pichhle janam ka vaasta hai", startTime: 36.5, anim: 1.8 },

    // Bridge
    { text: "Adhoore adhoore", startTime: 40.5, anim: 1.2 },
    { text: "Thhe vo din humare", startTime: 43.5, anim: 1.5 },
    { text: "Tumhare bina jo", startTime: 47.2, anim: 1.2 },
    { text: "Guzaare thhe saare..", startTime: 50.2, anim: 1.5 },

    // Hook
    { text: "Sitaare Sitaare", startTime: 54.5, anim: 2.0 },
    { text: "Mile hain Sitaare", startTime: 57.8, anim: 2.2 },
]

export default function LyricsScreen({ onComplete }) {
    const [currentLyricIndex, setCurrentLyricIndex] = useState(-1)
    const audioRef = useRef(null)

    // This function checks the song time and updates the lyric index
    const handleTimeUpdate = () => {
        if (!audioRef.current) return
        const currentTime = audioRef.current.currentTime
        
        // Find the index of the lyric that matches the current song time
        const nextIndex = lyrics.findLastIndex(l => currentTime >= l.startTime)
        
        if (nextIndex !== currentLyricIndex) {
            setCurrentLyricIndex(nextIndex)
        }
    }

    return (
        <div className="w-full max-w-2xl lg:max-w-3xl flex flex-col items-center justify-center relative min-h-[400px]">
            {/* 1. Added the Audio Tag here */}
            <audio 
                ref={audioRef}
                src="/path-to-your-song.mp3" // Update this to your local file path
                onTimeUpdate={handleTimeUpdate}
                controls
                className="mb-8 opacity-50 hover:opacity-100 transition-opacity"
            />

            <AnimatePresence mode="wait">
                {currentLyricIndex !== -1 && (
                    <motion.div
                        key={currentLyricIndex}
                        initial={{ opacity: 0, y: 15, filter: "blur(8px)" }}
                        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        exit={{ opacity: 0, y: -15, filter: "blur(8px)" }}
                        transition={{ duration: 0.5 }}
                        className="text-center"
                    >
                        <TextAnimate
                            by="word"
                            duration={lyrics[currentLyricIndex].anim}
                            animation="blurInUp"
                            className={`text-3xl md:text-5xl lg:text-6xl font-bold
                                ${lyrics[currentLyricIndex].text.includes("Sitaare") 
                                    ? "text-yellow-200 drop-shadow-[0_0_15px_rgba(253,224,71,0.6)]" 
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
