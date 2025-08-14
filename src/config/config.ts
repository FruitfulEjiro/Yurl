import dotenv from "dotenv";

dotenv.config({ override: true, debug: true });

interface config {
   ENV: {
      PORT: number;
      DATABASE_URL?: string;
      REFRESH_TOKEN_SECRET: string;
      ACCESS_TOKEN_SECRET: string;
      COOKIE_EXPIRES_IN: number;
      // GOOGLE_CLIENT_ID?: string;
      // GOOGLE_CLIENT_SECRET?: string;
      // EMAIL_HOST?: string;
      // EMAIL_PORT?: string;
      // EMAIL_USER?: string;
      // EMAIL_PASSWORD?: string;
      // FROM_EMAIL?: string;
   };
}

const CONFIG: config = {
   ENV: {
      PORT: parseInt(process.env.PORT ?? "3000"),
      DATABASE_URL: process.env.DATABASE_URL!,
      REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET!,
      ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET!,
      COOKIE_EXPIRES_IN: parseInt(process.env.COOKIE_EXPIRES_IN!),
      // GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
      // GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
      // EMAIL_HOST: process.env.EMAIL_HOST,
      // EMAIL_PORT: process.env.EMAIL_PORT,
      // EMAIL_USER: process.env.EMAIL_USER,
      // EMAIL_PASSWORD: process.env.EMAIL_PASSWORD,
      // FROM_EMAIL: process.env.FROM_EMAIL,
   },
};

export default CONFIG;
