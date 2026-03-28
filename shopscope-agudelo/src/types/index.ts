export interface AuthResponse {
  id: number
  username: string
  email: string
  firstName: string
  lastName: string
  accessToken: string
}

export interface Product {
  id: number
  title: string
  description: string
  category: string
  price: number
  rating: number
  stock: number
  thumbnail: string
}

export interface ProductDetail {
  id: number
  title: string
  description: string
  category: string
  price: number
  rating: number
  stock: number
  thumbnail: string
  images: string[]
  warrantyInformation: string
  shippingInformation: string
}

export interface ProductsResponse {
  products: Product[]
  total: number
  skip: number
  limit: number
}

export interface Category {
  slug: string
  name: string
  url: string
}