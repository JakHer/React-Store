import { makeAutoObservable, runInAction } from 'mobx';
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
} from 'firebase/firestore';
import { db } from '../firebase';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
}

class Store {
  products: Product[] = [];
  cart: { product: Product; quantity: number }[] = [];
  hasModalShown = false;
  isLoading: boolean = false;
  productError: string | null = null;

  constructor() {
    makeAutoObservable(this);
    this.fetchProducts();
  }

  setProductError(message: string) {
    runInAction(() => {
      this.productError = message;
    });
  }

  clearProductError() {
    runInAction(() => {
      this.productError = null;
    });
  }

  async fetchProducts() {
    runInAction(() => {
      this.isLoading = true;
      this.productError = null;
    });

    try {
      const querySnapshot = await getDocs(collection(db, 'products'));
      runInAction(() => {
        this.products = querySnapshot.docs.map((doc) => {
          const productData = doc.data();

          const product: Product = {
            id: doc.id,
            name: productData.name || 'Unnamed Product',
            description: productData.description || 'No description available',
            price: productData.price || 0,
          };

          return product;
        });
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        this.setProductError(error.message);
      } else {
        this.setProductError('An unknown error occurred.');
      }
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  }

  async addProduct(newProduct: Omit<Product, 'id'>) {
    try {
      const docRef = await addDoc(collection(db, 'products'), newProduct);
      runInAction(() => {
        this.products.push({ id: docRef.id, ...newProduct });
      });
    } catch (error) {
      console.error('Error adding product:', error);
    }
  }

  async removeProduct(productId: string) {
    try {
      const productRef = doc(db, 'products', productId);
      await deleteDoc(productRef);
      runInAction(() => {
        this.products = this.products.filter(
          (product) => product.id !== productId
        );
      });
    } catch (error) {
      console.error('Error removing product:', error);
    }
  }

  addToCart(product: Product) {
    runInAction(() => {
      const existingItem = this.cart.find(
        (item) => item.product.id === product.id
      );
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        this.cart.push({ product, quantity: 1 });
        if (this.cart.length === 1 && !this.hasModalShown) {
          this.hasModalShown = true;
        }
      }
    });
  }

  removeFromCart(productId: string) {
    runInAction(() => {
      const existingItem = this.cart.find(
        (item) => item.product.id === productId
      );
      if (existingItem) {
        if (existingItem.quantity > 1) {
          existingItem.quantity -= 1;
        } else {
          this.cart = this.cart.filter((item) => item.product.id !== productId);
        }
      }
    });
  }

  removeProductFromCart(productId: string) {
    runInAction(() => {
      this.cart = this.cart.filter((item) => item.product.id !== productId);
    });
  }

  hideModal() {
    runInAction(() => {
      this.hasModalShown = false;
    });
  }

  clearCart() {
    runInAction(() => {
      this.cart = [];
      this.hasModalShown = false;
    });
  }

  get cartItemCount() {
    return this.cart.reduce((total, item) => total + item.quantity, 0);
  }

  get cartTotal() {
    return this.cart.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  }
}

const store = new Store();
export default store;
