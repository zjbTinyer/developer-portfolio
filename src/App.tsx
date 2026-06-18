import Header from './components/Header'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Contact from './components/Contact'
import MessageBoard from './components/MessageBoard'
import Footer from './components/Footer'

function App() {
  return (
    <div className="min-h-screen transition-colors duration-300"
      style={{
        backgroundColor: 'var(--color-bg-base)',
        color: 'var(--color-text-primary)',
      }}
    >
      <Header />
      <main>
        <Hero />
        <About />
        <Projects />
        <Contact />
        <MessageBoard />
      </main>
      <Footer />
    </div>
  )
}

export default App
