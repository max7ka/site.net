<template>
  <section :class="isSub?'layer-sub':'layer'" ref="layer" :style="{top: anchor.top+'px'}">
    <div class="layer-center-context">
      <!-- -{{ layerText }}- -->
      <div style="background: black;color:white">
        <div>intersectionWithWindow {{ intersectionWithWindow }}</div>
        <div>intersectionWithWindowTop {{ intersectionWithWindowTop }}</div>
        <div>
          intersectionWithWindowBottom {{ intersectionWithWindowBottom }}
        </div>
        <div>
          intersectionWithWindowOffset {{ intersectionWithWindowOffset }}
        </div>
        <div>
          intersectionWithWindowOffsetTop {{ intersectionWithWindowOffsetTop }}
        </div>
        <div>
          intersectionWithWindowOffsetBottom {{ intersectionWithWindowOffsetBottom }}
        </div>
        <div>percentView {{ percentView }}</div>
      </div>
    </div>

    <!--parallax fixed=true>
      <img :src="this.image" alt="very cool bg">
    </parallax-->

    <!--div class="layer-image" v-if="visible" :style="{transform: 'scale('+scale+','+scale+')', top: imageTop, backgroundImage : 'url(' + this.image + ')'}"></div-->
  </section>
</template>

<script>
//import Parallax from 'vue-parallaxy'
export default {
  components: {
    //Parallax
  },
  props: {
    layerText: { type: String, default: "TEXT" },
    offsetTop: { type: Number, default: 20 },
    offsetBottom: { type: Number, default: 20 },
    image: null,
    anchor: null,
    isSub: { type: Boolean, default: false },
  },
  created() {
    //window.requestAnimationFrame(update);
    window.addEventListener("scroll", this.scrollEventHandler);
    window.addEventListener("resize", this.resizeEventHandler);
  },
  destroyed() {
    window.removeEventListener("scroll", this.scrollEventHandler);
    window.removeEventListener("resize", this.resizeEventHandler);
  },
  mounted() {
    this.update();

    /*this.$watch(
      () => {return this.$refs.layer.getBoundingClientRect().top},
      (val) => {alert('App $watch $refs.counter.i: ' + val)}
    )*/
  },
  updated(){
    //this.update();
  },
  data() {
    return {
      intersectionWithWindow: false,
      intersectionWithWindowTop: false,
      intersectionWithWindowBottom: false,

      intersectionWithWindowOffset: false,
      intersectionWithWindowOffsetTop: false,
      intersectionWithWindowOffsetBottom: false,

      percentView: 0,
      
      imageTop: null, //фиксирование изображения
      top: null,
      scale: 1,
      scaleMax: 1.5,

      visible: false,

      layerTop: 0,
    };
  },
  watch: {
    /*anchor_: function (val) {
      this.anchor = val;
      this.update();
    },*/
    /*layerTop: function (val1,val2) {
      //this.anchor = val;
      this.update();
      //console.log('layerTop=',val1,val2);
    },*/
  },  
  computed:{
    /*layerTop() {
      if (this.$refs.layer!=null)
        return this.$refs.layer.getBoundingClientRect().top;
      else
        return 0;
    }*/
  },
  methods: {
    updatet(){
        setTimeout(() => {
          this.update();
        }, 1);
    },
    update() {
      //console.log('update',this.anchor);

      var rect = this.$refs.layer.getBoundingClientRect();
      //var rect_top = this.layerTop;

      var height = window.innerHeight;

      if (rect.top <= 0) this.percentView = (height+rect.top)*100/height;
      else if (rect.top>0 && rect.top<=height) this.percentView = (height-rect.top)*100/height;
      else this.percentView=0;
      if (this.percentView<0) this.percentView=0;

      //var scale = (100-this.percentView)/100 + 1;
      //this.scale = scale;//<this.scaleMax?scale:this.scaleMax

      this.intersectionWithWindowTop = rect.top <= 0 && rect.top + height >= 0;
      this.intersectionWithWindowBottom =
        rect.top <= height && rect.top + rect.height >= height;
      this.intersectionWithWindow =
        this.intersectionWithWindowTop || this.intersectionWithWindowBottom;

      // отсут в процентах
      var oTop = (height / 100) * this.offsetTop;
      var oBottom = height - (height / 100) * this.offsetBottom;
      this.intersectionWithWindowOffsetTop =
        rect.top <= oTop && rect.top + height >= oTop;
      this.intersectionWithWindowOffsetBottom =
        rect.top <= oBottom && rect.top + rect.height >= oBottom;
      this.intersectionWithWindowOffset =
        this.intersectionWithWindowOffsetTop ||
        this.intersectionWithWindowOffsetBottom;

      this.imageTop = -rect.top-1+'px';
      
      if (this.anchor!=null && this.top==null){
        //this.$emit('updateanchor',this.anchor.name);
      }
      this.visible = this.intersectionWithWindow || this.intersectionWithWindowOffset;
    },
    scrollEventHandler(){
      //this.layerTop = this.$refs.layer.getBoundingClientRect().top;
      //console.log('this.layerTop=',this.layerTop);
      //this.scrollPosition = 
      this.update();
    },
    resizeEventHandler() {
      //this.layerTop = this.$refs.layer.getBoundingClientRect().top;
      this.update();
    },
  },
};
</script>

<style lang="scss" scoped>
.layer {
  height: 110vh;
  width: 100vw;
  //border: 1px solid black;
  overflow: hidden;
  position: absolute;
  z-index: 0;
}
.layer-sub{
  height: 1px;
  width: 100vw;
  //border: 1px solid black;
  overflow: hidden;
  position: absolute;
  z-index: 0;    
}
.layer-center-context {
  z-index: 2;
  position: absolute;
  font-size: 20vh;
  margin: auto;
  margin-left: 40%;
  margin-top: 20%;
  //left: 50vw;
  //top: 50vh;  
  div {
    font-size: 1.5vh;
  }
}
.layer-image{
  z-index: 1;
  position: absolute;
  /*position: absolute;
  object-fit: cover;
  width: 100%;*/
  width: 100vw;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: left bottom;  
  height: 100vh;
  //opacity: 0.9;
}
</style>