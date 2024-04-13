// .vitepress/theme/index.js
import DefaultTheme from 'vitepress/theme'
import { enhanceAppWithTabs } from 'vitepress-plugin-tabs/client'
import MLayout from './Layout.vue'
import Test from "./Test.vue";

import './custom.scss'




export default {
    ...DefaultTheme,
    Layout: MLayout,
    enhanceApp({ app }) {
        enhanceAppWithTabs(app)
        app.component('Test', Test)
    }
}
