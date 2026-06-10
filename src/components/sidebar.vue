<script setup>
import { ref, onMounted } from 'vue';
import { supabase } from '../supabase/supabase.js';
import { getAuthUser } from '../services/authuserservices.js';
import { logoutUser } from '../services/authuserservices.js';
import { useRouter } from 'vue-router';
import { fetchCredits, myCredits } from '../store/store.js'; // Assuming ito lang ang external dependency mo

const router = useRouter();
const Isloading = ref(false);
const isOpen = ref(false);

// Local states para sa user info
const userProfile = ref({
    first_name: '',
    last_name: '',
    avatar_url: ''
});
const userEmail = ref('');

const toggleSidebar = () => { isOpen.value = !isOpen.value };

const fetchProfile = async () => {
    const user = await getAuthUser();
    if (!user) return;

    userEmail.value = user.email;

    // Diretso fetch sa Supabase
    const { data } = await supabase
        .from('profiles')
        .select('first_name, last_name, avatar_url')
        .eq('id', user.id)
        .single();

    if (data) {
        userProfile.value = {
            ...data,
            avatar_url: data.avatar_url || `https://ui-avatars.com/api/?name=${data.first_name}+${data.last_name}&background=2563eb&color=fff&bold=true`
        };
    }
};

const handleLogout = async () => {
    Isloading.value = true;
    const result = await logoutUser();
    if (result.success) {
        router.push('/');
    } else {
        alert("Hindi makapag-logout: " + result.error);
        Isloading.value = false;
    }
}

onMounted(async () => {
    await fetchCredits();
    await fetchProfile(); // Fresh fetch kada load ng page/sidebar
});
</script>


