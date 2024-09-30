<template>
    <div class="">
        <MainLayout>
            <template #main-content>
                <div class="flex flex-col flex-1 h-dvh">
                    <table class="font-poppins">
                     <thead>
                         <th>Pos</th>
                         <th>Producto</th>
                         <th>Cantidad</th>
                         <th>Código</th>
                         <th>Precio Unitario</th>
                         <th>Total</th>
                     </thead>
                     <tbody>
                        <!-- <tr v-for="(item, index) in sale" :key="index">{{ index }} {{ item.itemName }} {{ item.itemCode }} {{ item.itemPrice }}</tr> -->
                         <tr v-for="(item, index) in sale" :key="index">
                            <td>{{ index +1 }}</td>
                            <td>{{ item.itemName }}</td>
                            <input class="text-center rounded-md w-9 max-w-12" v-model.number="item.itemQuantity"  type="number" name="" id="" min="1" placeholder="1">
                            <td>{{ item.itemCode }}</td>
                            <td>${{ item.itemPrice }}</td>
                           
                         </tr>
                     </tbody>
                    </table>
                    <div class="">
                        <h1 class="text-3xl">Escanee el código de barras...</h1>
                        <!-- <h2 v-show="isSearchingCode" class="text-3xl">{{ isSearchingMessage }}</h2> -->
                        <input @blur="autoFocus" @input="scanResult" v-model="barcodeValue" ref="barcodeInput" class="text-3xl font-bold text-center bg-white rounded-md shadow-sm outline-none font-poppinsa" type="text">
                        <h2 v-show="isError" class="mt-2 font-semibold text-sky-700 font-poppins">{{ errorMessage }}</h2>
                        <LoaderDots v-show="isSearchingCode"/>
                    </div>
                    <div class="fixed bottom-0 left-0 right-0 bg-red-500 min-h-11">

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
import { onMounted, Ref, ref } from 'vue';

let barcodeValue = ref(); // reference to the barcode input element 
let isSearchingCode = ref(false); // boolean that will be used to show/hide the loading animation (scanResult function)
let isSearchingMessage = ref(''); // message that will be used to show/hide the loading animation (scanResult function)

// boolean that will be used to show/hide an error message and the error message
let isError = ref(false);
let errorMessage = ref('');
let timeoutId:Ref<null|number> = ref(null); // reference to the timeoutId

// Value for store the result of the scan (if exists)  
let sale:Ref<Array<IItem>> = ref([]);

// function to execute when the user scans the barcode, it will search for the item and add it to the list, if it doesn't exist it will show an error
const scanResult = ( ) => { 
    if(timeoutId.value){
        clearTimeout(timeoutId.value)
    }
    isSearchingCode.value = true;
    isSearchingMessage.value = 'Buscando...';
    isError.value = false;
    errorMessage.value = '';

    
    const foundItems = UseItemsStore().getTotalItems.filter(e => e.itemCode == barcodeValue.value) 
    if (foundItems.length>0){
        console.log(foundItems[0])
        foundItems[0].itemQuantity = 1
        sale.value.push(foundItems[0]);
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


</script>

<style scoped>

</style>