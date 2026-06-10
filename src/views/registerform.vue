<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { registerUser } from '../services/authuserservices.js';

const router = useRouter()

const firstname = ref('')
const lastname = ref('')
const email = ref('')
const password = ref('')

const errorMessage = ref('')
const successMessage = ref('')
const isLoading = ref(false)

const showPassword = ref(false);

const togglePassword = () => {
    showPassword.value = !showPassword.value;
};

const handleRegister = async () => {
    errorMessage.value = ''
    successMessage.value = ''
    isLoading.value = true

    const result = await registerUser(email.value, password.value, firstname.value, lastname.value)

    if (result.success) {
        successMessage.value = "Nice! Registered ka na bossing! Welcome sa BeginHub."

        firstname.value = ''
        lastname.value = ''
        email.value = ''
        password.value = ''

        setTimeout(() => {
            router.push('/Verification')
        }, 2000)
    } else {
        errorMessage.value = result.error || 'May nagka-error sa pag-register bossing.'
        isLoading.value = false
    }
}
</script>
<template>
    <section class="grid grid-cols-1 2xl:grid-cols-2 min-h-screen bg-blue-50/20">
        <div class="hidden 2xl:flex flex-col justify-between bg-blue-600 p-12 text-white">
            <h1 class="text-3xl font-black tracking-tighter uppercase">Storage.Repo</h1>
            <div class="space-y-4">
                <h2 class="text-5xl font-black leading-tight uppercase">Begin<span class="text-blue-200">Hub</span></h2>
                <p class="text-blue-100 font-bold tracking-wide">Register to initialize your <br> execution environment.
                </p>
            </div>
            <div class="text-[10px] font-black uppercase tracking-widest opacity-60">WHITE & BLUE // AUTH_SERVICE_V5
            </div>
        </div>

        <div class="flex items-center justify-center p-6">
            <form @submit.prevent="handleRegister"
                class="w-full max-w-md bg-white p-8 rounded-3xl border border-gray-100 shadow-sm shadow-gray-300/50 space-y-6">

                <div class="space-y-1">
                    <router-link to="/"
                        class="text-[10px] font-black text-blue-400 hover:text-blue-600 uppercase tracking-widest flex items-center gap-2 mb-4">
                        ← BACK
                    </router-link>
                    <h1 class="text-2xl font-black text-blue-950 uppercase tracking-tight">Register_Account</h1>
                    <p class="text-xs font-bold text-blue-400 uppercase tracking-widest">Input credentials to initialize
                        profile</p>
                </div>

                <div v-if="errorMessage"
                    class="p-3 text-[10px] font-black text-red-600 bg-red-50 border border-red-100 rounded-xl uppercase tracking-wider">
                    {{ errorMessage }}
                </div>
                <div v-if="successMessage"
                    class="p-3 text-[10px] font-black text-emerald-600 bg-emerald-50 border border-emerald-100 rounded-xl uppercase tracking-wider">
                    {{ successMessage }}
                </div>

                <div class="grid grid-cols-2 gap-4">
                    <div class="flex flex-col gap-1.5">
                        <label class="text-[10px] font-black text-blue-900 uppercase">Firstname</label>
                        <input v-model="firstname"
                            class="p-3 rounded-xl bg-blue-50/50 border border-blue-100 text-md  focus:ring-2 focus:ring-gray-600 outline-none transition-all"
                            type="text" placeholder="Jervin" required>
                    </div>
                    <div class="flex flex-col gap-1.5">
                        <label class="text-[10px] font-black text-blue-900 uppercase">Lastname</label>
                        <input v-model="lastname"
                            class="p-3 rounded-xl bg-blue-50/50 border border-blue-100 text-md focus:ring-2 focus:ring-gray-600 outline-none transition-all"
                            type="text" placeholder="Villones" required>
                    </div>
                </div>

                <div class="flex flex-col gap-1.5">
                    <label class="text-[10px] font-black text-blue-900 uppercase">Email</label>
                    <input v-model="email"
                        class="p-3 rounded-xl bg-blue-50/50 border border-blue-100 text-md focus:ring-2 focus:ring-gray-600 outline-none transition-all"
                        type="email" placeholder="name@domain.com" required>
                </div>

                <div class="flex flex-col gap-1.5">
                    <label class="text-[10px] font-black text-blue-900 uppercase">Password</label>
                    <div class="relative w-full">
                        <input v-model="password" :type="showPassword ? 'text' : 'password'"
                            class="w-full p-3 pr-16 rounded-xl bg-blue-50/50 border border-blue-100 text-md font-bold focus:ring-2 focus:ring-blue-600 outline-none transition-all"
                            placeholder="••••••••" required>
                        <button type="button" @click="togglePassword"
                            class="absolute right-4 top-5 text-[10px] font-black text-blue-600 hover:text-blue-600 uppercase tracking-widest cursor-pointer">
                            {{ showPassword ? 'HIDE' : 'SHOW' }}
                        </button>
                    </div>
                </div>

                <div class="flex items-center gap-3">
                    <input type="checkbox" id="remember"
                        class="w-4 h-4 rounded border-blue-200 text-blue-600 focus:ring-blue-500" required>
                    <label class="text-[10px] font-bold text-gray-400 uppercase tracking-wider cursor-pointer"
                        for="remember">
                        Agree to <span class="text-blue-600 underline">Terms & Policy</span>
                    </label>
                </div>

                <button :disabled="isLoading" type="submit"
                    class="w-full py-4 rounded-xl bg-blue-600 text-white font-black text-xs uppercase tracking-widest hover:bg-blue-700 transition-all active:scale-[0.98] disabled:opacity-50">
                    {{ isLoading ? 'Processing...' : 'Registration' }}
                </button>

                <p class="text-center text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                    Already have an account?
                    <router-link to="/login" class="text-blue-600 underline">Login here</router-link>
                </p>
            </form>
        </div>
    </section>
</template>