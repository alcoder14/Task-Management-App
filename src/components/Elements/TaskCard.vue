<template>
    <div class="task-container" @click="toggleEditModal">
        <h2 class="task-title">{{ taskData.title }}</h2>
        <h4 class="task-description">{{ shortenedDescription }}</h4>
    </div>
    <ViewTask :taskData="taskData" v-if="editModalVisible" @closeEditModal="toggleEditModal" />
</template>

<script>

import ViewTask from '../Modals/ViewTask.vue'

export default {
    components: {
        ViewTask
    },
    props: {
        taskData: Object,
        totalTasks: Number
    },
    data(){
        return{
            shortenedDescription: null,
            editModalVisible: false
        }
    },
    mounted(){
        this.trimDescription()
    },
    methods:{
        trimDescription(){
            this.shortenedDescription = this.taskData.description.slice(0, 40)
        },
        toggleEditModal(){
            this.editModalVisible = !this.editModalVisible
        }
    }
}
</script>

<style lang="scss" scoped>
    @import "@/assets/style.scss";
    .task-container{
        @include flex-column();
        padding: 14px 8px;
        background-color: $dark;
        margin-top: 20px;
        cursor: pointer;
        padding: 20px;
        border-radius: 15px;
        .task-title{
            color: $white;
            margin-bottom: 5px;
            font-size: 36px;
        }
        .task-description{
            color: $grey;
            font-size: 18px;
        }
    }
    @media(max-width: 1250px){
        .task-container{
            .task-title{
            font-size: 26px;
        }
            .subtask-description{
                font-size: 16px;
            }
        }
    }
</style>