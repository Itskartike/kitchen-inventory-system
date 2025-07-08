const getApiUrl = () => {
  if (process.env.NODE_ENV === "production") {
    return (
      process.env.REACT_APP_API_URL ||
      "https://your-production-backend-url.onrender.com"
    ); // Fallback URL
  }
  return "http://localhost:5000"; // Your local backend URL
};

export const API_URL = getApiUrl();
