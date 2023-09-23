<template>
    <nav class="navigation">
        <h1 class="board-title">{{ boardTitle }}</h1>
        <button class="light-purple-btn" @click="toggleModal"> <font-awesome-icon icon="fa fa-plus" /> Add New Task</button>
    </nav>

    <AddTask :boardTitle="this.boardTitle" v-if="addTaskVisible" @onclose="toggleModal" @ontaskadded="this.$emit('ontaskadded')" />
</template>

<script>


import AddTask from '../Modals/AddTask.vue'

export default {
    name: "BoardMenu",
    props: {
        boardTitle: String
    },
    emits: ['ontaskadded'],
    components: {
        AddTask
    },
    data(){
        return {
            addTaskVisible: false
        }
    },
    methods: {
        toggleModal(){
            this.addTaskVisible = !this.addTaskVisible
        }
    }
}
</script>

<style lang="scss" scoped>
    @import "@/assets/style.scss";
    .navigation{
        width: 100%;
        height: 10vh;
        padding: 20px 40px;
        color: $white;
        background-color: $dark;
        @include flex-row();
        align-items: center;
        justify-content: space-between;
    }
</style>