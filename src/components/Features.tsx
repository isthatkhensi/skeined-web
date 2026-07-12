// src/components/Features.tsx
import { motion } from 'framer-motion'
import { FileText, PlayCircle, Type } from 'lucide-react'
import CobwebSVG from './ui/CobwebSVG'

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1 },
  }),
}

function ImportScreenshot() {
  const rows = [
    { Icon: FileText, label: 'PDF', active: false },
    { Icon: Type, label: 'Paste text', active: false },
    { Icon: PlayCircle, label: 'YouTube link', active: true },
  ]
  return (
    <div className="flex h-full flex-col justify-center gap-2 p-4">
      {rows.map(({ Icon, label, active }) => (
        <div
          key={label}
          className={`flex items-center gap-2 rounded-sm px-3 py-2 text-sm ${
            active ? 'bg-primary-light text-primary-dark' : 'bg-surface text-text-2'
          }`}
        >
          <Icon className="h-4 w-4" />
          {label}
        </div>
      ))}
    </div>
  )
}

function CounterScreenshot() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-1">
      <span className="text-5xl font-bold text-text-1">47</span>
      <span className="text-[10px] font-semibold uppercase tracking-widest text-text-3">
        Current row
      </span>
      <p className="mt-1 text-xs text-text-2">dc in next 3 sts, ch 2, sk 2 sts</p>
    </div>
  )
}

function StashScreenshot() {
  return (
    <div className="flex h-full flex-col items-center justify-center p-4">
      <div className="w-full rounded-sm border-[0.5px] border-linen bg-surface p-3 text-sm text-text-2">
        Drops Safran · Vanilla Yellow · DK · 229 yds
      </div>
    </div>
  )
}

const CARDS = [
  {
    Screenshot: ImportScreenshot,
    title: 'Import Any Pattern',
    copy: 'PDF, paste, or paste a YouTube link. skeined reads the captions and builds you a row-by-row guide.',
  },
  {
    Screenshot: CounterScreenshot,
    title: 'Row by Row',
    copy: 'One tap advances your row. Press and hold to undo. Your linked counters move with you.',
  },
  {
    Screenshot: StashScreenshot,
    title: 'Stash. Scanned.',
    copy: 'Point your camera at a yarn label. skeined reads it and fills your stash entry. You set the quantity.',
  },
]

export default function Features() {
  return (
    <section className="px-6 py-20">
      <div className="mx-auto max-w-5xl">
        <div className="mx-auto max-w-lg text-center">
          <h2 className="text-3xl font-bold text-text-1 md:text-4xl">Not just a row counter.</h2>
          <p className="mt-3 text-base text-text-2">Explore what makes skeined different.</p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
          {CARDS.map(({ Screenshot, title, copy }, i) => (
            <motion.div
              key={title}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              variants={fadeUp}
              className="overflow-hidden rounded-md border-[0.5px] border-linen bg-surface shadow"
            >
              <div className="h-40 bg-elevated">
                <Screenshot />
              </div>
              <div className="p-5">
                <h3 className="text-lg font-semibold text-text-1">{title}</h3>
                <p className="mt-2 text-sm text-text-2">{copy}</p>
              </div>
            </motion.div>
          ))}

          <motion.div
            custom={3}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={fadeUp}
            className="relative overflow-hidden rounded-md border-[0.5px] border-linen border-l-[3px] border-l-cobweb p-6"
            style={{ backgroundColor: '#F7F3EC' }}
          >
            <CobwebSVG />
            <span className="text-[11px] font-semibold uppercase tracking-widest text-text-3">
              One less thing to unravel
            </span>
            <h3 className="mt-3 text-xl font-semibold text-text-1">
              If a project goes quiet, skeined leaves a quiet signal.
            </h3>
            <p className="mt-3 text-sm text-text-2">
              No alarm. No guilt. Just a reminder that your Forest Cardigan is still waiting.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
