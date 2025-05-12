const catchAsync = require("../utils/catchAsync");
const axios = require("axios");

const API_KEY = "AIzaSyAeOQfCk8X7ArY06UrB-gIp9YNHewLLBRM";
const CHANNEL_ID = "UCHVjI8B4cRJ50oiwt03zBdg";

const TOKEN = "7754794989:AAE-p7mjyRQSUnEdiIkGho-407yxYTInl9g";
const CHAT_ID = "1630033705";

// Controller function to send a message to Telegram
const sendMessageTelegram = catchAsync(async (req, res) => {
  const { name, email, phone, message } = req.body;

  // Validate basic input
  if (!name || !email || !phone || !message) {
    return res.status(400).json({ message: "❌ All fields are required." });
  }

  if (!TOKEN || !CHAT_ID) {
    return res
      .status(500)
      .json({ message: "❌ Telegram configuration is missing." });
  }

  const text = `
🔔 New Contact Message:
👤 Name: ${name}
📧 Email: ${email}
📞 Phone: ${phone}
📝 Message: ${message}
  `.trim();

  await axios.post(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
    chat_id: CHAT_ID,
    text,
  });

  res.status(200).json({ message: "✅ Message sent successfully." });
});

const getYoutubePlayList = catchAsync(async (req, res, next) => {
  const YOUTUBE_API_URL = "https://www.googleapis.com/youtube/v3/playlists";
  const params = {
    part: "snippet",
    channelId: CHANNEL_ID,
    maxResults: 20,
    key: API_KEY,
  };

  const { data } = await axios.get(YOUTUBE_API_URL, { params });

  // تحقق من وجود العناصر
  if (!data.items || data.items.length === 0) {
    return res.status(404).json({ message: "❌ No playlists found." });
  }

  res.status(200).json({
    message: "✅ Playlists retrieved successfully.",
    items: data.items,
  });
});

const getPlaylistItems = catchAsync(async (req, res, next) => {
  const { id: playlistId } = req.params;

  if (!playlistId) {
    return res.status(400).json({ message: "❌ Playlist ID is required" });
  }

  const YOUTUBE_PLAYLIST_ITEMS_URL =
    "https://www.googleapis.com/youtube/v3/playlistItems";

  const params = {
    part: "snippet",
    playlistId,
    maxResults: 20,
    key: API_KEY,
  };

  const { data } = await axios.get(YOUTUBE_PLAYLIST_ITEMS_URL, { params });

  if (!data.items || data.items.length === 0) {
    return res
      .status(404)
      .json({ message: "❌ No videos found in this playlist." });
  }

  res.status(200).json({
    message: "✅ Videos retrieved successfully.",
    items: data.items,
  });
});

module.exports = {
  sendMessageTelegram,
  getYoutubePlayList,
  getPlaylistItems,
};
