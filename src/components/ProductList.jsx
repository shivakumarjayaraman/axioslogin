export default function ProductList({ products, onEdit, onDelete }) {
  if (products.length === 0) {
    return <p style={{ color: '#6b7280', fontStyle: 'italic' }}>No products yet.</p>
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <p style={{ color: '#6b7280', margin: '0 0 8px 0' }}>
        {products.length} product{products.length !== 1 ? 's' : ''}
      </p>
      {products.map(product => (
        <div
          key={product.id}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '12px 16px',
            border: '1px solid #e5e7eb',
            borderRadius: '6px',
            background: 'white',
          }}
        >
          <div>
            <strong>{product.name}</strong>
            <span style={{ marginLeft: '12px', color: '#1e40af', fontWeight: 'bold' }}>
              ${parseFloat(product.price).toFixed(2)}
            </span>
            <span style={{ marginLeft: '8px', fontSize: '13px', color: '#6b7280' }}>
              Stock: {product.stockQuantity ?? 'N/A'}
            </span>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              onClick={() => onEdit(product)}
              style={{ padding: '4px 12px', border: '1px solid #1e40af', color: '#1e40af', background: 'none', borderRadius: '4px', cursor: 'pointer' }}
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(product.id)}
              style={{ padding: '4px 12px', border: '1px solid #dc2626', color: '#dc2626', background: 'none', borderRadius: '4px', cursor: 'pointer' }}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
