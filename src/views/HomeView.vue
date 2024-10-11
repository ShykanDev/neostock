<template>
    <div class="">
        <MainLayout>
            <template #main-content>
                <div class="fixed top-0 bottom-0 left-[17%] right-0 py-2 overflow-auto">
                    <div class="fixed top-0 left-[19%] right-0 z-10 p-4 bg-white shadow-md">
                        <input type="text" placeholder="Buscar por nombre..."
                            class="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <section class="flex flex-wrap gap-2 px-2 justify-evenly">
                        <CardProduct v-for="item in itemStore.getTotalItems" :key="item.itemCode"
                            :item-code="item.itemCode" :item-name="item.itemName" :item-price="item.itemPrice" />
                    </section>
                </div>
            </template>
        </MainLayout>
    </div>
</template>

<script lang="ts" setup>
import CardProduct from '@/components/Home/CardProduct.vue';
import MainLayout from '@/layouts/MainLayout.vue';
import { UseItemsStore } from '@/store/UseItemsStore';

const itemStore = UseItemsStore();
</script>

<style scoped></style>