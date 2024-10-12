<template>
    <div class="">
        <MainLayout>
            <template #main-content>
                <div class="fixed top-0 bottom-0 left-[21%] right-0 py-2 overflow-auto">
                    <div class="fixed top-0 left-[19%] right-0 z-10 p-4 bg-white shadow-md">
                        <input ref="inputSearch" @input="filterItems" type="text" v-model="searchFilter" placeholder="Buscar por nombre..."
                            class="w-full p-2 border border-gray-300 rounded-lg font-poppins focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <section class="flex flex-wrap justify-around gap-2 px-2 py-20">
                        <CardProduct v-for="item in searchResult" :key="item.itemCode"
                            :item-code="item.itemCode" :item-name="item.itemName" :item-price="item.itemPrice" :stock="item.stock" />
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
import { onMounted, Ref, ref } from 'vue';

const itemStore = UseItemsStore();

// result of the search
let searchResult: Ref<IItem[]> = ref(itemStore.getTotalItems);

// vmodel for the input 
let searchFilter = ref('');

const filterItems = () => {
    searchResult.value = itemStore.getTotalItems.filter((item) => item.itemName.toLowerCase().includes(searchFilter.value.toLowerCase()));
};

// ref for input search
const inputSearch = ref();

const focusInput =():void => {
    if (inputSearch.value) inputSearch.value.focus();
};

onMounted(() => {
    focusInput();
    searchResult.value = itemStore.getTotalItems;
})
</script>

<style scoped></style>