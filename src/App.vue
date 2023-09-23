<template>
    <StartingScreen @onboardcreated="addBoardToStorage" v-if="startingScreenVisible" :boardList="boards" @onboardselected="toggleVisibility" />
    <MainScreen v-if="!startingScreenVisible" :boardList="boards" :selectedBoard="selectedBoard" />
</template>

<script>
  import StartingScreen from "./components/Screens/StartingScreen.vue";
  import MainScreen from "./components/Screens/MainScreen.vue";

  import { useBoardStore } from "./stores/boardStore";

  export default{
    name: "App",
    components: {
      StartingScreen,
      MainScreen
    },
    data(){
      return{
        startingScreenVisible: true,
        boards: [],
        selectedBoard: null,
        boardStore: useBoardStore()
      }
    },
    methods: {
      toggleVisibility(value){
        this.selectedBoard = value
        this.boardStore.updateSelectedBoard(value)
        this.startingScreenVisible = !this.startingScreenVisible
      },
      
      addBoardToStorage(value){
        console.log(value)
        this.toggleVisibility(value)

        this.boards = JSON.parse(localStorage.getItem("boards"))
        this.boards.push(value)
        localStorage.setItem("boards", JSON.stringify(this.boards))

        // Add to Pinia store
        this.boardStore.updateSelectedBoard(value)

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
