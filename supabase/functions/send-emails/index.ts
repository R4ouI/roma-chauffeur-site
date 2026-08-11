// Supabase Edge Function: send-emails
// Triggered by Database Webhooks on INSERT to reservations or contact_messages
//
// Deploy with: supabase functions deploy send-emails --no-verify-jwt
// Set secret: supabase secrets set RESEND_API_KEY=re_xxx...
//
// Then create Database Webhooks in Supabase dashboard:
//   - reservations INSERT → https://<project>.supabase.co/functions/v1/send-emails
//   - contact_messages INSERT → same URL

import { serve } from "https://deno.land/std@0.208.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY")!;
const BUSINESS_EMAIL = "maxromeexecutivechauffeur@outlook.it";
const FROM_EMAIL = "bookings@maxromeexecutivechauffeur.it";

interface Reservation {
  id: string;
  route_type: string;
  route_label: string;
  route_id: string | null;
  price: number;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  reservation_date: string;
  reservation_time: string;
  guests: string;
  pickup_location: string;
  special_requests: string | null;
}

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  preferred_date: string;
  preferred_time: string;
  message: string | null;
}

function formatCurrency(amount: number): string {
  return `€${amount}`;
}

async function sendEmail(to: string[], subject: string, html: string) {
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${RESEND_API_KEY}`,
    },
    body: JSON.stringify({
      from: `maxromeexecutivechauffeur <${FROM_EMAIL}>`,
      to,
      subject,
      html,
    }),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Resend API error ${response.status}: ${body}`);
  }

  return response.json();
}

// ── Email templates ──────────────────────────────────────────────

function reservationCustomerEmail(r: Reservation): { subject: string; html: string } {
  const label = r.route_label.replace(/^Custom: /, "");
  const routeTypeLabel =
    r.route_type === "transfer" ? "Transfer" : r.route_type === "tour" ? "Tour" : "Custom Route";

  return {
    subject: `Booking Confirmed — ${routeTypeLabel}: ${label}`,
    html: `
      <div style="font-family:Georgia,serif;max-width:560px;margin:0 auto;padding:24px">
        <div style="text-align:center;margin-bottom:32px">
          <span style="display:inline-block;background:#b8860b;color:#fff;border-radius:50%;width:48px;height:48px;line-height:48px;font-weight:bold;font-size:13px">MR</span>
          <h1 style="font-size:24px;color:#1a1a1a;margin:16px 0 4px">maxromeexecutivechauffeur</h1>
          <p style="color:#8a8a8a;font-size:14px;margin:0">Booking Confirmed — ${routeTypeLabel}</p>
        </div>

        <div style="background:#f8f5ee;border-radius:12px;padding:24px;margin-bottom:24px">
          <h2 style="font-size:18px;color:#b8860b;margin:0 0 16px">${label}</h2>
          <table style="width:100%;font-size:14px;color:#1a1a1a;border-collapse:collapse">
            <tr><td style="padding:6px 0;color:#8a8a8a">Date</td><td style="padding:6px 0;font-weight:500">${r.reservation_date}</td></tr>
            <tr><td style="padding:6px 0;color:#8a8a8a">Pickup time</td><td style="padding:6px 0;font-weight:500">${r.reservation_time}</td></tr>
            <tr><td style="padding:6px 0;color:#8a8a8a">Guests</td><td style="padding:6px 0;font-weight:500">${r.guests}</td></tr>
            <tr><td style="padding:6px 0;color:#8a8a8a">Pickup location</td><td style="padding:6px 0;font-weight:500">${r.pickup_location}</td></tr>
            <tr><td style="padding:6px 0;color:#8a8a8a">Price</td><td style="padding:6px 0;font-weight:700;color:#b8860b;font-size:16px">${formatCurrency(r.price)}</td></tr>
          </table>
        </div>

        <div style="background:#fff;border:1px solid #e8e5df;border-radius:12px;padding:16px;margin-bottom:24px;font-size:14px;color:#5a5a5a">
          <p style="margin:0 0 8px"><strong style="color:#1a1a1a">What happens next:</strong></p>
          <p style="margin:0 0 4px">Your chauffeur will contact you 24h before the ride with exact details. For urgent questions, reach us on WhatsApp at +39 328 123 4961.</p>
        </div>

        <p style="font-size:12px;color:#8a8a8a;text-align:center">
          Free cancellation up to 24h before pickup.<br/>
          maxromeexecutivechauffeur — Premium Rome Transfers & Private Tours
        </p>
      </div>`,
  };
}

