<script setup>
import { ref, onMounted } from 'vue';
import { supabase } from '../../supabase/supabase.js';
import { generateCertificatePDF } from '../../Downloadpdf/Certificatepdf.js';
import { getAuthUser } from '../../services/authuserservices.js';

const certifications = ref([]);
const isLoading = ref(true);

const fetchCertificates = async () => {
    try {
        const user = await getAuthUser();
        if (!user) return;

        const { data: certData, error: certError } = await supabase
            .from('user_results')
            .select('id, score, created_at, quizzes(title)')
            .eq('user_id', user.id)
            .gte('score', 80);

        const { data: profileData } = await supabase
            .from('profiles')
            .select('first_name, last_name')
            .eq('id', user.id)
            .single();

        if (certError) throw certError;

        const fullName = profileData
            ? `${profileData.first_name} ${profileData.last_name}`
            : 'Valued User';

        certifications.value = (certData || []).map(item => ({
            id: item.id,
            title: item.quizzes?.title || 'Unknown Quiz',
            score: item.score,
            userName: fullName,
            date: new Date(item.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
            hash: `BH-${item.id.toString().substring(0, 4)}-2026`
        }));
    } catch (err) { console.error(err); } finally { isLoading.value = false; }
};

const downloadPDF = (cert) => {
    generateCertificatePDF(cert)
}

onMounted(fetchCertificates);
</script>

<template>
    <div class="p-6 space-y-6 overflow-y-auto h-screen bg-blue-50/20 font-sans antialiased">
        <div class="2xl:pt-0 pt-14 border-b border-blue-50 pb-5">
            <div class="flex items-center gap-2">
                <span
                    class="bg-blue-600 text-white text-[9px] font-black px-1.5 py-0.5 rounded uppercase tracking-wider">Credentials.Sec</span>
                <h1 class="text-2xl font-black text-blue-900 tracking-tight uppercase">Certifications</h1>
            </div>
            <p class="text-xs text-gray-700/70 mt-1">"Earn a certificate by passing the quiz with a score of 80 or
                higher."</p>
        </div>

        <section class="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <div v-for="cert in certifications" :key="cert.id"
                class="relative overflow-hidden rounded-2xl bg-white border border-gray-100 p-8 shadow-sm shadow-gray-300/30  min-h-[260px] flex flex-col justify-between group hover:border-blue-300 transition-all duration-200">

                <div
                    class="absolute right-0 top-0 w-24 h-24 bg-blue-50 rounded-bl-full pointer-events-none border-l border-b border-blue-100/30">
                </div>

                <div class="flex justify-between items-start relative z-10">
                    <div class="space-y-1">
                        <span
                            class="px-2 py-0.5 text-[9px] font-black rounded-md bg-blue-50 text-blue-600 border border-blue-100 uppercase tracking-widest">Verified
                            Credential</span>
                        <h2 class="text-xl font-black tracking-tight text-blue-950 uppercase pt-1">{{ cert.title }}</h2>
                    </div>
                </div>

                <div class="my-4 relative z-10 bg-blue-100/30 border border-blue-50/50 p-3.5 rounded-xl">
                    <p class="text-[10px] text-blue-400 font-black uppercase tracking-widest">ISSUED_TO_HOLDER:</p>
                    <p class="text-base font-black tracking-wide text-blue-950 mt-0.5 uppercase">{{ cert.userName }}</p>
                </div>

                <div class="flex justify-between items-end pt-4 border-t border-blue-50 relative z-10 text-xs">
                    <div class="text-[11px] font-semibold text-blue-400/80 space-y-0.5">
                        <p>HASH_ID: <span class="font-mono text-blue-600 font-bold">{{ cert.hash }}</span></p>
                        <p>TIMELOG: <span class="text-blue-950 font-bold">{{ cert.date }}</span></p>
                    </div>
                    <button @click="downloadPDF(cert)"
                        class="px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-xl text-xs flex items-center space-x-1.5 transition-all shadow-sm shadow-blue-600/10 uppercase tracking-wider">
                        <span>Download_PDF</span>
                    </button>
                </div>
            </div>

            <div v-if="certifications.length === 0"
                class="border-2 border-dashed border-blue-200/70 rounded-2xl p-8 flex flex-col items-center justify-center text-center bg-white min-h-[260px] space-y-3">
                <p class="text-blue-700/60 text-xs">No certifications earned yet. Keep testing!</p>
            </div>
        </section>
    </div>
</template>