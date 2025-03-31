<template>
    <transition name="slide-fade">
      <div v-if="visible" :class="['base-alert', type]">
        <div class="icon-area">
          <span v-if="type === 'success'">✅</span>
          <span v-else-if="type === 'error'">❌</span>
          <span v-else-if="type === 'warning'">⚠️</span>
          <span v-else>ℹ️</span>
        </div>
        <div class="message">{{ message }}</div>
        <div class="progress-bar" :style="{ animationDuration: duration + 'ms' }"></div>
      </div>
    </transition>
  </template>
  
  <script>
  export default {
    props: {
      message: String,
      type: {
        type: String,
        default: 'success'
      },
      duration: {
        type: Number,
        default: 1200
      }
    },
    data() {
      return {
        visible: false
      };
    },
    methods: {
      showAlert() {
        this.visible = true;
        setTimeout(() => {
          this.visible = false;
        }, this.duration);
      }
    },
    mounted() {
      this.showAlert();
    }
  };
  </script>
  
  <style scoped>
  .base-alert {
    position: fixed;
    top: 30px;
    right: 30px;
    min-width: 280px;
    max-width: 400px;
    background-color: white;
    border-left: 6px solid;
    padding: 15px 20px 10px;
    border-radius: 12px;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
    font-family: 'Montserrat', sans-serif;
    font-size: 16px;
    font-weight: 600;
    display: flex;
    flex-direction: column;
    gap: 8px;
    z-index: 9999;
    overflow: hidden;
  }
  
  .success {
    border-color: #4caf50;
    color: #2e7d32;
  }
  
  .error {
    border-color: #f44336;
    color: #c62828;
  }
  
  .info {
    border-color: #e91e63;
    color: #ad1457;
  }
  
  .warning {
    border-color: #ff9800;
    color: #ef6c00;
  }
  
  .icon-area {
    font-size: 22px;
    display: flex;
    align-items: center;
  }
  
  .message {
    flex: 1;
    display: flex;
    align-items: center;
    gap: 10px;
  }
  
  .progress-bar {
    height: 4px;
    background: linear-gradient(to right, #4caf50, #e91e63);
    animation-name: countdown;
    animation-timing-function: linear;
    animation-fill-mode: forwards;
  }
  
  @keyframes countdown {
    0% {
      width: 100%;
    }
    100% {
      width: 0%;
    }
  }
  
  .slide-fade-enter-active,
  .slide-fade-leave-active {
    transition: all 0.5s ease;
  }
  
  .slide-fade-enter-from,
  .slide-fade-leave-to {
    opacity: 0;
    transform: translateY(-20px);
  }
  </style>
  