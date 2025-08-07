import dotenv from "dotenv";

dotenv.config({ override: true, debug: true });

interface config {
   ENV: {
      PORT: number;
      REFRESH_TOKEN_SECRET: string;
      ACCESS_TOKEN_SECRET: string;
      JWT_EXPIRES_IN: string;
      JWT_COOKIE_EXPIRES_IN: string;
      ALPHABET: string;
   };
}

const CONFIG: config = {
   ENV: {
      PORT: parseInt(process.env.PORT ?? "3000"),
      REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET!,
      ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET!,
      JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN!,
      JWT_COOKIE_EXPIRES_IN: process.env.JWT_COOKIE_EXPIRES_IN!,
      ALPHABET: process.env.ALPHABET!,
   },
};

export default CONFIG;
