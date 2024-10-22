import { addServerImportsDir, createResolver, defineNuxtModule } from '@nuxt/kit'

// Module options TypeScript interface definition
export interface ModuleOptions { }

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'nuxt-tus-upload',
    configKey: 'nuxtTusUpload',
  },
  // Default configuration options of the Nuxt module
  defaults: {},
  setup(_options, nuxt) {
    const resolver = createResolver(import.meta.url)

    nuxt.options.alias['#nuxt-tus-upload'] = resolver.resolve(
      './runtime/types/index',
    )

    addServerImportsDir(resolver.resolve('./runtime/server/utils'))
  },
})
