<script setup>
import { ref, onMounted } from 'vue';
import { supabase } from '../../supabase/supabase.js';
import leaderskeliton from '../../skeliton/leaderskeliton.vue';

const Isloading = ref(true);
const leaderboard = ref([]);
const guide = ref('Slide left if naka cp ka naka overflow x auto yan baka kasi dimo paalam eh');

const fetchLeaderboard = async () => {
    try {
        const { data, error } = await supabase
            .from('global_leaderboard')
            .select('*');

        if (error) throw error;

        const stats = data.reduce((acc, curr) => {
            const fullName = `${curr.first_name}`;
            if (!acc[fullName]) {
                acc[fullName] = {
                    name: fullName,
                    initials: `${curr.first_name[0]}${curr.last_name[0]}`,
                    quizzesCount: 0,
                    totalScore: 0,
                    efficiency: 0 // Ito ang ilalagay natin
                };
            }
            acc[fullName].quizzesCount += 1;
            acc[fullName].totalScore += curr.score;

            // Compute efficiency (Average score per quiz)
            acc[fullName].efficiency = (acc[fullName].totalScore / acc[fullName].quizzesCount).toFixed(1);

            return acc;
        }, {});

        leaderboard.value = Object.values(stats).sort((a, b) => b.totalScore - a.totalScore);
    } catch (err) {
        console.error("Error:", err);
    } finally {
        Isloading.value = false;
    }
};

onMounted(() => {
    setTimeout(() => {
        guide.value = ''
    }, 6000)
})
onMounted(fetchLeaderboard);
</script>

<template>
    <div class="p-6 space-y-6 w-full h-screen overflow-y-auto bg-blue-50/20 font-sans antialiased">
        <div class="text-left 2xl:pt-0 pt-14 border-b border-blue-50 pb-5">
            <div class="flex items-center gap-2">
                <span
                    class="bg-blue-600 text-white text-[9px] font-black px-1.5 py-0.5 rounded uppercase tracking-wider">Rank.Engine</span>
                <h1 class="text-2xl font-black text-blue-900 tracking-tight uppercase">Leaderboard</h1>
            </div>
            <p class="text-xs text-gray-700/70 mt-1">See how you rank against other elite developers.</p>
        </div>

        <leaderskeliton v-if="Isloading" />

        <div v-else class="w-full overflow-x-auto">
            <h1 class="font-black text-blue-900 mb-3 uppercase">{{ guide }}</h1>
            <section
                class="bg-white 2xl:w-full w-150 rounded-2xl border border-gray-100 shadow-sm shadow-gray-300/30 overflow-hidden">
                <div
                    class="p-4 bg-blue-100/50 border-b border-gray-200 grid grid-cols-12 text-[10px] font-black text-blue-900 uppercase tracking-widest">
                    <div class="col-span-2 text-center">Rank_ID</div>
                    <div class="col-span-6">User_Identity</div>
                    <div class="col-span-2 text-right">efficiency</div>
                    <div class="col-span-2 text-right">Total_Score</div>
                </div>

                <div class="divide-y divide-blue-50/60">
                    <div v-for="(user, index) in leaderboard" :key="index"
                        :class="index === 0 ? 'bg-blue-50/30' : 'bg-white hover:bg-blue-50/20'"
                        class="grid grid-cols-12 items-center p-4 transition-colors group relative">

                        <div v-if="index === 0" class="absolute left-0 top-0 bottom-0 w-1 bg-blue-600"></div>

                        <div class="col-span-2 text-center font-black text-blue-600 text-sm">#{{ (index +
                            1).toString().padStart(2, '0') }}</div>

                        <div class="col-span-6 flex items-center space-x-3">
                            <div
                                class="w-8 h-8 rounded-3xl bg-blue-800 font-black text-xs flex items-center justify-center text-white  uppercase">
                                {{ user.initials }}
                            </div>
                            <div class="flex flex-col">
                                <span class="font-black text-blue-900 text-sm uppercase tracking-tight">{{ user.name
                                    }}</span>
                                <span class="text-[9px] font-black text-blue-500 uppercase tracking-widest">
                                    {{ index === 0 ? 'Top Contributor' : 'Active Builder' }}
                                </span>
                            </div>
                        </div>

                        <div class="col-span-2 text-right text-sm text-blue-950 font-mono font-bold">{{ user.efficiency
                            }}
                        </div>
                        <div class="col-span-2 text-right text-sm font-black text-blue-600 font-mono">{{ user.totalScore
                            }}
                        </div>
                    </div>
                </div>
            </section>
        </div>

        <footer
            class="w-full text-center text-[10px] text-blue-400 font-bold pt-4 border-t border-blue-50 tracking-widest mt-auto">
            WHITE & BLUE QUIZ ENGINE // LEADERBOARD_COMPILED_LOGS
        </footer>
    </div>
</template>