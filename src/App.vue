<template>
    <StartingScreen @onboardcreated="addBoardToStorage" v-if="startingScreenVisible" :boardList="boards" @onboardselected="toggleVisibility" />
    <MainScreen v-if="!startingScreenVisible" :boardList="boards"  />
</template>

<script>
  import StartingScreen from "./components/Screens/StartingScreen.vue";
  import MainScreen from "./components/Screens/MainScreen.vue";

  export default{
    name: "App",
    components: {
      StartingScreen,
      MainScreen
    },
    data(){
      return{
        startingScreenVisible: true,
        boards: []
      }
    },
    methods: {
      toggleVisibility(){
        this.startingScreenVisible = !this.startingScreenVisible
      },
      
      addBoardToStorage(value){
        console.log(value)
        this.toggleVisibility()

        this.boards = JSON.parse(localStorage.getItem("boards"))
        this.boards.push(value)
        localStorage.setItem("boards", JSON.stringify(this.boards))

      }
    },
    mounted(){
      if(localStorage.getItem("boards") == null){
        localStorage.setItem("boards", JSON.stringify([]))
      }

      this.boards = JSON.parse(localStorage.getItem("boards"));
      console.log(localStorage.boards)
    }

  }
</script>

<style lang="scss">
    @import "@/assets/style.scss";
</style>
