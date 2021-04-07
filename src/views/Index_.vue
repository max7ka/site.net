<template>
  <div>


    <div style="position:fixed;z-index:500;top:1px;left:50px">
      <div v-if="isMobile()">Мобильная версия браузера</div>
      <div v-else>Десктопная версия браузера</div>
    </div>

    <div class="p-6" :style="'height:'+constantsValue.start+'vh'"
      v-on:mouseenter="showMapViewer(null)"
    >
    
      <div style="height:50vh"></div>

      <!--figure class="image is-16by9">
        <iframe class="has-ratio" width="640" height="360" :src="require('../assets/videos/87year.mp4')" frameborder="0" allowfullscreen></iframe>
      </figure--> <!-- @play="your_method"-->

    </div>

    <div id="skrollr-body"
      class="figure"
      :data-_start--100p="cs({    mt: '0vh',ml: '30vw', br: '100vw',  w: '40vw' })+ 'box-shadow: inset 3px 3px 10px 0 rgba(0,0,0,1);'"
      :data-_start-0p="cs({  mt: '0vh',ml: '-100vw', br: '0vw',  w: '300vw',})+'box-shadow: inset 3px 3px 10px 0 rgba(0,0,0,0);'">

      <div
        class="content"
        id="content"
        qv-bind="contentAttr"
        :data-_start--100p="cs({    ml:'-30vw' })"
        :data-_start-0p="cs({  ml:'100vw' })"        
      >
        <div class="content-data" id="data-1">
          <div class="pages">
            <div
              class="page"
              :id="`page-${index}`"
              :page="index"
              v-for="(p, index) in pages"
              :key="`page-${index}`"
              v-bind="p.attr"
              :style="p.style"
              v-on:mouseenter="pageMouseOn(index)"
              v-on:mouseleave="pageMouseOut(index)">

              <div class="container print">
                <InfoStamp/>
                <div 
                  :class="p.topImage==null?'page-title':'page-title-width-image'"
                  :style="{backgroundPosition: 'bottom -0px center', backgroundRepeat: 'no-repeat',backgroundSize: 'cover', backgroundImage: p.topImage!=null?'url(' + require('../assets/images/'+p.topImage) + ')':'' }"
                  v-bind="p.topAttr"
                >
                  <h1 class="title">
                    <div style="float: right;" class="print-no">
                      <b-tooltip label="Печать" position="is-bottom" type="is-light" style="margin-top: auto; margin-bottom: auto;">
                        <b-button style="max-height:8vh;max-width:8vh;margin-left:5px" @click="print(`page-${index}`)"><b-icon icon="printer"></b-icon></b-button>
                      </b-tooltip>
                    </div>
                    <div :page="index" :id="`page-title-${index}`" v-html="w(p.title,index)"></div>
                  </h1>
                  <section class="hero is-large">
                    <div class="hero-body">
                      <!--div class="container">
                        <h1 class="title">
                          {{ p.title }}
                        </h1>
                        <h2 class="subtitle"></h2>
                      </div!-->
                    </div>
                  </section>
                </div>

                <div :page="index" :id="`page-context-${index}`">
                  <Referencii v-if="p.component=='referencii'" 
                  v-on:onupdate="update" 
                  v-on:onshowMapViewer="showMapViewer"
                  />
                  <div v-else class="page-text has-text-justified">BEGIN!!! <lorem add="10p" /> END!!!</div>
                </div>

                <!-- хвост страницы внутренний-->
                <!--div style="height:50vh"></div-->                    

              </div>
            </div>
                         
          </div>
        </div>
      </div>    

    </div>

    <div v-bind="titleAttr" class="titleTopText">{{titleText}}</div>    

    <div
      class="top-menu"
      qdata-_start-0p="cs({ t: '80vh',o:0 })+',display:none'"
      qdata-_start-80p="cs({ t: '60vh' })+',display:block'"
      qdata-_start-95p="cs({ t: '-3vh' })"
      qdata-_start-93p="cs({ t: '-1vh',o:0 })"
      qdata-_start-100p="cs({t: 0,o:1})"
      :data-_start-0p="cs({    ts: 1, })"
      :data-_start-100p="cs({  ts: 1, })"
    >
      <div v-on:mouseenter="showMapViewer(null)">
            <vsm-menu
                :menu="menu"
                :base-width="380"
                :base-height="400"
                :screen-offset="10"
                element="header"
                handler="hover"
                @open-dropdown="onMenuOpenDropdown"
                @close-dropdown="onMenuCloseDropdown"
              >
                <template #default="{ item }">
                  <div class="menu-content">
                    <div class="">
                      <div class="menu-items">
                        <div class="menu-item" 
                            v-for="(sub, index) in item.items"
                            :key="index" :class="sub.class"
                            :id="'mitem-'+index">
                            <div>{{ sub.title }}</div>
                            <div class="menu-item-description">{{ sub.description }}</div>
                        </div>            
                      </div>
                    </div>
                  </div>
                </template>
                <template #before-nav>
                  <li class="vsm-section logo-section">
                    <img
                      :src="require('../assets/logo.png')"
                      alt="Logo"
                    >
                  </li>
                </template>
                <!--template #title="data">
                  item2: {{ data.item.title }}
                </template-->
                <template #after-nav>
                  <!--li class="vsm-section vsm-mob-hide">
                    <button>My Button</button>
                  </li>
                  <vsm-mob>Mobile Content</vsm-mob-->
                  <li class="vsm-section" style="margin-right:1vw">
                  <b-field style="margin-bottom: 0rem;">
                      <b-input placeholder="Найти..." style="min-width: 20vw;"
                          type="search"
                          icon="magnify"
                          v-model="searchText">
                      </b-input>
                      <p class="control">
                          <button class="button is-dark" @click="searchClick();">Найти</button>
                      </p>
                  </b-field>          

                  <b-field>
                    <b-tooltip label="На карте" position="is-bottom" type="is-light">
                      <b-button style="max-height:8vh;max-width:8vh;margin-left:5px" @click="isModalMap= !isModalMap"><b-icon icon="map-marker"></b-icon></b-button>
                    </b-tooltip>
                    <b-tooltip  label="Контакты" position="is-bottom" type="is-light">
                      <b-button style="max-height:8vh;max-width:8vh;margin-left:5px" @click="isModalContacts = !isModalContacts"><b-icon icon="phone"></b-icon></b-button>
                    </b-tooltip>
                    <b-tooltip label="Меню сайта" position="is-bottom" type="is-light">
                      <b-button @click="menuOpen = true" style="max-height:8vh;max-width:8vh;margin-left:5px"><b-icon icon="menu"></b-icon></b-button>
                    </b-tooltip>
                  </b-field>
                  </li>
                </template>
            </vsm-menu> 
      </div>
      <div class="mapViewer" id="mapViewer" v-on:onshowMapViewer="showMapViewer">
        <yandex-map 
          :coords="mapViewer.coords"
          :zoom="10" 
          @click="onMapClick"
          style="padding:10px;height:100%;width:100%"
          :controls="['fullscreenControl','zoomControl']"
          :scroll-zoom=false
        >
          <ymap-marker v-show="mapViewer.markergeo.visible==true"
            :marker-type="mapViewer.markergeo.type"
            :coords="mapViewer.markergeo.coords" 
            marker-id="r1" 
            :marker-stroke="mapViewer.markerStroke"
          />                  

          <ymap-marker 
            :marker-type="mapViewer.marker.type"
            :coords="mapViewer.marker.coords" 
            marker-id="r2" 
            :hint-content="mapViewer.title" 
            :icon="mapViewer.markerIcon"
            :marker-stroke="mapViewer.markerStroke"
          />

        </yandex-map>
        <b-tooltip label="Закрыть" position="is-bottom" type="is-light">
          <b-button style="height: 30px;width: 30px;left: 20px;top: -87vh;" @click="hideMapViewer()"><b-icon icon="close"></b-icon></b-button>
        </b-tooltip>        
      </div>

    </div>

    <!-- side bar menu-->
    <section>
        <b-sidebar
          type="is-light"
          :fullheight="true"
          :fullwidth="false"
          :overlay="true"
          :right="true"
          v-model="menuOpen"
        >
        <div class="p-1">
        <img
          :src="require('../assets/logo.png')"
          alt="ЮЖНИИГИПРОГАЗ" style="width:10vh;margin-left: auto; margin-right: auto; display: block;"
        />
        <b-menu>
          <b-menu-list label="Содержание">
            <b-menu-item icon="information-outline" label="Информация"></b-menu-item>
            <b-menu-item icon="settings">
              <template slot="label" slot-scope="props">
                Разделы
                <b-icon class="is-pulled-right" :icon="props.expanded ? 'menu-down' : 'menu-up'"></b-icon>
              </template>
              <b-menu-item icon="page-next-outline" label="Начало" @click="goToScroll(0)"
              ></b-menu-item>              
              <b-menu-item icon="page-next-outline" :label="m.title"
                  v-for="(m, index) in pages"
                  :key="`menu-${index}`" @click="goToScroll(m.topScroll,getHeightPx(constantsValue.start))"
              ></b-menu-item>
              <!--b-menu-item icon="account" label="Users"></b-menu-item-->
              <!--b-menu-item icon="cellphone-link">
                <template slot="label">
                  Devices
                  <b-dropdown aria-role="list" class="is-pulled-right" position="is-bottom-left">
                    <b-icon icon="dots-vertical" slot="trigger"></b-icon>
                    <b-dropdown-item aria-role="listitem">Action</b-dropdown-item>
                    <b-dropdown-item aria-role="listitem">Another action</b-dropdown-item>
                    <b-dropdown-item aria-role="listitem">Something else</b-dropdown-item>
                  </b-dropdown>
                </template>
              </b-menu-item-->
              <!--b-menu-item icon="cash-multiple" label="Payments" disabled></b-menu-item-->
            </b-menu-item>
            <!--b-menu-item icon="account" label="My Account">
              <b-menu-item label="Account data"></b-menu-item>
              <b-menu-item label="Addresses"></b-menu-item>
            </b-menu-item-->
          </b-menu-list>
          <!--b-menu-list>
            <b-menu-item label="Expo" icon="link" tag="router-link" target="_blank" to="/expo"></b-menu-item>
          </b-menu-list>
          <b-menu-list label="Actions">
            <b-menu-item label="Logout"></b-menu-item>
          </b-menu-list-->
        </b-menu>
        </div>
        </b-sidebar>
    </section>

    <!-- side bar search-->
    <section>
        <b-sidebar
          type="is-light"
          :fullheight="true"
          :fullwidth="false"
          :overlay="false"
          :right="true"
          v-model="searchOpen"
        >
        <div class="p-1">
          <b-menu>
            <b-menu-list>
              <b-menu-item icon="settings" expanded>
                <template slot="label" slot-scope="props">
                  Поиск
                  <b-icon class="is-pulled-right" :icon="props.expanded ? 'menu-down' : 'menu-up'"></b-icon>
                </template>
                <b-menu-item icon="page-next-outline" :label="s.title"
                    v-for="(s, index) in searchs"
                    :key="`search-${index}`" @click="searchGo(index)"
                ></b-menu-item>
              </b-menu-item>
            </b-menu-list>
          </b-menu>
        </div>
        </b-sidebar>
    </section>    

    <!--b-navbar class="top-menu"
    :data-0p="cs({ t: '80vh',o:0 })"
      :data-80p="cs({ t: '60vh' })"
      :data-95p="cs({ t: '-3vh' })"
      :data-93p="cs({ t: '-1vh',o:0 })"
      :data-100p="cs({t: 0,o:1})"
    >
        <template slot="brand">

        </template>
        <template slot="start">

        </template>

        <template slot="end">
            <b-navbar-dropdown label="Содержание">
                <b-navbar-item
                  v-for="(m, index) in pages"
                  :key="`menu-${index}`" @click="goToScroll(m.topScroll)"
                >
                    {{m.title}}
                </b-navbar-item>
            </b-navbar-dropdown>

        </template>
    </b-navbar-->

    <div class="pad-left" id="pad-left"></div>
    <div class="pad-right" id="pad-right"></div>

    <div
      class="button-left"
      id="button-left"
      @click="goBackScroll(getHeightPx(constantsValue.start))"
      v-if="scrollLeft != -1"
    >
      <span class="vert-text">{{ titleLeft }}</span>
    </div>
    <div
      class="button-right"
      id="button-right"
      @click="goNextScroll(getHeightPx(constantsValue.start))"
      v-if="scrollRight != -1"
    >
      <span class="vert-text">{{ titleRight }}</span>
    </div>

    <div class="progress-value">{{ scrollTop }}</div>

    <!-- прогресс контрол-->
    <div
      class="progress-control"
      data-0="width:0%;background:hsl(200, 100%, 50%);"
      data-end="width:100%;background:hsl(920, 100%, 50%);"
    ></div>

    <!-- иконки -->
    <div style="position:fixed;bottom:45vh;z-index:105;"
          :data-0="'color:rgb(100, 100, 150);'+cs({b:'15vh',ts:1,l:'1vw'})"
          :data-_start-100="'color:rgb(200, 200, 200);'+cs({b:'3vh',ts:1,l:'1vw'})"
    >
      <b-icon
          pack="mdi"
          icon="swap-vertical-bold"
          size="is-large"
          >
      </b-icon>
      <div>
      <b-icon
          pack="mdi"
          icon="mouse"
          size="is-large"
          >
      </b-icon>
      </div>
    </div>

    
    <!--transition
      name="flip"
      enter-active-class="flipInX"
      leave-active-class="flipOutY"
    >
      <div v-if="viewModalContacts" style="width:300px;height:300px;background:red">
        <p>hello</p>
      </div>
    </transition-->


    <b-modal v-model="isModalContacts" :width="640" scroll="keep" style="z-index:200">
        <div class="card">
            <div class="card-image">
                <figure class="image is-4by3">
                    <img :src="require('../assets/images/title-ungg-doneck-old.jpg')" alt="Image">
                </figure>
            </div>
            <div class="card-content">
                <div class="media">
                    <!--div class="media-left">
                        <figure class="image is-48x48">
                            <img src="/static/img/placeholder-1280x960.png" alt="Image">
                        </figure>
                    </div-->
                    <div class="media-content">
                        <p class="title is-4">Контактная информация</p>
                    </div>
                </div>

                <div class="content">
                  <table>
                    <tr>
                      <td>
                        <b-icon
                          pack="mdi"
                          icon="map-marker"
                          size="is-medium"
                          type="is-info"
                        />
                      </td>
                      <td>Адрес</td>
                      <td>283004, г. Донецr, ул. Артема, 169-Г</td>
                    </tr>
                    <tr>
                      <td>
                        <b-icon
                          pack="mdi"
                          icon="phone-in-talk"
                          size="is-medium"
                          type="is-info"
                        />
                      </td>
                      <td>Тел</td>
                      <td>
                        +380 (62) 206-53-75<br />+380 (62) 206-64-20<br />+380 (62)
                        206-53-74
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <b-icon
                          pack="mdi"
                          icon="fax"
                          size="is-medium"
                          type="is-info"
                        />
                      </td>
                      <td>Факс</td>
                      <td>ex@ungg.org (общий)</td>
                    </tr>
                    <tr>
                      <td>
                        <b-icon
                          pack="mdi"
                          icon="email"
                          size="is-medium"
                          type="is-info"
                        />
                      </td>
                      <td>E-mail</td>
                      <td>root@ungg.org (приёмная)</td>
                    </tr>
                  </table>                    
                </div>
            </div>
        </div>
    </b-modal>

    <b-modal v-model="isModalMap" has-modal-card full-screen scroll="keep" style="z-index:200">
        <div class="modal-card" style="width: auto">
          <header class="modal-card-head">
              <p class="modal-card-title">На карте</p>
              <button class="button" type="button" @click="isModalMap=false">Закрыть</button>
          </header>
          <section class="modal-card-body">
              <!--b-field label="Email">
                  <b-input
                      type="email"
                      :value="email"
                      placeholder="Your email"
                      required>
                  </b-input>
              </b-field>

              <b-field label="Password">
                  <b-input
                      type="password"
                      :value="password"
                      password-reveal
                      placeholder="Your password"
                      required>
                  </b-input>
              </b-field>

              <b-checkbox>Remember me</b-checkbox-->
              <div class="columns" style="height: 100%;">
                <div class="column is-2" style="display:flex;flex-direction: column;">
                  <figure class="image is-256x256">
                      <img :src="require('../assets/images/title-ungg-doneck-old.jpg')" alt="Image">
                  </figure>
                  <div style="overflow: hidden; overflow-y: auto;">
                    <lorem add="3p"/>
                  </div>
                </div>
                <div class="column is-10" style="display: flex; flex-direction: column;">
                  <yandex-map 
                      :coords="coords"
                      :zoom="16" 
                      @click="onMapClick"
                      style="height: 100%;"
                      :controls="['fullscreenControl','zoomControl']"
                    >
                      <ymap-marker 
                        :coords="coords" 
                        marker-id="m1" 
                        hint-content="АО 'ЮЖНИИГИПРОГАЗ'" 
                        :icon="markerIcon"
                        :balloon-template="mapMarkerBalloonTemplate"
                      />
                    </yandex-map>
                </div>
              </div>
          </section>
          <!--footer class="modal-card-foot">
              <button class="button" type="button" @click="isModalMap=false">Закрыть</button>
          </footer-->
        </div>
    </b-modal>    

  </div>
