<script setup lang="ts">
    import {
        Menu as IconMenu
    } from '@element-plus/icons-vue'

    import GptPromt from './components/gpt_promt/GptPromt.vue';
</script>

<template>
    <div class="common-layout">
        <el-container>
            <el-aside width="400px">
                <el-row class="tac">
                    <el-col :span="12">
                        <el-menu default-active="2" class="el-menu-vertical-demo">
                            <el-menu-item index="2">
                                <el-icon><icon-menu /></el-icon>
                                <span>GPT PROMT</span>
                            </el-menu-item>
                        </el-menu>
                    </el-col>
                </el-row>
            </el-aside>
            <el-main>
                <GptPromt />
            </el-main>
        </el-container>
    </div>
</template>
