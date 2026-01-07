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
    title: 'Welcome to Our Platform',
    description: 'Discover the features designed to help you connect, collaborate, and grow.',
    image:
      'https://images.unsplash.com/photo-1595853035070-59a39fe84de3?q=80&w=1025&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 2,
    title: 'Collaborate with Your Team',
    description: 'Share ideas, provide feedback, and work efficiently with your team members.',
    image:
      'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=600&auto=format&fit=crop&q=60',
  },
  {
    id: 3,
    title: 'Grow Your Business',
    description: 'Showcase your products or services and reach the right audience with ease.',
    image:
      'https://images.unsplash.com/photo-1556761175-4b46a572b786?w=600&auto=format&fit=crop&q=60',
  },
];