</template>

<script>
//   https://stackoverflow.com/questions/21414925/why-doesnt-inset-box-shadow-work-over-images

//import About from "@/components/about.vue";

import skrollr from "skrollr";

import Lorem from "vue-lorem-ipsum";

import { cs,w } from "../modules/theme.ts";
//import pages_json from "../assets/jsons/pages.json";

import InfoStamp from "../components/infoshtamp.vue";
import Referencii from "../components/referencii.vue";

export default {
  components: {
    Lorem,
    InfoStamp,
    Referencii
    //About,
  },

  /*afterRouteEnter(to, from, next) {
    next((vm) => {
      vm.test();
    });
  },*/
  created() {

    this.loguser();

    window.addEventListener("scroll", this.scrollEventHandler);
    window.addEventListener("resize", this.resizeEventHandler);
    window.addEventListener("touchmove", this.touchmoveEventHandler);
    window.addEventListener("click", this.clickEventHandler);

    /*console.log("created");
    if (typeof window._skrollr == "undefined") {
      window._skrollr = skrollr.init();
      this.resizeEventHandler();
    } */
  },
  destroyed() {
    window.removeEventListener("scroll", this.scrollEventHandler);
    window.removeEventListener("resize", this.resizeEventHandler);
    window.removeEventListener("touchmove", this.touchmoveEventHandler);
    window.removeEventListener("click", this.clickEventHandler);
  },
  beforeUpdate() {
    //console.log("beforeUpdate");
    /*if (this.updateSkrollr == true){
        this.updateSkrollr = false;
        setTimeout(() => {
          window._skrollr.refresh();
          console.log("window._skrollr.refresh");
        }, 1000);
      }*/
  },
  updated() {
    //console.log("updated");
  },
  /* 
  if (typeof window._skrollr != "undefined") {
        scrollTop = window._skrollr.getScrollTop();
        window._skrollr.destroy();
      }
  */
  data() {
    return {
      //isImageModalActive: false,
      //isCardModalActive: false,
      //randomKey: 0,
      /*showAbout: false,
      showWorks: false,
      showRabots: false,*/
      /*RabotsModalDetails: false,
      RabotsModalDetailsCurRab: null,*/
      //compKey: 0,//для обновления компонентов и последующего skrolr.refresh
      searchText: "",
      searchs:[],
      searchOpen: false,
      menu: [
        /*{
          // display menu item (or override title slot)
          title: 'News',
          // now this is not a link, but a menu item where there is a dropdown
          dropdown: 'news',
          // don't want a button element?
          element: 'span',
          // menu item can accept all attributes
          attributes: {
            // I want more classes! No problem
            // string, array, object, not matter
            //class: ['my-class1', { 'my-class2': true }],
            // Custom attributes
            //'data-big': 'yes'
          },
          // add some events?
          listeners: {
            // all possible native events
            mouseover: (evt) => {
              console.log('news hover', evt)
            }
          },
          // just extra properties in the object
          new_section: false,
        },*/
        {
          title: 'Главная',
          name: 'main',
          listeners: {
            click: (e) =>{
              console.log('click',e);
            }
          }
        },         
        {
          title: 'О «ЮЖНИИГИПРОГАЗе»',
          name: 'abouteus',
          dropdown: 'abouteus',
          element: 'span',
          attributes: {
          },
          listeners: {
          },
          items:[
            {name:'proizvod',title:'Производство', description:'', class:'menu-item'},
                {name:'p-str',title:'cтруктура',description:'', class:'menu-item-sub'},
                {name:'p-vid',title:'виды деятельности',description:'', class:'menu-item-sub'},
                {name:'p-lic',title:'лицензии и сертификаты',description:'', class:'menu-item-sub'},
                {name:'p-prog',title:'программное обеспечение',description:'', class:'menu-item-sub'},
            {name:'strategi',title:'Стратегия', description:'', class:'menu-item'},
            {name:'otzivi',title:'Отзывы', description:'', class:'menu-item'},
            {name:'rucovod',title:'Руководство', description:'', class:'menu-item'},
            {name:'history',title:'История', description:'', class:'menu-item'},
          ],
          //image : require('../assets/images/title-ungg-doneck.jpg'),
        },        
        {
          title: 'Проекты',
          name: 'proects',
          dropdown: 'proects',
          element: 'span',
          attributes: {
          },
          listeners: {
          },
          items:[
            {name:'p-mestor',title:'Месторождения', description:'', class:'menu-item'},
            {name:'p-magistr',title:'Магистральный газопроводный транспорт', description:'', class:'menu-item'},
            {name:'p-zavod',title:'Заводы по переработке природного газа', description:'', class:'menu-item'},
            {name:'p-cpg',title:'СПГ', description:'',},
          ],
          //image : require('../assets/images/title-osn-refer.jpg'),
        },            
        {
          title: 'В прессе',
          name: 'inpress',
          dropdown: 'inpress',
          element: 'span',
          attributes: {
          },
          listeners: {
          },
          items:[
            {name:'sobit',title:'События', description:'', class:'menu-item'},
            {name:'jurnal',title:'Журналы', description:'', class:'menu-item'},
            {name:'media',title:'Медиатека', description:'', class:'menu-item'},
          ],
          //image : require('../assets/images/title-ungg-doneck-old.jpg'),
        },        
        {
          title: 'Контактная информация',
          name: 'contact',
          dropdown: 'contact',
          element: 'span',
          attributes: {
          },
          listeners: {
          },
          items:[
            {name:'contorg',title:'Контактная информация организаций', description:'', class:'menu-item'},
            {name:'rucovod',title:'Руководство', description:'', class:'menu-item'},
            {name:'message',title:'Оcтавить сообщение', description:'', class:'menu-item'},
          ],
          //image : require('../assets/images/title-ungg-doneck-old.jpg'),
        },          
        /*{
          title: 'External Link',
          attributes: {
            href: 'https://github.com/Alexeykhr/vue-stripe-menu',
            target: '_blank'
          }
        }*/
      ],      
      mapViewer:{
        //show:false,
        title: "",
        attr: null,
        coords: [10,10],
        marker:{
          coords : [10,10],
          type : 'placemark'
        },
        markergeo:{
          coords : [],
          type : 'placemark',
          visible : false,
        },
        markerStroke:{
          color: '#FF0000', 
          opacity: 1, 
          width: 10, 
          //style: ''
        },
        markerIcon: {
          layout: 'default#imageWithContent',
          imageHref: require('../assets/logo.png'),
          imageSize: [50, 50],
          imageOffset: [0, 0],
          content: '',
          contentOffset: [-80, 60],
          contentLayout: '<div style="background: green; width: 200px; color: #FFFFFF; font-weight: bold; border-radius: 5px; padding: 3px">$[properties.iconContent]</div>',
        },
        /*markerUnggIcon: {
          layout: 'default#imageWithContent',
          imageHref: require('../assets/logo.png'),
          imageSize: [50, 50],
          imageOffset: [0, 0],
          content: '',
          contentOffset: [-80, 60],
          contentLayout: '<div style="background: green; width: 200px; color: #FFFFFF; font-weight: bold; border-radius: 5px; padding: 3px">$[properties.iconContent]</div>',
        }   */        
      },
      coords: [48.038344, 37.783213],
      markerIcon: {
        layout: 'default#imageWithContent',
        imageHref: require('../assets/logo.png'),
        imageSize: [50, 50],
        imageOffset: [0, 0],
        content: 'АО "ЮЖНИИГИПРОГАЗ"',
        contentOffset: [-80, 60],
        contentLayout: '<div style="background: blue; width: 200px; color: #FFFFFF; font-weight: bold; border-radius: 5px; padding: 3px">$[properties.iconContent]</div>'
      },      
      isModalContacts: false,
      isModalMap: false,
      constants: {
          start: "300p", // момент когда начинается прокрутка страниц
      },
      constantsValue: {
          start: 300,
      },      
      menuOpen:false,
      menuHeight: 7, // в vh
      updateSkrollr: false,
      scrollTop: 0,
      titleLeft: "",
      titleRight: "",
      scrollLeft: -1,
      scrollRight: -1,
      contentAttr: {},
      titleAttr: {},
      titleText: "",
      //attr: [],
      //attrPageStyle: [],
      pages: [
        { title: "Основные референции", attr: {}, style: {}, topScroll: 0, topAttr:null, topImage: "title-osn-refer.jpg", component: "referencii"},
        { title: "Виды работ", attr: {}, style: {}, topScroll: 0, topAttr:null,topImage:"title-ungg-doneck.jpg", component: "" },
        { title: "Контактная информация ", attr: {}, style: {}, topScroll: 0, topAttr:null,topImage:"title-ungg-doneck-old.jpg", component: "" },
        { title: "О нас", attr: {}, style: {}, topScroll: 0, topAttr:null,topImage:"title-ungg-doneck.jpg", component: "" },
        { title: "page 5", attr: {}, style: {}, topScroll: 0, topAttr:null,topImage:null, component: "" },
        { title: "page 6", attr: {}, style: {}, topScroll: 0, topAttr:null,topImage:null, component: "" },
        { title: "page 7", attr: {}, style: {}, topScroll: 0, topAttr:null,topImage:null, component: "" },
        { title: "page 8", attr: {}, style: {}, topScroll: 0, topAttr:null,topImage:null, component: "" },
        { title: "page 9", attr: {}, style: {}, topScroll: 0, topAttr:null,topImage:null, component: "" },
        { title: "page 10", attr: {}, style: {}, topScroll: 0, topAttr:null,topImage:null, component: "" },
        { title: "page 11", attr: {}, style: {}, topScroll: 0, topAttr:null,topImage:null, component: "" },
        { title: "page 12", attr: {}, style: {}, topScroll: 0, topAttr:null,topImage:null, component: "" },
        { title: "page 13", attr: {}, style: {}, topScroll: 0, topAttr:null,topImage:null, component: "" },
        { title: "page 14", attr: {}, style: {}, topScroll: 0, topAttr:null,topImage:null, component: "" },
        { title: "page 15", attr: {}, style: {}, topScroll: 0, topAttr:null,topImage:null, component: "" },
      ],
    };
  },
  computed: {
    mapMarkerBalloonTemplate() {
      return `
        <img src="${require('../assets/images/title-ungg-doneck.jpg')}" style="width:300px;height:300px"></br>
        <h1>ОА "ЮЖНИИГИПРОГАЗ"</h1>
        <p>г. Донецк, ул. Артема, д. 169-г</p>
      `
    }    
  },
  watch: {},
  mounted() {
    console.log("mounted");
    //var ismob = this.isMobile();
    if (typeof window._skrollr == "undefined") {
      window._skrollr = skrollr.init({
        constants: this.constants,
        forceHeight: false,//(!ismob?true:false),
        smoothScrolling: false
      });
      this.resizeEventHandler();
      //this.showInButtonsTitlePageAndTopTitle();
    }

    this.showMapViewer(null); 
    /*this.showMapViewer({
            left: 0,
            top: 0,
            width: 20,
            height: 20,
            title: '0',
            show: true,
            position: "ref-x",
            coords: [20,20],
            marker: { coords : [20,20], type : 'placemark' },
    });*/         
  },
  methods: {
    // найти текст
    w: function(text){
      return w(text);
    },  
    searchGo(index){
      var se = this.searchs[index];
      this.goToScroll(se.top);
    },
    searchClick(){

      /*var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      console.log("scrollTop=",scrollTop);
      for (let index = 0; index < this.pages.length; index++) {
        //const page = this.pages[index];
        var pageo = document.getElementById("page-"+index);
        console.log(index,'page-scrollTop=',pageo.scrollTop);
      }*/

        this.searchs.forEach(se => {
          se.word.style.background=se.wordBg;
          se.word.style.color=se.wordColor;
        });

        this.searchs=[];

        var s = this.searchText.toUpperCase().trim();
        if (s.length>0){
          //console.log("searchText",s);
          var words = document.getElementsByClassName("word");
          var top =0;
          words.forEach(word => {
            var text = word.innerText.toUpperCase();
            var indexFind = text.indexOf(s);
            if (indexFind>=0){
              top = window._skrollr.relativeToAbsolute(word, 'center', 'bottom');
              this.searchs.push({title:text,top:top, word: word, wordBg:word.style.background, wordColor:word.style.color});
              word.style.background="red";
              word.style.color="white";
            }
          });
          //this.goToScroll(top);
          //console.log(pause);
        }

        console.log(this.searchs);
        this.searchOpen=true;

      /*setTimeout(() => {
      }, 1000);            */
    },
    onMenuClick(){

    },
    onMenuOpenDropdown() {
      console.log('onOpenDropdown')
    },
    onMenuCloseDropdown() {
      console.log('onCloseDropdown')
    },    
    isMobile() {
      if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        return true
      } else {
        return false
      }
    },    
    pageMouseOn(index){
      if (index>=0){
        //console.log("++++++++++++++++++++pageMouseOn(index) = "+index);
        if(this.pages[index].component=="referencii"){
          //this.mapViewer.show = true;
          //console.log("------------------------- this.mapViewer.show "+this.mapViewer.show);
        }else{
          //var object = document.getElementById("mapViewer");
          //object.style.display = "none";  
          //object.style.right = "-200vw";      
          this.showMapViewer(null);
        }
      }else{
        this.showMapViewer(null);
      }
    },
    pageMouseOut(index){
      if (index>=0){
        //console.log("++++++++++++++++++++pageMouseOut(index) = "+index);
        if(this.pages[index].component!="referencii"){
          //this.mapViewer.show = false;
          //console.log("++++++++++++++++++++pageMouseOut(index) clase referencii = "+index);
          //var object = document.getElementById("mapViewer");
          //object.style.display = "none";
          //object.style.right = "-200vw";
          this.showMapViewer(null);
        }
      } else{
        this.showMapViewer(null);
      }
    },
    showMapViewer(params){
      var object = document.getElementById("mapViewer");

      if (params==null){
        // ИНИЦИАЛИЗАЦИЯ
        object.style.right = "-200vw";
        params= {
            left: 0,
            top: 0,
            width: 10,
            height: 10,
            title: '0',
            show: true,
            position: "ref-x",
            coords: [0,0],
            marker: { coords : [1,1], type : 'placemark' },
            markergeo: { coords : [1,1], type : 'placemark', visible:false },
        }
      }else{
        //object.style.width = "43%";
        object.style.right = "5vw";
      }

      this.mapViewer.marker.type = 'placemark';
      this.mapViewer.marker.coords = params.coords;
      this.mapViewer.markerIcon.content= params.title;

      if (params.marker!=null){
        this.mapViewer.markergeo.type = params.marker.type;
        this.mapViewer.markergeo.coords = params.marker.coords;
        this.mapViewer.markergeo.visible = true;
      } else{
        this.mapViewer.markergeo.type = 'placemark';
        this.mapViewer.markergeo.coords = [1,1];
        this.mapViewer.markergeo.visible = false;
      }
      
      this.mapViewer.title = params.title;
      this.mapViewer.coords = params.coords;
      
      object.style.display = params.show?"block":"none";
    },
    hideMapViewer(){
      this.showMapViewer(null);
    },
    goToMap(idCoord){
      if (idCoord==1){
        this.coords = [60, 37.783213];
      }
    },
    onMapClick(e) {
      var coords = e.get('coords');
      console.log(coords);
    },    
    print (id) {
      this.$htmlToPaper(id);
    },    
    loguser() {
      this.axios
        .get("http://ugnii.ungg.net/api/log.php")
        .then((response) => {
          //this.info = response;
          console.log(response);
        });
    },    
    showInButtonsTitlePageAndTopTitle: function () {
      var scrollTop = window._skrollr.getScrollTop()-this.getHeightPx(this.constantsValue.start);
      var page1 = null;
      var page2 = null;
      for (let index = 0; index < this.pages.length; index++) {
        const page = this.pages[index];
        if (page.topScroll < scrollTop - 5) {
          if (page1 == null) page1 = page;
          else if (page.topScroll > page1.topScroll) page1 = page;
        }
        if (page.topScroll > scrollTop + 5) {
          if (page2 == null) page2 = page;
          else if (page.topScroll < page2.topScroll) page2 = page;
        }
      }
      if (page1 != null) {
        this.titleLeft = page1.title;
        this.scrollLeft = page1.topScroll;  
        this.titleText = page1.title;
      } else {
        if (scrollTop != 0 && scrollTop>-this.getHeightPx(this.constantsValue.start)) {
          //console.log('scrollTop begin '+scrollTop+" .constantsValue.start="+-this.getHeightPx(this.constantsValue.start));
          this.titleLeft = "Начало";
          this.scrollLeft = -this.getHeightPx(this.constantsValue.start);//0;
        } else {
          this.titleLeft = "";
          this.scrollLeft = -1;
        }
      }
      if (page2 != null) {
        this.titleRight = page2.title;
        this.scrollRight = page2.topScroll;
      } else {
        if (scrollTop == 0) {
          this.titleRight = this.pages[0].title;
          this.scrollRight = this.pages[0].topScroll;
        } else {
          this.titleRight = "";
          this.scrollRight = -1;
        }
      }
    },
    goToScroll: function(scroll,step=0){
      window._skrollr.setScrollTop(scroll + step, true);
      console.log("goToScroll "+(scroll + step)+" scroll"+scroll +" step"+ step);

      this.menuOpen = false;
    },
    goBackScroll: function (step=0) {
      /*window._skrollr.animateTo(page.topScroll, {
            duration: 500,
          });*/
      console.log("goBackScroll "+(this.scrollLeft + step)+" scroll"+this.scrollLeft +" step"+ step);
      if (this.scrollLeft != -1)
        if (this.scrollLeft != 0)
          window._skrollr.setScrollTop(this.scrollLeft+step, true);
        else
          window._skrollr.animateTo(this.scrollLeft+step, {
            duration: 300,
          });
    },
    goNextScroll: function (step=0) {
      console.log("goNextScroll "+(this.scrollRight + step)+" scroll"+this.scrollRight +" step"+ step);
      if (this.scrollRight != -1)
        if (this.scrollRight != this.pages[0].topScroll)
          window._skrollr.setScrollTop(this.scrollRight+step, true);
        else
          window._skrollr.animateTo(this.scrollRight+step, {
            duration: 300,
          });
    },
    pageGetAttrStyle: function (index) {
      //console.log("pageGetAttr");
      var attr = {};
      var style = {};
      var start = 0;
      //var w = "";
      /*"width:" +
        (this.getWindowWidth() -
          this.getElemntWidthtById("button-left") -
          this.getElemntWidthtById("button-right") -
          5) +
        "px";*/

      var hbegin = 0;
      var hend = 0;
      for (let i = 0; i < index; i++) {
        //const page = this.pages[i];
        //page.style = {width : w};
        var hi = this.getElemntHeightById("page-" + i);
        hbegin = hbegin + hi;
        //(h * 100) / this.getWindowHeight();
        //if (index==14) console.log(hi,"px",this.getWindowHeight());
      }

      var h = this.getElemntHeightById("page-" + index);

      console.log(index, h, hbegin);

      h = this.getHeightVh(h);
      hbegin = this.getHeightVh(hbegin);// - this.menuHeight*(index+1); // внутренний хвост 50 + внешний 50

      h=Math.round(h*100)/100;
      hbegin=Math.round(hbegin*10000)/10000+10*(index);//+ 90 margin-top figure
      
      hend = hbegin + h;// + 100;
      console.log(index, h, hbegin, hend);

      this.pages[index].topScroll = this.getHeightPx(start + hbegin - this.menuHeight*1.2);//+ 10*index + 2

      var topAttr = {};


      //+++++++++
      if (this.pages[index].topImage!=null){
        topAttr = {
        ["data-_start-" + (start + hbegin-50) + "p"]: "background-position: center bottom 0px;background-size: 100%",
        ["data-_start-" + (start + hbegin-20) + "p"]: `background-position: center bottom -300px;background-size: 120%`,
        ["data-_start-" + (start + hbegin+50) + "p"]: "background-position: center bottom 0px;background-size: 100%",
        }
      }
      
      if (index==0){
          this.titleAttr[  ["data-_start-0p"] ] = `left:-50vw;top:-50vh;`;
          this.titleAttr[  ["data-_start-" + (start+hbegin+40) + "p"] ] = `transform:rotate(-180deg);left:-250vw;top:${this.menuHeight}vh;`;
        }
      this.titleAttr[  ["data-_start-" + (start+hbegin+50) + "p"] ] = `transform:rotate(0deg);left:0vw;top:${this.menuHeight}vh;`; // +30
      this.titleAttr[  ["data-_start-" + (start+hend-50) + "p"] ] = `left:-1vw;top:${this.menuHeight}vh;`;//`left:0vw;top:${this.menuHeight*0.8}vh;`;
      this.titleAttr[  ["data-_start-" + (start+hend-20) + "p"] ] = `transform:rotate(-180deg);left:-250vw;top:${0}vh;`;





      //console.log("pageGetAttr hend="+hend+" h="+h);
      /*attr = {
        ["data-_start-" + (start + hbegin) + "p"]: `transform:rotate(0deg);left:${index > 0 ? 200 : 0}vw;right:${index > 0 ? -200 : 0}vw;top:-1vh;opacity:1;${w};`, //;${w}
        ["data-_start-" + (start + hbegin + 50) + "p"]: `transform:rotate(${index!=0?2:0}deg);left:-2vw;right:2vw;top:0vh;opacity:1;${w};`,
        ["data-_start-" + (start + hbegin + 70) + "p"]: `transform:rotate(0deg);left:-2vw;right:2vw;top:0vh;opacity:1;${w};`, // остановка для просмотра начала страницы
        ["data-_start-" + (start + hbegin + 130) + "p"]: `transform:rotate(0deg);left:-2vw;right:2vw;top:0vh;opacity:1;${w};`, // остановка для просмотра начала страницы
        ["data-_start-" + (start + hend - 50) + "p"]: `transform:rotate(0deg);left:-2vw;right:2vw;top:${h < 75 ? 5 : -(h - 75)}vh;opacity:1;${w};`,
        ["data-_start-" + (start + hend + 10) + "p"]: `transform:rotate(0deg);left:-2vw;right:2vw;top:${h < 75 ? 5 : -(h - 75)}vh;opacity:1;${w};`, // остановка перед убрать налево
        ["data-_start-" + (start + hend + 50) + "p"]: `transform:rotate(-3deg);left:-20vw;right:20vw;top:${h < 80 ? 5 : -(h < 100 ? 5 : h - 100 + 100 * 0.8)}vh;${w};opacity:0.5`,
        ["data-_start-" + (start + hend + 100) + "p"]: `transform:rotate(-4deg);left:-100vw;right:100vw;top:-${h}vh;${w};opacity:0`,
      };*/
      /*attr = {
        ["data-_start-" + (start + hbegin -10 ) + "p"]: `left-2vw;right:2vw;opacity:0;top:0vh;`,
        ["data-_start-" + (start + hbegin) + "p"]: `left-2vw;right:2vw;opacity:0;top:0vh;`,
        ["data-_start-" + (start + hbegin+50) + "p"]: `left-2vw;right:2vw;opacity:1;top:0vh;`,

        ["data-_start-" + (start + hend + 50) + "p"]: `left:-2vw;right:2vw;opacity:1;top:-${h}vh;`,
        ["data-_start-" + (start + hend + 100) + "p"]: `left:-2vw;right:2vw;opacity:0;top:0vh;`,
        ["data-_start-" + (start + hend + 110) + "p"]: `left:-2vw;right:2vw;opacity:0;top:0vh;`,
      };*/
      attr = {
        //50-bottom-bottom   -50-top-top 
        //["data-50-bottom-bottomp"]:   `opacity:0.3`,
        //["data--50-top-top"]:   `opacity:1`,

        ["data-_start-" + (start+hbegin-50) + "p"]:   `opacity:0.3`,
        ["data-_start-" + (start+hbegin-20) + "p"]:   `opacity:1`,
        //["data-_start-" + (start+hbegin+25) + "p"]:   `opacity:1`,
        ["data-_start-" + (start+hend) + "p"]:   `opacity:1`,
        //["data-_start-" + (start+hend + 100) + "p"]:   `opacity:0.3`,

        /*["data-_start-" + (start+hbegin-150) + "p"]:   `transform:scale(0.9);opacity:0.8`,
        ["data-_start-" + (start+hbegin-50) + "p"]:   `transform:scale(1.1);opacity:0.9`,
        ["data-_start-" + (start+hbegin) + "p"]:   `transform:scale(1);opacity:1`,
        ["data-_start-" + (start+hend-50) + "p"]:   `transform:scale(1);opacity:1`,
        ["data-_start-" + (start+hend) + "p"]:   `transform:scale(0.9);opacity:0.8`,*/

        //["data-_start-" + (start+hend+50) + "p"]:   `transform:scale(1);opacity:1;top:${-h}vh`,
        //["data-_start-" + (start+hbegin-50) + "p"]:   `transform:scale(1);opacity:0.3;margin-top:0vh;`,
        //["data-_start-" + (start+hbegin) + "p"]:   `transform:scale(1);opacity:0.3;margin-top:-60vh;`,
        //["data-_start-" + (start+hbegin+50) + "p"]:   `transform:scale(1);opacity:1;margin-top:0vh;`,
        //["data-_start-" + (start+hbegin-50) + "p"]:   `transform:scale(1);left:100vw;opacity:0.8;margin-top:0vh;`,
        //["data-_start-" + (start+hbegin) + "p"]:     `transform:scale(1.5);left:100vw;opacity:0.8;margin-top:-50vh;`,
        //["data-_start-" + (start+hbegin+50) + "p"]:  `transform:scale(1);left:100vw;opacity:1;margin-top:0vh;`,

        //["data-_start-" + (start+hbegin+20) + "p"]: `transform:scale(1);left:100vw;opacity:1;`,
        //["data-_start-" + (start+hbegin+100) + "p"]: `transform:scale(1);left:100vw;opacity:1;margin-top:-50vh;`,
        //["data-_start-" + (start+hbegin+120) + "p"]: `transform:scale(1);left:100vw;opacity:1;margin-top:0vh;`,
        /*["data-_start-" + (start + hbegin + 100) + "p"]: `left:-2vw;right:2vw;opacity:1;`,
        ["data-_start-" + (start + hbegin + 50) + "p"]: `left-2vw;right:2vw;opacity:1;`,
        
        ["data-_start-" + (start + hend + 50) + "p"]: `left:-2vw;right:2vw;opacity:1;`,
        ["data-_start-" + (start + hend + 100) + "p"]: `left:-2vw;right:2vw;opacity:0.5;`,
        ["data-_start-" + (start + hend + 110) + "p"]: `left:-2vw;right:2vw;opacity:0;`,*/
      };     

      //qdata-_start-3000p="cs({ ml: '55vw', t:'-3000vh', ts:1})"
      /*var contentAttr = {
        ["data-_start-" + (start+hbegin-50) + "p"]:   `transform:scale(1);left:100vw;opacity:0.8;margin-top:0vh;`,
      }*/

      var page = {hb:hbegin,he:hend}
      return {attr,style,topAttr,page};
    },
    // scroll top
    /*updateWordAttr: function(hb,he){
      var words = document.getElementsByClassName("word");
      words.forEach(word => {
        var parent = word.parentElement;
      });
    },*/
    updateAttrStyle: function () {

      var wcont =
        this.getWindowWidth() -
        this.getElemntWidthtById("pad-left") -
        this.getElemntWidthtById("pad-right") +
        "px";

      var dataRef = document.getElementById("data-1");
      dataRef.style.width = wcont;

      this.titleAttr={};
      this.contentAttr={}

      for (let index = 0; index < this.pages.length; index++) {
        const page = this.pages[index];
        var a = this.pageGetAttrStyle(index);
        page.attr = a.attr;
        page.style = a.style;
        page.topAttr = a.topAttr;
        //this.titleAttr.push(a.titleAttr);
        //console.log(a.titleAttr);
        //console.log(this.pageGetAttrStyle(index));
        /*if (index == this.pages.length-1){
          this.contentAttr = {
            ["data-_start-" + (0) + "p"]:         `top:${0}px`,
            //["data-_start-end"  ]: `top:${-a.page.he}px`,
            ["data-_start-" + (a.page.he) + "p"]: `top:${-a.page.he}vh`,
            //["data-_start-" + (a.page.he) + "p"]: `top:${-5600}vh`,
            //["data-end"]: `top:${-a.page.he+5000}vh`,
          }
          console.log("this.contentAttr",this.contentAttr);
        }*/
      }
      //console.log(this.titleAttr);
      //console.log("updateAttrStyle end");
      /*if (this.getElemntHeightById("data-1") != -1) {
        var elemHeight = this.getElemntHeightById("data-1");
        var elemHeightVh = this.getHeightVh(elemHeight);
        // количесов полных страниц
        var cntPageScroll = Math.ceil(elemHeightVh / 100);
        //var winHeight = this.getWindowHeight();
        //var scroll = elemHeight * 100 / winHeight;// в vh
        var deltaScrollTop = elemHeightVh - 60 - this.menuHeight;
        if (deltaScrollTop < 0) deltaScrollTop = 0;
        this.attr = {
          ["data-" + cntPageScroll * 100 + "p"]:
            "top:-" + deltaScrollTop + "vh",
        };
        console.log(this.attr);

        this.attrPageStyle = {
          width: this.getElemntWidthtById("data-1") + "px",
        };
      }*/
    },
    getHeightVh: function (h) {
      return (h * 100) / this.getWindowHeight();
    },
    getHeightPx: function (hvh) {
      return (hvh * this.getWindowHeight()) / 100;
    },
    getWidthVw: function (w) {
      return (w * 100) / this.getWindowWidth();
    },
    getWindowHeight: function () {
      return document.documentElement.clientHeight;
    },
    getWindowWidth: function () {
      return document.documentElement.clientWidth;
    },
    getElemntHeightById: function (id) {
      if (document.getElementById(id) != null)
        return document.getElementById(id).offsetHeight;
      else return -1;
    },
    getElemntWidthtById: function (id) {
      if (document.getElementById(id) != null)
        return document.getElementById(id).offsetWidth;
      else return -1;
    },
    cs(params) {
      return cs(params);
    },
    update(){
      this.resizeEventHandler();
      console.log("----- update -----");
    },
    clickEventHandler(){
      //if (this.isMobile())
      this.scrollEventHandler();
    },
    touchmoveEventHandler(){
      //if (this.isMobile())
      //this.scrollEventHandler();
    },
    resizeEventHandler() {
      this.updateAttrStyle();
      this.showInButtonsTitlePageAndTopTitle();
      setTimeout(() => {
        window._skrollr.refresh();
      }, 500);
    },
    scrollEventHandler() {

      let scrollHeightMax = Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.offsetHeight,
        document.body.clientHeight,
        document.documentElement.clientHeight
      );
      let scrollHeightMin = Math.min(
        document.body.scrollHeight,
        document.documentElement.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.offsetHeight,
        document.body.clientHeight,
        document.documentElement.clientHeight
      );
      let scrollHeight = scrollHeightMax - scrollHeightMin;

      let scTop = window._skrollr.getScrollTop();
      this.scrollTop =
        scTop + " " + (scTop / scrollHeight) * 100 + "% " + scrollHeight;

      this.showInButtonsTitlePageAndTopTitle();

      //console.log(this.scrollTop);
      //console.log(e);
      //console.log(this.$refs.lozung1);
      //console.log(document.getElementsByClassName("over-control"));
      /*+++ let overcols = document.getElementsByClassName("over-control");
      overcols.forEach((over) => {
        let overItems = over.getAttribute("over").split(",");
        let isVertical = overItems[0] == "vertical";
        let beginPerc = Number(overItems[1]);
        let endPerc = Number(overItems[2]);
        let beginAtrr = "data-" + beginPerc + "p";
        let endAtrr = "data-" + endPerc + "p";
        if (isVertical) {
          // over.scrollHeight - вся высота
          // over.offsetHeight - видимая
          console.log("overcols is vertical "+over.offsetHeight+" "+over.scrollHeight);
          if (over.scrollHeight > over.offsetHeight) {
            if (over.getAttribute(beginAtrr) == null) {
              over.setAttribute(beginAtrr, "top: 0px;");
              over.setAttribute(
                endAtrr,
                "top: -" + (over.scrollHeight - over.offsetHeight - 1) + "px;"
              );
              window._skrollr.refresh([over]);
              console.log(1);
            }
          } else {
            if (over.getAttribute(beginAtrr) != null) {
              over.removeAttribute(beginAtrr);
              over.removeAttribute(endAtrr);
              window._skrollr.refresh([over]);
              //console.log(2);
              over.style.top = "0px";
            }
          }
        }
        //console.log(over.getAttribute("over"));
      });*/
      /*this.panels[0].atrr["data-150p"]="top:-50%";
      let a= this.panels[0].atrr;
      this.panels[0].atrr = a;
      console.log(this.panels[0].atrr);*/
    },
  },
};
</script>

