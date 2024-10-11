<template>
    <div class="">
        <MainLayout>
            <template #main-content>
                <div class="relative flex flex-col flex-1 w-full overflow-auto h-dvh">
                    <div v-if="systemValues.getIsOutOfStockScanView" class="w-full bg-black">
                        <div class="absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center bg-black bg-opacity-25">
                            <AddItemStock class="" :item-name="itemName" :item-code="itemCode"/>
                        </div>
                    </div>
                    <section v-if="systemValues.getIsSaleConfirmationView"  class="w-full">
                        <div class="absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center bg-black bg-opacity-25">
                        <SaleConfirmation :total="itemStore.getTotalCartPrice" />
                        </div>
                    </section>
                    <TransitionGroup name="list" tag="div" class="">
                        <div class="flex py-2 mb-2 bg-white rounded-b-lg shadow-md">
                            <div class="min-w-[7.6%] rounded-lg">
                                <li class="inline-block px-1 text-lg font-bold font-poppins"
                                    title="Posicion del producto en el carrito">Pos</li>
                            </div>
                            <div class="min-w-[15.35%] rounded-lg bg-white ">
                                <li class="inline-block px-1 text-lg font-bold font-poppins" title="Nombre del producto">
                                    Producto</li>
                            </div>
                            <div class="min-w-[15.35%] rounded-lg bg-white ">
                                <li class="inline-block px-1 text-lg font-bold font-poppins"
                                    title="Cantidad de veces que se venderá el producto">Cantidad</li>
                            </div>
                            <div class="min-w-[15.35%] rounded-lg bg-white ">
                                <li class="inline-block px-1 text-lg font-bold font-poppins"
                                    title="Cuantos hay en existencia o stock">Existencia</li>
                            </div>
                            <div class="min-w-[15.35%] rounded-lg bg-white ">
                                <li class="inline-block px-1 text-lg font-bold font-poppins"
                                    title="Código del producto en el sistema">Código</li>
                            </div>
                            <div class="min-w-[15.35%] rounded-lg bg-white ">
                                <li class="inline-block px-1 text-lg font-bold font-poppins"
                                    title="Precio por unidad del producto">Precio</li>
                            </div>
                            <div class="min-w-[15.35%] rounded-lg bg-white">
                                <li class="inline-block px-1 text-lg font-bold font-poppins"
                                    title="Valor del producto multiplicado por la cantidad">Subtotal</li>
                            </div>
                        </div>
                        <div v-for="(item, index) in itemStore.getCartItems" :key="item.itemCode"
                         :class="{'bg-white': index % 2 === 0, 'bg-slate-50' : index % 2 !== 0}"   class="flex items-center w-full py-3 mb-2 rounded-lg shadow-sm justify-evenly font-poppins hover:bg-sky-100 hover:shadow-md">
                            <div class="min-w-[7.6%] flex justify-center items-center">
                                <p
                                    class="inline-block text-black shadow-sm font-bold bg-white rounded-full min-w-[25%]">
                                    {{ index +1 }}
                                </p>
                                    <v-icon 
                                    v-if="isDeletionActive"

                                    @click="itemStore.deleteItemCart(index)"
                                    class="cursor-pointer active:text-red-400 hover:text-red-500 hover:scale-110"
                                    name="fa-trash" scale="1.5" color="#b91c1c" />
                            </div>

                            <p class="font-medium text-white bg-sky-950 rounded-md min-w-[15.35%]">{{ item.itemName }}
                            </p>
                            <div class="flex items-center justify-center gap-1 min-w-[15.35%]">
                                <input class="font-bold text-center text-white bg-black rounded-md w-9 max-w-12"
                                    v-model.number="item.itemQuantity" type="number" name="" id="" min="1"
                                    placeholder="1" readonly>
                                <v-icon @click="itemStore.editItemQuantity('increase', index)"
                                    class="cursor-pointer active:text-emerald-400 hover:text-emerald-700 hover:scale-110"
                                    name="bi-arrow-up-circle-fill" scale="1.5" color="#047857" />
                                <v-icon @click="itemStore.editItemQuantity('decrease', index)"
                                    class="cursor-pointer active:text-sky-400" name="bi-arrow-down-circle-fill"
                                    scale="1.5" color="#0369a1" />
                            </div>
                            <div class="min-w-[15.35%] flex justify-center items-center">
                                <div class="flex flex-wrap items-center justify-around w-[50%]">
                                    <v-icon v-if="item.stock <=5" :class="{'text-red-600' : item.stock == 0,  'text-yellow-400' : item.stock <= 5 && item.stock > 0 }"
                                    class="cursor-pointer" name="md-warning-round"
                                    scale="1.5"  title="La existencia de este producto es baja"/>
                                    <p :class="{'text-sky-800 bg-white shadow-md border-sky-800': item.stock > 5, 'border-red-600 text-red-600' : item.stock == 0, 'text-yellow-600 bg-white shadow-md border-yellow-500': item.stock <= 5 && item.stock > 0}" class="inline-block px-3 border select-none shadow-sm font-bold  rounded-lg min-w-[25%]">
                                        {{ item.stock }}</p>
                                </div>
                            </div>
                            <p class="inline-block text-base font-semibold  min-w-[15.35%]">{{ item.itemCode }}</p>
                            <div class="min-w-[15.35%]">
                                <p
                                    class="inline-block text-base  text-sky-900 font-bold bg-sky-200 rounded-md min-w-[25%]">
                                    ${{ item.itemPrice }}</p>
                            </div>
                            <div class="min-w-[15.35%]">
                                <p
                                    class="text-lg font-bold text-green-800 bg-green-100 rounded-md min-w-[60%] inline-block shadow-sm">
                                    ${{ item.itemSubtotal}}</p>
                            </div>
                        </div>
                    </TransitionGroup>
                    <div v-if="itemStore.getCartItems.length === 0" class="">
                        <h1 class="text-3xl font-medium font-poppins">Escanee o ingrese manualmente el código de barras</h1>
                        <!-- <h2 v-show="isSearchingCode" class="text-3xl">{{ isSearchingMessage }}</h2> -->
                         <div class="flex justify-center">
                             <img src="../assets/Qr Code.gif" class="w-20" alt="">
                         </div>
                        <h2 v-show="isError" class="mt-2 font-semibold text-sky-700 font-poppins">{{ errorMessage }}
                        </h2>
                        <LoaderDots v-show="isSearchingCode && barcodeValue"/>
                    </div>
                    <!-- <div class="absolute bottom-0 flex items-center justify-around w-full px-2 bg-white rounded-tr-md rounded-tl-md min-h-11 ">
                        <div class="flex items-center justify-center gap-1">
                                <input @blur="autoFocus" @input="scanResult" v-model="barcodeValue" ref="barcodeInput"
                                class="text-xl font-semibold text-center rounded-md shadow-sm outline-none placeholder:text-slate-100 text-white bg-slate-900 font-poppins min-w-28 max-w-[350px]"
                                type="text" placeholder="Escanear o ingresar">
                                <v-icon  
                                    @click="clearBarcode"
                                    class="cursor-pointer active:text-red-900 hover:text-red-500 hover:scale-110"
                                    name="ri-delete-back-2-fill" scale="1.5" color="#c41306" />
                        </div>
                        <div>
                            <div :class="{'bg-red-900 hover:bg-red-600' : !isDeletionActive, 'bg-sky-700 hover:bg-sky-600': isDeletionActive}" class="px-4 py-2 font-medium text-white transition duration-150 ease-in-out rounded-lg cursor-pointer font-poppins"
                            @click="toggleIsDelectionActive"
                            >
                            <p v-if="!isDeletionActive">Eliminar producto</p>
                            <p v-if="isDeletionActive">Desactivar eliminación</p>
                        </div>
                        </div>
                        <div>
                            <button class="px-4 py-2 text-white transition duration-150 ease-in-out rounded-lg bg-emerald-600 hover:bg-emerald-500 font-poppins"
                            >Vender</button>
                        </div>
                        <div>
                            <h3 class="p-1 px-2 text-xl font-semibold text-white rounded-md font-poppins bg-sky-800">Total: ${{ itemStore.getTotalCartPrice }}
                            </h3>
                        </div>
                    </div> -->
                    <div class="absolute bottom-0 flex items-center justify-around w-full px-2 bg-white rounded-tr-md rounded-tl-md min-h-11 ">
                        <div class="flex items-center justify-center gap-1">
                            <input @blur="autoFocus" @input="scanResult" v-model="barcodeValue" ref="barcodeInput"
                            class="text-lg font-semibold text-center rounded-md shadow-sm outline-none hover:border  placeholder:text-gray-100 text-white bg-cyan-800 font-poppins min-w-28 max-w-[350px]"
                            type="text" placeholder="Escanear o ingresar">
                            <v-icon  
                                @click="clearBarcode"
                                class="cursor-pointer active:text-cyan-700 hover:text-cyan-500 hover:scale-110"
                                name="ri-delete-back-2-fill" scale="1.5" color="#0891b2" />
                        </div>
                        <div>
                            <div :class="{'bg-cyan-900 hover:bg-cyan-950' : !isDeletionActive, 'bg-red-800 hover:bg-red-600': isDeletionActive}" class="px-4 py-[6px] font-medium text-white transition duration-150 ease-in-out rounded-lg cursor-pointer font-poppins"
                            @click="toggleIsDelectionActive"
                            >
                            <p v-if="!isDeletionActive">Eliminar producto</p>
                            <p v-if="isDeletionActive">Desactivar eliminación</p>
                            </div>
                        </div>
                        <div>
                            <button @click="handleSave" class="px-4 py-1 text-xl text-white transition duration-150 ease-in-out rounded-lg bg-cyan-900 hover:bg-cyan-700 font-poppins"
                            >Vender
                        </button>
                        </div>
                        <div>
                            <h3 class="px-2 py-1 text-xl font-semibold text-white bg-teal-600 rounded-md font-poppins">Total: ${{ itemStore.getTotalCartPrice }}
                            </h3>
                        </div>
                    </div>
                </div>
            </template>
        </MainLayout>
    </div>
