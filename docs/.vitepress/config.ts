import { defineConfig } from 'vitepress'
import { withMermaid } from 'vitepress-plugin-mermaid'

export default withMermaid(
  defineConfig({
    title: 'concord',
    description: 'API bindings IR and codegen',
    base: '/concord/',
    srcExclude: ['**/CLAUDE.md'],
    themeConfig: {
      nav: [
        { text: 'Guide', link: '/guide/' },
        { text: 'IR Design', link: '/design/ir' },
        { text: 'rhi', link: 'https://docs.rhi.zone/' },
      ],
      sidebar: {
        '/': [
          {
            text: 'Guide',
            items: [
              { text: 'Introduction', link: '/guide/' },
            ],
          },
          {
            text: 'Design',
            items: [
              { text: 'IR Reference', link: '/design/ir' },
            ],
          },
        ],
      },
      socialLinks: [{ icon: 'github', link: 'https://github.com/rhi-zone/concord' }],
      search: {
        provider: 'local',
      },
      editLink: {
        pattern: 'https://github.com/rhi-zone/concord/edit/master/docs/:path',
        text: 'Edit this page on GitHub',
      },
    },
  })
)
