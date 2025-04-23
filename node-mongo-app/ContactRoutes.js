const express = require("express");
const Contact = require("./Contact");

const router = express.Router();

// POST: Save contact form data
router.post("/", async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const newContact = new Contact({ name, email, message });

    await newContact.save();
    res.status(201).json({ success: true, message: "Message saved successfully" });
  } catch (error) {
    console.error("Error saving contact:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// GET: Fetch all contact messages
router.get("/", async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.status(200).json(contacts);
  } catch (error) {
    console.error("Error fetching contacts:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;
