import sanityClient from "@sanity/client";
import imageURLBuilder from "@sanity/image-url";

// sanity client
export const client = sanityClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID,
  dataset: "production",
  apiVersion: "2024-03-21",
  token: import.meta.env.VITE_SANITY_TOKEN,
  useCdn: true,
});

// sanity image builder
const builder = imageURLBuilder(client);
export const urlFor = (source) => builder.image(source);
