import { defineConfig } from "vitepress";
import { withMermaid } from "vitepress-plugin-mermaid";

export default withMermaid(
  defineConfig({
    title: "concord",
    description: "API bindings IR and codegen",
    base: "/concord/",
    themeConfig: {
      nav: [
        { text: "Guide", link: "/guide/" },
        { text: "IR Design", link: "/design/ir" },
        { text: "rhi", link: "https://rhi.zone/" },
      ],
      sidebar: {
        "/": [
          {
            text: "Guide",
            items: [
              { text: "Introduction", link: "/guide/" },
            ],
          },
          {
            text: "Design",
            items: [
              { text: "IR Reference", link: "/design/ir" },
            ],
          },
        ],
      },
      socialLinks: [{ icon: "github", link: "https://github.com/rhi-zone/concord" }],
    },
  })
);
