<template>
    <div>
      <div>
        <button @click="playAudio" :disabled="isPlaying">Play</button>
        <button @click="pauseAudio" :disabled="!isPlaying">Pause</button>
      </div>
  
      <div>
        <div>Current Time: {{ currentTime }}</div>
        <div>Total Time: {{ totalTime }}</div>
      </div>
  
      <div>
        <input type="range" min="0" :max="duration" v-model="currentTime" @input="seekToTime">
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        audioSource: 'your-audio-file.mp3',
        isPlaying: false,
        currentTime: 0,
        duration: 0,
        audioContext: null,
        audioBufferSource: null,
      };
    },
    computed: {
      totalTime() {
        const minutes = Math.floor(this.duration / 60);
        const seconds = Math.floor(this.duration % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
      },
    },
    methods: {
      async playAudio() {
        if (!this.audioContext) {
          this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
          const response = await fetch(this.audioSource);
          const audioData = await response.arrayBuffer();
          const audioBuffer = await this.audioContext.decodeAudioData(audioData);
          this.duration = audioBuffer.duration;
          this.audioBufferSource = this.audioContext.createBufferSource();
          this.audioBufferSource.buffer = audioBuffer;
          this.audioBufferSource.connect(this.audioContext.destination);
        }
        
        if (!this.isPlaying) {
          this.audioBufferSource.start(0, this.currentTime);
          this.isPlaying = true;
        }
      },
      pauseAudio() {
        if (this.isPlaying) {
          this.audioBufferSource.stop();
          this.isPlaying = false;
        }
      },
      seekToTime() {
        if (this.audioBufferSource) {
          this.audioBufferSource.stop();
          this.playAudio();
        }
      },
    },
    beforeDestroy() {
      if (this.audioBufferSource) {
        this.audioBufferSource.stop();
        this.audioBufferSource.disconnect();
      }
      if (this.audioContext) {
        this.audioContext.close();
      }
    },
  };
  </script>
  