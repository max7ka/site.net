<template>
  <div id="app">
    <div class="intro"><p>SCROLL TO CONTINUE</p></div>
    <Scrollama
      :offset="0.5"
      :debug="true"
      @step-enter="({ element }) => (currStep = element.dataset.stepNo)"
      @step-exit="({ element }) => (currStep = null)"
      :progress="true"
      @step-progress="({ progress }) => (currStepProgress = progress)"
    >
      <div
        v-for="page in pages"
        :key="page.number"
        class="step"
        :data-step-no="page.number"
        :class="{ active: page.number == currStep }"
      >
        <div>page {{ page.number }}</div>
        <div>{{ Math.round(currStepProgress * 100) }}%</div>
      </div>
    </Scrollama>
  </div>
</template>

<script>
import "intersection-observer";
import Scrollama from "vue-scrollama";

export default {
  name: "App",
  components: {
    Scrollama
  },
  data() {
    return {
      currStep: null,
      currStepProgress: null,
      pages: [
          {number: 1,},
          {number: 2,},
          {number: 3,},
          {number: 4,},
      ]
    };
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.intro {
  padding: 30vh;
}
.step {
  padding: 35vh 0;
  width: 50%;
  margin: 0 auto 30vh;
  background-color: beige;
  border: 1px solid #ccc;
}
.step.active {
  background-color: teal;
  color: white;
}
</style>
