<script setup>
import { ref, onMounted } from 'vue';
import { supabase } from '../../supabase/supabase.js';
import Dashskeliton from '../../skeliton/dashloader.vue';
import { getAuthUser } from '../../services/authuserservices.js';

const isloading = ref(true);
const recentQuizzes = ref([]);
const stats = ref({
    quizzesResolved: 0,
    certifications: 0,
    efficiency: "0%"
});

onMounted(async () => {
    try {
        // 1. Kunin ang authenticated user
        const user = await getAuthUser(); // Simple na tawag lang
        if (!user) return;

        if (user) {
            // 2. I-fetch ang results mula sa database
            // I-join ang quiz table para makuha ang title kung kailangan
            const { data, error } = await supabase
                .from('user_results')
                .select('id, score, created_at, quizzes(title)')
                .eq('user_id', user.id)
                .order('created_at', { ascending: false });

            if (error) throw error;

            // 3. I-format ang data para sa table
            recentQuizzes.value = (data || []).map(item => ({
                id: item.id,
                title: item.quizzes?.title || 'Unknown Quiz',
                score: `${item.score}/99`, // I-adjust kung iba ang total score mo
                date: new Date(item.created_at).toLocaleDateString('en-US', {
                    month: 'short', day: '2-digit', year: 'numeric'
                }),
                status: item.score >= 80 ? 'PASSED' : 'FAILED'
            }));

            // 4. Compute Stats
            stats.value.quizzesResolved = recentQuizzes.value.length;
            stats.value.certifications = recentQuizzes.value.filter(q => q.status === 'PASSED').length;
            const totalScore = recentQuizzes.value.reduce((acc, curr) => acc + parseInt(curr.score), 0);
            stats.value.efficiency = recentQuizzes.value.length > 0
                ? Math.round(totalScore / recentQuizzes.value.length) + '%'
                : '0%';
        }
    } catch (err) {
        console.error("Error fetching dashboard data:", err);
    } finally {
        isloading.value = false;
    }
});
</script>