<style lang="scss">
@import "../modules/theme.scss";

// -------- top menu
.top-menu {
  background: transparent;
  height: $menuHeight;
  width: 100vw;
  background-color: $color1;
  //background: $gradient-ver-cl1-cl5;
  //overflow: hidden;
  position: fixed;
  left: 0px;
  top: 0px;
  box-shadow:-3px 3px 10px 0 #000000;
  z-index: 103;
}
.top-menu .navbar-end {
    margin-right: 10vw;
}
.top-menu .navbar-burger {
    height: $menuHeight;
    width: $menuHeight;
    margin-right: 3vw;
    span{
      width: 50px;
      left: 23px;
    }
    span:nth-child(1){
      top: calc(50% - 8px);
    }
    span:nth-child(2){
      top: calc(50% - 0px);
    }
    span:nth-child(3){
      top: calc(50% + 8px);
    }        
}
.top-menu .navbar-burger.is-active span:nth-child(1) {
    transform: translateY(10px) rotate(45deg);
}

//стралоска меню
.top-menu .navbar-link:not(.is-arrowless)::after{
  border-color: $color4;
}
.top-menu .navbar-link{
  color: $color3;
}
.top-menu .navbar-link:hover{
  color: $color4;
  background: $gradient-ver-cl5-cl1;
}
// выбран меню
.top-menu .navbar-item.has-dropdown.is-active .navbar-link{
  color: $color4;
  background: $gradient-ver-cl5-cl1;
}
.top-menu .navbar-dropdown{
  max-height: 75vh;
  overflow-y: auto;  
}
//итем меню
/*+++ .top-menu .navbar-item:hover{
  //background: $gradient-ver-cl5-cl1;
  //color: $color7;
}*/
.top-menu:hover{
  //height: $menuHeight+0.5;
  //background: $gradient-ver-cl5-cl1;
  //background: $color1;
}
// -------- top menu end


