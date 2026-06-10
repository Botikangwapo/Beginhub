<template>
    <section id="resources" class="bg-blue-50/20 text-blue-950 overflow-hidden 2xl:py-30 py-16 px-4 sm:px-6">
        <div class="mx-auto max-w-7xl">
            <div class="text-center mb-16">
                <p class="text-[10px] font-black uppercase tracking-[0.3em] text-blue-600">Quiz_Mastery_Engine</p>
                <h2 class="mt-4 text-4xl sm:text-5xl font-black tracking-tighter uppercase">Resources for certification
                </h2>
                <p class="mt-4 text-sm font-bold text-gray-400 max-w-2xl mx-auto uppercase tracking-wider">Practice
                    topics, track success, and generate professional certification summaries.</p>
            </div>

            <div class="grid gap-6 lg:grid-cols-2">
                <div class="rounded-[2rem] bg-white p-8 border border-gray-100 shadow-sm shadow-gray-300/50">
                    <div
                        class="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 text-white font-black">
                        1</div>
                    <h3 class="mt-6 text-2xl font-black uppercase tracking-tight">Guided study paths</h3>
                    <p class="mt-4 text-xs font-bold text-gray-400 leading-relaxed uppercase tracking-wider">Review key
                        concepts and take practice questions that mirror real quiz conditions.</p>

                    <div class="mt-8 rounded-3xl bg-blue-50/50 p-6 border border-blue-100">
                        <div class="text-[10px] font-black text-blue-900 uppercase tracking-[0.25em]">Focus_Areas</div>
                        <div class="mt-4 grid gap-3 text-[11px] font-bold text-blue-900 uppercase tracking-widest">
                            <div class="rounded-xl bg-white border border-blue-100 p-4">Core Concepts Review</div>
                            <div class="rounded-xl bg-white border border-blue-100 p-4">Interactive Challenges</div>
                            <div class="rounded-xl bg-white border border-blue-100 p-4">Instant Performance Tips</div>
                        </div>
                    </div>

                    <main
                        class="text-center flex flex-col gap-4 items-center w-full p-8 mt-8 rounded-[2rem] text-white bg-blue-950 border border-blue-900">
                        <p class="text-[10px] font-black uppercase tracking-[0.3em] text-blue-400">Engine_Advantage</p>
                        <h1 class="text-2xl font-black uppercase tracking-tight">Why choose this path?</h1>
                        <p class="text-xs font-bold text-blue-200 leading-relaxed uppercase tracking-wider">Follow a
                            journey that turns study time into quiz confidence. Practice smart, improve fast.</p>
                        <router-link to="/register"
                            class="w-full text-center text-xs font-black p-4 rounded-xl bg-blue-600 text-white hover:bg-blue-500 transition-all uppercase tracking-widest">
                            START_QUIZ_JOURNEY
                        </router-link>
                    </main>
                </div>

                <div class="grid gap-6">
                    <div class="rounded-[2rem] bg-white p-8 border border-gray-100 shadow-sm shadow-gray-300/50">
                        <div
                            class="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-600 text-white font-black">
                            2</div>
                        <h3 class="mt-5 text-2xl font-black uppercase tracking-tight">Smart badges</h3>
                        <p class="mt-4 text-xs font-bold text-gray-400 leading-relaxed uppercase tracking-wider">Every
                            completion earns you a badge. The dashboard highlights your strengths and next best topics.
                        </p>
                        <div class="mt-6 grid gap-3 text-[10px] font-black text-blue-900 uppercase tracking-widest">
                            <div class="rounded-xl bg-blue-50 p-4">Score review post-quiz</div>
                            <div class="rounded-xl bg-blue-50 p-4">Personalized improvement logic</div>
                            <div class="rounded-xl bg-blue-50 p-4">Certification readiness milestones</div>
                        </div>
                    </div>

                    <div class="rounded-[2rem] bg-white p-8 border border-gray-100 shadow-sm shadow-gray-300/50">
                        <div
                            class="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500 text-white font-black">
                            3</div>
                        <h3 class="mt-5 text-2xl font-black uppercase tracking-tight">Instant certification</h3>
                        <p class="mt-4 text-xs font-bold text-gray-400 leading-relaxed uppercase tracking-wider">
                            Complete a module and get a professional summary to share with peers or employers.</p>
                        <div class="mt-6 rounded-3xl bg-blue-50/50 p-6 border border-blue-100">
                            <div class="text-[10px] font-black text-blue-900 uppercase tracking-widest">Preview</div>
                            <div class="mt-4 rounded-xl bg-white border border-blue-100 p-5 text-blue-900">
                                <p class="font-black text-xs uppercase tracking-widest">Quiz Mastery Certificate</p>
                                <p class="mt-2 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Awarded
                                    after passing with top skills in web fundamentals.</p>
                                <p class="mt-4 text-lg font-black text-blue-600 tracking-widest">CERT-2026-QUIZ</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>