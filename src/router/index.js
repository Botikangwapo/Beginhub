import { createRouter, createWebHistory } from "vue-router";
import { supabase } from "../supabase/supabase.js";

// main pages
import Home from "../views/Home.vue";

// views
import Userform from "../views/userform.vue";
import Registerform from "../views/registerform.vue";
import Verification from "../views/Verification.vue";
import CongratsView from "../views/CongratsView.vue";

// main
import Userdashboard from "../mainlayout/userdashboard.vue";

// Userpages
import quizes from "../views/userdashboard/quizes.vue";
import Dash from "../views/userdashboard/dash.vue";
import Quizes from "../views/userdashboard/quizes.vue";
import Certification from "../views/userdashboard/certification.vue";
import Leaderboard from "../views/userdashboard/Leaderboard.vue";
import Settings from "../views/userdashboard/settings.vue";
import Topup from "../views/userdashboard/topup.vue";
import Quizone from "../views/userdashboard/quizeses/quizone.vue";
import { myCredits } from "../store/store.js";

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/login',
        name: 'Userform',
        component: Userform
    },
    {
        path: '/register',
        name: 'register',
        component: Registerform
    },
    {
        path: '/Verification',
        name: 'Verification',
        component: Verification
    },
    {
        path: '/maindash',
        name: 'Userdashboard',
        component: Userdashboard,
        meta: { requiresAuth: true },
        redirect: '/Dash',
        children: [
            {
                path: '/Dash',
                name: 'Dash',
                component: Dash
            },
            {
                path: '/Quiz',
                name: 'Quiz',
                component: Quizes
            },
            {
                path: '/quiz/:id', // Ang :id ay magiging variable na mababasa sa QuizOne.vue
                name: 'quiz-engine',
                component: Quizone
            },
            {
                path: '/cert',
                name: 'cert',
                component: Certification
            },
            {
                path: '/CongratsView',
                name: 'CongratsView',
                component: CongratsView
            },
            {
                path: '/board',
                name: 'board',
                component: Leaderboard
            },
            {
                path: '/Setting',
                name: 'Setting',
                component: Settings
            },
            {
                path: '/Topup',
                name: 'Topup',
                component: Topup
            }
        ]
    }
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})

// Navigation guard to check for authentication before accessing certain routes
router.beforeEach(async (to, from, next) => {
    const { data: { session } } = await supabase.auth.getSession()
    const isAuthenticated = !!session

    if (to.meta.requiresAuth && !isAuthenticated) {
        next('/login')
    } else if ((to.name === 'login') && isAuthenticated) {
        next('/maindash')
    } else {
        next()
    }
})

export default router
