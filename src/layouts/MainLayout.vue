<template>
    <div class="bg-slate-100">
        <!-- Top bar -->
         <slot name="top-bar">
            <MainTopBar/>
         </slot>
         
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