// ------- scroll menu -------
// Limit the width to 1024px and center
.vsm-menu {
  margin: 10px;
  ul {
    //max-width: 1024px;
    margin: 0 auto;
  }
}

// Let's simplify the work with menu items (logo, menu, buttons, etc)
.vsm-root {
  display: flex;
  align-items: center;
  justify-content: center;
}


// Move all the content to the right and reduce the logo
.logo-section {
  flex: 1 1 auto;
  img {
    user-select: none;
    max-width: 40px;
  }
}
// центральная часть - центр
.vsm-section_menu{
  flex: 1 1 auto;
}

.vsm-arrow{
  background-color: $color6-4 !important;
}
.vsm-dropdown-content{
  background-color: $color1 !important;
  background: $gradient-ver-cl64-cl1 !important;
}

// All menu items (element props: a, button, span, etc) are
// made the same in style
.vsm-section_menu {
  > * {
    //padding: 0 5px;
    font-weight: 500;
    font-family: inherit;
  }
}
.vsm-link > *{
  color: $color2;
}
.vsm-link:hover{
  background-color: $color6-3;
  cursor: pointer;
}

.vsm-active{
  background-color: $color6-3;
}

.menu-image{
  //margin: 10px 0px 0px 10px !important;
  //padding: 10px 0px 0px 10px !important;
  //border-radius: 0px 20px 20px 0px;
  overflow: hidden;
  opacity: 0.8;
  //margin: 0px 0px 100px 0px !important;
  height: 105%;
  //left: -50%;
  width: 100%;
  //left: -30%;
  //margin: 0% 10% 20% 0%;
  position: absolute;
}
// Styles for Dropdown Content:
.menu-content {
  //padding: 50px 0px 0px 0px;
  //margin: 0px !important;
  //padding: 0px  !important;
  // Set the width manually so that it does not depend
  // on changing content
  //border: 1px solid $color2;
  //border-right: 1px solid $color4;
  border-bottom: 10px solid $color6-4;
  border-radius: 5px;
  width: 400px;
  //background-color: $color1;
  .column{
    padding: 0px 0px 0px 0px  !important;
  }
}
.menu-block {
  font-size: 1.1rem;
  font-weight: bold;
  color: $color3;
  padding: 10px;
}
.menu-items{
  //padding: 150px 50px 50px 50px !important;
  margin: 20px 0px 20px 0px !important;
}
.menu-item {
  font-size: 1rem;
  color: $color3;
  padding: 10px;
  margin: 0px 10px 0px 10px;
}
.menu-item-sub {
  font-size: 0.8rem;
  color: $color3;
  padding: 5px 5px 5px 50px;
  margin: 0px 10px 0px 10px;
}
.menu-item:hover {
  //color: $color3;
  background-color: $color6-3;
  cursor: pointer;
}
.menu-item-description{
  font-size: 0.6rem;
}
// ------- scroll menu end ------


