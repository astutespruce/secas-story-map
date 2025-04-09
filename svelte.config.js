import adapter from '@sveltejs/adapter-static'
import { enhancedImages } from 'mdsvex-enhanced-images'
import { mdsvex } from 'mdsvex'
import rehypeExternalLinks from 'rehype-external-links'
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'


const config = {
    extensions: ['.svelte', '.md'],
    preprocess: [vitePreprocess(),
        mdsvex({
            extensions: ['.md'],
            remarkPlugins: [enhancedImages],
            rehypePlugins: [[rehypeExternalLinks, {target: '_blank'}]]
        }),
    ],

    kit: {
        adapter: adapter({
            pages: 'build',
            assets: 'build',
            fallback: 'index.html',
            precompress: false,
            strict: true,
        }),
        alias: {
            $projects: 'src/projects'
        }
    },
}

export default config
