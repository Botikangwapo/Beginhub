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
    <section class="h-screen flex items-start justify-start p-6 flex-col">
        <div class="2xl:pt-0 w-full pt-14 border-b border-blue-50 pb-5">
            <div class="flex items-center gap-2">
                <span
                    class="bg-blue-600 text-white text-[9px] font-black px-1.5 py-0.5 rounded uppercase tracking-wider">Control.Panel</span>
                <h1 class="text-2xl font-black text-blue-900 tracking-tight uppercase">Settings</h1>
            </div>
            <p class="text-xs text-gray-700/70 mt-1">Manage your enterprise platform profile information and display
                preferences.</p>
        </div>
        <div class="2xl:w-200 w-full p-6  bg-white text-gray-900 rounded-lg">

            <section class="mb-8">
                <h2 class="text-lg font-black mb-4 text-blue-950">Profile information</h2>
                <div class="flex items-center gap-6 mb-6">
                    <img :src="avatarUrl"
                        class="w-16 h-16 bg-blue-100 text-blue-700 flex items-center justify-center rounded-lg font-bold text-xl" />


                    <div>
                        <button
                            class="px-4 py-2 border border-gray-200 rounded-xl text-sm hover:bg-gray-100 transition">
                            Change photo
                        </button>
                        <p class="text-xs text-gray-500 mt-2">JPG or PNG, max 800KB</p>
                    </div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label class="block text-sm mb-2">Full name</label>
                        <div type="text" value="Juan Dela Cruz"
                            class="w-full bg-gray-50 border border-gray-200 rounded-xl p-2.5 focus:border-blue-500 outline-none">
                            {{ fname }} {{ lname }}
                        </div>
                    </div>
                    <div>
                        <label class="block text-sm mb-2">Email address</label>
                        <div type="email" value="juan@example.com"
                            class="w-full bg-gray-50 border border-gray-200 rounded-xl p-2.5 focus:border-blue-500 outline-none">
                            {{ email }}
                        </div>
                    </div>
                </div>
            </section>

            <section class="border-t border-gray-700 pt-6">
                <h2 class="text-lg font-semibold mb-4 text-white">Update password</h2>

                <div class="space-y-4">
                    <div>
                        <label class="block text-sm mb-2">Current password</label>
                        <input type="password" placeholder="Enter current password"
                            class="w-full  bg-gray-50 border border-gray-200 rounded-xl p-2.5 focus:border-blue-500 outline-none" />
                    </div>

                    <div>
                        <label class="block text-sm mb-2">New password</label>
                        <input type="password" placeholder="At least 8 characters"
                            class="w-full  bg-gray-50 border border-gray-200 rounded-xl p-2.5 focus:border-blue-500 outline-none" />
                    </div>

                    <div>
                        <label class="block text-sm mb-2">Confirm new password</label>
                        <input type="password" placeholder="Repeat new password"
                            class="w-full  bg-gray-50 border border-gray-200 rounded-xl p-2.5 focus:border-blue-500 outline-none" />
                    </div>
                </div>

                <div class="mt-4 flex gap-2.5 items-end justify-end">
                    <button class="w-40 border border-gray-200 p-2 rounded-xl">
                        cancel
                    </button>
                    <button class="w-40 p-2 rounded-xl text-white bg-blue-600">
                        save
                    </button>
                </div>
            </section>
        </div>
    </section>
</template>
