const throw404 = require("@/utils/throw404");
const response = require("../../utils/response");
const {
  getAllPost,
  getPostById,
  createPost,
  updatePost,
  deletePost,
} = require("@/service/postService");
const { getCommentsByPostId } = require("@/service/commentService");
const transporter = require("@/configs/mail");
//pcdi ninz qfwi ivlk
exports.getAllPost = async (req, res) => {
  let searchValue = null;
  if (req.query?.title) {
    searchValue = req.query.title.trim().toLowerCase();
  }
  let posts = await getAllPost(searchValue);
  if (!posts) throw404();

  const message = {
    from: "dangnhatminh8402@gmail.com",
    to: "dangnhatminh08042002@gmail.com",
    subject: "Message title",
    text: "Hello world?", // plain‑text body
    html: `<div>
              <p style="color: red">HTML version of the message</p>
              <img src ="https://hoanghamobile.com/tin-tuc/wp-content/uploads/2024/07/hinh-anh-oto.jpg" title="O to" />
            </div>`, // HTML body
  };
  const info = await transporter.sendMail(message);
  console.log(info);
  response.success(res, 200, posts);
};

exports.getOnePost = async (req, res) => {
  const id = +req.params.id;
  const post = await getPostById(id);

  if (!post) throw404();

  response.success(res, 200, post);
};

exports.createPost = async (req, res) => {
  const data = { ...req.body };

  const newData = await createPost(data);
  response.success(res, 201, newData);
};

exports.updatePost = async (req, res) => {
  const id = +req.params.id;
  const post = await updatePost(id, ...req.body);

  if (post) throw404();

  response.success(res, 200, post);
};

exports.deletePost = async (req, res) => {
  const id = +req.params.id;
  const index = await deletePost(id);
  if (index === -1) throw404();
  response.success(res, 204);
};

exports.getPostComments = async (req, res) => {
  const post = await getPostById(req.params.id);
  if (!post) throw404();

  const comments = await getCommentsByPostId(post.id);
  success(res, 200, comments);
};

exports.createPostComments = async (req, res) => {
  const post = await getPostById(req.params.id);
  if (!post) throw404();

  const newComment = await createComment({
    post_id: post.id,
    content: req.body.content,
  });
  success(res, 201, newComment);
};
