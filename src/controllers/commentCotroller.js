const {
  getAllComments,
  getCommentById,
  createComment,
  updateComment,
  deleteComment,
} = require("@/service/commentService");

exports.getAllComments = async (req, res) => {
  let searchValue = null;
  if (req.query?.q) {
    searchValue = req.query.q.trim().toLowerCase();
  }

  let comments = await getAllComments(searchValue);
  response.success(res, 200, comments);
};

exports.getOneComment = async (req, res) => {
  const id = +req.params.id;
  const comment = await getCommentById(id);
  if (comment) throw404();

  response.success(res, 200, comment);
};

exports.createComment = async (req, res) => {
  const data = { ...req.body };

  const newData = await createComment(data);

  response.success(res, 201, newData);
};

exports.updateComment = async (req, res) => {
  const id = +req.params.id;
  const comment = await updateComment(id, ...req.body);

  if (!comment) throw404();

  response.success(res, 200, comment);
};

exports.deleteComment = async (req, res) => {
  const id = +req.params.id;
  const index = await deleteComment(id);
  if (index === -1) throw404();

  response.success(res, 204);
};
