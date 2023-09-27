<template>
    <StartingScreen @onboardcreated="toggleVisibility" v-if="startingScreenVisible" @onboardselected="toggleVisibility" />
    <MainScreen v-if="!startingScreenVisible" />
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
        boardStore: useBoardStore()
      }
    },
    methods: {
      toggleVisibility(){
        this.startingScreenVisible = !this.startingScreenVisible
      },
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
