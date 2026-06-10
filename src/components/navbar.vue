<script setup>
import Navigation from '../components/navigation.vue';
import { ref, onMounted } from 'vue'
import { supabase } from '../supabase/supabase.js'

const isAuthenticated = ref(false)

const props = defineProps(['showNav']);
const emit = defineEmits(['update:showNav']);

const toggleSidebar = () => {
    emit('update:showNav', !props.showNav); // 'update:showNav' ang event name
}

onMounted(async () => {
    const { data: { session } } = await supabase.auth.getSession()

    // kinukuha or tinitignan kung meron bang session
    isAuthenticated.value = !!session

    // kahit ereload mo boss dimababago
    supabase.auth.onAuthStateChange((_event, session) => {
        isAuthenticated.value = !!session
    })
})
</script>

<template>
    <header
        class="w-full flex items-center justify-center p-4 fixed z-50 top-0 border-b border-gray-200 bg-white/90 backdrop-blur-sm">
        <div class="flex justify-between items-center max-w-7xl w-full relative">
            <div class="text-xl font-black flex text-blue-950 tracking-tight">Begin <span
                    class="text-blue-700">Hub</span>
            </div>
            <div class="flex gap-2 items-center">
                <div class="gap-2 flex ">
                    <div class="w-full hidden sm:flex items-center">
                        <a href="#home"
                            class="pr-5 text-sm text-gray-600 font-light hover:text-blue-500 transition-colors duration-200 ansition-all after:duration-300 ">Home
                        </a>
                        <a href="#category"
                            class="pr-5 text-sm text-gray-600 font-light hover:text-blue-500 transition-colors duration-200 ansition-all after:duration-300">Category
                            Filter
                        </a>
                        <a href="#resources"
                            class="pr-5 text-sm text-gray-600 font-light hover:text-blue-500 transition-colors duration-200 ansition-all after:duration-300 ">ResourcesList
                        </a>
                        <a href="#choose"
                            class="pr-5 text-sm text-gray-600 font-light hover:text-blue-500 transition-colors duration-200 ansition-all after:duration-300 ">Start
                            Quiz
                        </a>
                        <div class="grid sm:w-auto w-full gap-3 sm:flex">
                            <router-link to="/login"
                                class="sm:px-4 sm:py-2 px-0 py-3 text-sm rounded-lg font-light bg-gray-100 shadow-sm text-gray-900 sm:w-auto w-full text-center items-center flex justify-center">Login
                            </router-link>
                            <router-link :to="isAuthenticated ? '/maindash' : '/register'"
                                class="text-white sm:px-4 sm:py-2 px-0 py-3 text-sm rounded-lg font-light bg-blue-600 hover:bg-blue-500 w-full items-center flex justify-center">
                                {{ isAuthenticated ? 'Dashboard' : 'Get started' }} </router-link>
                        </div>
                    </div>
                </div>
                <div class="sm:hidden flex" @click="toggleSidebar">
                    <svg v-if="showNav" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                        fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                        stroke-linejoin="round" class="lucide lucide-x">
                        <path d="M18 6 6 18" />
                        <path d="m6 6 12 12" />
                    </svg>
                    <svg v-else xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                        fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                        stroke-linejoin="round" class="lucide lucide-menu-icon lucide-menu hum cursor-pointer">
                        <path d="M4 5h16" />
                        <path d="M4 12h16" />
                        <path d="M4 19h16" />
                    </svg>
                </div>
            </div>
        </div>
        <Navigation :open="showNav" @close="showNav = false" />

    </header>
</template>