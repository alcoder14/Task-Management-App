<template>
    <div class="modal-container">
        <div class="modal-window">
            
            <div class="modal-upper-row">
                <h1 class="task-title">{{ taskDataCopy.title }}</h1>
                <button class="close-btn" type="button" @click="updateTask"><font-awesome-icon icon="fa fa-times" /></button>
            </div>

            <div class="task-description-container">
                <p class="task-description">{{ taskDataCopy.description }}</p>
            </div>

            <div class="subtasks-editor" v-if="taskData.subtasks.length">
                <h3 class="subtasks-num">Subtasks ({{ doneSubtasksNumber }} of {{ taskData.subtasks.length }})</h3>
                <div v-for="(subtask, index) in taskDataCopy.subtasks" :key="subtask.text">
                    <div class="subtask" v-if="!subtask.done" @click="updateSubtask(index)">
                        <input type="checkbox" style="margin-right: 10px;" v-model="subtask.done">
                        <p>{{ subtask.text }}</p>
                    </div>
                    <div class="subtask" v-if="subtask.done" @click="updateSubtask(index)">
                        <input type="checkbox" style="margin-right: 10px;" v-model="subtask.done">
                        <p class="subtask-done-text" >{{ subtask.text }}</p>
                    </div>
                </div>
            </div>
            <DropdownComponent :selected="taskData.status" @onStatusSelected="changeStatus" />
            
        </div>
    </div>
</template>

<script>

import DropdownComponent from '../Elements/DropdownComponent.vue'

export default {
    components: {DropdownComponent},
    props: {
        taskData: null
    },
    data(){
        return{
            doneSubtasksNumber: 0,
            taskDataCopy: {},
            taskStorage: null,
            taskIndex: null,
        }
    },
    mounted(){
        this.copyTaskData()
        this.countSubtasks()
    },
    methods: {
        copyTaskData(){
            for (const key in this.taskData) {
                if (Object.prototype.hasOwnProperty.call(this.taskData, key)) {
                    this.taskDataCopy[key] = this.taskData[key];
                }
            }

            console.log(this.taskDataCopy)
        },
        countSubtasks(){
            this.taskDataCopy.subtasks.forEach((subtask) => {
                if(subtask.done == true){
                    this.doneSubtasksNumber++;
                }
            })
            console.log(this.doneSubtasksNumber)
        },
        updateSubtask(index){
            this.taskDataCopy.subtasks[index].done = !this.taskDataCopy.subtasks[index].done
        },
        changeStatus(value){
            this.taskDataCopy.status = value
            console.log(this.taskDataCopy.status)
        },

        updateTask(){
            this.taskStorage = JSON.parse(localStorage.getItem("TaskItems"))

            this.taskIndex = this.taskStorage.findIndex(task => task.id === this.taskDataCopy.id);

            this.taskStorage[this.taskIndex] = this.taskDataCopy

            localStorage.setItem("TaskItems", JSON.stringify(this.taskStorage))

            this.$emit('closeEditModal')

            this.emitter.emit("refilterTasks")

        }
    }
}
</script>

<style lang="scss" scoped>
    @import "@/assets/style.scss";
    .modal-upper-row{
        margin-bottom: 20px;
    }
    .task-title{
        color: $white;
    }
    .task-description-container{
        margin-bottom: 20px;
        .task-description{
            color: $lightgrey;
            font-size: 20px;
            display: inline;
        }
    }   
   
    .subtasks-num{
        margin-bottom: 10px;
        color: $white;
    }
    .subtask{
        margin-bottom: 10px;
        border-radius: 10px;
        @include flex-row();
        background-color: $darkest;
        padding: 15px;
        font-size: 20px;
        color: white;
        cursor: pointer;
    }
    .subtask-done-text{
        text-decoration: line-through;
        color: $lightgrey;
    }

</style>