<template>
    <div class="bg-white shadow-[-20px_21px_13px_10px_#00000024] h-dvh rounded-tr-sm">
        <div class="flex items-center justify-center gap-2 py-2">
            <h1 class="text-xl font-bold text-black font-poppins">Neo Stock</h1>
        </div>
        <!-- Section of all views -->
        <article class="flex flex-col flex-wrap items-start gap-3 p-2 font-semibold select-none font-poppins">
            <RouterLink :class="{ 'bg-black text-white': route.name === 'scan' }" :to="{ name: 'scan' }"
                class="flex items-center w-full gap-1 p-1 transition-all duration-150 ease-out rounded-md text-slate-800 hover:bg-slate-600 hover:text-white hover:shadow-sm hover:cursor-pointer">
                <v-icon name="bi-upc-scan" scale="2" :color="route.name === 'scan' ? 'white' : 'black'" />
                <p>Escanear Producto</p>
            </RouterLink>
            <RouterLink :class="{ 'bg-black text-white': route.name === 'home' }" :to="{ name: 'home' }"
                class="flex items-center w-full gap-1 p-1 transition-all duration-150 ease-out rounded-md text-slate-800 hover:bg-slate-600 hover:text-white hover:shadow-sm hover:cursor-pointer">
                <v-icon name="ri-home-fill" scale="2" :color="route.name === 'home' ? 'white' : 'black'" />
                <p>Inicio</p>
            </RouterLink>
            <RouterLink :class="{ 'bg-black text-white': route.name === 'addProduct' }" :to="{ name: 'addProduct' }"
                class="flex items-center w-full gap-1 p-1 transition-all duration-150 ease-out rounded-md text-slate-800 hover:bg-slate-600 hover:text-white hover:shadow-sm hover:cursor-pointer">
                <v-icon name="md-addbox" scale="2" :color="route.name === 'addProduct' ? 'white' : 'black'" />
                <p>Agregar Nuevo Producto</p>
            </RouterLink>
            <RouterLink :class="{ 'bg-black text-white': route.name === 'sales' }" :to="{ name: 'sales' }"
                class="flex items-center w-full gap-1 p-1 transition-all duration-150 ease-out rounded-md text-slate-800 hover:bg-slate-600 hover:text-white hover:shadow-sm hover:cursor-pointer">
                <v-icon name="md-pointofsale" scale="2" :color="route.name === 'sales' ? 'white' : 'black'" />
                <p>Ventas</p>
            </RouterLink>

        </article>
    </div>
</template>

<script lang="ts" setup>
import { RouterLink, useRoute } from 'vue-router';

const route = useRoute();

</script>

<style scoped></style>