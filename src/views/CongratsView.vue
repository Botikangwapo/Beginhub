<script setup>
import { useRoute, useRouter } from 'vue-router';
import { computed } from 'vue';

const route = useRoute();
const router = useRouter();

// Kinukuha ang score mula sa URL query
const finalScore = computed(() => route.query.score || 0);

const goHome = () => {
    router.push('/Dash'); // Palitan ang path kung saan mo gustong bumalik
};
</script>

<template>
    <section
        class="w-full h-screen flex flex-col items-center justify-center bg-blue-50/30 text-blue-950 p-6 font-sans antialiased">
        <div
            class="bg-white border border-blue-100 p-10 md:p-16 rounded-3xl shadow-sm text-center max-w-lg w-full space-y-6">

            <div
                class="w-20 h-20 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto text-4xl">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                    class="lucide lucide-trophy">
                    <path d="M10 14.66v1.626a2 2 0 0 1-.976 1.696A5 5 0 0 0 7 21.978" />
                    <path d="M14 14.66v1.626a2 2 0 0 0 .976 1.696A5 5 0 0 1 17 21.978" />
                    <path d="M18 9h1.5a1 1 0 0 0 0-5H18" />
                    <path d="M4 22h16" />
                    <path d="M6 9a6 6 0 0 0 12 0V3a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1z" />
                    <path d="M6 9H4.5a1 1 0 0 1 0-5H6" />
                </svg>
            </div>

            <div>
                <h1 class="text-3xl font-black text-blue-900 uppercase tracking-tight">Quiz Complete!</h1>
                <p class="text-blue-500 font-medium mt-2">Magaling! Natapos mo na ang pagsusulit.</p>
            </div>

            <div class="py-6 border-y border-blue-50">
                <p class="text-xs font-bold text-blue-400 uppercase tracking-widest">Your Final Score</p>
                <h2 class="text-6xl font-black text-blue-600 mt-2">{{ finalScore }}</h2>
            </div>

            <button @click="goHome"
                class="w-full bg-blue-600 text-white font-black py-4 rounded-xl text-sm tracking-widest hover:bg-blue-700 transition-all">
                RETURN_TO_DASHBOARD()
            </button>
        </div>
    </section>
</template>