<template>
    <h1>GPT PROMT</h1>

    <div>
        <el-form
                ref="ruleFormRef"
                :model="ruleForm"
                label-width="200px"
                class="demo-ruleForm"
                status-icon>
            <el-form-item label="Страница">
                <el-input v-model="ruleForm.pageName" />
            </el-form-item>
            <el-form-item label="Продающая статья">
                <el-switch v-model="ruleForm.isSellingArticle" />
            </el-form-item>
            <el-form-item label="Обязательные вхождения">
                <el-input
                    v-model="ruleForm.requiredIn"
                    :rows="2"
                    type="textarea"
                />
            </el-form-item>
            <el-form-item label="Обязательные слова">
                <el-input
                    v-model="ruleForm.requiredWords"
                    :rows="2"
                    type="textarea"
                />
            </el-form-item>
            <el-form-item label="Дополнительные фразы">
                <el-input
                    v-model="ruleForm.requiredFact"
                    :rows="2"
                    type="textarea"
                />
            </el-form-item>
            <el-form-item label="Кол-во символов">
                <el-input-number v-model="ruleForm.count" :min="1" :max="5000" />
            </el-form-item>
            <el-form-item v-if="generated.isGenerated">
                <div class="promt-result">
                    <div class="promt-result_copy">
                        <el-button @click="copyResult" type="primary" :icon="CopyDocument" circle />
                    </div>
                    <el-divider content-position="left">Результат</el-divider>
                    <div class="promt-result_text" ref="resultRef">
                        <p v-if="ruleForm.pageName">Напиши <template v-if="ruleForm.isSellingArticle">продающую</template> статью: "{{ ruleForm.pageName }}" </p>
                        <p v-if="ruleForm.requiredIn">Обязательные вхождения: {{ brReplace(ruleForm.requiredIn) }}. </p>
                        <p v-if="ruleForm.requiredWords">Обязательные слова: {{ brReplace(ruleForm.requiredWords) }}. </p>
                        <p v-if="ruleForm.requiredFact">Дополнительные фразы: {{ brReplace(ruleForm.requiredFact) }}. </p>
                        <p v-if="ruleForm.pageName">Количество символов: {{ ruleForm.count }}. </p>
                    </div>
                </div>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm">Создать</el-button>
                <el-button @click="resetForm">Сбросить</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script lang="ts" setup>

import {reactive, ref} from 'vue'
import type { FormInstance } from 'element-plus'
import {
    CopyDocument
} from '@element-plus/icons-vue'

import { ElNotification } from 'element-plus'

interface RuleForm {
    pageName: string
    requiredIn: string
    requiredWords: string
    requiredFact: string
    count: number,
    isSellingArticle: boolean
}

interface Generated {
    isGenerated: boolean,
    resultText: string
}

const ruleFormRef = ref<FormInstance>()
const resultRef = ref<HTMLDivElement>()
const ruleForm = reactive<RuleForm>({
    pageName: '',
    requiredIn: '',
    requiredWords: '',
    requiredFact: '',
    count: 1000,
    isSellingArticle: true
})

const generated = reactive<Generated>({
    isGenerated: false,
    resultText: ''
})

const submitForm = async () => {
    console.log("me");
    generated.isGenerated = true;
}

const resetForm = () => {
    // if (!formEl) return
    generated.isGenerated = false;
    // ruleForm.resetFields()
}

const copyResult = () => {
    if(resultRef.value?.textContent) {
        navigator.clipboard.writeText(resultRef.value?.textContent)
            .then(() => {
                ElNotification({
                    title: 'Текст скопирован',
                    message: "",
                })
            })
            .catch(err => {
                console.log('Something went wrong', err);
            });
    }
}

const brReplace = (str: string) => {
    return str.replace(/(?:\r\n|\r|\n)/g, ', ').replace('"', "").replace('"', "");
}

</script>

<style scoped>
    .promt-result {
        width: 100%;
        position: relative;
    }
    .promt-result_text {
        box-shadow: 0 0 0 1px var(--el-input-border-color,var(--el-border-color)) inset;
        border-radius: var(--el-input-border-radius,var(--el-border-radius-base));
        transition: var(--el-transition-box-shadow);
        border: none;
        padding: 10px 20px;
    }
    .promt-result_copy {
        position: absolute;
        top: 60px;
        right: 20px;
    }
</style>
