'use server'

import { mockProducts } from '../data/mockProducts';
import { Product } from '../types/products';

export async function getProducts(): Promise<Product[]> {
  return mockProducts;
}

export async function addProduct(newProduct: Product): Promise<Product> {
  mockProducts.push(newProduct);
  return newProduct;
}

export async function updateProduct(updatedProduct: Product): Promise<Product> {
  const index = mockProducts.findIndex(p => p.Cod === updatedProduct.Cod);
  if (index !== -1) {
    mockProducts[index] = updatedProduct;
  }
  return updatedProduct;
}

export async function deleteProduct(cod: number): Promise<void> {
  const index = mockProducts.findIndex(p => p.Cod === cod);
  if (index !== -1) {
    mockProducts.splice(index, 1);
  }
}
