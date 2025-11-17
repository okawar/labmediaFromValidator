import { computed, reactive, watchEffect } from "vue"
import type { FormConfig, FormState } from "../types/Types"

export function useFormValidation(config: FormConfig){
    const formState = reactive<FormState>({
        fields: {},
        isValid: true,
        isDirty: false
    })

    Object.entries(config.fields).forEach(([fieldName, fieldConfig]) => {
        formState.fields[fieldName] = {
            value: fieldConfig.initialValue,
            error: null,
            isTouched: false,
            isDirty: false,
            isValid: true
        }
    })

    const isFormValid = computed(() => {
        return Object.values(formState.fields).every((field) => field.isValid)
    })

    const isFormDirty = computed(() => {
        return Object.values(formState.fields).some((field) => field.isDirty)
    })

    watchEffect(() => {
        formState.isValid = isFormValid.value
        formState.isDirty = isFormDirty.value
    })

    return {
        formState,
        isFormDirty,
        isFormValid
    }
}