<script setup>
import { ref } from 'vue';
import Topupmodal from '../modal/topupmodal.vue';
import { addCredits } from '../../store/store.js';

const isModalOpen = ref(false)
const selectedPkg = ref(null)

const packages = ref([
    { id: 'starter', name: 'Starter Pack', credits: 20, price: 50, bonus: 0 },
    { id: 'pro', name: 'Pro Builder', credits: 50, price: 100, bonus: 0 },
    { id: 'elite', name: 'Elite Pass', credits: 120, price: 200, bonus: 20 }
])

const openModal = (pkg) => {
    selectedPkg.value = pkg
    isModalOpen.value = true
}
</script>

<template>
    <div class="p-6 w-full space-y-6 overflow-y-auto h-screen bg-gray-50/30 relative">
        <section class="space-y-4">
            <div class="flex justify-between items-center 2xl:pt-0 pt-14 border-b border-blue-50 pb-5">
                <div>
                    <div class="flex items-center gap-2">
                        <span
                            class="bg-blue-600 text-white text-[9px] font-black px-1.5 py-0.5 rounded uppercase tracking-wider">Topup
                            now</span>
                        <h1 class="text-2xl font-black text-blue-900 tracking-tight uppercase">Credit Balance</h1>
                    </div>
                    <p class="text-xs text-gray-700/70 mt-1">Add credits to unlock premium quizzes and official
                        certifications.
                    </p>
                </div>
            </div>

            <h3 class="text-xs font-bold text-gray-400 uppercase tracking-wider">Select Token Package</h3>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">

                <div v-for="pkg in packages" :key="pkg.id"
                    class="bg-white shadow-lg shadow-gray-300/20 rounded-3xl p-6 flex flex-col justify-between transition-all relative group">

                    <div>
                        <h4 class="font-bold text-gray-900 text-sm mt-4">{{ pkg.name }}</h4>
                        <div class="mt-1 text-2xl font-black text-blue-600 tracking-tight">
                            +{{ pkg.credits }} <span class="text-xs font-medium text-gray-400">Credits</span>
                        </div>
                    </div>

                    <div class="mt-6 pt-4 border-t border-gray-100 space-y-4">
                        <div class="flex justify-between items-center text-xs">
                            <span class="text-gray-400">Price</span>
                            <span class="font-bold text-gray-900 text-sm">₱{{ pkg.price }}.00</span>
                        </div>

                        <button @click="openModal(pkg)"
                            class="w-full bg-blue-600 hover:bg-blue-700 active:scale-[0.99] text-white font-bold py-2.5 rounded-xl text-xs transition-all shadow-sm flex items-center justify-center space-x-1">
                            <span>Get Credits</span>
                        </button>
                    </div>
                </div>
            </div>
        </section>

        <Topupmodal v-if="isModalOpen" :is-open="isModalOpen" :pkg="selectedPkg" @close="isModalOpen = false" />
    </div>
</template>