import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import PhoneMockup from './ui/PhoneMockup'

const STEPS = [
  {
    number: '01',
    title: 'Import your pattern.',
    copy: 'PDF from your files, paste the written instructions, or drop in a YouTube tutorial link. skeined does the reading.',
  },
  {
    number: '02',
    title: 'Follow it row by row.',
    copy: "One instruction at a time. Press and hold any abbreviation you don't recognise and get the answer instantly.",
  },
  {
    number: '03',
    title: 'Never lose your place.',
    copy: 'Put your phone down. Pick it up tomorrow. Row 12 is still waiting. Right where you left it.',
  },
]

function ImportMockup() {
  return (
    <div className="flex h-full flex-col justify-center gap-2 p-6">
      {['PDF', 'Paste text', 'YouTube link'].map((label) => (
        <div
          key={label}
          className="rounded-sm border-[0.5px] border-linen bg-surface px-3 py-2 text-sm text-text-2"
        >
          {label}
        </div>
      ))}
    </div>
  )
}

function ExecutionMockup() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-2 px-6 text-center">
      <span className="text-6xl font-bold text-text-1">12</span>
      <span className="text-[11px] font-semibold uppercase tracking-widest text-text-3">
        Current row
      </span>
      <p className="text-sm text-text-2">sc in each st across</p>
      <div className="mt-2 rounded-sm border-[0.5px] border-linen bg-primary-light px-3 py-1 text-xs text-primary-dark">
        sc = single crochet
      </div>
    </div>
  )
}

function ReturnMockup() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-2 px-6 text-center">
      <span className="text-6xl font-bold text-text-1">12</span>
      <span className="text-[11px] font-semibold uppercase tracking-widest text-text-3">
        Current row
      </span>
      <p className="text-xs text-text-3">Last session: yesterday</p>
    </div>
  )
}

const MOCKUPS = [ImportMockup, ExecutionMockup, ReturnMockup]

interface StepProps {
  step: (typeof STEPS)[number]
  index: number
  isLast: boolean
  onActive: (index: number) => void
}

function Step({ step, index, isLast, onActive }: StepProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { margin: '-40% 0px -40% 0px' })

  useEffect(() => {
    if (isInView) onActive(index)
  }, [isInView, index, onActive])

  return (
    <div ref={ref} className="flex gap-4">
      <div className="flex flex-col items-center">
        <div
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-pill text-sm font-semibold ${
            isInView ? 'bg-primary-dark text-white' : 'bg-linen text-text-3'
          }`}
        >
          {step.number}
        </div>
        {!isLast && <div className="mt-1 h-full w-px border-l border-dashed border-linen" />}
      </div>
      <div className="pb-16">
        <h3 className="text-xl font-semibold text-text-1">{step.title}</h3>
        <p className="mt-2 max-w-sm text-sm text-text-2">{step.copy}</p>
      </div>
    </div>
  )
}

export default function Steps() {
  const [active, setActive] = useState(0)
  const ActiveMockup = MOCKUPS[active]

  return (
    <section className="px-6 py-20">
      <div className="mx-auto max-w-5xl">
        <div className="max-w-lg">
          <h2 className="text-3xl font-bold text-text-1 md:text-4xl">
            Get started in three steps.
          </h2>
          <p className="mt-3 text-base text-text-2">
            From nothing to row-by-row in under two minutes.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-12 md:grid-cols-2">
          <div>
            {STEPS.map((step, i) => (
              <Step
                key={step.number}
                step={step}
                index={i}
                isLast={i === STEPS.length - 1}
                onActive={setActive}
              />
            ))}
          </div>

          <div className="sticky top-24 self-start">
            <motion.div
              key={active}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              <PhoneMockup>
                <ActiveMockup />
              </PhoneMockup>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
