<template>
    <div class="boards-container" :class="{'show-animation': showAnimationActive === true, 'hide-animation': hideAnimationActive === true}" v-if="boardListVisible === true">
        <div class="close-btn-container">
            <button class="close-btn" @click="closeBoardList"><font-awesome-icon icon="fa fa-times" /></button>
        </div>
        <div class="logo-container">
            <img src="../../assets/logo.png" alt="Logo">
        </div>
        <h2 class="board-number">All Boards ( {{ boardNumber }} )</h2>

        <div class="board-btn-container" v-for="board in boardList" :key="board">

            <!-- Editing boards is not enabled -->

            <button v-if="!editBoardEnabled" class="board-btn" :class="{'purple': board.name === boardStore.getBoard}" @click="changeBoard(board.name)"><font-awesome-icon icon="fa-solid fa-table-cells-large" class="icon" /> {{ board.name }}
            </button>

            <!-- Editing boards is enabled - render input but only on current board -->
            
            <button v-if="editBoardEnabled && board.name === boardStore.getBoard" class="board-btn purple" ><font-awesome-icon icon="fa-solid fa-table-cells-large" class="icon" /> <input type="text" v-model="newBoardName" class="input-boardname" :class="{'input-error': inputError !== null}">
            </button>

            <button v-else-if="editBoardEnabled && board !== boardStore.getBoard" class="board-btn" :disabled="disableButtons" @click="changeBoard(board.name)" ><font-awesome-icon icon="fa-solid fa-table-cells-large" class="icon" /> {{ board.name }}
            </button>

            <!-- Tools -->

            <div class="board-tools-container" v-if="board.name === boardStore.getBoard">

                <!-- Render edit and trash icons if board is not being edited -->

                <button v-if="!editBoardEnabled" class="update-board tool-btn" @click="editBoard(board.name)"><font-awesome-icon icon="fa fa-pen"/></button>

                <button v-if="!editBoardEnabled" class="delete-board tool-btn" @click="deleteBoard(board.name)">
                    <font-awesome-icon icon="fa fa-trash" />
                </button>

                <!-- Render check and x icons if board is being edited -->

                <button v-if="editBoardEnabled" class="confirm-update-board tool-btn" @click="confirmEditBoard(this.newBoardName)">
                    <font-awesome-icon icon="fa fa-check" />
                </button>

                <button v-if="editBoardEnabled" @click="discardEditBoard()" class="discard-update-board tool-btn" ><font-awesome-icon icon="fa fa-times" /></button>

            </div>
        </div>

        <button class="add-new-board-btn" @click="toggleAddBoardModal" :disabled="disableButtons">
            <div class="create-board-text">
                <font-awesome-icon icon="fa-solid fa-plus" class="icon" style="margin-right: 10px;" />
                New Board
            </div>
        </button>

        <div class="date-time-container" v-if="selectedBoardDate !== null">
            <p>Board created: {{ selectedBoardDate }} at {{ selectedBoardTime }}</p>
        </div>
    </div>

    <AddBoard v-if="addBoardVisible" @onclosemodal="toggleAddBoardModal" @boardadded="refreshBoardList"/>
</template>

<script>

import { useBoardStore } from '@/stores/boardStore'
import { checkNameAvailability } from '@/CustomJS/methods'
import AddBoard from '../Modals/AddBoard.vue'

