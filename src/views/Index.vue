<template>
  <section>

    <div class="menu-top">
        <!--a href="#anch1">page1</a>
        <a href="#anch2">page2</a-->
        <!--span @click="scrollTo('anch1')">page1</span> |
        <span @click="scrollTo('anch2')">page2</span-->

        <div v-on:mouseenter="showMapViewer(null);titleCurText=null;">
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
                            :id="'mitem-'+index"
                            @click="scrollTo(sub.name)">
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

                <template #after-nav>
                  <li class="vsm-section" style="margin-right:1vw">
                  <b-field style="margin-bottom: 0rem;">
                      <b-input placeholder="Найти..." style="min-width: 20vw;"
                          type="search"
                          icon="magnify" rounded
                          v-model="searchText">
                      </b-input>
                      <p class="control">
                          <button class="button is-light" @click="searchClick();">Найти</button>
                      </p>
                  </b-field>          

                  <b-field>
                    <b-tooltip label="На карте" position="is-bottom" type="is-light">
                      <b-button style="max-height:8vh;max-width:8vh;margin-left:5px" @click="showModalMap= !showModalMap"><b-icon icon="map-marker"></b-icon></b-button>
                    </b-tooltip>
                    <b-tooltip  label="Контакты" position="is-bottom" type="is-light">
                      <b-button style="max-height:8vh;max-width:8vh;margin-left:5px" @click="showModalContacts = !showModalContacts"><b-icon icon="phone"></b-icon></b-button>
                    </b-tooltip>
                    <!--b-tooltip label="Меню сайта" position="is-bottom" type="is-light">
                      <b-button @click="menuOpen = true" style="max-height:8vh;max-width:8vh;margin-left:5px"><b-icon icon="menu"></b-icon></b-button>
                    </b-tooltip-->
                  </b-field>
                  </li>
                </template>
            </vsm-menu> 
        </div>

        <span class="titleWhenMainTitleHide" v-if="titleCurText!=null" v-html="titleCurText"></span>

        <div class="mapViewer" id="mapViewer" v-on:onshowMapViewer="showMapViewer">
            <yandex-map 
            :coords="mapViewer.coords"
            :zoom="10" 
            @click="onModalMapClick"
            style="height:100%;width:100%"
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
            <b-button style="height: 30px;width: 30px;left: 1vh;top: -83vh;" @click="hideMapViewer()"><b-icon icon="close"></b-icon></b-button>
            </b-tooltip>        
        </div>

    </div>


    <!--div class="layer-bg">
        <stickyBgBlock 
            v-for="(imenu, index) in menuList"
            :key="index"
            :id="'imenu-'+index"        
            :layerText="imenu.title"
            v-on:updateanchor="updateAnchor" 
            :anchor="imenu" 
            :image="require('../assets/images/title-ungg-doneck.jpg')"
            :isSub="imenu.class!='menu-item'"
        />
    </div-->

    <div
      class="button-left"
      id="button-left"
      v-if="titleLeft!=null" @click="scrollTo(titleLeft.name)"
    >
      <span class="vert-text" >{{ titleLeft.title }}</span>
    </div>
    <div
      class="button-right"
      id="button-right"
      v-if="titleRight!=null" @click="scrollTo(titleRight.name)"
    >
      <span class="vert-text" >{{ titleRight.title }}</span>
    </div>

    <!-- pages -->
    <div
        v-for="(ipage, index) in menuList"
        :key="index"
        :id="'ipage-'+index"    
        class="print"
        v-on:mouseenter="showMapViewer(null)"
    >
      <InfoStamp/>

      <span :id="ipage.name" class="print-no" :class="ipage.class=='menu-item'?'anchor':'anchor-title'">anchor-{{ipage.name}}</span>
      <titleBig v-if="ipage.class!='menu-item-sub'" :menu="ipage" :submenu="ipage.items"/><!-- :titleText="ipage.title" titleSubText="---" -->
      <div class="print title-sub" v-else>{{ipage.title}}</div>

      <div style="background:white;margin-top: 0px;padding-top:3vh">
        <div style="float: right;" class="print-no">
            <b-tooltip label="Печать" position="is-bottom" type="is-light" style="margin-right:50px;margin-top:10px;">
            <b-button style="max-height:8vh;max-width:8vh;margin-left:5px" @click="print(`ipage-${index}`)"><b-icon icon="printer"></b-icon></b-button>
            </b-tooltip>
        </div>

        <div class="container has-text-justified layer-context print">
            <Referencii v-if="ipage.component=='referencii'" 
                    v-on:onupdate="update" 
                    v-on:onshowMapViewer="showMapViewer"
            />
            <Glavnaya v-else-if="ipage.component=='glavnaya'" />
            <Vidideyatelnosti v-else-if="ipage.component=='vidideyatelnosti'" v-bind:showAll="showAll"/>
            <Licenzii v-else-if="ipage.component=='licenzii'" v-on:onshowDocument="showDocument"/>
            <Po v-else-if="ipage.component=='po'" v-bind:showAll="showAll"/>
            <Jurnal v-else-if="ipage.component=='jurnal'" v-on:onshowDocument="showDocument"/>
            <div v-else>BEGIN<lorem add="10p" />END</div>
            <div class="p-6"/><div class="p-6"/>
        </div>             
      </div>

    </div>


    <b-modal v-model="showModalContacts" :width="640" scroll="keep" style="z-index:200">
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

    <b-modal v-model="showModalMap" has-modal-card full-screen scroll="keep" style="z-index:200">
        <div class="modal-card" style="width: auto">
          <header class="modal-card-head">
              <p class="modal-card-title">На карте</p>
              <button class="button" type="button" @click="showModalMap=false"><b-icon icon="close"/></button>
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
                      :coords="mapModal.coords"
                      :zoom="16" 
                      @click="onModalMapClick"
                      style="height: 100%;"
                      :controls="['fullscreenControl','zoomControl']"
                    >
                      <ymap-marker 
                        :coords="mapModal.coords" 
                        marker-id="m1" 
                        hint-content="АО 'ЮЖНИИГИПРОГАЗ'" 
                        :icon="mapModal.markerIcon"
                        :balloon-template="mapModal.mapMarkerBalloonTemplate"
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

    <b-modal v-model="showModalDoc" has-modal-card full-screen scroll="keep" style="z-index:200">
        <div class="modal-card" style="width: auto" v-if="document!=null">
          <header class="modal-card-head">
              <p class="modal-card-title">{{document.title}}</p>
                <!--b-tooltip label="Печать" position="is-bottom" type="is-light" style="margin-right:50px;margin-top:10px;">
                    <b-button style="max-height:8vh;max-width:8vh;margin-left:5px" @click="$refs.pdfViewer.print()"><b-icon icon="printer"></b-icon></b-button>
                </b-tooltip-->     
                <b-tooltip label="Загрузить для печати" position="is-bottom" type="is-light" style="">
                    <!--b-button style="max-height:8vh;max-width:8vh;margin-left:5px" @click="$refs.pdfViewer.print()"><b-icon icon="printer"></b-icon></b-button-->
                    <a :href="'/files/'+document.file" target="_blank" class="button"><b-icon icon="printer"/></a>
                </b-tooltip>
              <!--a :href="'/files/lic/'+document.file" target="_blank" class="button">Загрузить</a-->
              <button class="button" type="button" @click="showModalDoc=false"><b-icon icon="close"/></button>
          </header>
          <section class="modal-card-body">
                <figure class="image">
                    <pdf :src="'/files/'+document.file" :page="currentPage" ref="pdfViewer"/>
                </figure>
          </section>
          <footer class="modal-card-foot">
              <span class="mr-3">Страницы:</span> 
              <button class="button" type="button" @click="currentPage=ipage"
                v-for="ipage in document.pages"
                :key="ipage"
              >{{ipage}}</button>
          </footer>
        </div>
    </b-modal>     

    <b-sidebar
        type="is-light"
        :fullheight="true"
        :fullwidth="false"
        :overlay="false"
        :right="true"
        v-model="searchOpen"
    ><!-- @close="showAll=false" -->
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

    <section class="hero is-fullheight loading" v-if="loading">
        <div class="hero-body">
            <div class="container has-text-centered">
                <img :src="require('../assets/images/loading100.gif')">
            </div>
        </div>
    </section>

  </section>
