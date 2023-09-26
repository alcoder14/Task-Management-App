<template>
    <div class="task-container" @click="toggleEditModal">
        <h2 class="task-title">{{ taskData.title }}</h2>
        <h4 v-if="doneSubtasks === 0 && totalSubtasks === 0" class="subtask-metadata">No subtasks</h4>
        <h4 v-else class="subtask-metadata">{{ this.doneSubtasks }} of {{ this.totalSubtasks }} subtasks</h4>
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
            totalSubtasks: 0,
            doneSubtasks: 0,
            editModalVisible: false
        }
    },
    mounted(){
        this.countSubtasks()
    },
    methods:{
        countSubtasks(){
            this.totalSubtasks = this.taskData.subtasks.length
            this.taskData.subtasks.forEach(subtask => subtask.done === true ? this.doneSubtasks++ : this.doneSubtasks)
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
        .subtask-metadata{
            color: $grey;
            font-size: 18px;
        }
    }
</style>