<template>
    <div class="column">
        <header>
            <div class="circle" :class="circleColor"></div>
            <h1 class="task-category">{{ category }} ( {{ tasksNumber }} )</h1>
            <button class="light-purple-btn clear-btn" @click="clearDoneTasks" v-if="category === 'DONE'" >Clear</button>
        </header>
        <div v-if="tasks.length > 0">
            <TaskCard v-for="task in tasks" :key="task.title" :taskData="task" />
        </div>
        <NoTasks v-else />
    </div>
</template>

<script>
import TaskCard from '../Elements/TaskCard.vue';
import NoTasks from '../Elements/NoTasks.vue';

import { useBoardStore } from '@/stores/boardStore';

export default {
    components: {
        TaskCard,
        NoTasks
    },
    props: {
        circleColor: String,
        category: String,
        tasks: Array,
        tasksNumber: Number,
    },
    data(){
        return{
            allTasks: null,
            boardStore: useBoardStore()
        }
    },
    methods: {
        clearDoneTasks(){
            this.allTasks = JSON.parse(localStorage.getItem("TaskItems"))
            console.log(this.allTasks)
            this.allTasks = this.allTasks.filter(task => task.board !== this.boardStore.getBoard || task.status !== "done")
            console.log(this.allTasks)

            localStorage.setItem("TaskItems", JSON.stringify(this.allTasks))

            this.emitter.emit("refilterTasks")
        }
    }
}
</script>

<style lang="scss" scoped>
    @import "@/assets/style.scss";

    header{
        @include flex-row();
        align-items: center;
    }
    .task-category{
        color: white;
        font-size: 22px;
    }
    .circle{
        height: 22px;
        width: 22px;
        border-radius: 50%;
        margin-right: 15px;
    }
    .blue{
        background-color: #49c4e5;
    }
    .purple{
        background-color: $light;
    }
    .green{
        background-color: #68dfb1;
    }
    .clear-btn{
        padding: 4px 8px;
        font-size: 15px;
        margin-left: 10px;
    }
</style>