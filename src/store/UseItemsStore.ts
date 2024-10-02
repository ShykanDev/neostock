import { IItem } from "@/interfaces/IItem";
import { defineStore } from "pinia";

export const UseItemsStore = defineStore('UseItemStore',{
    state(){
        return{
            totalItems : [
                {
                    itemName: "Delineador de Ojos",
                    itemQuantity: 1,
                    itemPrice: 50, // precio en números cerrados
                    itemCode: 2497596474051,
                    itemSubtotal: 0,
                    stock:32 // subtotal inicialmente en 0
                },
                {
                    itemName: "Labial Mate",
                    itemQuantity: 1,
                    itemPrice: 40,
                    itemCode: 5424403063529,
                    itemSubtotal: 0,
                    stock:25
                },
                {
                    itemName: "Sombra de Ojos",
                    itemQuantity: 1,
                    itemPrice: 35,
                    itemCode: 64027835425480,
                    itemSubtotal: 0,
                    stock:15
                },
                {
                    itemName: "Rubor en Polvo",
                    itemQuantity: 1,
                    itemPrice: 60,
                    itemCode: 67630471960817727n,
                    itemSubtotal: 0,
                    stock:16
                },
                {
                    itemName: "Corrector Líquido",
                    itemQuantity: 1,
                    itemPrice: 55,
                    itemCode: 65472771064808,
                    itemSubtotal: 0,
                    stock:18
                },
                {
                    itemName: "Polvo Traslúcido",
                    itemQuantity: 1,
                    itemPrice: 45,
                    itemCode: 993752155038548,
                    itemSubtotal: 0,
                    stock:16
                },
                {
                    itemName: "Iluminador",
                    itemQuantity: 1,
                    itemPrice: 70,
                    itemCode: 161306875897337,
                    itemSubtotal: 0,
                    stock:18
                },
                {
                    itemName: "Base de Maquillaje",
                    itemQuantity: 1,
                    itemPrice: 30,
                    itemCode: 895268144913187,
                    itemSubtotal: 0,
                    stock:13
                },
                {
                    itemName: "Pintura para Cejas",
                    itemQuantity: 1,
                    itemPrice: 25,
                    itemCode: 83128574834953373n,
                    itemSubtotal: 0,
                    stock:56
                },
                {
                    itemName: "Esponja de Maquillaje",
                    itemQuantity: 1,
                    itemPrice: 15,
                    itemCode: 16891867255932890n,
                    itemSubtotal: 0,
                    stock:16
                },
                {
                    itemName: "Mascara de Pestañas",
                    itemQuantity: 1,
                    itemPrice: 50,
                    itemCode: 225325471358502,
                    itemSubtotal: 0,
                    stock:35
                },
                {
                    itemName: "Lápiz de Labios",
                    itemQuantity: 1,
                    itemPrice: 45,
                    itemCode: 1991024575390,
                    itemSubtotal: 0,
                    stock:12
                },
                {
                    itemName: "Brocha de Maquillaje",
                    itemQuantity: 1,
                    itemPrice: 25,
                    itemCode: 12333477420734,
                    itemSubtotal: 0,
                    stock:18
                },
                {
                    itemName: "Paleta de Sombras",
                    itemQuantity: 1,
                    itemPrice: 80,
                    itemCode: 59298292648216,
                    itemSubtotal: 0,
                    stock:32
                },
                {
                    itemName: "Desmaquillante",
                    itemQuantity: 1 ,
                    itemPrice: 20,
                    itemCode: 7273614798825,
                    itemSubtotal: 0,
                    stock:0
                },
            ],
            cart:[] as Array<IItem>
        }
    },
    getters:{
        getTotalItems():Array<IItem>{
            return this.totalItems;
        },
        getCartItems():Array<IItem>{
            return this.cart;
        },
        getGrandTotal():any{
         let allPrices = [];
            allPrices = this.cart.map( e => e.itemSubtotal)
            return allPrices.reduce( ( a,b) => Number(a)+Number(b),0);
        }
    },
    actions:{
        addItemToCart(itemToAdd:IItem):void{
            const foundItem = this.cart.find( item => item.itemCode === itemToAdd.itemCode); 
            if (foundItem) {
                // if item already exist just increase the quantity
                foundItem.itemQuantity += 1;
                foundItem.itemSubtotal = foundItem.itemQuantity * Number(foundItem.itemPrice);
            } else {
                // If item does not exist, add to the cart
                itemToAdd.itemSubtotal = itemToAdd.itemQuantity * Number(itemToAdd.itemPrice);
                this.cart.push({...itemToAdd});
            }
        },
        editItemQuantity(param:string, index:number):void{
            if(param === 'increase' && this.cart[index].stock > 0) {
                this.cart[index].itemQuantity ++;
                this.cart[index].itemSubtotal = this.cart[index].itemQuantity * Number(this.cart[index].itemPrice);
                this.cart[index].stock --;
            } else if(param === 'decrease') {
                if (this.cart[index].itemQuantity ===1) return;
                this.cart[index].itemQuantity --;
                this.cart[index].itemSubtotal = this.cart[index].itemQuantity * Number(this.cart[index].itemPrice);
                this.cart[index].stock ++;
            }
            console.log(this.cart[index]);
        },
      
    }

})