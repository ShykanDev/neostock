<template>
    <div class="">
        <div
            class="flex flex-col items-center gap-4 p-2 bg-white rounded-lg shadow-2xl min-w-48 min-h-80 max-w-72 font-poppins">
            <div>
                <v-icon name="bi-cart-x" scale="2" color="#FFB744" />
                <p class="text-lg font-bold font-poppins text-sky-800">'{{ props.itemName }}'</p>
                <h2 class="font-semibold text text-sky-800">No tiene existencia disponible en el sistema y no puede ser vendido a menos que sea agregada más existencia </h2>
                <h3 class="font-semibold text-orange-700">Una vez se agregue, escanee nuevamente </h3>
            </div>
            <div class="flex">
                <input v-model="stockToAdd" class="w-full text-center rounded-md shadow-sm bg-slate-200" type="number" placeholder="0" min="1" readonly>
                <v-icon @click="editStock('increase')" class="cursor-pointer active:text-emerald-400 hover:text-emerald-700 hover:scale-110"
                name="bi-arrow-up-circle-fill" scale="1.5" color="#047857" />
                <v-icon  @click="editStock('decrease')" class="cursor-pointer active:text-sky-400"
            name="bi-arrow-down-circle-fill" scale="1.5" color="#0369a1" />
        </div>
            <button
                @click="editItemStock(props.itemCode)"
                class="px-4 py-2 text-white transition duration-300 ease-in-out rounded-lg bg-emerald-600 hover:bg-emerald-500">Agregar {{ stockToAdd }}</button>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { UseItemsStore } from '@/store/UseItemsStore';
import { UseSystemValues } from '@/store/UseSystemValues';

import { defineProps, ref } from 'vue';

const itemsStore = UseItemsStore();
const systemValues = UseSystemValues();

let stockToAdd = ref(1);

const editStock = (operation: string) => {
    if (operation === 'increase') {
        stockToAdd.value++
    } else if (operation === 'decrease') {
        if (stockToAdd.value >1) {
            stockToAdd.value--
        }
    }
}

const editItemStock = (itemCode: string) => {
        itemsStore.editItemCartStock(itemCode, stockToAdd.value)
        systemValues.setIsOutOfStockScanView(false);
}
const props = defineProps({
    itemName:{
        type:String,
        default:"Maquillaje default",
        required:true
    },
    itemCode:{
        type:String,
        default:"123456",
        required:true
    }
})

</script>

<style scoped></style>