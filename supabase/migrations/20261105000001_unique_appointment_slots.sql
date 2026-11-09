-- A pending request reserves its selected time just like a confirmed visit.
-- Cancelled appointments release the slot for another patient.
create unique index if not exists idx_appointments_active_slot
  on public.appointments (appointment_date, appointment_time)
  where status in ('pending', 'confirmed');
