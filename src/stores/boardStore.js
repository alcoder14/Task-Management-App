import { defineStore } from 'pinia';

export const useBoardStore = defineStore('boardStore', {
  state: () => ({
    selectedBoard: ""
  }),
  getters: {
    getBoard(){
      return this.selectedBoard
    }
  },
  actions: {
    updateSelectedBoard(board) {
      this.selectedBoard = board;
    }
  },
})
