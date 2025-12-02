export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ ok: false });
  }

  try {
    const { name, email, message } = req.body;

    // For now, just log it. Later you can hook email services.
    console.log("New message from website:", { name, email, message });

    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ ok: false });
  }
}
