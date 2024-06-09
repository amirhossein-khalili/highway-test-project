import Cartracker from './cartracker.model.js';

class CartrackerController {
  static selectionCartracker = 'title url rating';
  static selectionCartrackers = 'title url rating';

  static async create(req, res, next) {
    try {
      const newCartracker = new Cartracker(req.body);
      await newCartracker.save();
      res.status(201).json(newCartracker);
    } catch (error) {
      console.error(error);
      res.status(500).json('an error occurred please try again later');
    }
  }

  static async findAll(req, res, next) {
    try {
      const { page, perPage } = req.query;
      const options = {
        page: parseInt(page, 10) || 1,
        limit: parseInt(perPage, 10) || 10,
        select: CartrackerController.selectionCartrackers,
      };

      const cartrackers = await Cartracker.paginate({}, options);

      return res.json(cartrackers);
    } catch (error) {
      console.error(error);
      res.status(500).json('an error occurred please try again later');
    }
  }

  static async findOne(req, res, next) {
    try {
      const cartracker = await Cartracker.findById(req.params.id).select(
        CartrackerController.selectionCartrackers
      );
      if (!cartracker) return res.status(404).json({ message: 'cartracker not found ' });
      return res.json(cartracker);
    } catch (error) {
      console.error(error);
      res.status(500).json('an error occurred please try again later');
    }
  }

  static async edit(req, res, next) {
    try {
      const cartrackerUpdated = await Cartracker.findByIdAndUpdate(req.params.id, req.body, {
        new: false,
      });
      if (!cartrackerUpdated) return res.status(404).json({ message: 'cartracker not found ' });

      res.json(cartrackerUpdated);
    } catch (error) {
      console.error(error);
      res.status(500).json('an error occurred please try again later');
    }
  }

  static async destroy(req, res, next) {
    try {
      const cartrackerRemoved = await Cartracker.findByIdAndDelete(req.params.id);
      if (!cartrackerRemoved) return res.status(404).json({ message: 'cartracker not found ' });
      res.json(cartrackerRemoved);
    } catch (error) {
      console.error(error);
      res.status(500).json('an error occurred please try again later');
    }
  }
}

export default CartrackerController;
