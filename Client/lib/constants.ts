export const NAV_THEME = {
  light: {
    background: 'hsl(0 0% 100%)', // background
    border: 'hsl(240 5.9% 90%)', // border
    card: 'hsl(0 0% 100%)', // card
    notification: 'hsl(0 84.2% 60.2%)', // destructive
    primary: 'hsl(240 5.9% 10%)', // primary
    text: 'hsl(240 10% 3.9%)', // foreground
  },
  dark: {
    background: 'hsl(240 10% 3.9%)', // background
    border: 'hsl(240 3.7% 15.9%)', // border
    card: 'hsl(240 10% 3.9%)', // card
    notification: 'hsl(0 72% 51%)', // destructive
    primary: 'hsl(0 0% 98%)', // primary
    text: 'hsl(0 0% 98%)', // foreground
  },
};
export const getIconColor = (isDark: boolean) => (isDark ? 'white' : 'black');

export const onboardingData = [
  {
    id: 1,
    title: 'C-ORB',
    description: 'Find the perfect way to connect and grow with C-Orb.',
    image:
      'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzl8fGNvbm5lY3Rpb258ZW58MHx8MHx8fDA%3D',
  },
  {
    id: 2,
    title: 'A Community for you . . .',
    description: 'Share ideas, get feedback, and grow with C-Orb’s friendly expert community.',
    image:
      'https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGNvbW11bml0eXxlbnwwfHwwfHx8MA%3D%3D',
  },
  {
    id: 3,
    title: '. . . And your Buisness',
    description:
      'C-Orb is a community marketplace where sellers showcase and buyers find what they need.',
    image:
      'https://images.unsplash.com/photo-1551135049-8a33b5883817?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGJ1aXNuZXNzfGVufDB8fDB8fHww',
  },
];
