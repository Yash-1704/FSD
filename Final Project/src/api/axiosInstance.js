import axios from 'axios';

// A pre-configured axios client. Every call site only needs a relative path
// (e.g. '/products'), so switching APIs later means changing this one line
// instead of every fetch call across the app.
export const axiosInstance = axios.create({
  baseURL: 'https://fakestoreapi.com',
  timeout: 10000,
});

// Runs for every response made through this instance. Used here to log
// failures centrally, once, instead of repeating console.error in every
// component that happens to fetch something.
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API request failed:', error.message);
    return Promise.reject(error);
  }
);
