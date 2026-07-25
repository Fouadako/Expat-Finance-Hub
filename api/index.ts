/**
 * Vercel serverless entry point — handles all /api/* requests.
 * Exported as default so Vercel treats the Express app as the function handler.
 * No app.listen(), no express.static(), no catch-all route.
 */
import express from "express";
import cors from "cors";
import { z } from "zod";
import { existsSync, readFileSync } from "fs";
import { join } from "path";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ---------------------------------------------------------------------------
// GET /api/healthz
// ---------------------------------------------------------------------------
app.get("/api/healthz", (_req, res) => {
  res.json({ status: "ok" });
});

// ---------------------------------------------------------------------------
// POST /api/subscribe
// ---------------------------------------------------------------------------
const SubscribeBody = z.object({
  email: z.string().email(),
  language: z.enum(["en", "ru", "ua"]).default("en"),
});

const OWNER_EMAIL = "fuadmammadov335@gmail.com";
const FROM = "IKE & IKZE Guide <onboarding@resend.dev>";

// PDF guides are bundled via vercel.json includeFiles: artifacts/api-server/guides/**
// On Vercel the cwd is the project root; locally guides live beside this file.
function getGuidePath(lang: string): string {
  const filename = `guide-${lang}.pdf`;
  const viaRoot = join(process.cwd(), "artifacts/api-server/guides", filename);
  if (existsSync(viaRoot)) return viaRoot;
  // fallback for local dev running from artifacts/api-server
  return join(process.cwd(), "guides", filename);
}

function guideBase64(lang: string): string {
  return readFileSync(getGuidePath(lang)).toString("base64");
}

const guideFilenames: Record<string, string> = {
  en: "IKE-IKZE-Guide.pdf",
  ru: "IKE-IKZE-Guide-RU.pdf",
  ua: "IKE-IKZE-Guide-UA.pdf",
};

function ownerHtml(email: string, language: string) {
  return `
    <div style="font-family:sans-serif;max-width:500px;margin:0 auto;">
      <h2 style="color:#1e293b;">New guide subscriber 🎉</h2>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Language:</strong> ${language.toUpperCase()}</p>
      <p style="color:#64748b;font-size:12px;">Sent from the expatfinance.pl footer form.</p>
    </div>
  `;
}

const confirmContent: Record<string, {
  subject: string; heading: string; body: string; cta: string; disclaimer: string; attachment: string;
}> = {
  en: {
    subject: "Your free IKE & IKZE guide (PDF attached)",
    heading: "Here's your guide: How IKE and IKZE actually work",
    body: `
      <p>Thanks for signing up! Your free guide is attached to this email as a PDF.</p>
      <p>Inside you'll find:</p>
      <ul>
        <li>How IKE and IKZE actually work — contribution limits, tax mechanics, withdrawal rules</li>
        <li>The 2026 figures for both UoP and B2B contract holders</li>
        <li>What happens to your accounts if you leave Poland</li>
        <li>A side-by-side comparison of IKE vs IKZE tax treatment</li>
      </ul>
      <p>If you'd like to walk through how any of this applies to your specific situation, I offer 60-minute educational sessions — 450 PLN.</p>
    `,
    cta: "Book a session →",
    disclaimer: "Educational content only. Not financial advice.",
    attachment: "IKE-IKZE-Guide.pdf",
  },
  ru: {
    subject: "Ваш бесплатный гид по IKE и IKZE (PDF во вложении)",
    heading: "Вот ваш гид: как на самом деле работают IKE и IKZE",
    body: `
      <p>Спасибо за подписку! Ваш бесплатный гид прикреплён к этому письму в формате PDF.</p>
      <p>Внутри вы найдёте:</p>
      <ul>
        <li>Как на самом деле работают IKE и IKZE — лимиты взносов, налоговая механика, правила вывода</li>
        <li>Актуальные цифры 2026 года для UoP и B2B</li>
        <li>Что происходит со счетами при отъезде из Польши</li>
        <li>Сравнение налогового режима IKE и IKZE</li>
      </ul>
      <p>Если вы хотите разобрать, как это применимо к вашей ситуации, я провожу 60-минутные образовательные сессии — 450 PLN.</p>
    `,
    cta: "Записаться на сессию →",
    disclaimer: "Только образовательный контент. Не финансовая консультация.",
    attachment: "IKE-IKZE-Guide-RU.pdf",
  },
  ua: {
    subject: "Ваш безкоштовний гід по IKE і IKZE (PDF у вкладенні)",
    heading: "Ось ваш гід: як насправді працюють IKE і IKZE",
    body: `
      <p>Дякуємо за підписку! Ваш безкоштовний гід прикріплений до цього листа у форматі PDF.</p>
      <p>Всередині ви знайдете:</p>
      <ul>
        <li>Як насправді працюють IKE і IKZE — ліміти внесків, податкова механіка, правила виведення</li>
        <li>Актуальні цифри 2026 року для UoP та B2B</li>
        <li>Що відбувається з рахунками при від'їзді з Польщі</li>
        <li>Порівняння податкового режиму IKE та IKZE</li>
      </ul>
      <p>Якщо ви хочете розібратися, як це застосовується до вашої ситуації, я проводжу 60-хвилинні освітні сесії — 450 PLN (сесії проводяться англійською або російською мовою).</p>
    `,
    cta: "Записатися на сесію →",
    disclaimer: "Лише освітній контент. Не фінансова консультація.",
    attachment: "IKE-IKZE-Guide-UA.pdf",
  },
};

