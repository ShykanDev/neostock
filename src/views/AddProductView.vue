<template>
    <div class="">
        <MainLayout>
            <template #main-content>
                <div class="flex flex-1">
                    <section class="flex flex-col items-center justify-center w-full min-h-screen gap-2 bg-slate-50" >
                        <div class="flex items-center justify-center "><h2 class="text-3xl font-medium font-poppins text-sky-800">Agregar nuevo producto</h2></div>
                        <div class="bg-white w-[90%] max-w-4xl p-6 rounded-xl shadow-lg">
                            <div class="space-y-6">
                                <div>
                                    <h2 class="text-2xl font-medium font-poppins text-sky-800">
                                        Nombre del producto
                                    </h2>
                                    <input
                                        class="w-full max-w-md p-3 mt-2 font-medium text-center bg-white border rounded-lg font-poppins border-sky-600 focus:outline-none text-sky-800 placeholder:text-center placeholder:text-slate-500"
                                        type="text" placeholder="Ingrese el nombre del producto">
                                </div>
                                <div>
                                    <h2 class="text-2xl font-medium font-poppins text-sky-800">
                                        Código del producto
                                    </h2>
                                    <input
                                        class="w-full max-w-md p-3 mt-2 font-medium text-center bg-white border rounded-lg font-poppins border-sky-600 focus:outline-none text-sky-800 placeholder:text-center placeholder:text-slate-500"
                                        type="text" placeholder="Ingrese/Escanee el Código del producto">
                                </div>
                                <div>
                                    <h2 class="text-2xl font-medium font-poppins text-sky-800">
                                        Precio del producto
                                    </h2>
                                    <input
                                        class="w-full max-w-md p-3 mt-2 font-medium text-center bg-white border rounded-lg font-poppins border-sky-600 focus:outline-none text-sky-800 placeholder:text-center placeholder:text-slate-500"
                                        type="number" placeholder="Ingrese el precio del producto" min="0">
                                </div>
                                <div>
                                    <h2 class="text-2xl font-medium font-poppins text-sky-800">
                                        Existencia del producto
                                    </h2>
                                    <input
                                        class="w-full max-w-md p-3 mt-2 font-medium text-center bg-white border rounded-lg font-poppins border-sky-600 focus:outline-none text-sky-800 placeholder:text-center placeholder:text-slate-500"
                                        type="number" placeholder="Ingrese la existencia del producto" min="1">
                                </div>
                            </div>
                            <div class="flex justify-center mt-8">
                                <button
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


</script>

<style scoped></style>