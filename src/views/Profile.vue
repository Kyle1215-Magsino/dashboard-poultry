<template>
  <v-container fluid class="pa-8 profile-page">
    <v-card elevation="10" class="pa-6 rounded-lg profile-card">
      <v-row no-gutters align="center" class="mb-6">
        <v-avatar size="120" :style="{ border: '3px solid brown' }" class="mr-6">
          <v-img :src="user.profileImage || defaultImage" />
        </v-avatar>
        <v-spacer></v-spacer>

        <v-btn color="brown" @click="editMode = !editMode" small class="mr-2">
          {{ editMode ? 'Cancel' : 'Edit' }}
        </v-btn>

        <v-btn color="secondary" @click="switchDialog = true" small>
          Switch Account
        </v-btn>
      </v-row>

      <v-form ref="form" v-model="formValid" @submit.prevent="saveProfile">
        <v-text-field
          v-model="user.email"
          label="Email"
          readonly
          disabled
          class="mb-4"
        />

        <v-text-field
          v-model="user.birthday"
          label="Birthday"
          :rules="[required]"
          v-if="editMode"
          type="date"
          class="mb-4"
        />
        <v-text-field
          v-model="user.contactNumber"
          label="Contact Number"
          :rules="[required]"
          v-if="editMode"
          type="tel"
          class="mb-4"
        />

        <v-text-field
          v-model="user.birthday"
          label="Birthday"
          readonly
          v-if="!editMode"
          class="mb-4"
        />
        <v-text-field
          v-model="user.contactNumber"
          label="Contact Number"
          readonly
          v-if="!editMode"
          class="mb-4"
        />

        <v-btn
          v-if="editMode"
          color="brown"
          type="submit"
          :disabled="!formValid"
          class="mt-4"
        >
          Save
        </v-btn>
      </v-form>
    </v-card>

    <!-- Switch Account Dialog -->
    <v-dialog v-model="switchDialog" max-width="400">
      <v-card>
        <v-card-title>Select Account</v-card-title>
        <v-divider></v-divider>
        <v-list>
          <v-list-item
            v-for="(account, index) in users"
            :key="index"
            @click="switchAccount(account)"
            class="pointer"
          >
            <v-list-item-avatar>
              <v-img :src="account.profileImage || defaultImage" />
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>{{ account.email }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="switchDialog = false">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'

const defaultImage = '/default-avatar.png'
const editMode = ref(false)
const formValid = ref(false)
const form = ref(null)
const switchDialog = ref(false)

const user = reactive({
  email: '',
  profileImage: '',
  birthday: '',
  contactNumber: ''
})

const users = ref([]) // list of all saved users

function required(value) {
  return !!value || 'This field is required'
}

function loadCurrentUser() {
  const currentUserStr = localStorage.getItem('currentUser')
  if (currentUserStr) {
    const currentUser = JSON.parse(currentUserStr)
    user.email = currentUser.email || ''
    user.profileImage = currentUser.profileImage || ''
    user.birthday = currentUser.birthday || ''
    user.contactNumber = currentUser.contactNumber || ''
  }
}

function loadUsers() {
  users.value = JSON.parse(localStorage.getItem('users')) || []
}

onMounted(() => {
  loadCurrentUser()
  loadUsers()
})

function saveProfile() {
  if (!form.value.validate()) return

  const currentUserStr = localStorage.getItem('currentUser')
  if (!currentUserStr) return alert('No logged in user found.')

  const currentUser = JSON.parse(currentUserStr)

  currentUser.birthday = user.birthday
  currentUser.contactNumber = user.contactNumber

  localStorage.setItem('currentUser', JSON.stringify(currentUser))

  // Update users list
  users.value = users.value.map(u =>
    u.email === currentUser.email
      ? { ...u, birthday: user.birthday, contactNumber: user.contactNumber }
      : u
  )
  localStorage.setItem('users', JSON.stringify(users.value))

  alert('Profile updated successfully!')
  editMode.value = false
}

function switchAccount(account) {
  // Set selected account as currentUser
  localStorage.setItem('currentUser', JSON.stringify(account))
  loadCurrentUser()
  switchDialog.value = false
  editMode.value = false
  alert(`Switched to account: ${account.email}`)
}
</script>

<style scoped>
.profile-page {
  min-height: 100vh;
  background: #fff;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  padding-top: 40px;
  padding-left: 40px;
}

.profile-card {
  width: 100%;
  max-width: 600px;
}

.pointer {
  cursor: pointer;
}
</style>
