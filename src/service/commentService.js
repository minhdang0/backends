const { readDb, writeDb } = require("@/utils/db");

const RESOURCE = "comments";

const getAllComments = async (value) => {
  let comments = await readDb(RESOURCE);
  if (title) {
    comments = comments.filter(
      (item) =>
        item.name.toLowerCase().includes(value) &&
        item.description.toLowerCase().includes(value)
    );
  }
  return comments;
};

const getCommentById = async (commentId) => {
  const comments = await readDb(RESOURCE);
  const comment = comments.find((item) => item.id === commentId);

  return comment;
};

const createComment = async (data) => {
  const comments = await readDb(RESOURCE);
  const id = (comments.at(-1).id ?? 0) + 1;

  const newData = { id, ...data };

  comments.push(newData);

  await writeDb(RESOURCE, comments);

  return newData;
};

const updateComment = async (commentId, data) => {
  const comments = readDb(RESOURCE);
  const comment = comments.find((item) => item.id === commentId);

  if (comment) {
    Object.assign(comment, data);
    await writeDb(RESOURCE, comments);
    return comment;
  }

  return null;
};
const deleteComment = async (commentId) => {
  const comments = await readDb(RESOURCE);
  const index = comments.findIndex((item) => item.id === commentId);
  if (index !== -1) {
    comments.splice(index, 1);
    await writeDb(RESOURCE, comments);
  }
  return index;
};

const getCommentsByPostId = async (postId) => {
  const comments = await readDb(RESOURCE);
  return comments.filter((comment) => comment.post_id === +postId);
};
const CommentService = {
  getAllComments,
  getCommentById,
  deleteComment,
  updateComment,
  createComment,
  getCommentsByPostId,
};

module.exports = CommentService;
