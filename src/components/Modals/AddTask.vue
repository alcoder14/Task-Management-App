<template>
  <main class="modal-container">
    <form class="modal-window">

        <div class="modal-upper-row">
            <h1 class="modal-title">Add New Task to {{ formData.board }}</h1>
            <button class="close-btn" type="button" @click="closeModal"><font-awesome-icon icon="fa fa-times"/></button>
        </div>

        <div class="input-row">
            <label for="title">Title</label>
            <input v-model="formData.title" type="text" id="title" placeholder="e. g. Take coffee break">
        </div>

        <div class="input-row">
            <label for="description">Description</label>
            <textarea v-model="formData.description" id="description" cols="30" rows="10" placeholder="e. g. It is always good to take a break. This 15 minute break will recharge the batteries a little"></textarea>
        </div>
        
        <div class="input-row">
            <label>Subtasks (Max 3)</label>

            <div class="subtask-input-row" v-for="(subtask, index) in subtasks" :key="index">
                <input type="text" :placeholder="'Subtask no. ' + (index + 1)" v-model="subtask.text" class="subtask">
                <button class="delete-subtask-btn" @click="deleteSubtask(index)" type="button"> <font-awesome-icon icon="fa fa-times" /> </button>
            </div>

            <button class="white-btn" type="button" @click="addSubtask" :disabled="subtasksDisabled"> <font-awesome-icon icon="fa fa-plus"/> Add New Subtask</button>
        </div>
        <DropdownComponent :selected="selectedStatus" @onStatusSelected="changeStatus" />
        <button @click="saveTask" class="light-purple-btn" type="button">Save</button>
    </form>
  </main>
</template>

<script>

import DropdownComponent from '../Elements/DropdownComponent.vue';
import { useBoardStore } from '@/stores/boardStore';

import { v4 as uuidv4 } from 'uuid'

export default {
    name: "AddTask",
    components: {
        DropdownComponent
    },
    emits: ['onclose', 'ontaskadded'],
    data(){
        return {
            subtasks: [],
            subtasksDisabled: false,
            selectedStatus: "todo",
            formData: {
                id: null,
                board: "",
                title: "",
                description: "",
                subtasks: [],
                status: ""
            },
            taskStorage: null,
            formDataCopy: null,
            boardStore: useBoardStore(),
        }
    },
    mounted(){
        this.formData.status = this.selectedStatus
        this.changeBoard()
    },
    methods: {
        changeBoard(){
            this.formData.board = this.boardStore.getBoard
        },
        addSubtask(){
            if(this.subtasks.length < 3){
                this.subtasksDisabled = false
                this.subtasks.push({text: "", done: false});
            } else {    
                this.subtasksDisabled = true
            }
        },
        deleteSubtask(index){
            this.subtasks.splice(index, 1)
            if(this.subtasks.length < 3){
                this.subtasksDisabled = false
            }            
        },
        changeStatus(value){
            this.formData.status = value
        },
        saveTask(){
            this.formData.id = uuidv4()
            this.formData.subtasks = this.subtasks
            this.formDataCopy = {...this.formData}

            console.log(this.formData.id)
            console.log(this.formDataCopy.board)

            this.taskStorage = JSON.parse(localStorage.getItem("TaskItems"));
            this.taskStorage.push(this.formDataCopy)
            localStorage.setItem("TaskItems", JSON.stringify(this.taskStorage))

            console.log(this.taskStorage)

            this.$emit('ontaskadded')

            this.emitter.emit("refilterTasks")
            this.closeModal()
        },
        closeModal(){
            this.$emit("onclose")
            this.formData.title = ""
            this.formData.description = ""
            this.formData.subtasks = []
            this.formData.status = "todo" 
            this.selectedStatus = "todo"

            this.formDataCopy = null
        }
    }
}
</script>

<style lang="scss" scoped>
    @import "@/assets/style.scss";
    .subtask-input-row{
        width: 100%;
        display: grid;
        grid-template-columns: 92% 8%;
        justify-content: space-between;
        margin-bottom: 10px;
        .delete-subtask-btn{
            color: $grey;
            font-size: 30px;
            background-color: $dark;
        }
    }

    
</style>