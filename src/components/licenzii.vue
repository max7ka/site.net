<template>
  <section>
    <div class="columns is-multiline">
      <div v-for="(doc, index) of docs" :key="index" class="column is-3">
        <div class="card lic-block" @click="showDoc(index)">
          <div class="lic-block-doc">
            <figure class="is-4by5">
              <pdf :src="'/files/' + doc.file" />
            </figure>
          </div>
          <div class="card-content">
            <div class="media">
              <!--div class="media-left">
                            <figure class="image is-48x48">
                            <img src="https://bulma.io/images/placeholders/96x96.png" alt="Placeholder image">
                            </figure>
                        </div-->
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
          title: "Выписка из реестра СРО «Инженер-Изыскатель»",
          file: "lic/cpo_1.pdf",
          pages: 2,
        },
        {
          title: "Выписка из реестра СРО «Инженер-Проектировщик»",
          file: "lic/cpo_2.pdf",
          pages: 2,
        },
        {
          title: "Сертификат «CERT INTERNATIONAL»",
          file: "lic/cert.pdf",
          pages: 1,
        },
        {
          title: "Выписка из реестра СРО «Инженер-Изыскатель»",
          file: "lic/cpo1.pdf",
          pages: 2,
        },
        {
          title: "Выписка из реестра СРО СПО «Роснефть»",
          file: "lic/cpo2.pdf",
          pages: 2,
        },
        {
          title: "Сертификат соответствия ISO 9001:2015",
          file: "lic/iso9001.pdf",
          pages: 3,
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
@import "../modules/theme.scss";
.card {
  height: 100%;
}
.lic-block {
}
.lic-block:hover {
  background: $gradient-ver-cl6-cl1;
  //padding: 3px;
  //opacity: 0.7;
  cursor: pointer;
}
.lic-block-doc {
  opacity: 0.8;
}
</style>