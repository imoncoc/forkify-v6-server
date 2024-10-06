import nodemailer from 'nodemailer';
import config from '../config';

export const sendEmail = async (to: string, html: string) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com.',
    port: 465,
    secure: config.node_env === 'production', // Use `true` for port 465, `false` for all other ports
    auth: {
      user: 'imoncoc0@gmail.com',
      pass: 'icwa eaiq ewwp wwyy',
    },
  });

  await transporter.sendMail({
    from: 'imoncoc0@gmail.com', // sender address
    to, // list of receivers
    subject: 'Reset your password within 10 mins!', // Subject line
    text: '', // plain text body
    html, // html body
  });
};
