module.exports = {
  email: 'alexander.shen@gmail.com',

  socialMedia: [
    {
      name: 'GitHub',
      url: 'https://github.com/AlexShen101',
    },
    {
      name: 'Linkedin',
      url: 'https://www.linkedin.com/in/alexandershen2004',
    },
    {
      name: 'Substack',
      url: 'https://alexshen.substack.com',
    },
  ],

  videoSocialMedia: [
    {
      name: 'YouTube',
      url: 'https://www.youtube.com/@RandomHydra',
    },
    {
      name: 'Twitter',
      url: 'https://x.com/RandomHydr38443',
    },
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/randomhydra/',
    },
    {
      name: 'TikTok',
      url: 'https://www.tiktok.com/@randomhydra',
    },
  ],

  navLinks: [
    {
      name: 'Experience',
      url: '/#jobs',
    },
    {
      name: 'Work',
      url: '/#projects',
    },
    // {
    //   name: 'Blog',
    //   url: '/#featured-posts',
    // },
    {
      name: 'Contact',
      url: '/#contact',
    },
    {
      name: 'Notes',
      url: 'https://notes.alexshen.com.de/',
    }
  ],

  colors: {
    green: '#64ffda',
    navy: '#0a192f',
    darkNavy: '#020c1b',
  },

  srConfig: (delay = 200, viewFactor = 0.25) => ({
    origin: 'bottom',
    distance: '20px',
    duration: 500,
    delay,
    rotate: { x: 0, y: 0, z: 0 },
    opacity: 0,
    scale: 1,
    easing: 'cubic-bezier(0.645, 0.045, 0.355, 1)',
    mobile: true,
    reset: false,
    useDelay: 'always',
    viewFactor,
    viewOffset: { top: 0, right: 0, bottom: 0, left: 0 },
  }),
};
