export type ValidationRule<T = any> = (value: T) => boolean | string

export interface FieldConfig {
    initialValue: any
    rules: ValidationRule[]
    validationOn: "change" | "blur" | "submit"
}

export interface FieldState {
    value: any
    error: string | null
    isTouched: boolean 
    isDirty: boolean 
    isValid: boolean
}

export interface FormConfig {
    fields: Record<string, FieldConfig>
}

export interface FormState{
    fields: Record<string, FieldState>
    isValid: boolean
    isDirty: boolean
}

