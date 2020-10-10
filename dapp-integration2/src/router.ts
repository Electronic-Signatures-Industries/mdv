// @ts-ignore
// @ts-nocheck
import Vue from "vue";
import Router from "vue-router";
import ClientDashboard from "./views/dashboard/pages/dapp/ClientDashboard.vue";
import index from "./views/dashboard/Index.vue";
import ClientManagement from "./views/dashboard/pages/dapp/ClientManagement.vue";
import Management from "./views/dashboard/pages/dapp/Management.vue";
import Notary from "./views/dashboard/pages/dapp/Notary.vue";
import PKIEditor from "./views/dashboard/pages/dapp/PKIEditor.vue";
import Onboard from "./views/dashboard/pages/dapp/Onboard.vue";
import Credentials from "./views/dashboard/pages/dapp/Credentials.vue";
import VerifyCredentials from "./views/dashboard/pages/dapp/VerifyCredentials.vue";
Vue.use(Router);

export default new Router({
  mode: "hash",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      // @ts-ignore
      component: index,
      children: [
        {
          name: "Solicitudes",
          path: "client",
          component: ClientDashboard
        },
        {
          name: "Notario",
          path: "notary",
          // @ts-ignore
          component: Notary
        },
        {
          name: "Subscripcion",
          path: "register",
          // @ts-ignore
          component: ClientManagement
        },

        {
          name: "Admin",
          path: "admin",
          // @ts-ignore
          component: Management
        },
        {
          name: "Navegador PDF",
          path: "editor/:id/:name",
          // @ts-ignore
          component: PKIEditor
        },
        {
          name: "Configuracion",
          path: "onboard",
          // @ts-ignore
          component: Onboard
        },
        {
          name: "Credenciales",
          path: "credentials",
          // @ts-ignore
          component: Credentials
        },
        {
          name: "Verificador de credenciales",
          path: "verify_credentials/:id",
          // @ts-ignore
          component: VerifyCredentials
        }
      ]
    }
  ]
});
