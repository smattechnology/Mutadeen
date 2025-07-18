import { Images } from "lucide-react";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["frontend.nuraloom.xyz"],
};

export default nextConfig;
export const images = {
  remotePatterns: [
    {
      protocol: "https",
      hostname: "nuraloom.xyz",
      port: "",
      pathname: "/**",
    },
    {
      protocol: "https",
      hostname: "test_frontend.nuraloom.xyz",
      port: "",
      pathname: "/**",
    },
  ],
};
