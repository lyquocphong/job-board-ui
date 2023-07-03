import { Config } from "./types";

const config: Config = {
    apiUrl: process.env.REACT_APP_API_URL || '',
    apiKey: process.env.REACT_APP_API_KEY || '',
    port: process.env.REACT_APP_PORT ? Number(process.env.REACT_APP_PORT) : 3000,
  };
  
  export default config;