function reservationBusinessEmail(r: Reservation): { subject: string; html: string } {
  const label = r.route_label.replace(/^Custom: /, "");
  return {
    subject: `📋 New Booking — ${r.customer_name} — ${label}`,
    html: `
      <div style="font-family:sans-serif;max-width:560px;margin:0 auto">
        <h2 style="color:#b8860b">New Reservation</h2>
        <table style="width:100%;border-collapse:collapse;font-size:14px">
          <tr><td style="padding:6px 12px;background:#f5f5f5;font-weight:bold">Customer</td><td style="padding:6px 12px">${r.customer_name}</td></tr>
          <tr><td style="padding:6px 12px;background:#f5f5f5;font-weight:bold">Email</td><td style="padding:6px 12px"><a href="mailto:${r.customer_email}">${r.customer_email}</a></td></tr>
          <tr><td style="padding:6px 12px;background:#f5f5f5;font-weight:bold">Phone</td><td style="padding:6px 12px"><a href="tel:${r.customer_phone}">${r.customer_phone}</a></td></tr>
          <tr><td style="padding:6px 12px;background:#f5f5f5;font-weight:bold">Route</td><td style="padding:6px 12px">${label}</td></tr>
          <tr><td style="padding:6px 12px;background:#f5f5f5;font-weight:bold">Type</td><td style="padding:6px 12px">${r.route_type}</td></tr>
          <tr><td style="padding:6px 12px;background:#f5f5f5;font-weight:bold">Date</td><td style="padding:6px 12px">${r.reservation_date}</td></tr>
          <tr><td style="padding:6px 12px;background:#f5f5f5;font-weight:bold">Time</td><td style="padding:6px 12px">${r.reservation_time}</td></tr>
          <tr><td style="padding:6px 12px;background:#f5f5f5;font-weight:bold">Guests</td><td style="padding:6px 12px">${r.guests}</td></tr>
          <tr><td style="padding:6px 12px;background:#f5f5f5;font-weight:bold">Pickup</td><td style="padding:6px 12px">${r.pickup_location}</td></tr>
          <tr><td style="padding:6px 12px;background:#f5f5f5;font-weight:bold">Price</td><td style="padding:6px 12px;font-weight:bold;color:#b8860b">${formatCurrency(r.price)}</td></tr>
          ${r.special_requests ? `<tr><td style="padding:6px 12px;background:#f5f5f5;font-weight:bold">Special</td><td style="padding:6px 12px">${r.special_requests}</td></tr>` : ""}
        </table>
        <p style="font-size:12px;color:#888;margin-top:16px">Reservation ID: ${r.id}</p>
      </div>`,
  };
}

function contactCustomerEmail(m: ContactMessage): { subject: string; html: string } {
  return {
    subject: "We received your message — maxromeexecutivechauffeur",
    html: `
      <div style="font-family:Georgia,serif;max-width:560px;margin:0 auto;padding:24px">
        <div style="text-align:center;margin-bottom:32px">
          <span style="display:inline-block;background:#b8860b;color:#fff;border-radius:50%;width:48px;height:48px;line-height:48px;font-weight:bold;font-size:13px">MR</span>
          <h1 style="font-size:24px;color:#1a1a1a;margin:16px 0 4px">maxromeexecutivechauffeur</h1>
        </div>
        <p style="font-size:16px;color:#1a1a1a">Hi ${m.name},</p>
        <p style="font-size:14px;color:#5a5a5a;line-height:1.6">Thank you for reaching out. Our team will review your message and reply within a few hours. For anything urgent, reach us on WhatsApp at +39 328 123 4961.</p>
        <p style="font-size:12px;color:#8a8a8a;text-align:center;margin-top:32px">maxromeexecutivechauffeur — Premium Rome Transfers & Private Tours</p>
      </div>`,
  };
}

