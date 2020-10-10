"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-ignore
// @ts-nocheck
const vue_1 = __importDefault(require("vue"));
const vue_router_1 = __importDefault(require("vue-router"));
const ClientDashboard_vue_1 = __importDefault(require("./views/dashboard/pages/dapp/ClientDashboard.vue"));
const Index_vue_1 = __importDefault(require("./views/dashboard/Index.vue"));
const ClientManagement_vue_1 = __importDefault(require("./views/dashboard/pages/dapp/ClientManagement.vue"));
const Management_vue_1 = __importDefault(require("./views/dashboard/pages/dapp/Management.vue"));
const Notary_vue_1 = __importDefault(require("./views/dashboard/pages/dapp/Notary.vue"));
const PKIEditor_vue_1 = __importDefault(require("./views/dashboard/pages/dapp/PKIEditor.vue"));
const Onboard_vue_1 = __importDefault(require("./views/dashboard/pages/dapp/Onboard.vue"));
const Credentials_vue_1 = __importDefault(require("./views/dashboard/pages/dapp/Credentials.vue"));
const VerifyCredentials_vue_1 = __importDefault(require("./views/dashboard/pages/dapp/VerifyCredentials.vue"));
vue_1.default.use(vue_router_1.default);
exports.default = new vue_router_1.default({
    mode: "hash",
    base: process.env.BASE_URL,
    routes: [
        {
            path: "/",
            // @ts-ignore
            component: Index_vue_1.default,
            children: [
                {
                    name: "Solicitudes",
                    path: "client",
                    component: ClientDashboard_vue_1.default
                },
                {
                    name: "Notario",
                    path: "notary",
                    // @ts-ignore
                    component: Notary_vue_1.default
                },
                {
                    name: "Subscripcion",
                    path: "register",
                    // @ts-ignore
                    component: ClientManagement_vue_1.default
                },
                {
                    name: "Admin",
                    path: "admin",
                    // @ts-ignore
                    component: Management_vue_1.default
                },
                {
                    name: "Navegador PDF",
                    path: "editor/:id/:name",
                    // @ts-ignore
                    component: PKIEditor_vue_1.default
                },
                {
                    name: "Configuracion",
                    path: "onboard",
                    // @ts-ignore
                    component: Onboard_vue_1.default
                },
                {
                    name: "Credenciales",
                    path: "credentials",
                    // @ts-ignore
                    component: Credentials_vue_1.default
                },
                {
                    name: "Verificador de credenciales",
                    path: "verify_credentials/:id",
                    // @ts-ignore
                    component: VerifyCredentials_vue_1.default
                }
            ]
        }
    ]
});
//# sourceMappingURL=router.js.map