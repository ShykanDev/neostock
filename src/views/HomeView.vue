<template>
    <div class="">
        <MainLayout>
            <template #main-content>
                <div class="fixed top-0 bottom-0 left-[21%] right-0 py-2 overflow-auto">
                    <div class="fixed top-0 left-[19%] right-0 z-10 p-4 bg-white shadow-md">
                        <h1 class="text-3xl font-medium font-poppins text-sky-800">Listado de todos los productos</h1>
                        <div class="flex w-full">
                            <input ref="inputSearch" @input="filterItems" type="text" v-model="searchFilter" placeholder="Buscar por nombre..."
                            class="w-full p-2 border border-gray-300 rounded-lg font-poppins focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        </div>
                    </div>
                    
                    <section class="flex flex-wrap justify-around gap-2 px-2 py-28">
                    <article v-show="searchResult.length === 0 ">
                        <h1 class="text-xl font-medium font-poppins text-sky-800">No se encontró ningun resultado, prueba verificando el nombre del producto nuevamente</h1>
                        <button @click="resetInput" class="px-4 py-2 mt-2 text-white transition duration-150 ease-in-out rounded-lg font-poppins bg-sky-700 hover:bg-sky-500">Regresar al listado de todos los productos</button>
                    </article>
                        <CardProduct v-for="(item, index) in searchResult" :key="item.itemCode"
                            :item-code="item.itemCode" :item-name="item.itemName" :item-price="item.itemPrice" :stock="item.stock" :index="index"/>
                    </section>
                </div>
            </template>
        </MainLayout>
    </div>
</template>

<script lang="ts" setup>
import CardProduct from '@/components/Home/CardProduct.vue';
import { IItem } from '@/interfaces/IItem';
import MainLayout from '@/layouts/MainLayout.vue';
import { UseItemsStore } from '@/store/UseItemsStore';
import { onMounted, onUnmounted, Ref, ref } from 'vue';

const itemStore = UseItemsStore();

// result of the search
let searchResult: Ref<IItem[]> = ref(itemStore.getTotalItems);

// vmodel for the input 
let searchFilter = ref('');

// function to filter the items by name 
const filterItems = () => searchResult.value = itemStore.getTotalItems.map(item => item).filter((item) => item.itemName.toLowerCase().includes(searchFilter.value.toLowerCase()));

// ref for input search
const inputSearch = ref();

// function to focus the input element for the search bar (used onmounted)
const focusInput =():void => {
    if (inputSearch.value) inputSearch.value.focus();
};

// function to reset the input value 
const resetInput = ():void => {
    searchFilter.value = '';
    searchResult.value = itemStore.getTotalItems;
    focusInput();
}
onMounted(() => {
    focusInput();
    searchResult.value = itemStore.getTotalItems;
})

onUnmounted(() => {
    searchResult.value = itemStore.getTotalItems;
})
</script>

<style scoped></style>