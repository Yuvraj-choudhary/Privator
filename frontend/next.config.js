module.exports = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  async rewrites() {
    return [
      {
        source: "/api/:slug*",
        destination: "http://127.0.0.1:8000/api/:slug*",
      },
    ];
  },
};
