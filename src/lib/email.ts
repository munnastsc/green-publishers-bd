import nodemailer from 'nodemailer';

interface SmtpConfig {
  host: string;
  port: number;
  user: string;
  pass: string;
}

function getTransporter(smtp: SmtpConfig) {
  return nodemailer.createTransport({
    host: smtp.host,
    port: smtp.port,
    secure: false,
    auth: { user: smtp.user, pass: smtp.pass },
  });
}

export async function sendOrderConfirmationToCustomer({
  smtp,
  customerEmail,
  customerName,
  orderId,
  items,
  totalAmount,
  address,
}: {
  smtp: SmtpConfig;
  customerEmail: string;
  customerName: string;
  orderId: number;
  items: string;
  totalAmount: number;
  address: string;
}) {
  const transporter = getTransporter(smtp);
  await transporter.sendMail({
    from: `"Green Publishers BD" <${smtp.user}>`,
    to: customerEmail,
    subject: `অর্ডার নিশ্চিতকরণ #${orderId} — Green Publishers BD`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #166534;">আপনার অর্ডার সফল হয়েছে! ✅</h2>
        <p>প্রিয় ${customerName},</p>
        <p>আপনার অর্ডার সফলভাবে গ্রহণ করা হয়েছে।</p>
        <table style="width:100%; border-collapse: collapse; margin: 16px 0;">
          <tr><td style="padding:8px; border:1px solid #e2e8f0; color:#64748b;">অর্ডার নম্বর</td><td style="padding:8px; border:1px solid #e2e8f0; font-weight:700;">#${orderId}</td></tr>
          <tr><td style="padding:8px; border:1px solid #e2e8f0; color:#64748b;">বইসমূহ</td><td style="padding:8px; border:1px solid #e2e8f0;">${items}</td></tr>
          <tr><td style="padding:8px; border:1px solid #e2e8f0; color:#64748b;">মোট পরিমাণ</td><td style="padding:8px; border:1px solid #e2e8f0; font-weight:700; color:#166534;">TK. ${totalAmount}</td></tr>
          <tr><td style="padding:8px; border:1px solid #e2e8f0; color:#64748b;">ডেলিভারি ঠিকানা</td><td style="padding:8px; border:1px solid #e2e8f0;">${address}</td></tr>
        </table>
        <p style="color:#64748b; font-size:0.9rem;">আমরা শীঘ্রই আপনার অর্ডার প্রক্রিয়া করব।</p>
        <p style="color:#166534; font-weight:700;">ধন্যবাদ — Green Publishers BD</p>
      </div>
    `,
  });
}

export async function sendOrderNotificationToAdmin({
  smtp,
  adminEmail,
  customerName,
  customerPhone,
  orderId,
  items,
  totalAmount,
  address,
  paymentMethod,
}: {
  smtp: SmtpConfig;
  adminEmail: string;
  customerName: string;
  customerPhone: string;
  orderId: number;
  items: string;
  totalAmount: number;
  address: string;
  paymentMethod: string;
}) {
  const transporter = getTransporter(smtp);
  await transporter.sendMail({
    from: `"Green Publishers BD" <${smtp.user}>`,
    to: adminEmail,
    subject: `নতুন অর্ডার #${orderId} — ${customerName}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #1e40af;">নতুন অর্ডার এসেছে! 🛒</h2>
        <table style="width:100%; border-collapse: collapse; margin: 16px 0;">
          <tr><td style="padding:8px; border:1px solid #e2e8f0; color:#64748b;">অর্ডার নম্বর</td><td style="padding:8px; border:1px solid #e2e8f0; font-weight:700;">#${orderId}</td></tr>
          <tr><td style="padding:8px; border:1px solid #e2e8f0; color:#64748b;">কাস্টমার নাম</td><td style="padding:8px; border:1px solid #e2e8f0;">${customerName}</td></tr>
          <tr><td style="padding:8px; border:1px solid #e2e8f0; color:#64748b;">ফোন</td><td style="padding:8px; border:1px solid #e2e8f0;">${customerPhone}</td></tr>
          <tr><td style="padding:8px; border:1px solid #e2e8f0; color:#64748b;">ঠিকানা</td><td style="padding:8px; border:1px solid #e2e8f0;">${address}</td></tr>
          <tr><td style="padding:8px; border:1px solid #e2e8f0; color:#64748b;">বইসমূহ</td><td style="padding:8px; border:1px solid #e2e8f0;">${items}</td></tr>
          <tr><td style="padding:8px; border:1px solid #e2e8f0; color:#64748b;">পেমেন্ট পদ্ধতি</td><td style="padding:8px; border:1px solid #e2e8f0;">${paymentMethod}</td></tr>
          <tr><td style="padding:8px; border:1px solid #e2e8f0; color:#64748b;">মোট পরিমাণ</td><td style="padding:8px; border:1px solid #e2e8f0; font-weight:700; color:#1e40af;">TK. ${totalAmount}</td></tr>
        </table>
      </div>
    `,
  });
}
