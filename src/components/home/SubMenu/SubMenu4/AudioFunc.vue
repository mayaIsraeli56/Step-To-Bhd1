<template>
  <div class="box">
    <ion-button class="details"></ion-button>

    <div class="control">
      <ion-button v-for="n in 3" :key="n" :class="'control' + n">
        <ion-img
          :src="require(`@/assets/media1/HomePage/podcasts/control${n}.png`)"
        ></ion-img>
      </ion-button>

    </div>

    <ion-button class="speed">
      <ion-text class="text-dark-plain">1X </ion-text></ion-button
    >
  </div>
</template>

<script>
import { IonText, IonButton, IonImg } from "@ionic/vue";
import { mapState } from "vuex";

export default {
  name: "AudoiFunc",
  components: { IonText, IonButton, IonImg },
  props: [""],

  data() {
    return {
        title: '',

    };
  },

  computed: {
    ...mapState("podcasts", ["chapter", "subChapter"]),
  },

//   created () {
//     this.current = this.songs[this.index];
//     this.player.src = this.current.src;
//   },


  methods: {},
};
</script>

<style scoped>
.box {
  display: flex;
  width: 95%;
  justify-content: space-between;
  align-items: center;
  margin: 2% 0%;
}

ion-button {
  --border-radius: 100%;
  width: 3rem;
  height: 3rem;
  --background: none;
}

.control2 {
  --background: var(--ion-color-light-shade);
  width: 3.5rem;
  height: 3.5rem;
}
.control1,
.control3 {
  --box-shadow: none;
}

.details {
  --background: url("@/assets/media1/HomePage/podcasts/timing-btn.png") 0 0/100%
    100% no-repeat;
  --box-shadow: none;
}

.speed {
  font-size: 1.2rem;
  --box-shadow: none;
}

.text-dark-plain {
  font-weight: 900;
}
</style>
<!--   --background: none; -->
