import { useState, useEffect } from 'react';
import { Login } from "./components/Login";
import { Register } from "./components/Register";
import { Dashboard } from "./components/Dashboard";
import { PublicFeed } from "./components/PublicFeed";

const API_URL = 'https://ai-blog-rw4v.onrender.com';

export default function App() {
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [view, setView] = useState<'login' | 'register' | 'dashboard' | 'feed'>('feed');
  const [userEmail, setUserEmail] = useState<string | null>(localStorage.getItem('userEmail'));

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }, [token]);

  useEffect(() => {
    if (userEmail) {
      localStorage.setItem('userEmail', userEmail);
    } else {
      localStorage.removeItem('userEmail');
    }
  }, [userEmail]);

  const handleLogin = (newToken: string, email: string) => {
    setToken(newToken);
    setUserEmail(email);
    setView('dashboard');
  };

  const handleLogout = () => {
    setToken(null);
    setUserEmail(null);
    localStorage.removeItem('token');
    localStorage.removeItem('userEmail');
    setView('feed');
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header / Navigation */}
      <header className="border-b border-zinc-800 bg-zinc-950/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/20">
              <span className="text-xl">✨</span>
            </div>
            <h1 className="text-xl font-semibold">AI Blog</h1>
          </div>
          
          <nav className="flex items-center gap-3">
            <button
              onClick={() => setView('feed')}
              className={`px-4 py-2 rounded-lg transition-all ${
                view === 'feed'
                  ? 'bg-zinc-800 text-white'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
              }`}
            >
              Feed
            </button>
            
            {token ? (
              <>
                <button
                  onClick={() => setView('dashboard')}
                  className={`px-4 py-2 rounded-lg transition-all ${
                    view === 'dashboard'
                      ? 'bg-cyan-500 text-white'
                      : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
                  }`}
                >
                  Crear Post
                </button>
                <div className="h-6 w-px bg-zinc-800" />
                <div className="text-zinc-400 text-sm px-2">{userEmail}</div>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 rounded-lg bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-all"
                >
                  Salir
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => setView('login')}
                  className={`px-4 py-2 rounded-lg transition-all ${
                    view === 'login'
                      ? 'bg-cyan-500 text-white'
                      : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
                  }`}
                >
                  Iniciar Sesión
                </button>
                <button
                  onClick={() => setView('register')}
                  className={`px-4 py-2 rounded-lg transition-all ${
                    view === 'register'
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white'
                      : 'bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-800'
                  }`}
                >
                  Registrarse
                </button>
              </>
            )}
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        {view === 'login' && (
          <Login
            apiUrl={API_URL}
            onLogin={handleLogin}
            onSwitchToRegister={() => setView('register')}
          />
        )}
        
        {view === 'register' && (
          <Register
            apiUrl={API_URL}
            onSwitchToLogin={() => setView('login')}
          />
        )}
        
        {view === 'dashboard' && token && (
          <Dashboard apiUrl={API_URL} token={token} />
        )}
        
        {view === 'feed' && <PublicFeed apiUrl={API_URL} />}
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-800 mt-16">
        <div className="max-w-6xl mx-auto px-4 py-6 text-center text-zinc-500 text-sm">
          <p>AI Blog - Generador de contenido con Inteligencia Artificial</p>
        </div>
      </footer>
    </div>
  );
}
