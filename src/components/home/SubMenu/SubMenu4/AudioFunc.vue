<template>
  <!-- Hide the default audio player -->

  <audio style="display: none" ref="player" id="myAudio" :src="audioSrc" />

  <!-- time-->
  <div class="time">
    <ion-text class="text-dark-plain curr"
      >{{ formatTime(currTime) }}
    </ion-text>
    <div class="progress-bar">
      <input
        type="range"
        min="0"
        :max="duration"
        v-model="currTime"
        @input="seekToTime"
        id="position"
        name="position"
      />
    </div>
    <ion-text class="text-dark-plain end">{{ formatTime(duration) }} </ion-text>
  </div>

  <!-- control -->
  <div class="audio-func">
    <ion-button class="details" @click="openingTimingMenu"></ion-button>

    <div class="control">
      <ion-button
        v-for="n in 3"
        :key="n"
        :class="'control' + n"
        @click="handleClick(n)"
        :disabled="disableBtn(n)"
      >
        <ion-img
          :src="
            require(`@/assets/media1/HomePage/podcasts/control${
              n == 2 && isPlaying ? 4 : n
            }.png`)
          "
        ></ion-img>
      </ion-button>
    </div>

    <ion-button class="speed" @click="changeSpeed">
      <ion-text class="text-dark-plain">{{ speed }}X </ion-text></ion-button
    >
  </div>
</template>

<script>
import { IonText, IonButton, IonImg } from "@ionic/vue";
import { mapState, mapActions } from "vuex";

const MAX_SUB = [3, 5, 19, 8, 10, 7, 5, 1, 4, 3, 6]; // num of subchapters in each chaper

export default {
  name: "AudoiFunc",
  components: { IonText, IonButton, IonImg },
  props: [""],

  data() {
    return {
      title: "",
      isPlaying: false,
      currTime: 0, // time is in sec
      duration: 0,
      speed: 1,
      openTimingMenu: false,
    };
  },

  computed: {
    ...mapState("podcasts", ["chapter", "subChapter", "timingMenu", "newTime"]),

    audioSrc() {
      return require(`@/assets/audio/chap${this.chapter + 1}/${
        this.subChapter + 1
      }.mp3`);
    },
  },

  mounted() {
    this.initAudio();
  },

  methods: {
    ...mapActions("podcasts", [
      "nextPodcast",
      "lastPodcast",
      "toggleTimingMenu",
      "finishUpdateTime",
    ]),

    openingTimingMenu() {
      this.toggleTimingMenu();
    },

    disableBtn(btnNum) {
      return (
        (btnNum == 3 && this.subChapter == 0 && this.chapter == 0) ||
        (btnNum == 1 &&
          this.subChapter == MAX_SUB[10] - 1 &&
          this.chapter == 10)
      );
    },

    async handleClick(controlBtnNum) {
      switch (controlBtnNum) {
        case 1: // nextPodcast
          this.pause();
          await this.nextPodcast();
          this.play();
          break;
        case 2: // play or pause
          !this.isPlaying ? this.play() : this.pause();
          break;
        case 3: // lastPodcast
          this.pause();
          await this.lastPodcast();
          this.play();
          break;
      }
    },

    initAudio() {
      var audio = this.$refs.player;

      audio.onloadedmetadata = () =>
        (this.duration = Math.round(audio.duration));
    },

    // user change time by input value
    seekToTime(e) {
      let newTime = e.target.value;
      let diff = Math.abs(newTime - this.$refs.player.currentTime * 60);

      // prevent infinite loop between playback listener and this watcher
      if (diff > 0.01) {
        this.$refs.player.currentTime = newTime;
      }
    },

    //Playback listener function runs every 100ms while audio is playing
    playbackListener(e) {
      var audio = this.$refs.player;
      this.currTime = audio.currentTime;

      //Add listeners for pause and audio end events
      audio.addEventListener("ended", this.endListener);
      audio.addEventListener("pause", this.pauseListener);
    },

    //audio is paused by user
    pauseListener() {
      this.isPlaying = false;
      this.cleanupListeners();
    },

    // audio play reaches the end
    endListener() {
      this.isPlaying = false;
      this.cleanupListeners();
    },

    //Remove listeners after audio play stops
    cleanupListeners() {
      var audio = this.$refs.player;
      audio.removeEventListener("timeupdate", this.playbackListener);
      audio.removeEventListener("ended", this.endListener);
      audio.removeEventListener("pause", this.pauseListener);
    },

    play() {
      this.isPlaying = true;
      var audio = this.$refs.player;
      audio.play();
      this.isPlaying = true;
      audio.addEventListener("timeupdate", this.playbackListener);
    },

    pause() {
      this.isPlaying = false;
      this.$refs.player.pause();
      this.isPlaying = false;
    },

    changeSpeed() {
      this.speed = (this.speed % 2) + 0.25;
      this.$refs.player.playbackRate = this.speed;
    },

    formatTime(time) {
      let min = Math.floor(time / 60);
      let sec = Math.floor(time % 60);
      return `${min < 10 ? "0" : ""}${min}:${sec < 10 ? "0" : ""}${sec}`;
    },
  },

  watch: {
    newTime: {
      handler() {
        if (this.newTime != -1) {
          this.$refs.player.currentTime = this.newTime;
          this.currTime = this.newTime;
          this.finishUpdateTime();
        }
      },
    },
  },
};
</script>

<style scoped>
.time {
  display: flex;
  width: 95%;
  justify-content: space-between;
  align-items: center;
  margin: 2% 0%;
  flex-direction: row-reverse;
  transition: all 0.5s ease;
}

.progress-bar {
  width: 65%;
  height: 0.5rem;
  background-color: var(--ion-color-warning-shade);
  border-radius: 2dvh;
  transition: all 0.5s ease;
}

input[type="range"] {
  -ms-appearance: none;
  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;
  outline: none;
  display: block;
  width: 100%;
  cursor: pointer;
  overflow: hidden;
  position: relative;
  left: 0;
  border-radius: 2dvh;
  background-color: var(--ion-color-warning-shade);
  direction: ltr;
}

/* Thumb: webkit */
input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  border: none;
  height: 0.6rem;
  width: 0.5rem;
  background-color: var(--ion-color-primary-contrast);
  box-shadow: -407px 0 0 400px var(--ion-color-primary-contrast);
  transition: 0.2s ease-in-out;
}

/* Thumb: Firefox */
input[type="range"]::-moz-range-thumb {
  -webkit-appearance: none;
  appearance: none;
  border: none;
  height: 0.6rem;
  width: 0.5rem;
  background-color: var(--ion-color-primary-contrast);
  box-shadow: -407px 0 0 400px var(--ion-color-primary-contrast);
  transition: 0.2s ease-in-out;
}

input[type="range"]::-webkit-slider-runnable-track {
  -webkit-appearance: none;
  background: none;
}
input[type="range"]::-moz-range-track {
  -webkit-appearance: none;
  appearance: none;
  background: none;
}
input[type="range"]::-ms-track {
  -webkit-appearance: none;
  appearance: none;
  background: none;
}

.audio-func {
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
  --background-activated: var(--ion-color-light-shade);
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
  --background: url("@/assets/media1/HomePage/podcasts/details.png") 50%/50% 50%
    no-repeat;
  --box-shadow: none;
}

.speed {
  font-size: 1.2rem;
  --box-shadow: none;
}

.text-dark-plain {
  font-weight: 900;
}

.transperent {
  opacity: 0;
}
</style>
