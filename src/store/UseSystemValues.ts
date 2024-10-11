import { defineStore } from "pinia";

export const UseSystemValues = defineStore('UseSystemValues', ({
    state() {
        return {
        showAddStockScanView: false,        
        showSaleConfirmationView: false,    
        }
    },
    getters:{
        getIsOutOfStockScanView():boolean{
            return this.showAddStockScanView
        },
        getIsSaleConfirmationView():boolean{
            return this.showSaleConfirmationView
        }
    },
    actions: {
        setIsOutOfStockScanView(value:boolean){
            this.showAddStockScanView = value
        },
        setIsSaleConfirmationView(value:boolean){
            this.showSaleConfirmationView = value
        }
    }
}))