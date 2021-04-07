<template>
  <section>about
      <div><Lorem add="2p"/></div>
  </section>
</template>

<script>
import Lorem from "vue-lorem-ipsum";
export default {
props: {
    progresScroll: Number
},
components: {
    Lorem,
  },
}
</script>

<style lang="scss" scoped>
section{
    background: lightsalmon;
}
</style>