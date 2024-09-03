const mongoose = require("mongoose");
const lectureSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "title Is Required"],
    },

    description: {
      type: String,
      required: true,
    },

    video: {
      type: String,
      required: true,
    },

    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "course",
      required: true,
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);
const setImageUrl = (doc) => {
  if (doc.video) {
    doc.video = `${process.env.BASE_URL}/lectures/${doc.video}`;
  }

};
lectureSchema.post("save", (doc) => {
  setImageUrl(doc);
});
lectureSchema.post("init", (doc) => {
  setImageUrl(doc);
});

const lectureModel = mongoose.model("lecture", lectureSchema);

module.exports = lectureModel;
