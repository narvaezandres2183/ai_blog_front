import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { Calendar, User, Loader2, RefreshCw } from 'lucide-react';

interface Post {
  title: string;
  body: string;
  author_id: number;
  created_at: string;
}

interface PublicFeedProps {
  apiUrl: string;
}

export function PublicFeed({ apiUrl }: PublicFeedProps) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${apiUrl}/posts`);
      const data = await response.json();

      if (response.ok) {
        setPosts(data.reverse()); // Most recent first
      } else {
        toast.error('Error al cargar los artículos');
      }
    } catch (error) {
      toast.error('Error de conexión con el servidor');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl text-white mb-2">Feed Público</h2>
          <p className="text-zinc-400">Artículos generados por nuestra comunidad</p>
        </div>
        <button
          onClick={fetchPosts}
          disabled={loading}
          className="flex items-center gap-2 px-4 py-2 bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white rounded-xl transition-all disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          Actualizar
        </button>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 text-cyan-500 animate-spin" />
        </div>
      )}

      {/* Empty State */}
      {!loading && posts.length === 0 && (
        <div className="text-center py-12 bg-zinc-900/50 border border-zinc-800 rounded-2xl">
          <div className="text-6xl mb-4">📝</div>
          <h3 className="text-xl text-zinc-300 mb-2">No hay artículos aún</h3>
          <p className="text-zinc-500">Sé el primero en crear un artículo con IA</p>
        </div>
      )}

      {/* Posts Grid */}
      {!loading && posts.length > 0 && (
        <div className="space-y-4">
          {posts.map((post, index) => (
            <article
              key={index}
              className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-zinc-800 rounded-2xl p-6 hover:border-zinc-700 transition-all group"
            >
              {/* Post Header */}
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-xl text-white group-hover:text-cyan-400 transition-colors flex-1">
                  {post.title}
                </h3>
              </div>

              {/* Post Body */}
              <div className="text-zinc-400 mb-4 line-clamp-4 whitespace-pre-wrap">
                {post.body}
              </div>

              {/* Post Meta */}
              <div className="flex items-center gap-4 text-sm text-zinc-500 pt-4 border-t border-zinc-800">
                <div className="flex items-center gap-1.5">
                  <User className="w-4 h-4" />
                  <span>Autor #{post.author_id}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4" />
                  <span>{formatDate(post.created_at)}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      {/* Stats */}
      {!loading && posts.length > 0 && (
        <div className="text-center text-zinc-500 text-sm py-4">
          Mostrando {posts.length} {posts.length === 1 ? 'artículo' : 'artículos'}
        </div>
      )}
    </div>
  );
}
