import { IItem } from "@/interfaces/IItem";
import { INewItem } from "@/interfaces/INewItem";
import { defineStore } from "pinia";

export const UseItemsStore = defineStore('UseItemStore',{
    state(){
        return{
            totalItems : [
                {
                    itemName: "Tang de Limón",
                    itemQuantity: 1,
                    itemPrice: 50, // precio en números cerrados
                    itemCode: "7622210573216",
                    itemSubtotal: 0,
                    stock:10
                },
                {
                    itemName: "Gel Ego",
                    itemQuantity: 1,
                    itemPrice: 40,
                    itemCode: "7506306247482",
                    itemSubtotal: 0,
                    stock:10
                },
                {
                    itemName: "Tenis Refil",
                    itemQuantity: 1,
                    itemPrice: 35,
                    itemCode: "7508635007270070349",
                    itemSubtotal: 0,
                    stock:10
                },
                {
                    itemName: "Rubor en Polvo",
                    itemQuantity: 1,
                    itemPrice: 60,
                    itemCode: "67630471960817727",
                    itemSubtotal: 0,
                    stock:10
                },
                {
                    itemName: "Paracetamol 650mg tableta",
                    itemQuantity: 1,
                    itemPrice: 55,
                    itemCode: "7501644753060",
                    itemSubtotal: 0,
                    stock:10
                },
                {
                    itemName: "Caja de carton",
                    itemQuantity: 1,
                    itemPrice: 45,
                    itemCode: "BZMS47464",
                    itemSubtotal: 0,
                    stock:10
                },
                {
                    itemName: "Toallitas Humedas KleenBebé",
                    itemQuantity: 1,
                    itemPrice: 70,
                    itemCode: "7501943471900",
                    itemSubtotal: 0,
                    stock:10
                },
                {
                    itemName: "Amoxicilina",
                    itemQuantity: 1,
                    itemPrice: 30,
                    itemCode: "7501349021570",
                    itemSubtotal: 0,
                    stock:10
                },
                {
                    itemName: "Bicoestol Eucalipto",
                    itemQuantity: 1,
                    itemPrice: 25,
                    itemCode: "714706910487",
                    itemSubtotal: 0,
                    stock:10
                },
                {
                    itemName: "Paracetamol 500mg tableta",
                    itemQuantity: 1,
                    itemPrice: 15,
                    itemCode: "7501361682094",
                    itemSubtotal: 0,
                    stock:10
                },
                {
                    itemName: "Mascara de Pestañas",
                    itemQuantity: 1,
                    itemPrice: 50,
                    itemCode: "225325471358502",
                    itemSubtotal: 0,
                    stock:10
                },
                {
                    itemName: "Lápiz de Labios",
                    itemQuantity: 1,
                    itemPrice: 45,
                    itemCode: "1991024575390",
                    itemSubtotal: 0,
                    stock:10
                },
                {
                    itemName: "Disco Estado Solido",
                    itemQuantity: 1,
                    itemPrice: 25,
                    itemCode: "IYEX07108",
                    itemSubtotal: 0,
                    stock:10
                },
                {
                    itemName: "Baygon Total",
                    itemQuantity: 1,
                    itemPrice: 80,
                    itemCode: "7503036165215",
                    itemSubtotal: 0,
                    stock:10
                },
                {
                    itemName: "Alcohol Etílico 250ml",
                    itemQuantity: 1 ,
                    itemPrice: 20,
                    itemCode: "7501020607086",
                    itemSubtotal: 0,
                    stock:10
                },
            ],
            cart:[] as Array<IItem>
        }
    },
    getters:{
        // Returning the system items Array
        getTotalItems():IItem[]{
            return this.totalItems;
        },
        // Returning the cart Array
        getCartItems():IItem[]{
           return this.cart;
        },
        // Returning the sum of each product subtotal of the cart
        getTotalCartPrice():number{
            const totalCartSubtotal = this.cart.map(e => e.itemSubtotal).reduce((a,b) => a+b,0);
            return totalCartSubtotal
        }
    },
    actions:{
        // function to add new item to Cart
        addItemToCart(itemToAdd:IItem):void{
            // making a copy of the $itemToAdd to avoid modify original stock
            const copyItemToAdd = {...itemToAdd};
            // Verify if $itemToAdd already exist on cart
            const itemFoundOnCart = this.cart.find((e) => e.itemCode === copyItemToAdd.itemCode);
            // If item does not exist add it to the cart
            if(!itemFoundOnCart){
                copyItemToAdd.itemSubtotal = copyItemToAdd.itemPrice * copyItemToAdd.itemQuantity;
                copyItemToAdd.stock--;
                this.cart.push(copyItemToAdd);
                return;
            }
            // If item already exist on the cart just update its values of subtotal, stock and quantity
            if(itemFoundOnCart){
                itemFoundOnCart.itemQuantity ++;
                itemFoundOnCart.stock --;
                itemFoundOnCart.itemSubtotal = itemFoundOnCart.itemPrice * itemFoundOnCart.itemQuantity;
                return;
            } 
             // If none of the conditions above were met, log an error
            console.log('Unexpected condition: item could not be found or added to the cart.');
        },
        // function to edit the item cart quantity based on it stock and the quantity
        editItemQuantity(param:string, index:number):void{
            const item = this.cart[index];
            switch(param){
                case 'increase' :
                    if(item.stock>0){
                        item.itemQuantity++;
                        item.stock--;
                        item.itemSubtotal = item.itemPrice * item.itemQuantity;
                    } else {
                        console.log('There is not enough stock to increase the quantity');
                        return;
                    }
                break;
                case 'decrease' :
                 if(item.itemQuantity>1){
                    item.itemQuantity--;
                    item.stock++;
                    item.itemSubtotal = item.itemPrice * item.itemQuantity;
                 }  else {
                    console.log('Can not reduce the quantity to less than 1');                    
                    return;
                 } 
                 break
            default :
            console.log('Param not valid, you must enter "increase" or "decrease" as param' );
            }
        },
        // function to edit the stock of an specific item of the cart
        editItemCartStock(itemCode:string, newStock:number):void{
            // Value that will store the item if its found in the system
            const itemInSystem = this.totalItems.find(e => e.itemCode.toUpperCase() === itemCode.toUpperCase());
            // Value that will store the item if its found in the cart
            const itemInCart = this.cart.find(e => e.itemCode.toUpperCase() === itemCode.toUpperCase());
            // If item is in cart then update its values
            if (itemInCart){
                itemInCart.stock = newStock;
                itemInCart.itemSubtotal = itemInCart.itemPrice * itemInCart.itemQuantity;
                return;
            } 
            // If item is not in the cart but exists in the system then 
            if(itemInSystem && !itemInCart ){
                itemInSystem.stock = newStock;
            // Now push the new item in system to the cart (a shallow copy to prevent to link the original item to be modified)
                const copyItemInSystem = {...itemInSystem};
                copyItemInSystem.stock = newStock;
                copyItemInSystem.stock--;
                copyItemInSystem.itemQuantity = 1;
                copyItemInSystem.itemSubtotal = copyItemInSystem.itemPrice * copyItemInSystem.itemQuantity;
                this.cart.push(copyItemInSystem);
                return;
            }
            console.log("There was an error while trying to add stock");   
        },
        // function to delete an item from the cart based on the index
        deleteItemCart(indexToDelete:number):void{
            this.cart.splice(indexToDelete,1)
        },
        // edit the original stock based on the cart items
        editTotalStock():void{
            console.log('Antes de la modificación:', this.totalItems.map(e => ({...e})));
            this.cart.forEach( cartItem => {
                const itemToEdit = this.totalItems.find( origItem => origItem.itemCode === cartItem.itemCode);
                if(itemToEdit){
                    itemToEdit.stock = cartItem.stock;
                    // same functionality but this time with an splice method
                    // this.totalItems.splice(this.totalItems.indexOf(itemToEdit), 1, cartItem);
                }
            })
            console.log('Después de la modificación:', this.totalItems)
        },
        // clear the cart
        clearCart():void{
            this.cart = [];
        },
        // edit the original item by the param (stock, name, etc)
        editOriginalItem(newObject:INewItem, index:number):void {
            const itemToEdit = this.totalItems[index];
            if (itemToEdit) {
                console.log(`Item to edit : ${JSON.stringify(itemToEdit)}`);
                itemToEdit.itemName = newObject.newItemName;
                itemToEdit.itemCode = newObject.newItemCode;
                itemToEdit.itemPrice = newObject.newItemPrice;
                itemToEdit.stock = newObject.newItemStock;
            }
            else console.log('Error while trying to update the values from total items');
            
        }
     
        
    }
})