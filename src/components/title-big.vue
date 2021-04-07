<template>
  <!--div class="tile is-ancestor is-gapless">

    <div class="tile is-8 is-parent hero is-fullheight" style="background:green;height:110vh">
      <div class="tile is-child box1 hero-body">
        <p class="title container print" v-html="w(menu.title)"></p>
      </div>      
    </div>

    <div class="tile is-4 is-vertical is-parent" >
      <div class="tile is-child submenu-item1">
        <p class="container1" style="display: table-cell;">WWW</p>
      </div>       
      <div class="tile is-child submenu-item1" style="display: table;vertical-align: middle;margin: 2rem !important;" v-for="(sub, index) of submenu" :key="index">
        <p class="container1" style="display: table-cell;">{{sub.title}}</p>
      </div>      
    </div>

  </div-->
  <div class="hero" style="height:110vh;" ref="layer">
    <div class="hero-body" style="display: flex; align-items: flex-end !important;padding-right: 0px;">
      <div class="container" style="margin-right: 0px;">
        <div class="columns">
          <div class="column is-8" style="display: flex; align-items: flex-end !important;">
            <div v-html="w(menu.title)" class="menu"/>
          </div>
          <div class="column is-4">
            <div v-for="(sub, index) of submenu" :key="index" class="submenu-item">
              <div v-html="w(sub.title)"></div>
            </div>
          </div>
        </div>        
      </div>
    </div>
  </div>
</template>

<script>
import { w } from "../modules/theme.ts";
export default {
  props: {
    menu: null,
    submenu: null,

    /*titleText: { type: String, default: "TEXT" },
    titleSubText: { type: String, default: "TEXT" },
    offsetTop: { type: Number, default: 20 },
    offsetBottom: { type: Number, default: 20 },*/
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
      
      //imageTop: null, //фиксирование изображения

      visible: false,
    };
  }, 
  created() {
    //window.requestAnimationFrame(update);
    window.addEventListener("scroll", this.scrollEvent);
    window.addEventListener("resize", this.resizeEvent);
    console.log(this.submenu);
  },
  destroyed() {
    window.removeEventListener("scroll", this.scrollEvent);
    window.removeEventListener("resize", this.resizeEvent);
  },
  mounted(){
    this.update();
  },
  methods:{
    w: function(text){
      return w(text);
    }, 
    scrollEvent(){
      this.update();
    },
    resizeEvent() {
      this.update();
    },  
    
    update() {
      //console.log('update',this.anchor);
      var _intersectionWithWindow = this.intersectionWithWindow

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

      //this.imageTop = -rect.top-1+'px';
      
      //if (this.anchor!=null && this.top==null){
        //this.$emit('updateanchor',this.anchor.name);
      //}
      this.visible = this.intersectionWithWindow || this.intersectionWithWindowOffset;

      if (this.intersectionWithWindow!=_intersectionWithWindow){
        var minimum = 0;
        var maximum = 2;
        var randomnumber = Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
        if (randomnumber==0)
          document.body.style.backgroundImage = 'url("'+require('../assets/images/title-ungg-doneck-old.jpg')+'")';
        if (randomnumber==1)
          document.body.style.backgroundImage = 'url("'+require('../assets/images/title-ungg-doneck.jpg')+'")';
        if (randomnumber==2)
          document.body.style.backgroundImage = 'url("'+require('../assets/images/title-osn-refer.jpg')+'")';

        document.body.style.backgroundAttachment= 'fixed';
        document.body.style.backgroundRepeat= 'no-repeat'; 
        document.body.style.backgroundSize='cover';
        //var scale = (100-this.percentView)/100 + 1;
        //document.body.style.backgroundPosition='0% '+this.percentView+'%';//'0% 100%';//'left bottom';

        //console.log(document.body.style.backgroundImage);
      }

      if (this.visible)
        document.body.style.backgroundPosition='0% '+this.percentView+'%';
      //console.log(document.body.style.backgroundPosition);
    },    

  }  
};
</script>

<style lang="scss" scoped>
@import "../modules/theme.scss";

.hero{
  background: $gradient-ver-cl0-cl5;
  padding-bottom: 10vh;  
}

.menu{
  font-size: 4.5rem;
  color: white;
}

.submenu-item{
  //background: $gradient-gor-cl5-cl0;
  color: $color1;
  border: 1px solid $color1;
  border-left: 5px solid $color1;
  //border-top: 1px solid $color1;
  //border-right: 5px solid $color6;
  padding: 1rem 1rem;
  font-size: 1.7rem;
  //margin: 0.2rem;
  //padding: 1rem;
  //opacity: 0.5;
}
.submenu-item:hover{
  background:$color6-4;
  cursor: pointer;
}


.title-block1 {
  overflow: hidden;
  height: 110vh;
}
.hero-body1{
    align-items: flex-end !important;
    padding-bottom: 0px;
    padding-left: 0px;
    padding-right: 0px;
    .container{
        padding: 1rem;
        padding-bottom: 10vh;
        background: $gradient-ver-cl0-cl5;
        max-width: none;
    }
    .submenu{
      //background: red;
      height: 110vh;
      //margin-top: -20vh;;
      //margin: 1rem;
      //padding: 1rem;
      //padding-bottom: 10vh;
      margin-left: 0.1rem;
      margin-bottom: 0.1rem;
      margin-right: 0.3rem;
      width: 20rem;
      background: $gradient-ver-cl5-cl0;
      max-width: none;
      align-items: flex-end !important;
      display: flex;
    }
    /*.rows{
      display: flex;
      flex-direction: column;
    } */   
}
.title1{
    font-size: 12vh;
    color: white;
    padding-left: 3vw;
}
.subtitle1{
    font-size: 6vh;
    color: lightblue;
    padding-left: 3vw;
}
</style>