const mongoose = require('mongoose');

const mapSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Por favor proporcione un nombre para el mapa'],
      trim: true
    },
    description: {
      type: String,
      required: [true, 'Por favor proporcione una descripción'],
      trim: true
    },
    category: {
      type: String,
      enum: ['Configuraciones', 'Setups', 'Mapas', 'Schematics', 'Otros'],
      required: true
    },
    fileUrl: {
      type: String,
      required: [true, 'Se requiere un archivo']
    },
    fileName: String,
    uploader: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    downloadCount: {
      type: Number,
      default: 0
    },
    permissions: {
      public: { type: Boolean, default: false },
      allowedUsers: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User'
        }
      ]
    },
    status: {
      type: String,
      enum: ['active', 'archived', 'deleted'],
      default: 'active'
    },
    thumbnail: String,
    tags: [String],
    version: {
      type: Number,
      default: 1
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Map', mapSchema);
