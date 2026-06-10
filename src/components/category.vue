<template>
    <section class="min-h-screen bg-blue-50/20 p-6 md:p-12">
        <div class="mx-auto max-w-6xl">
            <div class="mb-12">
                <router-link to="/"
                    class="text-[10px] font-black text-blue-400 hover:text-blue-600 uppercase tracking-[0.2em] flex items-center gap-2 mb-4">
                    ← BACK_TO_DASHBOARD
                </router-link>
                <h1 class="text-4xl font-black text-blue-950 uppercase tracking-tight">Select_Category</h1>
                <p class="text-xs font-bold text-blue-400 uppercase tracking-widest mt-2">Choose a module to initialize
                    the quiz engine</p>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

                <div v-for="category in categories" :key="category.id"
                    class="group bg-white p-8 rounded-3xl border border-blue-100 shadow-sm shadow-blue-100/50 hover:border-blue-300 transition-all cursor-pointer hover:shadow-lg hover:shadow-blue-100/50 active:scale-[0.98]">

                    <div
                        class="h-16 w-16 rounded-2xl bg-blue-50 flex items-center justify-center mb-6 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all">
                        <span class="text-2xl font-black">{{ category.icon }}</span>
                    </div>

                    <h3 class="text-xl font-black text-blue-950 uppercase tracking-tight mb-2">{{ category.title }}</h3>
                    <p class="text-[10px] font-bold text-blue-400 uppercase tracking-wider mb-6">{{ category.desc }}</p>

                    <div class="flex items-center justify-between mt-auto pt-6 border-t border-blue-50">
                        <span class="text-[10px] font-black text-blue-900 uppercase tracking-widest">{{
                            category.questions }} Questions</span>
                        <button
                            class="text-[10px] font-black bg-blue-950 text-white px-4 py-2 rounded-xl group-hover:bg-blue-600 transition-all uppercase tracking-widest">
                            INIT_QUIZ
                        </button>
                    </div>
                </div>

            </div>
        </div>
    </section>
</template>

<script setup>
const categories = [
    { id: 1, title: 'HTML Fundamentals', desc: 'Master tags, structure, and semantic elements.', questions: 25, icon: '</>' },
    { id: 2, title: 'CSS Styling', desc: 'Learn flexbox, grid, and modern layouts.', questions: 30, icon: 'CSS' },
    { id: 3, title: 'JavaScript Core', desc: 'Logic, variables, and function mastery.', questions: 40, icon: 'JS' },
    { id: 4, title: 'Vue.js Basics', desc: 'Components, state, and reactivity.', questions: 20, icon: 'VUE' },
    { id: 5, title: 'Supabase Auth', desc: 'Database operations and security.', questions: 15, icon: 'DB' },
    { id: 6, title: 'Tailwind CSS', desc: 'Utility-first framework techniques.', questions: 25, icon: 'TW' }
];
</script>