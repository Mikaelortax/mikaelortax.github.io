export function rehypeMdxDefaultLayout(layoutPath = '/src/layouts/MdxLayout.astro') {
  return function (_tree, vfile) {
    const data = vfile.data ?? (vfile.data = {});
    const astro = data.astro ?? (data.astro = {});
    const frontmatter = astro.frontmatter ?? (astro.frontmatter = {});

    if (!frontmatter.layout) {
      frontmatter.layout = layoutPath;
    }
  };
}
