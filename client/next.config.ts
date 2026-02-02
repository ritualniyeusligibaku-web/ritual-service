import { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

// test
const nextConfig: NextConfig = {
  images: {
    domains: ["res.cloudinary.com", "example.com"],
  },
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
