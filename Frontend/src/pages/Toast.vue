<template>
    <transition name="fade">
      <div v-if="visible" class="toast" :class="type">
        {{ message }}
      </div>
    </transition>
  </template>
  
  <script>
  export default {
    data() {
      return {
        visible: false,
        message: '',
        type: 'success',
      };
    },
    methods: {
      show(msg, toastType = 'success') {
        this.message = msg;
        this.type = toastType;
        this.visible = true;
        setTimeout(() => {
          this.visible = false;
        }, 3000);
      },
    },
  };
  </script>
  
  <style scoped>
  .toast {
    position: fixed;
    bottom: 30px;
    right: 30px;
    background: #323232;
    color: #fff;
    padding: 15px 20px;
    border-radius: 10px;
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
    font-weight: 600;
    z-index: 1000;
    max-width: 300px;
  }
  .toast.success {
    background-color: #4caf50;
  }
  .toast.error {
    background-color: #f44336;
  }
  .toast.info {
    background-color: #2196f3;
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity 0.3s ease;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
  </style>
  