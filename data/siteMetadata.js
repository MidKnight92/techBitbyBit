/** @type {import("pliny/config").PlinyConfig } */
const siteMetadata = {
  title: 'Tech Bit-by-Bit',
  author: 'Stephanie Viveros',
  headerTitle: 'Tech Bit-by-Bit',
  description:
    'Tech Bit-by-Bit is a beginner-friendly blog and video series that breaks down complex tech topics into simple, relatable insights—one bit at a time.',
  language: 'en-us',
  theme: 'system', // system, dark or light
  siteUrl: 'https://techbitbybit.com',
  siteRepo: 'https://github.com/MidKnight92/techBitbyBit',
  siteLogo: `${process.env.BASE_PATH || ''}/static/images/logo.png`,
  socialBanner: `${process.env.BASE_PATH || ''}/static/images/tbb-banner-patreon.png`,
  email: 'techbitbybitmedia@gmail.com',
  youtube: 'https://www.youtube.com/@Tech-Bit-by-Bit',
  // podcast: '',
  buyMeACoffee: 'https://buymeacoffee.com/techbitbybit',
  locale: 'en-US',
  stickyNav: false,
  analytics: {

    umamiAnalytics: {
      umamiWebsiteId: process.env.NEXT_UMAMI_ID, 
      // You may also need to overwrite the script if you're storing data in the US - ex:
      // src: 'https://us.umami.is/script.js'
      // Remember to add 'us.umami.is' in `next.config.js` as a permitted domain for the CSP
    },
  },
  // newsletter: {
  // supports mailchimp, buttondown, convertkit, klaviyo, revue, emailoctopus, beehive
  // Please add your .env file and modify it according to your selection
  // provider: 'buttondown',
  // },
  comments: {
    provider: 'cusdis',
  },
  search: {
    provider: 'kbar',
    kbarConfig: {
      searchDocumentsPath: `${process.env.BASE_PATH || ''}/search.json`,
    },
  },
}

export default siteMetadata
