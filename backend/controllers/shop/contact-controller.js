const nodemailer = require('nodemailer');

const sendEmail = async (req, res) => {
  const { name, email, message } = req.body;

  try {
    // Configure Nodemailer
    const transporter = nodemailer.createTransport({
      service: 'gmail', // Gmail 
      auth: {
        user: 'madhushanfourth@gmail.com', 
        pass: 'bdyc rlgt xkfb mabr', 
      },
    });

    // Email details
    const mailOptions = {
      from: email, // Sender's email (from form)
      to: 'madhushanfourth@gmail.com', // Admin email to receive the message
      subject: `New Contact Us Message from ${name}`,
      text: `
        Name: ${name}
        Email: ${email}
        Message: ${message}
      `,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    res.status(200).json({ success: true, message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ success: false, message: 'Failed to send email.' });
  }
};

module.exports = { sendEmail };
