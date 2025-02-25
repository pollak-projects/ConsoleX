<template>
    <div>
      <h2>Új termék hozzáadása</h2>
      <form @submit.prevent="addProduct">
        <div>
          <label for="name">Termék neve:</label>
          <input type="text" v-model="product.name" required>
        </div>
        <div>
          <label for="price">Ár:</label>
          <input type="number" v-model="product.price" required>
        </div>
        <div>
          <label for="image">Kép URL:</label>
          <input type="text" v-model="product.image">
        </div>
        <div>
          <label for="category">Kategória:</label>
          <input type="text" v-model="product.category" required>
        </div>
        <button type="submit">Hozzáadás</button>
      </form>
    </div>
  </template>

  <script>
  import axios from 'axios';

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
          const response = await axios.fetch('http://localhost:8000/products/admin', {
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
