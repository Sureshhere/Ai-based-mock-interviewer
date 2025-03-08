/** @type { import("drizzle-kit").Config } */
export default {
    schema: "./utils/schema.js",
    dialect: 'postgresql',
    dbCredentials: {
        url: 'postgresql://neondb_owner:npg_HMBe0Dd2fqaU@ep-orange-dawn-a8ap6vwm-pooler.eastus2.azure.neon.tech/Ai-mock-interviewer?sslmode=require',
    }
};