<template>
  <div>

      <div
        v-for="(wk, index) in works"
        :key="index"
        :id="'ref-'+index"
        v-on:mouseenter="refMouseOn(index)"
        v-on:mouseleave="refMouseOut(index)"
      >
        <div class="card">
          <!-- v-bind:class="classWorksByDevice(index)" -->
          <div class="card-image">
            <!--img :alt="`фото-${index}`" :src="`${wk.foto}`" /-->
            <img v-lazy="`${wk.foto}`" :alt="`фото-${index}`"/>
          </div>
          <div class="card-content">
            <div class="media">
              <div class="media-content">
                <p v-html="w(wk.year_begin + (wk.year_begin != wk.year_end ? '-' + wk.year_end : '') + ', '+wk.country)"/>
              </div>
            </div>
            <div class="content" v-html="w(wk.text)"></div>
          </div>
        </div>

        <!--div
          class="year has-text-weight-bold"
          v-show="
            index == 0 ||
            w.year_begin != works[index > 0 ? index - 1 : 0].year_begin
          "
        >
          {{ w.year_begin }} г.
        </div-->
      </div>
  </div>
</template>

<script>
import { w } from "../modules/theme.ts";

export default {
props:{
  showAll: {type:Boolean,default:false},
},    
data() {
    return {
      /*mapViewer:{
        title: "",
        attr: null,
      },*/
        razdel: ["Добыча и переработка газа", "Магистральный трубопроводный транспорт"],
        works: [
        { razdel: 1,
          visible: false,
          foto: require("../assets/images/work-1.jpg"),
          year_begin: 2017,
          year_end: 2017,
          country: "Россия",
          text: `Линейная часть, 2 нитка. Участок УКПГ-3-км 0,0 в составе стройки Система магистральных газопроводов Бованенково - Ухта`,
          coords: [54.6, 39.7],
          marker: {
            type: "polygon",
            coords: [[[54.6, 39.7], [54.61, 39.92], [54.52, 39.68]]],
          }
        },
        { razdel: 1,
          visible: false,
          foto: require("../assets/images/work-2.jpg"),
          year_begin: 2015,
          year_end: 2017,
          country: "Россия",
          text: `Газопровод внешнего транспорта с Новопортовского НГКМ`,
          coords: [55.6, 39.7],
          marker: {
            type: "polyline",
            coords: [[55.6, 39.7], [55.61, 39.92], [55.52, 39.68]],
          }
        },
        { razdel: 1,
          visible: false,
          foto: require("../assets/images/work-3.jpg"),
          year_begin: 2015,
          year_end: 2015,
          country: "Россия",
          text: `"КС-7 "Сынинская" КЦ-2" в составе стройки "Система магистральных газопроводов Бованенково-Ухта`,
          coords: [45.038344, 37.783213],
          marker: null,
        },
        { razdel: 1,
          visible: false,
          foto: require("../assets/images/work-4.jpg"),
          year_begin: 2013,
          year_end: 2013,
          country: "Венгрия",
          text: `Инвестиционный проект на венгерский участок газопровода "Южный поток"`,
          coords: [46.038344, 37.783213],
          marker: null,
        },
        { razdel: 1,
          visible: false,
          foto: require("../assets/images/work-5.jpg"),
          year_begin: 2011,
          year_end: 2012,
          country: "Россия",
          text: `Компрессорные станции МГ Ухта-Торжок I нитка`,
          coords: [47.038344, 37.783213],
          marker: null,
        },
        { razdel: 1,
          foto: require("../assets/images/work-5.jpg"),
          year_begin: 2011,
          year_end: 2014,
          country: "Болгария",
          text: `Проект "Южный поток" на территории Республики Болгария`,
          coords: [48.038344, 37.783213],
          marker: null,
        },
        { razdel: 1,
          foto: require("../assets/images/work-5.jpg"),
          year_begin: 2011,
          year_end: 2013,
          country: "Россия",
          text: `Магистральный газопровод Якутия-Хабаровск–Владивосток. Участок Чаянда-Ленск`,
          coords: [49.038344, 37.783213],
          marker: null,
        },
        { razdel: 1,
          foto: require("../assets/images/work-5.jpg"),
          year_begin: 2011,
          year_end: 2013,
          country: "Россия",
          text: `Реконструкция системы газопроводов Игрим-Серов, Надым–Пунга-Н. Тура III, СРТО-Урал II`,
          coords: [50.038344, 37.783213],
          marker: null,
        },
        { razdel: 1,
          foto: require("../assets/images/work-5.jpg"),
          year_begin: 1970,
          year_end: 2012,
          country: "Россия, Украина",
          text: `Строительство, реконструкция и техническое перевооружение магистральных компрессорных станций (более 300 объектов)`,
          coords: [43.038344, 38.783213],
          marker: null,
        },
        { razdel: 1,
          foto: require("../assets/images/work-5.jpg"),
          year_begin: 2007,
          year_end: 2012,
          country: "Россия",
          text: `Магистральный газопровод Бованенково - Ухта (северный участок) (Dу 1400, Ру 11,8 МПа, L= 1040 км)`,
          coords: [43.038344, 39.783213],
          marker: null,
        },
        { razdel: 1,
          foto: require("../assets/images/work-5.jpg"),
          year_begin: 1995,
          year_end: 2012,
          country: "Россия",
          text: `Реконструкция и техническое перевооружение объектов магистрального транспорта газа`,
          coords: [43.038344, 40.783213],
          marker: null,
        },        
        { razdel: 1, foto: null,
          year_begin: 1995, year_end: 2012,
          country: "Россия", text: `МГ СРТО – Торжок (Dу 1400, Ру 7,4 МПа, L= 2675 км)`,
          coords: [43.038344, 40.783213], marker: null,},
        { razdel: 1, foto: null,
          year_begin: 2000, year_end: 2002,
          country: "Россия", text: `ТЭО строительства газопровода с Ковыктинского ГКМ в Иркутской области РФ в КНР, I и II нитки (Dу 1200, Ру 7,4 МПа, L= 3880 км)`,
          coords: [43.038344, 40.783213], marker: null,},
        { razdel: 1, foto: null,
          year_begin: 1985, year_end: 1998,
          country: "Россия, Украина", text: `АГНКС для использования сжатого природного газа в качестве моторного топлива`,
          coords: [43.038344, 40.783213], marker: null,},
        { razdel: 1, foto: null,
          year_begin: 1980, year_end: 1997,
          country: "Россия", text: `МГ Ямбург – Елец, I и II нитки (Dу 1400, Ру 7,4 МПа, L= 6300 км)`,
          coords: [43.038344, 40.783213], marker: null,},
        { razdel: 1, foto: null,
          year_begin: 1975, year_end: 1997,
          country: "Россия", text: `МГ СРТО – Нечерноземье, I и II нитки (Dу 1400, Ру 7,4 МПа, L= 5355 км)`,
          coords: [43.038344, 40.783213], marker: null,},
        { razdel: 1, foto: null,
          year_begin: 1975, year_end: 1990,
          country: "Россия, Украина", text: `Магистральный газопровод Ямбург - Западные районы СССР (Dу 1400, Ру 7,4 МПа, L= 4584 км)`,
          coords: [43.038344, 40.783213], marker: null,},
        { razdel: 1, foto: null,
          year_begin: 1975, year_end: 1997,
          country: "Россия, Украина", text: `Магистральный газопроводУренгой – Помары – Ужгород (Dу 1400, Ру 7,4 МПа, L 4454 км)`,
          coords: [43.038344, 40.783213], marker: null,},
        { razdel: 1, foto: null,
          year_begin: 1975, year_end: 1997,
          country: "Россия", text: `МГ Уренгой – Центр, I и II нитки (Dу 1400, Ру 7,4 МПа, L= 6058 км)`,
          coords: [43.038344, 40.783213], marker: null,},
        { razdel: 1, foto: null,
          year_begin: 1975, year_end: 1997,
          country: "Россия", text: `Магистральный газопровод Уренгой – Сургут – Челябинск, I и II нитки (Dу1400, Ру 7,4 МПа, L= 3560 км)`,
          coords: [43.038344, 40.783213], marker: null,},
        { razdel: 1, foto: null,
          year_begin: 1970, year_end: 1983,
          country: "Россия", text: `Многониточная газотранспортная система МГ СРТО – Урал (Dу 1200 и 1400, Ру 7,4 МПа, L= 9650 км)`,
          coords: [43.038344, 40.783213], marker: null,},
        //42
        { razdel: 0, foto: null,
          year_begin: 2017, year_end: 2017,
          country: "Россия", text: `Разработка рабочей документации по объектам Яракта-1,2 и Марково`,
          coords: [43.038344, 40.783213], marker: null,},
        { razdel: 0, foto: null,
          year_begin: 2017, year_end: 2017,
          country: "Россия", text: `Обустройство Лодочного месторождения. Газокомпрессорная станция с газопроводом до точки врезки в межпромысловый газопровод "Тагул-Ванкор"`,
          coords: [43.038344, 40.783213], marker: null,},
        { razdel: 0, foto: null,
          year_begin: 2017, year_end: 2017,
          country: "Россия", text: `Комплекс объектов по компримированию и подготовке газа и конденсата. Установка извлечения и транспорта конденсата`,
          coords: [43.038344, 40.783213], marker: null,},
        { razdel: 0, foto: null,
          year_begin: 2017, year_end: 2017,
          country: "Россия", text: `Обустройство юрских залежей Западно-Юрхаровского ГКМ. Куст скважин №1`,
          coords: [43.038344, 40.783213], marker: null,},
        { razdel: 0, foto: null,
          year_begin: 2017, year_end: 2017,
          country: "Россия", text: `Техническое перевооружение объектов Термокарстового ГКМ`,
          coords: [43.038344, 40.783213], marker: null,},
        { razdel: 0, foto: null,
          year_begin: 2016, year_end: 2017,
          country: "Россия", text: `Усть-Кутский ГПЗ. Технологическая площадка`,
          coords: [43.038344, 40.783213], marker: null,},
        { razdel: 0, foto: null,
          year_begin: 2015, year_end: 2017,
          country: "Россия", text: `Терминал по производству и перегрузке сжиженного природного газа в порту Высоцк Ленинградской области производительностью 660 тыс. тонн сжиженного природного газа в год`,
          coords: [43.038344, 40.783213], marker: null,},
        { razdel: 0, foto: null,
          year_begin: 2015, year_end: 2015,
          country: "Россия", text: `Обустройство газовой залежи Тэрельского газоконденсатного месторождения (пласт Т)`,
          coords: [43.038344, 40.783213], marker: null,},
        { razdel: 0, foto: null,
          year_begin: 2015, year_end: 2015,
          country: "Россия", text: `Обустройство Западно- и Восточно-Мессояхского месторождений, внешний транспорт попутного и природного газа с учетом синергии с Минховским месторождением ОАО "НК "Роснефть"`,
          coords: [43.038344, 40.783213], marker: null,},
        { razdel: 0, foto: null,
          year_begin: 2014, year_end: 2014,
          country: "Россия", text: `Обустройство месторождений Кынско-Часельского лицензионного участка`,
          coords: [43.038344, 40.783213], marker: null,},
        { razdel: 0, foto: null,
          year_begin: 2014, year_end: 2014,
          country: "Россия", text: `Обустройство Коптевского месторождения`,
          coords: [43.038344, 40.783213], marker: null,},
        { razdel: 0, foto: null,
          year_begin: 2013, year_end: 2013,
          country: "Россия", text: `Амурский газоперерабатывающий завод`,
          coords: [43.038344, 40.783213], marker: null,},
        { razdel: 0, foto: null,
          year_begin: 2013, year_end: 2013,
          country: "Россия", text: `Обустройство газоконденсатных залежей Черничного нефтегазоконденсатного месторождения`,
          coords: [43.038344, 40.783213], marker: null,},
        { razdel: 0, foto: null,
          year_begin: 2013, year_end: 2013,
          country: "Россия", text: `Обустройство объектов добычи и подготовки сеноманского газа Юрхаровского месторождения`,
          coords: [43.038344, 40.783213], },
        { razdel: 0, foto: null,
          year_begin: 2013, year_end: 2013,
          country: "Россия", text: `Завод СПГ на Дальнем Востоке РФ`,
          coords: [43.038344, 40.783213], },
        { razdel: 0, foto: null,
          year_begin: 2013, year_end: 2013,
          country: "Россия", text: `Установка деэтанизации конденсата Северо-Уренгойского месторождения`,
          coords: [43.038344, 40.783213], },
        { razdel: 0, foto: null,
          year_begin: 2012, year_end: 2012,
          country: "Россия", text: `Реконструкция I и II очередей Астраханского газового комплекса (АГК), как единого промышленного объекта`,
          coords: [43.038344, 40.783213], },
        { razdel: 0, foto: null,
          year_begin: 2011, year_end: 2013,
          country: "Россия", text: `Дожимная компрессорная станция на объединенном береговом технологическом комплексе (проект "Сахалин-2")`,
          coords: [43.038344, 40.783213], },
        { razdel: 0, foto: null,
          year_begin: 1995, year_end: 2013,
          country: "Россия", text: `Обустройство Ямсовейского НГКМ`,
          coords: [43.038344, 40.783213], },
        { razdel: 0, foto: null,
          year_begin: 2010, year_end: 2017,
          country: "Россия", text: `Обустройство ачимовских отложений Уренгойского месторождения Самбургского лицензионного участка`,
          coords: [43.038344, 40.783213], },
        { razdel: 0, foto: null,
          year_begin: 2010, year_end: 2012,
          country: "Россия", text: `Газохимический комплекс с выделением гелия из газа Чаяндинского НГКМ`,
          coords: [43.038344, 40.783213], },
        { razdel: 0, foto: null,
          year_begin: 2010, year_end: 2017,
          country: "Россия", text: `Обустройство валанжинских залежей Самбургского месторождения`,
          coords: [43.038344, 40.783213], },
        { razdel: 0, foto: null,
          year_begin: 2010, year_end: 2017,
          country: "Россия", text: `Строительство комплекса по добыче, подготовке, сжижению газа, отгрузке СПГ и газового конденсата Южно-Тамбейского ГКМ`,
          coords: [43.038344, 40.783213], },
        { razdel: 0, foto: null,
          year_begin: 2010, year_end: 2010,
          country: "Россия", text: `Обустройство Ванкорской группы месторождений`,
          coords: [43.038344, 40.783213], },
        { razdel: 0, foto: null,
          year_begin: 2010, year_end: 2012,
          country: "Россия", text: `Комплексное освоение Штокмановского ГКМ. Фаза I. Береговые объекты. Комплекс УКПГ`,
          coords: [43.038344, 40.783213], },
        { razdel: 0, foto: null,
          year_begin: 2003, year_end: 2013,
          country: "Россия", text: `Пуровский завод по переработке газового конденсата`,
          coords: [43.038344, 40.783213], },
        { razdel: 0, foto: null,
          year_begin: 2002, year_end: 2014,
          country: "Россия", text: `Обустройство Ханчейского ГКМ`,
          coords: [43.038344, 40.783213], },
        { razdel: 0, foto: null,
          year_begin: 2001, year_end: 2013,
          country: "Россия", text: `Обустройство Южно-Русского НГМ`,
          coords: [43.038344, 40.783213], },
        { razdel: 0, foto: null,
          year_begin: 1999, year_end: 2013,
          country: "Россия", text: `Обустройство Анерьяхинской и Харвутинской площадей Ямбургского НГКМ`,
          coords: [43.038344, 40.783213], },
        { razdel: 0, foto: null,
          year_begin: 1998, year_end: 1999,
          country: "Россия", text: `Обустройство Восточно-Таркосалинского ГКМ`,
          coords: [43.038344, 40.783213], },
        { razdel: 0, foto: null,
          year_begin: 1980, year_end: 2013,
          country: "Россия", text: `Обустройство Ямбургского НГКМ`,
          coords: [43.038344, 40.783213], marker: null,},                                                                                                                                
        { razdel: 0, foto: null,
          year_begin: 1980, year_end: 2013,
          country: "Россия", text: `Астраханский ГПЗ`,
          coords: [43.038344, 40.783213], marker: null,},                                                                                                                                
        { razdel: 0, foto: null,
          year_begin: 1980, year_end: 2013,
          country: "Россия", text: `Обустройство Астраханского ГКМ`,
          coords: [43.038344, 40.783213], marker: null,},                                                                                                                                
        { razdel: 0, foto: null,
          year_begin: 1980, year_end: 1997,
          country: "Казахстан", text: `Обустройство Карачаганакского ГКМ`,
          coords: [43.038344, 40.783213], marker: null,},                                                                                                                                
        { razdel: 0, foto: null,
          year_begin: 1980, year_end: 1985,
          country: "Россия", text: `Обустройство Вынгапуровского газоконденсатного месторождения`,
          coords: [43.038344, 40.783213], marker: null,},                                                                                                                                
        { razdel: 0, foto: null,
          year_begin: 1979, year_end: 2008,
          country: "Россия", text: `Обустройство газоконденсатных месторождений полуострова Ямал`,
          coords: [43.038344, 40.783213], marker: null,},                                                                                                                                
        { razdel: 0, foto: null,
          year_begin: 1970, year_end: 2009,
          country: "Россия", text: `Оренбургский гелиевый завод`,
          coords: [43.038344, 40.783213], marker: null,},                                                                                                                                
        { razdel: 0, foto: null,
          year_begin: 1970, year_end: 2010,
          country: "Россия", text: `Оренбургский ГПЗ`,
          coords: [43.038344, 40.783213], marker: null,},                                                                                                                                
        { razdel: 0, foto: null,
          year_begin: 1970, year_end: 2013,
          country: "Россия", text: `Пункт сбора, стабилизации и налива конденсата на железнодорожной станции “Селещина” и Головные сооружения по подготовке газа на межпромысловой ГРС “Солоха” (Полтавская область). `,
          coords: [43.038344, 40.783213], marker: null,},                                                                                                                                
        { razdel: 0, foto: null,
          year_begin: 1970, year_end: 1974,
          country: "Россия", text: `Нижневартовский завод по переработке попутного нефтяного газа`,
          coords: [43.038344, 40.783213], marker: null,},
        { razdel: 0, foto: null,
          year_begin: 1970, year_end: 2013,
          country: "Россия", text: `Обустройство Медвежьего НГКМ`,
          coords: [43.038344, 40.783213], marker: null,},
        { razdel: 0, foto: null,
          year_begin: 1960, year_end: 1999,
          country: "Украина", text: `Обустройство Машевского, Локачинского, Крестищенского, Ланновского, Мелиховского, Яблуновского, Муратовского и Байракского газоконденсатных месторождений (Харьковская, Львовская, Полтавская, Луганская и Днепропетровская области.)`,
          coords: [43.038344, 40.783213], marker: null,},                                                                                                                                            
                                                                                                                                               
      ],        
    }
},
mounted(){
    setTimeout(() => {
          this.$emit("onupdate");
    }, 2000);
},
updated(){
},
methods:{
    w: function(text){
      return w(text);
    },  
    /*getHeightPx: function (hvh) {
      return (hvh * this.getWindowHeight()) / 100;
    },
    getWindowHeight: function () {
      return document.documentElement.clientHeight;
    }, */   
    /*showMapViewer(params){
        var object = document.getElementById("mapViewer");
        var top = params.top;
        //var menuH = this.getHeightPx(this.menuHeight);
        //if (top<menuH) top=menuH;
        //if (top+params.height > this.getWindowHeight()) top=this.getWindowHeight() - params.height;
        object.style.top = top+"px";
        object.style.left = params.left+"px";
        object.style.width = params.width+"px";
        object.style.height = params.height+"px";
        this.mapViewer.title = params.title;
    }, */   
    refMouseOn: function(index){
        //var html = document.documentElement;
        //var body = document.body;
        //var scrollTop = html.scrollTop || body && body.scrollTop || 0;
        var object = document.getElementById("ref-"+index);
        var rect = object.getBoundingClientRect();
        //console.log("on "+index);
        //console.log(rect);
        //console.log(object.offsetTop);
        //console.log(scrollTop);
        //this.showMap(rect.x,rect.y);
        this.$emit("onshowMapViewer",{
            left: (rect.x+rect.width/2),
            top: (rect.y<100? 100 : rect.y),
            width: (rect.width/2),
            height: (rect.height),
            title: this.works[index].text,
            show: true,
            position: "ref-"+index,
            coords: this.works[index].coords,
            marker: this.works[index].marker,
        });
        /*this.showMapViewer(
            {
            left: (rect.width/2),//(rect.x+rect.width/2),
            top: object.offsetTop,//(rect.y<100? 100 : rect.y),
            width: (rect.width/2),
            height: (rect.height),
            title: this.works[index].text,
            }            
        );*/
    },
    refMouseOut: function(index){
        console.log("out "+index);
        /*this.$emit("onshowMapViewer",{
            left: 0,
            top: 0,
            width: 0,
            height: 0,
            title: "",
            show: false,
        });*/
    },
    /*showMap: function(x,y){
        var object = document.getElementById("refMap");
        object.style.top = x+"px";
        object.style.left = y+"px";
    }*/
}
}
</script>

<style lang="scss" scoped>
@import "../modules/theme.scss";

.card{
    width: 50%;
    height: 90%;
    padding: 30px;
}

</style>