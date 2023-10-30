<template>
    <div class="modal-container" @click="closeModal($event)">
        <form class="modal-window"> 
            <div class="upper-row-container">
                <h1 class="modal-title">Add New Board</h1>
                <button class="close-btn" @click="this.$emit('onclosemodal')"><font-awesome-icon icon="fa fa-xmark" /></button>
            </div>
            <div class="error-message" v-if="errorMessage !== null">
                <p>{{ errorMessage }}</p>
            </div>
            <input type="text" style="margin-bottom: 20px;" placeholder="Board Name" class="board-name-input" v-model="inputText">
            <button class="white-btn" @click="saveBoard(inputText)">Confirm</button>
        </form>
    </div>
</template>

<script>

import { useBoardStore } from "@/stores/boardStore";
import { formatDate } from "@/CustomJS/methods";

export default {
    name: "AddBoard",
    data(){
        return{
            inputText: "",
            boardList: null,
            boardStore: useBoardStore(),
            boardData: {
                name: "",
                date: null,
                time: null
            },
            errorMessage: null
        }
    },
    methods: {
        closeModal(event){
            if(event.target === event.currentTarget){
                this.$emit("onclosemodal")
            }
            
        },
        saveBoard(value){

            this.errorMessage = null

            this.boardList = JSON.parse(localStorage.getItem("boards"))

            this.boardList.forEach((board) => {
                if(board.name === value){
                    this.errorMessage = "Board with this name already exists";
                }
            })

            if(this.errorMessage !== null) return;

            this.boardData.name = value
            this.boardData.date = formatDate(new Date())
            this.boardData.time = new Date().toLocaleTimeString()

            this.boardList.push(this.boardData)
            localStorage.setItem("boards", JSON.stringify(this.boardList))


            // Set new board to store and signal it to other components
            this.boardStore.updateSelectedBoard(value)
            this.$emit("boardadded", value)
        }
    }
}
</script>

<style lang="scss" scoped>
    @import "@/assets/style.scss";
    .upper-row-container{
        @include flex-row();
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
    }
    .error-message{
        width: 75%;
        background-color: rgb(177, 48, 48);
        color: $white;
        padding: 5px;
        border-radius: 4px;
        margin-bottom: 10px;
    }
</style>