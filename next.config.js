const path = require('path');

// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   distDir: process.env.NEXT_DIST_DIR || '.next',
//   output: process.env.NEXT_OUTPUT_MODE,
//   // experimental: {
//   //   outputFileTracingRoot: path.join(__dirname, '../'),
//   // },
//   eslint: {
//     ignoreDuringBuilds: true,
//   },
//   typescript: {
//     ignoreBuildErrors: false,
//   },
//   images: { unoptimized: true },
// };

// module.exports = nextConfig;


/** @type {import('next').NextConfig} */
const nextConfig = {
  // distDir and output are fine as is, or you can remove them if not needed
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  images: { unoptimized: true },
};

module.exports = nextConfig;