<template>
    <div class="container">
        <div class="sidebar">
            <UserProfile :userProfile="user" />
        </div>
        <div class="main-content">
            <TweetFeed />
            <UserList />
        </div>
        <div v-if="isLoading" class="loading">Carregando...</div>
        <div v-if="errorMessage" class="error">{{ errorMessage }}</div>
    </div>
</template>

<script>
import UserProfile from '@/components/userProfile.vue';
import TweetFeed from '@/components/tweetFeed.vue';
import UserList from '@/components/userList.vue';
import { mapActions, mapState } from 'vuex';

export default {
    name: 'UserDashboard',
    components: {
        UserProfile,
        TweetFeed,
        UserList,
    },
    computed: {
        ...mapState(['user', 'isLoading', 'errorMessage']),
    },
    async created() {
        // Verifica se o usuário está autenticado antes de carregar o perfil
        if (!this.isAuthenticated) {
            this.$router.push('/login');
        } else {
            await this.fetchUserProfile();
        }
    },
    methods: {
        ...mapActions(['fetchUser', 'logout']),
        async fetchUserProfile() {
            try {
                await this.fetchUser();
            } catch {
                this.errorMessage =
                    'Erro ao carregar perfil. Faça login novamente.';
                this.logout(); // Limpa o estado de autenticação
                this.$router.push('/login'); // Redireciona para o login
            }
        },
    },
};
</script>

<style scoped>
.container {
    display: flex;
    height: 100vh;
}
.sidebar {
    width: 20%;
    background-color: #f5f5f5;
    padding: 20px;
}
.main-content {
    width: 80%;
    padding: 20px;
}
.loading {
    text-align: center;
    margin-top: 20px;
}
.error {
    color: red;
    margin-top: 20px;
}
</style>
