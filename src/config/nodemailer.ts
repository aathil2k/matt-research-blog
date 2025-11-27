import nodemailer from "nodemailer";

const email = process.env.EMAIL;
const pass = process.env.EMAIL_PASS;

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: email,
    pass,
  },
});
// export const transporter = nodemailer.createTransport({
//     host: "smtp.gmail.com",
//     port: 465,
//     secure: true,
//     auth: {
//       type: "OAuth2",
//       clientId: "820359656406-14o7grhd21k5ds1m09posc081aduhd11.apps.googleusercontent.com",
//       clientSecret: "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",
//     },
//   });
export const mailOptions = {
  from: email,
  to: email,
};