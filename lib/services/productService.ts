import { 
  collection, 
  getDocs, 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc, 
  deleteDoc 
} from "firebase/firestore";
import { db } from "../firebase";
import { Product } from "@/types/ecommerce";
import { PRODUCTS } from "@/data/products";

const PRODUCTS_COLLECTION = "products";

// Get all products from Firestore sorted newest first
export async function getProducts(): Promise<Product[]> {
  try {
    const querySnapshot = await getDocs(collection(db, PRODUCTS_COLLECTION));
    if (querySnapshot.empty) {
      // Seed Firestore with initial products if collection is empty
      await seedInitialProducts();
      return PRODUCTS;
    }
    const products: Product[] = [];
    querySnapshot.forEach((docSnap) => {
      products.push({ id: docSnap.id, ...docSnap.data() } as Product);
    });
    // Sort products by createdAt descending (newest created first)
    return products.sort((a, b) => {
      const timeA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
      const timeB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
      return timeB - timeA;
    });
  } catch (error) {
    console.warn("Firestore getProducts error, using static fallback:", error);
    return PRODUCTS;
  }
}

// Get single product by ID
export async function getProductById(id: string): Promise<Product | null> {
  try {
    const docRef = doc(db, PRODUCTS_COLLECTION, id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as Product;
    }
    // Fallback to static products list
    const staticProduct = PRODUCTS.find((p) => p.id === id);
    return staticProduct || null;
  } catch (error) {
    console.warn("Firestore getProductById error, fallback to static:", error);
    return PRODUCTS.find((p) => p.id === id) || null;
  }
}

// Add new product with timestamp
export async function addProduct(product: Omit<Product, "id"> & { id?: string }): Promise<Product> {
  const newId = product.id || `prod_${Date.now()}`;
  const productData: Product = {
    ...product,
    id: newId,
    createdAt: new Date().toISOString(),
  };
  await setDoc(doc(db, PRODUCTS_COLLECTION, newId), productData);
  return productData;
}

// Update existing product
export async function updateProduct(id: string, updates: Partial<Product>): Promise<void> {
  const docRef = doc(db, PRODUCTS_COLLECTION, id);
  await updateDoc(docRef, updates);
}

// Delete product
export async function deleteProduct(id: string): Promise<void> {
  await deleteDoc(doc(db, PRODUCTS_COLLECTION, id));
}

// Seed initial static products into Firestore
export async function seedInitialProducts(): Promise<void> {
  try {
    let index = 0;
    for (const prod of PRODUCTS) {
      // Add artificial stagger timestamp so initial seeding preserves order
      const seedTimestamp = new Date(Date.now() - index * 60000).toISOString();
      await setDoc(doc(db, PRODUCTS_COLLECTION, prod.id), {
        ...prod,
        createdAt: seedTimestamp,
      });
      index++;
    }
    console.log("Initial products seeded to Firestore");
  } catch (e) {
    console.error("Failed to seed initial products:", e);
  }
}
