<template>
  <div class="signup-background">
    <v-container class="d-flex justify-center align-center fill-height pa-0 ma-0" fluid>
      <v-card width="400" elevation="10" class="pa-6 rounded-lg signup-card">
        <v-form @submit.prevent="onSignup" v-model="formValid" class="d-flex flex-column justify-space-between fill-height">

          <!-- Profile Picture -->
          <div class="text-center mb-4 d-flex flex-column align-center">
            <v-avatar size="100" class="profile-avatar mb-2">
              <v-img :src="profileImage || defaultImage" />
            </v-avatar>
            <v-btn color="brown" small @click="triggerImageUpload">
              Choose Profile Picture
            </v-btn>
            <input ref="fileInput" type="file" accept="image/*" @change="onImageSelected" class="d-none" />
          </div>

          <!-- Form Fields -->
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
            autocomplete="new-password"
          />

          <!-- Submit -->
          <v-btn color="brown" class="mt-4" type="submit">Sign Up</v-btn>

          <div class="text-center mt-4">
            <span>Already have an account?</span>
            <span class="link" @click="router.push('/')"> Login</span>
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
const profileImage = ref('')
const defaultImage = '/default-avatar.png'
const showPassword = ref(false)
const formValid = ref(false)

const fileInput = ref(null)

function triggerImageUpload() {
  fileInput.value.click()
}

function onImageSelected(event) {
  const file = event.target.files[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = e => {
      profileImage.value = e.target.result
    }
    reader.readAsDataURL(file)
  }
}

function required(value) {
  return !!value || 'This field is required'
}

function emailValidator(value) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(value) || 'Enter a valid email address'
}

function onSignup() {
  if (formValid.value) {
    const users = JSON.parse(localStorage.getItem('users')) || []
    const userExists = users.some(u => u.email === email.value)

    if (userExists) {
      alert('Email already registered.')
      return
    }

    const newUser = {
      email: email.value,
      password: password.value,
      profileImage: profileImage.value
    }

    users.push(newUser)
    localStorage.setItem('users', JSON.stringify(users))

    alert('Account created successfully!')
    router.push('/') // Go to login
  }
}
</script>

<style scoped>
.signup-background {
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

.signup-card {
  height: auto;
  min-height: 550px;
}

.link {
  color: brown;
  font-weight: bold;
  cursor: pointer;
  margin-left: 4px;
}

.profile-avatar {
  border: 3px solid brown;
}

.d-none {
  display: none;
}

.mb-2 {
  margin-bottom: 8px;
}
</style>
