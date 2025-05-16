<template>
  <div class="login-background">
    <v-container class="d-flex justify-center align-center fill-height pa-0 ma-0" fluid>
      <v-card width="400" height="450" elevation="10" class="pa-8 rounded-lg">
        <v-form @submit.prevent="onLogin" v-model="formValid" class="d-flex flex-column justify-space-between fill-height">
          <div>
            <v-text-field
              v-model="email"
              label="Email"
              :rules="[required, emailValidator]"
              clearable
              autocomplete="email"
            />

            <v-text-field
              v-model="password"
              label="Password"
              :rules="[required]"
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              :type="showPassword ? 'text' : 'password'"
              @click:append="showPassword = !showPassword"
              autocomplete="current-password"
            />
          </div>

          <v-btn color="brown" class="mt-4" type="submit">Login</v-btn>

          <div class="text-center mt-4">
            <span>Don't have an account?</span>
            <span class="link" @click="router.push('/signup')"> Sign Up</span>
          </div>
        </v-form>
      </v-card>
    </v-container>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const email = ref('')
const password = ref('')
const formValid = ref(false)
const showPassword = ref(false)

function required(value) {
  return !!value || 'This field is required'
}

function emailValidator(value) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(value) || 'Enter a valid email address'
}

function onLogin() {
  if (formValid.value) {
    const users = JSON.parse(localStorage.getItem('users')) || []
    const user = users.find(u => u.email === email.value && u.password === password.value)

    if (!user) {
      alert('Invalid email or password.')
      return
    }

    // Successful login
    localStorage.setItem('currentUser', JSON.stringify(user))
    router.push('/dashboardview')
  }
}
</script>

<style scoped>
.login-background {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background: linear-gradient(to bottom, #ffe082, #8d6e63);
  display: flex;
  align-items: center;
  justify-content: center;
}

.link {
  color: brown;
  font-weight: bold;
  cursor: pointer;
  margin-left: 4px;
}
</style>
