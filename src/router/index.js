import { createRouter, createWebHistory } from 'vue-router';
import store from '../store.js';
import LoginForm from '../views/loginForm.vue';
import SignUpForm from '../views/signUpForm.vue';
import UserDashboard from '../views/userDashboard.vue';

// Definindo as rotas
const routes = [
    {
        path: '/',
        redirect: '/login',
    },
    {
        path: '/login',
        name: 'Login',
        component: LoginForm,
    },
    {
        path: '/register',
        name: 'Register',
        component: SignUpForm,
    },
    {
        path: '/dashboard',
        name: 'UserDashboard',
        component: UserDashboard,
        meta: { requiresAuth: true },
    },
];

// Criando a instância do roteador
const router = createRouter({
    history: createWebHistory(),
    routes,
});

// Middleware de verificação de autenticação antes de cada navegação
router.beforeEach(async (to, from, next) => {
    const isAuthenticated = store.getters.isAuthenticated;

    if (to.meta.requiresAuth && !isAuthenticated) {
        // Se a rota exige autenticação e o usuário não está autenticado, redireciona para login
        console.log('Usuário não autenticado. Redirecionando para login.');
        next('/login');
    } else if (
        isAuthenticated &&
        (to.path === '/login' || to.path === '/register')
    ) {
        // Se o usuário já está autenticado e tenta acessar login ou registro, redireciona para dashboard
        console.log('Usuário já autenticado. Redirecionando para dashboard.');
        next('/dashboard');
    } else {
        // Prossegue para a rota desejada
        next();
    }
});

export default router;
