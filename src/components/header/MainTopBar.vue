<template>
    <div class="bg-white shadow-[-11px_21px_13px_10px_#00000024]  h-dvh rounded-tr-sm rounded-br-3xl">
        <div class="flex items-center justify-center gap-2 py-2">
            <h1 class="text-xl text-black font-poppins">Neo Stock</h1>
        </div>
        <!-- Section of all views -->
        <article class="flex flex-col flex-wrap items-start gap-3 p-2 font-semibold select-none font-poppins">
            <div class="flex items-center w-full gap-1 transition-all duration-150 ease-out hover:cursor-pointer hover:bg-slate-400 hover:text-white hover:rounded-md">
                <v-icon  name="bi-upc-scan" scale="2" color="black"/>   
                <p>Escanear Producto</p>
            </div>
            <div class="flex items-center w-full gap-1 transition-all duration-75 ease-out hover:cursor-pointer hover:bg-slate-400 hover:text-white hover:rounded-md ">
                <v-icon name="ri-home-fill" scale="2" color="black"/>
                <p>Inicio</p>
            </div>
            <div class="flex items-center w-full gap-1 transition-all duration-75 ease-out hover:cursor-pointer hover:bg-slate-400 hover:text-white hover:rounded-md ">
                <v-icon name="md-addbox" scale="2" color="black"/>
                <p>Agregar Nuevo Producto</p>
            </div>
            <div class="flex items-center w-full gap-1 transition-all duration-75 ease-out hover:cursor-pointer hover:bg-slate-400 hover:text-white hover:rounded-md ">
                <v-icon name="md-pointofsale" scale="2" color="black"/>
                <p>Ventas</p>
            </div>
        </article>
    </div>
</template>

<script lang="ts" setup>

</script>

<style scoped>

</style>