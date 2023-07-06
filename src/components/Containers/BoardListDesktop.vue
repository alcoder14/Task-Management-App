<template>
    <div class="boards-container">
        <h2>All Boards ( {{ boardNumber }} )</h2>
        <button v-for="board in boardList" :key="board" class="board-btn"> <font-awesome-icon icon="fa-solid fa-square" class="icon" /> {{ board }}</button>
    </div>
</template>

<script>
export default {
    name: "BoardListDesktop",
    props: {
        boardList: Array
    },
    data(){
        return{
            boardNumber: Number
        }
    },
    mounted(){
        this.calculateBoardNumber()
    },
    methods: {
        calculateBoardNumber(){
            this.boardNumber = this.boardList.length
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
        .board-btn{
            border-top-left-radius: 0;
            border-bottom-left-radius: 0;
            margin-bottom: 12px;
            width: 70%;
            font-size: 25px;
            padding: 14px;
            background-color: $light;
            color: $white;
            display: flex;
            justify-content: center;
            align-items: center;
            .icon{
                margin-right: 20px;
            }
        }
    }
</style>