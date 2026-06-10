<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router'
import { loginUser } from '../services/authuserservices.js'

const router = useRouter()

const email = ref('')
const password = ref('')

const errorMessage = ref('')
const successMessage = ref('')
const isLoading = ref(false)
const showPassword = ref(false);

const togglePassword = () => {
    showPassword.value = !showPassword.value;
};

const handleLogin = async () => {
    errorMessage.value = ''
    successMessage.value = ''
    isLoading.value = true

    const result = await loginUser(email.value, password.value)

    if (result.success) {
        email.value = ''
        password.value = ''

        setTimeout(() => {
            router.push('/Dash')
        }, 1000)
    } else {
        isLoading.value = false

        const rawError = result.error ? result.error.toLowerCase() : ''

        if (rawError.includes('confirmed') || rawError.includes('confirmation')) {
            errorMessage.value = 'Please comfirm verification in your inbox pare ko!'
        } else if (rawError.includes('invalid clones') || rawError.includes('invalid credentials')) {
            errorMessage.value = 'Invalid credentials pre'
        } else {
            // Fallback para sa iba pang random errors (gaya ng internet connection issue)
            errorMessage.value = result.error || 'Error'
        }
    }
}
</script>

<template>
    <section class="grid grid-cols-1 2xl:grid-cols-2 min-h-screen bg-blue-50/20">
        <div class="hidden 2xl:flex flex-col justify-between bg-blue-600 p-12 text-white">
            <h1 class="text-3xl font-black tracking-tighter uppercase">Storage.Repo</h1>
            <div class="space-y-4">
                <h2 class="text-5xl font-black leading-tight uppercase">Welcome<br><span
                        class="text-blue-200">Bossing</span></h2>
                <p class="text-blue-100 font-bold tracking-wide">Authenticate to continue your <br> session in the
                    engine.</p>
            </div>
            <div class="text-[10px] font-black uppercase tracking-widest opacity-60">WHITE & BLUE // AUTH_SERVICE_V5
            </div>
        </div>

        <div class="flex items-center justify-center p-6">
            <form @submit.prevent="handleLogin"
                class="w-full max-w-md bg-white p-8 rounded-3xl border border-gray-100 shadow-sm shadow-gray-300/50 space-y-6">

                <div class="space-y-1">
                    <router-link to="/"
                        class="text-[20px] font-black text-blue-400 hover:text-blue-600 uppercase tracking-widest flex items-center gap-2 mb-4">
                        ← BACK
                    </router-link>
                    <h1 class="text-2xl font-black text-blue-950 uppercase tracking-tight">Login_Access</h1>
                    <p class="text-xs font-bold text-blue-400 uppercase tracking-widest">Provide credentials to proceed
                    </p>
                </div>

                <div v-if="errorMessage"
                    class="p-3 text-[10px] font-black text-red-600 bg-red-50 border border-red-100 rounded-xl uppercase tracking-wider">
                    {{ errorMessage }}
                </div>

                <div class="flex flex-col gap-1.5">
                    <label class="text-[10px] font-black text-blue-950 uppercase">Email_Address</label>
                    <input v-model="email"
                        class="p-3 rounded-xl bg-gray-50/50 border border-gray-100 text-md focus:ring-2 focus:ring-gray-600 outline-none transition-all"
                        type="email" placeholder="name@domain.com" required>
                </div>

                <div class="flex flex-col gap-1.5">
                    <div class="flex justify-between items-center">
                        <label class="text-[10px] font-black text-blue-950 uppercase">Password</label>
                    </div>
                    <div class="relative w-full"> <input v-model="password" :type="showPassword ? 'text' : 'password'"
                            class="w-full p-3 pr-16 rounded-xl bg-gray-50/50 border border-gray-100 text-md font-bold focus:ring-2 focus:ring-gray-600 outline-none transition-all"
                            placeholder="••••••••" required>
                        <button type="button" @click="togglePassword"
                            class="absolute right-4 top-5 text-[10px] font-black text-blue-600 hover:text-blue-600 uppercase tracking-widest cursor-pointer">
                            {{ showPassword ? 'HIDE' : 'SHOW' }}
                        </button>
                    </div>
                </div>

                <div class="flex items-center justify-between gap-3">
                    <div class="flex items-center justify-center gap-3">
                        <input type="checkbox" id="remember"
                            class="w-4 h-4 rounded border-blue-200 text-blue-600 focus:ring-blue-500">
                        <label class="text-[10px] font-bold text-gray-400 uppercase tracking-wider cursor-pointer"
                            for="remember">
                            Remember_Session
                        </label>
                    </div>
                    <span
                        class="text-[10px] font-black text-blue-600 cursor-pointer hover:underline uppercase">Forgot?</span>
                </div>

                <button :disabled="isLoading" type="submit"
                    class="w-full py-4 rounded-xl bg-blue-600 text-white font-black text-xs uppercase tracking-widest hover:bg-blue-700 transition-all active:scale-[0.98] disabled:opacity-50">
                    {{ isLoading ? 'Authenticating...' : 'Login' }}
                </button>

                <p class="text-center text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                    No account yet?
                    <router-link to="/register" class="text-blue-600 underline">Register here</router-link>
                </p>
            </form>
        </div>
    </section>
</template>