const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

// With JSDoc @type annotations, IDEs can provide config autocompletion
/** @type {import('@docusaurus/types').DocusaurusConfig} */
(module.exports = {
  title: 'Zeebe Chaos',
  tagline: 'Chaos Day Summaries',
  url: 'https://zeebe-io.github.io',
  baseUrl: '/zeebe-chaos/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/zeebe-logo.png',
  organizationName: 'zeebe-io', // Usually your GitHub org/user name.
  projectName: 'zeebe-chaos', // Usually your repo name.

  presets: [
    [
      '@docusaurus/preset-classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: false,
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          editUrl:
            'https://github.com/zeebe-io/zeebe-chaos',
          routeBasePath: '/'
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: 'Zeebe Chaos',
        logo: {
          alt: 'Zeebe',
          src: 'img/zeebe-logo.png',
        },
        items: [

          {to: '/', label: 'Chaos Summaries', position: 'left'},
          {
            href: 'https://github.com/zeebe-io/zeebe-chaos',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Community',
            items: [
              {
                label: 'Stack Overflow',
                href: 'https://stackoverflow.com/questions/tagged/zeebe',
              },
              {
                label: 'Forum',
                href: 'https://forum.camunda.io/'
              },
              {
                label: 'Twitter',
                href: 'https://twitter.com/Camunda',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'GitHub',
                href: 'https://github.com/zeebe-io/zeebe-chaos/',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Zeebe Chaos. Built with Docusaurus.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
});
