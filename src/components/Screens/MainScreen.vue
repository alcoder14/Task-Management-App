<template>
    <!-- Main Screen -->
    <main>
        <!-- Left column - board navigation -->
        <BoardListDesktop :boardList="boardList" class="left-column" />
        <!-- Right column - board tasks and menu -->
        <div class="right-column">
            <BoardMenu @ontaskadded="loadTasks" />
            <BoardTasks :tasks="taskStorage" v-if="this.taskStorage !== null" />
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
    props:{
        boardList: Array,
        selectedBoard: String
    },
    data(){
        return {
            taskStorage: null
        }
    },
    mounted(){
        this.loadTasks()
    },
    methods: {
        loadTasks(){
            console.log("Loading Tasks")
            this.taskStorage = JSON.parse(localStorage.getItem("TaskItems"))
            console.log(this.taskStorage)
        }
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