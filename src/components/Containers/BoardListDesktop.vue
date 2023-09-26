<template>
    <div class="boards-container">
        <div class="logo-container">
            <img src="../../assets/logo.png" alt="Logo">
        </div>
        <h2 class="board-number">All Boards ( {{ boardNumber }} )</h2>
        <button v-for="board in boardListCopy" :key="board" class="board-btn" @click="changeBoard(board)"><font-awesome-icon icon="fa-solid fa-table-cells-large" class="icon" /> {{ board }}
        </button>
        <button class="add-new-board-btn" @click="toggleAddBoardModal">
            <font-awesome-icon icon="fa-solid fa-table-cells-large" class="icon" /> 
            <div class="create-board-text">
                <font-awesome-icon icon="fa-solid fa-plus" class="icon" />
                Create new board
            </div>
        </button>
    </div>

    <AddBoard v-if="addBoardVisible" @onclosemodal="toggleAddBoardModal"/>
</template>

<script>

import { useBoardStore } from '@/stores/boardStore'
import AddBoard from '../Modals/AddBoard.vue'

export default {
    name: "BoardListDesktop",
    components: {
        AddBoard
    },
    props: {
        boardList: Array,
    },
    data(){
        return{
            boardNumber: Number,
            boardStore: useBoardStore(),
            boardListCopy: null,
            buttons: null,
            addBoardVisible: false
        }
    },
    mounted(){
        this.boardListCopy = this.boardList
        this.paintSelectedBtn(this.boardStore.getBoard)
        this.calculateBoardNumber()
    },
    methods: {
        calculateBoardNumber(){
            this.boardNumber = this.boardList.length
        },
        changeBoard(board){
            this.boardStore.updateSelectedBoard(board)

            // Refilter tasks when new board is selected and update board name in the menu

            this.emitter.emit("refilterTasks");
            this.emitter.emit("updateBoardName")

            this.paintSelectedBtn(board)
        },
        paintSelectedBtn(board){
            console.log(board)
            this.buttons = Array.from(document.querySelectorAll(".board-btn"))

            this.buttons.forEach(button => button.innerText === board ? button.classList.add("purple") : button.classList.remove("purple"))
        },
        toggleAddBoardModal(){
            this.addBoardVisible = !this.addBoardVisible
        }
    }
}
</script>

<style lang="scss" scoped>
    @import "@/assets/style.scss";
    .boards-container{
        background-color: $dark;
        border-right: 1px solid $grey;
        height: 100vh;
        @include flex-column();
        .logo-container{
            height: 10vh;
            @include flex-row();
            align-items: center;
            justify-content: flex-start;
            padding: 20px 40px;
        }
        .board-number{
            color: $white;
            margin: 30px 0 20px 34px;
        }

        .board-btn, .add-new-board-btn{
            border-radius: 60px;
            border-top-left-radius: 0;
            border-bottom-left-radius: 0;
            margin-bottom: 12px;
            width: 80%;
            font-size: 22px;
            padding: 14px 34px;
            background-color: $dark;
            display: flex;
            flex-direction: row;
        }
        .board-btn{
            color: $lightgrey;
            justify-content: flex-start;
            align-items: center;
            .icon{
                margin-right: 20px;
            }
        }
        .add-new-board-btn{
            justify-content: space-between;
            align-items: center;
            color: $light;
        }

        .purple {
            background-color: $light;
            color: $white;
        }
    }
</style>