function contactBusinessEmail(m: ContactMessage): { subject: string; html: string } {
  return {
    subject: `💬 New Message — ${m.name}`,
    html: `
      <div style="font-family:sans-serif;max-width:560px;margin:0 auto">
        <h2 style="color:#b8860b">New Contact Message</h2>
        <table style="width:100%;border-collapse:collapse;font-size:14px">
          <tr><td style="padding:6px 12px;background:#f5f5f5;font-weight:bold">Name</td><td style="padding:6px 12px">${m.name}</td></tr>
          <tr><td style="padding:6px 12px;background:#f5f5f5;font-weight:bold">Email</td><td style="padding:6px 12px"><a href="mailto:${m.email}">${m.email}</a></td></tr>
          ${m.phone ? `<tr><td style="padding:6px 12px;background:#f5f5f5;font-weight:bold">Phone</td><td style="padding:6px 12px"><a href="tel:${m.phone}">${m.phone}</a></td></tr>` : ""}
          <tr><td style="padding:6px 12px;background:#f5f5f5;font-weight:bold">Preferred date</td><td style="padding:6px 12px">${m.preferred_date}</td></tr>
          <tr><td style="padding:6px 12px;background:#f5f5f5;font-weight:bold">Preferred time</td><td style="padding:6px 12px">${m.preferred_time}</td></tr>
          ${m.message ? `<tr><td style="padding:6px 12px;background:#f5f5f5;font-weight:bold">Message</td><td style="padding:6px 12px">${m.message}</td></tr>` : ""}
        </table>
        <p style="font-size:12px;color:#888;margin-top:16px">Message ID: ${m.id}</p>
      </div>`,
  };
}

// ── CORS helper ───────────────────────────────────────────────────

function corsHeaders(): Record<string, string> {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  };
}

// ── Handler ──────────────────────────────────────────────────────

serve(async (req: Request) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: corsHeaders() });
  }

  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405, headers: corsHeaders() });
  }

  try {
    const body = await req.json();

    const { type, table, record } = body;

    if (type !== "INSERT") {
      return new Response(JSON.stringify({ skipped: true, reason: "not an INSERT" }), {
        status: 200,
        headers: { ...corsHeaders(), "Content-Type": "application/json" },
      });
    }

    if (table === "reservations") {
      const r = record as Reservation;

      const custEmail = reservationCustomerEmail(r);
      await sendEmail([r.customer_email], custEmail.subject, custEmail.html);

      const bizEmail = reservationBusinessEmail(r);
      await sendEmail([BUSINESS_EMAIL], bizEmail.subject, bizEmail.html);

      console.log(`Reservation emails sent: ${r.id}`);
    } else if (table === "contact_messages") {
      const m = record as ContactMessage;

      const custEmail = contactCustomerEmail(m);
      await sendEmail([m.email], custEmail.subject, custEmail.html);

      const bizEmail = contactBusinessEmail(m);
      await sendEmail([BUSINESS_EMAIL], bizEmail.subject, bizEmail.html);

      console.log(`Contact emails sent: ${m.id}`);
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { ...corsHeaders(), "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Email function error:", err);
    return new Response(JSON.stringify({ error: "Failed to send emails" }), {
      status: 500,
      headers: { ...corsHeaders(), "Content-Type": "application/json" },
    });
  }
});
