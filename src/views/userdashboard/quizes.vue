<script setup>
import { ref, onMounted, computed } from 'vue';
import { supabase } from '../../supabase/supabase.js';
import { getAuthUser } from '../../services/authuserservices.js';
import Modal from '../modal/mymodal.vue';
import quizesskeliton from '../../skeliton/quizesskeliton.vue';

const showModal = ref(false);
const Isloading = ref(true);
const completedQuizzes = ref([]);

const selectedQuiz = ref(null); // I-add ito

const searchQuery = ref('');
const selectedCategory = ref('All');

const openModal = (quiz) => {
    selectedQuiz.value = quiz;
    showModal.value = true;
};

const styles = {
    blue: { tagBg: 'bg-blue-50', tagText: 'text-blue-600', tagBorder: 'border-blue-100', timeText: 'text-blue-400', titleHover: 'group-hover:text-blue-600', footerBg: 'bg-blue-50/30', footerBorder: 'border-blue-50', btnExec: 'text-blue-600 hover:text-blue-800', btnOpen: 'bg-blue-500 hover:bg-blue-600 shadow-blue-600/10' },
    violet: { tagBg: 'bg-violet-50', tagText: 'text-violet-600', tagBorder: 'border-violet-100', timeText: 'text-violet-400', titleHover: 'group-hover:text-violet-600', footerBg: 'bg-violet-50/30', footerBorder: 'border-violet-50', btnExec: 'text-violet-600 hover:text-violet-800', btnOpen: 'bg-violet-500 hover:bg-violet-600 shadow-violet-600/10' },
    amber: { tagBg: 'bg-amber-50', tagText: 'text-amber-600', tagBorder: 'border-amber-100', timeText: 'text-amber-400', titleHover: 'group-hover:text-amber-600', footerBg: 'bg-amber-50/30', footerBorder: 'border-amber-50', btnExec: 'text-amber-600 hover:text-amber-800', btnOpen: 'bg-amber-500 hover:bg-amber-600 shadow-amber-600/10' },
    sky: { tagBg: 'bg-sky-50', tagText: 'text-sky-600', tagBorder: 'border-sky-100', timeText: 'text-sky-400', titleHover: 'group-hover:text-sky-600', footerBg: 'bg-sky-50/30', footerBorder: 'border-sky-50', btnExec: 'text-sky-600 hover:text-sky-800', btnOpen: 'bg-sky-500 hover:bg-sky-600 shadow-sky-600/10' },
    emerald: { tagBg: 'bg-emerald-50', tagText: 'text-emerald-600', tagBorder: 'border-emerald-100', timeText: 'text-emerald-400', titleHover: 'group-hover:text-emerald-600', footerBg: 'bg-emerald-50/30', footerBorder: 'border-emerald-50', btnExec: 'text-emerald-600 hover:text-emerald-800', btnOpen: 'bg-emerald-500 hover:bg-emerald-600 shadow-emerald-600/10' },
    rose: { tagBg: 'bg-rose-50', tagText: 'text-rose-600', tagBorder: 'border-rose-100', timeText: 'text-rose-400', titleHover: 'group-hover:text-rose-600', footerBg: 'bg-rose-50/30', footerBorder: 'border-rose-50', btnExec: 'text-rose-600 hover:text-rose-800', btnOpen: 'bg-rose-500 hover:bg-rose-600 shadow-rose-600/10' },
    orange: { tagBg: 'bg-orange-50', tagText: 'text-orange-600', tagBorder: 'border-orange-100', timeText: 'text-orange-400', titleHover: 'group-hover:text-orange-600', footerBg: 'bg-orange-50/30', footerBorder: 'border-orange-50', btnExec: 'text-orange-600 hover:text-orange-800', btnOpen: 'bg-orange-500 hover:bg-orange-600 shadow-orange-600/10' },
    teal: { tagBg: 'bg-teal-50', tagText: 'text-teal-600', tagBorder: 'border-teal-100', timeText: 'text-teal-400', titleHover: 'group-hover:text-teal-600', footerBg: 'bg-teal-50/30', footerBorder: 'border-teal-50', btnExec: 'text-teal-600 hover:text-teal-800', btnOpen: 'bg-teal-500 hover:bg-teal-600 shadow-teal-600/10' },
    indigo: { tagBg: 'bg-indigo-50', tagText: 'text-indigo-600', tagBorder: 'border-indigo-100', timeText: 'text-indigo-400', titleHover: 'group-hover:text-indigo-600', footerBg: 'bg-indigo-50/30', footerBorder: 'border-indigo-50', btnExec: 'text-indigo-600 hover:text-indigo-800', btnOpen: 'bg-indigo-500 hover:bg-indigo-600 shadow-indigo-600/10' },
    cyan: { tagBg: 'bg-cyan-50', tagText: 'text-cyan-600', tagBorder: 'border-cyan-100', timeText: 'text-cyan-400', titleHover: 'group-hover:text-cyan-600', footerBg: 'bg-cyan-50/30', footerBorder: 'border-cyan-50', btnExec: 'text-cyan-600 hover:text-cyan-800', btnOpen: 'bg-cyan-500 hover:bg-cyan-600 shadow-cyan-600/10' },
};

