import { z } from "zod";

export const contactSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must not exceed 100 characters")
    .trim(),
  phone: z
    .string()
    .min(7, "Phone number must be at least 7 digits")
    .max(30, "Phone number is too long")
    .regex(/^[0-9+\s\-()]+$/, "Please enter a valid phone number"),
  email: z
    .string()
    .email("Invalid email address")
    .optional()
    .or(z.literal("")),
  subject: z
    .string()
    .max(150, "Subject is too long")
    .optional()
    .or(z.literal("")),
  message: z
    .string()
    .min(5, "Message must be at least 5 characters")
    .max(2000, "Message must not exceed 2000 characters")
    .trim(),
  website_field_hp: z.string().max(0, "Bot detected").optional().or(z.literal("")),
});

export type ContactInput = z.infer<typeof contactSchema>;

