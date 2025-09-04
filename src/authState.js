import { ref } from 'vue'

export const isLoggedIn = ref(false)
export const accessToken = ref(null)

// Flag to trigger login required popup
export const loginPrompt = ref(false)