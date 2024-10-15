<template>
    <div class="">
        <MainLayout>
            <template #main-content>
                <div class="flex flex-1">
                    <section class="flex flex-col items-center justify-center w-full min-h-screen gap-2 bg-slate-50" >
                        <div class="fixed top-0 left-0 right-0 bg-white shadow-sm min-h-12"></div>
                        <div class="fixed top-0 flex items-center justify-center flex-1 mt-1 min-h-6 "><h2 class="text-3xl font-medium font-poppins text-sky-800">Agregar nuevo producto</h2></div>
                        <div class="bg-white w-[90%] max-w-4xl p-6 mt-12 rounded-xl shadow-lg">
                            <div class="space-y-6">
                                <div>
                                    <h2 class="text-2xl font-medium font-poppins text-sky-800">
                                        Nombre del producto
                                    </h2>
                                    <input
                                        v-model="itemNameToAdd"
                                        @input="updateNewItem('itemName')"
                                        class="w-full max-w-md p-3 mt-2 font-medium text-center bg-white border rounded-lg font-poppins border-sky-600 focus:outline-none text-sky-800 placeholder:text-center placeholder:text-slate-500"
                                        type="text" placeholder="Ingrese el nombre del producto">
                                </div>
                                <div>
                                    <h2 class="text-2xl font-medium font-poppins text-sky-800">
                                        Código del producto
                                    </h2>
                                    <input
                                        v-model="itemCodeToAdd"
                                        @input="updateNewItem('itemCode')"
                                        class="w-full max-w-md p-3 mt-2 font-medium text-center bg-white border rounded-lg font-poppins border-sky-600 focus:outline-none text-sky-800 placeholder:text-center placeholder:text-slate-500"
                                        type="text" placeholder="Ingrese/Escanee el Código del producto">
                                </div>
                                <div>
                                    <h2 class="text-2xl font-medium font-poppins text-sky-800">
                                        Precio del producto
                                    </h2>
                                    <input
                                        v-model="itemPriceToAdd"
                                        @input="updateNewItem('itemPrice')"
                                        class="w-full max-w-md p-3 mt-2 font-medium text-center bg-white border rounded-lg font-poppins border-sky-600 focus:outline-none text-sky-800 placeholder:text-center placeholder:text-slate-500"
                                        type="number" placeholder="Ingrese el precio del producto" min="1">
                                </div>
                                <div>
                                    <h2 class="text-2xl font-medium font-poppins text-sky-800">
                                        Existencia del producto
                                    </h2>
                                    <input
                                        v-model="itemStockToAdd"
                                        @input="updateNewItem('stock')"
                                        class="w-full max-w-md p-3 mt-2 font-medium text-center bg-white border rounded-lg font-poppins border-sky-600 focus:outline-none text-sky-800 placeholder:text-center placeholder:text-slate-500"
                                        type="number" placeholder="Ingrese la existencia del producto" min="1">
                                </div>
                            </div>
                            <div class="flex justify-center mt-8">
                                <button
                                    @click="saveInfo"
                                    class="px-8 py-3 font-bold text-white rounded-md bg-sky-800 hover:bg-sky-700 focus:outline-none">
                                    Guardar
                                </button>
                            </div>
                        </div>
                    </section>
                </div>
            </template>
        </MainLayout>
    </div>
</template>

<script lang="ts" setup>
import MainLayout from '@/layouts/MainLayout.vue';
import { UseItemsStore } from '@/store/UseItemsStore';
import { Prop, reactive, ref } from 'vue';
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

// values to vmodel all the inputs
let itemNameToAdd = ref('');
let itemCodeToAdd = ref('');
let itemPriceToAdd = ref();
let itemStockToAdd = ref();


// Items Store
const itemStore = UseItemsStore();

const newItem = reactive({
    itemName: "",
    itemQuantity: 1,
    itemPrice: 0,
    itemCode: "",
    itemSubtotal: 0,
    stock: 0
})

const propertyTupla = ['itemName', 'itemPrice', 'itemCode', 'stock'] as const;

type Property = typeof propertyTupla[number];

// update new item on input 
const updateNewItem = (property:Property) => {
        switch (property) {
            case 'itemName':
                newItem.itemName = itemNameToAdd.value;
                break;
            case 'itemPrice':
                newItem.itemPrice = itemPriceToAdd.value;
                break;
            case 'itemCode':
                newItem.itemCode = itemCodeToAdd.value;
                break;
            case 'stock':
                newItem.stock = itemStockToAdd.value;
                break;
        }
}
// add new product to the database
const saveInfo = (): boolean => {
    // verify if all the fields are completed
    if (newItem.itemName === "" || newItem.itemPrice === 0 || newItem.itemCode === "" || newItem.stock === 0) {
        showToastWarning('Hay valores que no han sido ingresados, por favor verifique nuevamente'); 
        return false;
    }
    // verify if item name already exist in the system
    if (itemStore.getTotalItems.some(item => item.itemName.toLowerCase() === newItem.itemName.trim().toLowerCase() )) {
        showToastError('El nombre del producto ya existe en la base de datos, por favor verifique nuevamente');
        return false;
    }
    // verify if item already exist in the system
    if (itemStore.getTotalItems.some(item => item.itemCode === newItem.itemCode)) {
        showToastError('El Código del producto ya existe en la base de datos, por favor verifique nuevamente');
        return false;
    }
    if (itemStore.addNewItemToTotalItems(newItem)) {
        showToastSuccess();
        itemNameToAdd.value = '';
        itemCodeToAdd.value = '';
        itemPriceToAdd.value = 0;
        itemStockToAdd.value = 0;
        return true;
    }
    return false;
}

// visual toast 
const showToastSuccess = () => {
    toast('El producto se agregó correctamente', {
        type: 'success',
        autoClose: 3000,
      });
}
const showToastWarning = (warningName:string) => {
    toast(warningName, {
        type: 'warning',
        autoClose: 3000,
      });
}
const showToastError = (errorName:string) => {
    toast(errorName, {
        type: 'error',
        autoClose: 3000,
      });
}

</script>

<style scoped></style>