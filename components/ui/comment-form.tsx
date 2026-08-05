'use client'

import { useState } from 'react'

export function CommentForm({ postId }: { postId: string }) {
  const [formData, setFormData] = useState({
    authorName: '',
    content: '',
    honeypot: '', // Invisible trap field
  })
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('submitting')

    try {
      const res = await fetch(`/api/blogs/${postId}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await res.json()

      if (res.ok) {
        setStatus('success')
        setMessage(data.message)
        setFormData({ authorName: '', content: '', honeypot: '' })
      } else {
        setStatus('error')
        setMessage(data.error || 'Something went wrong.')
      }
    } catch {
      setStatus('error')
      setMessage('Failed to submit comment.')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-xl">
      <h3 className="text-xl font-bold">Leave a Comment</h3>

      {/* Honeypot field (hidden from real users via CSS) */}
      <div className="hidden" aria-hidden="true">
        <input
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={formData.honeypot}
          onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Your Name"
          required
          className="border p-2 rounded w-full"
          value={formData.authorName}
          onChange={(e) => setFormData({ ...formData, authorName: e.target.value })}
        />
        {/* <input
          type="email"
          placeholder="Your Email (not published)"
          required
          className="border p-2 rounded w-full"
          value={formData.authorEmail}
          onChange={(e) => setFormData({ ...formData, authorEmail: e.target.value })}
        /> */}
      </div>

      <textarea
        placeholder="Write your comment..."
        required
        rows={4}
        className="border p-2 rounded w-full"
        value={formData.content}
        onChange={(e) => setFormData({ ...formData, content: e.target.value })}
      />

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="bg-black text-white px-4 py-2 rounded disabled:opacity-50"
      >
        {status === 'submitting' ? 'Submitting...' : 'Post Comment'}
      </button>

      {message && (
        <p className={`text-sm ${status === 'error' ? 'text-red-500' : 'text-green-600'}`}>
          {message}
        </p>
      )}
    </form>
  )
}