import { Navbar } from './components/Navbar'; 
import { Hero } from './components/Hero';
import { Features } from './components/Features';

function App() {
  return (
    <div className="min-h-screen bg-slate-900 font-sans selection:bg-emerald-500/30">
      <Navbar />
      <main>
        <Hero />
        <Features />
      </main>

      {/* Footer Simple */}
      <footer className="bg-slate-950 py-8 text-center text-slate-500 text-sm border-t border-slate-900">
        <p>© 2026 EV Chargers. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;