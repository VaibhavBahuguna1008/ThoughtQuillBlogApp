import User from "../models/user.model.js";
import Post from "../models/post.model.js";
import Comment from "../models/comment.model.js";
import { Webhook } from "svix";

export const clerkWebHook = async (req, res) => {
  console.log('Webhook received:', req.body.type); // Log the event type
  
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    console.error('Missing WEBHOOK_SECRET');
    throw new Error("Webhook secret needed!");
  }

  const payload = JSON.stringify(req.body); // Convert payload to string
  const headers = req.headers;

  // Log the raw payload and headers for debugging
  console.log('Raw payload:', payload);
  console.log('Payload type:', typeof payload);
  console.log('Headers:', headers);

  const wh = new Webhook(WEBHOOK_SECRET);
  let evt;
  try {
    evt = wh.verify(payload, headers);
    console.log('Webhook verified, event:', evt.type);
  } catch (err) {
    console.error('Webhook verification failed:', err);
    return res.status(400).json({
      message: "Webhook verification failed!",
    });
  }

  // Check if evt is defined before accessing its properties
  if (!evt) {
    console.error('Event is undefined');
    return res.status(400).json({
      message: "Event verification failed!",
    });
  }

  console.log(evt.data);

  try {
    if (evt.type === "user.created") {
      console.log('Creating new user:', evt.data);
      const newUser = new User({
        clerkUserId: evt.data.id,
        username: evt.data.username || evt.data.email_addresses[0].email_address,
        email: evt.data.email_addresses[0].email_address,
        img: evt.data.profile_img_url,
      });

      await newUser.save();
      console.log('User created successfully');
    }

    if (evt.type === "user.deleted") {
      console.log('Deleting user:', evt.data.id);
      const deletedUser = await User.findOneAndDelete({
        clerkUserId: evt.data.id,
      });

      await Post.deleteMany({user: deletedUser._id});
      await Comment.deleteMany({user: deletedUser._id});
      console.log('User and related data deleted successfully');
    }

    return res.status(200).json({
      message: "Webhook processed successfully",
      eventType: evt.type
    });
  } catch (error) {
    console.error('Error processing webhook:', error);
    return res.status(500).json({
      message: "Error processing webhook",
      error: error.message
    });
  }
};
