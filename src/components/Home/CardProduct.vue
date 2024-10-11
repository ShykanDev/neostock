<template>
    <div class="">
        <div class="p-2 text-center bg-white rounded-lg shadow-lg w-72 font-poppins">
    <h2 class="mb-2 text-xl font-semibold text-sky-700">{{ itemName }}</h2>
    <p class="text-sky-800"><strong>Codigo del articulo:</strong> {{ props.itemCode }}</p>
    <p class="mb-2 text-lg font-bold text-sky-800"><strong>Precio:</strong> ${{ props.itemPrice }}</p>
    <p class="mt-3 text-lg text-sky-800"><strong>Stock:</strong> {{ props.stock }}</p>
</div>



    </div>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue';

const props = defineProps({
    itemName: {
      type: String,
      required: true,
      default: "Maquillaje default"
    },
    itemPrice: {
      type: Number,
      required: true,
      default: 35
    },
    itemCode: {
      type: String,
      required: true,
      default: "123456"
    },
    stock: {
      type: Number,
      required: true,
      default: 10
    }
})
</script>

<style scoped>

</style>