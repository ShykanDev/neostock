import { IItem } from "@/interfaces/IItem";
import { defineStore } from "pinia";

export const UseHistoryStore = defineStore('useHistoryStore',{
    state:() => ({
            historySales:[] as Array<IItem[]>,
            dateHistorySales:[] as string[],
            grandTotalHistory:[] as Array<number>
    }),
    getters:{
        getHistorySales(state): Array<IItem[]> {
            return state.historySales
        },
        getDateHistorySales(state): Array<string> {
            return state.dateHistorySales
        },
        getGrandTotalHistory(state): Array<number> {
            return state.grandTotalHistory
        }

    },
    actions:{
        pushToHistorySales(sale: IItem[]){
            this.historySales.unshift(sale)
        },
        pushDateToHistorySales(date: string){
            this.dateHistorySales.unshift(date)
        },
        pushToGrandTotalHistory(grandTotal: number){
            this.grandTotalHistory.unshift(grandTotal)
        }
    }
})