import { Router } from "express";
import { ReplitConnectors } from "@replit/connectors-sdk";
import { z } from "zod";

const router = Router();

const SubscribeBody = z.object({
  email: z.string().email(),
  language: z.enum(["en", "ru", "ua"]).default("en"),
});

const OWNER_EMAIL = "fuadmammadov335@gmail.com";
const FROM = "IKE & IKZE Guide <onboarding@resend.dev>";

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

const confirmContent: Record<string, { subject: string; heading: string; body: string; cta: string; disclaimer: string }> = {
  en: {
    subject: "Your free IKE & IKZE guide",
    heading: "Here's your guide: How IKE and IKZE actually work",
    body: `
      <p>Thanks for signing up!</p>
      <p>Here is a quick overview of everything covered in the full guide:</p>
      <ul>
        <li><strong>IKE (Individual Retirement Account)</strong> — 2026 contribution limit: 26,019 PLN. Tax-free on withdrawal at retirement. No early withdrawal tax if conditions are met.</li>
        <li><strong>IKZE (Individual Retirement Security Account)</strong> — 2026 limits: 11,304 PLN (employment/civil contract) or 16,956 PLN (B2B/self-employed). Contributions are fully deductible from taxable income in the year you make them. Early closure is taxed at a flat 10% + income tax on the accumulated sum — plan carefully.</li>
        <li><strong>Key difference:</strong> IKE saves tax at the back end (no tax on gains at exit). IKZE saves tax up front (deduction now, flat 10% exit tax at retirement).</li>
        <li><strong>Expats:</strong> Both accounts are available to non-citizens who are Polish tax residents. Leaving Poland before retirement age does not automatically close them.</li>
      </ul>
      <p>If you'd like to walk through how this applies to your specific contract type, income bracket, or exit plan, I offer 60-minute educational sessions.</p>
    `,
    cta: "Book a session →",
    disclaimer: "Educational content only. Not financial advice.",
  },
  ru: {
    subject: "Ваш бесплатный гид по IKE и IKZE",
    heading: "Вот ваш гид: как на самом деле работают IKE и IKZE",
    body: `
      <p>Спасибо за подписку!</p>
      <p>Краткое содержание полного гида:</p>
      <ul>
        <li><strong>IKE (Индивидуальный пенсионный счёт)</strong> — лимит взносов 2026: 26 019 PLN. Вывод средств при выходе на пенсию не облагается налогом.</li>
        <li><strong>IKZE (Индивидуальный счёт пенсионного обеспечения)</strong> — лимиты 2026: 11 304 PLN (UoP/гражданский договор) или 16 956 PLN (B2B/ИП). Взносы полностью вычитаются из налогооблагаемого дохода. При досрочном закрытии — плоский налог 10% + налог на доходы с накопленной суммы.</li>
        <li><strong>Ключевое отличие:</strong> IKE экономит налог на выходе (без налога на прирост при выводе). IKZE экономит налог сейчас (вычет сегодня, плоский 10% при выходе на пенсию).</li>
        <li><strong>Иностранцы:</strong> Оба счёта доступны нерезидентам, являющимся польскими налоговыми резидентами. Отъезд из Польши до пенсионного возраста не закрывает счета автоматически.</li>
      </ul>
      <p>Если вы хотите разобрать, как это применимо к вашему типу договора, налоговой ставке или плану выезда — я провожу 60-минутные образовательные сессии.</p>
    `,
    cta: "Записаться на сессию →",
    disclaimer: "Только образовательный контент. Не финансовая консультация.",
  },
  ua: {
    subject: "Ваш безкоштовний гід по IKE і IKZE",
    heading: "Ось ваш гід: як насправді працюють IKE і IKZE",
    body: `
      <p>Дякуємо за підписку!</p>
      <p>Короткий зміст повного гіда:</p>
      <ul>
        <li><strong>IKE (Індивідуальний пенсійний рахунок)</strong> — ліміт внесків 2026: 26 019 PLN. Виведення коштів при виході на пенсію не оподатковується.</li>
        <li><strong>IKZE (Індивідуальний рахунок пенсійного забезпечення)</strong> — ліміти 2026: 11 304 PLN (UoP/цивільний договір) або 16 956 PLN (B2B/ФОП). Внески повністю вираховуються з оподатковуваного доходу. При достроковому закритті — плоский податок 10% + ПДФО з накопиченої суми.</li>
        <li><strong>Ключова різниця:</strong> IKE економить податок на виході (без податку на приріст при виведенні). IKZE економить податок зараз (вирахування сьогодні, плоский 10% при виході на пенсію).</li>
        <li><strong>Іноземці:</strong> Обидва рахунки доступні негромадянам, які є польськими податковими резидентами. Від'їзд з Польщі до пенсійного віку не закриває рахунки автоматично.</li>
      </ul>
      <p>Якщо ви хочете розібратися, як це застосовується до вашого типу договору, податкової ставки або плану виїзду — я проводжу 60-хвилинні освітні сесії (англійською або російською мовою).</p>
    `,
    cta: "Записатися на сесію →",
    disclaimer: "Лише освітній контент. Не фінансова консультація.",
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
          <a href="https://expatfinance.pl/book" style="background:#f59e0b;color:#1e293b;font-weight:700;padding:14px 28px;border-radius:6px;text-decoration:none;display:inline-block;">
            ${c.cta}
          </a>
        </div>
      </div>
      <div style="padding:16px 32px;background:#f1f5f9;border-radius:0 0 8px 8px;">
        <p style="margin:0;font-size:11px;color:#94a3b8;">${c.disclaimer}</p>
        <p style="margin:4px 0 0;font-size:11px;color:#94a3b8;">You received this because you signed up at expatfinance.pl. Email: ${email}</p>
      </div>
    </div>
  `;
}

router.post("/subscribe", async (req, res) => {
  const parsed = SubscribeBody.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: "Invalid email address" });
  }
  const { email, language } = parsed.data;

  try {
    const connectors = new ReplitConnectors();

    // Notify owner
    await connectors.proxy("resend", "/emails", {
      method: "POST",
      body: JSON.stringify({
        from: FROM,
        to: [OWNER_EMAIL],
        subject: `New guide subscriber: ${email} [${language.toUpperCase()}]`,
        html: ownerHtml(email, language),
      }),
      headers: { "Content-Type": "application/json" },
    });

    // Confirm to subscriber
    const c = confirmContent[language] ?? confirmContent.en;
    await connectors.proxy("resend", "/emails", {
      method: "POST",
      body: JSON.stringify({
        from: FROM,
        to: [email],
        subject: c.subject,
        html: confirmHtml(email, language),
      }),
      headers: { "Content-Type": "application/json" },
    });

    return res.json({ ok: true });
  } catch (err) {
    console.error("Subscribe error:", err);
    return res.status(500).json({ error: "Failed to send email. Please try again." });
  }
});

export default router;