.mapViewer{
  display: none;
  position: fixed;
  height: 100vh - $menuHeight;
  width:  43%;
  top:  $menuHeight;
  //right: 5vw;
  background: $color5;
  z-index: 200;
}

.b-sidebar{
  position: fixed;
  z-index: 105;
  .sidebar-content{
    min-width: 20vw;
  }
  .menu-list a.is-active{
    background-color: $color4;
  }
}

.titleTopText{
  position:fixed;
  background-color: $color4;
  background:$gradient-ver-cl3-cl4;
  color: $color1 !important;
  min-height:8vh;
  min-width:20vw;
  z-index:100;
  top:-100vh;
  left:-100vw;
  border-radius: 0vw 0vw 0.5vw 0vw;
  padding: 1vh;
  padding-left: 5vw;
  padding-right: 3vw;
  font-size: 3vh;
  box-shadow: 0px 5px 10px 2px rgba(34, 60, 80, 0.2);
  opacity: 0.8;
  overflow: hidden;
}
.page-text{
  p {
    text-indent: 3vw; /* Отступ первой строки в пикселах */
   }
}

.vert-text {
  transform: rotate(180deg);
  writing-mode: vertical-lr;
  /*margin-right: -30px;
    margin-top: -30px;*/
}

.pages {
  //position: relative;
  z-index: 99;
  //width: 96%;
  //margin: 1%;
}
/*.page0 {
  background-color: transparent !important;
  position: absolute;
  border: 1px solid $color1;
  border-radius: 5px 5px 5px 5px;
  padding: 20px;
  box-shadow: 0px 5px 10px 2px rgba(34, 60, 80, 0.2);
  background-color: $color1;
}*/
.page {
  background-color: $color6;
  //position: fixed;
  //margin-top: -30vh;
  border: 1px solid $color1;
  border-radius: 5px 5px 5px 5px;
  padding: 20px;
  //padding-bottom: 10vh;
  box-shadow: 0px 5px 10px 2px rgba(34, 60, 80, 0.2);
  background-color: $color1;

  margin-left: 3vw;
  margin-right: -3vw;
  margin-bottom: 10vh;

  //border-radius: 5px 5px 5px 5px;
  //width: 90vw;
  /*margin: 1vw;
  margin-left: 5vw;
  margin-right: 5vw;*/
  /*left: 0px;
  right: 0px;*/
  //background-color: $color6;

  //border: 1px solid $color5;
  //padding: 20px;
  //box-shadow: 0vh 0vh 0.5vh 0.8vh rgba(0, 0, 0, 0.1);
}

