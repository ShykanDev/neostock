<template>
    <div class="bg-white shadow-[-11px_21px_13px_10px_#00000024]  h-dvh rounded-tr-sm rounded-br-3xl">
        <div class="flex items-center justify-center gap-2 py-2">
            <h1 class="text-xl text-black font-poppins">Neo Stock</h1>
        </div>
        <!-- Section of all views -->
        <article class="flex flex-col flex-wrap items-start gap-3 p-2 font-semibold select-none font-poppins">
            <RouterLink :to="{name: 'scan'}" class="flex items-center w-full gap-1 p-1 text-white transition-all duration-150 ease-out rounded-md bg-slate-900 hover:cursor-pointer">
                <v-icon  name="bi-upc-scan" scale="2" color="white"/>   
                <p>Escanear Producto</p>
            </RouterLink>
            <RouterLink :to="{name: 'home'}" class="flex items-center w-full gap-1 p-1 transition-all duration-150 ease-out rounded-md text-slate-800 bg-sky-100 hover:cursor-pointer">
                <v-icon name="ri-home-fill" scale="2" color="black"/>
                <p>Inicio</p>
            </RouterLink>
            <RouterLink :to="{name: 'addProduct'}" class="flex items-center w-full gap-1 p-1 transition-all duration-150 ease-out rounded-md text-slate-800 bg-sky-100 hover:cursor-pointer">
                <v-icon name="ri-home-fill" scale="2" color="black"/>
                <p>Agregar Nuevo Producto</p>
            </RouterLink>
            <RouterLink :to="{name: 'sales'}" class="flex items-center w-full gap-1 p-1 transition-all duration-150 ease-out rounded-md text-slate-800 bg-sky-100 hover:cursor-pointer">
                <v-icon name="ri-home-fill" scale="2" color="black"/>
                <p>Ventas</p>
            </RouterLink>
        </article>
    </div>
</template>

<script lang="ts" setup>
import { RouterLink } from 'vue-router';


</script>

<style scoped>

</style>