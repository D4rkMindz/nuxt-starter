import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
const isDEV = process.env.NODE_ENV !== 'production';
const isPROD = process.env.NODE_ENV === 'production';


export default defineNuxtConfig({
    compatibilityDate: '2025-07-15',
    debug: isDEV,
    sourcemap: {
        server: isDEV,
        client: isDEV,
    },
    devtools: {enabled: true},
    modules: [
        '@nuxt/eslint',
        '@nuxtjs/i18n',
        'motion-v/nuxt',
        'nuxt-gtag',
        'nuxt-auth-utils',
        '@nuxt/icon',
    ],
    css: ['~/assets/css/main.css'],
    vite: {
        plugins: [tailwindcss()],
    },
    app: {
        head: {
            viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
            charset: 'utf-8',
        }
    },
    gtag: {
        enabled: isPROD,
        id: process.env.G_TAG_ID,
    },
    runtimeConfig: {
        public: {
            publicRoutes: [
                '/auth/login', '/login',
                '/auth/register', '/register',
                // nuxt-auth-utils
                '/api/_auth/session',
                '/__nuxt_error*',
            ],
        },
        mongoose: {
            uri: `mongodb://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_HOST}:27017/${process.env.MONGODB_DATABASE}?authSource=admin`,
            modelsDir: 'models',
            devtools: isDEV,
            options: {},
        },
        publicRoutes: [
            '/auth/login', '/login',
            '/auth/register', '/register',
            '/access/[token]',
            // nuxt-auth-utils
            '/api/_auth/session',
        ],
        homeassistant: {
            token: process.env.HA_TOKEN,
            url: process.env.HA_URL,
        }
    },
    i18n: {
        locales: [
            {
                code: 'en',
                name: 'English',
                file: 'en.json',
            },
            {
                code: 'de',
                name: 'Deutsch',
                file: 'de.json',
            },
        ],
        // lazy: true,
        langDir: 'locales',
        defaultLocale: 'en',
    },
    nitro: {
        experimental: {
            tasks: true
        }
    }
})