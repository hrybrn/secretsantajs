import nodemailer from 'nodemailer';

export function sendEmail(gmail, personA, personB) {
  const { user, pass } = gmail;
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user,
      pass,
    }
  });

  const mailOptions = {
    from: user,
    to: personA.email,
    subject: 'Secret Santa',
    html: `<h2>Hello ${personA.name}</h2><p>You have been assigned to buy a gift 🎁 for ${personB.name} in this year's Secret Santa! 🎅🏻</p>`
  };

  transporter.sendMail(mailOptions, function (err, info) {
    if(err)
      console.log(err);
    else
      console.log(info);
  });
}
