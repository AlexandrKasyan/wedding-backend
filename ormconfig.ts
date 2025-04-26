    // ormconfig.js
    module.exports = {
        type: 'postgres',
        host: 'dpg-d06co9s9c44c73febfog-a',  // Или IP адрес твоего сервера PostgreSQL
        port: 5432,
        username: 'postgresql', // Или postgres, если не создавал отдельного пользователя
        password: 'NjFOSdP08dYmeax87rRfhonaa2tdQrCQ', // Твой пароль
        database: 'wedding_test_cgzw',
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: false, // Важно: В production должно быть false! Используй migrations.
        migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
        cli: {
          migrationsDir: 'src/migrations',
        },
      };
  