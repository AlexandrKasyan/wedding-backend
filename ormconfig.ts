    // ormconfig.js
    module.exports = {
        type: 'postgres',
        host: 'localhost',  // Или IP адрес твоего сервера PostgreSQL
        port: 5050,
        username: 'postgres', // Или postgres, если не создавал отдельного пользователя
        password: 'admin', // Твой пароль
        database: 'wedding_invite',
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: false, // Важно: В production должно быть false! Используй migrations.
        migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
        cli: {
          migrationsDir: 'src/migrations',
        },
      };
  