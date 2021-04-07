<template>
  <section>
    <lorem add="1p" />
    <!--figure class="image is-16by9 print-no">
      <iframe
        class="has-ratio"
        width="640"
        height="360"
        :src="require('../assets/videos/87year.mp4')"
        frameborder="0"
        allowfullscreen
      ></iframe>
    </figure-->
    <!-- @play="your_method"-->

    <div v-animate.fade="'slide-left'">
      <div style="width: 300px; height: 300px; background: red">
        <p>hello</p>
      </div>
    </div>

    <lorem add="10p" />
  </section>
</template>

<script>
import Lorem from "vue-lorem-ipsum";
export default {
  components: {
    Lorem,
  },
};
</script>

<style scoped>

.animate {
  transition-delay: .3s;
  transition-duration: .75s;
  transition-timing-function: ease-in;
}

.slide-up {
  transform: translateY(0);
}
.slide-up.animate-active {
  transform: translateY(-100px);
}

.slide-left {
  transform: translateX(-50vw);
}
.slide-left.animate-active {
  transform: translateX(0);
}

</style>