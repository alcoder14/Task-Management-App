<template>
    <div class="modal-container" @click="closeModal($event)">
        <form class="modal-window"> 
            <div class="upper-row-container">
                <h1 class="modal-title">Add New Board</h1>
                <button class="close-btn" @click="this.$emit('onclosemodal')"><font-awesome-icon icon="fa fa-xmark" /></button>
            </div>
            <input type="text" style="margin-bottom: 20px;" placeholder="Board Name" class="board-name-input" v-model="inputText">
            <button class="white-btn" @click="confirm(inputText)">Confirm</button>
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
            }
        }
    },
    methods: {
        closeModal(event){
            if(event.target === event.currentTarget){
                this.$emit("onclosemodal")
            }
            
        },
        confirm(value){

            this.boardData.name = value
            this.boardData.date = formatDate(new Date())
            this.boardData.time = new Date().toLocaleTimeString()

            this.boardList = JSON.parse(localStorage.getItem("boards"))
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
</style>