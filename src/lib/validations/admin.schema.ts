import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Valid doctor email is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const serviceFormSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters").max(150),
  slug: z.string().min(3).max(150),
  description: z.string().min(10, "Description must be at least 10 characters"),
  full_content: z.string().optional(),
  category: z.string().min(2),
  icon_name: z.string().optional(),
  is_published: z.boolean().default(true),
  sort_order: z.number().int().default(0),
});

export const articleFormSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters").max(200),
  slug: z.string().min(3).max(200),
  excerpt: z.string().max(300).optional(),
  content: z.string().min(20, "Content must be at least 20 characters"),
  category: z.string().min(2),
  read_time: z.string().default("4 min read"),
  status: z.enum(["draft", "published"]).default("published"),
});

export const doctorProfileSchema = z.object({
  full_name: z.string().min(3).max(120),
  title: z.string().min(2).max(100),
  specialty: z.string().min(2).max(100),
  experience_years: z.number().int().min(0).max(50),
  location: z.string().min(2).max(150),
  phone: z.string().optional(),
  whatsapp_number: z.string().optional(),
  email: z.string().email().optional(),
  working_hours: z.string().optional(),
  biography: z.string().optional(),
});

