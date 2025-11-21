import { useState } from 'react';
import { toast } from 'sonner';
import { Sparkles, Loader2 } from 'lucide-react';

interface DashboardProps {
  apiUrl: string;
  token: string;
}

export function Dashboard({ apiUrl, token }: DashboardProps) {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [lastGenerated, setLastGenerated] = useState<{ title: string; body: string } | null>(null);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!prompt.trim()) {
      toast.error('Por favor ingresa una idea para el artículo');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${apiUrl}/generate-post`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ prompt }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('¡Artículo generado exitosamente!');
        setLastGenerated({ title: data.title, body: data.body });
        setPrompt('');
      } else {
        toast.error(data.detail || 'Error al generar el artículo');
      }
    } catch (error) {
      toast.error('Error de conexión con el servidor');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Generator Card */}
      <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden">
        <div className="bg-gradient-to-r from-cyan-500 to-blue-500 p-6">
          <div className="flex items-center gap-3">
            <Sparkles className="w-7 h-7 text-white" />
            <div>
              <h2 className="text-2xl font-semibold text-white">Generar Artículo con IA</h2>
              <p className="text-cyan-100 mt-1">Describe tu idea y la IA creará un artículo completo</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleGenerate} className="p-6 space-y-4">
          <div>
            <label htmlFor="prompt" className="block text-sm text-zinc-400 mb-2">
              ¿Sobre qué quieres escribir?
            </label>
            <textarea
              id="prompt"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              required
              rows={4}
              className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-xl text-white placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all resize-none"
              placeholder="Ej: Los beneficios de la inteligencia artificial en la educación moderna..."
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white py-3 rounded-xl hover:from-cyan-600 hover:to-blue-600 transition-all shadow-lg shadow-cyan-500/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Generando artículo...
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                Generar Artículo
              </>
            )}
          </button>
        </form>
      </div>

      {/* Last Generated Preview */}
      {lastGenerated && (
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 space-y-4">
          <div className="flex items-center gap-2 text-emerald-400">
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            <span className="text-sm">Último artículo generado</span>
          </div>
          
          <div className="space-y-3">
            <h3 className="text-xl text-white">{lastGenerated.title}</h3>
            <div className="text-zinc-400 whitespace-pre-wrap max-h-64 overflow-y-auto custom-scrollbar">
              {lastGenerated.body}
            </div>
          </div>

          <div className="pt-4 border-t border-zinc-800">
            <p className="text-sm text-zinc-500">
              Este artículo ha sido guardado en la base de datos y aparecerá en el feed público.
            </p>
          </div>
        </div>
      )}

      {/* Tips Card */}
      <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6">
        <h3 className="text-zinc-300 mb-3">💡 Tips para mejores resultados</h3>
        <ul className="space-y-2 text-sm text-zinc-500">
          <li className="flex items-start gap-2">
            <span className="text-cyan-400">•</span>
            <span>Sé específico con tu tema o idea principal</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-cyan-400">•</span>
            <span>Menciona el tono que deseas (profesional, casual, educativo)</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-cyan-400">•</span>
            <span>Indica el público objetivo si es relevante</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