</template>

<script>
import Lorem from "vue-lorem-ipsum";
import pdf from 'vue-pdf';
//import stickyBgBlock from "../components/sticky-bg-block";
import titleBig from "../components/title-big";

import InfoStamp from "../components/infoshtamp.vue";
import Referencii from "../components/referencii.vue";
import Glavnaya from "../components/glavnaya.vue";
import Vidideyatelnosti from "../components/vidideyatelnosti.vue";
import Licenzii from "../components/licenzii.vue"
import Po from "../components/po.vue";
import Jurnal from "../components/jurnal.vue";

export default {
    components: {
        Lorem,
        pdf,
        //stickyBgBlock,
        titleBig,
        InfoStamp,
        Referencii,
        Glavnaya,
        Vidideyatelnosti,
        Licenzii,
        Po,
        Jurnal,
    },
    created() {
        this.loguser();
        window.addEventListener("scroll", this.scrollEventHandler);
        window.addEventListener("resize", this.resizeEventHandler);
        this.resizeEventHandler();
    },
    destroyed() {
        window.removeEventListener("scroll", this.scrollEventHandler);
        window.removeEventListener("resize", this.resizeEventHandler);
    },    
    data() {
        return {
            showAll: false,
            loading:false,

            document: null,
            currentPage: 1,
            showModalDoc: false,

            titleLeft: null,
            titleRight: null,
            titleCurText:null,

            searchText: "",
            searchs:[],
            searchOpen: false,


            menu: 
                [
                    {
                        title: 'Главная',
                        name: 'main',
                        component: 'glavnaya',
                        top: '0px',
                        listeners: {
                            click: (/*e*/) =>{
                                //console.log('click',e);
                                this.scrollTo('main');
                                this.showAll=false;
                            }
                        },
                        class:'menu-item',
                        items:[],
                    },         
                    {
                        title: 'О «ЮЖНИИГИПРОГАЗе»',
                        name: 'abouteus',
                        component: 'lorem',
                        top: '0px',
                        dropdown: 'abouteus',
                        element: 'span',
                        attributes: {
                        },
                        listeners: {
                            click: () =>{
                                //console.log('click',e);
                                this.scrollTo('proizvod');
                            }                            
                        },
                        items:[
                            {name:'proizvod',component: 'lorem',title:'Производство',top: '0px', description:'', class:'menu-item'},
                                {name:'p-str',component: 'lorem',title:'cтруктура',top: '0px',description:'', class:'menu-item-sub'},
                                {name:'p-vid',component: 'vidideyatelnosti',title:'виды деятельности',top: '0px',description:'', class:'menu-item-sub'},
                                {name:'p-lic',component: 'licenzii',title:'лицензии и сертификаты',top: '0px',description:'', class:'menu-item-sub'},
                                {name:'p-prog',component: 'po',title:'программное обеспечение',top: '0px',description:'', class:'menu-item-sub'},
                            {name:'strategi',component: 'lorem',title:'Стратегия',top: '0px', description:'', class:'menu-item'},
                            {name:'otzivi',component: 'lorem',title:'Отзывы',top: '0px', description:'', class:'menu-item'},
                            //{name:'rucovod',title:'Руководство',top: '0px', description:'', class:'menu-item'},
                            {name:'history',component: 'lorem',title:'История',top: '0px', description:'', class:'menu-item'},
                        ],
                    },        
                    {
                        title: 'Проекты',
                        name: 'proects',
                        component: 'lorem',
                        top: '0px',
                        dropdown: 'proects',
                        element: 'span',
                        attributes: {
                        },
                        listeners: {
                            click: () =>{
                                //console.log('click',e);
                                this.scrollTo('p-mestor');
                            }                            
                        },
                        items:[
                            {name:'p-mestor',component: 'referencii',title:'Месторождения',top: '0px', description:'', class:'menu-item'},
                            {name:'p-magistr',component: 'lorem',title:'Магистральный газопроводный транспорт',top: '0px', description:'', class:'menu-item'},
                            {name:'p-zavod',component: 'lorem',title:'Заводы по переработке природного газа',top: '0px', description:'', class:'menu-item'},
                            {name:'p-cpg',component: 'lorem',title:'СПГ',top: '0px', description:'',class:'menu-item'},
                        ],
                    },            
                    {
                        title: 'В прессе',
                        name: 'inpress',
                        component: 'lorem',
                        top: '0px',
                        dropdown: 'inpress',
                        element: 'span',
                        attributes: {
                        },
                        listeners: {
                            click: () =>{
                                //console.log('click',e);
                                this.scrollTo('sobit');
                            }                              
                        },
                        items:[
                            {name:'sobit',component: 'lorem',title:'События',top: '0px', description:'', class:'menu-item'},
                            {name:'jurnal',component: 'jurnal',title:'Журналы',top: '0px', description:'', class:'menu-item'},
                            {name:'media',component: 'lorem',title:'Медиатека',top: '0px', description:'', class:'menu-item'},
                        ],
                    },        
                    {
                        title: 'Контактная информация',
                        name: 'contact',
                        component: 'lorem',
                        top: '0px',
                        dropdown: 'contact',
                        element: 'span',
                        attributes: {
                        },
                        listeners: {
                            click: () =>{
                                //console.log('click',e);
                                this.scrollTo('contorg');
                            }                              
                        },
                        items:[
                            {name:'contorg',component: 'lorem',title:'Контактная информация организаций',top: '0px', description:'', class:'menu-item'},
                            {name:'rucovod',component: 'lorem',title:'Руководство',top: '0px', description:'', class:'menu-item'},
                            {name:'message',component: 'lorem',title:'Оcтавить сообщение',top: '0px', description:'', class:'menu-item'},
                        ],
                    },          
                ],


            showModalContacts: false,
            showModalMap: false,
            mapModal:{
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
                mapMarkerBalloonTemplate:`
                    <img src="${require('../assets/images/title-ungg-doneck.jpg')}" style="width:300px;height:300px"></br>
                    <h1>ОА "ЮЖНИИГИПРОГАЗ"</h1>
                    <p>г. Донецк, ул. Артема, д. 169-г</p>
                    `                
            },
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
            },



        };
    },   
    mounted() {
        //this.anchor1 = this.$refs.anch1;
        //this.anchor2 = this.$refs.anch2;
        //console.log(this.$refs);
        //this.resizeEventHandler();
        this.updateAnchors();
        this.showMapViewer(null); 
        //console.log(this.menuList);
    },  
    computed: {
        menuList: function () {
            var ret = [];
            this.menu.forEach(imenu => {
                
                ret.push(imenu);

                if (imenu.items.length>0)
                    imenu.items.forEach(item => {
                        ret.push(item);
                    });
                //else
                //ret.push(imenu);
            });
            console.log(ret);
            return ret;
        },
        /*mapMarkerBalloonTemplate() {
            return `
                <img src="${require('../assets/images/title-ungg-doneck.jpg')}" style="width:300px;height:300px"></br>
                <h1>ОА "ЮЖНИИГИПРОГАЗ"</h1>
                <p>г. Донецк, ул. Артема, д. 169-г</p>
            `
        }*/
    },    
    methods: {
        /*dump(){
            console.log(this.$refs.pdfViewer);
            this.$refs.pdfViewer.print(100);
        },*/
        showDocument(doc){
            //console.log(doc);
            this.currentPage = 1;
            this.document = doc;
            this.showModalDoc = true;
        },

        searchClick(){

            this.loading = true;
            this.showAll = true;//открыть все разделы

            setTimeout(() => {

                var scrollTop = (window.pageYOffset || document.documentElement.scrollTop);
                this.scrollToPos(0,false);

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
                    var height = window.innerHeight;
                    words.forEach(word => {
                        var text = word.innerText.toUpperCase();
                        var indexFind = text.indexOf(s);
                        if (indexFind>=0){
                            top = word.getBoundingClientRect().top-height*0.2;// + document.body.scrollTop;// - height*0.2;//word.scrollTop;//offsetTop; //window._skrollr.relativeToAbsolute(word, 'center', 'bottom');
                            this.searchs.push({title:text,top:top, word: word, wordBg:word.style.background, wordColor:word.style.color});
                            word.style.background="red";
                            word.style.color="white";
                        }
                    });

                }

                //console.log(this.searchs);
                this.searchOpen=true;

                this.scrollToPos(scrollTop,false);

                this.loading = false;

            }, 2000); 

        }, 
        searchGo(index){
            var se = this.searchs[index];
            this.scrollToPos(se.top);
        },               
        update(){
            //this.resizeEventHandler();
            console.log("----- update -----");
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

        onModalMapClick(e) {
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
        scrollToPos(pos,smooth=true){
            if (!smooth) window.scrollTo (0,pos);
            else {
                var scrollTop = (window.pageYOffset || document.documentElement.scrollTop);
                if (scrollTop < pos ) window.scrollTo (0,pos-50);
                else window.scrollTo (0,pos+50);
                window.scroll({top: pos, left: 0, behavior: 'smooth' });
            }
            this.setTopCurTitle();
        },
        scrollTo(name) {
            //console.log(name);
            //location.hash = "#" + hash;

            //var obj = document.getElementById(name);
            //var height = window.innerHeight;
            /*console.log(obj);
            var height = window.innerHeight;
            //var rect = obj.getBoundingClientRect();
            window.scrollTo (0,obj.offsetTop-height*0.2);//rect.top+'px';            
            console.log(document.documentElement.scrollTop,obj);*/
            this.menuList.forEach(imenu => {
                if (imenu.name == name) {
                    //console.log(imenu);
                    //if (imenu.class=='menu-item')
                        this.scrollToPos (imenu.top);
                    //else
                    //    window.scrollTo (0,imenu.top);// для саб меню надо чуть прокрутить ниже
                        //window.scrollTo (0,imenu.top-height*0.2*2);// для саб меню надо чуть прокрутить ниже
                        //window.scrollTo (0,imenu.top+height*0.2*2);// для саб меню надо чуть прокрутить ниже
                }        
            });            
        },        
        updateAnchors(){
            this.menuList.forEach(anch => {
                this.updateAnchor(anch.name);
            });
        },
        updateAnchor(name){
            //var obj = document.getElementById(this.anchor[id].name);
            var obj = document.getElementById(name);
            //var height = window.innerHeight;
            //this.anchor[id].top = obj.offsetTop+'px';//rect.top+'px';
            if (obj!=null)
            this.menuList.forEach(imenu => {
                if (imenu.name == name) imenu.top = obj.offsetTop;// - (imenu.class!='menu-item'?height*0.2:0);
                //-height*0.2
            });
        },
        setLeftRightDirection(){
            //var height = window.innerHeight;
            var scrollTop = (window.pageYOffset || document.documentElement.scrollTop);
            //console.log(scrollTop);  
            //var findL = false; 
            //var findR = false; 
            var itemL = this.menuList[0];
            var itemR = this.menuList[this.menuList.length-1];            
            for (let index = 0; index < this.menuList.length; index++) {
                //if (this.menuList[index].class == 'menu-item')
                    if (this.menuList[index].top < scrollTop && itemL.top<this.menuList[index].top){
                        itemL = this.menuList[index];
                    }
                /*else{
                    if (this.menuList[index].top < scrollTop+height*0.11 && itemL.top<this.menuList[index].top){
                        itemL = this.menuList[index];
                    }
                }*/
            }
            for (let index = 0; index < this.menuList.length; index++) {
                if (this.menuList[index].top > scrollTop && itemR.top>this.menuList[index].top){
                    itemR = this.menuList[index];
                    //findR = true;
                }
            }
            this.titleLeft = itemL;
            this.titleRight = itemR;

            /*if (!findL){
                this.titleLeft = null;
            }
            if (!findR){
                this.titleRight = null;
            }*/
        },
        setTopCurTitle(){
            var scrollTop = (window.pageYOffset || document.documentElement.scrollTop) + 10;
            var height = window.innerHeight;
            var menu = this.menuList[0];
            this.menuList.forEach(imenu => {
                if (imenu.top<scrollTop && menu.top<imenu.top) menu = imenu;
            });
            this.titleCurText=menu.title;
            if (scrollTop>menu.top && scrollTop<menu.top+height/2) this.titleCurText=null;
        },
        /*getElementById(id){
            return document.getElementById(id);
        },
        anchors: function (id) {
            return this.$refs[id];
        },  */  
        scrollEventHandler(){
            this.updateAnchors();
            this.setLeftRightDirection();
            this.setTopCurTitle();
            /*setTimeout(() => {
                this.setLeftRightDirection();
            }, 1000);   */         
        },
        resizeEventHandler() {
            this.updateAnchors();
            this.setLeftRightDirection();
            this.setTopCurTitle();
        },            
    },
    watch: {
        /*anch2: function () {
            return this.$refs.anch2;
        }        */
    }    
}
</script>