export default {
    name: "BoardListDesktop",
    components: {
        AddBoard
    },
    data(){
        return{
            boardNumber: Number,
            boardStore: useBoardStore(),
            newBoardName: null,
            buttons: null,
            disableButtons: false,
            addBoardVisible: false,
            boardList: null,
            boardListVisible: true,
            smallScreenBoardList: false,
            tasks: null,
            tasksCopy: null,
            editBoardEnabled: false,

            selectedBoardDate: null,
            selectedBoardTime: null,

            showAnimationActive: false,
            hideAnimationActive: false,

            inputError: null
        }
    },
    mounted(){

        this.autoSelectBoard()

        this.toggleVisibility()
        window.addEventListener("resize", this.toggleVisibility)
        this.emitter.on('showHiddenBoardList', ()=>{

            this.boardListVisible = true
            this.showAnimationActive = true
            setTimeout(() => {
                this.showAnimationActive = false
            }, 1000);
            
            this.smallScreenBoardList = true
        })

        this.emitter.on('refreshBoardList', (board)=>{
            this.refreshBoardList(board)
        })
    },
    methods: {
        getBoardList(){
            this.boardList = JSON.parse(localStorage.getItem("boards"))
            console.log(this.boardList)
        },
        calculateBoardNumber(){
            this.boardNumber = this.boardList.length
        },
        changeBoard(board){
            this.boardStore.updateSelectedBoard(board)

            // Refilter tasks when new board is selected and update board name in the menu

            this.emitter.emit("refilterTasks");
            this.emitter.emit("updateBoardName")
            
            this.getCurrentBoardDateAndTime()

            this.closeBoardList()
        },
        refreshBoardList(boardName){
            this.getBoardList()
            this.calculateBoardNumber()
            this.changeBoard(boardName)
            this.addBoardVisible = false
        },
        toggleAddBoardModal(){
            this.addBoardVisible = !this.addBoardVisible
        },

        // EDITING BOARD NAMES 

        // this fires when edit icon is clicked
        editBoard(oldBoardName){
            this.newBoardName = oldBoardName
            this.disableButtons = true
            this.toggleEditBoardName()
        },
        // this fires when check icon is clicked
        confirmEditBoard(newBoardName){

            this.inputError = null
            this.inputError = checkNameAvailability(newBoardName)
            if(this.inputError !== null) return

            // Rename boards with new name in task objects 
            this.tasks = JSON.parse(localStorage.getItem("TaskItems"))

            this.tasks.forEach((task) => {
                if(task.board === this.boardStore.getBoard){
                    task.board = newBoardName
                }
            })

            localStorage.setItem("TaskItems", JSON.stringify(this.tasks))
            
            // Update boards list
            this.boardList[this.boardList.findIndex(item => item.name === this.boardStore.getBoard)].name = newBoardName
            localStorage.setItem("boards", JSON.stringify(this.boardList))


            // Set new current board
            this.boardStore.updateSelectedBoard(newBoardName)

            // Refilter tasks and update board name in menu
            this.emitter.emit("refilterTasks")
            this.emitter.emit("updateBoardName")

            // Close board editor
            this.discardEditBoard()        

        },
        // this fires when times icon is clicked
        discardEditBoard(){
            console.log("Here")
            this.newBoardName = ""
            this.disableButtons = false
            this.toggleEditBoardName()
        },
        // Switch between text and input 
        toggleEditBoardName(){
            this.editBoardEnabled = !this.editBoardEnabled
        },

        // DELETE BOARDS
        deleteBoard(boardName){
            // Delete board
            this.boardList = this.boardList.filter(board => board.name !== boardName)
            localStorage.setItem("boards", JSON.stringify(this.boardList))

            // Delete tasks associated with board
            this.tasks = JSON.parse(localStorage.getItem("TaskItems"))
            this.tasks = this.tasks.filter(task => task.board !== boardName)
            localStorage.setItem("TaskItems", JSON.stringify(this.tasks))

            this.autoSelectBoard()
        },


        autoSelectBoard(){
            this.getBoardList()
            this.calculateBoardNumber()
            if(this.boardList[0] !== undefined){
                this.changeBoard(this.boardList[0].name)
            } else {
                this.changeBoard(undefined)
            }
        },

        toggleVisibility(){
            if(window.innerWidth > 1674){

                this.boardListVisible = true
                this.smallScreenBoardList = false

            } else if (window.innerWidth <= 1674 && this.smallScreenBoardList){

                this.boardListVisible = true
                
            } else {
                this.boardListVisible = false
            }
        },
        closeBoardList(){
            if(window.innerWidth <= 1675){
                this.hideAnimationActive = true
                setTimeout(() => {
                    this.boardListVisible = false
                    this.smallScreenBoardList = false
                    this.hideAnimationActive = false
                }, 350);
            }
        },

        getCurrentBoardDateAndTime(){

            // Get Date and Time of creation of the selected board
            if(this.boardList.length > 0){
                this.selectedBoardDate = this.boardList[this.boardList.findIndex(board => board.name === this.boardStore.getBoard)].date
                this.selectedBoardTime = this.boardList[this.boardList.findIndex(board => board.name === this.boardStore.getBoard)].time
            } else {
                this.selectedBoardDate = null
                this.selectedBoardTime = null
            }

        }

    }
}
</script>

