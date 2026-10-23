import { z } from "zod";

export const appointmentSchema = z.object({
  patient_name: z
    .string()
    .min(2, "Patient name must be at least 2 characters")
    .max(120, "Patient name must not exceed 120 characters")
    .trim(),
  phone: z
    .string()
    .min(7, "Phone number must be at least 7 digits")
    .max(30, "Phone number is too long")
    .regex(/^[0-9+\s\-()]+$/, "Please enter a valid phone number format"),
  email: z
    .string()
    .email("Please provide a valid email address")
    .optional()
    .or(z.literal("")),
  appointment_date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format (expected YYYY-MM-DD)")
    .refine((dateStr) => {
      const selected = new Date(dateStr);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return selected >= today;
    }, "Appointment date cannot be in the past"),
  appointment_time: z
    .string()
    .regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, "Invalid time format (expected HH:MM)"),
  service_id: z.string().uuid("Invalid service selected").optional().or(z.literal("")),
  reason: z
    .string()
    .max(500, "Reason must not exceed 500 characters")
    .optional()
    .or(z.literal("")),
  // Honeypot field for spam prevention; must remain empty
  website_field_hp: z.string().max(0, "Bot detected").optional().or(z.literal("")),
});

export type AppointmentInput = z.infer<typeof appointmentSchema>;

