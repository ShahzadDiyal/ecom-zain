import { 
  collection, 
  getDocs, 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc, 
  query, 
  where, 
  orderBy 
} from "firebase/firestore";
import { db } from "../firebase";
import { OrderDetails, OrderStatus } from "@/types/ecommerce";

const ORDERS_COLLECTION = "orders";

// Create a new order in Firestore
export async function createOrder(order: OrderDetails): Promise<void> {
  const docRef = doc(db, ORDERS_COLLECTION, order.orderId);
  await setDoc(docRef, {
    ...order,
    createdAt: order.createdAt || new Date().toISOString(),
  });
}

// Fetch all orders for Admin Panel
export async function getAllOrders(): Promise<OrderDetails[]> {
  try {
    const q = query(collection(db, ORDERS_COLLECTION), orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);
    const orders: OrderDetails[] = [];
    querySnapshot.forEach((docSnap) => {
      orders.push({ orderId: docSnap.id, ...docSnap.data() } as OrderDetails);
    });
    return orders;
  } catch (error) {
    // If order by fails due to index or empty
    try {
      const querySnapshot = await getDocs(collection(db, ORDERS_COLLECTION));
      const orders: OrderDetails[] = [];
      querySnapshot.forEach((docSnap) => {
        orders.push({ orderId: docSnap.id, ...docSnap.data() } as OrderDetails);
      });
      return orders.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    } catch (e) {
      console.error("Error fetching orders:", e);
      return [];
    }
  }
}

// Update order status
export async function updateOrderStatus(orderId: string, status: OrderStatus): Promise<void> {
  const docRef = doc(db, ORDERS_COLLECTION, orderId);
  await updateDoc(docRef, { status });
}

// Fetch orders for a specific user
export async function getUserOrders(userId: string): Promise<OrderDetails[]> {
  try {
    const q = query(collection(db, ORDERS_COLLECTION), where("userId", "==", userId));
    const querySnapshot = await getDocs(q);
    const orders: OrderDetails[] = [];
    querySnapshot.forEach((docSnap) => {
      orders.push({ orderId: docSnap.id, ...docSnap.data() } as OrderDetails);
    });
    return orders;
  } catch (error) {
    console.error("Error fetching user orders:", error);
    return [];
  }
}
