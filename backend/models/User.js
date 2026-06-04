const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, 'Por favor proporcione un email'],
      unique: true,
      lowercase: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Por favor proporcione un email válido'
      ]
    },
    username: {
      type: String,
      required: [true, 'Por favor proporcione un nombre de usuario'],
      unique: true,
      minlength: 3
    },
    password: {
      type: String,
      required: [true, 'Por favor proporcione una contraseña'],
      minlength: 6,
      select: false // No devolver contraseña por defecto
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user'
    },
    avatar: {
      type: String,
      default: 'https://via.placeholder.com/150?text=Avatar'
    },
    channels: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Channel'
      }
    ],
    permissions: {
      canUploadMaps: { type: Boolean, default: false },
      canDeleteMaps: { type: Boolean, default: false },
      canEditUsers: { type: Boolean, default: false },
      canManageChannels: { type: Boolean, default: false }
    },
    isActive: {
      type: Boolean,
      default: true
    },
    lastLogin: Date
  },
  { timestamps: true }
);

// Encriptar contraseña antes de guardar
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Comparar contraseña
userSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
