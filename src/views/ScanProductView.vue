<template>
    <div class="">
        <MainLayout>
            <template #main-content>
                <div class="relative flex flex-col flex-1 overflow-auto h-dvh">
                    <!-- <TransitionGroup name="list" tag="table" class="px-2 border-separate font-poppins border-spacing-y-2">
                     <thead>
                         <th>POS</th>
                         <th>PRODUCTO</th>
                         <th>CANTIDAD</th>
                         <th>CÓDIGO</th>
                         <th>PRECIO UNITARIO</th>
                         <th>SUBTOTAL</th>
                     </thead>
                     <tbody>
                         <tr  v-for="(item, index) in itemStore.getCartItems" :key="index" class="mb-2" >
                            <td class="inline-block font-medium text-white bg-black rounded-full min-w-6">{{ index +1 }}</td>
                            <td class="font-medium text-white bg-black rounded-md">{{ item.itemName }}</td>
                            <div class="flex items-center justify-center gap-1">
                                <input class="text-center rounded-md w-9 max-w-12" v-model.number="item.itemQuantity"  type="number" name="" id="" min="1" placeholder="1" readonly>
                                <v-icon  @click="itemStore.editItemQuantity('increase', index)" class="cursor-pointer active:text-emerald-400" name="bi-arrow-up-circle-fill" scale="1.5" color="black"/>
                                <v-icon @click="itemStore.editItemQuantity('decrease', index)" class="cursor-pointer active:text-red-600" name="bi-arrow-down-circle-fill" scale="1.5" color="black"/>
                            </div>
                            <td>{{ item.itemCode }}</td>
                            <td class="inline-block text-base font-semibold text-white bg-black rounded-md min-w-11">${{ item.itemPrice }}</td>
                           <td class="text-lg font-bold text-white bg-black rounded-md">${{ item.itemSubtotal}}</td>
                         </tr>
                     </tbody>
                    </TransitionGroup> -->
                    <TransitionGroup name="list" tag="ul" class="">
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
                        <div v-for="(item, index) in itemStore.getCartItems" :key="index"
                         :class="{'bg-white': index % 2 === 0, 'bg-slate-50' : index % 2 !== 0}"   class="flex items-center w-full py-3 mb-2 rounded-lg shadow-sm justify-evenly font-poppins hover:bg-white hover:shadow-md">
                            <div class="min-w-[7.6%] flex justify-center items-center">
                                <p
                                    class="inline-block text-black shadow-sm font-bold bg-white rounded-full min-w-[25%]">
                                    {{ index +1 }}</p>
                            </div>

                            <p class="font-medium text-white bg-sky-950 rounded-md min-w-[15.35%]">{{ item.itemName }}
                            </p>
                            <!-- <p>{{ item.itemQuantity }}</p> -->
                            <div class="flex items-center justify-center gap-1 min-w-[15.35%]">
                                <input class="font-bold text-center rounded-md w-9 max-w-12"
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
                                <p class="inline-block text-white bg-black shadow-sm font-bold  rounded-lg min-w-[25%]">
                                    {{ item.stock }}</p>
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
                    <div class="">
                        <h1 class="text-3xl">Escanee el código de barras...</h1>
                        <!-- <h2 v-show="isSearchingCode" class="text-3xl">{{ isSearchingMessage }}</h2> -->
                        
                        <h2 v-show="isError" class="mt-2 font-semibold text-sky-700 font-poppins">{{ errorMessage }}
                        </h2>
                        <LoaderDots v-show="isSearchingCode" />
                    </div>
                    <div class="fixed bottom-0 left-[17%] right-0 z-40 w-full shadow-lg bg-slate-300 min-h-11 flex items-center px-8">
                        <div class="flex pl-[3%] items-center justify-evenly w-full">
                            <input @blur="autoFocus" @input="scanResult" v-model="barcodeValue" ref="barcodeInput"
                            class="text-2xl font-semibold text-center bg-white rounded-md shadow-sm outline-none font-poppins min-w-24 max-w-56"
                            type="text">
                            <p class="px-1 text-2xl font-semibold bg-white rounded-md text-sky-800">TOTAL:${{ itemStore.getGrandTotal }} </p>
                            <button class="px-1 text-2xl font-semibold bg-white rounded-md text-sky-800" >Vender</button>
                        </div>
                    </div>
                </div>
            </template>
        </MainLayout>
    </div>
</template>

<script lang="ts" setup>
import LoaderDots from '@/animations/LoaderDots.vue';
import { IItem } from '@/interfaces/IItem';
import MainLayout from '@/layouts/MainLayout.vue';
import { UseItemsStore } from '@/store/UseItemsStore';
import { onMounted, onUnmounted, Ref, ref } from 'vue';

// store Items
const itemStore = UseItemsStore();

let barcodeValue = ref(); // reference to the barcode input element 
let isSearchingCode = ref(false); // boolean that will be used to show/hide the loading animation (scanResult function)
let isSearchingMessage = ref(''); // message that will be used to show/hide the loading animation (scanResult function)

// boolean that will be used to show/hide an error message and the error message
let isError = ref(false);
let errorMessage = ref('');
let timeoutId:Ref<null|number> = ref(null); // reference to the timeoutId


// function to execute when the user scans the barcode, it will search for the item and add it to the list, if it doesn't exist it will show an error
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

    
    const foundItems = UseItemsStore().getTotalItems.filter(e => e.itemCode == barcodeValue.value) 
    if(foundItems[0].stock == 0){
        alert(`No hay stock disponible para el producto ${foundItems[0].itemName} (${foundItems[0].itemCode})`);
        barcodeValue.value = null;
        isSearchingCode.value = false;
        return;
    }
    if (foundItems.length>0){
        foundItems[0].stock--;
        itemStore.addItemToCart(foundItems[0])
        barcodeValue.value = null;
        isSearchingCode.value = false;
        isSearchingMessage.value;
    } else{
        timeoutId.value = setTimeout(() => {
            isSearchingCode.value = false;
            isError.value = true;
            errorMessage.value = 'No se ha encontrado el producto. Por favor, revise el código o añádalo como nuevo producto si no está registrado.';
        }, 2000)
    }
    
}
 //function to focus on the barcode input element
    const autoFocus = () => {
    if (barcodeInput.value) barcodeInput.value.focus();
};

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
  background-color: rgb(255, 178, 13);
  position: absolute;
}

</style>