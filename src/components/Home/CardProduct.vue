<template>
  <div>
    <div
      class="p-4 text-center transition-transform duration-200 bg-white border border-gray-200 shadow-md rounded-xl w-80 font-poppins hover:scale-[1.02] hover:border hover:border-cyan-800">
      <!-- product name -->
      <div class="flex items-start gap-1">
        <h2 v-show="!isEditionName" class="mb-3 text-xl font-semibold text-cyan-800">{{ props.itemName }}</h2>
        <input
        @input="updateUserChanges()"
          class="w-full border-b-[1px] border-cyan-800 shadow-sm focus:outline-none text-xl font-semibold text-cyan-700"
          type="text" v-model="newItemName" v-show="isEditionName" ref="inputName">
        <v-icon @click="toggleEditionElement('name')" v-show="!isEditionName && isEditionActive"
          class="cursor-pointer text-sky-600" name="fa-edit" scale="1.5" />
        <v-icon @click="toggleEditionElement('name')" v-show="isEditionName && isEditionActive"
          class="cursor-pointer text-sky-600" name="ri-arrow-go-back-line" scale="1.5" />
      </div>
      <!-- product code -->
      <div class="flex gap-1">
        <p v-show="!isEditionCode" class="mb-1 text-slate-700"><strong>Codigo del articulo:</strong> {{ props.itemCode
          }}</p>
        <div class="flex flex-col items-center">
          <p v-show="isEditionCode" class="font-semibold text-slate-700">Codigo del articulo:</p>
          <input @input="updateUserChanges()" v-show="isEditionCode" type="text" v-model="newItemCode"
            class="w-full border-b-[1px] border-orange-700 text-orange-600 shadow-sm focus:outline-none" ref="inputCode">
        </div>
        <v-icon @click="toggleEditionElement('code')" v-show="!isEditionCode && isEditionActive"
          class="cursor-pointer text-sky-600" name="fa-edit" scale="1.5" />
        <v-icon @click="toggleEditionElement('code')" v-show="isEditionCode && isEditionActive"
          class="cursor-pointer text-sky-600" name="ri-arrow-go-back-line" scale="1.5" />
      </div>
      <!-- product price -->
      <div class="flex gap-1">
        <p v-show="!isEditionPrice" class="mb-2 text-lg text-slate-700"><strong>Precio:</strong> ${{ props.itemPrice }}
        </p>
        <div class="flex flex-col items-center">
          <p v-show="isEditionPrice" class="text-lg font-semibold text-slate-700">Precio:</p>
          <input @input="updateUserChanges()" v-show="isEditionPrice" type="number" v-model="newItemPrice"
            class="w-full text-center border-b-[1px] border-emerald-700 text-emerald-600 shadow-sm focus:outline-none font-semibold" ref="inputPrice" min="0">
        </div>
        <v-icon @click="toggleEditionElement('price')" v-show="!isEditionPrice && isEditionActive"
          class="cursor-pointer text-sky-600" name="fa-edit" scale="1.5" />
        <v-icon @click="toggleEditionElement('price')" v-show="isEditionPrice && isEditionActive"
          class="cursor-pointer text-sky-600" name="ri-arrow-go-back-line" scale="1.5" />
      </div>
      <!-- product stock -->
      <div class="flex gap-1">
        <p v-show="!isEditionStock" class="text-lg text-slate-700"><strong>Existencia:</strong> {{ props.stock }}</p>
        <div class="flex flex-col items-center">
          <p v-show="isEditionStock" class="text-lg font-semibold text-slate-700">Existencia:</p>
          <input @input="updateUserChanges()" v-show="isEditionStock" type="number" v-model="newItemStock"
            class="w-full border-b-[1px] border-slate-700 text-sky-700 shadow-sm focus:outline-none font-semibold" ref="inputStock" min="0">
        </div>
        <v-icon @click="toggleEditionElement('stock')" v-show="!isEditionStock && isEditionActive"
          class="cursor-pointer text-sky-600" name="fa-edit" scale="1.5" />
        <v-icon @click="toggleEditionElement('stock')" v-show="isEditionStock && isEditionActive"
          class="cursor-pointer text-sky-600" name="ri-arrow-go-back-line" scale="1.5" />
      </div>
      <div class="flex justify-between">
        <button @click="toggleEditionActive"
          class="px-4 py-2 mt-2 text-white transition duration-150 ease-in-out rounded-lg bg-emerald-600 hover:bg-emerald-500"
          :class="isEditionActive ? 'bg-red-600 hover:bg-red-500' : 'bg-sky-900 hover:bg-sky-800'">
          {{ isEditionActive ? 'Cancelar' : 'Editar ' }}
        </button>
        <button  @click="saveUpdates" v-show="isEditionActive" class="px-4 py-2 mt-2 text-white transition duration-150 ease-in-out rounded-lg bg-sky-700 hover:bg-sky-500">Guardar</button>

        <!-- <button class="px-4 py-2 mt-2 text-white transition duration-150 ease-in-out bg-red-900 rounded-lg hover:bg-red-500">Eliminar Producto</button> -->
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { IItem } from '@/interfaces/IItem';
import { INewItem } from '@/interfaces/INewItem';
import { UseItemsStore } from '@/store/UseItemsStore';
import { defineProps, nextTick, reactive, Ref, ref } from 'vue';

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
  },
  index:{
    type:Number,
    required:true,
  }
})
// store items
const itemStore = UseItemsStore();

