<script setup>
import { useRouter } from 'vue-router';
import { myCredits } from '../../store/store.js'
import { supabase } from '../../supabase/supabase.js';
import { getAuthUser } from '../../services/authuserservices.js';
import { ref } from 'vue';

// 1. Tanggapin ang quizData bilang prop
const props = defineProps({
  Isopen: Boolean,
  quizData: Object, // Dito natin ilalagay yung quiz object
  isDone: Boolean // Ito ang bago
})

defineEmits(['close'])

const router = useRouter()
const creditserror = ref('')
const isProcessing = ref(false);

const startQuiz = async () => {
  if (isProcessing.value) return;

  isProcessing.value = true;
  creditserror.value = '';

  try {
    const user = await getAuthUser();
    if (!user) return;

    // Laging mag-check ng balance, re-take man o first time
    if (myCredits.value < 5) {
      creditserror.value = 'Insufficient credits!';
      isProcessing.value = false;
      setTimeout(() => { creditserror.value = ''; }, 2000);
      return;
    }

    // Bawas credits
    const { error } = await supabase
      .from('profiles')
      .update({ credits: myCredits.value - 5 })
      .eq('id', user.id);

    if (error) throw error;

    // Update local state
    myCredits.value -= 5;

    // Push to quiz
    router.push(`/quiz/${props.quizData.id}`);

  } catch (err) {
    console.error(err);
    creditserror.value = 'Database error. Please try again.';
    isProcessing.value = false;
  }
}
</script>

<template>
  <div v-if="Isopen" class="fixed inset-0 z-50 flex items-center justify-center p-4 font-sans antialiased">
    <div class="h-screen absolute inset-0 bg-gray-950/40 " @click="$emit('close')"></div>

    <div
      class="relative w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-center shadow-lg shadow-gray-300/20 transition-all z-10 border border-gray-100">

      <div
        class="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 border border-blue-100 mb-4 text-blue-600 shadow-inner">
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10" />
          <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
          <line x1="12" x2="12.01" y1="17" y2="17" />
        </svg>
      </div>

      <div class="space-y-1 mb-5">
        <span
          class="text-[9px] font-black text-blue-500 uppercase tracking-widest bg-blue-50 px-2 py-0.5 rounded border border-blue-100">System_Prompt</span>
        <h3 class="text-lg font-black text-blue-950 uppercase tracking-tight pt-1">Confirm Quiz Activation</h3>
        <h4 class="font-black text-blue-950 uppercase tracking-tight">Goodluck baby ko mwamwa ka sakin!</h4>
        <p class="text-xs text-gray-700/60 font-medium">Please review the system architecture rules before
          initialization.</p>
      </div>

      <div v-if="creditserror"
        class="mb-4 text-left p-3.5 bg-red-50 border border-red-100 text-red-600 text-[11px] font-black uppercase tracking-wider rounded-xl shadow-sm">
        <div class="flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24"
            stroke="currentColor" stroke-width="2.5">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <span>{{ creditserror }}</span>
        </div>
      </div>

      <div class="grid grid-cols-2 gap-3 mb-6 text-left">

        <div
          class="bg-blue-50/30 border border-blue-100 p-3.5 rounded-xl flex flex-col justify-between group hover:border-blue-300 transition-colors">
          <div>
            <div
              class="flex items-center space-x-1.5 text-blue-500 font-black text-[10px] uppercase tracking-widest mb-1">
              <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2.5">
                <circle cx="8" cy="8" r="6" />
                <circle cx="18" cy="18" r="4" />
                <path d="M12 18a6 6 0 0 0-6-6" />
                <path d="M20 10a8 8 0 0 0-8-8" />
              </svg>
              <span>Cost_Payload</span>
            </div>
            <p class="text-blue-950 font-black text-sm font-mono">-5 CREDITS</p>
          </div>
          <p class="text-[10px] text-gray-700/60 font-semibold leading-normal mt-2">Deducted directly from node account
            balance.</p>
        </div>

        <div
          class="bg-blue-50/30 border border-blue-100 p-3.5 rounded-xl flex flex-col justify-between group hover:border-blue-300 transition-colors">
          <div>
            <div
              class="flex items-center space-x-1.5 text-blue-500 font-black text-[10px] uppercase tracking-widest mb-1">
              <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2.5">
                <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 9.9-1" />
              </svg>
              <span>Access_Type</span>
            </div>
            <p class="text-blue-950 font-black text-sm uppercase">Lifetime Open</p>
          </div>
          <p class="text-[10px] text-gray-700/60 font-semibold leading-normal mt-2">Retake anytime without triggering
            fresh core costs.</p>
        </div>

        <div
          class="bg-blue-50/30 border border-blue-100 p-3.5 rounded-xl flex flex-col justify-between group hover:border-blue-300 transition-colors">
          <div>
            <div
              class="flex items-center space-x-1.5 text-blue-500 font-black text-[10px] uppercase tracking-widest mb-1">
              <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2.5">
                <line x1="10" x2="14" y1="2" y2="2" />
                <line x1="12" x2="12" y1="14" y2="11" />
                <circle cx="12" cy="14" r="8" />
              </svg>
              <span>Time_Limit</span>
            </div>
            <p class="text-blue-950 font-black text-sm font-mono">20 MINUTES</p>
          </div>
          <p class="text-[10px] text-gray-700/60 font-semibold leading-normal mt-2">Active runtime tracking.
            Auto-submits on timeout.</p>
        </div>

        <div
          class="bg-blue-50/30 border border-blue-100 p-3.5 rounded-xl flex flex-col justify-between group hover:border-blue-400 transition-colors">
          <div>
            <div
              class="flex items-center space-x-1.5 text-blue-600 font-black text-[10px] uppercase tracking-widest mb-1">
              <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2.5">
                <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                <path d="M3 3v5h5" />
                <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
                <path d="M16 16h5v5" />
              </svg>
              <span>Restrictions</span>
            </div>
            <p class="text-blue-950 font-black text-sm uppercase">No Refresh</p>
          </div>
          <p class="text-[10px] text-gray-600 font-bold leading-normal mt-2 uppercase tracking-wide">Leaving screen
            resets execution progress.</p>
        </div>

      </div>

      <div class="flex gap-3 justify-center">
        <button @click="$emit('close')"
          class="w-full py-2.5 text-xs font-black text-blue-400 hover:text-blue-600 bg-blue-50/50 hover:bg-blue-50 border border-blue-100 rounded-xl transition-colors uppercase tracking-wider">
          Cancel
        </button>
        <button @click="startQuiz" :disabled="isProcessing || myCredits < 5"
          class="w-full py-2.5 text-xs font-black text-white rounded-xl shadow-md transition-all active:scale-95 uppercase tracking-wider"
          :class="[
            (isProcessing || myCredits < 5) ? 'bg-gray-400 cursor-not-allowed' :
              (isDone ? 'bg-amber-500 hover:bg-amber-600' : 'bg-blue-600 hover:bg-blue-700')
          ]">

          <span v-if="isProcessing">Initializing...</span>
          <span v-else-if="myCredits < 5">Insufficient Credits</span>
          <span v-else-if="isDone">Deduct & Re-take</span>
          <span v-else>Deduct & Start</span>
        </button>
      </div>

    </div>
  </div>
</template>