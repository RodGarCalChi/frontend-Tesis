/** @type {import('next').NextConfig} */
const nextConfig = {
  // El puerto se puede configurar aquí también, pero es mejor usar .env.local
  experimental: {
    turbo: {
      // Configuraciones específicas de Turbopack si las necesitas
    }
  }
}

module.exports = nextConfig