.page-title {
  background-color: $color4;
  background: $gradient-gor-cl1-cl5;
}
.page-title-width-image {
}
.page-title .title {
  color: $color3 !important;
  border-radius: 5px 5px 5px 5px;
  padding: 2vh;
  padding-top: 3vh;
  background-color: $gradient-gor-cl3-cl4;
}
.page-title-width-image .title{
  color: $color1 !important;
  //border-radius: 50px 50px 50px 50px;
  background: $gradient-gor-cl3-cl4;
  padding: 2vh;
  padding-top: 3vh;
  //min-height: 10vw;
}
.button-left {
  z-index: 102;
  user-select: none;
  opacity: 0.5;
  position: fixed;
  left: 0px;
  top: 35vh;
  width: 40px; //rvw
  min-height: 30vh;
  max-height: 80vh;
  color: $color1;
  background-color: $color3;
  border: solid $color2;
  border-width: 1px 1px 1px 0px;
  border-radius: 0px 10px 10px 0px;
  box-shadow: 0px 5px 10px 2px rgba(34, 60, 80, 0.2);
  cursor: pointer;
  text-align: center;
  padding-top: 20px;
  padding-bottom: 20px;
  overflow: hidden;
}
.button-left:hover {
  width: 50px;
  opacity: 0.8;
}
.button-right {
  z-index: 102;
  user-select: none;
  opacity: 0.5;
  position: fixed;
  right: 0px;
  top: 35vh;
  width: 40px;
  min-height: 30vh;
  max-height: 80vh;
  color: $color1;
  background-color: $color3;
  border: solid $color2;
  border-width: 1px 0px 1px 1px;
  border-radius: 10px 0px 0px 10px;
  box-shadow: 0px 5px 10px 2px rgba(34, 60, 80, 0.2);
  cursor: pointer;
  text-align: center;
  padding-top: 20px;
  padding-bottom: 20px;
  overflow: hidden;
}
.button-right:hover {
  width: 50px;
  opacity: 0.8;
}

