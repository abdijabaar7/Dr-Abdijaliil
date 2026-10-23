export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type AppointmentStatus = 'pending' | 'confirmed' | 'cancelled' | 'completed';
export type ArticleStatus = 'draft' | 'published';

export interface DoctorAdmin {
  user_id: string;
  email: string | null;
  created_at: string;
}

export interface DoctorProfile {
  id: string;
  full_name: string;
  title: string;
  specialty: string;
  experience_years: number;
  location: string;
  phone: string | null;
  whatsapp_number: string | null;
  email: string | null;
  working_hours: string | null;
  biography: string | null;
  profile_image_path: string | null;
  updated_at: string;
}

export interface Service {
  id: string;
  title: string;
  slug: string;
  description: string;
  full_content: string | null;
  category: string;
  icon_name: string | null;
  image_path: string | null;
  is_published: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface Appointment {
  id: string;
  patient_name: string;
  phone: string;
  email: string | null;
  appointment_date: string;
  appointment_time: string;
  reason: string | null;
  service_id: string | null;
  status: AppointmentStatus;
  doctor_notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  category: string;
  read_time: string | null;
  cover_image_path: string | null;
  status: ArticleStatus;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  description: string | null;
  image_url: string;
  category: string;
  is_published: boolean;
  created_at: string;
}

export interface Testimonial {
  id: string;
  patient_name: string;
  location: string | null;
  rating: number;
  treatment: string;
  content: string;
  is_verified: boolean;
  is_published: boolean;
  created_at: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
  sort_order: number;
  is_published: boolean;
  created_at: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  phone: string;
  email: string | null;
  subject: string | null;
  message: string;
  is_read: boolean;
  created_at: string;
}

export type Database = {
  public: {
    Tables: {
      doctor_admins: {
        Row: DoctorAdmin;
        Insert: {
          user_id: string;
          email?: string | null;
          created_at?: string;
        };
        Update: {
          user_id?: string;
          email?: string | null;
          created_at?: string;
        };
        Relationships: [];
      };
      doctor_profile: {
        Row: DoctorProfile;
        Insert: Partial<DoctorProfile>;
        Update: Partial<DoctorProfile>;
        Relationships: [];
      };
      services: {
        Row: Service;
        Insert: Partial<Service> & {
          title: string;
          slug: string;
          description: string;
        };
        Update: Partial<Service>;
        Relationships: [];
      };
      appointments: {
        Row: Appointment;
        Insert: Partial<Appointment> & {
          patient_name: string;
          phone: string;
          appointment_date: string;
          appointment_time: string;
        };
        Update: Partial<Appointment>;
        Relationships: [];
      };
      articles: {
        Row: Article;
        Insert: Partial<Article> & {
          title: string;
          slug: string;
          content: string;
        };
        Update: Partial<Article>;
        Relationships: [];
      };
      gallery: {
        Row: GalleryItem;
        Insert: Partial<GalleryItem> & {
          title: string;
          image_url: string;
        };
        Update: Partial<GalleryItem>;
        Relationships: [];
      };
      testimonials: {
        Row: Testimonial;
        Insert: Partial<Testimonial> & {
          patient_name: string;
          treatment: string;
          content: string;
        };
        Update: Partial<Testimonial>;
        Relationships: [];
      };
      faqs: {
        Row: FAQ;
        Insert: Partial<FAQ> & {
          question: string;
          answer: string;
        };
        Update: Partial<FAQ>;
        Relationships: [];
      };
      contact_messages: {
        Row: ContactMessage;
        Insert: Partial<ContactMessage> & {
          name: string;
          phone: string;
          message: string;
        };
        Update: Partial<ContactMessage>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: {
      is_doctor_admin: {
        Args: Record<string, never>;
        Returns: boolean;
      };
    };
    Enums: {
      appointment_status: AppointmentStatus;
      article_status: ArticleStatus;
    };
    CompositeTypes: Record<string, never>;
  };
};

