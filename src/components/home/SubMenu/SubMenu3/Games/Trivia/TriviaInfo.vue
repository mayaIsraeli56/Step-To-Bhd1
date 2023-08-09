<template>
  <div class="info">
    <div class="clock-part" v-if="type == 2">
      <ion-img
        class="trivia-icon clock-icn"
        :src="require(`@/assets/media1/HomePage/games/trivia/time.png`)"
      ></ion-img>
      <div class="time">
        <ion-text class="text-dark-plain" v-if="sec > 9">
          {{ min + ":" + sec }}</ion-text
        >
        <ion-text class="text-dark-plain" v-else>
          {{ min + ":0" + sec }}</ion-text
        >
      </div>
    </div>

    <div class="hearts" v-else-if="type == 3">
      <ion-img
        v-for="n in life"
        :key="n"
        :class="[n > noWrong ? 'popIn' : 'popOut', 'trivia-icon heart']"
        :src="require(`@/assets/media1/HomePage/games/trivia/like.png`)"
      ></ion-img>
    </div>

    <div class="test" v-else>

      <ion-button
        v-for="n in 10"
        :key="n"
        class="circle"        
      >{{n}}</ion-button>
    </div>

    <div class="checkd-part" v-if="type == 2 || type == 3">
      <ion-img
        class="trivia-icon mark"
        :src="require(`@/assets/media1/HomePage/games/trivia/check.png`)"
      ></ion-img>
      <ion-text class="text-dark-plain checked-num"> {{ noCorrect }}</ion-text>
    </div>
  </div>
</template>

<script>
import { IonImg, IonText,IonButton } from "@ionic/vue";

export default {
  name: "TriviaGame",
  components: { IonImg, IonText,IonButton },
  props: ["type", "noCorrect", "noWrong", "stage"],

  data() {
    return {
      life: 3,
      min: 1,
      sec: 0,
    };
  },

  methods: {
    countDownTimer() {
      if (this.min == 0 && this.sec == 0) {
        this.$emit("endGame");
        return;
      }

      setTimeout(() => {
        if (this.sec > 0) this.sec--;
        else {
          this.min--;
          this.sec = 59;
        }
        this.countDownTimer();
      }, 1000);
    },
  },

  watch: {
    stage: {
      immediate: true,
      handler() {
        if (this.type == 2 && this.stage == "game") {
          this.min = 1;
          this.sec = 0;
          this.countDownTimer();
        }
      },
    },
  },
};
</script>

<style scoped>
.info {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.trivia-icon {
  display: inline-block;
  width: 30%;
  height: 30%;
}

.hearts,
.clock-part {
  width: 50%;
  display: flex;
}
.heart {
  margin: 2%;
  width: 15%;
  position: relative;
  right: 0;
}
.checkd-part {
  width: 50%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.mark {
  margin: 2%;
  width: 15%;
  position: relative;
  right: 0;
}

.checked-num {
  margin: 0 4% 0 4%;
  font-size: 1.8rem;
}

.clock-icn {
  margin: 2%;
  margin-left: 5%;
  width: 15%;
  position: relative;
  right: 0;
}

.circle {
  --border-radius: 100%;
width: 9%;


margin: 0;
padding: 0;
}
.test {
  width: 100%;
  height: 50%;
  display: flex;
  align-items: space-around;
  justify-content: center;
}

.popIn {
  animation: popIn 1s ease-in-out;
  -webkit-animation: popIn 1s ease-in-out;
}

@keyframes popIn {
  0% {
    transform: scale(0);
  }
  80% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
}
@-webkit-keyframes popIn {
  from {
    -webkit-transform: scale(0);
  }
  80% {
    -webkit-transform: scale(1.2);
  }
  100% {
    -webkit-transform: scale(1);
  }
}
.popOut {
  animation: popOut 1s ease-in-out forwards;
  -webkit-animation: popOut 1s ease-in-out;
  animation-fill-mode: forwards;
}
@keyframes popOut {
  0% {
    transform: scale(1);
  }
  80% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(0);
  }
}
@-webkit-keyframes popOut {
  0% {
    transform: scale(1);
  }
  80% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(0);
  }
}
</style>