<template>
    <header
        class="md:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-100 flex items-center justify-between 2xl:px-6 px-4 z-50 shadow-xs">
        <router-link to="/" class="text-xl font-black text-blue-900 tracking-tight">Begin<span
                class="text-blue-600 tracking-tight">Hub</span></router-link>
        <button @click="toggleSidebar"
            class="p-2.5 text-gray-600 bg-gray-100 hover:bg-gray-100 rounded-xl transition focus:outline-none"
            aria-label="Toggle Menu">
            <svg v-if="!isOpen" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                class="lucide lucide-menu">
                <line x1="4" x2="20" y1="12" y2="12" />
                <line x1="4" x2="20" y1="6" y2="6" />
                <line x1="4" x2="20" y1="18" y2="18" />
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                class="lucide lucide-x">
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
            </svg>
        </button>
    </header>

    <div v-if="isOpen" @click="isOpen = false"
        class="md:hidden fixed top-16 inset-0 bg-black/40 z-40 transition-opacity"></div>

    <aside :class="[
        'fixed md:sticky top-16 md:top-0 h-[calc(100vh-64px)] md:h-screen w-80 bg-white shadow-xl  md:shadow-md flex flex-col justify-between p-4 gap-5 z-40 transition-transform duration-300 ease-in-out',
        isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
    ]">
        <div class="flex flex-col gap-4 overflow-y-auto">
            <div class="hidden md:flex items-center justify-between border-b border-gray-200 pb-3">
                <router-link to="/" class="text-xl font-black text-blue-900">Begin<span
                        class="text-blue-600">Hub</span></router-link>
                <div
                    class="bg-blue-50 text-xs font-black text-blue-600 shadow-sm shadow-blue-50 border border-blue-100 w-20 flex items-center justify-center rounded-2xl">
                    V.12
                </div>
            </div>
            <nav class="flex flex-col gap-1.5 mt-2 md:mt-0">
                <router-link to="/Dash" @click="isOpen = false"
                    class="flex items-center gap-3 p-3 text-gray-600 hover:bg-blue-50 rounded-xl transition"
                    active-class="bg-blue-700 text-white hover:bg-blue-700">
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                        class="lucide lucide-layout-dashboard">
                        <rect width="7" height="9" x="3" y="3" rx="1" />
                        <rect width="7" height="5" x="14" y="3" rx="1" />
                        <rect width="7" height="9" x="14" y="12" rx="1" />
                        <rect width="7" height="5" x="3" y="16" rx="1" />
                    </svg>
                    <span class="text-sm font-black ">Dashboard</span>
                </router-link>
                <router-link to="/Quiz" @click="isOpen = false"
                    class="flex items-center gap-3 p-3 text-gray-600 hover:bg-blue-50 rounded-xl transition"
                    active-class="bg-blue-700 text-white font-semibold hover:bg-blue-700">
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                        class="lucide lucide-list-todo">
                        <path d="M13 5h8" />
                        <path d="M13 12h8" />
                        <path d="M13 19h8" />
                        <path d="m3 17 2 2 4-4" />
                        <rect x="3" y="4" width="6" height="6" rx="1" />
                    </svg>
                    <span class="text-sm font-black">Quizzes</span>
                </router-link>

                <router-link to="/board" @click="isOpen = false"
                    class="flex items-center gap-3 p-3 text-gray-600 hover:bg-blue-50 rounded-xl transition"
                    active-class="bg-blue-700 text-white font-semibold hover:bg-blue-700">
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                        class="lucide lucide-trophy">
                        <path d="M10 14.66v1.626a2 2 0 0 1-.976 1.696A5 5 0 0 0 7 21.978" />
                        <path d="M14 14.66v1.626a2 2 0 0 0 .976 1.696A5 5 0 0 1 17 21.978" />
                        <path d="M18 9h1.5a1 1 0 0 0 0-5H18" />
                        <path d="M4 22h16" />
                        <path d="M6 9a6 6 0 0 0 12 0V3a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1z" />
                        <path d="M6 9H4.5a1 1 0 0 1 0-5H6" />
                    </svg>
                    <span class="text-sm font-black">Leaderboards</span>
                </router-link>

                <router-link to="/cert" @click="isOpen = false"
                    class="flex items-center gap-3 p-3 text-gray-600 hover:bg-blue-50 rounded-xl transition"
                    active-class="bg-blue-700 text-white font-semibold hover:bg-blue-700">
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                        class="lucide lucide-shield-check">
                        <path
                            d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
                        <path d="m9 12 2 2 4-4" />
                    </svg>
                    <span class="text-sm font-black">Certification</span>
                </router-link>

                <router-link to="/Setting" @click="isOpen = false"
                    class="flex items-center gap-3 p-3 text-gray-600 hover:bg-blue-50 rounded-xl transition"
                    active-class="bg-blue-700 text-white font-semibold hover:bg-blue-700">
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                        class="lucide lucide-settings">
                        <path
                            d="M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 0 9.671 4.136" />
                        <circle cx="12" cy="12" r="3" />
                    </svg>
                    <span class="text-sm font-black">Settings</span>
                </router-link>

                <!-- Token Display Link -->
                <router-link to="/Topup" @click="isOpen = false"
                    class="p-3 bg-blue-100 flex justify-between items-center rounded-xl shadow-xs mt-3 border border-blue-100">
                    <div class="flex items-center gap-2 text-gray-600">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                            class="lucide lucide-credit-card">
                            <rect width="20" height="14" x="2" y="5" rx="2" />
                            <line x1="2" x2="22" y1="10" y2="10" />
                        </svg>
                        <span class="text-sm font-black">Top up credits</span>
                    </div>
                    <div
                        class="flex items-center gap-1.5 px-2 py-1 bg-white rounded-lg border border-blue-200/60 shadow-2xs">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                            class="lucide lucide-puzzle text-blue-300">
                            <path
                                d="M15.39 4.39a1 1 0 0 0 1.68-.474 2.5 2.5 0 1 1 3.014 3.015 1 1 0 0 0-.474 1.68l1.683 1.682a2.414 2.414 0 0 1 0 3.414L19.61 15.39a1 1 0 0 1-1.68-.474 2.5 2.5 0 1 0-3.014 3.015 1 1 0 0 1 .474 1.68l-1.683 1.682a2.414 2.414 0 0 1-3.414 0L8.61 19.61a1 1 0 0 0-1.68.474 2.5 2.5 0 1 1-3.014-3.015 1 1 0 0 0 .474-1.68l-1.683-1.682a2.414 2.414 0 0 1 0-3.414L4.39 8.61a1 1 0 0 1 1.68.474 2.5 2.5 0 1 0 3.014-3.015 1 1 0 0 1-.474-1.68l1.683-1.682a2.414 2.414 0 0 1 3.414 0z" />
                        </svg>
                        <span class="text-xs font-black text-gray-500">{{ myCredits }}</span>
                    </div>
                </router-link>
            </nav>
        </div>

        <!-- Sidebar Footer Info & Action -->
        <div class="pt-4 border-t border-gray-100">
            <div class="flex gap-3 items-center">
                <img class="w-10 h-10 rounded-full border border-gray-100 object-cover" :src="userProfile.avatar_url"
                    alt="User Avatar">
                <div class="grid min-w-0">
                    <span class="font-black text-blue-900 text-sm truncate">{{ userProfile.first_name }} {{
                        userProfile.last_name }}</span>
                    <span class="text-xs text-gray-700/70 truncate">{{ userEmail }}</span>
                </div>
            </div>
            <button @click.prevent="handleLogout"
                class="w-full flex items-center justify-center gap-2 p-3 mt-4 bg-blue-700 text-white font-semibold rounded-xl hover:bg-blue-600 transition cursor-pointer text-sm shadow-2xs">
                {{ Isloading ? 'Signout..' : 'Logout' }}
            </button>
        </div>
    </aside>
</template>
