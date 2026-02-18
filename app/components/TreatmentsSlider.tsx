"use client";

import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { motion } from "framer-motion";
import { useState } from "react";
import { div } from "framer-motion/client";

const treatments = [
    { title: "Braces", image: "/braces.png", tags: ["Dental Treatment", "Easy"] },
    { title: "Invisalign", image: "/invisalign.png", tags: ["Dental Treatment", "Moderate"] },
    { title: "Dentures", image: "/dentures.png", tags: ["Teeth Alignment", "Moderate"] },
    { title: "Dental Implants", image: "/dentalimplants.png", tags: ["Teeth Alignment", "Easy"] },
];

export default function TreatmentsSlider() {
    const [progress, setProgress] = useState(0);

    const [sliderRef] = useKeenSlider({
        loop: true,
        mode: "snap",
        slideChanged(slider) {
            const p = slider.track.details.progress;
            setProgress(p);
        },
        slides: {
            perView: 1.2,
            spacing: 24,
        },
        breakpoints: {
            "(min-width: 768px)": {
                slides: {
                    perView: 2.2,
                    spacing: 24,
                },
            },
            "(min-width: 1280px)": {
                slides: {
                    perView: 3,
                    spacing: 32,
                },
            },
        },
    });

    return (
        <div className="w-full">
            <div ref={sliderRef} className="keen-slider ">
                {treatments.map((item, index) => (
                    <div key={index} className="keen-slider__slide ">

                        <div className="p-2 cursor-pointer">
                            <motion.article
                                whileHover={{ scale: 1.02 }}
                                transition={{ type: "spring", stiffness: 200 }}
                                className="relative lg:h-[450px] 2xl:h-[550px] rounded-2xl bg-cover bg-center p-8 overflow-hidden"
                                style={{ backgroundImage: `url(${item.image})` }}
                            >
                                {/* Overlay corrigido */}
                                <div className="absolute inset-0 bg-black/20 rounded-2xl" />

                                <div className="relative z-10 text-white">
                                    <h3 className="text-2xl font-bold">{item.title}</h3>

                                    <div className="flex gap-3 mt-4 flex-wrap">
                                        {item.tags.map((tag, i) => (
                                            <span
                                                key={i}
                                                className="px-4 py-2 bg-white text-black rounded-full text-sm"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </motion.article>

                        </div>


                    </div>
                ))}


            </div>
            <div className="mt-6 h-1 w-full bg-gray-200 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gray-500"
          animate={{ width: `${progress * 100}%` }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
        />
      </div>
        </div>

    );
}
