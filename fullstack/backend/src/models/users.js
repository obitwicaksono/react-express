const mongoose = require('mongoose');

// 1. Definisikan Schema (struktur data)
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, // Wajib diisi
  },
  email: {
    type: String,
    required: true,
    unique: true, // Email harus unik
  },
  address: {
    type: String,
    default: "", // Opsional (default kosong)
  },
  // Bisa ditambah field lain sesuai kebutuhan
}, { timestamps: true }); // Otomatis tambahkan `createdAt` dan `updatedAt`

// 2. Buat Model dari Schema
const User = mongoose.model('User', userSchema);

// 3. Export fungsi-fungsi untuk interaksi dengan database
module.exports = {
  // Mengambil semua user
  getAllUsers: () => User.find(),

  // Mengambil user berdasarkan ID
  getUserById: (idUser) => User.findById(idUser),

  // Membuat user baru
  createNewUser: (body) => User.create(body),

  // Memperbarui user
  updateUser: (body, idUser) => 
    User.findByIdAndUpdate(idUser, body, { new: true }), // `new: true` mengembalikan data terbaru

  // Menghapus user
  deleteUser: (idUser) => User.findByIdAndDelete(idUser),
};