import { IItem } from "@/interfaces/IItem";
import { defineStore } from "pinia";

export const UseItemsStore = defineStore('UseItemStore',{
    state(){
        return{
            totalItems : [
                {itemName:"Labial",
                itemPrice: 20,
                itemCode:705632441947,
                itemQuantity:1
                },
                {itemName:"Espejo",
                itemPrice: 35,
                itemCode:9780123456786,
                itemQuantity:1
                }
            ]
        }
    },
    getters:{
        getTotalItems():Array<IItem>{
            return this.totalItems;
        },
        
    },

})