const quizzes = ref([
    { id: 1, title: 'HTML Fundamentals', desc: 'Access handpicked documentation, boilerplate structures, and basic interactive challenges for web system beginners.', time: '25_MIN_RUN', tag: 'Free_Access', color: 'blue', icon: 'PDF_DOCS' },
    { id: 2, title: 'CSS Fundamentals', desc: 'Access handpicked documentation, boilerplate structures, and basic interactive challenges for styling frameworks.', time: '25_MIN_RUN', tag: 'Beginners', color: 'violet', icon: 'PDF_DOCS' },
    { id: 3, title: 'JavaScript Essentials', desc: 'Master the core logic of web development, including variables, asynchronous functions, and interactive DOM manipulation.', time: '30_MIN_RUN', tag: 'Intermediate', color: 'amber', icon: 'JS_DOCS' },
    { id: 4, title: 'Tailwind Mastery', desc: 'Learn utility-first CSS, responsive design, and rapid prototyping workflows using modern atomic styling techniques.', time: '20_MIN_RUN', tag: 'Beginners', color: 'sky', icon: 'UI_DOCS' },
    { id: 5, title: 'Vue.js Framework', desc: 'Deep dive into reactivity, components, lifecycle hooks, and the composition API for building modern web interfaces.', time: '35_MIN_RUN', tag: 'Intermediate', color: 'emerald', icon: 'VUE_DOCS' },
    { id: 6, title: 'React Fundamentals', desc: 'Build dynamic UIs with hooks, state management, component patterns, and the React ecosystem.', time: '35_MIN_RUN', tag: 'Intermediate', color: 'rose', icon: 'REACT_DOCS' },
    { id: 7, title: 'TypeScript Basics', desc: 'Understand static typing, interfaces, generics, and utility types to write safer and more scalable JavaScript code.', time: '30_MIN_RUN', tag: 'Intermediate', color: 'orange', icon: 'TS_DOCS' },
    { id: 8, title: 'Node.js Fundamentals', desc: 'Explore server-side JavaScript, the event loop, built-in modules, and building REST APIs with Express.', time: '35_MIN_RUN', tag: 'Intermediate', color: 'teal', icon: 'NODE_DOCS' },
    { id: 9, title: 'Git & Version Control', desc: 'Master branching, merging, rebasing, and collaborative workflows using Git and remote repositories.', time: '20_MIN_RUN', tag: 'Beginners', color: 'indigo', icon: 'GIT_DOCS' },
    { id: 10, title: 'REST API Design', desc: 'Learn HTTP methods, status codes, authentication, pagination, and best practices for designing clean RESTful APIs.', time: '25_MIN_RUN', tag: 'Intermediate', color: 'cyan', icon: 'API_DOCS' },
]);

const filteredQuizzes = computed(() => {
    return quizzes.value.filter(quiz => {
        const matchesSearch = quiz.title.toLowerCase().includes(searchQuery.value.toLowerCase());
        const matchesCategory = selectedCategory.value === 'All' || quiz.tag === selectedCategory.value;
        return matchesSearch && matchesCategory;
    });
});


const fetchUserProgress = async () => {
    const user = await getAuthUser();
    if (!user) return;

    const { data } = await supabase
        .from('user_results')
        .select('quiz_id, score') // Isama ang score
        .eq('user_id', user.id);

    if (data) {
        completedQuizzes.value = data.map(item => item.quiz_id);
        // Dito mo rin pwedeng i-store ang scores kung kailangan sa UI
    }
};

onMounted(async () => {

    await fetchUserProgress();
    // I-fetch ang progress
    setTimeout(() => { Isloading.value = false; }, 1000);
});

