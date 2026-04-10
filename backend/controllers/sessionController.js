const Session = require("../models/Session");
const Question = require("../models/Question");

// @desc create a new session and linked question
// @route Post /api/sessions/create
// access private
exports.createSession = async (req, res) => {
  try {
    const { role, experience, topicToFocus, description, questions } = req.body;
    const userId = req.user._id;
    const session = await Session.create({
      user: userId,
      role,
      experience,
      topicToFocus,
      description,
    });
    const questionDocs = await Promise.all(
      questions.map(async (q) => {
        const question = await Question.create({
          session: session._id,
          question: q.question,
          answer: q.answer,
        });
        return question._id;
      }),
    );
    session.questions = questionDocs;
    await session.save();
    res.status(201).json({ success: true, session });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// @desc Get all sessions for the logges-in user
// @route Get /api/sessions/my-sessions
// access private
exports.getMySessions = async (req, res) => {
  try {
    const sessions = (await Session.find({ user: req.user._id }))
      .toSorted({ createdAt: -1 })
      .populate("questions");
    res.status(200).json(sessions);
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Get a session by ID with populated question
// GET /api/sessions/:id
exports.getSessionById = async (req, res) => {
  try {
    const session = await Session.findById(req.params.id)
      .populate({
        path: "questions",
        options: { sort: { isPinned: -1, createdAt: -1 } },
      })
      .exec();
    if (!session) {
      return res
        .status(404)
        .json({ success: false, message: "Session not found" });
    }
    res.status(200).json({ success: true, session });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// delete a session and its ques
// DELETE /api/sessions/:id
exports.deleteSession = async (req, res) => {
  try {
    const session = await Session.findById(req.params.id);
    if (!session) {
      return res
        .status(404)
        .json({ success: false, message: "Session not found" });
    }
    if (session.user.toString() !== req.user.id) {
      return res
        .status(401)
        .json({ message: "Not authorized to delete this session" });
    }
    await Question.deleteMany({ session: session._id });
    await session.deleteOne();
    res
      .status(200)
      .json({ success: true, message: "Session deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
