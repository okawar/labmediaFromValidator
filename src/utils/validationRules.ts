import type { ValidationRule } from "../types/Types";

export const validateRequired: ValidationRule = (value: any): boolean | string => {
    if (value === null || value === undefined) return "Поле обязательно"
    if (typeof value === "string" && value.trim() === "") return "Поле обязательно"
    if (Array.isArray(value) && value.length === 0) return "Поле обязательно"
    return true
}

export const validateEmail: ValidationRule = (value: string): boolean | string => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(value)) return "Ошибка валидации email"
    return true 
}

export const validateNumeric: ValidationRule = (value: number): boolean | string => {
    if (isNaN(Number(value))) return "Должно быть числом"
    return true
}

export const validateMinLength = (min: number): ValidationRule => {
    const rule: ValidationRule = (value: any): boolean | string => {
        if (typeof value === "string" && value.length < min){
            return "Слишком мало символов"
        }
        return true
    }
    return rule
}

export const validateMaxLength = (max: number): ValidationRule => {
    const rule: ValidationRule = (value: any): boolean | string => {
        if (typeof value === "string" && value.length > max){
            return "Слишком много символов"
        }
        return true
    }
    return rule
} 

export const validateMin = (min: number): ValidationRule => {
    const rule: ValidationRule = (value: any): boolean | string => {
        if (typeof value === "number" && value < min) return "Слишком маленькое число"
        return true
    }
    return rule
}

export const validateMax = (max: number): ValidationRule => {
    const rule: ValidationRule = (value: any): boolean | string => {
        if (typeof value === "number" && value > max) return "Слишком большое число"
        return true
    }
    return rule
}

export const validatePattern = (regex: RegExp, message?: string): ValidationRule => {
    const rule: ValidationRule = (value: any): boolean | string => {
        if (!regex.test(value)) return message || "Ошибка валидации"
        return true
    }
    return rule
}