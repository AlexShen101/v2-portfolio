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
      name: 'Email',
      url: 'mailto:alexander.shen@gmail.com',
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
    {
      name: 'Contact',
      url: '/#contact',
    },
  ],

  colors: {
    accent: '#ffffff',
    primary: '#000000',
  },

  srConfig: (delay = 200, viewFactor = 0.15) => ({
    origin: 'bottom',
    distance: '35px',
    duration: 700,
    delay,
    rotate: { x: 0, y: 0, z: 0 },
    opacity: 0,
    scale: 0.95,
    easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    mobile: true,
    reset: false,
    useDelay: 'always',
    viewFactor,
    viewOffset: { top: 50, right: 0, bottom: 0, left: 0 },
  }),
};
