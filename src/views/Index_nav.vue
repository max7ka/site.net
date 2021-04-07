<template>
  <section class="hero is-fullheight">
    <div class="hero-head">
      <header class="navbar">
        <div class="container">
          <div class="navbar-brand">
            <a class="navbar-item">
              <img
                :src="require('../assets/logo.png')"
                alt="Logo"
                style="max-height: 3rem !important"
              />
            </a>
            <span class="navbar-burger" data-target="navbarMenuHeroC">
              <span></span>
              <span></span>
              <span></span>
            </span>
          </div>
          <div id="navbarMenuHeroC" class="navbar-menu">
            <div class="navbar-end">
              <a class="navbar-item is-active"> menu-1 </a>
              <a class="navbar-item"> menu-2 </a>
              <a class="navbar-item"> menu-3 </a>
              <span class="navbar-item">
                <a class="button is-success is-inverted">
                  <span class="icon">
                    <i class="fab fa-github"></i>
                  </span>
                  <span>menu-4</span>
                </a>
              </span>
            </div>
          </div>
        </div>
      </header>
    </div>

    <div class="hero-body" style="padding: 0 !important;">
        <div class="columns is-gapless">
            <div class="column is-1" style="background:yellow;">left</div>
            <div class="column scroll-area">
                <vue-scroll>
                    <lorem add="10p" />
                </vue-scroll>
            </div>
            <div class="column is-1" style="background:yellow;">right</div>
        </div>
      <!--div class="container has-text-centered">
        <h1 class="title">Title</h1>
        <h2 class="subtitle">Subtitle</h2>
      </div>

      <Scrollama :offset="0.5" @step-enter="stepEnterHandler">
        <div slot="graphic" class="graphic">
          <p>{{ currStepId }}</p>
        </div>
        <div
          v-for="step in steps"
          :key="step.no"
          :data-step-id="step.id"
          class="step"
          :class="{ 'is-active': step.id === currStepId }"
        >
          <p>STEP {{ step.id }}</p>
        </div>
      </Scrollama>

      <About />
      <lorem add="10p" /-->
    </div>

    <div class="hero-foot">
      <nav class="tabs is-boxed is-fullwidth">
        <div class="container">
          <ul>
            <li class="is-active"><a>foot-1</a></li>
            <li><a>foot-2</a></li>
            <li><a>foot-3</a></li>
          </ul>
        </div>
      </nav>
    </div>
  </section>
</template>

<script>
import "intersection-observer";
//import Scrollama from "vue-scrollama";
import Lorem from "vue-lorem-ipsum";
//import About from "../components/about.vue";

//import vueCustomScrollbar from 'vue-custom-scrollbar'
//import "vue-custom-scrollbar/dist/vueScrollbar.css"

export default {
  components: {
    Lorem,
    //vueCustomScrollbar,
    /*Scrollama,
    About,*/
  },
  data() {
    return {
      scrollSettings: {
        suppressScrollY: false,
        suppressScrollX: true,
        wheelPropagation: false
      },        
      currStepId: null,
      steps: [{ id: "1" }, { id: "2" }, { id: "3" }, { id: "4" }],
      pages: [
        { number: 1, component: "about" },
        { number: 2, component: null },
        { number: 3, component: null },
        { number: 4, component: null },
      ],
    };
  },
  methods: {
    scrollHanle(evt) {
      console.log(evt)
    },      
    stepEnterHandler({ element, direction, index }) {
      console.log({ element, direction, index });
      this.currStepId = element.dataset.stepId;
    },
  },
};
</script>

<style src="vue-scrollama/dist/vue-scrollama.css"></style>

<style lang="scss" scoped>

.scroll-area {
  position: relative;
  margin: auto;
  height: 80vh;
  //width: 600px;
  //height: 400px;
  //overflow: hidden;
}

$header-height: 10vh;
$footer-height: 10vh;

.hero-head {
  //height: $header-height;
  background: lightsteelblue;
}
.hero-body {
  //height: 60vh; //100vh - $header-height - $footer-height;
  ///overflow-y: scroll;
  overflow: hidden;
  //display: block !important;
}
.hero-foot {
  //height: $footer-height;
  background: lightskyblue;
}

.graphic {
  height: 50vh;
  border: 1px solid #ccc;
  background-color: #eee;
  font-size: 10rem;
  display: flex;
  align-items: center;
  justify-content: center;
}
.step {
  padding: 15vh 0;
  width: 50%;
  margin: 0 auto 30vh;
  background-color: beige;
  border: 1px solid #ccc;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
