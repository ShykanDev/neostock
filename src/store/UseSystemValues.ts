import { defineStore } from "pinia";

export const UseSystemValues = defineStore('UseSystemValues', ({
    state() {
        return {
        showAddStockScanView: false,        
        showSaleConfirmationView: false,
        isWindowKeyDownListener:false    
        }
    },
    getters:{
        getIsOutOfStockScanView():boolean{
            return this.showAddStockScanView
        },
        getIsSaleConfirmationView():boolean{
            return this.showSaleConfirmationView
        },
        getIsWindowKeyDownListenerActive():boolean{
            return this.isWindowKeyDownListener;
        }
    },
    actions: {
        setIsOutOfStockScanView(value:boolean){
            this.showAddStockScanView = value
        },
        setIsSaleConfirmationView(value:boolean){
            this.showSaleConfirmationView = value
        },
        setIsWindowKeyDownListener(payload:boolean):void{
            this.isWindowKeyDownListener = payload;
        }
    }
}))