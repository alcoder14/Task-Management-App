<template>
    <nav class="navigation">
        <div class="left-side"> 
            <font-awesome-icon icon="fa fa-bars" class="burger-icon" @click="this.emitter.emit('showHiddenBoardList')" />
            <h1 class="board-title">{{ boardTitle }}</h1>
        </div>
        <button class="light-purple-btn" @click="toggleModal"> <font-awesome-icon icon="fa fa-plus" /> Add New Task</button>
    </nav>

    <AddTask v-if="addTaskVisible" @onclose="toggleModal" @ontaskadded="this.$emit('ontaskadded')" />
</template>

<script>

import AddTask from '../Modals/AddTask.vue'
import { useBoardStore } from '@/stores/boardStore'

export default {
    name: "BoardMenu",
    emits: ['ontaskadded'],
    components: {
        AddTask
    },
    data(){
        return {
            addTaskVisible: false,
            boardStore: useBoardStore(),
            boardTitle: ""
        }
    },
    mounted(){
        this.getCurrentBoard()
        this.emitter.on("updateBoardName", ()=>{
            this.getCurrentBoard()
        })
    },
    methods: {
        getCurrentBoard(){
            console.log("hello there")
            this.boardTitle = this.boardStore.getBoard
        },
        toggleModal(){
            this.addTaskVisible = !this.addTaskVisible
        }
    }
}
</script>

<style lang="scss" scoped>
    @import "@/assets/style.scss";
    .navigation{
        width: 100%;
        height: 10vh;
        padding: 20px 40px;
        color: $white;
        background-color: $dark;
        @include flex-row();
        align-items: center;
        justify-content: space-between;
        border-bottom: 1px solid $grey;
    }
    .left-side{
        @include flex-row();
        align-items: center;
        .burger-icon{
            font-size: 30px;
            cursor: pointer;
            margin-right: 20px;
            display: none;
        }
    }
    @media(max-width: 1675px){
        .left-side .burger-icon{
            display: block;
        }
    }
</style>