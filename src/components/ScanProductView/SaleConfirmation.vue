<template>
    <div class="">
        <!-- <section class="fixed top-0 bottom-0 left-0 right-0 flex items-center justify-center flex-1 bg-emerald-400"> -->
        <section class="flex flex-col items-center justify-center">
            <div class="p-2 font-medium bg-white rounded-md shadow-md min-w-80 font-poppins">
                <h1 class="text-xl text-teal-700">Confirmar Venta</h1>
                <h3 class="text-slate-800">Total a cobrar: <span class="font-bold text-teal-600">${{ props.total }}</span></h3>
                <h4 class="text-slate-600">Cantidad que el cliente paga:</h4>
                <input v-model="userPayment" type="number" placeholder="Ingrese el monto"
                    class="font-medium text-center bg-teal-100 border border-teal-600 rounded-md focus:outline-none text-sky-800 placeholder:text-center placeholder:text-slate-600"
                    title="Cantidad que el cliente paga" min="0" ref="inputUserPayment">
                <div class="flex items-center justify-around">
                    <div>    
                        <h3 v-show="userPayment>= props.total" class="text-slate-800">Cambio: </h3>
                        <h4 v-show="userPayment< props.total && userPayment" class="font-semibold text-orange-800">Restan: ${{ leftMoney }}</h4>
                        <h4 v-show="userPayment>= props.total" class="font-semibold text-teal-700">${{ userChange }}</h4>
                    </div>
                </div>
                <article class="flex justify-around mt-10">
                    <button @click="cancelSale" class="p-1 text-white bg-teal-600 rounded-md hover:bg-teal-500">Cancelar</button>
                    <button @click="confirmSale" :class="{ 'cursor-not-allowed': userPayment < props.total }" class="p-1 px-2 text-white bg-teal-800 rounded-md select-none hover:bg-teal-700" >Finalizar Venta</button>
                </article>
            </div>
        </section>
    </div>
</template>

<script lang="ts" setup>
import { UseHistoryStore } from '@/store/UseHistoryStore';
import { UseItemsStore } from '@/store/UseItemsStore';
import { UseSystemValues } from '@/store/UseSystemValues';
import { computed, defineProps, onMounted, ref } from 'vue';
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

const showToastSuccess = () => {
    toast('La venta se realizo con exito!', {
        type: 'default',
        autoClose: 3000,
      });
}
const showToastError = () => {
    toast('No se puede vender ya que el dinero ingresado es insuficiente', {
        type: 'error',
        autoClose: 3000,
      });
}
const systemValues = UseSystemValues();
const itemStore = UseItemsStore();
const historyStore = UseHistoryStore();
// prop received from ScanProductView (total of the sale)
const props = defineProps({
    total:{
        type: Number,
        default: 37,
        required: true,
    },
})
const userPayment = ref();
let userChange =computed(()=> userPayment.value - props.total);
let leftMoney = computed(()=> props.total - userPayment.value);
// function to cancel the sale and set the isSaleConfirmationView to false
const cancelSale = ():void => {
    systemValues.setIsSaleConfirmationView(false);
    systemValues.setIsWindowKeyDownListener(true);
}
// value to reference the input
const inputUserPayment = ref();
// function to focus the input that will be used when this component is visible (itemStore.getIsSaleConfirmationView)
const focusInput = ():void => {
    if(systemValues.getIsSaleConfirmationView){
        if (inputUserPayment.value) inputUserPayment.value.focus();
    }
}
// function to save this sale as a success and set the isSaleConfirmationView to false
const confirmSale = (): void => {
    try {
        if (userPayment.value < props.total) {
            showToastError();
            return;
        }
        if (userPayment.value >= props.total) {
            itemStore.editTotalStock();
            historyStore.pushToHistorySales(itemStore.getCartItems);
            historyStore.pushDateToHistorySales(new Date().toLocaleString());
            historyStore.pushToGrandTotalHistory(itemStore.getTotalCartPrice);
            itemStore.clearCart();
            showToastSuccess();
            systemValues.setIsSaleConfirmationView(false);
            systemValues.setIsWindowKeyDownListener(true);
            return;
        }
    } catch (error) {
        console.log(error);
    }
}
onMounted(() => {
 focusInput();
})
</script>

<style scoped></style>