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

    const savedCart = localStorage.getItem('shoppingCart');
    if (savedCart) {
      this.cart = JSON.parse(savedCart);
    }

    this.fetchProducts();
  }

  saveCartToLocalStorage() {
    localStorage.setItem('shoppingCart', JSON.stringify(this.cart));
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

  async fetchProducts(forceRefresh = false) {
    if (this.products.length > 0 && !forceRefresh) {
      return;
    }

    runInAction(() => {
      this.isLoading = true;
      this.productError = null;
    });

    try {
      const querySnapshot = await getDocs(collection(db, 'products'));
      runInAction(() => {
        this.products = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          if (!data.name || !data.price) {
            console.warn(`Product ${doc.id} has invalid data`);
          }
          return {
            id: doc.id,
            name: data.name ?? 'Unnamed Product',
            description: data.description ?? '',
            price: data.price ?? 0,
          } as Product;
        });
      });
    } catch (error) {
      this.setProductError(
        error instanceof Error ? error.message : 'Unknown error'
      );
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
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

    this.saveCartToLocalStorage();
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

    this.saveCartToLocalStorage();
  }

  removeProductFromCart(productId: string) {
    runInAction(() => {
      this.cart = this.cart.filter((item) => item.product.id !== productId);
    });

    this.saveCartToLocalStorage();
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

    this.saveCartToLocalStorage();
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
