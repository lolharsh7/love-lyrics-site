"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { TextAnimate } from "./ui/text-animate"

const lyrics = [
    { text: "Jis pe rakhe tum ne qadam", startTime: 12.4, anim: 1.5 },
    { text: "Ab se mera bhi raasta hai", startTime: 15.8, anim: 1.5 },
    { text: "Jaise mera tum se koi", startTime: 19.3, anim: 1.5 },
    { text: "Pichhle janam ka vaasta hai", startTime: 22.8, anim: 2.0 },
    
    { text: "Jis pe rakhe tum ne qadam", startTime: 26.2, anim: 1.5 },
    { text: "Ab se mera bhi raasta hai", startTime: 29.6, anim: 1.5 },
    { text: "Jaise mera tum se koi", startTime: 33.1, anim: 1.5 },
    { text: "Pichhle janam ka vaasta hai", startTime: 36.6, anim: 2.0 },

    // --- ADHOORE SECTION (Fixed Timings) ---
    { text: "Adhoore adhoore", startTime: 40.2, anim: 1.2 }, 
    { text: "Thhe vo din humare", startTime: 43.4, anim: 1.5 },
    { text: "Tumhare bina jo", startTime: 46.8, anim: 1.2 }, 
    { text: "Guzaare thhe saare..", startTime: 50.0, anim: 1.5 },

    // --- HOOK ---
    { text: "Sitaare Sitaare", startTime: 54.4, anim: 2.0 },
    { text: "Mile hain Sitaare", startTime: 57.8, anim: 2.2 },
]

export default function LyricsScreen() {
    const [currentLyricIndex, setCurrentLyricIndex] = useState(-1)
    const audioRef = useRef(null)

    useEffect(() => {
        const audio = audioRef.current
        if (!audio) return

        const handleSync = () => {
            const time = audio.currentTime
            // findLastIndex ensures we pick the correct line even if music buffers
            const index = lyrics.findLastIndex(l => time >= l.startTime)
            
            if (index !== currentLyricIndex) {
                setCurrentLyricIndex(index)
            }
        }

        audio.addEventListener("timeupdate", handleSync)
        return () => audio.removeEventListener("timeupdate", handleSync)
    }, [currentLyricIndex])

    return (
        <div className="w-full flex flex-col items-center justify-center min-h-[400px]">
            <audio 
                ref={audioRef} 
                src="/sitaare-arijit.mp3" 
                autoPlay 
                playsInline
            />

            <AnimatePresence mode="wait">
                {currentLyricIndex !== -1 && (
                    <motion.div
                        key={currentLyricIndex}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.1 }}
                        transition={{ duration: 0.4 }}
                        className="text-center"
                    >
                        <TextAnimate
                            by="word"
                            duration={lyrics[currentLyricIndex].anim}
                            animation="blurInUp"
                            className={`text-4xl md:text-6xl font-bold tracking-tighter
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
