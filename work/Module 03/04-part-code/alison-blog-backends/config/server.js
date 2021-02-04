module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1002),
  admin: {
    auth: {
      secret: env('ADMIN_JWT_SECRET', '7321636ed38ba76bf198afef202b50f7'),
    },
  },
});
