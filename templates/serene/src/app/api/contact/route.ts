import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";
import { readContent } from "@/lib/content-store";
import { getPalette } from "@/lib/theme";
import { siteConfig, siteUrl } from "@/lib/site-config";

// Lazy initialization to avoid build-time errors
function getResend() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error("RESEND_API_KEY is not configured");
  }
  return new Resend(apiKey);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { vorname, nachname, email, telefon, nachricht } = body;

    // Validation
    if (!vorname || !nachname || !email || !nachricht) {
      return NextResponse.json(
        { error: "Bitte alle Pflichtfelder ausfüllen" },
        { status: 400 }
      );
    }

    const content = await readContent();
    const brand = getPalette(content.theme.paletteId).colors.brand;
    const recipientEmail = process.env.CONTACT_EMAIL || content.business.email;
    const fromAddress =
      process.env.RESEND_FROM_EMAIL || `${siteConfig.name} <onboarding@resend.dev>`;

    // Send email to practitioner
    const resend = getResend();
    const { data, error: resendError } = await resend.emails.send({
      from: fromAddress,
      to: recipientEmail,
      replyTo: email,
      subject: `Neue Kontaktanfrage von ${vorname} ${nachname}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
          <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f5; padding: 40px 20px;">
            <tr>
              <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                  <!-- Header -->
                  <tr>
                    <td style="background-color: ${brand}; padding: 30px 40px; text-align: center;">
                      <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 600;">
                        ${siteConfig.name}
                      </h1>
                      <p style="color: rgba(255,255,255,0.9); margin: 8px 0 0; font-size: 14px;">
                        Neue Kontaktanfrage
                      </p>
                    </td>
                  </tr>

                  <!-- Content -->
                  <tr>
                    <td style="padding: 40px;">
                      <h2 style="color: #3d4a3a; margin: 0 0 24px; font-size: 20px; font-weight: 600;">
                        Kontaktdaten
                      </h2>

                      <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 32px;">
                        <tr>
                          <td style="padding: 12px 0; border-bottom: 1px solid #e5e5e5;">
                            <span style="color: #666; font-size: 13px; display: block; margin-bottom: 4px;">Name</span>
                            <span style="color: #333; font-size: 16px; font-weight: 500;">${vorname} ${nachname}</span>
                          </td>
                        </tr>
                        <tr>
                          <td style="padding: 12px 0; border-bottom: 1px solid #e5e5e5;">
                            <span style="color: #666; font-size: 13px; display: block; margin-bottom: 4px;">E-Mail</span>
                            <a href="mailto:${email}" style="color: ${brand}; font-size: 16px; text-decoration: none;">${email}</a>
                          </td>
                        </tr>
                        ${telefon ? `
                        <tr>
                          <td style="padding: 12px 0; border-bottom: 1px solid #e5e5e5;">
                            <span style="color: #666; font-size: 13px; display: block; margin-bottom: 4px;">Telefon</span>
                            <a href="tel:${telefon}" style="color: ${brand}; font-size: 16px; text-decoration: none;">${telefon}</a>
                          </td>
                        </tr>
                        ` : ''}
                      </table>

                      <h2 style="color: #3d4a3a; margin: 0 0 16px; font-size: 20px; font-weight: 600;">
                        Nachricht
                      </h2>

                      <div style="background-color: #faf8f5; border-radius: 8px; padding: 20px; border-left: 4px solid ${brand};">
                        <p style="color: #333; font-size: 15px; line-height: 1.7; margin: 0; white-space: pre-wrap;">${nachricht}</p>
                      </div>

                      <!-- Reply Button -->
                      <div style="margin-top: 32px; text-align: center;">
                        <a href="mailto:${email}?subject=Re: Ihre Anfrage bei ${siteConfig.name}"
                           style="display: inline-block; background-color: ${brand}; color: #ffffff; padding: 14px 32px; border-radius: 50px; text-decoration: none; font-weight: 500; font-size: 15px;">
                          Direkt antworten
                        </a>
                      </div>
                    </td>
                  </tr>

                  <!-- Footer -->
                  <tr>
                    <td style="background-color: #faf8f5; padding: 24px 40px; text-align: center; border-top: 1px solid #e5e5e5;">
                      <p style="color: #888; font-size: 13px; margin: 0;">
                        Diese Nachricht wurde über das Kontaktformular auf<br>
                        <a href="${siteUrl}" style="color: ${brand}; text-decoration: none;">${siteConfig.domain}</a> gesendet.
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `,
    });

    if (resendError) {
      console.error("Resend error:", resendError);
      return NextResponse.json(
        { error: `Resend Fehler: ${resendError.message}` },
        { status: 500 }
      );
    }

    console.log("Email sent successfully:", data);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Fehler beim Senden der Nachricht" },
      { status: 500 }
    );
  }
}
