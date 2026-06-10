<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from '../supabase/supabase'

const recipientName = ref('Jervin Anain Villones')
const assessmentTitle = ref('Web Principles/Web Development')
const issueDate = ref('October 22, 2026')
const authorityName = ref('Jervin Anain Villones')
</script>

<template>
    <section
        class="flex items-center justify-center sm:h-full h-auto md:p-10 sm:p-10 p-4 sm:pt-0 md:pt-40 pt-28 gap-5 flex-col bg-white bg-[linear-gradient(to_right,rgba(0,0,0,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.04)_1px,transparent_1px)] bg-[size:45px_45px] animate-grid-move"
        id="home">
        <div class="flex flex-col items-center justify-center gap-10 max-w-7xl mx-auto">
            <main class="text-center flex flex-col gap-4 items-center  sm:w-auto md:w-auto w-full">
                <h1
                    class="text-5xl uppercase    md:text-5xl 2xl:text-7xl font-black text-blue-950 text-center leading-tight tracking-tight">
                    Making Tech Simple for <span class="text-blue-600">Everyone.</span>
                </h1>
                <p
                    class="text-gray-600 text-center sm:text-center mx-auto max-w-5xl font-light text-lg leading-relaxed">
                    Show what you know and challenge yourself with our comprehensive quiz modules. Assess your
                    skills, identify areas for improvement, and earn certifications that prove your expertise in web
                    development.</p>
                <div class="grid grid-cols-1 sm:grid-cols-2 w-full sm:w-auto gap-1.5 items-center justify-center">
                    <router-link to="/Login">
                        <button
                            class="sm:w-45 w-full text-white p-2.5 rounded-lg font-light bg-blue-600 hover:bg-blue-700 shadow-md hover:shadow-xl">Get
                            Started
                        </button>
                    </router-link>
                    <a href="#resources">
                        <button
                            class="p-2.5 sm:w-45 w-full rounded-lg font-light border-2 border-blue-950 bg-white shadow-sm text-gray-900">Why
                            Choose
                        </button>
                    </a>
                </div>
                <div class="flex gap-6 w-full items-center justify-center text-center">
                    <div>
                        <h1 class="font-light text-lg text-gray-800">Quizzes</h1>
                        <span class="font-bold text-2xl text-blue-600">+50</span>
                    </div>
                    <div>
                        <h1 class="font-light text-lg text-gray-800">Test Takers</h1>
                        <span class="font-bold text-2xl text-blue-600">+100</span>
                    </div>
                    <div>
                        <h1 class="font-light text-lg text-gray-800">Certifications</h1>
                        <span class="font-bold text-2xl text-blue-600">+500</span>
                    </div>
                </div>
            </main>
            <div class="flex items-center justify-center h-auto">
                <img class="shadow-lg" src="/src/assets/Screenshot 2026-06-08 144025.png" alt="">
            </div>
        </div>
    </section>
</template>

<style scoped>
/* I-animate ang background position */
@keyframes grid-move {
    0% {
        background-position: 0px 0px;
    }

    100% {
        background-position: 45px 45px;
        /* Same sa background-size mo */
    }
}

.animate-grid-move {
    animation: grid-move 3s linear infinite;
}

@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Alex+Brush&display=swap');

.font-serif {
    font-family: 'Playfair Display', Georgia, serif;
}

.font-signature {
    font-family: 'Alex Brush', cursive;
}
</style>