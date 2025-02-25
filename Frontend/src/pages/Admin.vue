<template>
    <div>
      <h2>Add New Product</h2>
      <form @submit.prevent="addProduct">
        <div>
          <label for="name">Product Name:</label>
          <input type="text" v-model="product.name" required>
        </div>
        <div>
          <label for="price">Price:</label>
          <input type="number" v-model="product.price" required>
        </div>
        <div>
          <label for="image">Image URL:</label>
          <input type="text" v-model="product.image">
        </div>
        <div>
          <label for="category">Category:</label>
          <input type="text" v-model="product.category" required>
        </div>
        <button type="submit">Add Product</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        product: {
          name: '',
          price: '',
          image: '',
          category: ''
        }
      };
    },
    methods: {
      async addProduct() {
        try {
          const response = await fetch('http://localhost:8000/products/admin', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.product)
          });
          const data = await response.text();
          console.log(data);
        } catch (error) {
          console.error('Error:', error);
        }
      }
    }
  };
  </script>
  