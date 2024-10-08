// import { IItem } from "@/interfaces/IItem";
// import { defineStore } from "pinia";

// export const UseItemsStore = defineStore('UseItemStore',{
//     state(){
//         return{
//             totalItems : [
//                 {
//                     itemName: "Tang de Limón",
//                     itemQuantity: 1,
//                     itemPrice: 50, // precio en números cerrados
//                     itemCode: "7622210573216",
//                     itemSubtotal: 0,
//                     stock:32 // subtotal inicialmente en 0
//                 },
//                 {
//                     itemName: "Gel Ego",
//                     itemQuantity: 1,
//                     itemPrice: 40,
//                     itemCode: "7506306247482",
//                     itemSubtotal: 0,
//                     stock:0
//                 },
//                 {
//                     itemName: "Tenis Refil",
//                     itemQuantity: 1,
//                     itemPrice: 35,
//                     itemCode: "7508635007270070349",
//                     itemSubtotal: 0,
//                     stock:15
//                 },
//                 {
//                     itemName: "Rubor en Polvo",
//                     itemQuantity: 1,
//                     itemPrice: 60,
//                     itemCode: "67630471960817727",
//                     itemSubtotal: 0,
//                     stock:16
//                 },
//                 {
//                     itemName: "Paracetamol 650mg tableta",
//                     itemQuantity: 1,
//                     itemPrice: 55,
//                     itemCode: "7501644753060",
//                     itemSubtotal: 0,
//                     stock:18
//                 },
//                 {
//                     itemName: "Caja de carton",
//                     itemQuantity: 1,
//                     itemPrice: 45,
//                     itemCode: "BZMS47464",
//                     itemSubtotal: 0,
//                     stock:16
//                 },
//                 {
//                     itemName: "Toallitas Humedas KleenBebé",
//                     itemQuantity: 1,
//                     itemPrice: 70,
//                     itemCode: "7501943471900",
//                     itemSubtotal: 0,
//                     stock:18
//                 },
//                 {
//                     itemName: "Amoxicilina",
//                     itemQuantity: 1,
//                     itemPrice: 30,
//                     itemCode: "7501349021570",
//                     itemSubtotal: 0,
//                     stock:13
//                 },
//                 {
//                     itemName: "Bicoestol Eucalipto",
//                     itemQuantity: 1,
//                     itemPrice: 25,
//                     itemCode: "714706910487",
//                     itemSubtotal: 0,
//                     stock:56
//                 },
//                 {
//                     itemName: "Paracetamol 500mg tableta",
//                     itemQuantity: 1,
//                     itemPrice: 15,
//                     itemCode: "7501361682094",
//                     itemSubtotal: 0,
//                     stock:16
//                 },
//                 {
//                     itemName: "Mascara de Pestañas",
//                     itemQuantity: 1,
//                     itemPrice: 50,
//                     itemCode: "225325471358502",
//                     itemSubtotal: 0,
//                     stock:35
//                 },
//                 {
//                     itemName: "Lápiz de Labios",
//                     itemQuantity: 1,
//                     itemPrice: 45,
//                     itemCode: "1991024575390",
//                     itemSubtotal: 0,
//                     stock:12
//                 },
//                 {
//                     itemName: "Disco Estado Solido",
//                     itemQuantity: 1,
//                     itemPrice: 25,
//                     itemCode: "IYEX07108",
//                     itemSubtotal: 0,
//                     stock:18
//                 },
//                 {
//                     itemName: "Baygon Total",
//                     itemQuantity: 1,
//                     itemPrice: 80,
//                     itemCode: "7503036165215",
//                     itemSubtotal: 0,
//                     stock:0
//                 },
//                 {
//                     itemName: "Alcohol Etílico 250ml",
//                     itemQuantity: 1 ,
//                     itemPrice: 20,
//                     itemCode: "7501020607086",
//                     itemSubtotal: 0,
//                     stock:0
//                 },
//             ],
//             cart:[] as Array<IItem>
//         }
//     },
//     getters:{
//         getTotalItems():Array<IItem>{
//             return this.totalItems;
//         },
//         getCartItems():Array<IItem>{
//             return this.cart;
//         },
//         getGrandTotal():any{
//          let allPrices = [];
//             allPrices = this.cart.map( e => e.itemSubtotal)
//             return allPrices.reduce( ( a,b) => Number(a)+Number(b),0);
//         }
//     },
//     actions:{
//         addItemToCart(itemToAdd:IItem):void{
//             const foundItem = this.cart.find( item => item.itemCode === itemToAdd.itemCode); 
//             if (foundItem) {
//                 // if item already exist just increase the quantity
//                 foundItem.itemQuantity += 1;
//                 foundItem.itemSubtotal = foundItem.itemQuantity * Number(foundItem.itemPrice);
//                 foundItem.stock = itemToAdd.stock;
//             } else {
//                 // If item does not exist, add to the cart
//                 const itemToCart = { ...itemToAdd }; // Make a copy
//                 itemToCart.itemSubtotal = itemToCart.itemQuantity * Number(itemToCart.itemPrice);
//                 itemToCart.stock--; 
//                 this.cart.push(itemToCart);
//             }
//         },
//         editItemQuantity(param:string, index:number):void{
//             // if param is 'increase' and stock is not zero
//             if(param === 'increase' && this.cart[index].stock > 0) {
//                 this.cart[index].itemQuantity ++;
//                 this.cart[index].itemSubtotal = this.cart[index].itemQuantity * Number(this.cart[index].itemPrice);
//                 this.cart[index].stock --;
//             }
//             if(param === 'decrease' && this.cart[index].stock == 0){
//                 this.cart[index].itemQuantity --;
//                 this.cart[index].stock ++;
//                 this.cart[index].itemSubtotal = this.cart[index].itemQuantity * Number(this.cart[index].itemPrice);
//             }
//             else if(param === 'decrease') { // else if param is 'decrease' then decrease the quantity
//                 if (this.cart[index].itemQuantity ===1) return;
//                 this.cart[index].itemQuantity --;
//                 this.cart[index].itemSubtotal = this.cart[index].itemQuantity * Number(this.cart[index].itemPrice);
//                 this.cart[index].stock ++;
//             }
//         },
//         editItemCartStock(itemCodeParam:string|number|bigint, newStock:number){
//             const itemCartFound = this.cart.find((e) => e.itemCode === itemCodeParam); //verificar que existe el item en el cart
//             const itemExistOnSystem = this.totalItems.find(e => e.itemCode == itemCodeParam); //verificar que el item exista en el totalItems
//            if(itemCartFound){ //si existe en el cart
//             const indexItemCart = this.cart.indexOf(itemCartFound); // index del nuevo cart
//             this.cart[indexItemCart].stock = newStock;
//             return;
//            }
//            if (itemExistOnSystem && !itemCartFound) {
//             alert(`itemBeforeStock: ${JSON.stringify(itemExistOnSystem)}`)
//             itemExistOnSystem.stock = newStock;
//             alert(`itemAfterStock: ${JSON.stringify(itemExistOnSystem)}`)
//             console.log(JSON.stringify(this.totalItems));
//             const itemToAdd = {...itemExistOnSystem};
//             itemToAdd.stock = 0;
//             itemToAdd.itemSubtotal = itemToAdd.itemQuantity * itemToAdd.itemPrice;
//             this.cart.push(itemToAdd);
//            }
//            else{
//             alert('There was an error while trying to add stock to the item')
//            }
//         },
//         deleteItemCart(indexToDelete:number):void{
//             this.cart.splice(indexToDelete,1)
//         },

//     }
// })