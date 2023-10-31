<template>
  <swiper
    :centeredSlides="true"
    :initialSlide="7"
    :spaceBetween="5"
    :slidesPerView="1.3"
    :pagination="true"
    :modules="modules"
    class="mySwiper"
    @slideChange="swiperChange"
    @click="slideClicked"
  >
    <slot></slot>
  </swiper>
</template>

<script>
import { Pagination } from "swiper";
import { toRaw } from "vue";
import { Swiper } from "swiper/vue";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { mapActions } from "vuex";

export default {
  name: "SubMenuSwiper",
  props: ["parent", "slidesNum"],
  components: {
    Swiper,
  },

  data() {
    return {
      activeIndex: 0,
      initSlide: this.$store.state.learning.lastChapter,
    };
  },

  methods: {
    ...mapActions("learning", ["changeChapter"]),

    swiperChange(e) {
      this.activeIndex = toRaw(e).activeIndex;
    },

    slideClicked() {
      switch (this.parent) {
        case 2:
          this.$emit("chapterChosen", this.activeIndex);
          this.changeChapter(this.activeIndex);
          break;
        case 3:
          // code block
          break;
      }
    },

    slideAnim() {
      for (let i = 1; i < this.slidesNum + 1; i++) {
        this.$el.querySelector(`.slide${i}`).style.transition = "0.5s";
        this.$el.querySelector(`.slide${i}`).style.opacity = 0.5;
        this.$el.querySelector(`.slide${i}`).style.scale = "90%";
      }

      this.$el.querySelector(`.swiper-slide-active`).style.top = "0";
      this.$el.querySelector(`.swiper-slide-active`).style.opacity = 1;
      this.$el.querySelector(`.swiper-slide-active`).style.scale = "100%";
    },
  },

  setup() {
    return {
      modules: [Pagination],
    };
  },

  mounted() {
    this.slideAnim();
    this.$watch("activeIndex", () => {
      this.slideAnim();
    });
  },
};
</script>
