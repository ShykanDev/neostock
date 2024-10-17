<template>
    <div class="">
        <MainLayout>
            <template #main-content>
                <section class="flex flex-col items-center flex-1 bg-slate-100">
                    <!-- title -->
                   
                    <article class="fixed top-0 bottom-0 left-[19.6%] right-0 overflow-auto bg-slate-100">
                        <div class="fixed top-0 left-[19.6%] right-0 py-1 text-3xl font-medium bg-white font-poppins text-sky-800 ">
                        <h1>Historial de Ventas</h1>
                    </div>
                        <div class="flex flex-wrap items-start gap-2 p-2 overflow-auto justify-evenly pt-9 ">
                        <div class="p-4 my-4 bg-white rounded-lg shadow-md w-[30%] min-h-[350px] max-h-[450px] hover:border hover:border-cyan-800 " 
                        v-for="(item, index) in UseHistoryStore().getHistorySales" :key="index">
                            <h2 v-show="index === 0" class="px-2 mb-2 font-semibold text-white font-poppins bg-sky-900 rounded-xl">Ultima Venta</h2>
                            <!-- Date -->
                            <h3 class="mb-2 text-sm font-semibold text-sky-800 font-poppins">
                               Fecha: {{ UseHistoryStore().getDateHistorySales[index] }}
                            </h3>
                            <h4 class="inline-block px-2 mb-2 text-sm font-semibold text-white bg-emerald-700 rounded-xl font-poppins">Total: ${{ UseHistoryStore().getGrandTotalHistory[index] }}</h4>
                            <!-- Items -->
                            <div v-for="(item2, index2) in item" :key="index2"
                                class="p-2 mb-2 ml-4 bg-gray-100 rounded-lg shadow-sm">
                                <div class="flex items-center gap-2 font-semibold font-poppins">
                                    <p class="text-sm text-sky-800">{{ item2.itemQuantity }}</p>
                                    <p class="text-gray-800">
                                        {{ item2.itemName }}
                                    </p>
                                    <p class="font-semibold text-emerald-600">${{ item2.itemSubtotal }}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    </article>
                  
                </section>
            </template>
        </MainLayout>
    </div>
</template>

<script lang="ts" setup>
import MainLayout from '@/layouts/MainLayout.vue';
import { UseHistoryStore } from '@/store/UseHistoryStore';


</script>

<style scoped></style>