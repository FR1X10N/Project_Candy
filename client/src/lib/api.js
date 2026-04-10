const api = {
  get: async (url) => {
    const res = await fetch(url, { credentials: 'include' })
    const json = await res.json()
    if (!res.ok) throw json
    return json
  },
  post: async (url, data) => {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(data),
    })
    const json = await res.json()
    if (!res.ok) throw json
    return json
  },
  patch: async (url, data) => {
    const res = await fetch(url, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(data),
    })
    const json = await res.json()
    if (!res.ok) throw json
    return json
  },
  delete: async (url) => {
    const res = await fetch(url, { method: 'DELETE', credentials: 'include' })
    const json = await res.json()
    if (!res.ok) throw json
    return json
  },
}

export default api
