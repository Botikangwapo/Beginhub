<script setup>
import { supabase } from '../../supabase/supabase.js'; // I-check kung saan ang path ng client mo
import { addCredits } from '../../store/store.js';
import { ref } from 'vue';

const props = defineProps({
    isOpen: Boolean,
    pkg: Object
})

const emit = defineEmits(['close'])
const isProcessing = ref(false)

const confirmPurchase = async () => {

    try {
        isProcessing.value = true
        // 1. Kunin ang kasalukuyang user session
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error("No user logged in");

        // 2. Kunin ang kasalukuyang credits sa DB para hindi ma-overwrite (Fetch)
        const { data: profile } = await supabase
            .from('profiles')
            .select('credits')
            .eq('id', user.id)
            .single();

        const currentCredits = profile?.credits || 0;
        const totalToAdd = props.pkg.credits + (props.pkg.bonus || 0);
        const newTotal = currentCredits + totalToAdd;

        // 3. I-update ang database (Update)
        const { error } = await supabase
            .from('profiles')
            .update({ credits: newTotal })
            .eq('id', user.id);

        if (error) throw error;

        // 4. Update local state at close
        addCredits(totalToAdd);
        emit('close');

    } catch (err) {
        isProcessing.value = false;
        console.error("Error sa pag-topup:", err.message);
        alert("Hindi nagtagumpay ang transaction. Pakisubukang muli.");
    }
}
</script>

<template>
    <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-gray-950/40  p-3">
        <div class="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-gray-100 text-center space-y-5">
            <h3 class="text-lg font-black text-blue-900">BUY A CREDITS NOW!</h3>
            <p class="text-gray-500 text-xs px-2">
                this is a <span class=" text-gray-800">{{ pkg.name }}</span>.
            </p>
            <div class="bg-gray-50 rounded-2xl py-3 border border-gray-100">
                <span class="text-2xl font-black text-green-600">+{{ pkg.credits + (pkg.bonus || 0) }} Credits</span>
            </div>

            <div class="flex gap-2.5">
                <button @click="emit('close')"
                    class="w-full bg-white hover:bg-gray-200 border border-gray-200 text-gray-700 font-bold py-3 rounded-xl text-xs transition-all">
                    cencel
                </button>
                <button @click="confirmPurchase" class="w-full bg-blue-700 hover:bg-blue-500 text-white font-bold py-3 rounded-xl text-xs
                    transition-all"
                    :class="isProcessing ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 shadow-blue-600/10'">
                    <span v-if="isProcessing">Processing...</span>
                    <span v-else>buy</span>
                </button>
            </div>

        </div>
    </div>
</template>