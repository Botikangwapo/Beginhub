<script setup>
import Sidebar from '../components/sidebar.vue';
</script>

<template>
    <div class="min-h-screen w-full bg-gray-300/20 flex flex-col md:flex-row font-sans overflow-y-hidden">
        <Sidebar />
        <div class="flex-1 h-screen overflow-y-auto">
            <router-view />

        </div>
    </div>
</template>