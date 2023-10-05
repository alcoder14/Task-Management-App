<template>
    <MainScreen />
</template>

<script>
  import MainScreen from "./components/Screens/MainScreen.vue";

  import { useBoardStore } from "./stores/boardStore";

  export default{
    name: "App",
    components: {
      MainScreen
    },
    data(){
      return{
        boards: [],
        boardStore: useBoardStore()
      }
    },
    mounted(){

      // Initalize storage for boards
      if(localStorage.getItem("boards") === null){
        localStorage.setItem("boards", JSON.stringify([]))
      }

      this.boards = JSON.parse(localStorage.getItem("boards"));
      console.log(localStorage.boards)


      // Initialize storage for tasks

      if(localStorage.getItem("TaskItems") === null){
        localStorage.setItem("TaskItems", JSON.stringify([]))
      }
    }

  }
</script>

<style lang="scss">
    @import "@/assets/style.scss";
</style>
