import { makeAutoObservable } from 'mobx';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
}

class Store {
  products: Product[] = [
    {
      id: 1,
      name: 'Product 1',
      description: 'Amazing product 1',
      price: 25.99,
    },
    {
      id: 2,
      name: 'Product 2',
      description: 'Amazing product 2',
      price: 15.99,
    },
    {
      id: 3,
      name: 'Product 3',
      description: 'Amazing product 3',
      price: 35.99,
    },
  ];

  cart: { product: Product; quantity: number }[] = [];
  hasModalShown = false;

  constructor() {
    makeAutoObservable(this);
  }

  addToCart(product: Product) {
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
  }

  removeFromCart(productId: number) {
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
  }

  removeProductFromCart(productId: number) {
    this.cart = this.cart.filter((item) => item.product.id !== productId);
  }

  hideModal() {
    this.hasModalShown = false;
  }

  clearCart() {
    this.cart = [];
    this.hasModalShown = false;
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