</template>

<script lang="ts" setup>
import LoaderDots from '@/animations/LoaderDots.vue';
import AddItemStock from '@/components/ScanProductView/AddItemStock.vue';
import SaleConfirmation from '@/components/ScanProductView/SaleConfirmation.vue';
import MainLayout from '@/layouts/MainLayout.vue';
import { UseItemsStore } from '@/store/UseItemsStore';
import { UseSystemValues } from '@/store/UseSystemValues';
import { onMounted, onUnmounted, Ref, ref } from 'vue';

// items Store
const itemStore = UseItemsStore();
// system Store
const systemValues = UseSystemValues();

let barcodeValue = ref(); // reference to the barcode input element 
let isSearchingCode = ref(false); // boolean that will be used to show/hide the loading animation (scanResult function)
let isSearchingMessage = ref(''); // message that will be used to show/hide the loading animation (scanResult function)

// boolean that will be used to show/hide an error message and the error message
let isError = ref(false);
let errorMessage = ref('');
let timeoutId:Ref<null|number> = ref(null); // reference to the timeoutId

// values  (props) of <AddItemStock />
let itemName = ref('');
let itemCode = ref();

// function to execute when the user scans the barcode, it will search for the item (in totalItems) and add it to the list, if it doesn't exist it will show an error
const scanResult = ( ) => { 
    if (!barcodeValue.value) {
        isError.value = false;
        errorMessage.value = '';
        return  
    }
    if(timeoutId.value){
        clearTimeout(timeoutId.value)
    }
    isSearchingCode.value = true;
    isSearchingMessage.value = 'Buscando...';
    isError.value = false;
    errorMessage.value = '';

    const foundItems = itemStore.getTotalItems.filter(e => e.itemCode.toUpperCase() == barcodeValue.value.toUpperCase());
    // if the item is out of stock
    if(foundItems.length>0 && foundItems[0].stock == 0){
        barcodeValue.value = null;
        isSearchingCode.value = false;
        systemValues.setIsOutOfStockScanView(true)
        itemName.value = foundItems[0].itemName;
        itemCode.value = foundItems[0].itemCode;
        return;
    }
    //If item was found on the system, now check if exist in the cart, if so then decrease the stock of the item inside the cart
    if (foundItems.length > 0) { // if the item was found on the system
        const foundItemCart = itemStore.getCartItems.filter(e => e.itemCode == foundItems[0].itemCode);
        if(foundItemCart.length >0 && foundItemCart[0].stock ===0 ){
            barcodeValue.value = null;
            itemName.value = foundItemCart[0].itemName;
            itemCode.value = foundItemCart[0].itemCode;
            isSearchingCode.value = false;
            systemValues.setIsOutOfStockScanView(true);
            return;
        } 
        if (foundItemCart.length > 0) { // if the item was found in the cart reduce it stock by 1
            foundItemCart[0].stock--;
            foundItemCart[0].itemQuantity++;
            foundItemCart[0].itemSubtotal = foundItemCart[0].itemQuantity * Number(foundItemCart[0].itemPrice); 
            barcodeValue.value = null;
            isSearchingCode.value = false;            
    } else if (foundItemCart.length == 0) { // if the item was not found in the cart, adding it as new
            itemStore.addItemToCart(foundItems[0])
            barcodeValue.value = null;
            isSearchingCode.value = false;
    }
    else{
        timeoutId.value = setTimeout(() => {
            isSearchingCode.value = false;
            isError.value = true;
            errorMessage.value = 'No se ha encontrado el producto. Por favor, revise el código o añádalo como nuevo producto si no está registrado.';
        }, 2000)
    }
    console.log('Total items', itemStore.getTotalItems);    
}
}

// function to clear the barcode value
const clearBarcode = () => {
    barcodeValue.value = null;
    isError.value = false;
    errorMessage.value = '';
    isSearchingCode.value = false;
}
 //function to focus on the barcode input element
    const autoFocus = () => {
    // if (barcodeInput.value) barcodeInput.value.focus();
};

//value to set the delete item from cart (boolean) that will show the delete icon
let isDeletionActive = ref(false);

// toogle the isDeletionActive value to show/hide the button to delete item form list
const toggleIsDelectionActive = () => isDeletionActive.value = !isDeletionActive.value;

// function to save sale
const handleSave =():void=> systemValues.setIsSaleConfirmationView(true);

const barcodeInput = ref();
onMounted( () =>{
    autoFocus();
})

onUnmounted(() => {
    if(timeoutId.value){
        clearTimeout(timeoutId.value)
    }
})

</script>

<style scoped>
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  background-color: transparent;
  transform: translateX(30px);
}

.list-enter-to {
  background-color: white;
}

.list-leave-active {
  background-color: rgb(0, 0, 0);
  position: absolute;
}

</style>