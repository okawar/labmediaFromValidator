<script setup lang="ts">
import { useFormValidation } from './composables/useFromValidation';
import type { FormConfig } from './types/Types';
import { 
  validateRequired, 
  validateEmail, 
  validateMinLength,
  validateNumeric,
  validateMin 
} from './utils/validationRules';

const formConfig: FormConfig = {
  fields: {
      email: {
        initialValue: '',
        rules: [validateRequired, validateEmail],
        validationOn: 'blur'
      },
      password: {
        initialValue: '',
        rules: [validateRequired, validateMinLength(6)],
        validationOn: 'change'
      },
      age: {
        initialValue: '',
        rules: [validateRequired, validateNumeric, validateMin(18)],
        validationOn: 'blur'
      }
    }
}

const {
  formState,
  setFieldValue,
  setFieldTouched,
  validateForm,
  resetForm
} = useFormValidation(formConfig)

function handleSubmit() {
  const isValid = validateForm()
  if (isValid) {
    alert('Форма валидна! Данные: ' + JSON.stringify({
      email: formState.fields.email?.value,
      password: formState.fields.password?.value,
      age: formState.fields.age?.value
    }))
  } else {
    alert('Форма содержит ошибки!')
  }
}
</script>

<template>
  <div class="form-container">
    <h1>Форма валидации</h1>
    
    <form @submit.prevent="handleSubmit">
      <!-- Email поле -->
      <div class="form-field">
        <label for="email">Email:</label>
        <input
          id="email"
          type="text"
          :value="formState.fields.email?.value"
          @input="setFieldValue('email', ($event.target as HTMLInputElement).value)"
          @blur="setFieldTouched('email')"
          :class="{ error: formState.fields.email?.error && formState.fields.email?.isTouched }"
        />
        <span v-if="formState.fields.email?.error && formState.fields.email?.isTouched" class="error-message">
          {{ formState.fields.email?.error }}
        </span>
      </div>

      <!-- Password поле -->
      <div class="form-field">
        <label for="password">Пароль:</label>
        <input
          id="password"
          type="password"
          :value="formState.fields.password?.value"
          @input="setFieldValue('password', ($event.target as HTMLInputElement).value)"
          @blur="setFieldTouched('password')"
          :class="{ error: formState.fields.password?.error && formState.fields.password?.isTouched }"
        />
        <span v-if="formState.fields.password?.error && formState.fields.password?.isTouched" class="error-message">
          {{ formState.fields.password?.error }}
        </span>
      </div>

      <!-- Age поле -->
      <div class="form-field">
        <label for="age">Возраст:</label>
        <input
          id="age"
          type="number"
          :value="formState.fields.age?.value"
          @input="setFieldValue('age', ($event.target as HTMLInputElement).value)"
          @blur="setFieldTouched('age')"
          :class="{ error: formState.fields.age?.error && formState.fields.age?.isTouched }"
        />
        <span v-if="formState.fields.age?.error && formState.fields.age?.isTouched" class="error-message">
          {{ formState.fields.age?.error }}
        </span>
      </div>

      <!-- Информация о состоянии формы -->
      <div class="form-status">
        <p>Форма валидна: <strong :class="{ valid: formState.isValid, invalid: !formState.isValid }">{{ formState.isValid }}</strong></p>
        <p>Форма изменена: <strong>{{ formState.isDirty }}</strong></p>
      </div>

      <!-- Кнопки -->
      <div class="form-buttons">
        <button type="submit" :disabled="!formState.isValid">Отправить</button>
        <button type="button" @click="resetForm()">Сбросить</button>
      </div>
    </form>
  </div>
</template>

<style scoped>
.form-container {
  max-width: 500px;
  margin: 50px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
}

h1 {
  text-align: center;
  margin-bottom: 30px;
}

.form-field {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
}

input.error {
  border-color: #e74c3c;
}

.error-message {
  display: block;
  color: #e74c3c;
  font-size: 12px;
  margin-top: 5px;
}

.form-status {
  margin: 20px 0;
  padding: 15px;
  background-color: #f8f9fa;
  border-radius: 4px;
}

.form-status p {
  margin: 5px 0;
}

.valid {
  color: #27ae60;
}

.invalid {
  color: #e74c3c;
}

.form-buttons {
  display: flex;
  gap: 10px;
}

button {
  flex: 1;
  padding: 12px;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button[type="submit"] {
  background-color: #3498db;
  color: white;
}

button[type="submit"]:hover:not(:disabled) {
  background-color: #2980b9;
}

button[type="submit"]:disabled {
  background-color: #bdc3c7;
  cursor: not-allowed;
}

button[type="button"] {
  background-color: #95a5a6;
  color: white;
}

button[type="button"]:hover {
  background-color: #7f8c8d;
}
</style>
