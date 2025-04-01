<template>
  <transition name="slide-fade">
    <div v-if="visible" :class="['base-alert', type]">
      <div class="alert-header">
        <div class="icon-area">
          <span v-if="type === 'success'">✅</span>
          <span v-else-if="type === 'error'">❌</span>
          <span v-else-if="type === 'warning'">⚠️</span>
          <span v-else>ℹ️</span>
        </div>
        <button class="close-btn" @click="closeAlert">✖</button>
      </div>

      <div class="message">{{ message }}</div>

      <!-- Műveleti gombok (igen/nem) -->
      <div class="actions" v-if="showActions">
        <button class="yes-button" @click="confirmAction">Igen</button>
        <button class="no-button" @click="cancelAction">Nem</button>
      </div>

      <!-- Automatikus eltűnés animáció -->
      <div
        v-if="!showActions"
        class="progress-bar"
        :style="{ animationDuration: duration + 'ms' }"
      ></div>
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
      default: 2200
    },
    showActions: {
      type: Boolean,
      default: false
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
      if (!this.showActions) {
        this.autoHide();
      }
    },
    autoHide() {
      setTimeout(() => {
        this.closeAlert();
      }, this.duration);
    },
    closeAlert() {
      this.visible = false;
      this.$emit('close');
    },
    confirmAction() {
      this.visible = false;
      this.$emit('confirm');
    },
    cancelAction() {
      this.visible = false;
      this.$emit('cancel');
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
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  min-width: 300px;
  max-width: 450px;
  background-color: white;
  border-left: 6px solid;
  padding: 15px 20px 10px;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  font-family: 'Montserrat', sans-serif;
  font-size: 16px;
  font-weight: 600;
  display: flex;
  flex-direction: column;
  gap: 8px;
  z-index: 9999;
  overflow: hidden;
  text-align: center;
  transition: all 0.3s ease-in-out;
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

.alert-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.icon-area {
  font-size: 22px;
}

.message {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  text-align: center;
}

.actions {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 10px;
}

.yes-button,
.no-button {
  padding: 8px 18px;
  border-radius: 8px;
  font-weight: bold;
  font-size: 14px;
  cursor: pointer;
  border: none;
  transition: 0.3s ease;
}

.yes-button {
  background-color: #e53935;
  color: white;
}

.no-button {
  background-color: #cfd8dc;
  color: #333;
}

.yes-button:hover {
  background-color: #c62828;
}

.no-button:hover {
  background-color: #b0bec5;
}

.close-btn {
  background: none;
  border: none;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  color: inherit;
  transition: transform 0.2s ease-in-out;
}

.close-btn:hover {
  transform: scale(1.2);
}

.progress-bar {
  height: 4px;
  background: linear-gradient(to right, #4caf50, #e91e63);
  animation-name: countdown;
  animation-timing-function: linear;
  animation-fill-mode: forwards;
  border-radius: 10px;
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
