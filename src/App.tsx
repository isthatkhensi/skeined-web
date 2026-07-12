// src/App.tsx
import Nav from './components/Nav'
import Hero from './components/Hero'
import Features from './components/Features'
import Steps from './components/Steps'
import Testimonials from './components/Testimonials'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="min-h-screen bg-bg text-text-1">
      <Nav />
      <main>
        <Hero />
        <Features />
        <Steps />
        <Testimonials />
      </main>
      <Footer />
    </div>
  )
}
