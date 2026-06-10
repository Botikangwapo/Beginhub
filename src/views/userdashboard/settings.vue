<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from '../../supabase/supabase.js'
import { useRouter } from 'vue-router'
import { getAuthUser } from '../../services/authuserservices.js'


const fname = ref('Loading...')
const lname = ref('')
const email = ref('')
const avatarUrl = ref('') // Bagong lagayan ng image URL

onMounted(async () => {
    const user = await getAuthUser();
    if (!user) return;

    if (user) {
        email.value = user.email

        // 1. Isinama natin ang 'avatar_url' sa iyong select statement
        const { data: profile, error: profileError } = await supabase
            .from('profiles')
            .select('first_name, last_name, avatar_url')
            .eq('id', user.id)
            .single()

        if (profile && !profileError) {
            fname.value = profile.first_name
            lname.value = profile.last_name

            avatarUrl.value = profile.avatar_url ||
                user.user_metadata?.avatar_url ||
                `https://ui-avatars.com/api/?name=${profile.first_name}+${profile.last_name}&background=2563eb&color=fff&bold=true`
        } else {
            console.error("Walang nahanap na profile sa database:", profileError)
            fname.value = 'Bossing'

            avatarUrl.value = user.user_metadata?.avatar_url || `https://ui-avatars.com/api/?name=Bossing&background=2563eb&color=fff&bold=true`
        }
    }

    if (authError || !user) {
        console.error('Hindi mahanap ang logged-in user:', authError?.message);
    } else {
        console.log('Email ng naka-sign in:', user.email);
    }
})
</script>


<template>
    <div class="p-6 w-full space-y-6 overflow-y-auto h-screen bg-blue-50/20 font-sans antialiased">

        <div class="2xl:pt-0 pt-14 border-b border-blue-50 pb-5">
            <div class="flex items-center gap-2">
                <span
                    class="bg-blue-600 text-white text-[9px] font-black px-1.5 py-0.5 rounded uppercase tracking-wider">Control.Panel</span>
                <h1 class="text-2xl font-black text-blue-900 tracking-tight uppercase">Settings</h1>
            </div>
            <p class="text-xs text-gray-700/70 mt-1">Manage your enterprise platform profile information and display
                preferences.</p>
        </div>

        <section
            class="bg-white rounded-2xl border border-gray-100 shadow-lg shadow-gray-300/20 overflow-hidden grid grid-cols-1 md:grid-cols-12 min-h-[500px]">

            <div class="md:col-span-3 bg-blue-50/20 p-4 border-r border-blue-100 flex flex-col space-y-1">
                <div
                    class="w-full text-left px-3 py-2.5 rounded-xl text-xs font-black bg-blue-600 text-white shadow-sm shadow-blue-600/10 uppercase tracking-wider">
                    My Profile
                </div>
            </div>

            <div class="md:col-span-9 p-6 space-y-6">

                <div>
                    <h3
                        class="text-sm font-black text-blue-950 uppercase tracking-wider mb-4 border-b border-gray-50 pb-2">
                        Public Profile System
                    </h3>

                    <div class="flex items-center space-x-4 mb-6">
                        <img :src="avatarUrl" alt="User Avatar"
                            class="w-16 h-16 rounded-xl object-cover shadow-md shadow-blue-600/20 border border-blue-400" />
                        <div class="space-y-1">
                            <button
                                class="bg-white border border-gray-200 text-blue-600 px-3 py-1.5 rounded-xl text-xs font-black hover:bg-blue-50 transition-colors uppercase tracking-wider shadow-sm">
                                Change Avatar
                            </button>
                            <p class="text-blue-400 font-medium text-[10px] uppercase tracking-wider">JPG or PNG. Max
                                configuration payload of 800K</p>
                        </div>
                    </div>

                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div class="space-y-1.5">
                            <label class="text-[10px] font-black text-blue-400 uppercase tracking-widest">Full Name
                                Account</label>
                            <div type="text"
                                class="w-full px-3.5 py-2.5 bg-blue-50/40 border border-gray-100 rounded-xl text-xs text-blue-950 font-semibold focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/10 transition-all">
                                {{ fname }} {{ lname }}
                            </div>
                        </div>

                        <div class="space-y-1.5">
                            <label class="text-[10px] font-black text-blue-400 uppercase tracking-widest">Email Address
                                Node</label>
                            <div type="email" value="" disabled
                                class="w-full px-3.5 py-2.5 bg-blue-50/20 border border-gray-100/50 rounded-xl text-xs text-blue-400 font-semibold font-mono cursor-not-allowed select-none">
                                {{ email }}
                            </div>
                        </div>
                    </div>
                </div>

                <hr class="border-blue-50" />

                <div>
                    <h3
                        class="text-sm font-black text-blue-950 uppercase tracking-wider mb-4 border-b border-blue-50 pb-2">
                        System Preferences
                    </h3>

                    <div class="space-y-4">
                        <div
                            class="flex justify-between items-center bg-blue-50/10 border border-blue-50/40 p-3 rounded-xl">
                            <div>
                                <p class="text-xs font-black text-blue-950 uppercase tracking-tight">Public Leaderboard
                                    Visibility</p>
                                <p class="text-[11px] text-gray-700/60 font-medium mt-0.5">Allow other platform core
                                    engines to view your user rank and quiz scores.</p>
                            </div>
                            <label class="relative inline-flex items-center cursor-pointer select-none">
                                <input type="checkbox" checked class="sr-only peer">
                                <div
                                    class="w-9 h-5 bg-blue-100 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-blue-200 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600">
                                </div>
                            </label>
                        </div>

                        <div
                            class="flex justify-between items-center bg-blue-50/10 border border-blue-50/40 p-3 rounded-xl">
                            <div>
                                <p class="text-xs font-black text-blue-950 uppercase tracking-tight">Email Marketing
                                    Notifications</p>
                                <p class="text-[11px] text-gray-700/60 font-medium mt-0.5">Receive production system
                                    weekly digests, special events, and new system data tracking.</p>
                            </div>
                            <label class="relative inline-flex items-center cursor-pointer select-none">
                                <input type="checkbox" class="sr-only peer">
                                <div
                                    class="w-9 h-5 bg-blue-100 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-blue-200 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600">
                                </div>
                            </label>
                        </div>
                    </div>
                </div>

                <hr class="border-blue-50" />

                <div class="flex justify-end space-x-3 pt-2">
                    <button
                        class="px-4 py-2 text-xs font-black text-blue-400 hover:text-blue-600 transition-colors uppercase tracking-wider">
                        Cancel
                    </button>
                    <button
                        class="px-4 py-2 text-xs font-black bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-sm shadow-blue-600/10 transition-colors uppercase tracking-wider">
                        Save_Changes
                    </button>
                </div>

            </div>
        </section>

        <footer
            class="w-full text-center text-[10px] text-blue-400 font-bold pt-4 border-t border-blue-50 tracking-widest mt-auto">
            WHITE & BLUE CONFIGURATION PORTAL // RUN_SETTINGS_VIEW
        </footer>
    </div>
</template>