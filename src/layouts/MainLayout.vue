<template>
    <div class="flex bg-gray-200 w-dvw">
        <!-- Top bar -->
       <div class="z-50">
        <slot name="top-bar">
            <MainTopBar />
         </slot>
       </div>
         
         <!-- Main content -->
         <slot name="main-content">

         </slot>
    </div>
</template>

<script lang="ts" setup>
import MainTopBar from '@/components/header/MainTopBar.vue';


</script>

<style scoped>

</style>