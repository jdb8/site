import { defineConfig } from 'astro/config';
import astro from 'astro-critters';

// https://astro.build/config
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  site: 'https://joebateson.com',
  integrations: [astro(), react()],
});
