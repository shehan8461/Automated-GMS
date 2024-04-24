const Training = require("../models/Training_HR");
const { z } = require("zod");

const createTrainingSchema = z.object({
  name: z.string(),
  description: z.string(),
  date: z.string(),
  time: z.string(),
  departments: z.string(),
});

const trainingController = {
  // create training
  createTraining: async (req, res) => {
    try {
      // validation
      createTrainingSchema.parse(req.body);

      const newTraining = new Training(req.body);

      const savedTraining = await newTraining.save();

      res.status(201).json({
        success: true,
        training: savedTraining,
        message: "Training created successfully",
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        error,
        message: "Internal server error",
      });
    }
  },

  // get all trainings
  getTrainings: async (req, res) => {
    try {
      const trainings = await Training.find();

      res.status(200).json({ success: true, trainings });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        error,
        message: "Internal server error",
      });
    }
  },

  // get training by id
  getTrainingById: async (req, res) => {
    try {
      const trainingId = req.params.id;
      const training = await Training.findById(trainingId);

      if (!training) {
        return res.status(404).json({
          success: false,
          message: "Training not found",
        });
      }

      res.status(200).json({ success: true, training });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        error,
        message: "Internal server error",
      });
    }
  },

  // update training
  updateTraining: async (req, res) => {
    try {
      const trainingId = req.params.id;
      const training = await Training.findById(trainingId);

      if (!training) {
        return res.status(404).json({
          success: false,
          message: "Training not found",
        });
      }

      const updatedTraining = await Training.findByIdAndUpdate(
        trainingId,
        req.body,
        {
          new: true,
        }
      );

      res.status(200).json({
        success: true,
        training: updatedTraining,
        message: "Training updated successfully",
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        error,
        message: "Internal server error",
      });
    }
  },

  // delete training
  deleteTraining: async (req, res) => {
    try {
      const trainingId = req.params.id;

      const training = await Training.findById(trainingId);

      if (!training) {
        return res.status(404).json({
          success: false,
          message: "Training not found",
        });
      }

      const deletedTraining = await Training.findByIdAndDelete(trainingId);

      res.status(200).json({
        success: true,
        training: deletedTraining,
        message: "Training deleted successfully",
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        error,
        message: "Internal server error",
      });
    }
  },

  // get trainings count using aggregation
  getTrainingsCount: async (req, res) => {
    try {
      const trainingsCount = await Training.aggregate([
        {
          $group: {
            _id: null,
            count: { $sum: 1 },
          },
        },
      ]);

      res
        .status(200)
        .json({ success: true, count: trainingsCount[0]?.count || 0 });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        error,
        message: "Internal server error",
      });
    }
  },
};

module.exports = trainingController;
