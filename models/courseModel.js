const mongoose = require("mongoose");
const courseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name Is Required"],
    },

    description: {
      type: String,
      required: true,
    },

    image: {
      type: String,
    },

    price: {
      type: Number,
      required: true,
    },
    
    duration: {
      type: Number,
      required: true,
    },

    category: {
      type: String,
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
  if (doc.image  && !doc.image.startsWith(process.env.BASE_URL)) {
    doc.image = `${process.env.BASE_URL}/courses/${doc.image}`;
  }
};
courseSchema.post("save", (doc) => {
  setImageUrl(doc);
});
courseSchema.post("init", (doc) => {
  setImageUrl(doc);
});

const courseModel = mongoose.model("course", courseSchema);

module.exports = courseModel;
