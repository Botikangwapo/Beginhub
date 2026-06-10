<script setup>
const props = defineProps({
    isOpen: {
        type: Boolean,
        required: true
    },
    unansweredCount: {
        type: Number,
        required: true
    },
    answeredCount: {
        type: Number,
        required: true
    },
    totalQuestions: {
        type: Number,
        required: true
    }
});

const emits = defineEmits(['close', 'confirm']);

const handleClose = () => {
    emits('close');
};

const handleConfirm = () => {
    if (props.unansweredCount === 0) {
        emits('confirm');
    }
};
</script>

<template>
    <transition name="modal">
        <div v-if="isOpen" class="fixed inset-0 bg-black/45 flex items-center justify-center z-50 p-4">
            <transition name="modal-scale">
                <div class="bg-white rounded-2xl border border-gray-100 shadow-xl max-w-sm w-full overflow-hidden">

                    <!-- Icon Header -->
                    <div class="px-6 pt-7 pb-5 text-center border-b border-gray-100">
                        <div class="w-13 h-13 rounded-full flex items-center justify-center mx-auto mb-3"
                            :class="unansweredCount > 0 ? 'bg-amber-50' : 'bg-green-50'">
                            <svg v-if="unansweredCount > 0" class="w-6 h-6 text-amber-500" fill="none"
                                stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                            </svg>
                            <svg v-else class="w-6 h-6 text-green-600" fill="none" stroke="currentColor"
                                stroke-width="1.8" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <h2 class="text-base font-semibold text-gray-900">
                            {{ unansweredCount > 0 ? 'You have unanswered questions' : 'Ready to submit' }}
                        </h2>
                        <p class="text-sm text-gray-400 mt-1">
                            {{ unansweredCount > 0
                                ? 'Review your answers before submitting'
                                : 'All questions have been answered' }}
                        </p>
                    </div>

                    <!-- Body -->
                    <div class="p-5 space-y-4">
                        <!-- Warning banner -->
                        <div v-if="unansweredCount > 0"
                            class="bg-amber-50 border border-amber-100 rounded-xl px-4 py-3 flex gap-2.5 items-start text-sm text-amber-800">
                            <svg class="w-4 h-4 mt-0.5 shrink-0 text-amber-500" fill="none" stroke="currentColor"
                                stroke-width="2" viewBox="0 0 24 24">
                                <circle cx="12" cy="12" r="10" />
                                <path d="M12 8v4m0 4h.01" />
                            </svg>
                            <p>You still have <strong class="font-medium">{{ unansweredCount }} unanswered
                                    {{ unansweredCount === 1 ? 'question' : 'questions' }}</strong>. Please review
                                before submitting.</p>
                        </div>

                        <!-- Stats -->
                        <div class="grid grid-cols-2 gap-2">
                            <div class="bg-blue-50 border border-blue-100 rounded-xl p-3 text-center">
                                <p class="text-[11px] font-medium text-blue-500 uppercase tracking-wider mb-1">Answered
                                </p>
                                <p class="text-xl font-semibold text-blue-800">{{ answeredCount }}/{{ totalQuestions }}
                                </p>
                            </div>
                            <div class="rounded-xl p-3 text-center border" :class="unansweredCount > 0
                                ? 'bg-amber-50 border-amber-100'
                                : 'bg-green-50 border-green-100'">
                                <p class="text-[11px] font-medium uppercase tracking-wider mb-1"
                                    :class="unansweredCount > 0 ? 'text-amber-500' : 'text-green-500'">
                                    {{ unansweredCount > 0 ? 'Unanswered' : 'Status' }}
                                </p>
                                <p class="text-xl font-semibold"
                                    :class="unansweredCount > 0 ? 'text-amber-800' : 'text-green-800'">
                                    {{ unansweredCount > 0 ? unansweredCount : '✓' }}
                                </p>
                            </div>
                        </div>
                    </div>

                    <!-- Footer -->
                    <div class="px-5 pb-5 flex gap-2">
                        <button @click="handleClose"
                            class="flex-1 py-2.5 rounded-xl border border-gray-200 text-gray-500 text-sm font-medium hover:bg-gray-50 transition-colors">
                            Cancel
                        </button>
                        <button :disabled="unansweredCount > 0" @click="handleConfirm"
                            class="flex-[2] py-2.5 rounded-xl text-sm font-medium transition-colors flex items-center justify-center gap-1.5"
                            :class="unansweredCount > 0
                                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                : 'bg-blue-600 hover:bg-blue-700 text-white'">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14m-7-7 7 7-7 7" />
                            </svg>
                            Submit quiz
                        </button>
                    </div>

                </div>
            </transition>
        </div>
    </transition>
</template>

<style scoped>
.modal-enter-active,
.modal-leave-active {
    transition: opacity 0.25s ease;
}

.modal-enter-from,
.modal-leave-to {
    opacity: 0;
}

.modal-scale-enter-active,
.modal-scale-leave-active {
    transition: transform 0.25s ease, opacity 0.25s ease;
}

.modal-scale-enter-from,
.modal-scale-leave-to {
    transform: scale(0.96);
    opacity: 0;
}
</style>