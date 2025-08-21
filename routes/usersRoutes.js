const express = require("express");
const router = express.Router();

const {
  sendMessageTelegram,
  getYoutubePlayList,
  getPlaylistItems,
  packages,
} = require("../controllers/ApiController");

router.post("/telegram", sendMessageTelegram); // لإضافة بيانات جديدة
router.get("/youtubePlayList", getYoutubePlayList);
router.post("/playlist/:id", getPlaylistItems);
router.post("/packages", packages);

module.exports = router;
