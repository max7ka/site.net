<template>
  <div
  >
    <div
      class="org-figure"
      :data-0p="cs({ l: '70%', bc: 'color5-10' })"
      :data-120p="cs({ l: '0%', bc: 'color5+10' })"
    />
  </div>
</template>

<script>

import { cs } from "../modules/theme.ts";

export default {
  data() {
    return {
    };
  },
  created() {
    window.addEventListener("resize", this.resizeEventHandler);
  },
  destroyed() {
    window.removeEventListener("resize", this.resizeEventHandler);
  },
  methods: {
    /*bigLogoMouseenter() {
      if (this.animBigLogo != null) {
        this.animBigLogo.play();
      }
    },

    bigLogoMouseleave() {
      if (this.animBigLogo != null) {
        this.animBigLogo.pause();
      }
    },*/
    resizeEventHandler() {
      //const pageWidth = document.documentElement.scrollWidth;
      //const pageHeight = document.documentElement.scrollHeight;
      //+const windowInnerWidth = document.documentElement.clientWidth
      /*const windowInnerHeight = document.documentElement.clientHeight;

      const lotiW = 4000;
      const lotiH = 200;
      const topBarHeight = windowInnerHeight * 0.1;
      this.topBarWidth = (lotiW * topBarHeight) / lotiH;
      console.log(
        ` topBarHeight=${topBarHeight} topBarHeight/lotiH=${
          topBarHeight / lotiH
        }`
      );*/
    },
    cs(params) {
      return cs(params);
    },

  },
  mounted() {

    this.resizeEventHandler();
/*    var vm = this;

    animationDataMini().then(function (data) {

      var animation = lottie.loadAnimation({
        container: document.getElementById("mini-logo"),
        renderer: "svg",
        loop: false,
        autoplay: false,
        animationData: data,
        
      });

      animation.play();

    });

    animationData().then(function (data) {
      vm.animBigLogo = lottie.loadAnimation({
        container: document.getElementById("bm"),
        renderer: "svg", //svg
        loop: true,
        autoplay: false,
        animationData: data,
        //path: '../assets/animas/about-logo.json'
        //path: '../../public/assets/animas/about-logo.json'
        //path: 'http://localhost:8080/js/animas/about-logo.json'
      });
      // https://codepen.io/warddem/pen/gKZVJW
      // https://github.com/airbnb/lottie-web/issues/398
      //animation.playSegments([[0,130],[200,0]],true);

      setTimeout(() => {
        vm.animBigLogo.play();
      }, 6 * 1000);
    });
*/
  },
};
</script>


<style lang="scss" scoped>
@import "../modules/theme.scss";

.body-content {
  position: absolute;
  top: $menuHeight + 2%;
  height: 85%;
  overflow: hidden;
  width: 90%;
  left: 5%;
}
.body-content-menu {
  height: 15%;
  overflow: hidden;
}
.body-content-lozungs {
  height: 100%;
  overflow: hidden;
}
.menu-item {
  padding: 3px;
  top: 100px;
  border-radius: 0px 0px 8px 0px;
  border-right: 3px solid $color3;
  display: inline-block;
  margin: 3px;
  margin-left: 10px;
  height: 4vh;
  font-size: 2vh;
  color: $color2;
}
.menu-item:hover {
  cursor: pointer;
  border-right: 3px solid $color5;
  color: $color1;
  background: linear-gradient(
    90deg,
    rgba(2, 0, 36, 0) 0%,
    rgba(121, 9, 9, 0.2049020291710434) 66%,
    rgba(255, 0, 0, 0.1432773793110994) 100%
  );
}
.title-bg-move {
  opacity: 0.5;
  position: absolute;
  top: 1.6vh;
  border-radius: 10px 0px 10px 0px;
  border-right: 10px solid $color5;
  height: 5vh;
}
.contacts td {
  padding: 0px 30px 0px 0px;
}
.bc-left {
  position: absolute;
  opacity: 0.3;
  width: 100%;
  height: 100vh;
  transform: skew(-15deg);
  top: $menuHeight + 5%;
}
.org-figure {
  position: absolute;
  opacity: 0.3;
  width: 200%;
  height: $menuHeight;
  transform: skew(-45deg);
  border-radius: 30px 0px 0px 0px;
  top: -3px;
}
.org-background {
  opacity: 0.7;
  overflow: hidden;
  text-align: right;
  height: $menuHeight;
  position: absolute;
  top: 0rem;
  left: 0rem;
}
.org-background-1 {
  overflow: hidden;
  text-align: right;
  height: 1%;
  position: absolute;
  top: $menuHeight;
  left: 0rem;
}
.org-background-2 {
  overflow: hidden;
  text-align: right;
  height: 1%;
  position: absolute;
  top: $menuHeight + 1%;
  left: 0rem;
}
.org {
  white-space: nowrap;
  top: -3px;
  position: absolute;
}
.lozung {
  border-radius: 5px;
  padding: 10px;
  overflow: hidden;
  color: $color1;
  position: relative;
  height: 100%;
}
.lozung-title {
  height: 15%;
  overflow: hidden;
  font-size: 4vh;
}
.lozung-title-item {
  height: 80%;
  width: 100%;
  overflow: hidden;
  top: 0%;
  position: absolute;
  padding-left: 5%;
  padding-top: 1%;
  white-space: nowrap;
}
.lozung-body {
  height: 80%;
  overflow: hidden;
  font-size: 2vh;
}
.lozung-body-item {
  height: 90%;
  width: 100%;
  overflow: hidden;
  top: 10%;
  position: absolute;
  padding: 20px;
}
</style>