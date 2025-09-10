// Environment configuration helper
const config = {
  development: {
    api: {
      baseUrl: 'http://localhost:5000/api',
      timeout: 10000
    },
    frontend: {
      baseUrl: 'http://localhost:3000'
    }
  },
  production: {
    api: {
      baseUrl: 'https://cohortlab-backend.onrender.com/api',
      timeout: 15000
    },
    frontend: {
      baseUrl: 'https://cohort-lab.vercel.app'
    }
  }
};

const getConfig = () => {
  const env = process.env.NEXT_PUBLIC_ENVIRONMENT || 'development';
  return config[env] || config.development;
};

export default getConfig;
