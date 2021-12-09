import { createApp } from "vue";
import { Quasar, Notify } from "quasar";
import * as MathLive from 'mathlive/dist/mathlive.mjs';
import App from "./components/App.vue";
const app = createApp(App);
app.use(Quasar, { plugins: { Notify } });
app.mount("#app");