onMounted(() => { setTimeout(() => { Isloading.value = false; }, 1000); });


</script>

<template>
    <div class="p-6 grid grid-cols-1 gap-6">
        <div class="flex justify-between items-center 2xl:pt-0 pt-14 border-b border-blue-50 pb-5">
            <div>
                <div class="flex items-center gap-2">
                    <span
                        class="bg-blue-600 text-white text-[9px] font-black px-1.5 py-0.5 rounded uppercase tracking-wider">Storage.Repo</span>
                    <h1 class="text-2xl font-black text-blue-900 tracking-tight uppercase">Quizzes</h1>
                </div>
                <p class="text-xs text-gray-700/70 mt-1">Track your progress, access educational resources, and test
                    your execution skills.</p>
            </div>
        </div>

        <div
            class="bg-white p-4 rounded-2xl shadow-lg shadow-gray-300/20  border border-gray-100 flex flex-col md:flex-row gap-4 items-center justify-between">
            <div class="relative w-full md:w-96">
                <span class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-blue-900">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor" stroke-width="2.5">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </span>
                <input v-model="searchQuery" type="text" placeholder="Search system resources or quizzes..."
                    class="w-full pl-10 pr-4 py-2.5 bg-gray-50/40 border border-gray-100 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-blue-900 focus:bg-white transition-all text-blue-950 placeholder-gray-400/70 font-semibold" />
            </div>

            <div class="flex flex-wrap gap-2 w-full md:w-auto">
                <button v-for="cat in ['All', 'Free_Access', 'Intermediate', 'Beginners']" :key="cat"
                    @click="selectedCategory = cat"
                    :class="selectedCategory === cat ? 'bg-blue-600 text-white' : 'bg-white text-blue-900'"
                    class="px-4 py-2 text-xs font-black rounded-xl border border-blue-100 transition-colors uppercase tracking-wider">
                    {{ cat.replace('_', ' ') }}
                </button>
            </div>
        </div>

        <quizesskeliton v-if="Isloading" />

        <section v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div v-for="quiz in filteredQuizzes" :key="quiz.id"
                class="bg-white rounded-2xl border border-gray-100 shadow-lg shadow-gray-300/20  overflow-hidden flex flex-col justify-between hover:shadow-md transition-all duration-200 group">
                <div class="p-5 space-y-3">
                    <div class="flex justify-between items-center">
                        <span
                            :class="[styles[quiz.color].tagBg, styles[quiz.color].tagText, styles[quiz.color].tagBorder]"
                            class="px-2.5 py-0.5 text-[10px] font-black rounded-md border uppercase tracking-wider">
                            {{ quiz.tag }}
                        </span>
                        <span :class="styles[quiz.color].timeText" class="text-[11px] font-bold font-mono">{{ quiz.time
                        }}</span>
                    </div>
                    <div>
                        <h3 :class="styles[quiz.color].titleHover"
                            class="font-black text-blue-950 text-lg uppercase tracking-tight transition-colors">
                            {{ quiz.title }}
                        </h3>
                        <p class="text-gray-700/70 text-xs mt-1.5 leading-relaxed line-clamp-2">{{ quiz.desc }}</p>
                    </div>
                </div>

                <div :class="[styles[quiz.color].footerBg, styles[quiz.color].footerBorder]"
                    class="px-5 py-4 border-t flex justify-between items-center">

                    <button :class="styles[quiz.color].btnExec"
                        class="text-xs font-black transition-colors uppercase tracking-wider">
                        {{ completedQuizzes.includes(quiz.id) ? 'Re-take Quiz' : 'Execute Quiz' }}
                    </button>

                    <button @click="openModal(quiz)" :class="styles[quiz.color].btnOpen"
                        class="text-white font-black text-xs px-3 py-1.5 rounded-xl transition-all shadow-sm">
                        {{ completedQuizzes.includes(quiz.id) ? 'View Results' : 'Open' }}
                    </button>
                </div>
            </div>
        </section>

        <Modal :Isopen="showModal" :isDone="completedQuizzes.includes(selectedQuiz?.id)" :quizData="selectedQuiz"
            @close="showModal = false" />

        <footer
            class="w-full text-center text-[10px] text-blue-400 font-bold pt-4 border-t border-blue-50 tracking-widest mt-auto">
            WHITE & BLUE QUIZ ENGINE // RUN_REPOSITORY_VIEW
        </footer>
    </div>
</template>