<style lang="scss" scoped>
    @import "@/assets/style.scss";

    // Animations for board list
    .show-animation{
        animation-name: show-container;
        animation-duration: 0.4s;
    }
    @keyframes show-container{
        0%{transform: translateX(-100%)}
        100%{transform: translateX(0)}
    }
    .hide-animation{
        animation-name: hide-container;
        animation-duration: 0.4s;
    }
    @keyframes hide-container{
        0%{transform: translateX(0)}
        100%{transform: translateX(-100%)}
    }

    // Styles
    .boards-container{
        background-color: $dark;
        border-right: 1px solid $grey;
        height: 100vh;
        @include flex-column();

        .close-btn-container{
            @include flex-row();
            justify-content: center;
            width: 100%;            
        }
        .close-btn{
            font-size: 20px;
            display: none;
        }
        .logo-container{
            height: 10vh;
            @include flex-row();
            align-items: center;
            justify-content: flex-start;
            padding: 20px 40px;
        }
        .board-number{
            color: $white;
            margin: 30px 0 20px 34px;
        }
        .board-btn-container{
            @include flex-row();
            align-items: center;
            width: 80%;
            margin-bottom: 12px;
            .board-tools-container{
                @include flex-row();
                width: 20%;
                .tool-btn{
                    padding: 5px 10px 5px 10px;
                    justify-self: center;
                    font-size: 18px;
                    border-radius: 0;
                    transform: translateX(-10px);
                    background-color: $darkest;
                    color: $lightgrey;
                    transition: 0.3s all;
                }
                .tool-btn:hover{
                    background-color: $light;
                    color: $white;
                }
                .update-board, .confirm-update-board{
                    padding-left: 20px;
                }
                .delete-board, .discard-update-board{
                    border-top-right-radius: 10px;
                    border-bottom-right-radius: 10px;
                }
            }
            .input-boardname{
                width: 100%;
                font-size: 14px;
                padding: 4px;
            }

        }

        .board-btn, .add-new-board-btn{
            cursor: pointer;
            border-radius: 60px;
            border-top-left-radius: 0;
            border-bottom-left-radius: 0;
            width: 80%;
            font-size: 22px;
            padding: 14px 34px;
            background-color: $dark;
            @include flex-row();
            z-index: 10;
        }
        .board-btn:hover{
            background-color: $light;
            color: $white;
        }
        .add-new-board-btn:hover{
            background-color: $white;
            color: $dark;
        }
        .board-btn{
            color: $lightgrey;
            justify-content: flex-start;
            align-items: center;
            .icon{
                margin-right: 20px;
            }
        }
        .add-new-board-btn{
            justify-content: space-between;
            align-items: center;
            color: $light;
            width: 80%;
            margin-top: 20px;
        }
        .purple {
            background-color: $light;
            color: $white;
        }
        .date-time-container{
            position: fixed;
            bottom: 0;
            left: 0;
            padding: 2rem;
            color: $lightgrey;
        }
    }

    .input-error{
        border: 2px rgb(177, 48, 48) solid;
    }
    
    @media(max-width: 1675px){
        .boards-container{
            position: fixed;
            z-index: 50;
            left: 0;
            top: 0;
            width: 500px;
            height: 100vh;
            align-items: flex-start;
            justify-content: flex-start;
            padding-top: 100px;
            background-color: #1f1f25;
            .close-btn{
                display: block;
            }
            .logo-container{
                display: none;
            }
            .add-new-board-btn{
                width: 64%;
            }
        }
    }

    @media(max-width: 520px){
        .boards-container{
            width: 80%;
        }
        .date-time-container{
            font-size: 0.8rem;
        }
    }
    
</style>