<template>
    <main
        class="flex-1 2xl:p-6 p-3.5 space-y-6 bg-blue-50/20 text-blue-950 font-sans antialiased overflow-y-auto min-h-screen">
        <header
            class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 2xl:pt-0 pt-16 border-b border-blue-50">
            <div>
                <div class="flex items-center gap-2">
                    <span
                        class="bg-blue-600 text-white text-[9px] font-black px-1.5 py-0.5 rounded uppercase tracking-wider">Console.Root</span>
                    <h1 class="text-2xl font-black text-blue-900 tracking-tight uppercase">Dashboard</h1>
                </div>
                <p class="text-xs text-gray-700/70 mt-1">Real-time compilation logs and metrics for your quiz metrics.
                </p>
            </div>
        </header>

        <Dashskeliton v-if="isloading" />

        <section v-else class="space-y-6">
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <div
                    class="bg-white p-6 rounded-2xl shadow-sm shadow-gray-300/30  border border-gray-100 flex items-center justify-between group transition-all ">
                    <div class="flex flex-col gap-1">
                        <span class="text-blue-400 font-black text-[11px] uppercase tracking-widest">Quizzes
                            Resolved</span>
                        <h2 class="text-4xl font-black text-blue-900 tracking-tight">{{ stats.quizzesResolved }}</h2>
                        <span class="text-[11px] text-gray-600/70 font-semibold mt-1">Active test sets</span>
                    </div>
                    <div
                        class="h-14 w-14 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-2xl border border-blue-100 transition-colors group-hover:bg-blue-600 group-hover:text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M13 5h8" />
                            <path d="M13 12h8" />
                            <path d="M13 19h8" />
                            <path d="m3 17 2 2 4-4" />
                            <rect x="3" y="4" width="6" height="6" rx="1" />
                        </svg>
                    </div>
                </div>

                <div
                    class="bg-white p-6 rounded-2xl shadow-sm shadow-gray-300/30 border border-gray-100 flex items-center justify-between group transition-all">
                    <div class="flex flex-col gap-1">
                        <span
                            class="text-violet-400 font-black text-[11px] uppercase tracking-widest">Certifications</span>
                        <h2 class="text-4xl font-black text-violet-900 tracking-tight">{{ stats.certifications }}</h2>
                        <span class="text-[11px] text-gray-600/70 font-semibold mt-1">Verified achievements</span>
                    </div>
                    <div
                        class="h-14 w-14 rounded-xl bg-violet-50 text-violet-600 flex items-center justify-center text-2xl border border-blue-100 transition-colors group-hover:bg-violet-600 group-hover:text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                            <rect x="3" y="4" width="18" height="13" rx="2" />
                            <path d="M5 20h14" />
                            <path d="M12 14V8" />
                            <path d="m9 11 3 3 3-3" />
                        </svg>
                    </div>
                </div>

                <div
                    class="bg-white p-6 rounded-2xl shadow-sm shadow-gray-300/30  border border-gray-100 flex items-center justify-between group transition-all ">
                    <div class="flex flex-col gap-1">
                        <span class="text-pink-400 font-black text-[11px] uppercase tracking-widest">Passing
                            Efficiency</span>
                        <h2 class="text-4xl font-black text-pink-900 tracking-tight">{{ stats.efficiency }}</h2>
                        <span class="text-[11px] text-gray-600/70 font-semibold mt-1">Average compile success</span>
                    </div>
                    <div
                        class="h-14 w-14 rounded-xl bg-pink-50 text-pink-600 flex items-center justify-center text-2xl border border-blue-100 transition-colors group-hover:bg-pink-600 group-hover:text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                            <line x1="18" y1="20" x2="18" y2="10" />
                            <line x1="12" y1="20" x2="12" y4="4" />
                            <line x1="6" y1="20" x2="6" y2="14" />
                        </svg>
                    </div>
                </div>
            </div>

            <div class="bg-white rounded-2xl border border-gray-100 shadow-sm shadow-gray-300/30 p-6 space-y-4">
                <div class="flex justify-between items-center border-b border-blue-50 pb-3">
                    <div>
                        <h3 class="text-sm font-black text-blue-950 uppercase tracking-wider">Recent Evaluation Records
                        </h3>
                        <p class="text-[11px] text-gray-400 font-medium">History of your recently completed test
                            iterations.</p>
                    </div>
                    <span
                        class="text-[10px] bg-blue-50 text-blue-800 border border-blue-100 px-2 py-0.5 rounded font-bold uppercase tracking-widest">System.Logs</span>
                </div>

                <div class="overflow-x-auto">
                    <table class="w-full text-left text-xs font-medium">
                        <thead>
                            <tr class="text-blue-400 uppercase tracking-wider border-b border-blue-50 text-[10px]">
                                <th class="pb-3 pl-2">Quiz Module</th>
                                <th class="pb-3">Compiled Score</th>
                                <th class="pb-3">Timestamp</th>
                                <th class="pb-3 text-right pr-2">Execution Status</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-blue-50/50 text-blue-900">
                            <tr v-for="quiz in recentQuizzes" :key="quiz.id"
                                class="hover:bg-blue-50/20 transition-colors group">
                                <td class="py-4 pl-2 font-black text-blue-700/70 uppercase">{{ quiz.title }}</td>
                                <td class="py-4 font-mono text-gray-600 font-bold">{{ quiz.score }}</td>
                                <td class="py-4 text-blue-700/60 font-sans">{{ quiz.date }}</td>
                                <td class="py-4 text-right pr-2">
                                    <span
                                        :class="['px-2 py-0.5 rounded-md text-[10px] font-black tracking-wider border', quiz.status === 'PASSED' ? 'bg-green-50 text-green-600 border-green-100' : 'bg-red-50 text-red-600 border-red-100']">
                                        {{ quiz.status }}
                                    </span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </section>

        <footer
            class="w-full text-center text-[10px] text-blue-400 font-bold pt-4 border-t border-blue-50 tracking-widest mt-auto">
            WHITE & BLUE SYSTEM CORE // DASHBOARD_VIEW
        </footer>
    </main>
</template>