/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "videos.pexels.com" },
      { protocol: "https", hostname: "images.pexels.com" },
      { protocol: "https", hostname: "plus.unsplash.com" },
    ],
  },
  // 301 redirects for routes whose canonical slug changed. Lets Google
  // (and existing bookmarks / backlinks) follow the rename cleanly
  // and transfer the previously-earned link equity.
  async redirects() {
    return [
      {
        source: "/vesijetti",
        destination: "/vesijettimme",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
