import { 
  collection, 
  getDocs, 
  doc, 
  setDoc, 
  deleteDoc 
} from "firebase/firestore";
import { db } from "../firebase";
import { Category } from "@/types/ecommerce";

const CATEGORIES_COLLECTION = "categories";

const INITIAL_CATEGORIES: Category[] = [
  { id: "cat_hoodies", name: "Hoodies", slug: "hoodies", description: "Heavyweight streetwear hoodies designed for cold weather." },
  { id: "cat_jackets", name: "Jackets", slug: "jackets", description: "Structured outerwear and winter statement jackets." },
  { id: "cat_new_arrivals", name: "New Arrivals", slug: "new-arrivals", description: "The latest TARZ drops and seasonal pieces." },
  { id: "cat_best_sellers", name: "Best Sellers", slug: "best-sellers", description: "TARZ signature winter essentials and customer favorites." },
];

export async function getCategories(): Promise<Category[]> {
  try {
    const querySnapshot = await getDocs(collection(db, CATEGORIES_COLLECTION));
    if (querySnapshot.empty) {
      await seedInitialCategories();
      return INITIAL_CATEGORIES;
    }
    const categories: Category[] = [];
    querySnapshot.forEach((docSnap) => {
      categories.push({ id: docSnap.id, ...docSnap.data() } as Category);
    });
    return categories;
  } catch (error) {
    console.warn("Firestore getCategories error, using static fallback:", error);
    return INITIAL_CATEGORIES;
  }
}

export async function addCategory(category: Omit<Category, "id"> & { id?: string }): Promise<Category> {
  const newId = category.id || `cat_${Date.now()}`;
  const catData: Category = {
    ...category,
    id: newId,
    createdAt: new Date().toISOString(),
  };
  await setDoc(doc(db, CATEGORIES_COLLECTION, newId), catData);
  return catData;
}

export async function deleteCategory(id: string): Promise<void> {
  await deleteDoc(doc(db, CATEGORIES_COLLECTION, id));
}

export async function seedInitialCategories(): Promise<void> {
  try {
    for (const cat of INITIAL_CATEGORIES) {
      await setDoc(doc(db, CATEGORIES_COLLECTION, cat.id), {
        ...cat,
        createdAt: new Date().toISOString(),
      });
    }
  } catch (e) {
    console.error("Failed to seed initial categories:", e);
  }
}
