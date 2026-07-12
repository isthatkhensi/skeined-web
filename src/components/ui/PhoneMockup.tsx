import type { ReactNode } from 'react'

interface PhoneMockupProps {
  children: ReactNode
  className?: string
}

export default function PhoneMockup({ children, className = '' }: PhoneMockupProps) {
  return (
    <div
      className={`relative mx-auto h-[572px] w-[280px] rounded-[40px] bg-[#111111] p-3 shadow ${className}`}
    >
      <div className="absolute left-1/2 top-3 z-10 h-6 w-28 -translate-x-1/2 rounded-pill bg-[#111111]" />
      <div className="relative h-full w-full overflow-hidden rounded-[28px] bg-bg">
        {children}
      </div>
    </div>
  )
}
