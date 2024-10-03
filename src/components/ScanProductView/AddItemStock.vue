<template>
    <div class="">
        <div
            class="flex flex-col items-center gap-4 p-2 bg-white rounded-lg shadow-2xl min-w-48 min-h-80 max-w-52 max-h-96 font-poppins">
            <h1 class="text-sm">'{{ props.itemName }}' no tiene existencia disponible en el sistema y no puede ser vendido a menos que sea agregada más existencia </h1>
            <div class="flex">
                <input v-model="stockToAdd" class="w-full text-center rounded-md shadow-sm bg-slate-200" type="number" placeholder="0" min="1" readonly>
                <v-icon @click="editStock('increase')" class="cursor-pointer active:text-emerald-400 hover:text-emerald-700 hover:scale-110"
                name="bi-arrow-up-circle-fill" scale="1.5" color="#047857" />
            <v-icon  @click="editStock('decrease')" class="cursor-pointer active:text-sky-400"
            name="bi-arrow-down-circle-fill" scale="1.5" color="#0369a1" />
        </div>
            <button
                @click="editOriginalStock(props.itemCode)"
                class="px-4 py-2 text-white transition duration-300 ease-in-out bg-blue-500 rounded-lg hover:bg-blue-600">Agregar {{ stockToAdd }}</button>
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

const editOriginalStock = (itemCode: number) => {
    const foundItem = itemsStore.getTotalItems.filter(e => e.itemCode == itemCode)
    alert(`(Before) Edit stock for ${JSON.stringify(foundItem[0])}`)
    itemsStore.editItemStock(itemCode, stockToAdd.value)
    foundItem[0].stock = stockToAdd.value;
    foundItem[0].stock--;

        itemsStore.addItemToCart(foundItem[0])
    alert(`(After) Edit stock for ${JSON.stringify(foundItem[0])}`)
    systemValues.setIsOutOfStockScanView(false);
}
const props = defineProps({
    itemName:{
        type:String,
        default:"Maquillaje default",
        required:true
    },
    itemCode:{
        type:Number||String,
        default:123456,
        required:true
    }
})

</script>

<style scoped></style>