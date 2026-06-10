<script setup>
import { supabase } from '../../supabase/supabase.js';
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
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error("No user logged in");

        const { data: profile } = await supabase
            .from('profiles')
            .select('credits')
            .eq('id', user.id)
            .single();

        const currentCredits = profile?.credits || 0;
        const totalToAdd = props.pkg.credits + (props.pkg.bonus || 0);
        const newTotal = currentCredits + totalToAdd;

        const { error } = await supabase
            .from('profiles')
            .update({ credits: newTotal })
            .eq('id', user.id);

        if (error) throw error;

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
    <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-black/45 p-4">
        <div class="bg-white rounded-2xl max-w-sm w-full p-7 shadow-xl border border-gray-100 text-center space-y-5">

            <!-- Icon -->
            <div class="w-13 h-13 rounded-full bg-blue-50 flex items-center justify-center mx-auto">
                <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" stroke-width="1.8"
                    viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 6v6l4 2" />
                </svg>
            </div>

            <!-- Heading -->
            <div class="space-y-1">
                <h3 class="text-base font-semibold text-gray-900">Confirm your purchase</h3>
                <p class="text-gray-400 text-sm">
                    You're buying the <span class="text-gray-700 font-medium">{{ pkg.name }}</span>
                </p>
            </div>

            <!-- Credits highlight -->
            <div class="bg-green-50 border border-green-100 rounded-xl py-4 px-3">
                <span class="text-2xl font-semibold text-green-700">
                    +{{ pkg.credits + (pkg.bonus || 0) }} credits
                </span>
                <p v-if="pkg.bonus" class="text-xs text-green-500 mt-1">
                    {{ pkg.credits }} base + {{ pkg.bonus }} bonus
                </p>
            </div>

            <!-- Breakdown -->
            <div class="text-left space-y-2 text-sm">
                <div class="flex justify-between">
                    <span class="text-gray-400">Package</span>
                    <span class="text-gray-800 font-medium">{{ pkg.name }}</span>
                </div>
                <div class="flex justify-between">
                    <span class="text-gray-400">Base credits</span>
                    <span class="text-gray-800 font-medium">{{ pkg.credits }}</span>
                </div>
                <div v-if="pkg.bonus" class="flex justify-between">
                    <span class="text-gray-400">Bonus credits</span>
                    <span class="text-green-600 font-medium">+{{ pkg.bonus }}</span>
                </div>
            </div>

            <hr class="border-gray-100" />

            <!-- Actions -->
            <div class="flex gap-2.5">
                <button @click="emit('close')"
                    class="flex-1 border border-gray-200 text-gray-500 font-medium py-2.5 rounded-xl text-sm hover:bg-gray-50 transition-all">
                    Cancel
                </button>
                <button @click="confirmPurchase" :disabled="isProcessing"
                    class="flex-[2] text-white font-medium py-2.5 rounded-xl text-sm transition-all flex items-center justify-center gap-1.5"
                    :class="isProcessing
                        ? 'bg-blue-300 cursor-not-allowed'
                        : 'bg-blue-600 hover:bg-blue-700'">
                    <span v-if="isProcessing">Processing...</span>
                    <span v-else>Confirm purchase</span>
                </button>
            </div>

        </div>
    </div>
</template>