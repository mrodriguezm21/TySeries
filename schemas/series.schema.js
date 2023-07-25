const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const serieSchema = new Schema({
  title: { type: String, required: true },
  user: {
    type: Schema.ObjectId,
    ref: "User",
  },
  alternative_title: { type: String, required: false },
  description: { type: String, required: true },
  genre: { type: Array, required: true },
  type: { type: String, required: true },
  release_year: { type: Number, required: false },
  image: { type: String, required: true },
  status: { type: String, required: true },
  url: { type: String, required: true }, //
  alternative_url: { type: String, required: false },
  last_episode_seen: { type: Number, required: true },
  last_season_seen: { type: Number, required: false },
  user_status: { type: String, required: true },
  rating: { type: Number, required: false },
  created_at: { type: Date, default: Date.now },
  updated_at: Date,
},
{ versionKey: false}
);

const model = mongoose.model("Serie", serieSchema);

module.exports = model;
