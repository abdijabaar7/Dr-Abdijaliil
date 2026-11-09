import { z } from "zod";

const appointmentTimes = ["08:30", "09:30", "10:30", "11:30", "13:00", "14:00", "15:00"];
const clinicToday = () => new Intl.DateTimeFormat("en-CA", {
  timeZone: "Africa/Mogadishu",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
}).format(new Date());
const clinicTime = () => new Intl.DateTimeFormat("en-GB", {
  timeZone: "Africa/Mogadishu",
  hour: "2-digit",
  minute: "2-digit",
  hourCycle: "h23",
}).format(new Date());

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
    .refine((dateStr) => dateStr >= clinicToday(), "Appointment date cannot be in the past"),
  appointment_time: z
    .string()
    .refine((time) => appointmentTimes.includes(time), "Please select one of the clinic's available times."),
  service_id: z.string().uuid("Invalid service selected").optional().or(z.literal("")),
  reason: z
    .string()
    .max(500, "Reason must not exceed 500 characters")
    .optional()
    .or(z.literal("")),
  // Honeypot field for spam prevention; must remain empty
  website_field_hp: z.string().max(0, "Bot detected").optional().or(z.literal("")),
}).refine(
  ({ appointment_date, appointment_time }) => appointment_date !== clinicToday() || appointment_time > clinicTime(),
  { message: "Please select a future time.", path: ["appointment_time"] }
);

export type AppointmentInput = z.infer<typeof appointmentSchema>;

