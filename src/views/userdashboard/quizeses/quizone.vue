<script setup>
import { ref, onMounted, computed, onUnmounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { supabase } from '../../../supabase/supabase.js';
import { getAuthUser } from '../../../services/authuserservices.js';
import SubmitQuizModal from '../../modal/submitquizmodal.vue';

const route = useRoute();
const router = useRouter();
const quizId = route.params.id;

const questions = ref([]);
const currentIndex = ref(0);
const userAnswers = ref({});
const isLoading = ref(true);
const timeLeft = ref(1200);
const isSubmitting = ref(false)
const showSubmitModal = ref(false);
const unansweredCount = ref(0);
let timer = null;

onMounted(async () => {
    isLoading.value = true;

    try {
        const { data, error } = await supabase
            .from('questions')
            .select('*')
            .eq('quiz_id', Number(quizId))
            .order('id', { ascending: true });

        if (error) throw error;

        questions.value = (data || []).map(q => ({
            ...q,
            options: Array.isArray(q.options) ? q.options : []
        }));

        startTimer();
    } catch (err) {
        console.error("Error:", err);
    } finally {
        isLoading.value = false;
    }
});

const startTimer = () => {
    timer = setInterval(() => {
        if (timeLeft.value > 0) timeLeft.value--;
        else submitQuiz();
    }, 1000);
};

const formatTime = computed(() => {
    const mins = Math.floor(timeLeft.value / 60);
    const secs = timeLeft.value % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
});

const selectOption = (index) => {
    userAnswers.value[currentIndex.value] = index;
};

const checkUnansweredQuestions = () => {
    unansweredCount.value = questions.value.length - Object.keys(userAnswers.value).length;
    return unansweredCount.value === 0;
};

const handleSubmitClick = () => {
    if (checkUnansweredQuestions()) {
        submitQuiz();
    } else {
        showSubmitModal.value = true;
    }
};

const confirmSubmitQuiz = () => {
    if (checkUnansweredQuestions()) {
        showSubmitModal.value = false;
        submitQuiz();
    }
};

const closeSubmitModal = () => {
    showSubmitModal.value = false;
};

const nextQuestion = () => {
    if (currentIndex.value < questions.value.length - 1) currentIndex.value++;
};

const prevQuestion = () => {
    if (currentIndex.value > 0) currentIndex.value--;
};

const submitQuiz = async () => {

    isSubmitting.value = true;
    clearInterval(timer);

    let finalScore = 0;

    console.log("Current User Answers:", userAnswers.value);

    questions.value.forEach((q, index) => {
        // Siguraduhing index ang comparison
        const selected = userAnswers.value[index];
        if (selected !== undefined && selected === q.correct_answer) {
            finalScore += 4;
        }
    });

    console.log("Computed Final Score:", finalScore);

    try {
        const user = await getAuthUser();
        if (!user) return;

        if (user) {
            // Gamitin ang upsert
            const { data, error } = await supabase
                .from('user_results')
                .upsert(
                    {
                        user_id: user.id,
                        quiz_id: Number(quizId),
                        score: finalScore, // Ito yung bagong compute
                        created_at: new Date().toISOString()
                    },
                    { onConflict: 'user_id, quiz_id' }
                );

            if (error) {
                console.error("Supabase Error:", error);
                throw error;
            }
            console.log("Upsert Success!");
        }
    } catch (err) {
        console.error("Error saving score:", err);
    } finally {
        isSubmitting.value = false;
    }

    // Redirect
    router.push({
        name: 'CongratsView',
        query: { score: finalScore }
    });
};

const currentQuestion = computed(() => questions.value[currentIndex.value]);
onUnmounted(() => clearInterval(timer));
</script>

<template>
    <section
        class="w-full h-screen flex flex-col justify-between bg-blue-50/30 text-blue-950 p-6 font-sans antialiased overflow-y-auto">
        <div class="w-full pt-14 2xl:pt-0 pb-6 border-b border-blue-100">
            <div class="flex items-center justify-between gap-4 flex-wrap">
                <div class="flex items-center gap-2">
                    <span
                        class="bg-blue-600 text-white text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-widest">Active
                        Quiz</span>
                    <h1 class="text-xl font-black text-blue-900 tracking-tight uppercase">Quiz Engine #{{ quizId }}</h1>
                </div>
                <div
                    class="flex items-center gap-2 bg-red-50 border border-red-200/60 px-3 py-1.5 rounded-xl text-red-600">
                    <span class="text-[10px] font-black tracking-wider uppercase">Time Remaining:</span>
                    <span class="font-mono text-sm font-black tracking-widest">{{ formatTime }}</span>
                </div>
            </div>
        </div>

        <div v-if="isLoading" class="flex-1 font-black flex items-center justify-center">Loading Questions...</div>

        <div v-else-if="currentQuestion"
            class="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 items-center py-6">
            <div class="lg:col-span-2 space-y-6 bg-white border border-gray-100 p-6 md:p-8 rounded-3xl shadow-sm">
                <div class="flex justify-between items-center text-[11px] font-bold text-blue-400">
                    <span>QUESTION PROMPT #{{ currentIndex + 1 }}</span>
                </div>

                <div class="bg-blue-50/40 border border-blue-100 p-5 rounded-2xl shadow-inner">
                    <h2 class="text-sm md:text-base font-bold text-blue-900">{{ currentQuestion.question_text }}</h2>
                </div>

                <div class="space-y-3">
                    <button v-for="(opt, index) in currentQuestion.options" :key="index" @click="selectOption(index)"
                        :class="['w-full text-left p-4 rounded-xl border text-xs font-bold flex items-center gap-4 transition-all',
                            userAnswers[currentIndex] === index ? 'bg-gray-200 border-gray-300' : 'bg-white border-gray-100 hover:border-gray-400']">
                        <span class="text-blue-400 font-black tracking-wider">[{{ String.fromCharCode(65 + index)
                            }}]</span>
                        <span>{{ opt }}</span>
                    </button>
                </div>
            </div>

            <div
                class="bg-white border border-gray-100 p-6 rounded-3xl shadow-sm flex flex-col justify-between gap-6 h-full 2xl:min-h-[350px] h-auto">
                <div class="2xl:grid hidden">
                    <h3 class="text-base font-black text-blue-900 tracking-wide mb-3">NAVIGATOR</h3>
                    <div class="grid grid-cols-4 gap-2">
                        <div v-for="(_, i) in questions" :key="i"
                            :class="['w-full h-15 flex items-center justify-center rounded-lg text-[10px] font-black',
                                currentIndex === i ? 'bg-blue-600 text-white' : (userAnswers[i] !== undefined ? 'bg-green-200 text-gray-700' : 'bg-blue-50 text-blue-400')]">
                            {{ i + 1 }}
                        </div>
                    </div>
                </div>

                <div class="space-y-3 pt-4 border-t border-blue-50">
                    <div class="flex justify-between gap-2">
                        <button @click="prevQuestion" :disabled="currentIndex === 0"
                            class="flex-1 py-2.5 rounded-xl border text-xs font-bold bg-white border-blue-200 text-blue-700">PREV</button>
                        <button @click="nextQuestion" :disabled="currentIndex === questions.length - 1"
                            class="flex-1 py-2.5 rounded-xl border text-xs font-bold bg-white border-blue-200 text-blue-700">NEXT</button>
                    </div>
                    <button @click="handleSubmitClick" :disabled="isSubmitting" :class="[
                        'w-full font-black py-3 rounded-xl text-xs tracking-widest transition-colors',
                        isSubmitting ? 'bg-blue-200 text-blue-800' : 'bg-blue-600 text-white'
                    ]">
                        {{ isSubmitting ? 'SUBMITTING...' : 'SUBMIT_QUIZ_NOW()' }}
                    </button>
                </div>
            </div>
        </div>
    </section>

    <!-- Submit Quiz Modal Component -->
    <SubmitQuizModal :isOpen="showSubmitModal" :unansweredCount="unansweredCount"
        :answeredCount="Object.keys(userAnswers).length" :totalQuestions="questions.length" @close="closeSubmitModal"
        @confirm="confirmSubmitQuiz" />
</template>