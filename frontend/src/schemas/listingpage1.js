import { z } from "zod";

export const listingpage1schema = z.object({
  title: z.string().min(3, "Title is required"),
  description: z.string().min(10, "Description is required"),

  pricePerNight: z.coerce.number(),

  city: z.string(),
  country: z.string(),
  location: z.string(),

  amenities: z.array(z.string()),

  bedrooms: z.coerce.number(),
  bathrooms: z.coerce.number(),
  images: z
    .array(z.instanceof(File))
    .min(4, "Upload exactly 4 images")
    .max(4, "Upload exactly 4 images"),
});