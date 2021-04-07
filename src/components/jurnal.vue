<template>
  <section>
    <!--div style="height:1500px"></div-->
    <div class="columns is-multiline">
      <div v-for="(doc, index) of docs" :key="index" class="column is-3">
        <div class="card doc-block" @click="showDoc(index)">
          <div class="doc-block-doc">
            <figure class="is-4by5">
              <pdf :src="'/files/' + doc.file" />
            </figure>
          </div>
          <div class="card-content">
            <div class="media">

              <div class="media-content">
                <div class="title is-6 has-text-centered">{{ doc.title }}</div>
              </div>
            </div>

            <div class="content"></div>
          </div>
        </div>
      </div>
    </div>      
  </section>
</template>

<script>
import pdf from "vue-pdf";
export default {
components: {
    pdf,
  },
  methods: {
    showDoc(index) {
      this.$emit("onshowDocument", this.docs[index]);
      //this.selDoc = this.docs[index];
      //console.log(this.selDoc);
      //this.showModal = true;
    },
  },
  data() {
    return {
      //selDoc: null,
      //showModal: false,
      docs: [
        {
          title: "Бизнес и Класс № 1, 2016 г. ПАО «ЮЖНИИГИПРОГАЗ» — надежный партнер ЗАО «РОСПАН ИНТЕРНЕШНЛ»",
          file: "jurnal/bk1_2016.pdf",
          pages: 1,
        },
        {
          title: "Деловая Россия № 7–8 2017 г. Стратегический газовый проект на Ямале",
          file: "jurnal/delrus78_2017.pdf",
          pages: 2,
        },
        {
          title: "Деловая Россия № 7–8 2018 г. «Севернефтегазпром»: открывая новую эпоху в развитии российской газодобычи",
          file: "jurnal/DelRus_2_SEV.pdf",
          pages: 2,
        },
        {
          title: "Бизнес и Класс № 10–11, 2015 г. Курс — на развитие!",
          file: "jurnal/bk1011_2015.pdf",
          pages: 1,
        },
        {
          title: "Деловая Россия № 7–8 2018 г. «ЮЖНИИГИПРОГАЗ: от смелости замыслов к профессионализму воплощения»",
          file: "jurnal/DelRus_1.pdf",
          pages: 6,
        },
        {
          title: "ТСР № 4–5 2018 г. «ЮЖНИИГИПРОГАЗ»: 85 лет в авангарде нефтегазовых строек",
          file: "jurnal/tsr8518.pdf",
          pages: 1,
        },
        {
          title: "Бизнес и Класс № 7–8, 2015 г. «ЮЖНИИГИПРОГАЗ» — надежный партнер «НОВАТЭКа»",
          file: "jurnal/bk78_2015.pdf",
          pages: 1,
        },
      ],
    };
  },  
}
</script>

<style lang="scss" scoped>
@import "../modules/theme.scss";
.card {
  height: 100%;
}
.doc-block {
}
.doc-block:hover {
  background: $gradient-ver-cl6-cl1;
  //padding: 3px;
  //opacity: 0.7;
  cursor: pointer;
}
.doc-block-doc {
  opacity: 0.8;
}
</style>