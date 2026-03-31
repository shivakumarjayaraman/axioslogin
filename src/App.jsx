import { useState, useEffect } from 'react'
import { getProducts, createProduct, updateProduct, deleteProduct } from './api/products'
import ProductList from './components/ProductList'
import ProductForm from './components/ProductForm'
import LoginForm from './components/LoginForm'

export default function App() {
  const [token, setToken]               = useState(() => localStorage.getItem('jwt'))
  const [products, setProducts]         = useState([])
  const [loading, setLoading]           = useState(true)
  const [error, setError]               = useState(null)
  const [editingProduct, setEditingProduct] = useState(null)

  // Handle token expiry / 401 from the axios interceptor
  useEffect(() => {
    function handleLogout() { setToken(null) }
    window.addEventListener('auth:logout', handleLogout)
    return () => window.removeEventListener('auth:logout', handleLogout)
  }, [])

  // Load products whenever the user logs in
  useEffect(() => {
    if (token) loadProducts()
  }, [token])

  async function loadProducts() {
    setLoading(true)
    setError(null)
    try {
      const data = await getProducts()
      setProducts(data)
    } catch (err) {
      if (err.response?.status !== 401) {
        setError('Failed to load products')
      }
      // 401 is handled by the axios interceptor (fires auth:logout)
    } finally {
      setLoading(false)
    }
  }

  function handleLogin(newToken) {
    setToken(newToken)
  }

  function handleLogout() {
    localStorage.removeItem('jwt')
    setToken(null)
    setProducts([])
  }

  async function handleCreate(data) {
    const created = await createProduct(data)
    setProducts(prev => [...prev, created])
  }

  async function handleUpdate(id, data) {
    const updated = await updateProduct(id, data)
    setProducts(prev => prev.map(p => p.id === id ? updated : p))
    setEditingProduct(null)
  }

  async function handleDelete(id) {
    await deleteProduct(id)
    setProducts(prev => prev.filter(p => p.id !== id))
  }

  function handleEdit(product) {
    setEditingProduct(product)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function handleCancelEdit() {
    setEditingProduct(null)
  }

  async function handleFormSubmit(data) {
    if (editingProduct) {
      await handleUpdate(editingProduct.id, data)
    } else {
      await handleCreate(data)
    }
  }

  if (!token) {
    return <LoginForm onLogin={handleLogin} />
  }

  return (
    <div style={{ maxWidth: '720px', margin: '0 auto', padding: '24px', fontFamily: 'sans-serif' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ margin: 0 }}>Axios Login</h1>
        <button
          onClick={handleLogout}
          style={{ padding: '6px 14px', background: '#f3f4f6', border: '1px solid #d1d5db', borderRadius: '4px', cursor: 'pointer' }}
        >
          Sign out
        </button>
      </div>

      <ProductForm
        product={editingProduct}
        onSubmit={handleFormSubmit}
        onCancel={editingProduct ? handleCancelEdit : null}
      />

      {loading && <p>Loading...</p>}
      {error && (
        <div style={{ padding: '12px', background: '#fee2e2', color: '#dc2626', borderRadius: '6px', marginBottom: '16px' }}>
          {error}
        </div>
      )}
      {!loading && !error && (
        <ProductList
          products={products}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </div>
  )
}