// new ref values for edition
let newItemName = ref(props.itemName);
let newItemPrice = ref(props.itemPrice);
let newItemCode = ref(props.itemCode);
let newItemStock = ref(props.stock);

// boolean value for editionActive
let isEditionActive = ref(false);

// values to change the boolean status to edit of each element of the props (visualize the edition mode)
let isEditionName = ref(false);
let isEditionCode = ref(false);
let isEditionPrice = ref(false);
let isEditionStock = ref(false);

// reference to the input element of each element to be focused with a function
let inputName = ref();
let inputCode = ref();
let inputPrice = ref();
let inputStock = ref();

// if cancel button is pressed this function will return the newValues of each element to their original values from props
const resetNewValue = (newValue:string):void => {
  switch (newValue) {
    case 'newItemName':
      newItemName.value = props.itemName;
      break;
    case 'newItemCode':
      newItemCode.value = props.itemCode;
      break
    case 'newItemPrice' :
      newItemPrice.value = props.itemPrice;
      break;
    case 'newItemStock' :
      newItemStock.value = props.stock;
      break;
      case 'restoreAll' :
      newItemName.value = props.itemName;
      newItemCode.value = props.itemCode;
      newItemPrice.value = props.itemPrice;
      newItemStock.value = props.stock;
      break;
  }

}  

// function to focus the input element of each element
const focusInput = async(element: string) => {
  await nextTick()
  switch (element) {
    case 'name':
     if (inputName.value) inputName.value.focus();
      break;
    case 'code':
     if (inputCode.value) inputCode.value.focus();
      break;
    case 'price':
     if (inputPrice.value) inputPrice.value.focus();
      break;
    case 'stock':
     if (inputStock.value) inputStock.value.focus();
      break;
  }
}

// function to toggle the value of specific element , and second param is for restore the original value of the element
const toggleEditionElement = (element: string):void => {
  switch (element) {
    case 'name':
      isEditionName.value = !isEditionName.value;
      focusInput('name');
      break;
    case 'code':
      isEditionCode.value = !isEditionCode.value;
      focusInput('code');
      break;
    case 'price':
      isEditionPrice.value = !isEditionPrice.value;
      focusInput('price');
      break;
    case 'stock':
      isEditionStock.value = !isEditionStock.value;
      focusInput('stock');
      break;
    case 'allFalse':
      isEditionName.value = false;
      isEditionCode.value = false;
      isEditionPrice.value = false;
      isEditionStock.value = false;
      // set the userChanges object to its defaults values
      break;
  }
}


//  function to toggle the editionActive value to make the edition mode active
const toggleEditionActive = () => {
  isEditionActive.value = !isEditionActive.value;
  toggleEditionElement('allFalse');
  resetNewValue('restoreAll');
}

// const value to store the user changes
let userChanges = reactive<INewItem>({
  newItemName : props.itemName,
  newItemCode : newItemCode.value,
  newItemPrice : newItemPrice.value, 
  newItemStock : newItemStock.value,
})

// function to add changes added to userChanges
const updateUserChanges = ():void =>{
  console.clear()
  const userChangesBeforeUpdate = ({...userChanges})
  console.log(`UserChanges before update: ${JSON.stringify(userChangesBeforeUpdate)}` );  
  userChanges.newItemName = newItemName.value;
  userChanges.newItemCode = newItemCode.value;
  userChanges.newItemPrice = newItemPrice.value;
  userChanges.newItemStock = newItemStock.value;
  // switch (valueToUpdate) {
  //   case 'name':
  //     userChanges.newItemName = newItemName.value;
  //     break;
  //   case 'code':
  //     userChanges.newItemCode = newItemCode.value;
  //     break;
  //   case 'price':
  //     userChanges.newItemPrice = newItemPrice.value;
  //     break;
  //   case 'stock':
  //     userChanges.newItemStock = newItemStock.value;
  //     break;
  // }
  console.log(`UserChanges after ${JSON.stringify(userChanges)}`);
}

// function to save the update
const saveUpdates = ():boolean => {
  try {
    // itemStore.editOriginalItem({...userChanges}, props.index)
    if (itemStore.editOriginalItem({...userChanges}, props.itemCode)){
      isEditionActive.value = false;
      toggleEditionElement('allFalse');
      showToastSuccess();
      return true;
    }
    showToastError();
    return false;
  } catch (e){
    showToastError();
    console.log(e)
    return false;
  }
}

import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

const showToastSuccess = () => {
    toast('Datos actualizados correctamente', {
        type: 'success',
        autoClose: 3000,
      });
}
const showToastError = () => {
    toast('Ha ocurrido un error, intentalo de nuevo', {
        type: 'error',
        autoClose: 3000,
      });
}

</script>

<style scoped></style>