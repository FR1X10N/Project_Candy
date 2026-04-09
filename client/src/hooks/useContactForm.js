import { useState } from 'react'
import api from '@/lib/api'

const initialState = { name: '', email: '', subject: '', message: '' }

const useContactForm = () => {
  const [fields, setFields] = useState(initialState)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | loading | success | error

  const handleChange = (e) => {
    const { name, value } = e.target
    setFields((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('loading')
    setErrors({})

    try {
      await api.post('/api/contact', fields)
      setStatus('success')
      setFields(initialState)
    } catch (err) {
      if (err?.errors) {
        setErrors(err.errors)
        setStatus('idle')
      } else {
        setStatus('error')
      }
    }
  }

  return { fields, errors, status, handleChange, handleSubmit }
}

export default useContactForm
