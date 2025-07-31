import type { NextConfig } from "next";
 
const nextConfig: NextConfig = { 
  devIndicators: false,
  images: {
    remotePatterns: [{
      protocol: "https",
      hostname: "flagcdn.com",
      port: "",
      pathname: "/**"
    }]
  },
  pageExtensions: ["tsx", "ts"], 
  output: "standalone",
};


export default nextConfig;
