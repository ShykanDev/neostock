import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import './styles.css'
import { OhVueIcon, addIcons } from "oh-vue-icons";
import { FaFlag, RiZhihuFill, BiUpcScan,MdAddbox,RiHomeFill,MdPointofsale, BiArrowUpCircleFill, BiArrowDownCircleFill, BiCartX, MdWarningRound, RiDeleteBack2Fill, FaTrash,GiReceiveMoney, FaEdit, RiArrowGoBackLine, MdDashboardRound   } from "oh-vue-icons/icons";
addIcons(FaFlag, RiZhihuFill, BiUpcScan,MdAddbox,RiHomeFill,MdPointofsale, BiArrowUpCircleFill, BiArrowDownCircleFill, BiCartX, MdWarningRound, RiDeleteBack2Fill, FaTrash,GiReceiveMoney, FaEdit, RiArrowGoBackLine, MdDashboardRound  );
import Vue3Toastify from 'vue3-toastify'; // Importa Vue3Toastify
import 'vue3-toastify/dist/index.css'; // Importa los estilos de Vue3Toastify
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)



const app = createApp(App)
app.use(router)
app.use(pinia)
app.use(Vue3Toastify, { // Usa Vue3Toastify
    autoClose: 3000,
    // Puedes agregar más opciones si es necesario
  });
  
app.component("v-icon", OhVueIcon)
app.mount('#app')
