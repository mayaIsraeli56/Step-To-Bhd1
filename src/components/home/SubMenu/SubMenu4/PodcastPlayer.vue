<template>
  <ion-content scroll-y="false">
    <ion-list>
      <card-with-line title="">
        <template v-slot:header>
          <podcast-header></podcast-header>
        </template>
        <podcast-body></podcast-body>
      </card-with-line>
    </ion-list>
  </ion-content>
</template>

<script>
import CardWithLine from "@/components/reuse/CardWithLine.vue";
import PodcastHeader from "./PodcastHeader.vue";
import PodcastBody from "./PodcastBody.vue";
import { IonContent, IonList } from "@ionic/vue";

export default {
  name: "PodcastPlayer",
  props: [""],
  components: { IonContent, IonList, CardWithLine, PodcastHeader, PodcastBody },

  data() {
    return {
      title: "PODCASTS",
    };
  },

  methods: {},
};
</script>

<style scoped>
* {
  transition: all 0.5s ease;
}

ion-list {
  margin: 5%;
}
</style>
