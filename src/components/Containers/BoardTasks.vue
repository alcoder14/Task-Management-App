<template>
  <main class="tasks-layout">
    <TaskColumn category="TODO" circleColor="blue" :tasks="todoTasks" :tasksNumber="todoTasks.length" v-if="todoTasks !== null" />
    <TaskColumn category="DOING" circleColor="purple" :tasks="doingTasks" :tasksNumber="doingTasks.length" v-if="doingTasks !== null" />
    <TaskColumn category="DONE" circleColor="green" :tasks="doneTasks" :tasksNumber="doneTasks.length" v-if="doneTasks !== null" />
  </main>
</template>

<script>

import TaskColumn from './TaskColumn.vue';
import { useBoardStore } from '../../stores/boardStore'
 
export default {

    components: {
        TaskColumn
    },
    props: {
        tasks: Array
    },
    data(){
        return{
            allTasks: [],
            currentBoard: null,
            todoTasks: null,
            doingTasks: null,
            doneTasks: null,
            boardStore: useBoardStore()
        }
    },
    mounted(){
        this.getCurrentBoard()
        this.allTasks = this.tasks
        this.sortTasks()

        this.emitter.on("refilter", ()=>{
            this.getCurrentBoard()
            this.sortTasks()
        })
    },
    methods: {
        getCurrentBoard(){
            this.currentBoard = this.boardStore.getBoard
            console.log(this.currentBoard)
        },
        sortTasks(){
            this.todoTasks = this.allTasks.filter(task => task.status === 'todo' && task.board === this.currentBoard)
            this.doingTasks = this.allTasks.filter(task => task.status === 'doing' && task.board === this.currentBoard)
            this.doneTasks = this.allTasks.filter(task => task.status === 'done' && task.board === this.currentBoard)
        }
    }
}
</script>

<style lang="scss" scoped>
    @import "@/assets/style.scss";
    .tasks-layout{
        height: 90vh;
        width: 100%;
        background-color: $darkest;
        padding: 30px;
        display: grid;
        grid-template-columns: repeat(3, 31%);
        justify-content: space-between;

    }
</style>