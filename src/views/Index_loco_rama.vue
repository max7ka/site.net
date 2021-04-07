<template>
<div ref="scrollSections" class="hello">
    <section data-scroll-section>
      <h3 data-scroll data-scroll-speed="1">Installed CLI Plugins</h3>
      <ul data-scroll data-scroll-speed="0.2">
        <li>
          <a
            href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-babel"
            target="_blank"
            rel="noopener"
          >babel</a>
        </li>
        <li>
          <a
            href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-eslint"
            target="_blank"
            rel="noopener"
          >eslint</a>
        </li>
      </ul>
      <ul data-scroll data-scroll-speed="5">
        <li>
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
        </li>           
      </ul>
    </section>
    <section data-scroll-section>
      <h3 data-scroll data-scroll-speed="1">Essential Links</h3>
      <ul data-scroll data-scroll-speed="2">
        <li>
          <a href="https://vuejs.org" target="_blank" rel="noopener">Core Docs</a>
        </li>
        <li>
          <a href="https://forum.vuejs.org" target="_blank" rel="noopener">Forum</a>
        </li>
        <li>
          <a href="https://chat.vuejs.org" target="_blank" rel="noopener">Community Chat</a>
        </li>
        <li>
          <a href="https://twitter.com/vuejs" target="_blank" rel="noopener">Twitter</a>
        </li>
        <li>
          <a href="https://news.vuejs.org" target="_blank" rel="noopener">News</a>
        </li>
      </ul>
    </section>
    <section data-scroll-section>
      <h3 data-scroll data-scroll-speed="4">Ecosystem</h3>
      <ul data-scroll data-scroll-speed="2">
        <li>
          <a href="https://router.vuejs.org" target="_blank" rel="noopener">vue-router</a>
        </li>
        <li>
          <a href="https://vuex.vuejs.org" target="_blank" rel="noopener">vuex</a>
        </li>
        <li>
          <a
            href="https://github.com/vuejs/vue-devtools#vue-devtools"
            target="_blank"
            rel="noopener"
          >vue-devtools</a>
        </li>
        <li>
          <a href="https://vue-loader.vuejs.org" target="_blank" rel="noopener">vue-loader</a>
        </li>
        <li>
          <a href="https://github.com/vuejs/awesome-vue" target="_blank" rel="noopener">awesome-vue</a>
        </li>
      </ul>
    </section>
  </div>
</template>

<script>

import locomotiveScroll from "locomotive-scroll";

import "intersection-observer";
import Scrollama from "vue-scrollama";

export default {
  name: "locoScroll",
  components: {
    Scrollama
  },  
  /*props: {
    msg: String,
  },*/
  data() {
    return {
      scrollIns: null,

      currStep: null,
      currStepProgress: null,
      pages: [
          {number: 1,},
          {number: 2,},
          {number: 3,},
          {number: 4,},
      ]      
    };
  },
  mounted() {
    const _self = this;
    this.$nextTick(function () {
      _self.initLocoScroll();
    });
  },
  methods: {
    initLocoScroll() {
      const _self = this;
      this.scroll = new locomotiveScroll({
        el: _self.$refs["scrollSections"],
        smooth: true,
        smoothMobile: true,
        getDirection: true,
      });
    },
  },
};
</script>

<style scoped>
section {
  min-height: 600px;
  border-bottom: 1px solid #38495C;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
/*h3 {
  margin: 40px 0 0;
}
ul {
  display: block;
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}*/



.intro {
  padding: 30vh;
}
.step {
  padding: 35vh 0;
  width: 80vw;
  margin: 0 auto 30vh;
  background-color: beige;
  border: 1px solid #ccc;
}
.step.active {
  background-color: teal;
  color: white;
}
</style>