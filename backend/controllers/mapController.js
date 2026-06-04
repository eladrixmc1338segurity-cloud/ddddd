const Map = require('../models/Map');
const User = require('../models/User');

// Obtener todos los mapas
exports.getAllMaps = async (req, res, next) => {
  try {
    const { category, search } = req.query;
    let query = { status: 'active' };

    if (category) {
      query.category = category;
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    const maps = await Map.find(query)
      .populate('uploader', 'username email avatar')
      .sort('-createdAt');

    res.status(200).json({
      success: true,
      count: maps.length,
      maps
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Obtener un mapa específico
exports.getMapById = async (req, res, next) => {
  try {
    const map = await Map.findById(req.params.id)
      .populate('uploader', 'username email avatar')
      .exec();

    if (!map) {
      return res.status(404).json({
        success: false,
        message: 'Mapa no encontrado'
      });
    }

    // Incrementar contador de descargas
    map.downloadCount += 1;
    await map.save();

    res.status(200).json({
      success: true,
      map
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Crear mapa (solo admin)
exports.createMap = async (req, res, next) => {
  try {
    const { name, description, category, fileUrl, fileName, thumbnail, tags } = req.body;

    const map = await Map.create({
      name,
      description,
      category,
      fileUrl,
      fileName,
      thumbnail,
      tags: tags ? tags.split(',') : [],
      uploader: req.user.id,
      permissions: {
        public: true
      }
    });

    const populatedMap = await map.populate('uploader', 'username email avatar');

    res.status(201).json({
      success: true,
      message: 'Mapa creado exitosamente',
      map: populatedMap
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Actualizar mapa (solo admin o creador)
exports.updateMap = async (req, res, next) => {
  try {
    let map = await Map.findById(req.params.id);

    if (!map) {
      return res.status(404).json({
        success: false,
        message: 'Mapa no encontrado'
      });
    }

    // Verificar permiso
    if (map.uploader.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'No tiene permiso para actualizar este mapa'
      });
    }

    const { name, description, category, status, tags } = req.body;

    map = await Map.findByIdAndUpdate(
      req.params.id,
      {
        name: name || map.name,
        description: description || map.description,
        category: category || map.category,
        status: status || map.status,
        tags: tags ? tags.split(',') : map.tags,
        version: map.version + 1
      },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      message: 'Mapa actualizado',
      map
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Eliminar mapa (solo admin o creador)
exports.deleteMap = async (req, res, next) => {
  try {
    const map = await Map.findById(req.params.id);

    if (!map) {
      return res.status(404).json({
        success: false,
        message: 'Mapa no encontrado'
      });
    }

    // Verificar permiso
    if (map.uploader.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'No tiene permiso para eliminar este mapa'
      });
    }

    await Map.findByIdAndRemove(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Mapa eliminado'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
