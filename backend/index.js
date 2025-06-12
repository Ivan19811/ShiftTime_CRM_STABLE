import express from "express";
import cors from "cors";
import fetch from "node-fetch";

const app = express();
app.use(cors());
app.use(express.json());

const GAS_URL = "https://script.google.com/macros/s/AKfycbxYeM7U1OsjhBBQHa6vvc3oz5iFRLxzgnjbToj013lX11qoYlWb71ewypY84ecC3hZ7/exec";

app.post("/send", async (req, res) => {
  try {
    const response = await fetch(GAS_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body)
    });

    const text = await response.text();
    console.log("📦 Відповідь від GAS:", text);
    res.json(JSON.parse(text));
  } catch (err) {
    console.error("❌ ПОМИЛКА на сервері:", err.message);
    res.status(500).json({ success: false, error: err.message });
  }
});

app.post("/writeNumber", async (req, res) => {
  try {
    const payload = {
      surname: "",
      name: "",
      patronymic: "",
      number: req.body.value || 0
    };

    const response = await fetch(GAS_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    const text = await response.text();
    console.log("📦 Відповідь (writeNumber):", text);
    res.json(JSON.parse(text));
  } catch (err) {
    console.error("❌ ПОМИЛКА /writeNumber:", err.message);
    res.status(500).json({ success: false, error: err.message });
  }
});

// ✅ Використання PORT з Render
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Proxy-сервер запущено на порту ${PORT}`);
});
