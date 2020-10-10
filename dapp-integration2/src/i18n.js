"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vue_1 = __importDefault(require("vue"));
const vue_i18n_1 = __importDefault(require("vue-i18n"));
const en_1 = __importDefault(require("vuetify/lib/locale/en"));
vue_1.default.use(vue_i18n_1.default);
const messages = {
    en: {
        ...require("@/locales/en.json"),
        $vuetify: en_1.default
    }
};
exports.default = new vue_i18n_1.default({
    locale: process.env.VUE_APP_I18N_LOCALE || "en",
    fallbackLocale: process.env.VUE_APP_I18N_FALLBACK_LOCALE || "en",
    messages
});
//# sourceMappingURL=i18n.js.map