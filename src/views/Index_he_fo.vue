<template>
    <div class='header-main-footer'>
        <header>header</header>
        <main>main</main>
        <footer>footer</footer>
    </div>  
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
@import "../modules/theme.scss";

$header-height: 10vh;
$footer-height: 10vh;

.header-main-footer {
  display: flex;
  min-height: 100vh;
  flex-direction: column;
}

header{
    background: darkkhaki;
    height: $header-height;
}
main{
    background: lightcyan;
    overflow-y: scroll;
}
footer{
    background: darkgrey;
    height: $footer-height;
}

main {
  flex: 1;
}

.top-section{

}

.middle-section{

}

.footer-section{

}
</style>