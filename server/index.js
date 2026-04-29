const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const sequelize = require('./config/database');
const User = require('./models/User');
const Card = require('./models/Card');
const Activity = require('./models/Activity');
const QRCode = require('qrcode');

const app = express();
app.use(cors());
app.use(express.json({ limit: '10mb' }));

const logStream = fs.createWriteStream(path.join(__dirname, 'error.log'), { flags: 'a' });

// Helper function to generate a unique ID in the format GID-XXXX-XXXX
async function generateUniqueId() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let idNumber;
  let exists = true;

  while (exists) {
    const part1 = Array.from({ length: 4 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
    const part2 = Array.from({ length: 4 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
    idNumber = `GID-${part1}-${part2}`;
    const existingCard = await Card.findOne({ where: { idNumber } });
    exists = !!existingCard;
  }

  return idNumber;
}

app.post('/api/generate-id', async (req, res) => {
  try {
    const { firstName, lastName, department, validUntil, image } = req.body;
    
    // Auto-generate a unique ID number
    const idNumber = await generateUniqueId();

    const newUser = await User.create({
      firstName,
      lastName,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}.${Date.now()}@gov.id`,
      role: 'Staff',
      department,
      status: 'Active',
      image
    });

    // Generate QR Code
    const verificationUrl = `http://localhost:3000/verify/${idNumber}`;
    const qrCodeBase64 = await QRCode.toDataURL(verificationUrl);

    const newCard = await Card.create({
      idNumber,
      validUntil,
      status: 'Active',
      UserId: newUser.id,
      qrCode: qrCodeBase64
    });

    await Activity.create({
      type: 'issued',
      title: 'New Card Issued',
      details: `ID: ${idNumber}`,
      subtitle: `Issued for ${firstName} ${lastName}`
    });

    res.status(201).json({ success: true, user: newUser, card: newCard });
  } catch (error) {
    const errorMsg = `[${new Date().toISOString()}] ERROR: ${error.message}\n${error.stack}\n`;
    console.error(errorMsg);
    logStream.write(errorMsg);
    res.status(500).json({ success: false, message: error.message });
  }
});

app.get('/api/users', async (req, res) => {
  const users = await User.findAll({ include: Card });
  res.json(users);
});

app.get('/api/verify-card/:idNumber', async (req, res) => {
  try {
    const { idNumber } = req.params;
    const card = await Card.findOne({
      where: { idNumber },
      include: User
    });

    if (!card) {
      return res.status(404).json({ success: false, message: 'Card not found' });
    }

    res.json({
      success: true,
      card: {
        idNumber: card.idNumber,
        validUntil: card.validUntil,
        status: card.status,
        firstName: card.User.firstName,
        lastName: card.User.lastName,
        department: card.User.department,
        image: card.User.image,
        qrCode: card.qrCode
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.get('/api/activities', async (req, res) => {
  const activities = await Activity.findAll({ order: [['createdAt', 'DESC']] });
  res.json(activities);
});

const PORT = 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server listening on port ${PORT}`);
});

sequelize.sync().then(() => console.log('DB Synced'));

setInterval(() => {}, 10000);