.pad-left {
  z-index: 103;
  position: fixed;
  left: 0px;
  top: 15vh;
  width: 3vw; //rvw
  height: 5vh;
  border: solid $color5;
  border-width: 1px 1px 1px 0px;
}
.pad-right {
  z-index: 103;
  position: fixed;
  right: 0px;
  top: 15vh;
  width: 3vw;
  height: 5vh;
  border: solid $color5;
  border-width: 1px 0px 1px 1px;
}

.content-data {
  background-color: transparent;
  //background: green;
  position: relative;
  //width: 100vw;
  //padding: 3vw;
  //padding-left: 8vw;
  //padding-right: 8vw;
}
.content {
  //position: fixed;
  border: 1px solid $color5;
  //padding-left: 55vw;
  //padding-right: 5vw;
  //left: 10px; right: 200px;
  //margin: 10px;
  //width: 100%;
  //margin-right: 1000vw;
  //height: 300vh;
  background-color: transparent;
  /*box-shadow: inset 0vh 0vh 3vh 5vh rgba(0,0,0,0.6);*/
  //z-index: 200;
}

.main {
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0px;
  left: 0px;
  background-color: $color1;
  z-index: 100;
}
.figure {
  overflow: hidden;
  //position: fixed;
  width: 100vw;
  //height: 100vw;
  //border-radius: 100vw;
  //top: 0px;
  background-color: $color2;
  //opacity: 0.6;
  border: 1px solid $color5;
  //box-shadow: inset 0vh 0vh 1vh 2vh rgba(0, 0, 0, 0.3);
  box-shadow: inset 3px 3px 10px 0 #000000;
  z-index: 100;
  background-color: transparent;
}
/*.figure::after{
 box-shadow: inset 3px 3px 10px 0 #000000;
 content: '';
 display: block;
 height: 100%;
 position: absolute;
 top: 0;
 width: 100%;
}*/
.progress-control {
  position: fixed;
  height: 1vh !important;
  background: #444;
  bottom: 0 !important;
  z-index: 201;
}
.progress-value {
  border-radius: 5px;
  position: fixed;
  height: 3vh !important;
  background: #777;
  color: white;
  bottom: 0 !important;
  z-index: 202;
  top: 97vh;
  opacity: 0.7;
}
/*.panel-h100 {
  height: 100vh !important;
}
.panel {
  -webkit-box-shadow: 0px -5px 5px 0px rgba(50, 50, 50, 0.55);
  -moz-box-shadow: 0px -5px 5px 0px rgba(50, 50, 50, 0.55);
  box-shadow: 0px -5px 5px 0px rgba(50, 50, 50, 0.55);
  overflow: hidden;
  border-radius: 5px 0px 0px 5px;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 90vh;
  background: transparent center no-repeat;
  background-size: cover;
}
.panel-content {
}

.progress-panorama {
  position: fixed;
  height: 70px !important;
  width: 3000px;
  bottom: 0 !important;
  z-index: 200;

  background: transparent;
  background-repeat: repeat-x;
  background-position: left bottom;

  opacity: 0.2;
}

#main-body {
  height: 60vh;
  background: rgb(255, 255, 255);
  background: linear-gradient(
    0deg,
    rgba(255, 255, 255, 1) 0%,
    rgba(232, 237, 249, 1) 70%,
    rgba(255, 255, 255, 1) 100%
  );
}*/
</style>