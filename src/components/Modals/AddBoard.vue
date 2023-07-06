<template>
    <div class="modal-container" @click="closeModal($event)">
        <form class="add-board-form">
            <input type="text" placeholder="Board Name" class="board-name-input" v-model="inputText">
            <button class="white-btn" @click="confirm(inputText)">Confirm</button>
        </form>
    </div>
</template>

<script>
export default {
    name: "AddBoard",
    data(){
        return{
            inputText: ""
        }
    },
    methods: {
        closeModal(event){
            if(event.target === event.currentTarget){
                this.$emit("onclosemodal")
            }
        },
        confirm(value){
            this.$emit("onconfirm", value)
        }
    }
}
</script>

<style lang="scss" scoped>
    @import "@/assets/style.scss";
    .add-board-form{
        background-color: $dark;
        width: 30%;
        padding: 20px;
        border-radius: 20px;
        @include flex-column();
        .board-name-input{
            margin-bottom: 30px;
        }
    }
</style>