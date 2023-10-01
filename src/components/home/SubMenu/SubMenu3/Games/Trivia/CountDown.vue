<template>
  <div class="circle">
    <div class="spinner"></div>
    {{ countDown }}
  </div>
</template>

<script>
export default {
  name: "CountDown",
  emits: ["timerEnd"],

  data() {
    return {
      countDown: 3,
    };
  },

  created() {
    this.countDownTimer();
  },
  methods: {
    countDownTimer() {
      if (this.countDown > 0) {
        setTimeout(() => {
          this.countDown -= 1;
          this.countDownTimer();
        }, 1000);
      } else {
        this.$emit("timerEnd");
      }
    },
  },
};
</script>

<style scoped>
.circle {
  color: var(--ion-color-primary);
  background-color: var(--ion-white);
  border-radius: 100%;
  width: 12rem;
  height: 12rem;
  font-size: 7rem;
  box-shadow: rgba(85, 98, 123, 0.35) 0px 5px 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 700;
  position: absolute;
  top:50%;
  left: 50%;
  transform: translate(-50%,-50%);
}

.spinner {
  width: 12rem;
  height: 12rem;
  border: 4px solid var(--ion-color-primary);
  border-top: 4px solid var(--ion-white);
  border-radius: 50%;
  animation: spin 1s linear infinite;
  z-index: 2;
  position: absolute;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
