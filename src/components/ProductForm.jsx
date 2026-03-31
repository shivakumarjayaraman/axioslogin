import { useState, useEffect } from 'react'

const emptyForm = { name: '', description: '', price: '', stockQuantity: '' }

// This component handles both CREATE and EDIT
// If `product` prop is provided — edit mode. Otherwise — create mode.
export default function ProductForm({ product, onSubmit, onCancel }) {
  const [form, setForm]       = useState(emptyForm)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError]     = useState('')

  const isEditing = !!product

  // When switching to edit mode, populate the form
  useEffect(() => {
    if (product) {
      setForm({
        name: product.name ?? '',
        description: product.description ?? '',
        price: product.price?.toString() ?? '',
        stockQuantity: product.stockQuantity?.toString() ?? '',
      })
    } else {
      setForm(emptyForm)
    }
  }, [product])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.name.trim()) {
      setError('Name is required')
      return
    }
    if (!form.price || parseFloat(form.price) <= 0) {
      setError('Price must be greater than 0')
      return
    }

    setError('')
    setSubmitting(true)

    try {
      await onSubmit({
        name: form.name.trim(),
        description: form.description.trim(),
        price: parseFloat(form.price),
        stockQuantity: parseInt(form.stockQuantity) || 0,
        categoryId: null,
      })
      setForm(emptyForm)
    } catch (err) {
      setError(err.response?.data?.message ?? 'Failed to save product')
    } finally {
      setSubmitting(false)
    }
  }

  const inputStyle = {
    padding: '8px',
    border: '1px solid #d1d5db',
    borderRadius: '4px',
    width: '100%',
    boxSizing: 'border-box',
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{ padding: '16px', border: '1px solid #e5e7eb', borderRadius: '8px', marginBottom: '24px', background: isEditing ? '#fffbeb' : 'white' }}
    >
      <h3 style={{ margin: '0 0 12px 0' }}>
        {isEditing ? `Editing: ${product.name}` : 'Add Product'}
      </h3>

      {error && (
        <p style={{ color: '#dc2626', margin: '0 0 12px 0', fontSize: '14px' }}>{error}</p>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '8px' }}>
        <input name="name"          value={form.name}          onChange={handleChange} placeholder="Product name *" style={inputStyle} />
        <input name="price"         value={form.price}         onChange={handleChange} placeholder="Price *" type="number" min="0" step="0.01" style={inputStyle} />
        <input name="stockQuantity" value={form.stockQuantity} onChange={handleChange} placeholder="Stock quantity" type="number" min="0" style={inputStyle} />
        <input name="description"   value={form.description}   onChange={handleChange} placeholder="Description" style={inputStyle} />
      </div>

      <div style={{ display: 'flex', gap: '8px' }}>
        <button
          type="submit"
          disabled={submitting}
          style={{ padding: '8px 16px', background: '#1e40af', color: 'white', border: 'none', borderRadius: '4px', cursor: submitting ? 'not-allowed' : 'pointer', opacity: submitting ? 0.7 : 1 }}
        >
          {submitting ? 'Saving...' : isEditing ? 'Update Product' : 'Add Product'}
        </button>

        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            style={{ padding: '8px 16px', background: 'none', border: '1px solid #6b7280', color: '#6b7280', borderRadius: '4px', cursor: 'pointer' }}
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  )
}
