const sites = require("./config/sites");
const pseudoLocales = require("./config/pseudoLocales");

module.exports = {
  reactStrictMode: true,

  // next/config: publicRuntimeConfig available on both server and client – restart needed to change
  publicRuntimeConfig: {
    sites,
    pseudoLocales,
  },

  // We "hijack" Next.js’ i18n system to use for different sites
  i18n: {
    locales: Object.keys(sites),
    defaultLocale: Object.keys(sites)[0],
    domains: Object.keys(sites).map((siteKey) => {
      console.log({
        domain: sites[siteKey].domain,
        defaultLocale: siteKey,
      });
      return {
        domain: sites[siteKey].domain,
        defaultLocale: siteKey,
      };
    }),
  },

  // Redirect / to default pseudoLocale
  redirects: () => [
    {
      source: "/",
      destination: `/${Object.keys(sites)[0]}/${pseudoLocales[0]}`,
      permanent: true,
    },
  ],
};
