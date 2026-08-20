# React Toast Kit documentation

Documentation and interactive examples for `react-toast-kit`, built with Next.js
and exported as a static site.

## Local development

The current test setup installs the sibling library repository through
`file:../react-toast-kit`, so library changes are validated before publishing.

```bash
pnpm install
pnpm dev
```

Open <http://localhost:3000>. Production validation:

```bash
pnpm check
pnpm test:e2e
```

The browser suite covers accessibility, light/dark visual regression, navigation, and horizontal
overflow at 320, 375, 768, 1024, and 1440 pixel viewports.

## Deployment

`pnpm build` writes the static site to `out/`. GitHub Actions resolves the current package version
from npm, installs it, injects that version into the static site, and deploys through the official
GitHub Pages action. No manual dependency or version edit is required.
