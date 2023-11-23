const express = require('express');
const blogController = require('../controller/blogController');
const commentController = require('../controller/commentController');
const router = express.Router();


router.post('/create_blog' , blogController.createBlog);
router.get('/all_blogs', blogController.getAllBlogs);
router.get('/your_blogs', blogController.getYourBlogs);
router.put('/update_blog/:id' , blogController.updateBlog);
router.get('/find/:_id', blogController.getBlogById);
router.get("/search/:tab/:title", blogController.searchBlogBytitle);
router.put('/add_comment', commentController.postComment);
router.delete('/delete_blog/:id' , blogController.deleteBlog);

module.exports = router;