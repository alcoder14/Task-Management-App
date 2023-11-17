<template>
    <div class="board-tasks-management-layout" v-if="currentBoard !== undefined">
        <div class="board-column-switch">
            <button @click="toggleColumns('todo')" class="btn btn-todo" :class="{'selected': this.active_column === 'todo', 'unselected': this.active_column !== 'todo'}">Todo</button>

            <button @click="toggleColumns('doing')" class="btn btn-doing" :class="{'selected': this.active_column === 'doing', 'unselected': this.active_column !== 'doing'}">Doing</button>

            <button @click="toggleColumns('done')" class="btn btn-done" :class="{'selected': this.active_column === 'done', 'unselected': this.active_column !== 'done'}">Done</button>
        </div>
        <div class="tasks-layout">
            <TaskColumn category="TODO" circleColor="blue" :tasks="todoTasks" :tasksNumber="todoTasks.length" v-if="todoTasks !== null && show_todo" />
            <TaskColumn category="DOING" circleColor="purple" :tasks="doingTasks" :tasksNumber="doingTasks.length" v-if="doingTasks !== null && show_doing" />
            <TaskColumn category="DONE" circleColor="green" :tasks="doneTasks" :tasksNumber="doneTasks.length" v-if="doneTasks !== null && show_done" />
        </div>
    </div>
    <NoBoards @click="toggleAddBoardModal" v-else />

    <AddBoard v-if="addBoardVisible" @onclosemodal="toggleAddBoardModal" @boardadded="emitRefreshBoardList" /> 
</template>

<script>

import TaskColumn from './TaskColumn.vue';
import AddBoard from '../Modals/AddBoard.vue';
import { useBoardStore } from '../../stores/boardStore'
import NoBoards from '../Elements/NoBoards.vue';
 
export default {
    components: {
    TaskColumn,
    AddBoard,
    NoBoards
},
    data(){
        return{
            allTasks: [],
            currentBoard: null,
            todoTasks: null,
            doingTasks: null,
            doneTasks: null,
            boardStore: useBoardStore(),
            show_todo: true,
            show_doing: true,
            show_done: true,
            active_column: "todo",
            addBoardVisible: false
        }

    },
    mounted(){
        this.getCurrentBoard()
        this.getAllTasks()
        this.sortTasks()

        this.emitter.on("refilterTasks", ()=>{
            console.log("Refiltering")
            this.getCurrentBoard()
            this.getAllTasks()
            this.sortTasks()
        })

        this.toggleView()
        window.addEventListener("resize", this.toggleView)
    },
    methods: {
        getCurrentBoard(){
            this.currentBoard = this.boardStore.getBoard
            console.log("Current board is " + this.currentBoard)
        },
        getAllTasks(){
            this.allTasks = JSON.parse(localStorage.getItem("TaskItems"));
            console.log(this.allTasks)
            console.log(this.allTasks.length)
        },
        sortTasks(){
            this.todoTasks = this.allTasks.filter(task => task.status === 'todo' && task.board === this.currentBoard)
            this.doingTasks = this.allTasks.filter(task => task.status === 'doing' && task.board === this.currentBoard)
            this.doneTasks = this.allTasks.filter(task => task.status === 'done' && task.board === this.currentBoard)
        },

        // Hide "doing" and "done" columns if screen width is less than number specified
        // Show all columns when width is more than number specified
        toggleView(){
            if(window.innerWidth <= 768){
                this.show_todo = true
                this.show_doing = false
                this.show_done = false
            } else {
                this.active_column = "todo"
                this.show_todo = true
                this.show_doing = true
                this.show_done = true
            }
        },
        // Switch between different columns
        toggleColumns(column){
            if(column === "todo"){
                this.active_column = "todo"
                this.show_todo = true
                this.show_doing = false
                this.show_done = false
            } else if( column === "doing"){
                this.active_column = "doing"
                this.show_todo = false
                this.show_doing = true
                this.show_done = false
            } else {
                this.active_column = "done"
                this.show_todo = false
                this.show_doing = false
                this.show_done = true
            }
        },

        toggleAddBoardModal(){
            this.addBoardVisible = !this.addBoardVisible
            console.log(this.addBoardVisible)
        },
        emitRefreshBoardList(value){
            this.emitter.emit("refreshBoardList", value)
            this.toggleAddBoardModal()
        }
    }
}
</script>

<style lang="scss" scoped>
    @import "@/assets/style.scss";

    .tasks-layout{
        min-height: 90vh;
        width: 100%;
        background-color: $darkest;
        padding: 30px;
        display: grid;
        grid-template-columns: repeat(3, 31%);
        justify-content: space-between;

    }
    .board-column-switch{
        display: none;
        grid-template-columns: repeat(3, 33%);
        background-color: $darkest;
        padding: 30px 30px 0 30px;
        .btn{
            background-color: $dark;
            color: $white;
        }
        .btn-todo{
            border-top-right-radius: 0;
            border-bottom-right-radius: 0;
        }
        .btn-doing{
            border-radius: 0;
        }
        .btn-done{
            border-top-left-radius: 0;
            border-bottom-left-radius: 0;
        }
    }
    .selected{
        background-color: $light !important;
    }
    .unselected{
        background-color: $darkest !important;
    }

    @media(max-width: 1000px){
        .tasks-layout{
            min-height: 92vh;
        }
    }
    @media(max-width: 768px){
        .tasks-layout{
            grid-template-columns: 100%;
        }
        .board-column-switch{
            display: grid;
        }
    }
</style>