<style lang="scss">
@import "../modules/theme.scss";

$menuHeight: 55px;

.menu-top{
    position: fixed;
    height: $menuHeight;
    z-index: 150;
    left: 0px;
    top: 0px;
    background: $gradient-ver-cl5-cl0;
    background-color: rgba($color: white, $alpha: 0.7);
    width: 100vw;
    //min-height: 8vh;
    //height: $menuHeight;
    //opacity: 0.95;
    box-shadow:-3px 3px 10px 0 #00000033;

    // **** vsm
    // Limit the width to 1024px and center
    .vsm-menu {
        margin: 1px;
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
            max-width: 50px;
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
        //z-index: 149;
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
        //z-index: 149;
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
    // **** vsm ---
}


.menu-top:hover{
    position: fixed;
    z-index: 150;
    left: 0px;
    top: 0px;
    background: $gradient-ver-cl5-cl0;
    background-color: rgba($color: white, $alpha: 0.9);
    width: 100vw;
    //min-height: 8vh;
    //height: $menuHeight;
    //opacity: 0.95;
    box-shadow:-3px 3px 20px 0 #00000066;
}



.titleWhenMainTitleHide{
    position: absolute;
    width: 30vw;
    //height: 50px;
    //margin: 0% auto;
    left: 0;
    right: 0;
    background: $color6-4;
    z-index: 140;
    top: $menuHeight;
    //border: 1px solid $color6-4;
    border-radius: 0px 0px 20px 0px;
    padding: 0.1vw;
    padding-left: 3vw;
    padding-right: 3vw;
    opacity: 0.6;
}




.mapViewer{
  //display: none;
  position: fixed;
  height: 90vh;// - $menuHeight;
  width:  43%;
  padding: 3vh;
  //top:  5vh;//$menuHeight;
  //right: 5vw;
  background: $color6-4;
  z-index: 10;
}



.b-sidebar{
  position: fixed;
  z-index: 155;
  .sidebar-content{
    min-width: 20vw;
  }
  .menu-list a.is-active{
    background-color: $color4;
  }
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

.vert-text {
  transform: rotate(180deg);
  writing-mode: vertical-lr;
}

.title-sub{
    font-size: 5vh;
    padding: 1vh;
    padding-left: 5vh;
    padding-right: 5vh;
}


.anchor-title{
    //color: red;
    //background-color: black;
    margin-top: -12vh !important;
    margin-bottom: 12vh !important;
    //padding-top: 100px !important;
    height: 0px;
    overflow: hidden;
    display: block;
    //opacity: 0;
}
.anchor{
    //color: red;
    //background-color: black;
    margin: 0px !important;
    padding: 0px !important;
    height: 0px;
    overflow: hidden;
    display: block;
    //opacity: 0;
}
.layer-bg{
    //position: absolute;
    //background-color: lightsteelblue;
}
.layer-bg-block{
    height: 100vh;
    width: 100vw;
    border: 1px solid black;
    font-size: 30vh;
    display: flex;
}
.layer-bg-block-context{
    margin: auto;
}
.layer-context{
  p {
    text-indent: 3vw; /* Отступ первой строки в пикселах */
   }
   opacity: 0.8;
   z-index: 101;
}

.loading{
    z-index: 300;
    position: fixed;
    left: 0px;
    top: 0px;
    height: 100vh;
    width: 100vw;
    background: $gradient-ver-cl1-cl4;
    opacity: 0.3;
    /*img{
        width: 10vw;
    }*/
}
</style>