// All product API calls in one place
// Components import these functions — they don't touch Axios directly

import api from './axios'

export async function getProducts() {
  const response = await api.get('/products')
  return response.data  // array of products
}

export async function getProduct(id) {
  const response = await api.get(`/products/${id}`)
  return response.data  // single product
}

export async function createProduct(data) {
  // POST body shape: { name, description, price, stockQuantity, categoryId }
  const response = await api.post('/products', data)
  return response.data  // the created product with server-assigned id
}

export async function updateProduct(id, data) {
  const response = await api.put(`/products/${id}`, data)
  return response.data  // the updated product
}

export async function deleteProduct(id) {
  // Returns 204 No Content — no data to return
  await api.delete(`/products/${id}`)
}
