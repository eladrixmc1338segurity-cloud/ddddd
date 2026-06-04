const mongoose = require('mongoose');

const channelSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Por favor proporcione un nombre de canal'],
      enum: ['Configuraciones', 'Setups', 'Mapas', 'Schematics', 'Otros'],
      unique: true
    },
    description: {
      type: String,
      required: true
    },
    icon: String,
    color: {
      type: String,
      default: '#2E5090' // Azul por defecto
    },
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      }
    ],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    isActive: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Channel', channelSchema);
