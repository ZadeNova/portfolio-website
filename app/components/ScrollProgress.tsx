"use client";

import { motion, useScroll, useSpring, useReducedMotion } from "framer-motion";

export default function ScrollProgress() {
	const reducedMotion = !!useReducedMotion();
	const { scrollYProgress } = useScroll();
	const smoothed = useSpring(scrollYProgress, {
		stiffness: 120,
		damping: 26,
		restDelta: 0.001,
	});

	return (
		<motion.div
			className="scroll-progress-bar fixed top-0 left-0 right-0 h-[3px] origin-left z-[60]"
			style={{ scaleX: reducedMotion ? scrollYProgress : smoothed }}
			aria-hidden="true"
		/>
	);
}
