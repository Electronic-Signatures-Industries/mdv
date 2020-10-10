"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vue_1 = __importDefault(require("vue"));
const framework_1 = __importDefault(require("vuetify/lib/framework"));
const i18n_1 = __importDefault(require("@/i18n"));
require("@/sass/overrides.sass");
require("@mdi/font/css/materialdesignicons.css"); // Ensure you are using css-loader
vue_1.default.use(framework_1.default);
const theme = {
    primary: "#4CAF50",
    secondary: "#9C27b0",
    accent: "#9C27b0",
    info: "#00CAE3"
};
exports.default = new framework_1.default({
    icons: {
        iconfont: "mdi" // default - only for display purposes
    },
    lang: {
        // @ts-ignore
        t: (key, ...params) => i18n_1.default.t(key, params)
    },
    theme: {
        themes: {
            dark: theme,
            light: theme
        }
    }
});
//# sourceMappingURL=vuetify.js.map