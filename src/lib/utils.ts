import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateString: string): string {
  if (!dateString) return "";
  try {
    const d = new Date(dateString);
    return d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return dateString;
  }
}

export function formatTime12h(timeString: string): string {
  if (!timeString) return "";
  try {
    const [hours, minutes] = timeString.split(":");
    const h = parseInt(hours, 10);
    const ampm = h >= 12 ? "PM" : "AM";
    const formattedHours = h % 12 || 12;
    return `${formattedHours}:${minutes} ${ampm}`;
  } catch {
    return timeString;
  }
}

export function createWhatsAppBookingLink(
  phone: string,
  patientName: string,
  date: string,
  time: string,
  serviceName?: string
): string {
  const cleanPhone = phone.replace(/[^0-9]/g, "");
  const text = encodeURIComponent(
    `Hello Dr. Abdijalii, I would like to request an orthopedic consultation appointment.\n\n` +
      `Patient Name: ${patientName}\n` +
      `Preferred Date: ${date}\n` +
      `Preferred Time: ${time}\n` +
      (serviceName ? `Specialty / Reason: ${serviceName}\n` : "") +
      `Thank you.`
  );
  return `https://wa.me/${cleanPhone}?text=${text}`;
}

