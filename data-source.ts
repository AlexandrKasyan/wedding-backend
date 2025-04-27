import { DataSource } from 'typeorm';
import { config } from 'dotenv';

config();

export default new DataSource({
  type: 'postgres',
  url: 'postgresql://postgresql:NjFOSdP08dYmeax87rRfhonaa2tdQrCQ@dpg-d06co9s9c44c73febfog-a.oregon-postgres.render.com/wedding_test_cgzw?sslmode=require',
  entities: ['dist/src/**/*.entity.js'],
  migrations: ["dist/migrations/*.js"], 
  ssl: {
    rejectUnauthorized: false
  }
});