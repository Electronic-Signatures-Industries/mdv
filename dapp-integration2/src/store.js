"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vue_1 = __importDefault(require("vue"));
const vuex_1 = __importDefault(require("vuex"));
vue_1.default.use(vuex_1.default);
exports.default = new vuex_1.default.Store({
    state: {
        barColor: "rgba(0, 0, 0, .8), rgba(0, 0, 0, .8)",
        barImage: "https://demos.creative-tim.com/material-dashboard/assets/img/sidebar-1.jpg",
        drawer: null
    },
    mutations: {
        SET_BAR_IMAGE(state, payload) {
            state.barImage = payload;
        },
        SET_DRAWER(state, payload) {
            state.drawer = payload;
        }
    },
    actions: {}
});
//# sourceMappingURL=store.js.map