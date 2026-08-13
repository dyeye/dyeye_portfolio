// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
    site: 'https://dyeye.github.io',
    base: '/dyeye_portfolio/',
    output: 'static',
    i18n: {
        locales: ['en', 'es'],
        defaultLocale: 'en',
        routing: {
            prefixDefaultLocale: false
        }
    },
    integrations: [
        sitemap({
            i18n: {
                defaultLocale: 'en',
                locales: {
                    en: 'en',
                    es: 'es'
                }
            }
        })
    ]
});
