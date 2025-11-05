import mongoose from "mongoose";

const SearchSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  term: {
    type: String,
    required: true,
    trim: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

SearchSchema.index({ term: 1 });
SearchSchema.index({ user: 1 });

const Search = mongoose.model("Search", SearchSchema);

export default Search;
