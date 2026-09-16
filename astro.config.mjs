import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
  site: 'https://power-apps-1919.github.io',
  base: '/Power-Platform-Content',
  integrations: [
    starlight({
      title: 'Power Platform Content',
      description: 'Reusable Power Apps components, patterns, and implementation notes.',
      customCss: ['./src/styles/custom.css'],
      editLink: {
        baseUrl: 'https://github.com/Power-Apps-1919/Power-Platform-Content/edit/main/',
      },
      lastUpdated: true,
      pagination: true,
      social: [
        {
          icon: 'github',
          label: 'GitHub',
          href: 'https://github.com/Power-Apps-1919/Power-Platform-Content',
        },
      ],
      sidebar: [
        {
          label: 'Getting started',
          items: [{ label: 'Welcome', slug: 'index' }],
        },
        {
          label: 'Components',
          items: [{ autogenerate: { directory: 'components' } }],
        },
        {
          label: 'Blog',
          items: [{ autogenerate: { directory: 'blog' } }],
        },
      ],
    }),
  ],
});