function confirmHtml(email: string, lang: string) {
  const c = confirmContent[lang] ?? confirmContent.en;
  return `
    <div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#1e293b;">
      <div style="background:#1e293b;padding:24px 32px;border-radius:8px 8px 0 0;">
        <p style="margin:0;color:#f59e0b;font-weight:700;font-size:18px;">IKE &amp; IKZE Guide</p>
        <p style="margin:4px 0 0;color:#94a3b8;font-size:13px;">expatfinance.pl</p>
      </div>
      <div style="background:#f8fafc;padding:32px;border:1px solid #e2e8f0;border-top:none;">
        <h1 style="font-size:22px;font-weight:700;margin:0 0 20px;">${c.heading}</h1>
        ${c.body}
        <div style="text-align:center;margin:32px 0;">
          <a href="https://expatfinance.pl/book"
             style="background:#f59e0b;color:#1e293b;font-weight:700;padding:14px 28px;border-radius:6px;text-decoration:none;display:inline-block;">
            ${c.cta}
          </a>
        </div>
      </div>
      <div style="padding:16px 32px;background:#f1f5f9;border-radius:0 0 8px 8px;">
        <p style="margin:0;font-size:11px;color:#94a3b8;">${c.disclaimer}</p>
        <p style="margin:4px 0 0;font-size:11px;color:#94a3b8;">
          You received this because you signed up at expatfinance.pl with address: ${email}
        </p>
      </div>
    </div>
  `;
}

async function resendPost(payload: object): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) throw new Error("RESEND_API_KEY is not set");

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "(no body)");
    throw new Error(`Resend ${res.status}: ${text}`);
  }
}

app.post("/api/subscribe", async (req, res) => {
  const parsed = SubscribeBody.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: "Invalid email address" });
  }
  const { email, language } = parsed.data;

  try {
    const pdfBase64 = guideBase64(language);
    const pdfFilename = guideFilenames[language] ?? guideFilenames.en;
    const c = confirmContent[language] ?? confirmContent.en;

    // 1. Notify owner
    await resendPost({
      from: FROM,
      to: [OWNER_EMAIL],
      subject: `New guide subscriber: ${email} [${language.toUpperCase()}]`,
      html: ownerHtml(email, language),
    });

    // 2. Send PDF to subscriber
    await resendPost({
      from: FROM,
      to: [email],
      subject: c.subject,
      html: confirmHtml(email, language),
      attachments: [{ filename: pdfFilename, content: pdfBase64 }],
    });

    return res.json({ ok: true });
  } catch (err) {
    console.error("Subscribe error:", err);
    return res.status(500).json({ error: "Failed to send email. Please try again." });
  }
});

export default app;
