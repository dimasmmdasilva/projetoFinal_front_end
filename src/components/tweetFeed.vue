<template>
    <div class="tweet-feed">
        <!-- Formulário de criação de tweet -->
        <div class="create-tweet">
            <textarea
                v-model="newTweetContent"
                placeholder="What's happening?"
                rows="3"
            ></textarea>
            <button
                @click="createTweet"
                :disabled="isLoading || !newTweetContent"
            >
                {{ isLoading ? 'Posting...' : 'Tweet' }}
            </button>
        </div>

        <!-- Exibe a lista de tweets -->
        <TweetItem v-for="tweet in tweets" :key="tweet.id" :tweet="tweet" />

        <!-- Mensagens de erro e carregamento -->
        <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
        <p v-if="isLoading && tweets.length === 0">Loading tweets...</p>
    </div>
</template>

<script>
import TweetItem from './tweetItem.vue';
import { mapActions, mapState } from 'vuex';

export default {
    name: 'TweetFeed',
    components: {
        TweetItem,
    },
    data() {
        return {
            newTweetContent: '', // Armazena o conteúdo do novo tweet
        };
    },
    computed: {
        ...mapState({
            tweets: (state) => state.tweets, // Lista de tweets do Vuex
            isLoading: (state) => state.isLoading, // Estado de carregamento do Vuex
            errorMessage: (state) => state.errorMessage, // Mensagem de erro do Vuex
        }),
    },
    async mounted() {
        await this.fetchTweets(); // Carrega os tweets ao montar o componente
    },
    methods: {
        ...mapActions(['fetchTweets', 'createTweet']),
        async createTweet() {
            if (!this.newTweetContent) return;

            try {
                await this.createTweet({ content: this.newTweetContent });
                this.newTweetContent = ''; // Limpa o campo de criação de tweet após postagem
            } catch (error) {
                // O Vuex já gerencia o erro e o estado de carregamento
            }
        },
    },
};
</script>

<style scoped>
.tweet-feed {
    padding: 20px;
    background-color: #f5f5f5;
    border-radius: 8px;
}
.create-tweet {
    margin-bottom: 20px;
}
textarea {
    width: 100%;
    padding: 10px;
    border-radius: 8px;
    margin-bottom: 10px;
    border: 1px solid #ddd;
}
button {
    background-color: #1da1f2;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 8px;
    cursor: pointer;
}
button:disabled {
    background-color: #aaa;
}
.error {
    color: red;
    margin-top: 10px;
}
</style>
