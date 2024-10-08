import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import './styles.css'
import { OhVueIcon, addIcons } from "oh-vue-icons";
import { FaFlag, RiZhihuFill, BiUpcScan,MdAddbox,RiHomeFill,MdPointofsale, BiArrowUpCircleFill, BiArrowDownCircleFill, BiCartX, MdWarningRound, RiDeleteBack2Fill, FaTrash   } from "oh-vue-icons/icons";
addIcons(FaFlag, RiZhihuFill, BiUpcScan,MdAddbox,RiHomeFill,MdPointofsale, BiArrowUpCircleFill, BiArrowDownCircleFill, BiCartX, MdWarningRound, RiDeleteBack2Fill, FaTrash  );
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)



const app = createApp(App)
app.use(router)
app.use(pinia)
app.component("v-icon", OhVueIcon)
app.mount('#app')
