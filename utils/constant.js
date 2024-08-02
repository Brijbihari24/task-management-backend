import dotenv from "dotenv";
dotenv.config();
export const URI_SITE = process.env.URI_SITE;
export const LOGO = process.env.LOGO;
export const ADDRESS = process.env.ADDRESS;
export const SERVER_URL = process.env.SERVER_URL;
// Ship Rocket
export const SHIP_ROCKET_ENABLED = process.env.SHIP_ROCKET_ENABLED;
export const SHIP_ROCKET_EMAIL = process.env.SHIP_ROCKET_EMAIL;
export const SHIP_ROCKET_PASSWORD = process.env.SHIP_ROCKET_PASSWORD;

// Email Details

export const EMAIL_HOST = process.env.EMAIL_HOST;
export const EMAIL_PORT = process.env.EMAIL_PORT;
export const EMAIL_SSL = process.env.EMAIL_SSL;
export const EMAIL_AUTH_USER = process.env.EMAIL_AUTH_USER;
export const EMAIL_AUTH_PASSWORD = process.env.EMAIL_AUTH_PASSWORD;
export const EMAIL_AUTH_FROM = process.env.EMAIL_AUTH_FROM;
// Admin Details

export const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
