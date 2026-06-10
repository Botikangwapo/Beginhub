<template>
    <div class="min-h-screen flex items-center justify-center bg-blue-50/30 p-4 font-sans">
        <div
            class="max-w-md w-full bg-white rounded-3xl p-8 border border-blue-100 shadow-xl shadow-blue-950/5 text-center">

            <div
                class="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-blue-50 text-blue-600 mb-6 border border-blue-100">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
            </div>

            <h2 class="text-2xl font-black text-blue-950 uppercase tracking-tight mb-2">Check your inbox</h2>
            <p class="text-gray-600 text-sm mb-8">
                We've sent a verification link to your email address. Please click the link to continue your
                journey.
            </p>

            <button @click="goToLogin"
                class="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-black text-xs rounded-xl shadow-md shadow-blue-600/10 transition-all uppercase tracking-widest active:scale-95">
                Back to Login
            </button>

            <div class="mt-6">
                <p class="text-[11px] text-gray-500 font-medium">
                    Didn't receive the email?
                    <button class="text-blue-600 font-bold hover:underline ml-1">Click to resend</button>
                </p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();
const goToLogin = () => {
    router.push('/login');
};
</script>
