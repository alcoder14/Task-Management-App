<template>
    <div class="boards-container">
        <div class="logo-container">
        
        </div>
        <h2 class="board-number">All Boards ( {{ boardNumber }} )</h2>
        <button v-for="board in boardList" :key="board" class="board-btn" @click="changeBoard(board)"><font-awesome-icon icon="fa-solid fa-square" class="icon" /> {{ board }}
        </button>
    </div>
</template>

<script>

import { useBoardStore } from '@/stores/boardStore'

export default {
    name: "BoardListDesktop",
    props: {
        boardList: Array,
    },
    data(){
        return{
            boardNumber: Number,
            boardStore: useBoardStore()
        }
    },
    mounted(){
        this.calculateBoardNumber()
    },
    methods: {
        calculateBoardNumber(){
            this.boardNumber = this.boardList.length
        },
        changeBoard(board){
            this.boardStore.updateSelectedBoard(board)

            // Refilter tasks when board changes

            this.emitter.emit("refilter");
        }
    }
}
</script>

<style lang="scss" scoped>
    @import "@/assets/style.scss";
    .boards-container{
        background-color: $dark;
        height: 100vh;
        @include flex-column();
        .logo-container{
            height: 100px;
            @include flex-row();
            align-items: center;
            padding: 20px 40px;
        }
        .board-number{
            color: $white;
            margin: 0 0 20px 20px;
        }
        .board-btn{
            border-radius: 60px;
            border-top-left-radius: 0;
            border-bottom-left-radius: 0;
            margin-bottom: 12px;
            width: 80%;
            font-size: 25px;
            padding: 14px;
            background-color: $light;
            color: $white;
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
            align-items: center;
            .icon{
                margin-right: 20px;
            }
        }
    }
</style>