<template>
  <transition appear name="fadeEnter">
  <div class="cards">
    <ion-text class="text-dark-plain note" ref="txt">
      לחצו על הכרטיסייה כדי לראות את התשובה</ion-text
    >

    <div
      :class="['flip-card', flip ? 'flip' : '']"
      @click="() => (flip = !flip)"
      ref="card"
    >
      <div class="flip-card-inner">
        <div class="flip-card-front card">
          <ion-text class="text-dark-plain cntnt" ref="front">
            {{ cards[cardNum].qes }}</ion-text
          >
        </div>
        <div class="flip-card-back card">
          <ion-text class="text-dark-plain cntnt ion-text-justify">
            {{ cards[cardNum].ans }}</ion-text
          >
        </div>
      </div>
    </div>

    <div class="btns">
      <ion-button
        shape="round"
        size="large"
        @click="changeCard(-1)"
        :disabled="cardNum == 0"
      >
        <ion-img :src="arrow" class="arrow back-arr"></ion-img>
        הקודם
      </ion-button>
      <ion-button
        shape="round"
        size="large"
        @click="changeCard(1)"
        :disabled="cardNum == cards.length - 1"
        >הבא
        <ion-img :src="arrow" class="arrow forward-arr"></ion-img>
      </ion-button>
    </div>
  </div>
  </transition>
</template>

<script>
import { IonText, IonButton, IonImg } from "@ionic/vue";
import { mapState } from "vuex";
import cards from "@/json/games/cards.json";

export default {
  name: "CardGame",
  components: { IonText, IonButton, IonImg },

  data() {
    return {
      arrow: require("@/assets/media1/HomePage/arrow-back.png"),
      cards: [],
      cardNum: 0,
      flip: false,
      changingNum: false,
    };
  },

  computed: {
    ...mapState("games", ["chosenChapters"]),
  },

  beforeMount() {
    cards.forEach((chap, i) => {
      chap.forEach((ques) => {
        if (this.chosenChapters.includes(i)) this.cards.push(ques);
      });
    });

    this.cards = this.shuffle(this.cards);
  },

  methods: {
    shuffle(array) {
      let currentIndex = array.length,
        randomIndex;

      // While there remain elements to shuffle.
      while (currentIndex > 0) {
        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
          array[randomIndex],
          array[currentIndex],
        ];
      }

      return array;
    },
    changeCard(change) {
      this.flip = false;
      this.$refs.front.$el.style.opacity = 0;

      if (
        this.cardNum + change <= this.cards.length - 1 &&
        this.cardNum + change >= 0 &&
        !this.changingNum
      ) {
        this.changingNum = true;
        setTimeout(() => {
          this.cardNum += change;
          this.$refs.front.$el.style.opacity = 1;
          this.changingNum = false;
        }, 500);
      }
    },
  },
};
</script>

<style scoped>
.cards {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  height: 90%;
}
.note {
  font-size: 2.5dvh;
  transform: translateY(25%);
}

.btns {
  height: 15%;
  width: 90%;
  display: flex;
  align-items: center;
  justify-content: space-around;
}
/* The flip card container - set the width and height to whatever you want. We have added the border property to demonstrate that the flip itself goes out of the box on hover (remove perspective if you don't want the 3D effect */
.flip-card {
  background-color: transparent;
  width: 85%;
  height: 70%;
  perspective: 100%; /* Remove this if you don't want the 3D effect */
  color: var(--ion-white);
}

/* This container is needed to position the front and back side */
.flip-card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.8s;
  transform-style: preserve-3d;
}
.card {
  padding: 6%;
  font-size: 80%;
  transform-style: preserve-3d;
  transition: all 1s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}
/* Do an horizontal flip when you move the mouse over the flip box container */
.flip .flip-card-inner {
  transform: rotateY(180deg);
}

/* Position the front and back side */
.flip-card-front,
.flip-card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  -webkit-backface-visibility: hidden; /* Safari */
  backface-visibility: hidden;
  border-radius: 5dvh;
  box-shadow: rgba(85, 98, 123, 0.35) 0px 5px 15px;
  color: var(--ion-color-medium) !important;
}

/* Style the front side (fallback if image is missing) */
.flip-card-front {
  background-color: var(--ion-color-tertiary);
  font-weight: 700;
  font-size: 200%;
}

/* Style the back side */
.flip-card-back {
  background-color: var(--ion-white);
  transform: rotateY(180deg);
}

ion-button {
  height: 50%;
  width: 40%;
  font-weight: 600;
}

.arrow {
  position: relative;
  height: 50%;
}
.forward-arr {
  right: 30%;
  transform: rotate(180deg);
}
.back-arr {
  left: 20%;
}

.cntnt {
  transition: all 0.5s ease;
}
</style>
