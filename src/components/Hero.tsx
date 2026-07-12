import { useState } from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { Check, Lock } from 'lucide-react'
import ProgressBar from './ui/ProgressBar'
import PhoneMockup from './ui/PhoneMockup'

const TOTAL_SPOTS = 50
const SPOTS_REMAINING = 7 // TODO: wire to backend; currently hardcoded at 43/50 claimed

interface WaitlistFormValues {
  email: string
}

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1 },
  }),
}

function ExecutionScreen() {
  return (
    <div className="relative flex h-full flex-col items-center justify-center gap-3 px-6 text-center">
      <span className="text-7xl font-bold text-text-1">47</span>
      <span className="text-[11px] font-semibold uppercase tracking-widest text-text-3">
        Current row
      </span>
      <p className="text-sm text-text-2">dc in next 3 sts, ch 2, sk 2 sts</p>
      <div className="absolute bottom-6 left-6 right-6 h-1.5 overflow-hidden rounded-pill bg-linen">
        <div className="h-full w-2/3 rounded-pill bg-primary" />
      </div>
    </div>
  )
}

export default function Hero() {
  const [submitted, setSubmitted] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<WaitlistFormValues>()

  const onSubmit = (data: WaitlistFormValues) => {
    // TODO: Replace with Loops API call
    // POST https://app.loops.so/api/v1/contacts/create
    // Headers: Authorization: Bearer LOOPS_API_KEY
    // Body: { email, userGroup: "waitlist", source: "landing-page" }
    console.log(data.email)
    setSubmitted(true)
  }

  return (
    <section
      className="relative overflow-hidden px-6 pb-20 pt-16 text-center"
      style={{ background: 'linear-gradient(180deg, #EDE8F5 0%, #FAF6F0 60%)' }}
    >
      <motion.div
        custom={0}
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        className="mx-auto mb-6 inline-flex items-center gap-2 rounded-pill bg-sage-light px-4 py-2 text-sm text-primary-dark"
      >
        <Lock className="h-3.5 w-3.5" aria-hidden="true" />
        Founding member offer · 50 spots only
      </motion.div>

      <motion.h1
        custom={1}
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        className="mx-auto max-w-2xl text-4xl font-bold leading-tight text-text-1 md:text-6xl"
      >
        Make more.
        <br />
        Frog less.
      </motion.h1>

      <motion.p
        custom={2}
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        className="mx-auto mt-5 max-w-lg text-base text-text-2"
      >
        Import patterns from PDFs and YouTube tutorials. Track every row. Scan yarn labels.
        Organise your stash. Pick up exactly where you left off.
      </motion.p>

      <motion.p
        custom={3}
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        className="mt-2 text-sm text-text-3"
      >
        One less thing to unravel.
      </motion.p>

      <motion.div
        custom={4}
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        className="mx-auto mt-8 max-w-sm rounded-md border-[0.5px] border-linen border-l-[3px] border-l-secondary bg-surface p-4 text-left"
      >
        <p className="text-sm font-semibold text-text-1">
          skeined+ Pro — everything, forever — R499 once.
        </p>
        <p className="mt-1 text-sm text-text-2">After launch: R89/month or R649/year.</p>
      </motion.div>

      <motion.div
        id="waitlist-form"
        custom={5}
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        className="mx-auto mt-8 max-w-md scroll-mt-24"
      >
        {!submitted ? (
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="flex h-[52px]">
              <input
                type="email"
                placeholder="your@email.com"
                aria-label="Email address"
                className="h-full min-w-0 flex-1 rounded-l-md border-[0.5px] border-linen bg-surface px-4 text-sm text-text-1 outline-none focus:ring-1 focus:ring-primary"
                {...register('email', {
                  required: true,
                  pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                })}
              />
              <button
                type="submit"
                className="h-full shrink-0 rounded-r-md bg-primary px-6 text-sm font-semibold text-white"
              >
                Claim my spot →
              </button>
            </div>
            {errors.email && (
              <p role="alert" className="mt-2 text-left text-sm text-red-500">
                Enter a valid email address.
              </p>
            )}
            <div className="mt-4 flex justify-center">
              <ProgressBar claimed={TOTAL_SPOTS - SPOTS_REMAINING} total={TOTAL_SPOTS} />
            </div>
            <p className="mt-3 text-sm text-text-3">
              No spam. One email when early access opens.
              <br />
              We&apos;ll tell you exactly where you are in the queue.
            </p>
          </form>
        ) : (
          <motion.div
            role="status"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-md border-[0.5px] border-linen bg-sage-light p-4 text-sm font-semibold text-primary-dark"
          >
            You&apos;re on the list. We&apos;ll be in touch.
          </motion.div>
        )}
      </motion.div>

      <motion.ul
        custom={6}
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        className="mx-auto mt-6 flex max-w-md flex-col items-start gap-2 text-sm text-text-2"
      >
        <li className="flex items-center gap-2">
          <Check className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
          Early access before public launch
        </li>
        <li className="flex items-center gap-2">
          <Check className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
          skeined+ Pro locked at R499 — yours forever
        </li>
        <li className="flex items-center gap-2">
          <Check className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
          Direct line to the founder during beta
        </li>
      </motion.ul>

      <motion.div custom={7} initial="hidden" animate="visible" variants={fadeUp} className="mt-12">
        <PhoneMockup>
          <ExecutionScreen />
        </PhoneMockup>
      </motion.div>
    </section>
  )
}
