<template>
  <div class="container">
    <!--
    <img src="../assets/logo.png" alt="Logo" class="kanban-img">
    -->
    <button class="new-board-btn" @click="toggleModal"> <font-awesome-icon icon="fa-solid fa-plus" /> Add New Board</button>

    <div class="boards-container">
      <button v-for="board in boardList" :key="board" @click="boardSelected(board)" > {{ board }} </button>
    </div>
  </div>

  <AddBoard v-if="modalVisible" @onclosemodal="toggleModal" @onconfirm="boardAdded"/>

</template>

<script>

import AddBoard from '../Modals/AddBoard.vue';

export default {
    name: "StartingScreen",
    components: {
        AddBoard
    },
    props: {
        boardList: Array 
    },
    emits: ['onboardcreated', 'onboardselected'],
    data(){
        return{
            modalVisible: false,
        }
    },
    methods: {
        toggleModal(){
            this.modalVisible = !this.modalVisible
        },
        boardAdded(value){
            this.toggleModal();
            this.$emit("onboardcreated", value)
        },
        boardSelected(boardTitle){
          this.$emit("onboardselected", boardTitle)
        }
    },
    mounted(){
      console.log(this.boardList)
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
        grid-template-columns: 25%;
        justify-content: space-between;
        background-color: $darkest;
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