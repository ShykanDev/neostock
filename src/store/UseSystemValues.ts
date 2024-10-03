import { defineStore } from "pinia";

export const UseSystemValues = defineStore('UseSystemValues', ({
    state() {
        return {
        showAddStockScanView: false,        
        }
    },
    getters:{
        getIsOutOfStockScanView():boolean{
            return this.showAddStockScanView
        }
    },
    actions: {
        setIsOutOfStockScanView(value:boolean){
            this.showAddStockScanView = value
        }
    }
}))