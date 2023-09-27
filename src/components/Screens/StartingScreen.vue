<template>
  <div class="container">
    <!--
    <img src="../assets/logo.png" alt="Logo" class="kanban-img">
    -->
    <button class="new-board-btn" @click="toggleModal"> <font-awesome-icon icon="fa-solid fa-plus" /> Add New Board</button>

    <div class="boards-container">
      <button v-for="board in boardList" :key="board" @click="boardSelected(board)" class="board-btn" > {{ board }} </button>
    </div>
  </div>

  <AddBoard v-if="modalVisible" @onclosemodal="toggleModal" @boardadded="boardAdded"/>

</template>

<script>

import AddBoard from '../Modals/AddBoard.vue';
import { useBoardStore } from "@/stores/boardStore";

export default {
    name: "StartingScreen",
    components: {
        AddBoard
    },
    emits: ['onboardcreated', 'onboardselected'],
    mounted(){
      this.getBoards()
    },
    data(){
        return{
            modalVisible: false,
            boardList: null,
            boardStore: useBoardStore()
        }
    },
    methods: {
        getBoards(){
            this.boardList = JSON.parse(localStorage.getItem("boards"))
        },
        toggleModal(){
            this.modalVisible = !this.modalVisible
        },
        boardAdded(){
            this.toggleModal();
            this.$emit("onboardcreated")
        },
        boardSelected(boardTitle){
          this.$emit("onboardselected", boardTitle)
          this.boardStore.updateSelectedBoard(boardTitle)
        }
    }
}
</script>

<style lang="scss" scoped>
    @import "@/assets/style.scss";
    .container{
      height: 100vh;
      width: 100%;
      background-color: $dark;
      @include flex-column();
      justify-content: center;
      align-items: center;
      .kanban-img{
        height: 100px;
        width: auto;
      }
      .boards-container{
        width: 30%;
        display: grid;
        grid-template-columns: 29% 29% 29%;
        row-gap: 30px;
        justify-content: space-between;
        padding: 30px;
        background-color: $darkest;
        border-radius: 20px;
        margin-top: 30px;
        border: 1px solid $light;
        .board-btn{
          background-color: $dark;
          color: $white;
        }
        .board-btn:hover{
          box-shadow: 1px 1px 15px 2px rgba($color: $light, $alpha: 1.0);
        }
      }
      .new-board-btn{
        font-size: 30px;
        padding: 14px 24px;
        border-radius: 30px;
        background-color: $light;
        color: $white;
      }
    }
</style>