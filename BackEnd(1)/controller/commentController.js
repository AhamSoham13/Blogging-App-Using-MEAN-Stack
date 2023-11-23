const Blog = require("../model/blogSchema");

// Add Comment
const postComment = async (req, res, next) => {
  const comment = {
    userId: req.user.id,
    name: req.user.name,
    comment: req.body.comment.comment,
  };
  const blogId = req.body._id;
  console.log(
    "This is blogid and comment  from comment Api:- ",
    blogId,
    " + ",
    comment
  );
  try {
    const added_comment = await Blog.findByIdAndUpdate(
      blogId,
      {
        $push: {
          comments: {
            $each: [comment],
            $position: 0,
          },
          //comment,
        },
      },
      { new: true }
    ).populate("authorDetail", "-password"); //.reverse();//sort({ postedAt: -1 });

    res
      .status(200)
      .json({ added_comment, message: "Comment Successfully added" });
  } catch (error) {
    next({ status: 500, message: error.message });
  }
};

module.exports = { postComment };
