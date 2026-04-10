import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import api from '@/lib/api'

const AdminPage = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const fetchMessages = async () => {
    try {
      const res = await api.get('/api/admin/messages')
      setMessages(res.data)
    } catch {
      setError('Erreur lors du chargement des messages.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchMessages() }, [])

  const handleToggleRead = async (msg) => {
    try {
      const res = await api.patch(`/api/admin/messages/${msg.id}/read`, { read: !msg.read })
      setMessages((prev) => prev.map((m) => m.id === msg.id ? res.data : m))
    } catch {
      setError('Erreur lors de la mise à jour.')
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Supprimer ce message ?')) return
    try {
      await api.delete(`/api/admin/messages/${id}`)
      setMessages((prev) => prev.filter((m) => m.id !== id))
    } catch {
      setError('Erreur lors de la suppression.')
    }
  }

  const handleLogout = async () => {
    await logout()
    navigate('/admin/login')
  }

  const unreadCount = messages.filter((m) => !m.read).length

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-xl">🍬</span>
          <h1 className="text-lg font-bold text-gray-900">Admin — Project Candy</h1>
          {unreadCount > 0 && (
            <span className="bg-pink-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
              {unreadCount} non lu{unreadCount > 1 ? 's' : ''}
            </span>
          )}
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-500">{user?.email}</span>
          <button
            onClick={handleLogout}
            className="text-sm text-gray-500 hover:text-red-500 transition-colors"
          >
            Déconnexion
          </button>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-5xl mx-auto px-6 py-10">
        <h2 className="text-2xl font-extrabold text-gray-900 mb-6">Messages de contact</h2>

        {error && (
          <p className="text-red-500 text-sm mb-4 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
            {error}
          </p>
        )}

        {loading ? (
          <p className="text-gray-400 text-center py-20">Chargement...</p>
        ) : messages.length === 0 ? (
          <p className="text-gray-400 text-center py-20">Aucun message pour l'instant.</p>
        ) : (
          <div className="space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`bg-white rounded-2xl border p-6 transition-all ${
                  msg.read ? 'border-gray-100 opacity-70' : 'border-pink-200 shadow-sm'
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="font-semibold text-gray-900">{msg.name}</span>
                      <span className="text-gray-400 text-sm">·</span>
                      <a
                        href={`mailto:${msg.email}`}
                        className="text-pink-600 text-sm hover:underline"
                      >
                        {msg.email}
                      </a>
                      {!msg.read && (
                        <span className="bg-pink-100 text-pink-700 text-xs font-semibold px-2 py-0.5 rounded-full">
                          Nouveau
                        </span>
                      )}
                    </div>
                    {msg.subject && (
                      <p className="text-sm font-medium text-gray-700 mb-2">{msg.subject}</p>
                    )}
                    <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-wrap">
                      {msg.message}
                    </p>
                    <p className="text-gray-400 text-xs mt-3">
                      {new Date(msg.createdAt).toLocaleString('fr-FR')}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => handleToggleRead(msg)}
                      title={msg.read ? 'Marquer comme non lu' : 'Marquer comme lu'}
                      className="p-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-400 hover:text-gray-700"
                    >
                      {msg.read ? '○' : '✓'}
                    </button>
                    <button
                      onClick={() => handleDelete(msg.id)}
                      title="Supprimer"
                      className="p-2 rounded-lg hover:bg-red-50 transition-colors text-gray-400 hover:text-red-500"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}

export default AdminPage
