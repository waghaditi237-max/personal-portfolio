const express = require("express");
const path = require("path");
const nodemailer = require("nodemailer");

const app = express();
const PORT = 3000;

// Middleware
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes (Pages)
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "home.html"));
});

app.get("/about", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "about.html"));
});

app.get("/skills", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "skills.html"));
});

app.get("/projects", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "projects.html"));
});





app.get("/contact", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "contact.html"));
});

/* ================= CONTACT BACKEND ================= */

app.post("/send-message", async (req, res) => {
  const { name, email, message } = req.body;

  try {
    // Email transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "YOUR_EMAIL@gmail.com",       // 👈 your email
        pass: "YOUR_APP_PASSWORD"           // 👈 app password
      }
    });

    // Email content
    const mailOptions = {
      from: email,
      to: "YOUR_EMAIL@gmail.com",
      subject: "New Portfolio Contact Message",
      html: `
        <h3>New Message from Portfolio</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong><br>${message}</p>
      `
    };

    await transporter.sendMail(mailOptions);

    // Redirect after success
    res.send(`
      <script>
        alert("Message sent successfully!");
        window.location.href = "/contact";
      </script>
    `);

  } catch (error) {
    console.error(error);
    res.send(`
      <script>
        alert("Failed to send message. Try again.");
        window.location.href = "/contact";
      </script>
    `);
  }
});

// Server start
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});


