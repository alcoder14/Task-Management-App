<template>
    <main>
        <BoardListDesktop :boardList="boardList" />
    </main>
</template>

<script>

import BoardListDesktop from '../Containers/BoardListDesktop.vue';

export default {
    name: "MainScreen",
    components:{
        BoardListDesktop
    },
    props:{
        boardList: Array
    }
}
</script>

<style lang="scss" scoped>
    @import "@/assets/style.scss";
    main{
        display: grid;
        grid-template-columns: 20% 80%;
    }
</style>