<script setup>

import { ref, onMounted } from "vue";

import "./codepencil/dist/css/codepencil.css";



const props = defineProps({
    text: {
        type: String,
        default: '🚀运行示例'
    },
    refreshText: {
        type: String,
        default: '刷新'
    },
    closeText: {
        type: String,
        default: '关闭'
    },
    title: {
        type: String,
        default: ''
    },
    src: {
        type: String,
        default: ''
    }
})




const codepen = ref(null);

onMounted(() => {

    import('./codepencil/dist/js/codepencil.esm.js').then((module) => {
                new module.default(codepen.value, {
                runAway:true,
                multiple: true,
                paths: {
                    css: [
                        '/quicktab/quicktab/dist/css/quicktab.min.css'
                    ],
                    js: [
                        '/quicktab/quicktab/dist/js/quicktab.min.js'
                    ]
                },
                html: `<div id="qtabx" data-qt-toggle="quicktab" data-qt-defaultTabs='[{"url":"/quicktab/welcome.html","title":"首页"}]'
                data-qt-responsive-enable="true" data-qt-responsive-breakpoint="576" data-qt-onInit="init">
            </div>`,
                js: ` function init(quicktab) {
                    console.log('quicktab实例化完毕,this指向的是当前的Quicktab实例:', this);
                }`
            })
    })


})


</script>


<template>
    <div ref="codepen"></div>
</template>

<style scoped lang="scss"></style>
