import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const RADIAL_LINES = [
  'M80 0 L20 60',
  'M80 0 L40 40',
  'M80 0 L60 20',
  'M80 0 L0 80',
  'M80 0 L45 0',
]

const CROSS_THREADS = [
  'M62 18 Q 50 30 38 42',
  'M50 30 Q 35 45 20 60',
  'M35 45 Q 18 60 5 75',
]

const PATHS = [...RADIAL_LINES, ...CROSS_THREADS]

export default function CobwebSVG() {
  const ref = useRef<SVGSVGElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <svg
      ref={ref}
      className="pointer-events-none absolute right-0 top-0 h-20 w-20 opacity-40"
      viewBox="0 0 80 80"
      fill="none"
      aria-hidden="true"
    >
      {PATHS.map((d, i) => (
        <motion.path
          key={d}
          d={d}
          stroke="#D4D0DC"
          strokeWidth="1"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: i * 0.05 }}
        />
      ))}
    </svg>
  )
}
