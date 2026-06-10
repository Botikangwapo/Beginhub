<template>
    <div class="divide-y divide-gray-100 animate-pulse">
        <div
            class="p-4 bg-gray-50 border-b border-gray-100 grid grid-cols-12 text-xs font-semibold text-gray-400 uppercase tracking-wider">
            <div class="col-span-2 text-center">Rank</div>
            <div class="col-span-6">User</div>
            <div class="col-span-2 text-right">Quizzes</div>
            <div class="col-span-2 text-right">Total Score</div>
        </div>

        <div class="grid grid-cols-12 items-center p-4 bg-white">
            <div class="col-span-2 flex justify-center">
                <div class="h-4 w-4 bg-gray-200 rounded"></div>
            </div>
            <div class="col-span-6 flex items-center space-x-3">
                <div class="w-8 h-8 rounded-full bg-gray-200"></div>
                <div class="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
            <div class="col-span-2 flex justify-end">
                <div class="h-4 w-6 bg-gray-200 rounded"></div>
            </div>
            <div class="col-span-2 flex justify-end">
                <div class="h-4 w-12 bg-gray-200 rounded"></div>
            </div>
        </div>

        <div class="grid grid-cols-12 items-center p-4 bg-white">
            <div class="col-span-2 flex justify-center">
                <div class="h-4 w-4 bg-gray-200 rounded"></div>
            </div>
            <div class="col-span-6 flex items-center space-x-3">
                <div class="w-8 h-8 rounded-full bg-gray-200"></div>
                <div class="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
            <div class="col-span-2 flex justify-end">
                <div class="h-4 w-6 bg-gray-200 rounded"></div>
            </div>
            <div class="col-span-2 flex justify-end">
                <div class="h-4 w-12 bg-gray-200 rounded"></div>
            </div>
        </div>
    </div>
</template>