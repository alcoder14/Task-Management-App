<template>
    <!-- Main Screen -->
    <main>
        <!-- Left column - board navigation -->
        <BoardListDesktop class="left-column" />
        <!-- Right column - board tasks and menu -->
        <div class="right-column">
            <BoardMenu/>
            <BoardTasks/>
        </div>
    </main>
</template>

<script>

import BoardListDesktop from '../Containers/BoardListDesktop.vue';
import BoardMenu from '../Containers/BoardMenu.vue';
import BoardTasks from '../Containers/BoardTasks.vue';

export default {
    name: "MainScreen",
    components:{
        BoardListDesktop,
        BoardMenu,
        BoardTasks
    },
}
</script>

<style lang="scss" scoped>
    @import "@/assets/style.scss";
    main{
        display: grid;
        grid-template-columns: 20% 80%;
    }
    @media(max-width: 1675px){
        main{
            grid-template-columns: 100%;
        }
    }
</style>