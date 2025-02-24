import mongoose from 'mongoose';

const TodoSchema = new mongoose.Schema({
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      index: true,
      required: [true, 'User ID is required'],
    },
    task: {
      type: String,
      required: [true, 'Task is required'],
      trim: true,
    },
    status: {
      type: Boolean,
      default: false,
    },
}, {
  timestamps: true,
});

export default mongoose.model('Todo', TodoSchema);
