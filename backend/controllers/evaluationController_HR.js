const Evaluation = require("../models/Evaluation_HR");
const { z } = require("zod");

const createEvaluationSchema = z.object({
  employee: z.string(),
  date: z.string(),
  marks: z.number(),
});

const evaluationController = {
  // create evaluation
  createEvaluation: async (req, res) => {
    try {
      // validation
      createEvaluationSchema.parse(req.body);

      const newEvaluation = new Evaluation(req.body);

      const savedEvaluation = await newEvaluation.save();

      res.status(201).json({
        success: true,
        evaluation: savedEvaluation,
        message: "Evaluation created successfully",
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

  // get all evaluations
  getEvaluations: async (req, res) => {
    try {
      // populate employee details without password
      const evaluations = await Evaluation.find().populate("employee", {
        password: 0,
      });

      res.status(200).json({ success: true, evaluations });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        error,
        message: "Internal server error",
      });
    }
  },

  // get evaluation by id
  getEvaluationById: async (req, res) => {
    try {
      const evaluationId = req.params.id;
      const evaluation = await Evaluation.findById(evaluationId).populate(
        "employee",
        { password: 0 }
      );

      if (!evaluation) {
        return res.status(404).json({
          success: false,
          message: "Evaluation not found",
        });
      }

      res.status(200).json({ success: true, evaluation });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        error,
        message: "Internal server error",
      });
    }
  },

  // update evaluation
  updateEvaluation: async (req, res) => {
    try {
      const evaluationId = req.params.id;
      const evaluation = await Evaluation.findById(evaluationId);

      if (!evaluation) {
        return res.status(404).json({
          success: false,
          message: "Evaluation not found",
        });
      }

      const updatedEvaluation = await Evaluation.findByIdAndUpdate(
        evaluationId,
        req.body,
        {
          new: true,
        }
      );

      res.status(200).json({
        success: true,
        evaluation: updatedEvaluation,
        message: "Evaluation updated successfully",
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

  // delete evaluation
  deleteEvaluation: async (req, res) => {
    try {
      const evaluationId = req.params.id;

      const evaluation = await Evaluation.findById(evaluationId);

      if (!evaluation) {
        return res.status(404).json({
          success: false,
          message: "Evaluation not found",
        });
      }

      const deletedEvaluation = await Evaluation.findByIdAndDelete(
        evaluationId
      );

      res.status(200).json({
        success: true,
        evaluation: deletedEvaluation,
        message: "Evaluation deleted successfully",
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

  // get evaluations count using aggregation
  getEvaluationsCount: async (req, res) => {
    try {
      const evaluationsCount = await Evaluation.aggregate([
        {
          $group: {
            _id: null,
            count: { $sum: 1 },
          },
        },
      ]);

      res
        .status(200)
        .json({ success: true, count: evaluationsCount[0]?.count || 0 });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        error,
        message: "Internal server error",
      });
    }
  },

  // get evaluations for a specific employee
  getEmployeeEvaluations: async (req, res) => {
    try {
      const employeeId = req.userId;

      const evaluations = await Evaluation.find({ employee: employeeId });

      res.status(200).json({ success: true, evaluations });
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

module.exports = evaluationController;
