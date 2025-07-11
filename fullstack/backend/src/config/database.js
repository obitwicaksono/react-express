const mongoose = require('mongoose');

// Konfigurasi koneksi MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ Terhubung ke MongoDB');
  } catch (error) {
    console.error('❌ Gagal terhubung ke MongoDB:', error.message);
    process.exit(1); // Keluar aplikasi jika koneksi gagal
  }
};

module.exports = connectDB;