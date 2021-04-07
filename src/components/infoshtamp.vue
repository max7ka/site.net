<template>
  <div class="page-stamp">
    <img
      :src="require('../assets/logo.png')"
      alt="ЮЖНИИГИПРОГАЗ"
      style="width: 60px; float:left; margin:auto; filter: grayscale(100%);"
    />

    <div style="float:left;margin-left:50px">
      <div>АО "ЮЖНИИГИПРОГАЗ"</div>
      <div>www.ungg</div>
      <div>тел/факс:</div>
      <div>email:</div>
    </div>

    <div style="clear: both;"></div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.page-stamp {
  display: none;
}
</style>