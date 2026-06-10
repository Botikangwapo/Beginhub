<template>
    <transition name="slide-down">
        <div v-if="open"
            class="gap-2 flex 2xl:hidden bg-white p-3 top-15 absolute left-0 w-full rounded-bl-lg rounded-br-lg">
            <div class="w-full sm:flex grid gap-2 items-center">
                <a href="#home" @click="emit('close')"
                    class="p-3 text-sm text-gray-600 font-light hover:text-blue-500 transition-colors duration-200 ansition-all after:duration-300 ">Home
                </a>
                <a href="#category" @click="('close')"
                    class="p-3 text-sm text-gray-600 font-light hover:text-blue-500 transition-colors duration-200 ansition-all after:duration-300">Category
                    Filter
                </a>
                <a href="#resources" @click="emit('close')"
                    class="p-3 text-sm text-gray-600 font-light hover:text-blue-500 transition-colors duration-200 ansition-all after:duration-300 ">ResourcesList
                </a>
                <a href="#choose" @click="emit('close')"
                    class="p-3 text-sm text-gray-600 font-light hover:text-blue-500 transition-colors duration-200 ansition-all after:duration-300 ">Start
                    Quiz
                </a>
                <div class="grid sm:w-auto w-full gap-3 sm:flex">
                    <router-link to="/Login" @click="emit('close')"
                        class="sm:px-4 sm:py-2 px-0 py-3 text-sm rounded-lg font-light bg-white text-gray-900 sm:w-auto w-full text-center items-center flex justify-center">Login
                    </router-link>
                    <router-link to="/register" @click="emit('close')"
                        class="text-white sm:px-4 sm:py-2 px-0 py-3 text-sm rounded-lg font-light bg-blue-600 hover:bg-blue-500 w-full items-center flex justify-center">Get
                        started
                    </router-link>
                </div>
            </div>
        </div>
    </transition>
</template>

<script setup>
const props = defineProps({ open: Boolean })
const emit = defineEmits(['close'])

const handleNav = (event, href) => {
    emit('close'); // Close the menu

    // Kung internal anchor link (nagsta-start sa #)
    if (href.startsWith('#')) {
        const target = document.querySelector(href);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    }
}
</script>

<style scoped>
.slide-down-enter-from,
.slide-down-leave-to {
    transform: translateY(-10px);
    opacity: 0;
}

.slide-down-enter-to,
.slide-down-leave-from {
    transform: translateY(0);
    opacity: 1;
}

.slide-down-enter-active,
.slide-down-leave-active {
    transition: transform 180ms ease-out, opacity 180ms ease-out;
}
</style>