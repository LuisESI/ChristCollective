var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// server/index.ts
import express3 from "express";
import path4 from "path";

// server/routes.ts
import express from "express";
import { createServer } from "http";

// shared/schema.ts
var schema_exports = {};
__export(schema_exports, {
  businessFollows: () => businessFollows,
  businessFollowsRelations: () => businessFollowsRelations,
  businessProfiles: () => businessProfiles,
  businessProfilesRelations: () => businessProfilesRelations,
  campaigns: () => campaigns,
  campaignsRelations: () => campaignsRelations,
  contentCreators: () => contentCreators,
  contentCreatorsRelations: () => contentCreatorsRelations,
  directChats: () => directChats,
  directChatsRelations: () => directChatsRelations,
  directMessages: () => directMessages,
  directMessagesRelations: () => directMessagesRelations,
  donations: () => donations,
  donationsRelations: () => donationsRelations,
  eventRegistrations: () => eventRegistrations,
  eventRegistrationsRelations: () => eventRegistrationsRelations,
  groupChatMembers: () => groupChatMembers,
  groupChatMembersRelations: () => groupChatMembersRelations,
  groupChatMessages: () => groupChatMessages,
  groupChatMessagesRelations: () => groupChatMessagesRelations,
  groupChatQueues: () => groupChatQueues,
  groupChatQueuesRelations: () => groupChatQueuesRelations,
  groupChats: () => groupChats,
  groupChatsRelations: () => groupChatsRelations,
  insertBusinessProfileSchema: () => insertBusinessProfileSchema,
  insertCampaignSchema: () => insertCampaignSchema,
  insertContentCreatorSchema: () => insertContentCreatorSchema,
  insertDirectMessageSchema: () => insertDirectMessageSchema,
  insertDonationSchema: () => insertDonationSchema,
  insertGroupChatMemberSchema: () => insertGroupChatMemberSchema,
  insertGroupChatMessageSchema: () => insertGroupChatMessageSchema,
  insertGroupChatQueueSchema: () => insertGroupChatQueueSchema,
  insertMinistryEventSchema: () => insertMinistryEventSchema,
  insertMinistryPostRsvpSchema: () => insertMinistryPostRsvpSchema,
  insertMinistryPostSchema: () => insertMinistryPostSchema,
  insertMinistryProfileSchema: () => insertMinistryProfileSchema,
  insertNotificationSchema: () => insertNotificationSchema,
  insertPlatformPostSchema: () => insertPlatformPostSchema,
  insertPostInteractionSchema: () => insertPostInteractionSchema,
  insertSocialMediaPostSchema: () => insertSocialMediaPostSchema,
  insertSponsorshipApplicationSchema: () => insertSponsorshipApplicationSchema,
  membershipTiers: () => membershipTiers,
  ministryEvents: () => ministryEvents,
  ministryEventsRelations: () => ministryEventsRelations,
  ministryFollowers: () => ministryFollowers,
  ministryFollowersRelations: () => ministryFollowersRelations,
  ministryPostRsvps: () => ministryPostRsvps,
  ministryPosts: () => ministryPosts,
  ministryPostsRelations: () => ministryPostsRelations,
  ministryProfiles: () => ministryProfiles,
  ministryProfilesRelations: () => ministryProfilesRelations,
  notifications: () => notifications,
  notificationsRelations: () => notificationsRelations,
  platformPosts: () => platformPosts,
  postInteractions: () => postInteractions,
  sessions: () => sessions,
  socialMediaPosts: () => socialMediaPosts,
  socialMediaPostsRelations: () => socialMediaPostsRelations,
  sponsorshipApplications: () => sponsorshipApplications,
  sponsorshipApplicationsRelations: () => sponsorshipApplicationsRelations,
  userFollows: () => userFollows,
  users: () => users,
  usersRelations: () => usersRelations
});
import {
  pgTable,
  text,
  varchar,
  timestamp,
  jsonb,
  index,
  serial,
  integer,
  boolean,
  decimal,
  uuid,
  uniqueIndex
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { relations } from "drizzle-orm";
var sessions = pgTable(
  "sessions",
  {
    sid: varchar("sid").primaryKey(),
    sess: jsonb("sess").notNull(),
    expire: timestamp("expire").notNull()
  },
  (table) => [index("IDX_session_expire").on(table.expire)]
);
var users = pgTable("users", {
  id: varchar("id").primaryKey().notNull(),
  email: varchar("email").unique(),
  firstName: varchar("first_name"),
  lastName: varchar("last_name"),
  displayName: varchar("display_name"),
  profileImageUrl: varchar("profile_image_url"),
  stripeCustomerId: varchar("stripe_customer_id"),
  isAdmin: boolean("is_admin").default(false),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
  bio: text("bio"),
  location: varchar("location"),
  phone: varchar("phone"),
  username: varchar("username", { length: 50 }),
  password: varchar("password"),
  userType: varchar("user_type", { enum: ["creator", "business_owner", "ministry"] }),
  // Privacy settings
  showEmail: boolean("show_email").default(false),
  showPhone: boolean("show_phone").default(false),
  showLocation: boolean("show_location").default(false)
});
var membershipTiers = pgTable("membership_tiers", {
  id: serial("id").primaryKey(),
  name: varchar("name").notNull(),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  description: text("description"),
  stripePriceId: varchar("stripe_price_id"),
  features: text("features").array(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
});
var businessProfiles = pgTable("business_profiles", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id").references(() => users.id, { onDelete: "cascade" }),
  companyName: varchar("company_name").notNull(),
  industry: varchar("industry"),
  description: text("description"),
  website: varchar("website"),
  logo: varchar("logo"),
  location: varchar("location"),
  phone: varchar("phone"),
  email: varchar("email"),
  services: text("services").array(),
  membershipTierId: integer("membership_tier_id").references(() => membershipTiers.id),
  stripeSubscriptionId: varchar("stripe_subscription_id"),
  isActive: boolean("is_active").default(true),
  networkingGoals: text("networking_goals"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
});
var businessProfilesRelations = relations(businessProfiles, ({ one }) => ({
  user: one(users, {
    fields: [businessProfiles.userId],
    references: [users.id]
  }),
  membershipTier: one(membershipTiers, {
    fields: [businessProfiles.membershipTierId],
    references: [membershipTiers.id]
  })
}));
var campaigns = pgTable("campaigns", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: varchar("user_id").references(() => users.id, { onDelete: "cascade" }),
  title: varchar("title").notNull(),
  description: text("description").notNull(),
  goal: decimal("goal", { precision: 10, scale: 2 }).notNull(),
  currentAmount: decimal("current_amount", { precision: 10, scale: 2 }).default("0"),
  image: varchar("image"),
  additionalImages: text("additional_images").array(),
  video: varchar("video"),
  isActive: boolean("is_active").default(true),
  status: varchar("status", { enum: ["pending", "approved", "rejected"] }).default("pending"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
  endDate: timestamp("end_date"),
  slug: varchar("slug").notNull()
}, (table) => ({
  slugIndex: uniqueIndex("campaigns_slug_idx").on(table.slug)
}));
var campaignsRelations = relations(campaigns, ({ one, many }) => ({
  user: one(users, {
    fields: [campaigns.userId],
    references: [users.id]
  }),
  donations: many(donations)
}));
var donations = pgTable("donations", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id").references(() => users.id),
  campaignId: uuid("campaign_id").references(() => campaigns.id, { onDelete: "cascade" }),
  amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
  stripePaymentId: varchar("stripe_payment_id"),
  message: text("message"),
  isAnonymous: boolean("is_anonymous").default(false),
  createdAt: timestamp("created_at").defaultNow()
});
var donationsRelations = relations(donations, ({ one }) => ({
  user: one(users, {
    fields: [donations.userId],
    references: [users.id]
  }),
  campaign: one(campaigns, {
    fields: [donations.campaignId],
    references: [campaigns.id]
  })
}));
var insertCampaignSchema = createInsertSchema(campaigns).omit({ id: true, userId: true, currentAmount: true, createdAt: true, updatedAt: true, slug: true }).extend({
  additionalImages: z.array(z.string()).optional(),
  video: z.string().optional()
});
var insertDonationSchema = createInsertSchema(donations).omit({ id: true, stripePaymentId: true, createdAt: true });
var insertBusinessProfileSchema = createInsertSchema(businessProfiles).omit({ id: true, userId: true, stripeSubscriptionId: true, isActive: true, createdAt: true, updatedAt: true });
var contentCreators = pgTable("content_creators", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id").notNull().references(() => users.id),
  name: varchar("name").notNull(),
  platforms: jsonb("platforms").notNull(),
  // Array of platform objects: {platform, profileUrl, subscriberCount}
  content: text("content").notNull(),
  // Type of content they create
  audience: varchar("audience"),
  // Target audience
  bio: text("bio"),
  profileImage: varchar("profile_image"),
  // Creator's profile image
  isSponsored: boolean("is_sponsored").default(false),
  sponsorshipStartDate: timestamp("sponsorship_start_date"),
  sponsorshipEndDate: timestamp("sponsorship_end_date"),
  sponsorshipAmount: varchar("sponsorship_amount"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
});
var socialMediaPosts = pgTable("social_media_posts", {
  id: serial("id").primaryKey(),
  creatorId: integer("creator_id").notNull().references(() => contentCreators.id),
  postUrl: varchar("post_url").notNull(),
  postTitle: varchar("post_title"),
  postDescription: text("post_description"),
  thumbnailUrl: varchar("thumbnail_url"),
  videoUrl: varchar("video_url"),
  platform: varchar("platform").notNull(),
  viewCount: integer("view_count"),
  likeCount: integer("like_count"),
  commentCount: integer("comment_count"),
  postedAt: timestamp("posted_at"),
  isSponsored: boolean("is_sponsored").default(false),
  isVisibleOnProfile: boolean("is_visible_on_profile").default(true),
  createdAt: timestamp("created_at").defaultNow()
});
var sponsorshipApplications = pgTable("sponsorship_applications", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id").notNull().references(() => users.id),
  name: varchar("name").notNull(),
  email: varchar("email").notNull(),
  platforms: jsonb("platforms").notNull(),
  // Array of platform objects: {platform, profileUrl, subscriberCount}
  content: text("content").notNull(),
  audience: varchar("audience"),
  message: text("message"),
  status: varchar("status").default("pending").notNull(),
  // pending, approved, rejected
  reviewedAt: timestamp("reviewed_at"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
});
var ministryProfiles = pgTable("ministry_profiles", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id").notNull().references(() => users.id),
  name: varchar("name").notNull(),
  description: text("description"),
  denomination: varchar("denomination"),
  website: varchar("website"),
  logo: varchar("logo"),
  location: varchar("location"),
  address: text("address"),
  phone: varchar("phone"),
  email: varchar("email"),
  socialLinks: jsonb("social_links"),
  // {facebook, instagram, youtube, etc.}
  isActive: boolean("is_active").default(true),
  isVerified: boolean("is_verified").default(false),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
});
var ministryPosts = pgTable("ministry_posts", {
  id: serial("id").primaryKey(),
  ministryId: integer("ministry_id").notNull().references(() => ministryProfiles.id),
  title: varchar("title").notNull(),
  content: text("content").notNull(),
  type: varchar("type").notNull().default("post"),
  // post, announcement, update
  mediaUrls: text("media_urls").array(),
  // Array of image/video URLs
  links: jsonb("links"),
  // Array of external links with titles
  isPublished: boolean("is_published").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
});
var platformPosts = pgTable("platform_posts", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id").notNull().references(() => users.id),
  authorType: varchar("author_type").notNull(),
  // creator, business, ministry, user
  authorId: integer("author_id"),
  // reference to specific profile (creator_id, business_id, ministry_id)
  title: varchar("title"),
  content: text("content").notNull(),
  mediaUrls: text("media_urls").array(),
  // Array of image/video URLs
  mediaType: varchar("media_type").notNull().default("image"),
  // image, video, text
  tags: text("tags").array(),
  // Array of hashtags
  isPublished: boolean("is_published").default(true),
  likesCount: integer("likes_count").default(0),
  commentsCount: integer("comments_count").default(0),
  sharesCount: integer("shares_count").default(0),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
});
var postInteractions = pgTable("post_interactions", {
  id: serial("id").primaryKey(),
  postId: integer("post_id").notNull().references(() => platformPosts.id),
  userId: varchar("user_id").notNull().references(() => users.id),
  type: varchar("type").notNull(),
  // like, comment, share
  content: text("content"),
  // For comments
  createdAt: timestamp("created_at").defaultNow()
});
var userFollows = pgTable("user_follows", {
  id: serial("id").primaryKey(),
  followerId: varchar("follower_id").notNull().references(() => users.id),
  followingId: varchar("following_id").notNull().references(() => users.id),
  createdAt: timestamp("created_at").defaultNow()
}, (table) => ({
  uniqueFollow: uniqueIndex("unique_user_follow").on(table.followerId, table.followingId)
}));
var businessFollows = pgTable("business_follows", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id").notNull().references(() => users.id),
  businessId: integer("business_id").notNull().references(() => businessProfiles.id),
  createdAt: timestamp("created_at").defaultNow()
}, (table) => ({
  uniqueFollow: uniqueIndex("unique_business_follow").on(table.userId, table.businessId)
}));
var ministryEvents = pgTable("ministry_events", {
  id: serial("id").primaryKey(),
  ministryId: integer("ministry_id").notNull().references(() => ministryProfiles.id),
  title: varchar("title").notNull(),
  description: text("description").notNull(),
  type: varchar("type").notNull(),
  // bible_study, service, mission, community_event, worship, prayer
  startDate: timestamp("start_date").notNull(),
  endDate: timestamp("end_date"),
  location: varchar("location"),
  address: text("address"),
  isOnline: boolean("is_online").default(false),
  onlineLink: varchar("online_link"),
  maxAttendees: integer("max_attendees"),
  currentAttendees: integer("current_attendees").default(0),
  isPublished: boolean("is_published").default(true),
  requiresRegistration: boolean("requires_registration").default(false),
  flyerImage: varchar("flyer_image"),
  // URL to uploaded flyer image
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
});
var ministryFollowers = pgTable("ministry_followers", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id").notNull().references(() => users.id),
  ministryId: integer("ministry_id").notNull().references(() => ministryProfiles.id),
  createdAt: timestamp("created_at").defaultNow()
}, (table) => ({
  uniqueFollower: uniqueIndex("unique_ministry_follower").on(table.userId, table.ministryId)
}));
var eventRegistrations = pgTable("event_registrations", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id").notNull().references(() => users.id),
  eventId: integer("event_id").notNull().references(() => ministryEvents.id),
  createdAt: timestamp("created_at").defaultNow()
}, (table) => ({
  uniqueRegistration: uniqueIndex("unique_event_registration").on(table.userId, table.eventId)
}));
var ministryPostRsvps = pgTable("ministry_post_rsvps", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id").notNull().references(() => users.id),
  postId: integer("post_id").notNull().references(() => ministryPosts.id),
  status: varchar("status").notNull().default("going"),
  // going, maybe, not_going
  notes: text("notes"),
  // Optional notes from user
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
}, (table) => ({
  uniqueRsvp: uniqueIndex("unique_ministry_post_rsvp").on(table.userId, table.postId)
}));
var contentCreatorsRelations = relations(contentCreators, ({ one, many }) => ({
  user: one(users, {
    fields: [contentCreators.userId],
    references: [users.id]
  }),
  posts: many(socialMediaPosts)
}));
var socialMediaPostsRelations = relations(socialMediaPosts, ({ one }) => ({
  creator: one(contentCreators, {
    fields: [socialMediaPosts.creatorId],
    references: [contentCreators.id]
  })
}));
var sponsorshipApplicationsRelations = relations(sponsorshipApplications, ({ one }) => ({
  user: one(users, {
    fields: [sponsorshipApplications.userId],
    references: [users.id]
  })
}));
var ministryProfilesRelations = relations(ministryProfiles, ({ one, many }) => ({
  user: one(users, {
    fields: [ministryProfiles.userId],
    references: [users.id]
  }),
  posts: many(ministryPosts),
  events: many(ministryEvents),
  followers: many(ministryFollowers)
}));
var ministryPostsRelations = relations(ministryPosts, ({ one }) => ({
  ministry: one(ministryProfiles, {
    fields: [ministryPosts.ministryId],
    references: [ministryProfiles.id]
  })
}));
var ministryEventsRelations = relations(ministryEvents, ({ one, many }) => ({
  ministry: one(ministryProfiles, {
    fields: [ministryEvents.ministryId],
    references: [ministryProfiles.id]
  }),
  registrations: many(eventRegistrations)
}));
var ministryFollowersRelations = relations(ministryFollowers, ({ one }) => ({
  user: one(users, {
    fields: [ministryFollowers.userId],
    references: [users.id]
  }),
  ministry: one(ministryProfiles, {
    fields: [ministryFollowers.ministryId],
    references: [ministryProfiles.id]
  })
}));
var eventRegistrationsRelations = relations(eventRegistrations, ({ one }) => ({
  user: one(users, {
    fields: [eventRegistrations.userId],
    references: [users.id]
  }),
  event: one(ministryEvents, {
    fields: [eventRegistrations.eventId],
    references: [ministryEvents.id]
  })
}));
var usersRelations = relations(users, ({ many, one }) => ({
  campaigns: many(campaigns),
  businessProfile: one(businessProfiles, {
    fields: [users.id],
    references: [businessProfiles.userId]
  }),
  contentCreator: one(contentCreators, {
    fields: [users.id],
    references: [contentCreators.userId]
  }),
  sponsorshipApplications: many(sponsorshipApplications),
  ministryProfile: one(ministryProfiles, {
    fields: [users.id],
    references: [ministryProfiles.userId]
  }),
  ministryFollowers: many(ministryFollowers),
  eventRegistrations: many(eventRegistrations),
  businessFollows: many(businessFollows),
  notifications: many(notifications)
}));
var businessFollowsRelations = relations(businessFollows, ({ one }) => ({
  user: one(users, {
    fields: [businessFollows.userId],
    references: [users.id]
  }),
  business: one(businessProfiles, {
    fields: [businessFollows.businessId],
    references: [businessProfiles.id]
  })
}));
var platformSchema = z.object({
  platform: z.string().min(1, "Please select a platform"),
  profileUrl: z.string().url("Please provide a valid profile URL"),
  subscriberCount: z.coerce.number().min(0, "Subscriber count must be 0 or greater").optional()
});
var insertContentCreatorSchema = createInsertSchema(contentCreators).omit({
  id: true,
  isSponsored: true,
  sponsorshipStartDate: true,
  sponsorshipEndDate: true,
  sponsorshipAmount: true,
  createdAt: true,
  updatedAt: true
}).extend({
  platforms: z.array(platformSchema).min(1, "Please add at least one platform")
});
var insertSponsorshipApplicationSchema = createInsertSchema(sponsorshipApplications).omit({ id: true, userId: true, status: true, reviewedAt: true, createdAt: true, updatedAt: true }).extend({
  platforms: z.array(platformSchema).min(1, "Please add at least one platform")
});
var insertSocialMediaPostSchema = createInsertSchema(socialMediaPosts).omit({ id: true, creatorId: true, createdAt: true });
var insertMinistryProfileSchema = createInsertSchema(ministryProfiles).omit({ id: true, userId: true, isActive: true, isVerified: true, createdAt: true, updatedAt: true }).extend({
  socialLinks: z.record(z.string().url()).optional()
});
var insertMinistryPostSchema = createInsertSchema(ministryPosts).omit({ id: true, ministryId: true, createdAt: true, updatedAt: true }).extend({
  mediaUrls: z.array(z.string().url()).optional(),
  links: z.array(z.object({
    title: z.string(),
    url: z.string().url()
  })).optional()
});
var insertMinistryEventSchema = createInsertSchema(ministryEvents).omit({ id: true, ministryId: true, currentAttendees: true, createdAt: true, updatedAt: true }).extend({
  startDate: z.coerce.date(),
  endDate: z.coerce.date().optional()
});
var notifications = pgTable("notifications", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id").references(() => users.id, { onDelete: "cascade" }).notNull(),
  type: varchar("type", {
    enum: ["like", "comment", "follow", "post", "rsvp", "campaign_update", "ministry_post", "chat_message", "direct_message"]
  }).notNull(),
  title: varchar("title").notNull(),
  message: text("message").notNull(),
  relatedId: varchar("related_id"),
  // ID of the related entity (post, comment, etc.)
  relatedType: varchar("related_type", {
    enum: ["platform_post", "ministry_post", "comment", "campaign", "user", "ministry", "group_chat", "chat_message", "direct_chat"]
  }),
  isRead: boolean("is_read").default(false),
  createdAt: timestamp("created_at").defaultNow(),
  // Optional metadata for rich notifications
  actorId: varchar("actor_id").references(() => users.id),
  // Who performed the action
  actorName: varchar("actor_name"),
  actorImage: varchar("actor_image")
});
var notificationsRelations = relations(notifications, ({ one }) => ({
  user: one(users, {
    fields: [notifications.userId],
    references: [users.id]
  }),
  actor: one(users, {
    fields: [notifications.actorId],
    references: [users.id]
  })
}));
var insertNotificationSchema = createInsertSchema(notifications).omit({ id: true, createdAt: true });
var insertMinistryPostRsvpSchema = createInsertSchema(ministryPostRsvps).omit({ id: true, userId: true, createdAt: true, updatedAt: true });
var insertPlatformPostSchema = createInsertSchema(platformPosts).omit({
  id: true,
  likesCount: true,
  commentsCount: true,
  sharesCount: true,
  createdAt: true,
  updatedAt: true
}).extend({
  tags: z.array(z.string()).optional(),
  mediaUrls: z.array(z.string().url()).optional()
});
var insertPostInteractionSchema = createInsertSchema(postInteractions).omit({
  id: true,
  createdAt: true
});
var groupChatQueues = pgTable("group_chat_queues", {
  id: serial("id").primaryKey(),
  creatorId: varchar("creator_id").notNull().references(() => users.id),
  title: varchar("title").notNull(),
  description: text("description"),
  intention: varchar("intention").notNull(),
  // prayer, bible_study, evangelizing, fellowship, etc.
  minPeople: integer("min_people").notNull().default(4),
  maxPeople: integer("max_people").notNull().default(12),
  currentCount: integer("current_count").notNull().default(1),
  // starts with creator
  status: varchar("status").notNull().default("waiting"),
  // waiting, active, completed, cancelled
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
});
var groupChats = pgTable("group_chats", {
  id: serial("id").primaryKey(),
  queueId: integer("queue_id").notNull().references(() => groupChatQueues.id),
  title: varchar("title").notNull(),
  description: text("description"),
  intention: varchar("intention").notNull(),
  memberCount: integer("member_count").notNull(),
  status: varchar("status").notNull().default("active"),
  // active, completed, archived
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
});
var groupChatMembers = pgTable("group_chat_members", {
  id: serial("id").primaryKey(),
  queueId: integer("queue_id").references(() => groupChatQueues.id),
  chatId: integer("chat_id").references(() => groupChats.id),
  userId: varchar("user_id").notNull().references(() => users.id),
  role: varchar("role").notNull().default("member"),
  // creator, member
  joinedAt: timestamp("joined_at").defaultNow()
});
var groupChatQueuesRelations = relations(groupChatQueues, ({ one, many }) => ({
  creator: one(users, {
    fields: [groupChatQueues.creatorId],
    references: [users.id]
  }),
  members: many(groupChatMembers),
  chat: one(groupChats)
}));
var groupChatsRelations = relations(groupChats, ({ one, many }) => ({
  queue: one(groupChatQueues, {
    fields: [groupChats.queueId],
    references: [groupChatQueues.id]
  }),
  members: many(groupChatMembers),
  messages: many(groupChatMessages)
}));
var groupChatMembersRelations = relations(groupChatMembers, ({ one }) => ({
  user: one(users, {
    fields: [groupChatMembers.userId],
    references: [users.id]
  }),
  queue: one(groupChatQueues, {
    fields: [groupChatMembers.queueId],
    references: [groupChatQueues.id]
  }),
  chat: one(groupChats, {
    fields: [groupChatMembers.chatId],
    references: [groupChats.id]
  })
}));
var groupChatMessages = pgTable("group_chat_messages", {
  id: serial("id").primaryKey(),
  chatId: integer("chat_id").notNull().references(() => groupChats.id, { onDelete: "cascade" }),
  userId: varchar("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  message: text("message").notNull(),
  type: varchar("type").notNull().default("message"),
  // message, prayer_request, system
  createdAt: timestamp("created_at").defaultNow()
});
var groupChatMessagesRelations = relations(groupChatMessages, ({ one }) => ({
  chat: one(groupChats, {
    fields: [groupChatMessages.chatId],
    references: [groupChats.id]
  }),
  user: one(users, {
    fields: [groupChatMessages.userId],
    references: [users.id]
  })
}));
var insertGroupChatQueueSchema = createInsertSchema(groupChatQueues).omit({ id: true, creatorId: true, currentCount: true, status: true, createdAt: true, updatedAt: true }).extend({
  minPeople: z.coerce.number().min(2).max(12),
  maxPeople: z.coerce.number().min(4).max(12)
});
var insertGroupChatMemberSchema = createInsertSchema(groupChatMembers).omit({ id: true, joinedAt: true });
var insertGroupChatMessageSchema = createInsertSchema(groupChatMessages).omit({ id: true, createdAt: true });
var directChats = pgTable("direct_chats", {
  id: serial("id").primaryKey(),
  user1Id: varchar("user1_id").notNull().references(() => users.id),
  user2Id: varchar("user2_id").notNull().references(() => users.id),
  lastMessageAt: timestamp("last_message_at").defaultNow(),
  createdAt: timestamp("created_at").defaultNow()
});
var directMessages = pgTable("direct_messages", {
  id: serial("id").primaryKey(),
  chatId: integer("chat_id").notNull().references(() => directChats.id, { onDelete: "cascade" }),
  senderId: varchar("sender_id").notNull().references(() => users.id),
  message: text("message").notNull(),
  readAt: timestamp("read_at"),
  createdAt: timestamp("created_at").defaultNow()
});
var directChatsRelations = relations(directChats, ({ one, many }) => ({
  user1: one(users, {
    fields: [directChats.user1Id],
    references: [users.id]
  }),
  user2: one(users, {
    fields: [directChats.user2Id],
    references: [users.id]
  }),
  messages: many(directMessages)
}));
var directMessagesRelations = relations(directMessages, ({ one }) => ({
  chat: one(directChats, {
    fields: [directMessages.chatId],
    references: [directChats.id]
  }),
  sender: one(users, {
    fields: [directMessages.senderId],
    references: [users.id]
  })
}));
var insertDirectMessageSchema = createInsertSchema(directMessages).omit({ id: true, createdAt: true });

// server/db.ts
import { Pool, neonConfig } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-serverless";
import ws from "ws";
neonConfig.webSocketConstructor = ws;
if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL must be set. Did you forget to provision a database?"
  );
}
var pool = new Pool({ connectionString: process.env.DATABASE_URL });
var db = drizzle({ client: pool, schema: schema_exports });

// server/storage.ts
import { eq, desc, and, ilike, sql, isNull } from "drizzle-orm";

// server/utils.ts
import slugify from "slugify";
async function generateSlug(title) {
  let slug = slugify(title, {
    lower: true,
    strict: true,
    trim: true
  });
  const existingCampaign = await storage.getCampaignBySlug(slug);
  if (existingCampaign) {
    const randomSuffix = Math.floor(Math.random() * 1e4);
    slug = `${slug}-${randomSuffix}`;
  }
  return slug;
}

// server/storage.ts
var DatabaseStorage = class {
  // User operations
  async getUser(id) {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }
  async getUserByUsername(username) {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || void 0;
  }
  async getUserByUsernameInsensitive(username) {
    const [user] = await db.select().from(users).where(ilike(users.username, username));
    return user || void 0;
  }
  async getUserByEmail(email) {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user || void 0;
  }
  async createUser(userData) {
    const [user] = await db.insert(users).values(userData).returning();
    return user;
  }
  async upsertUser(userData) {
    const [user] = await db.insert(users).values(userData).onConflictDoUpdate({
      target: users.id,
      set: {
        ...userData,
        updatedAt: /* @__PURE__ */ new Date()
      }
    }).returning();
    return user;
  }
  async updateUser(id, data) {
    const [updatedUser] = await db.update(users).set({ ...data, updatedAt: /* @__PURE__ */ new Date() }).where(eq(users.id, id)).returning();
    return updatedUser;
  }
  async updateUserPassword(userId, hashedPassword) {
    const [updatedUser] = await db.update(users).set({ password: hashedPassword, updatedAt: /* @__PURE__ */ new Date() }).where(eq(users.id, userId)).returning();
    return updatedUser;
  }
  async getUsersCount() {
    const result = await db.select({ count: sql`count(*)` }).from(users);
    return Number(result[0].count);
  }
  async getAllUsers() {
    return await db.select().from(users).orderBy(desc(users.createdAt));
  }
  async updateStripeCustomerId(userId, stripeCustomerId) {
    const [updatedUser] = await db.update(users).set({
      stripeCustomerId,
      updatedAt: /* @__PURE__ */ new Date()
    }).where(eq(users.id, userId)).returning();
    return updatedUser;
  }
  // Campaign operations
  async createCampaign(campaignData) {
    const slug = await generateSlug(campaignData.title);
    const [campaign] = await db.insert(campaigns).values({
      ...campaignData,
      slug,
      currentAmount: "0",
      isActive: true,
      status: "pending"
    }).returning();
    return campaign;
  }
  async getCampaign(id) {
    const [campaign] = await db.select().from(campaigns).where(eq(campaigns.id, id));
    return campaign;
  }
  async getCampaignBySlug(slug) {
    const [campaign] = await db.select().from(campaigns).where(eq(campaigns.slug, slug));
    return campaign;
  }
  async listCampaigns(limit = 100) {
    return await db.select().from(campaigns).where(and(eq(campaigns.isActive, true), eq(campaigns.status, "approved"))).orderBy(desc(campaigns.createdAt)).limit(limit);
  }
  async listPendingCampaigns() {
    return await db.select().from(campaigns).where(eq(campaigns.status, "pending")).orderBy(desc(campaigns.createdAt));
  }
  async searchCampaigns(query) {
    return await db.select().from(campaigns).where(
      and(
        eq(campaigns.isActive, true),
        ilike(campaigns.title, `%${query}%`)
      )
    ).orderBy(desc(campaigns.createdAt));
  }
  async updateCampaign(id, data) {
    const [updatedCampaign] = await db.update(campaigns).set({ ...data, updatedAt: /* @__PURE__ */ new Date() }).where(eq(campaigns.id, id)).returning();
    return updatedCampaign;
  }
  async getUserCampaigns(userId) {
    return await db.select().from(campaigns).where(eq(campaigns.userId, userId)).orderBy(desc(campaigns.createdAt));
  }
  async approveCampaign(id) {
    const [approvedCampaign] = await db.update(campaigns).set({ status: "approved", updatedAt: /* @__PURE__ */ new Date() }).where(eq(campaigns.id, id)).returning();
    return approvedCampaign;
  }
  async rejectCampaign(id) {
    const [rejectedCampaign] = await db.update(campaigns).set({ status: "rejected", updatedAt: /* @__PURE__ */ new Date() }).where(eq(campaigns.id, id)).returning();
    return rejectedCampaign;
  }
  async deleteCampaign(id) {
    await db.delete(campaigns).where(eq(campaigns.id, id));
  }
  // Donation operations
  async createDonation(donationData, stripePaymentId) {
    const [donation] = await db.insert(donations).values({
      ...donationData,
      stripePaymentId
    }).returning();
    return donation;
  }
  async updateDonationAmount(campaignId, amount) {
    const [campaign] = await db.select().from(campaigns).where(eq(campaigns.id, campaignId));
    if (!campaign) {
      throw new Error("Campaign not found");
    }
    const currentAmount = Number(campaign.currentAmount) || 0;
    const newAmount = currentAmount + amount;
    const [updatedCampaign] = await db.update(campaigns).set({
      currentAmount: newAmount.toString(),
      updatedAt: /* @__PURE__ */ new Date()
    }).where(eq(campaigns.id, campaignId)).returning();
    return updatedCampaign;
  }
  async getCampaignDonations(campaignId) {
    return await db.select().from(donations).where(eq(donations.campaignId, campaignId)).orderBy(desc(donations.createdAt));
  }
  async getUserDonations(userId) {
    return await db.select().from(donations).where(eq(donations.userId, userId)).orderBy(desc(donations.createdAt));
  }
  async getAllDonations() {
    return await db.select().from(donations).orderBy(desc(donations.createdAt));
  }
  // Business profile operations
  async createBusinessProfile(profileData) {
    const [profile] = await db.insert(businessProfiles).values(profileData).returning();
    return profile;
  }
  async getBusinessProfile(id) {
    const [profile] = await db.select().from(businessProfiles).leftJoin(membershipTiers, eq(businessProfiles.membershipTierId, membershipTiers.id)).where(eq(businessProfiles.id, id));
    if (!profile) return void 0;
    return {
      ...profile.business_profiles,
      membershipTier: profile.membership_tiers || null
    };
  }
  async getUserBusinessProfile(userId) {
    const [profile] = await db.select().from(businessProfiles).where(eq(businessProfiles.userId, userId));
    return profile;
  }
  async updateBusinessProfile(id, data) {
    const [updatedProfile] = await db.update(businessProfiles).set({ ...data, updatedAt: /* @__PURE__ */ new Date() }).where(eq(businessProfiles.id, id)).returning();
    return updatedProfile;
  }
  async deleteBusinessProfile(id) {
    await db.delete(businessProfiles).where(eq(businessProfiles.id, id));
  }
  async listBusinessProfiles() {
    return await db.select().from(businessProfiles).where(eq(businessProfiles.isActive, true)).orderBy(desc(businessProfiles.createdAt));
  }
  // Membership tier operations
  async getMembershipTier(id) {
    const [tier] = await db.select().from(membershipTiers).where(eq(membershipTiers.id, id));
    return tier;
  }
  async listMembershipTiers() {
    return await db.select().from(membershipTiers);
  }
  async updateBusinessProfileSubscription(id, subscriptionId) {
    const [updatedProfile] = await db.update(businessProfiles).set({
      stripeSubscriptionId: subscriptionId,
      isActive: true,
      updatedAt: /* @__PURE__ */ new Date()
    }).where(eq(businessProfiles.id, id)).returning();
    return updatedProfile;
  }
  // Content creator operations
  async createContentCreator(creatorData) {
    const [creator] = await db.insert(contentCreators).values(creatorData).returning();
    return creator;
  }
  async getContentCreator(id) {
    const [creator] = await db.select().from(contentCreators).where(eq(contentCreators.id, id));
    return creator;
  }
  async getUserContentCreator(userId) {
    const [creator] = await db.select().from(contentCreators).where(eq(contentCreators.userId, userId));
    return creator;
  }
  async updateContentCreator(id, data) {
    const [creator] = await db.update(contentCreators).set({
      ...data,
      updatedAt: /* @__PURE__ */ new Date()
    }).where(eq(contentCreators.id, id)).returning();
    return creator;
  }
  async listContentCreators(sponsoredOnly = false) {
    if (sponsoredOnly) {
      return await db.select().from(contentCreators).where(eq(contentCreators.isSponsored, true)).orderBy(desc(contentCreators.createdAt));
    }
    return await db.select().from(contentCreators).orderBy(desc(contentCreators.createdAt));
  }
  // Sponsorship application operations
  async createSponsorshipApplication(applicationData) {
    const [application] = await db.insert(sponsorshipApplications).values(applicationData).returning();
    return application;
  }
  async getSponsorshipApplication(id) {
    const [application] = await db.select().from(sponsorshipApplications).where(eq(sponsorshipApplications.id, id));
    return application;
  }
  async getUserSponsorshipApplications(userId) {
    return await db.select().from(sponsorshipApplications).where(eq(sponsorshipApplications.userId, userId));
  }
  async listSponsorshipApplications(status) {
    if (status) {
      return await db.select().from(sponsorshipApplications).where(eq(sponsorshipApplications.status, status)).orderBy(desc(sponsorshipApplications.createdAt));
    }
    return await db.select().from(sponsorshipApplications).orderBy(desc(sponsorshipApplications.createdAt));
  }
  async updateSponsorshipApplication(id, data) {
    const [application] = await db.update(sponsorshipApplications).set({
      ...data,
      updatedAt: /* @__PURE__ */ new Date()
    }).where(eq(sponsorshipApplications.id, id)).returning();
    return application;
  }
  // Social media post operations
  async createSocialMediaPost(postData) {
    const [post] = await db.insert(socialMediaPosts).values(postData).returning();
    return post;
  }
  async getSocialMediaPost(id) {
    const [post] = await db.select().from(socialMediaPosts).where(eq(socialMediaPosts.id, id));
    return post;
  }
  async getSocialMediaPostsByCreator(creatorId) {
    return await db.select().from(socialMediaPosts).where(eq(socialMediaPosts.creatorId, creatorId)).orderBy(desc(socialMediaPosts.postedAt));
  }
  async getVisibleSocialMediaPostsByCreator(creatorId) {
    return await db.select().from(socialMediaPosts).where(and(
      eq(socialMediaPosts.creatorId, creatorId),
      eq(socialMediaPosts.isVisibleOnProfile, true)
    )).orderBy(desc(socialMediaPosts.postedAt));
  }
  async clearCreatorPosts(creatorId) {
    await db.delete(socialMediaPosts).where(eq(socialMediaPosts.creatorId, creatorId));
  }
  async listSponsoredSocialMediaPosts() {
    return await db.select().from(socialMediaPosts).where(eq(socialMediaPosts.isSponsored, true)).orderBy(desc(socialMediaPosts.postedAt));
  }
  async updateSocialMediaPost(id, data) {
    const [post] = await db.update(socialMediaPosts).set(data).where(eq(socialMediaPosts.id, id)).returning();
    return post;
  }
  // Ministry operations
  async createMinistryProfile(profileData) {
    const [profile] = await db.insert(ministryProfiles).values(profileData).returning();
    return profile;
  }
  async getMinistry(id) {
    const [ministry] = await db.select().from(ministryProfiles).where(eq(ministryProfiles.id, id));
    return ministry;
  }
  async getUserMinistryProfile(userId) {
    const [profile] = await db.select().from(ministryProfiles).where(eq(ministryProfiles.userId, userId));
    return profile;
  }
  async updateMinistryProfile(id, data) {
    const [profile] = await db.update(ministryProfiles).set(data).where(eq(ministryProfiles.id, id)).returning();
    return profile;
  }
  async getAllMinistries() {
    return await db.select().from(ministryProfiles).where(eq(ministryProfiles.isActive, true)).orderBy(desc(ministryProfiles.createdAt));
  }
  async getPendingMinistries() {
    return await db.select().from(ministryProfiles).where(eq(ministryProfiles.isActive, false)).orderBy(desc(ministryProfiles.createdAt));
  }
  async deleteMinistryProfile(id) {
    await db.delete(ministryProfiles).where(eq(ministryProfiles.id, id));
  }
  // Ministry posts operations
  async createMinistryPost(postData) {
    const [post] = await db.insert(ministryPosts).values(postData).returning();
    return post;
  }
  async getMinistryPosts(ministryId) {
    return await db.select().from(ministryPosts).where(and(eq(ministryPosts.ministryId, ministryId), eq(ministryPosts.isPublished, true))).orderBy(desc(ministryPosts.createdAt));
  }
  async getMinistryPostById(postId) {
    const [result] = await db.select({
      id: ministryPosts.id,
      ministryId: ministryPosts.ministryId,
      title: ministryPosts.title,
      content: ministryPosts.content,
      type: ministryPosts.type,
      mediaUrls: ministryPosts.mediaUrls,
      links: ministryPosts.links,
      isPublished: ministryPosts.isPublished,
      createdAt: ministryPosts.createdAt,
      updatedAt: ministryPosts.updatedAt,
      ministry: {
        id: ministryProfiles.id,
        name: ministryProfiles.name,
        logo: ministryProfiles.logo,
        denomination: ministryProfiles.denomination
      }
    }).from(ministryPosts).leftJoin(ministryProfiles, eq(ministryPosts.ministryId, ministryProfiles.id)).where(and(eq(ministryPosts.id, postId), eq(ministryPosts.isPublished, true)));
    return result || void 0;
  }
  // Ministry events operations
  async createMinistryEvent(eventData) {
    const [event] = await db.insert(ministryEvents).values(eventData).returning();
    return event;
  }
  async getMinistryEvents(ministryId) {
    return await db.select().from(ministryEvents).where(and(eq(ministryEvents.ministryId, ministryId), eq(ministryEvents.isPublished, true))).orderBy(ministryEvents.startDate);
  }
  // Ministry followers operations
  async followMinistry(userId, ministryId) {
    await db.insert(ministryFollowers).values({ userId, ministryId }).onConflictDoNothing();
  }
  async unfollowMinistry(userId, ministryId) {
    await db.delete(ministryFollowers).where(and(eq(ministryFollowers.userId, userId), eq(ministryFollowers.ministryId, ministryId)));
  }
  async autoFollowChristCollectiveMinistry(userId) {
    const CHRIST_COLLECTIVE_MINISTRY_ID = 1;
    try {
      await db.insert(ministryFollowers).values({ userId, ministryId: CHRIST_COLLECTIVE_MINISTRY_ID }).onConflictDoNothing();
    } catch (error) {
      console.error("Failed to auto-follow Christ Collective Ministry:", error);
    }
  }
  async makeAllUsersFollowChristCollective() {
    const CHRIST_COLLECTIVE_MINISTRY_ID = 1;
    try {
      const usersNotFollowing = await db.select({ id: users.id }).from(users).leftJoin(
        ministryFollowers,
        and(
          eq(ministryFollowers.userId, users.id),
          eq(ministryFollowers.ministryId, CHRIST_COLLECTIVE_MINISTRY_ID)
        )
      ).where(isNull(ministryFollowers.id));
      if (usersNotFollowing.length > 0) {
        const followValues = usersNotFollowing.map((user) => ({
          userId: user.id,
          ministryId: CHRIST_COLLECTIVE_MINISTRY_ID
        }));
        await db.insert(ministryFollowers).values(followValues).onConflictDoNothing();
        console.log(`Auto-followed Christ Collective Ministry for ${followValues.length} users`);
      }
    } catch (error) {
      console.error("Failed to make all users follow Christ Collective:", error);
      throw error;
    }
  }
  // Ministry post RSVP operations
  async createOrUpdateRsvp(userId, postId, status, notes) {
    const [rsvp] = await db.insert(ministryPostRsvps).values({ userId, postId, status, notes }).onConflictDoUpdate({
      target: [ministryPostRsvps.userId, ministryPostRsvps.postId],
      set: { status, notes, updatedAt: /* @__PURE__ */ new Date() }
    }).returning();
    return rsvp;
  }
  async getRsvpByUserAndPost(userId, postId) {
    const [rsvp] = await db.select().from(ministryPostRsvps).where(and(eq(ministryPostRsvps.userId, userId), eq(ministryPostRsvps.postId, postId)));
    return rsvp;
  }
  async getRsvpsForPost(postId) {
    const result = await db.select({
      status: ministryPostRsvps.status,
      count: sql`count(*)::int`
    }).from(ministryPostRsvps).where(eq(ministryPostRsvps.postId, postId)).groupBy(ministryPostRsvps.status);
    return result;
  }
  async deleteRsvp(userId, postId) {
    await db.delete(ministryPostRsvps).where(and(eq(ministryPostRsvps.userId, userId), eq(ministryPostRsvps.postId, postId)));
  }
  async isUserFollowingMinistry(userId, ministryId) {
    const [result] = await db.select().from(ministryFollowers).where(and(eq(ministryFollowers.userId, userId), eq(ministryFollowers.ministryId, ministryId)));
    return !!result;
  }
  async getUserFollowedMinistries(userId) {
    return await db.select({
      id: ministryProfiles.id,
      userId: ministryProfiles.userId,
      name: ministryProfiles.name,
      description: ministryProfiles.description,
      denomination: ministryProfiles.denomination,
      website: ministryProfiles.website,
      logo: ministryProfiles.logo,
      location: ministryProfiles.location,
      address: ministryProfiles.address,
      phone: ministryProfiles.phone,
      email: ministryProfiles.email,
      socialLinks: ministryProfiles.socialLinks,
      isActive: ministryProfiles.isActive,
      isVerified: ministryProfiles.isVerified,
      createdAt: ministryProfiles.createdAt,
      updatedAt: ministryProfiles.updatedAt
    }).from(ministryProfiles).innerJoin(ministryFollowers, eq(ministryFollowers.ministryId, ministryProfiles.id)).where(eq(ministryFollowers.userId, userId)).orderBy(desc(ministryFollowers.createdAt));
  }
  async getMinistryFollowersCount(ministryId) {
    const result = await db.select({ count: sql`count(*)` }).from(ministryFollowers).where(eq(ministryFollowers.ministryId, ministryId));
    return Number(result[0].count);
  }
  async getMinistryFeedPosts(userId) {
    return await db.select({
      id: ministryPosts.id,
      ministryId: ministryPosts.ministryId,
      title: ministryPosts.title,
      content: ministryPosts.content,
      type: ministryPosts.type,
      mediaUrls: ministryPosts.mediaUrls,
      links: ministryPosts.links,
      isPublished: ministryPosts.isPublished,
      createdAt: ministryPosts.createdAt,
      updatedAt: ministryPosts.updatedAt,
      ministry: {
        id: ministryProfiles.id,
        name: ministryProfiles.name,
        logo: ministryProfiles.logo,
        denomination: ministryProfiles.denomination
      }
    }).from(ministryPosts).innerJoin(ministryFollowers, eq(ministryFollowers.ministryId, ministryPosts.ministryId)).innerJoin(ministryProfiles, eq(ministryProfiles.id, ministryPosts.ministryId)).where(and(
      eq(ministryFollowers.userId, userId),
      eq(ministryPosts.isPublished, true)
    )).orderBy(desc(ministryPosts.createdAt));
  }
  // Platform posts operations
  async createPlatformPost(postData) {
    const [post] = await db.insert(platformPosts).values(postData).returning();
    return post;
  }
  async getPlatformPost(id) {
    const [post] = await db.select().from(platformPosts).where(eq(platformPosts.id, id));
    return post;
  }
  async listPlatformPosts(limit = 50) {
    return await db.select().from(platformPosts).where(eq(platformPosts.isPublished, true)).orderBy(desc(platformPosts.createdAt)).limit(limit);
  }
  async getUserPlatformPosts(userId) {
    return await db.select().from(platformPosts).where(eq(platformPosts.userId, userId)).orderBy(desc(platformPosts.createdAt));
  }
  // Alias method for getUserPlatformPosts
  async getUserPosts(userId) {
    return this.getUserPlatformPosts(userId);
  }
  async updatePlatformPost(id, data) {
    const [post] = await db.update(platformPosts).set({ ...data, updatedAt: /* @__PURE__ */ new Date() }).where(eq(platformPosts.id, id)).returning();
    return post;
  }
  async deletePlatformPost(id) {
    await db.delete(platformPosts).where(eq(platformPosts.id, id));
  }
  // Post interaction operations
  async createPostInteraction(interactionData) {
    const [interaction] = await db.insert(postInteractions).values(interactionData).returning();
    return interaction;
  }
  async getPostInteractions(postId) {
    return await db.select().from(postInteractions).where(eq(postInteractions.postId, postId)).orderBy(desc(postInteractions.createdAt));
  }
  async getPostComments(postId) {
    return await db.select({
      id: postInteractions.id,
      postId: postInteractions.postId,
      userId: postInteractions.userId,
      type: postInteractions.type,
      content: postInteractions.content,
      createdAt: postInteractions.createdAt,
      user: {
        id: users.id,
        username: users.username,
        firstName: users.firstName,
        lastName: users.lastName,
        profileImageUrl: users.profileImageUrl
      }
    }).from(postInteractions).leftJoin(users, eq(postInteractions.userId, users.id)).where(and(
      eq(postInteractions.postId, postId),
      eq(postInteractions.type, "comment")
    )).orderBy(desc(postInteractions.createdAt));
  }
  async getUserPostInteraction(postId, userId, type) {
    const [interaction] = await db.select().from(postInteractions).where(and(
      eq(postInteractions.postId, postId),
      eq(postInteractions.userId, userId),
      eq(postInteractions.type, type)
    ));
    return interaction;
  }
  async deletePostInteraction(id) {
    await db.delete(postInteractions).where(eq(postInteractions.id, id));
  }
  async getPostComment(id) {
    const [comment] = await db.select().from(postInteractions).where(and(
      eq(postInteractions.id, id),
      eq(postInteractions.type, "comment")
    ));
    return comment;
  }
  async deletePostComment(id) {
    await db.delete(postInteractions).where(and(
      eq(postInteractions.id, id),
      eq(postInteractions.type, "comment")
    ));
  }
  // User follow operations
  async followUser(followerId, followingId) {
    const [follow] = await db.insert(userFollows).values({ followerId, followingId }).onConflictDoNothing().returning();
    if (follow) {
      await this.createNotificationForFollow(followerId, followingId);
    }
    return follow;
  }
  async unfollowUser(followerId, followingId) {
    await db.delete(userFollows).where(and(eq(userFollows.followerId, followerId), eq(userFollows.followingId, followingId)));
  }
  async isUserFollowing(followerId, followingId) {
    const [follow] = await db.select().from(userFollows).where(and(eq(userFollows.followerId, followerId), eq(userFollows.followingId, followingId)));
    return !!follow;
  }
  async getUserFollowers(userId) {
    return await db.select({
      id: users.id,
      email: users.email,
      firstName: users.firstName,
      lastName: users.lastName,
      profileImageUrl: users.profileImageUrl,
      stripeCustomerId: users.stripeCustomerId,
      isAdmin: users.isAdmin,
      createdAt: users.createdAt,
      updatedAt: users.updatedAt,
      bio: users.bio,
      location: users.location,
      phone: users.phone,
      username: users.username,
      password: users.password,
      userType: users.userType,
      showEmail: users.showEmail,
      showPhone: users.showPhone,
      showLocation: users.showLocation
    }).from(users).innerJoin(userFollows, eq(userFollows.followerId, users.id)).where(eq(userFollows.followingId, userId)).orderBy(desc(userFollows.createdAt));
  }
  async getUserFollowing(userId) {
    return await db.select({
      id: users.id,
      email: users.email,
      firstName: users.firstName,
      lastName: users.lastName,
      profileImageUrl: users.profileImageUrl,
      stripeCustomerId: users.stripeCustomerId,
      isAdmin: users.isAdmin,
      createdAt: users.createdAt,
      updatedAt: users.updatedAt,
      bio: users.bio,
      location: users.location,
      phone: users.phone,
      username: users.username,
      password: users.password,
      userType: users.userType,
      showEmail: users.showEmail,
      showPhone: users.showPhone,
      showLocation: users.showLocation
    }).from(users).innerJoin(userFollows, eq(userFollows.followingId, users.id)).where(eq(userFollows.followerId, userId)).orderBy(desc(userFollows.createdAt));
  }
  async getUserFollowersCount(userId) {
    const result = await db.select({ count: sql`count(*)` }).from(userFollows).where(eq(userFollows.followingId, userId));
    return Number(result[0].count);
  }
  async getUserFollowingCount(userId) {
    const result = await db.select({ count: sql`count(*)` }).from(userFollows).where(eq(userFollows.followerId, userId));
    return Number(result[0].count);
  }
  async getFollowedUsersPosts(userId, limit = 50) {
    return await db.select({
      id: platformPosts.id,
      userId: platformPosts.userId,
      createdAt: platformPosts.createdAt,
      updatedAt: platformPosts.updatedAt,
      title: platformPosts.title,
      content: platformPosts.content,
      authorType: platformPosts.authorType,
      authorId: platformPosts.authorId,
      mediaUrls: platformPosts.mediaUrls,
      mediaType: platformPosts.mediaType,
      tags: platformPosts.tags,
      isPublished: platformPosts.isPublished,
      likesCount: platformPosts.likesCount,
      commentsCount: platformPosts.commentsCount,
      sharesCount: platformPosts.sharesCount
    }).from(platformPosts).innerJoin(userFollows, eq(userFollows.followingId, platformPosts.userId)).where(and(eq(userFollows.followerId, userId), eq(platformPosts.isPublished, true))).orderBy(desc(platformPosts.createdAt)).limit(limit);
  }
  // Business follow operations
  async followBusiness(userId, businessId) {
    const [follow] = await db.insert(businessFollows).values({ userId, businessId }).onConflictDoNothing().returning();
    return follow;
  }
  async unfollowBusiness(userId, businessId) {
    await db.delete(businessFollows).where(and(
      eq(businessFollows.userId, userId),
      eq(businessFollows.businessId, businessId)
    ));
  }
  async isBusinessFollowing(userId, businessId) {
    const [follow] = await db.select().from(businessFollows).where(and(
      eq(businessFollows.userId, userId),
      eq(businessFollows.businessId, businessId)
    ));
    return !!follow;
  }
  // Notification operations
  async createNotification(notificationData) {
    const [notification] = await db.insert(notifications).values(notificationData).returning();
    return notification;
  }
  async getUserNotifications(userId, limit = 50) {
    return await db.select().from(notifications).where(eq(notifications.userId, userId)).orderBy(desc(notifications.createdAt)).limit(limit);
  }
  async markNotificationAsRead(id) {
    await db.update(notifications).set({ isRead: true }).where(eq(notifications.id, id));
  }
  async markAllNotificationsAsRead(userId) {
    await db.update(notifications).set({ isRead: true }).where(eq(notifications.userId, userId));
  }
  async deleteNotification(id) {
    await db.delete(notifications).where(eq(notifications.id, id));
  }
  async getUnreadNotificationCount(userId) {
    const result = await db.select({ count: sql`count(*)` }).from(notifications).where(and(
      eq(notifications.userId, userId),
      eq(notifications.isRead, false)
    ));
    return Number(result[0].count);
  }
  // Group chat operations
  async createGroupChatQueue(queueData) {
    const [queue] = await db.insert(groupChatQueues).values({
      ...queueData,
      currentCount: 1
      // Creator is first member
    }).returning();
    await db.insert(groupChatMembers).values({
      queueId: queue.id,
      userId: queueData.creatorId,
      role: "creator"
    });
    return queue;
  }
  async getGroupChatQueue(id) {
    const [queue] = await db.select().from(groupChatQueues).where(eq(groupChatQueues.id, id));
    return queue;
  }
  async listActiveQueues() {
    const queues = await db.select().from(groupChatQueues).where(eq(groupChatQueues.status, "waiting")).orderBy(desc(groupChatQueues.createdAt));
    const queuesWithMembers = await Promise.all(
      queues.map(async (queue) => {
        const members = await this.getQueueMembers(queue.id);
        return { ...queue, members };
      })
    );
    return queuesWithMembers;
  }
  async joinQueue(queueId, userId) {
    const existing = await db.select().from(groupChatMembers).where(and(
      eq(groupChatMembers.queueId, queueId),
      eq(groupChatMembers.userId, userId)
    ));
    if (existing.length > 0) return;
    const queue = await this.getGroupChatQueue(queueId);
    if (!queue || queue.currentCount >= queue.maxPeople) return;
    await db.insert(groupChatMembers).values({
      queueId,
      userId,
      role: "member"
    });
    const newCount = queue.currentCount + 1;
    await db.update(groupChatQueues).set({
      currentCount: newCount,
      updatedAt: /* @__PURE__ */ new Date()
    }).where(eq(groupChatQueues.id, queueId));
    if (newCount >= queue.minPeople) {
      await this.createGroupChatFromQueue(queueId);
    }
  }
  async leaveQueue(queueId, userId) {
    await db.delete(groupChatMembers).where(and(
      eq(groupChatMembers.queueId, queueId),
      eq(groupChatMembers.userId, userId)
    ));
    const queue = await this.getGroupChatQueue(queueId);
    if (queue) {
      await db.update(groupChatQueues).set({
        currentCount: Math.max(0, queue.currentCount - 1),
        updatedAt: /* @__PURE__ */ new Date()
      }).where(eq(groupChatQueues.id, queueId));
    }
  }
  async cancelQueue(queueId, userId) {
    const queue = await this.getGroupChatQueue(queueId);
    if (queue && queue.creatorId === userId) {
      await db.update(groupChatQueues).set({
        status: "cancelled",
        updatedAt: /* @__PURE__ */ new Date()
      }).where(eq(groupChatQueues.id, queueId));
      await db.delete(groupChatMembers).where(eq(groupChatMembers.queueId, queueId));
    }
  }
  async createGroupChatFromQueue(queueId) {
    const queue = await this.getGroupChatQueue(queueId);
    if (!queue) throw new Error("Queue not found");
    const [chat] = await db.insert(groupChats).values({
      queueId,
      title: queue.title,
      description: queue.description,
      intention: queue.intention,
      memberCount: queue.currentCount
    }).returning();
    await db.update(groupChatMembers).set({ chatId: chat.id }).where(eq(groupChatMembers.queueId, queueId));
    await db.update(groupChatQueues).set({
      status: "active",
      updatedAt: /* @__PURE__ */ new Date()
    }).where(eq(groupChatQueues.id, queueId));
    return chat;
  }
  async listActiveChats() {
    const chats = await db.select().from(groupChats).where(eq(groupChats.status, "active")).orderBy(desc(groupChats.createdAt));
    const chatsWithMembers = await Promise.all(
      chats.map(async (chat) => {
        const members = await this.getChatMembers(chat.id);
        return { ...chat, members };
      })
    );
    return chatsWithMembers;
  }
  async getUserGroupChats(userId) {
    return db.select({
      id: groupChats.id,
      queueId: groupChats.queueId,
      title: groupChats.title,
      description: groupChats.description,
      intention: groupChats.intention,
      memberCount: groupChats.memberCount,
      status: groupChats.status,
      createdAt: groupChats.createdAt,
      updatedAt: groupChats.updatedAt
    }).from(groupChats).innerJoin(groupChatMembers, eq(groupChats.id, groupChatMembers.chatId)).where(eq(groupChatMembers.userId, userId));
  }
  async getQueueMembers(queueId) {
    return db.select({
      id: users.id,
      email: users.email,
      firstName: users.firstName,
      lastName: users.lastName,
      displayName: users.displayName,
      profileImageUrl: users.profileImageUrl,
      stripeCustomerId: users.stripeCustomerId,
      isAdmin: users.isAdmin,
      createdAt: users.createdAt,
      updatedAt: users.updatedAt,
      bio: users.bio,
      location: users.location,
      phone: users.phone,
      username: users.username,
      password: users.password,
      userType: users.userType,
      showEmail: users.showEmail,
      showPhone: users.showPhone,
      showLocation: users.showLocation
    }).from(users).innerJoin(groupChatMembers, eq(users.id, groupChatMembers.userId)).where(eq(groupChatMembers.queueId, queueId));
  }
  async getGroupChatById(chatId) {
    const [chat] = await db.select().from(groupChats).where(eq(groupChats.id, chatId));
    return chat;
  }
  async getChatMembers(chatId) {
    return db.select({
      id: users.id,
      email: users.email,
      firstName: users.firstName,
      lastName: users.lastName,
      displayName: users.displayName,
      profileImageUrl: users.profileImageUrl,
      username: users.username,
      bio: users.bio,
      location: users.location,
      phone: users.phone,
      userType: users.userType,
      showEmail: users.showEmail,
      showPhone: users.showPhone,
      showLocation: users.showLocation,
      createdAt: users.createdAt,
      updatedAt: users.updatedAt,
      stripeCustomerId: users.stripeCustomerId,
      isAdmin: users.isAdmin,
      password: users.password
    }).from(users).innerJoin(groupChatMembers, eq(users.id, groupChatMembers.userId)).where(eq(groupChatMembers.chatId, chatId));
  }
  // Group chat message operations
  async createGroupChatMessage(messageData) {
    const [message] = await db.insert(groupChatMessages).values(messageData).returning();
    if (message) {
      await this.createNotificationForChatMessage(message.userId, message.chatId, message.message);
    }
    return message;
  }
  async getChatMessages(chatId) {
    return db.select({
      id: groupChatMessages.id,
      chatId: groupChatMessages.chatId,
      userId: groupChatMessages.userId,
      message: groupChatMessages.message,
      type: groupChatMessages.type,
      createdAt: groupChatMessages.createdAt,
      user: {
        id: users.id,
        firstName: users.firstName,
        lastName: users.lastName,
        displayName: users.displayName,
        profileImageUrl: users.profileImageUrl,
        username: users.username,
        email: users.email,
        bio: users.bio,
        location: users.location,
        phone: users.phone,
        userType: users.userType,
        showEmail: users.showEmail,
        showPhone: users.showPhone,
        showLocation: users.showLocation,
        createdAt: users.createdAt,
        updatedAt: users.updatedAt,
        stripeCustomerId: users.stripeCustomerId,
        isAdmin: users.isAdmin,
        password: users.password
      }
    }).from(groupChatMessages).innerJoin(users, eq(groupChatMessages.userId, users.id)).where(eq(groupChatMessages.chatId, chatId)).orderBy(groupChatMessages.createdAt);
  }
  async deleteGroupChatMessage(id) {
    await db.delete(groupChatMessages).where(eq(groupChatMessages.id, id));
  }
  // Notification helper functions
  async createNotificationForFollow(followerId, followingId) {
    const follower = await this.getUser(followerId);
    if (!follower) return;
    await this.createNotification({
      userId: followingId,
      type: "follow",
      title: "New Follower",
      message: `${follower.displayName || follower.firstName || follower.username} started following you`,
      relatedId: followerId,
      relatedType: "user",
      actorId: followerId,
      actorName: follower.displayName || follower.firstName || follower.username,
      actorImage: follower.profileImageUrl,
      isRead: false
    });
  }
  async createNotificationForLike(likerId, postId, postOwnerId) {
    if (likerId === postOwnerId) return;
    const liker = await this.getUser(likerId);
    if (!liker) return;
    await this.createNotification({
      userId: postOwnerId,
      type: "like",
      title: "Someone liked your post",
      message: `${liker.displayName || liker.firstName || liker.username} liked your post`,
      relatedId: postId.toString(),
      relatedType: "platform_post",
      actorId: likerId,
      actorName: liker.displayName || liker.firstName || liker.username,
      actorImage: liker.profileImageUrl,
      isRead: false
    });
  }
  async createNotificationForComment(commenterId, postId, postOwnerId, comment) {
    if (commenterId === postOwnerId) return;
    const commenter = await this.getUser(commenterId);
    if (!commenter) return;
    const truncatedComment = comment.length > 50 ? comment.slice(0, 50) + "..." : comment;
    await this.createNotification({
      userId: postOwnerId,
      type: "comment",
      title: "New comment on your post",
      message: `${commenter.displayName || commenter.firstName || commenter.username} commented: "${truncatedComment}"`,
      relatedId: postId.toString(),
      relatedType: "platform_post",
      actorId: commenterId,
      actorName: commenter.displayName || commenter.firstName || commenter.username,
      actorImage: commenter.profileImageUrl,
      isRead: false
    });
  }
  async createNotificationForChatMessage(senderId, chatId, message) {
    const chat = await this.getGroupChatById(chatId);
    if (!chat) return;
    const members = await this.getChatMembers(chatId);
    const sender = await this.getUser(senderId);
    if (!sender) return;
    for (const member of members) {
      if (member.id !== senderId) {
        const truncatedMessage = message.length > 50 ? message.slice(0, 50) + "..." : message;
        await this.createNotification({
          userId: member.id,
          type: "chat_message",
          title: `New message in ${chat.title}`,
          message: `${sender.displayName || sender.firstName || sender.username}: ${truncatedMessage}`,
          relatedId: chatId.toString(),
          relatedType: "group_chat",
          actorId: senderId,
          actorName: sender.displayName || sender.firstName || sender.username,
          actorImage: sender.profileImageUrl,
          isRead: false
        });
      }
    }
  }
  // Direct message operations
  async getOrCreateDirectChat(user1Id, user2Id) {
    const [firstUserId, secondUserId] = [user1Id, user2Id].sort();
    const existingChat = await db.select().from(directChats).where(
      and(
        eq(directChats.user1Id, firstUserId),
        eq(directChats.user2Id, secondUserId)
      )
    ).limit(1);
    if (existingChat.length > 0) {
      return existingChat[0];
    }
    const [newChat] = await db.insert(directChats).values({
      user1Id: firstUserId,
      user2Id: secondUserId
    }).returning();
    return newChat;
  }
  async getUserDirectChats(userId) {
    const chats = await db.select({
      id: directChats.id,
      user1Id: directChats.user1Id,
      user2Id: directChats.user2Id,
      lastMessageAt: directChats.lastMessageAt,
      createdAt: directChats.createdAt,
      otherUser: users
    }).from(directChats).leftJoin(
      users,
      sql`${users.id} = CASE WHEN ${directChats.user1Id} = ${userId} THEN ${directChats.user2Id} ELSE ${directChats.user1Id} END`
    ).where(
      sql`${directChats.user1Id} = ${userId} OR ${directChats.user2Id} = ${userId}`
    ).orderBy(desc(directChats.lastMessageAt));
    const chatsWithMessages = await Promise.all(
      chats.map(async (chat) => {
        const lastMessage = await db.select().from(directMessages).where(eq(directMessages.chatId, chat.id)).orderBy(desc(directMessages.createdAt)).limit(1);
        return {
          ...chat,
          lastMessage: lastMessage[0] || void 0
        };
      })
    );
    return chatsWithMessages;
  }
  async getDirectChatById(chatId, userId) {
    try {
      const chat = await db.select({
        id: directChats.id,
        user1Id: directChats.user1Id,
        user2Id: directChats.user2Id,
        lastMessageAt: directChats.lastMessageAt,
        createdAt: directChats.createdAt,
        otherUser: users
      }).from(directChats).leftJoin(
        users,
        sql`${users.id} = CASE WHEN ${directChats.user1Id} = ${userId} THEN ${directChats.user2Id} ELSE ${directChats.user1Id} END`
      ).where(
        and(
          eq(directChats.id, chatId),
          sql`${directChats.user1Id} = ${userId} OR ${directChats.user2Id} = ${userId}`
        )
      ).limit(1);
      return chat[0] || null;
    } catch (error) {
      console.error("Error fetching direct chat by ID:", error);
      throw error;
    }
  }
  async createDirectMessage(messageData) {
    const [message] = await db.insert(directMessages).values(messageData).returning();
    await db.update(directChats).set({ lastMessageAt: /* @__PURE__ */ new Date() }).where(eq(directChats.id, messageData.chatId));
    const chat = await db.select().from(directChats).where(eq(directChats.id, messageData.chatId)).limit(1);
    if (chat[0]) {
      const recipientId = chat[0].user1Id === messageData.senderId ? chat[0].user2Id : chat[0].user1Id;
      await this.createNotificationForDirectMessage(messageData.senderId, recipientId, messageData.message);
    }
    return message;
  }
  async getDirectChatMessages(chatId) {
    const messages = await db.select({
      id: directMessages.id,
      chatId: directMessages.chatId,
      senderId: directMessages.senderId,
      message: directMessages.message,
      readAt: directMessages.readAt,
      createdAt: directMessages.createdAt,
      sender: users
    }).from(directMessages).leftJoin(users, eq(directMessages.senderId, users.id)).where(eq(directMessages.chatId, chatId)).orderBy(directMessages.createdAt);
    return messages;
  }
  async markDirectMessageAsRead(messageId) {
    await db.update(directMessages).set({ readAt: /* @__PURE__ */ new Date() }).where(eq(directMessages.id, messageId));
  }
  async getUnreadDirectMessagesCount(userId) {
    const result = await db.select({ count: sql`count(*)` }).from(directMessages).leftJoin(directChats, eq(directMessages.chatId, directChats.id)).where(
      and(
        sql`${directChats.user1Id} = ${userId} OR ${directChats.user2Id} = ${userId}`,
        sql`${directMessages.senderId} != ${userId}`,
        isNull(directMessages.readAt)
      )
    );
    return result[0]?.count || 0;
  }
  async createNotificationForDirectMessage(senderId, recipientId, message) {
    const sender = await this.getUser(senderId);
    if (!sender) return;
    const truncatedMessage = message.length > 50 ? message.slice(0, 50) + "..." : message;
    await this.createNotification({
      userId: recipientId,
      type: "direct_message",
      title: "New direct message",
      message: `${sender.displayName || sender.firstName || sender.username}: ${truncatedMessage}`,
      relatedId: recipientId,
      relatedType: "direct_chat",
      actorId: senderId,
      actorName: sender.displayName || sender.firstName || sender.username,
      actorImage: sender.profileImageUrl,
      isRead: false
    });
  }
};
var storage = new DatabaseStorage();

// server/auth.ts
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import session from "express-session";
import { scrypt, randomBytes, timingSafeEqual } from "crypto";
import { promisify } from "util";
import createMemoryStore from "memorystore";
var scryptAsync = promisify(scrypt);
async function hashPassword(password) {
  const salt = randomBytes(16).toString("hex");
  const buf = await scryptAsync(password, salt, 64);
  return `${buf.toString("hex")}.${salt}`;
}
async function comparePasswords(supplied, stored) {
  const [hashed, salt] = stored.split(".");
  const hashedBuf = Buffer.from(hashed, "hex");
  const suppliedBuf = await scryptAsync(supplied, salt, 64);
  return timingSafeEqual(hashedBuf, suppliedBuf);
}
function setupAuth(app2) {
  const MemoryStore = createMemoryStore(session);
  const sessionSettings = {
    secret: process.env.SESSION_SECRET || "christ-collective-secret-2024",
    resave: true,
    // Force session save even if unmodified
    saveUninitialized: true,
    // Save uninitialized sessions
    rolling: true,
    // Reset expiration on each request
    store: new MemoryStore({
      checkPeriod: 864e5
      // prune expired entries every 24h
    }),
    cookie: {
      httpOnly: false,
      // Allow JavaScript access for debugging
      secure: false,
      // Set to true in production with HTTPS
      maxAge: 365 * 24 * 60 * 60 * 1e3,
      // 1 year - persistent until explicit logout
      sameSite: "lax",
      // Allow cross-site requests for better compatibility
      path: "/"
      // Ensure cookie is available for all paths
    }
  };
  app2.set("trust proxy", 1);
  app2.use(session(sessionSettings));
  app2.use(passport.initialize());
  app2.use(passport.session());
  passport.use(
    new LocalStrategy(async (username, password, done) => {
      if (!username) {
        return done(null, false);
      }
      let user = await storage.getUserByUsername(username);
      if (!user) {
        user = await storage.getUserByUsernameInsensitive(username);
      }
      if (!user) {
        user = await storage.getUserByEmail(username);
      }
      if (!user || !user.password || !await comparePasswords(password, user.password)) {
        return done(null, false);
      } else {
        return done(null, user);
      }
    })
  );
  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser(async (id, done) => {
    const user = await storage.getUser(id);
    done(null, user);
  });
  app2.post("/api/register", async (req, res, next) => {
    try {
      const { username, email, password, firstName, lastName, phone, userType } = req.body;
      if (!username || !password || !phone) {
        return res.status(400).json({ message: "Username, password, and phone number are required" });
      }
      const existingUser = await storage.getUserByUsername(username);
      if (existingUser) {
        return res.status(400).json({ message: "Username already exists" });
      }
      if (email) {
        const existingEmail = await storage.getUserByEmail(email);
        if (existingEmail) {
          return res.status(400).json({ message: "Email already exists" });
        }
      }
      const user = await storage.createUser({
        id: `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        username,
        email: email || null,
        password: await hashPassword(password),
        firstName: firstName || null,
        lastName: lastName || null,
        phone,
        userType: userType || null
      });
      await storage.autoFollowChristCollectiveMinistry(user.id);
      req.login(user, (err) => {
        if (err) return next(err);
        res.status(201).json({
          id: user.id,
          username: user.username,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          phone: user.phone,
          isAdmin: user.isAdmin
        });
      });
    } catch (error) {
      console.error("Registration error:", error);
      res.status(500).json({ message: "Registration failed" });
    }
  });
  app2.get("/api/login", (req, res) => {
    res.redirect("/auth");
  });
  app2.post("/api/login", (req, res, next) => {
    if (req.body.usernameOrEmail) {
      req.body.username = req.body.usernameOrEmail;
    }
    next();
  }, (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
      if (err) {
        console.error("Passport authentication error:", err);
        return res.status(500).json({ message: "Authentication error" });
      }
      if (!user) {
        console.log("Authentication failed for user:", req.body.username);
        return res.status(401).json({ message: "Incorrect password" });
      }
      req.logIn(user, (err2) => {
        if (err2) {
          console.error("Login error:", err2);
          return res.status(500).json({ message: "Login failed" });
        }
        const userData = user;
        res.status(200).json({
          id: userData.id,
          username: userData.username,
          email: userData.email,
          firstName: userData.firstName,
          lastName: userData.lastName,
          phone: userData.phone,
          isAdmin: userData.isAdmin
        });
      });
    })(req, res, next);
  });
  app2.get("/api/logout", (req, res, next) => {
    req.logout((err) => {
      if (err) return next(err);
      req.session.destroy((err2) => {
        if (err2) return next(err2);
        res.clearCookie("connect.sid");
        res.redirect("/");
      });
    });
  });
  app2.post("/api/logout", (req, res, next) => {
    req.logout((err) => {
      if (err) return next(err);
      req.session.destroy((err2) => {
        if (err2) return next(err2);
        res.clearCookie("connect.sid");
        res.status(200).json({ message: "Logged out successfully" });
      });
    });
  });
  app2.post("/api/reset-password", async (req, res) => {
    try {
      const { username, newPassword } = req.body;
      if (!username || !newPassword) {
        return res.status(400).json({ message: "Username and new password are required" });
      }
      let user = await storage.getUserByUsername(username);
      if (!user) {
        user = await storage.getUserByEmail(username);
      }
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      const hashedPassword = await hashPassword(newPassword);
      await storage.updateUserPassword(user.id, hashedPassword);
      res.json({ message: "Password reset successfully" });
    } catch (error) {
      console.error("Password reset error:", error);
      res.status(500).json({ message: "Password reset failed" });
    }
  });
  app2.get("/api/user", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    const sessionUser = req.user;
    try {
      const freshUser = await storage.getUser(sessionUser.id);
      if (!freshUser) {
        return res.sendStatus(404);
      }
      res.json({
        id: freshUser.id,
        username: freshUser.username,
        email: freshUser.email,
        firstName: freshUser.firstName,
        lastName: freshUser.lastName,
        phone: freshUser.phone,
        location: freshUser.location,
        bio: freshUser.bio,
        profileImageUrl: freshUser.profileImageUrl,
        isAdmin: freshUser.isAdmin,
        stripeCustomerId: freshUser.stripeCustomerId,
        createdAt: freshUser.createdAt,
        updatedAt: freshUser.updatedAt
      });
    } catch (error) {
      console.error("Error fetching fresh user data:", error);
      const user = req.user;
      res.json({
        id: user.id,
        username: user.username,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone,
        isAdmin: user.isAdmin
      });
    }
  });
}
var isAuthenticated = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  next();
};

// server/routes.ts
import { z as z2 } from "zod";
import Stripe from "stripe";
import multer from "multer";
import path from "path";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";

// server/youtube.ts
var YouTubeService = class {
  apiKey;
  baseUrl = "https://www.googleapis.com/youtube/v3";
  constructor() {
    if (!process.env.YOUTUBE_API_KEY) {
      throw new Error("YOUTUBE_API_KEY environment variable is required");
    }
    this.apiKey = process.env.YOUTUBE_API_KEY;
  }
  extractVideoId(url) {
    const regex = /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/;
    const match = url.match(regex);
    return match ? match[1] : null;
  }
  async getVideoData(videoUrl) {
    const videoId = this.extractVideoId(videoUrl);
    if (!videoId) {
      throw new Error("Invalid YouTube URL");
    }
    try {
      const response = await fetch(
        `${this.baseUrl}/videos?part=snippet,statistics,contentDetails&id=${videoId}&key=${this.apiKey}`
      );
      if (!response.ok) {
        throw new Error(`YouTube API error: ${response.status}`);
      }
      const data = await response.json();
      if (!data.items || data.items.length === 0) {
        return null;
      }
      const video = data.items[0];
      const snippet = video.snippet;
      const statistics = video.statistics;
      return {
        id: videoId,
        title: snippet.title,
        description: snippet.description,
        thumbnail: snippet.thumbnails.maxres?.url || snippet.thumbnails.high?.url || snippet.thumbnails.default.url,
        channelTitle: snippet.channelTitle,
        publishedAt: snippet.publishedAt,
        viewCount: statistics.viewCount || "0",
        likeCount: statistics.likeCount || "0",
        commentCount: statistics.commentCount || "0",
        duration: video.contentDetails.duration
      };
    } catch (error) {
      console.error("Error fetching YouTube data:", error);
      throw error;
    }
  }
  formatDuration(duration) {
    const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
    if (!match) return "0:00";
    const hours = match[1] ? parseInt(match[1].slice(0, -1)) : 0;
    const minutes = match[2] ? parseInt(match[2].slice(0, -1)) : 0;
    const seconds = match[3] ? parseInt(match[3].slice(0, -1)) : 0;
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    }
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  }
  async getChannelData(channelHandle) {
    try {
      const searchResponse = await fetch(
        `${this.baseUrl}/search?part=snippet&type=channel&q=${channelHandle}&key=${this.apiKey}`
      );
      if (!searchResponse.ok) {
        throw new Error(`YouTube API error: ${searchResponse.status}`);
      }
      const searchData = await searchResponse.json();
      if (!searchData.items || searchData.items.length === 0) {
        return null;
      }
      const channelId = searchData.items[0].id.channelId;
      const channelResponse = await fetch(
        `${this.baseUrl}/channels?part=snippet,statistics&id=${channelId}&key=${this.apiKey}`
      );
      if (!channelResponse.ok) {
        throw new Error(`YouTube API error: ${channelResponse.status}`);
      }
      const channelData = await channelResponse.json();
      if (!channelData.items || channelData.items.length === 0) {
        return null;
      }
      const channel = channelData.items[0];
      return {
        id: channel.id,
        title: channel.snippet.title,
        description: channel.snippet.description,
        thumbnail: channel.snippet.thumbnails.high?.url || channel.snippet.thumbnails.default?.url,
        subscriberCount: channel.statistics.subscriberCount || "0",
        videoCount: channel.statistics.videoCount || "0",
        viewCount: channel.statistics.viewCount || "0",
        customUrl: channel.snippet.customUrl || "",
        publishedAt: channel.snippet.publishedAt
      };
    } catch (error) {
      console.error("Error fetching YouTube channel data:", error);
      throw error;
    }
  }
  formatCount(count) {
    const num = parseInt(count);
    if (num >= 1e6) {
      return (num / 1e6).toFixed(1) + "M";
    }
    if (num >= 1e3) {
      return (num / 1e3).toFixed(1) + "K";
    }
    return num.toString();
  }
  async getChannelVideos(channelId, maxResults = 10) {
    try {
      const searchResponse = await fetch(
        `${this.baseUrl}/search?part=snippet&channelId=${channelId}&order=date&type=video&maxResults=${maxResults}&key=${this.apiKey}`
      );
      if (!searchResponse.ok) {
        throw new Error(`YouTube API error: ${searchResponse.status}`);
      }
      const searchData = await searchResponse.json();
      if (!searchData.items || searchData.items.length === 0) {
        return [];
      }
      const videoIds = searchData.items.map((item) => item.id.videoId).join(",");
      const videosResponse = await fetch(
        `${this.baseUrl}/videos?part=snippet,statistics,contentDetails&id=${videoIds}&key=${this.apiKey}`
      );
      if (!videosResponse.ok) {
        throw new Error(`YouTube API error: ${videosResponse.status}`);
      }
      const videosData = await videosResponse.json();
      return videosData.items.map((video) => ({
        id: video.id,
        title: video.snippet.title,
        description: video.snippet.description,
        thumbnail: video.snippet.thumbnails.maxres?.url || video.snippet.thumbnails.high?.url || video.snippet.thumbnails.default.url,
        channelTitle: video.snippet.channelTitle,
        publishedAt: video.snippet.publishedAt,
        viewCount: video.statistics.viewCount || "0",
        likeCount: video.statistics.likeCount || "0",
        commentCount: video.statistics.commentCount || "0",
        duration: video.contentDetails.duration
      }));
    } catch (error) {
      console.error("Error fetching channel videos:", error);
      throw error;
    }
  }
  async getChannelIdFromHandle(handle) {
    try {
      const searchResponse = await fetch(
        `${this.baseUrl}/search?part=snippet&type=channel&q=${handle}&key=${this.apiKey}`
      );
      if (!searchResponse.ok) {
        throw new Error(`YouTube API error: ${searchResponse.status}`);
      }
      const searchData = await searchResponse.json();
      if (!searchData.items || searchData.items.length === 0) {
        return null;
      }
      return searchData.items[0].id.channelId;
    } catch (error) {
      console.error("Error fetching channel ID:", error);
      return null;
    }
  }
};
var youtubeService = new YouTubeService();

// server/tiktok.ts
var TikTokService = class {
  apifyToken;
  apifyActorId = "clockworks~free-tiktok-scraper";
  constructor() {
    this.apifyToken = "";
  }
  getApiToken() {
    if (!this.apifyToken) {
      this.apifyToken = process.env.TIKTOK_API_KEY || "";
      if (!this.apifyToken) {
        console.warn("TIKTOK_API_KEY environment variable not provided - TikTok features will use sample data");
      }
    }
    return this.apifyToken;
  }
  extractUsername(url) {
    const patterns = [
      /tiktok\.com\/@([^\/\?]+)/,
      /tiktok\.com\/([^\/\?@]+)/,
      /vm\.tiktok\.com\/([^\/\?]+)/
    ];
    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match) return match[1];
    }
    return null;
  }
  async getUserData(username) {
    const token = this.getApiToken();
    if (!token) {
      return this.getSampleUserData(username);
    }
    try {
      const runResponse = await fetch(`https://api.apify.com/v2/acts/${this.apifyActorId}/runs`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          profiles: [`https://www.tiktok.com/@${username}`],
          resultsLimit: 1
        })
      });
      if (!runResponse.ok) {
        throw new Error(`Apify API error: ${runResponse.status}`);
      }
      const runData = await runResponse.json();
      const runId = runData.data.id;
      let attempts = 0;
      const maxAttempts = 10;
      while (attempts < maxAttempts) {
        await new Promise((resolve) => setTimeout(resolve, 1e3));
        const statusResponse = await fetch(`https://api.apify.com/v2/acts/${this.apifyActorId}/runs/${runId}`, {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });
        if (statusResponse.ok) {
          const statusData = await statusResponse.json();
          if (statusData.data.status === "SUCCEEDED") {
            const resultsResponse = await fetch(`https://api.apify.com/v2/acts/${this.apifyActorId}/runs/${runId}/dataset/items`, {
              headers: {
                "Authorization": `Bearer ${this.apifyToken}`
              }
            });
            if (resultsResponse.ok) {
              const results = await resultsResponse.json();
              if (results.length > 0) {
                const profile = results[0];
                return {
                  id: profile.id || username,
                  username: profile.uniqueId || username,
                  displayName: profile.nickname || username,
                  description: profile.signature || "",
                  avatar: profile.avatarLarger || "/placeholder-avatar.jpg",
                  followerCount: profile.followerCount?.toString() || "0",
                  followingCount: profile.followingCount?.toString() || "0",
                  videoCount: profile.videoCount?.toString() || "0",
                  likeCount: profile.heartCount?.toString() || "0",
                  verified: profile.verified || false
                };
              }
            }
            break;
          } else if (statusData.data.status === "FAILED") {
            throw new Error("Apify scraping failed");
          }
        }
        attempts++;
      }
      throw new Error("Timeout waiting for Apify results");
    } catch (error) {
      console.error("Error fetching TikTok user data from Apify:", error);
      return this.getSampleUserData(username);
    }
  }
  getSampleUserData(username) {
    if (username === "luislucero369") {
      return {
        id: "6924070655164253190",
        username: "luislucero369",
        displayName: "Luis Lucero \u2671",
        description: "CHRIST IS KING & he reigns over this page \u2671\nCheck out our YouTube channel\u2935\uFE0F",
        avatar: "https://ui-avatars.com/api/?name=Luis+Lucero&background=d4a574&color=000&size=100",
        followerCount: "56400",
        followingCount: "363",
        videoCount: "242",
        likeCount: "873100",
        verified: false
      };
    }
    return {
      id: "sample_id",
      username: username || "creator",
      displayName: "Faith Creator",
      description: "Spreading God's word through short-form content \u{1F64F} Biblical encouragement for the next generation",
      avatar: "/placeholder-avatar.jpg",
      followerCount: "8900",
      followingCount: "245",
      videoCount: "45",
      likeCount: "125000",
      verified: false
    };
  }
  formatCount(count) {
    const num = parseInt(count);
    if (num >= 1e6) {
      return (num / 1e6).toFixed(1) + "M";
    }
    if (num >= 1e3) {
      return (num / 1e3).toFixed(1) + "K";
    }
    return num.toString();
  }
  async getUserVideos(username, limit = 2) {
    const token = this.getApiToken();
    if (!token) {
      console.log("No TikTok API token available");
      return [];
    }
    console.log(`Fetching live TikTok videos for @${username} using Apify API...`);
    try {
      const runResponse = await fetch(`https://api.apify.com/v2/acts/${this.apifyActorId}/runs`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          profiles: [`https://www.tiktok.com/@${username}`],
          resultsLimit: limit,
          shouldDownloadVideos: false,
          shouldDownloadCovers: true
        })
      });
      if (!runResponse.ok) {
        const errorText = await runResponse.text();
        console.error(`Failed to start Apify actor for @${username}: ${runResponse.status} - ${errorText}`);
        return [];
      }
      const runData = await runResponse.json();
      const runId = runData.data.id;
      console.log(`Started TikTok scraping job ${runId} for @${username}`);
      const maxAttempts = 12;
      for (let attempt = 1; attempt <= maxAttempts; attempt++) {
        await new Promise((resolve) => setTimeout(resolve, 1e4));
        const statusResponse = await fetch(`https://api.apify.com/v2/acts/${this.apifyActorId}/runs/${runId}`, {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });
        if (statusResponse.ok) {
          const statusData = await statusResponse.json();
          console.log(`TikTok job ${runId} status (attempt ${attempt}): ${statusData.data.status}`);
          if (statusData.data.status === "SUCCEEDED") {
            const resultsResponse = await fetch(`https://api.apify.com/v2/acts/${this.apifyActorId}/runs/${runId}/dataset/items`, {
              headers: {
                "Authorization": `Bearer ${token}`
              }
            });
            if (resultsResponse.ok) {
              const results = await resultsResponse.json();
              console.log(`Retrieved ${results.length} live TikTok videos for @${username}`);
              if (results.length > 0) {
                const liveVideos = results.slice(0, limit).map((video, index2) => {
                  console.log(`Live TikTok video ${index2 + 1}:`, {
                    id: video.id,
                    text: video.text?.substring(0, 50),
                    playCount: video.playCount,
                    diggCount: video.diggCount
                  });
                  return {
                    id: video.id || `tiktok_${username}_${Date.now()}_${index2}`,
                    title: video.text || `TikTok Video by @${username}`,
                    description: video.text || "",
                    thumbnail: video.videoMeta?.coverUrl || video.covers?.[0] || `https://ui-avatars.com/api/?name=${username.charAt(0).toUpperCase()}&background=fe2c55&color=fff&size=400`,
                    username: video.authorMeta?.uniqueId || username,
                    displayName: video.authorMeta?.nickName || `@${username}`,
                    publishedAt: video.createTimeISO || (/* @__PURE__ */ new Date()).toISOString(),
                    viewCount: video.playCount?.toString() || "0",
                    likeCount: video.diggCount?.toString() || "0",
                    commentCount: video.commentCount?.toString() || "0",
                    shareCount: video.shareCount?.toString() || "0",
                    duration: this.formatDuration(video.videoMeta?.duration || 30)
                  };
                });
                console.log(`Successfully fetched ${liveVideos.length} authentic TikTok videos from @${username}`);
                return liveVideos;
              }
            }
            break;
          } else if (statusData.data.status === "FAILED") {
            console.error(`TikTok scraping job ${runId} failed for @${username}`);
            break;
          }
        }
      }
      console.warn(`TikTok scraping timed out for @${username} after ${maxAttempts} attempts`);
      return [];
    } catch (error) {
      console.error(`Error fetching TikTok videos for @${username}:`, error);
      return [];
    }
  }
  getSampleVideos(username, limit) {
    if (username === "luislucero369") {
      console.log("TikTok API is processing live data in the background. Current content may be cached.");
      return [
        {
          id: "processing_video1",
          title: "Loading Live TikTok Content...",
          description: "Fetching authentic TikTok videos from @luislucero369. This may take a moment as we retrieve real-time data.",
          thumbnail: "https://ui-avatars.com/api/?name=TT&background=fe2c55&color=fff&size=400",
          username: "luislucero369",
          displayName: "Luis Lucero \u2671",
          publishedAt: (/* @__PURE__ */ new Date()).toISOString(),
          viewCount: "Loading...",
          likeCount: "Loading...",
          commentCount: "Loading...",
          shareCount: "Loading...",
          duration: "--:--"
        }
      ].slice(0, limit);
    }
    return [];
  }
  formatDuration(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  }
};
var tiktokService = new TikTokService();

// server/instagram.ts
var InstagramService = class {
  apifyToken;
  apifyActorId = "apify~instagram-scraper";
  constructor() {
    this.apifyToken = "";
  }
  getApiToken() {
    if (!this.apifyToken) {
      this.apifyToken = process.env.TIKTOK_API_KEY || "";
      if (!this.apifyToken) {
        console.warn("TIKTOK_API_KEY environment variable not provided - Instagram features will use sample data");
      }
    }
    return this.apifyToken;
  }
  extractUsername(url) {
    const patterns = [
      /instagram\.com\/([^\/\?]+)/,
      /instagram\.com\/([^\/\?@]+)/
    ];
    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match) return match[1];
    }
    return null;
  }
  async getUserData(username) {
    if (username === "luislucero.03") {
      return {
        id: "58974569831",
        username: "luislucero.03",
        displayName: "Luis Lucero \u2671",
        description: "Christ is King \u271D\nFounder: @modernmedia.llc\nyoutu.be/jxGHJQXm5kY?si=p... and 2 more",
        avatar: "https://ui-avatars.com/api/?name=Luis+Lucero&background=d4a574&color=000&size=100",
        followerCount: "764",
        followingCount: "1002",
        postCount: "65",
        verified: false,
        isPrivate: false
      };
    }
    const token = this.getApiToken();
    if (!token) {
      return this.getSampleUserData(username);
    }
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5e3);
      const runResponse = await fetch(`https://api.apify.com/v2/acts/${this.apifyActorId}/runs`, {
        method: "POST",
        signal: controller.signal,
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          usernames: [username],
          resultsLimit: 1
        })
      });
      clearTimeout(timeoutId);
      if (!runResponse.ok) {
        throw new Error(`Apify API error: ${runResponse.status}`);
      }
      return this.getSampleUserData(username);
    } catch (error) {
      console.error("Error fetching Instagram user data from Apify:", error);
      return this.getSampleUserData(username);
    }
  }
  getSampleUserData(username) {
    if (username === "luislucero.03") {
      return {
        id: "58974569831",
        username: "luislucero.03",
        displayName: "Luis Lucero \u2671",
        description: "Christ is King \u271D\nFounder: @modernmedia.llc\nyoutu.be/jxGHJQXm5kY?si=p... and 2 more",
        avatar: "https://ui-avatars.com/api/?name=Luis+Lucero&background=d4a574&color=000&size=100",
        followerCount: "764",
        followingCount: "1002",
        postCount: "65",
        verified: false,
        isPrivate: false
      };
    }
    return {
      id: "sample_id",
      username: username || "creator",
      displayName: "Faith Creator",
      description: "Creating beautiful visual content with scripture and daily encouragement for believers.",
      avatar: "/placeholder-avatar.jpg",
      followerCount: "3500",
      followingCount: "245",
      postCount: "28",
      verified: false,
      isPrivate: false
    };
  }
  formatCount(count) {
    const num = parseInt(count);
    if (num >= 1e6) {
      return (num / 1e6).toFixed(1) + "M";
    }
    if (num >= 1e3) {
      return (num / 1e3).toFixed(1) + "K";
    }
    return num.toString();
  }
};
var instagramService = new InstagramService();

// server/emailService.ts
import nodemailer from "nodemailer";
var EmailService = class {
  transporter = null;
  constructor() {
    this.initializeTransporter();
  }
  async initializeTransporter() {
    try {
      const testAccount = await nodemailer.createTestAccount();
      this.transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false,
        // true for 465, false for other ports
        auth: {
          user: testAccount.user,
          pass: testAccount.pass
        }
      });
      console.log("Email service initialized with test account:", testAccount.user);
    } catch (error) {
      console.error("Failed to initialize email service:", error);
      this.transporter = nodemailer.createTransport({
        host: "localhost",
        port: 1025,
        secure: false,
        ignoreTLS: true
      });
    }
  }
  async sendDonationConfirmation(data) {
    try {
      if (!this.transporter) {
        console.error("Email transporter not initialized");
        return false;
      }
      const mailOptions = {
        from: '"Christ Collective" <luis@christcollective.info>',
        to: data.recipientEmail,
        subject: "Thank you for your donation to Christ Collective",
        html: this.generateDonationReceiptHTML(data),
        text: this.generateDonationReceiptText(data)
      };
      const info = await this.transporter.sendMail(mailOptions);
      console.log("Donation confirmation email sent:", info.messageId);
      if (info.response?.includes("ethereal")) {
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
      }
      return true;
    } catch (error) {
      console.error("Failed to send donation confirmation email:", error);
      return false;
    }
  }
  generateDonationReceiptHTML(data) {
    const { recipientName, donation, campaign } = data;
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Donation Receipt - Christ Collective</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #D4AF37; color: white; padding: 20px; text-align: center; }
          .content { padding: 20px; background: #f9f9f9; }
          .receipt-box { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
          .amount { font-size: 24px; font-weight: bold; color: #D4AF37; }
          .footer { text-align: center; color: #666; font-size: 12px; margin-top: 20px; }
          .divider { border-top: 1px solid #eee; margin: 15px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Thank You for Your Donation</h1>
            <p>Christ Collective</p>
          </div>
          
          <div class="content">
            <h2>Dear ${recipientName},</h2>
            <p>Thank you for your generous donation to support <strong>${campaign.title}</strong>. Your contribution makes a meaningful difference in advancing our mission of uniting Christians worldwide.</p>
            
            <div class="receipt-box">
              <h3>Donation Receipt</h3>
              <div class="divider"></div>
              
              <p><strong>Campaign:</strong> ${campaign.title}</p>
              <p><strong>Donation Amount:</strong> $${donation.amount.toFixed(2)}</p>
              ${donation.tip > 0 ? `<p><strong>Platform Tip:</strong> $${donation.tip.toFixed(2)}</p>` : ""}
              <div class="divider"></div>
              <p><strong>Total Amount:</strong> <span class="amount">$${donation.total.toFixed(2)}</span></p>
              <p><strong>Transaction ID:</strong> ${donation.transactionId}</p>
              <p><strong>Date:</strong> ${donation.date.toLocaleDateString()}</p>
            </div>
            
            <p>This email serves as your official donation receipt. Please keep this for your records.</p>
            
            <p>Your support helps us:</p>
            <ul>
              <li>Connect Christians across denominational boundaries</li>
              <li>Support business networking and growth</li>
              <li>Enable content creators to share their faith</li>
              <li>Fund community outreach and charitable initiatives</li>
            </ul>
            
            <p>If you have any questions about your donation, please contact us at luis@christcollective.info.</p>
            
            <p>Blessings,<br>The Christ Collective Team</p>
          </div>
          
          <div class="footer">
            <p>&copy; ${(/* @__PURE__ */ new Date()).getFullYear()} Christ Collective. All rights reserved.</p>
            <p>This is an automated message. Please do not reply to this email.</p>
          </div>
        </div>
      </body>
      </html>
    `;
  }
  generateDonationReceiptText(data) {
    const { recipientName, donation, campaign } = data;
    return `
Thank You for Your Donation - Christ Collective

Dear ${recipientName},

Thank you for your generous donation to support ${campaign.title}. Your contribution makes a meaningful difference in advancing our mission of uniting Christians worldwide.

DONATION RECEIPT
================

Campaign: ${campaign.title}
Donation Amount: $${donation.amount.toFixed(2)}
${donation.tip > 0 ? `Platform Tip: $${donation.tip.toFixed(2)}
` : ""}Total Amount: $${donation.total.toFixed(2)}
Transaction ID: ${donation.transactionId}
Date: ${donation.date.toLocaleDateString()}

This email serves as your official donation receipt. Please keep this for your records.

Your support helps us:
- Connect Christians across denominational boundaries
- Support business networking and growth
- Enable content creators to share their faith
- Fund community outreach and charitable initiatives

If you have any questions about your donation, please contact us at luis@christcollective.info.

Blessings,
The Christ Collective Team

--
\xA9 ${(/* @__PURE__ */ new Date()).getFullYear()} Christ Collective. All rights reserved.
This is an automated message. Please do not reply to this email.
    `;
  }
};
var emailService = new EmailService();

// server/routes.ts
if (!process.env.STRIPE_SECRET_KEY) {
  console.warn("Warning: Missing Stripe secret key. Stripe functionality will not work.");
}
var stripe;
try {
  if (process.env.STRIPE_SECRET_KEY) {
    stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: "2025-04-30.basil"
    });
  }
} catch (error) {
  console.error("Error initializing Stripe:", error);
}
async function registerRoutes(app2) {
  const uploadDir = path.join(process.cwd(), "public", "uploads");
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }
  const multerStorage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, uploadDir);
    },
    filename: function(req, file, cb) {
      const uniqueName = `${uuidv4()}${path.extname(file.originalname)}`;
      cb(null, uniqueName);
    }
  });
  const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image/") || file.mimetype.startsWith("video/")) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  };
  const upload = multer({
    storage: multerStorage,
    fileFilter,
    limits: {
      fileSize: 50 * 1024 * 1024
      // 50MB file size limit for videos
    }
  });
  app2.use("/uploads", express.static(uploadDir));
  app2.get("/favicon.png", (req, res) => {
    res.sendFile(path.resolve(process.cwd(), "public", "favicon.png"));
  });
  app2.get("/favicon.ico", (req, res) => {
    res.sendFile(path.resolve(process.cwd(), "public", "favicon.ico"));
  });
  setupAuth(app2);
  app2.get("/api/user", (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    res.json(req.user);
  });
  app2.put("/api/user/profile", isAuthenticated, async (req, res) => {
    try {
      const userId = req.user.id;
      const updateData = req.body;
      const validatedData = z2.object({
        bio: z2.string().optional(),
        profileImageUrl: z2.string().optional()
      }).parse(updateData);
      const updatedUser = await storage.updateUser(userId, validatedData);
      res.json(updatedUser);
    } catch (error) {
      console.error("Error updating user profile:", error);
      if (error instanceof z2.ZodError) {
        return res.status(400).json({ message: "Invalid data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to update profile" });
    }
  });
  app2.post("/api/upload/profile-image", isAuthenticated, upload.single("profileImage"), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }
      const imageUrl = `/uploads/${req.file.filename}`;
      res.json({ url: imageUrl });
    } catch (error) {
      console.error("Error uploading profile image:", error);
      res.status(500).json({ message: "Failed to upload image" });
    }
  });
  app2.get("/api/user/creator-status", isAuthenticated, async (req, res) => {
    try {
      const userId = req.user.id;
      const creator = await storage.getUserContentCreator(userId);
      if (!creator) {
        return res.json({ isCreator: false });
      }
      const posts = await storage.getSocialMediaPostsByCreator(creator.id);
      const platforms = creator.platforms || [];
      const totalFollowers = Array.isArray(platforms) ? platforms.reduce((sum, platform) => sum + (platform.subscriberCount || 0), 0) : 0;
      const enhancedCreator = {
        ...creator,
        posts,
        totalPosts: posts?.length || 0,
        totalFollowers,
        platformCount: Array.isArray(platforms) ? platforms.length : 0
      };
      res.json({
        isCreator: true,
        creatorProfile: enhancedCreator
      });
    } catch (error) {
      console.error("Error fetching creator status:", error);
      res.status(500).json({ message: "Failed to fetch creator status" });
    }
  });
  const isAdmin = async (req, res, next) => {
    try {
      if (!req.user || !req.user.isAdmin) {
        return res.status(403).json({ message: "Admin access required" });
      }
      next();
    } catch (error) {
      res.status(500).json({ message: "Error checking admin status" });
    }
  };
  app2.get("/api/admin/sponsorship-applications", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const applications = await storage.listSponsorshipApplications();
      res.json(applications);
    } catch (error) {
      console.error("Error fetching sponsorship applications:", error);
      res.status(500).json({ message: "Failed to fetch applications" });
    }
  });
  app2.post("/api/admin/sponsorship-applications/:id/approve", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const { id } = req.params;
      const applicationId = parseInt(id);
      if (isNaN(applicationId)) {
        return res.status(400).json({ message: "Invalid application ID" });
      }
      const application = await storage.getSponsorshipApplication(applicationId);
      if (!application) {
        return res.status(404).json({ message: "Application not found" });
      }
      const existingCreator = await storage.getUserContentCreator(application.userId);
      if (!existingCreator) {
        const newCreator = await storage.createContentCreator({
          name: application.name,
          platforms: application.platforms,
          content: application.content,
          audience: application.audience,
          bio: application.message,
          // Use their message as bio
          userId: application.userId
        });
        await storage.updateContentCreator(newCreator.id, {
          isSponsored: true,
          sponsorshipStartDate: /* @__PURE__ */ new Date()
        });
      } else {
        await storage.updateContentCreator(existingCreator.id, {
          isSponsored: true,
          sponsorshipStartDate: /* @__PURE__ */ new Date(),
          platforms: application.platforms,
          content: application.content,
          audience: application.audience
        });
      }
      const approvedApplication = await storage.updateSponsorshipApplication(applicationId, {
        status: "approved",
        reviewedAt: /* @__PURE__ */ new Date()
      });
      res.json(approvedApplication);
    } catch (error) {
      console.error("Error approving sponsorship application:", error);
      res.status(500).json({ message: "Failed to approve application" });
    }
  });
  app2.post("/api/admin/sponsorship-applications/:id/reject", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const { id } = req.params;
      const applicationId = parseInt(id);
      if (isNaN(applicationId)) {
        return res.status(400).json({ message: "Invalid application ID" });
      }
      const rejectedApplication = await storage.updateSponsorshipApplication(applicationId, {
        status: "rejected",
        reviewedAt: /* @__PURE__ */ new Date()
      });
      if (!rejectedApplication) {
        return res.status(404).json({ message: "Application not found" });
      }
      res.json(rejectedApplication);
    } catch (error) {
      console.error("Error rejecting sponsorship application:", error);
      res.status(500).json({ message: "Failed to reject application" });
    }
  });
  app2.get("/api/admin/campaigns", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const campaigns2 = await storage.listCampaigns();
      res.json(campaigns2);
    } catch (error) {
      console.error("Error fetching campaigns:", error);
      res.status(500).json({ message: "Failed to fetch campaigns" });
    }
  });
  app2.get("/api/admin/campaigns/pending", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const pendingCampaigns = await storage.listPendingCampaigns();
      res.json(pendingCampaigns);
    } catch (error) {
      console.error("Error fetching pending campaigns:", error);
      res.status(500).json({ message: "Failed to fetch pending campaigns" });
    }
  });
  app2.post("/api/admin/campaigns/:id/approve", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const { id } = req.params;
      const approvedCampaign = await storage.approveCampaign(id);
      res.json(approvedCampaign);
    } catch (error) {
      console.error("Error approving campaign:", error);
      res.status(500).json({ message: "Failed to approve campaign" });
    }
  });
  app2.post("/api/admin/campaigns/:id/reject", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const { id } = req.params;
      const rejectedCampaign = await storage.rejectCampaign(id);
      res.json(rejectedCampaign);
    } catch (error) {
      console.error("Error rejecting campaign:", error);
      res.status(500).json({ message: "Failed to reject campaign" });
    }
  });
  app2.delete("/api/admin/campaigns/:id", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const { id } = req.params;
      await storage.deleteCampaign(id);
      res.json({ message: "Campaign deleted successfully" });
    } catch (error) {
      console.error("Error deleting campaign:", error);
      res.status(500).json({ message: "Failed to delete campaign" });
    }
  });
  app2.get("/api/admin/business-profiles", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const profiles = await storage.listBusinessProfiles();
      res.json(profiles);
    } catch (error) {
      console.error("Error fetching business profiles:", error);
      res.status(500).json({ message: "Failed to fetch business profiles" });
    }
  });
  app2.get("/api/content-creators", async (req, res) => {
    try {
      const { sponsored } = req.query;
      const sponsoredOnly = sponsored === "true";
      const creators = await storage.listContentCreators(sponsoredOnly);
      res.json(creators);
    } catch (error) {
      console.error("Error fetching content creators:", error);
      res.status(500).json({ message: "Failed to fetch content creators" });
    }
  });
  app2.get("/api/content-creators/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const creatorId = parseInt(id);
      if (isNaN(creatorId)) {
        return res.status(400).json({ message: "Invalid creator ID" });
      }
      const creator = await storage.getContentCreator(creatorId);
      if (!creator) {
        return res.status(404).json({ message: "Creator not found" });
      }
      const posts = await storage.getVisibleSocialMediaPostsByCreator(creatorId);
      const totalFollowers = await storage.getUserFollowersCount(creator.userId);
      res.json({ ...creator, posts, totalFollowers });
    } catch (error) {
      console.error("Error fetching content creator:", error);
      res.status(500).json({ message: "Failed to fetch content creator" });
    }
  });
  app2.put("/api/social-media-posts/:id/visibility", isAuthenticated, async (req, res) => {
    try {
      const { id } = req.params;
      const postId = parseInt(id);
      const { isVisibleOnProfile } = req.body;
      const userId = req.user.id;
      if (isNaN(postId)) {
        return res.status(400).json({ message: "Invalid post ID" });
      }
      const post = await storage.getSocialMediaPost(postId);
      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }
      const creator = await storage.getContentCreator(post.creatorId);
      if (!creator || creator.userId !== userId && !req.user.isAdmin) {
        return res.status(403).json({ message: "Access denied" });
      }
      const updatedPost = await storage.updateSocialMediaPost(postId, {
        isVisibleOnProfile: Boolean(isVisibleOnProfile)
      });
      res.json(updatedPost);
    } catch (error) {
      console.error("Error updating post visibility:", error);
      res.status(500).json({ message: "Failed to update post visibility" });
    }
  });
  app2.put("/api/content-creators/:id", isAuthenticated, async (req, res) => {
    try {
      const { id } = req.params;
      const creatorId = parseInt(id);
      const userId = req.user.id;
      if (isNaN(creatorId)) {
        return res.status(400).json({ message: "Invalid creator ID" });
      }
      const existingCreator = await storage.getContentCreator(creatorId);
      if (!existingCreator) {
        return res.status(404).json({ message: "Creator not found" });
      }
      if (existingCreator.userId !== userId && !req.user.isAdmin) {
        return res.status(403).json({ message: "Access denied" });
      }
      const updateData = insertContentCreatorSchema.partial().parse(req.body);
      const updatedCreator = await storage.updateContentCreator(creatorId, {
        ...updateData,
        updatedAt: /* @__PURE__ */ new Date()
      });
      res.json(updatedCreator);
    } catch (error) {
      console.error("Error updating content creator:", error);
      if (error instanceof z2.ZodError) {
        return res.status(400).json({
          message: "Invalid data",
          errors: error.errors
        });
      }
      res.status(500).json({ message: "Failed to update creator profile" });
    }
  });
  app2.get("/api/users/:userId/content-creator", isAuthenticated, async (req, res) => {
    try {
      const { userId } = req.params;
      if (req.user.claims.sub !== userId && !req.user.claims.email?.includes("admin")) {
        return res.status(403).json({ message: "Access denied" });
      }
      const creator = await storage.getUserContentCreator(userId);
      if (!creator) {
        return res.status(404).json({ message: "Creator profile not found" });
      }
      const posts = await storage.getSocialMediaPostsByCreator(creator.id);
      res.json({ ...creator, posts });
    } catch (error) {
      console.error("Error fetching user content creator:", error);
      res.status(500).json({ message: "Failed to fetch creator profile" });
    }
  });
  app2.get("/api/social-media-posts/creator/:id", isAuthenticated, async (req, res) => {
    try {
      const { id } = req.params;
      const creatorId = parseInt(id);
      const userId = req.user.id;
      if (isNaN(creatorId)) {
        return res.status(400).json({ message: "Invalid creator ID" });
      }
      const creator = await storage.getContentCreator(creatorId);
      if (!creator || creator.userId !== userId && !req.user.isAdmin) {
        return res.status(403).json({ message: "Access denied" });
      }
      const posts = await storage.getSocialMediaPostsByCreator(creatorId);
      res.json(posts);
    } catch (error) {
      console.error("Error fetching creator posts:", error);
      res.status(500).json({ message: "Failed to fetch posts" });
    }
  });
  app2.post("/api/platform-posts", isAuthenticated, async (req, res) => {
    try {
      const { authorType, authorId, title, content, mediaUrls, mediaType, tags } = req.body;
      const userId = req.user.id;
      if (!content) {
        return res.status(400).json({ message: "Content is required" });
      }
      if (authorType === "creator" && authorId) {
        const creator = await storage.getContentCreator(authorId);
        if (!creator || creator.userId !== userId) {
          return res.status(403).json({ message: "Access denied: You don't own this creator profile" });
        }
      } else if (authorType === "business" && authorId) {
        const business = await storage.getBusinessProfile(authorId);
        if (!business || business.userId !== userId) {
          return res.status(403).json({ message: "Access denied: You don't own this business profile" });
        }
      } else if (authorType === "ministry" && authorId) {
        const ministry = await storage.getUserMinistryProfile(userId);
        if (!ministry || ministry.id !== authorId) {
          return res.status(403).json({ message: "Access denied: You don't own this ministry profile" });
        }
      }
      const post = await storage.createPlatformPost({
        userId,
        authorType,
        authorId,
        title,
        content,
        mediaUrls: mediaUrls || [],
        mediaType: mediaType || "image",
        tags: tags || [],
        isPublished: true
      });
      res.status(201).json(post);
    } catch (error) {
      console.error("Error creating platform post:", error);
      res.status(500).json({ message: "Failed to create post" });
    }
  });
  app2.get("/api/platform-posts", async (req, res) => {
    try {
      const limit = parseInt(req.query.limit) || 50;
      const posts = await storage.listPlatformPosts(limit);
      res.json(posts);
    } catch (error) {
      console.error("Error fetching platform posts:", error);
      res.status(500).json({ message: "Failed to fetch posts" });
    }
  });
  app2.get("/api/platform-posts/user/:userId", isAuthenticated, async (req, res) => {
    try {
      const { userId } = req.params;
      const currentUserId = req.user.id;
      if (userId !== currentUserId && !req.user.isAdmin) {
        return res.status(403).json({ message: "Access denied" });
      }
      const posts = await storage.getUserPlatformPosts(userId);
      res.json(posts);
    } catch (error) {
      console.error("Error fetching user platform posts:", error);
      res.status(500).json({ message: "Failed to fetch posts" });
    }
  });
  app2.get("/api/platform-posts/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const postId = parseInt(id);
      if (isNaN(postId)) {
        return res.status(400).json({ message: "Invalid post ID" });
      }
      const post = await storage.getPlatformPost(postId);
      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }
      res.json(post);
    } catch (error) {
      console.error("Error fetching platform post:", error);
      res.status(500).json({ message: "Failed to fetch post" });
    }
  });
  app2.put("/api/platform-posts/:id", isAuthenticated, async (req, res) => {
    try {
      const { id } = req.params;
      const postId = parseInt(id);
      const userId = req.user.id;
      if (isNaN(postId)) {
        return res.status(400).json({ message: "Invalid post ID" });
      }
      const post = await storage.getPlatformPost(postId);
      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }
      if (post.userId !== userId && !req.user.isAdmin) {
        return res.status(403).json({ message: "Access denied" });
      }
      const updatedPost = await storage.updatePlatformPost(postId, req.body);
      res.json(updatedPost);
    } catch (error) {
      console.error("Error updating platform post:", error);
      res.status(500).json({ message: "Failed to update post" });
    }
  });
  app2.delete("/api/platform-posts/:id", isAuthenticated, async (req, res) => {
    try {
      const { id } = req.params;
      const postId = parseInt(id);
      const userId = req.user.id;
      if (isNaN(postId)) {
        return res.status(400).json({ message: "Invalid post ID" });
      }
      const post = await storage.getPlatformPost(postId);
      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }
      if (post.userId !== userId && !req.user.isAdmin) {
        return res.status(403).json({ message: "Access denied" });
      }
      await storage.deletePlatformPost(postId);
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting platform post:", error);
      res.status(500).json({ message: "Failed to delete post" });
    }
  });
  app2.post("/api/platform-posts/:id/like", isAuthenticated, async (req, res) => {
    try {
      const { id } = req.params;
      const postId = parseInt(id);
      const userId = req.user.id;
      if (isNaN(postId)) {
        return res.status(400).json({ message: "Invalid post ID" });
      }
      const post = await storage.getPlatformPost(postId);
      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }
      const existingLike = await storage.getUserPostInteraction(postId, userId, "like");
      if (existingLike) {
        await storage.deletePostInteraction(existingLike.id);
        await storage.updatePlatformPost(postId, {
          likesCount: Math.max(0, (post.likesCount || 0) - 1)
        });
        res.json({ liked: false, likesCount: Math.max(0, (post.likesCount || 0) - 1) });
      } else {
        await storage.createPostInteraction({
          postId,
          userId,
          type: "like"
        });
        await storage.updatePlatformPost(postId, {
          likesCount: (post.likesCount || 0) + 1
        });
        await storage.createNotificationForLike(userId, postId, post.userId);
        res.json({ liked: true, likesCount: (post.likesCount || 0) + 1 });
      }
    } catch (error) {
      console.error("Error toggling post like:", error);
      res.status(500).json({ message: "Failed to toggle like" });
    }
  });
  app2.post("/api/platform-posts/:id/comment", isAuthenticated, async (req, res) => {
    try {
      const { id } = req.params;
      const postId = parseInt(id);
      const userId = req.user.id;
      const { content } = req.body;
      if (isNaN(postId)) {
        return res.status(400).json({ message: "Invalid post ID" });
      }
      if (!content || content.trim().length === 0) {
        return res.status(400).json({ message: "Comment content is required" });
      }
      const post = await storage.getPlatformPost(postId);
      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }
      const comment = await storage.createPostInteraction({
        postId,
        userId,
        type: "comment",
        content: content.trim()
      });
      await storage.updatePlatformPost(postId, {
        commentsCount: (post.commentsCount || 0) + 1
      });
      await storage.createNotificationForComment(userId, postId, post.userId, content.trim());
      res.status(201).json(comment);
    } catch (error) {
      console.error("Error adding comment:", error);
      res.status(500).json({ message: "Failed to add comment" });
    }
  });
  app2.get("/api/platform-posts/:id/interactions", async (req, res) => {
    try {
      const { id } = req.params;
      const postId = parseInt(id);
      if (isNaN(postId)) {
        return res.status(400).json({ message: "Invalid post ID" });
      }
      const interactions = await storage.getPostInteractions(postId);
      res.json(interactions);
    } catch (error) {
      console.error("Error fetching post interactions:", error);
      res.status(500).json({ message: "Failed to fetch interactions" });
    }
  });
  app2.delete("/api/platform-posts/:id", isAuthenticated, async (req, res) => {
    try {
      const { id } = req.params;
      const postId = parseInt(id);
      const userId = req.user.id;
      if (isNaN(postId)) {
        return res.status(400).json({ message: "Invalid post ID" });
      }
      const post = await storage.getPlatformPost(postId);
      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }
      if (post.userId !== userId) {
        return res.status(403).json({ message: "Not authorized to delete this post" });
      }
      await storage.deletePlatformPost(postId);
      res.json({ message: "Post deleted successfully" });
    } catch (error) {
      console.error("Error deleting platform post:", error);
      res.status(500).json({ message: "Failed to delete post" });
    }
  });
  app2.delete("/api/comments/:id", isAuthenticated, async (req, res) => {
    try {
      const { id } = req.params;
      const commentId = parseInt(id);
      const userId = req.user.id;
      if (isNaN(commentId)) {
        return res.status(400).json({ message: "Invalid comment ID" });
      }
      const comment = await storage.getPostComment(commentId);
      if (!comment) {
        return res.status(404).json({ message: "Comment not found" });
      }
      if (comment.userId !== userId) {
        return res.status(403).json({ message: "Not authorized to delete this comment" });
      }
      const post = await storage.getPlatformPost(comment.postId);
      if (post) {
        await storage.updatePlatformPost(comment.postId, {
          commentsCount: Math.max((post.commentsCount || 1) - 1, 0)
        });
      }
      await storage.deletePostComment(commentId);
      res.json({ message: "Comment deleted successfully" });
    } catch (error) {
      console.error("Error deleting comment:", error);
      res.status(500).json({ message: "Failed to delete comment" });
    }
  });
  app2.get("/api/platform-posts/:id/comments", async (req, res) => {
    try {
      const { id } = req.params;
      const postId = parseInt(id);
      if (isNaN(postId)) {
        return res.status(400).json({ message: "Invalid post ID" });
      }
      const comments = await storage.getPostComments(postId);
      res.json(comments);
    } catch (error) {
      console.error("Error fetching post comments:", error);
      res.status(500).json({ message: "Failed to fetch comments" });
    }
  });
  app2.post("/api/upload", isAuthenticated, (req, res, next) => {
    const uploadFields = upload.fields([
      { name: "image", maxCount: 1 },
      { name: "video", maxCount: 1 },
      { name: "file", maxCount: 1 }
    ]);
    uploadFields(req, res, (err) => {
      if (err) {
        console.error("Upload error:", err);
        return res.status(400).json({ message: err.message || "Error uploading file" });
      }
      next();
    });
  }, async (req, res) => {
    try {
      const files = req.files;
      if (!files || (!files.image || files.image.length === 0) && (!files.video || files.video.length === 0) && (!files.file || files.file.length === 0)) {
        return res.status(400).json({ message: "No file uploaded" });
      }
      const file = files.image ? files.image[0] : files.video ? files.video[0] : files.file[0];
      const fileUrl = `/uploads/${file.filename}`;
      res.status(200).json({
        url: fileUrl,
        filename: file.filename,
        fileType: files.image ? "image" : files.video ? "video" : "file",
        success: true
      });
    } catch (error) {
      console.error("Error processing uploaded file:", error);
      res.status(500).json({ message: "Failed to process uploaded file" });
    }
  });
  app2.get("/api/user/ministry-profile", isAuthenticated, async (req, res) => {
    try {
      const userId = req.user.id;
      const profile = await storage.getUserMinistryProfile(userId);
      if (!profile) {
        return res.status(404).json({ message: "Ministry profile not found" });
      }
      res.json(profile);
    } catch (error) {
      console.error("Error fetching ministry profile:", error);
      res.status(500).json({ message: "Failed to fetch ministry profile" });
    }
  });
  app2.put("/api/user/profile", isAuthenticated, async (req, res) => {
    try {
      const userId = req.user.id;
      const updateData = req.body;
      if (updateData.username) {
        const currentUser = await storage.getUser(userId);
        if (currentUser && updateData.username !== currentUser.username) {
          const existingUser = await storage.getUserByUsername(updateData.username);
          if (existingUser) {
            return res.status(400).json({
              message: "Username already taken",
              field: "username"
            });
          }
        }
      }
      const user = await storage.updateUser(userId, updateData);
      res.json(user);
    } catch (error) {
      console.error("Error updating user profile:", error);
      res.status(500).json({ message: "Failed to update profile" });
    }
  });
  app2.put("/api/user/privacy-settings", isAuthenticated, async (req, res) => {
    try {
      const userId = req.user.id;
      const { showEmail, showPhone, showLocation } = req.body;
      const privacyData = {
        showEmail: Boolean(showEmail),
        showPhone: Boolean(showPhone),
        showLocation: Boolean(showLocation)
      };
      const user = await storage.updateUser(userId, privacyData);
      res.json(user);
    } catch (error) {
      console.error("Error updating privacy settings:", error);
      res.status(500).json({ message: "Failed to update privacy settings" });
    }
  });
  app2.post("/api/campaigns", isAuthenticated, async (req, res) => {
    try {
      const userId = req.user.id;
      if (req.body.additionalImages && !Array.isArray(req.body.additionalImages)) {
        req.body.additionalImages = [req.body.additionalImages];
      } else if (!req.body.additionalImages) {
        req.body.additionalImages = [];
      }
      const slug = await generateSlug(req.body.title);
      req.body.slug = slug;
      const campaignData = insertCampaignSchema.parse(req.body);
      const campaign = await storage.createCampaign({
        ...campaignData,
        userId
      });
      res.status(201).json(campaign);
    } catch (error) {
      console.error("Error creating campaign:", error);
      if (error instanceof z2.ZodError) {
        return res.status(400).json({ message: "Invalid campaign data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create campaign" });
    }
  });
  app2.get("/api/campaigns", async (req, res) => {
    try {
      const { search } = req.query;
      let campaigns2;
      if (search && typeof search === "string") {
        campaigns2 = await storage.searchCampaigns(search);
      } else {
        campaigns2 = await storage.listCampaigns();
      }
      res.json(campaigns2);
    } catch (error) {
      console.error("Error listing campaigns:", error);
      res.status(500).json({ message: "Failed to list campaigns" });
    }
  });
  app2.get("/api/campaigns/:identifier", async (req, res) => {
    try {
      const { identifier } = req.params;
      let campaign;
      const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(identifier);
      if (isUUID) {
        campaign = await storage.getCampaign(identifier);
      } else {
        campaign = await storage.getCampaignBySlug(identifier);
      }
      if (!campaign) {
        return res.status(404).json({ message: "Campaign not found" });
      }
      res.json(campaign);
    } catch (error) {
      console.error("Error fetching campaign:", error);
      res.status(500).json({ message: "Failed to fetch campaign" });
    }
  });
  app2.get("/api/campaigns/:id/donations", async (req, res) => {
    try {
      const { id } = req.params;
      const donations2 = await storage.getCampaignDonations(id);
      res.json(donations2);
    } catch (error) {
      console.error("Error fetching campaign donations:", error);
      res.status(500).json({ message: "Failed to fetch donations" });
    }
  });
  app2.get("/api/user/campaigns", isAuthenticated, async (req, res) => {
    try {
      const userId = req.user.id;
      const campaigns2 = await storage.getUserCampaigns(userId);
      res.json(campaigns2);
    } catch (error) {
      console.error("Error fetching user campaigns:", error);
      res.status(500).json({ message: "Failed to fetch campaigns" });
    }
  });
  app2.put("/api/campaigns/:id", isAuthenticated, async (req, res) => {
    try {
      const { id } = req.params;
      const userId = req.user.id;
      const campaign = await storage.getCampaign(id);
      if (!campaign) {
        return res.status(404).json({ message: "Campaign not found" });
      }
      if (campaign.userId !== userId) {
        return res.status(403).json({ message: "Not authorized to update this campaign" });
      }
      const updateData = req.body;
      const updatedCampaign = await storage.updateCampaign(id, updateData);
      res.json(updatedCampaign);
    } catch (error) {
      console.error("Error updating campaign:", error);
      res.status(500).json({ message: "Failed to update campaign" });
    }
  });
  app2.delete("/api/campaigns/:id", isAuthenticated, async (req, res) => {
    try {
      const { id } = req.params;
      const userId = req.user.id;
      const campaign = await storage.getCampaign(id);
      if (!campaign) {
        return res.status(404).json({ message: "Campaign not found" });
      }
      if (campaign.userId !== userId) {
        return res.status(403).json({ message: "Not authorized to delete this campaign" });
      }
      await storage.deleteCampaign(id);
      res.status(200).json({ message: "Campaign deleted successfully" });
    } catch (error) {
      console.error("Error deleting campaign:", error);
      res.status(500).json({ message: "Failed to delete campaign" });
    }
  });
  app2.get("/api/user/donations", isAuthenticated, async (req, res) => {
    try {
      const userId = req.user.id;
      const donations2 = await storage.getUserDonations(userId);
      res.json(donations2);
    } catch (error) {
      console.error("Error fetching user donations:", error);
      res.status(500).json({ message: "Failed to fetch donations" });
    }
  });
  app2.post("/api/donations/create-payment-intent", async (req, res) => {
    if (!stripe) {
      return res.status(503).json({ message: "Stripe is not available" });
    }
    try {
      const { amount, campaignId, tip = 0, guestInfo } = req.body;
      if (!amount || !campaignId) {
        return res.status(400).json({ message: "Amount and campaign ID are required" });
      }
      const campaign = await storage.getCampaign(campaignId);
      if (!campaign) {
        return res.status(404).json({ message: "Campaign not found" });
      }
      const donationAmount = parseFloat(amount);
      const tipAmount = parseFloat(tip) || 0;
      const totalAmount = donationAmount + tipAmount;
      console.log(`Payment Intent Creation - Donation: $${donationAmount}, Tip: $${tipAmount}, Total: $${totalAmount}`);
      let customerId = void 0;
      if (req.user?.id) {
        const user = await storage.getUser(req.user.id);
        customerId = user?.stripeCustomerId || void 0;
        if (!customerId && user?.email) {
          const customer = await stripe.customers.create({
            email: user.email,
            name: `${user.firstName || ""} ${user.lastName || ""}`.trim() || void 0
          });
          customerId = customer.id;
          await storage.updateStripeCustomerId(req.user.id, customerId);
        }
      }
      const metadata = {
        campaignId,
        userId: req.user?.id || "guest",
        donationAmount: donationAmount.toString(),
        tipAmount: tipAmount.toString()
      };
      if (guestInfo && !req.user?.id) {
        metadata.guestFirstName = guestInfo.firstName;
        metadata.guestLastName = guestInfo.lastName;
        metadata.guestEmail = guestInfo.email;
      }
      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(totalAmount * 100),
        // Convert to cents
        currency: "usd",
        customer: customerId,
        metadata
      });
      res.json({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
      console.error("Error creating payment intent:", error);
      res.status(500).json({ message: "Failed to create payment intent" });
    }
  });
  app2.post("/api/donations/webhook", async (req, res) => {
    if (!stripe) {
      return res.status(503).json({ message: "Stripe is not available" });
    }
    const sig = req.headers["stripe-signature"];
    let event;
    try {
      event = req.body;
      if (event.type === "payment_intent.succeeded") {
        const paymentIntent = event.data.object;
        const { campaignId, userId } = paymentIntent.metadata;
        const amount = paymentIntent.amount / 100;
        await storage.createDonation({
          campaignId,
          userId,
          amount: amount.toString(),
          isAnonymous: false
        }, paymentIntent.id);
        await storage.updateDonationAmount(campaignId, amount);
      }
      res.json({ received: true });
    } catch (error) {
      console.error("Error processing webhook:", error);
      res.status(400).json({ message: "Webhook error" });
    }
  });
  app2.post("/api/donations/complete", async (req, res) => {
    if (!stripe) {
      return res.status(503).json({ message: "Stripe is not available" });
    }
    try {
      const { paymentIntentId, campaignId } = req.body;
      console.log(`Donation completion request - PaymentIntent: ${paymentIntentId}, Campaign: ${campaignId}`);
      if (!paymentIntentId || !campaignId) {
        return res.status(400).json({ message: "Missing required parameters" });
      }
      const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
      console.log(`PaymentIntent status: ${paymentIntent.status}, Amount: ${paymentIntent.amount}`);
      if (paymentIntent.status !== "succeeded") {
        return res.status(400).json({ message: "Payment not completed" });
      }
      const donationAmount = parseFloat(paymentIntent.metadata.donationAmount || "0");
      const tipAmount = parseFloat(paymentIntent.metadata.tipAmount || "0");
      const guestFirstName = paymentIntent.metadata.guestFirstName;
      const guestLastName = paymentIntent.metadata.guestLastName;
      const guestEmail = paymentIntent.metadata.guestEmail;
      console.log(`Processing donation - Amount: $${donationAmount}, Tip: $${tipAmount}`);
      const campaign = await storage.getCampaign(campaignId);
      if (!campaign) {
        return res.status(404).json({ message: "Campaign not found" });
      }
      const donationData = {
        campaignId,
        amount: donationAmount.toString(),
        stripePaymentId: paymentIntentId,
        message: "",
        isAnonymous: !guestFirstName && !guestLastName
        // Not anonymous if guest info provided
      };
      console.log("Creating donation record:", donationData);
      const donation = await storage.createDonation(donationData, paymentIntentId);
      console.log("Donation created with ID:", donation.id);
      console.log(`Updating campaign total by $${donationAmount}`);
      await storage.updateDonationAmount(campaignId, donationAmount);
      if (guestEmail && guestFirstName && guestLastName) {
        console.log(`Sending confirmation email to ${guestEmail}`);
        try {
          const emailData = {
            recipientEmail: guestEmail,
            recipientName: `${guestFirstName} ${guestLastName}`,
            donation: {
              amount: donationAmount,
              tip: tipAmount,
              total: donationAmount + tipAmount,
              transactionId: paymentIntentId,
              date: /* @__PURE__ */ new Date()
            },
            campaign: {
              title: campaign.title,
              description: campaign.description
            }
          };
          const emailSent = await emailService.sendDonationConfirmation(emailData);
          if (emailSent) {
            console.log("Confirmation email sent successfully");
          } else {
            console.warn("Failed to send confirmation email");
          }
        } catch (emailError) {
          console.error("Error sending confirmation email:", emailError);
        }
      }
      const response = {
        id: donation.id,
        amount: donationAmount,
        tip: tipAmount,
        campaignTitle: campaign.title,
        donorName: guestFirstName && guestLastName ? `${guestFirstName} ${guestLastName}` : void 0,
        isAnonymous: !guestFirstName && !guestLastName,
        createdAt: donation.createdAt,
        stripePaymentId: paymentIntentId
      };
      console.log("Donation completion successful:", response);
      res.json(response);
    } catch (error) {
      console.error("Error completing donation:", error);
      res.status(500).json({ message: "Error completing donation: " + error.message });
    }
  });
  app2.post("/api/donations/manual", async (req, res) => {
    try {
      const { amount, campaignId, stripePaymentId, description } = req.body;
      if (!amount || !campaignId) {
        return res.status(400).json({ message: "Amount and campaign ID are required" });
      }
      const campaign = await storage.getCampaign(campaignId);
      if (!campaign) {
        return res.status(404).json({ message: "Campaign not found" });
      }
      const donationData = {
        campaignId,
        amount: amount.toString(),
        stripePaymentId: stripePaymentId || `manual_${Date.now()}`,
        message: description || "",
        isAnonymous: true
      };
      console.log("Creating manual donation record:", donationData);
      const donation = await storage.createDonation(donationData, donationData.stripePaymentId);
      await storage.updateDonationAmount(campaignId, parseFloat(amount));
      res.json({
        success: true,
        donation,
        message: `Donation of $${amount} recorded successfully`
      });
    } catch (error) {
      console.error("Error creating manual donation:", error);
      res.status(500).json({ message: "Error creating donation: " + error.message });
    }
  });
  app2.post("/api/donations", isAuthenticated, async (req, res) => {
    try {
      const userId = req.user.id;
      const donationData = insertDonationSchema.parse({
        ...req.body,
        userId
      });
      const donation = await storage.createDonation(
        donationData,
        `manual_${Date.now()}`
      );
      await storage.updateDonationAmount(
        donationData.campaignId || "",
        parseFloat(donationData.amount.toString())
      );
      res.status(201).json(donation);
    } catch (error) {
      console.error("Error creating donation:", error);
      if (error instanceof z2.ZodError) {
        return res.status(400).json({ message: "Invalid donation data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create donation" });
    }
  });
  app2.post("/api/business-profiles", isAuthenticated, async (req, res) => {
    try {
      const userId = req.user.id;
      const existingProfile = await storage.getUserBusinessProfile(userId);
      if (existingProfile) {
        return res.status(400).json({ message: "User already has a business profile" });
      }
      const profileData = insertBusinessProfileSchema.parse(req.body);
      const profile = await storage.createBusinessProfile({
        ...profileData,
        userId
      });
      res.status(201).json(profile);
    } catch (error) {
      console.error("Error creating business profile:", error);
      if (error instanceof z2.ZodError) {
        return res.status(400).json({ message: "Invalid profile data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create business profile" });
    }
  });
  app2.get("/api/business-profiles", async (req, res) => {
    try {
      const profiles = await storage.listBusinessProfiles();
      res.json(profiles);
    } catch (error) {
      console.error("Error listing business profiles:", error);
      res.status(500).json({ message: "Failed to list business profiles" });
    }
  });
  app2.get("/api/business-profiles/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const profile = await storage.getBusinessProfile(parseInt(id));
      if (!profile) {
        return res.status(404).json({ message: "Business profile not found" });
      }
      res.json(profile);
    } catch (error) {
      console.error("Error fetching business profile:", error);
      res.status(500).json({ message: "Failed to fetch business profile" });
    }
  });
  app2.get("/api/user/business-profile", isAuthenticated, async (req, res) => {
    try {
      const userId = req.user.id;
      const profile = await storage.getUserBusinessProfile(userId);
      if (!profile) {
        return res.status(404).json({ message: "Business profile not found" });
      }
      res.json(profile);
    } catch (error) {
      console.error("Error fetching business profile:", error);
      res.status(500).json({ message: "Failed to fetch business profile" });
    }
  });
  app2.put("/api/business-profiles/:id", isAuthenticated, async (req, res) => {
    try {
      const { id } = req.params;
      const profileId = parseInt(id, 10);
      if (isNaN(profileId)) {
        return res.status(400).json({ message: "Invalid profile ID" });
      }
      const profile = await storage.getBusinessProfile(profileId);
      if (!profile) {
        return res.status(404).json({ message: "Business profile not found" });
      }
      const userId = req.user.id;
      if (profile.userId !== userId) {
        return res.status(403).json({ message: "Not authorized to update this profile" });
      }
      const updateData = req.body;
      const updatedProfile = await storage.updateBusinessProfile(profileId, updateData);
      res.json(updatedProfile);
    } catch (error) {
      console.error("Error updating business profile:", error);
      res.status(500).json({ message: "Failed to update business profile" });
    }
  });
  app2.delete("/api/business-profiles/:id", isAuthenticated, async (req, res) => {
    try {
      const { id } = req.params;
      const profileId = parseInt(id, 10);
      if (isNaN(profileId)) {
        return res.status(400).json({ message: "Invalid profile ID" });
      }
      const profile = await storage.getBusinessProfile(profileId);
      if (!profile) {
        return res.status(404).json({ message: "Business profile not found" });
      }
      const userId = req.user.id;
      if (profile.userId !== userId) {
        return res.status(403).json({ message: "Not authorized to delete this profile" });
      }
      await storage.deleteBusinessProfile(profileId);
      res.json({ message: "Business profile deleted successfully" });
    } catch (error) {
      console.error("Error deleting business profile:", error);
      res.status(500).json({ message: "Failed to delete business profile" });
    }
  });
  app2.get("/api/membership-tiers", async (req, res) => {
    try {
      const tiers = await storage.listMembershipTiers();
      res.json(tiers);
    } catch (error) {
      console.error("Error listing membership tiers:", error);
      res.status(500).json({ message: "Failed to list membership tiers" });
    }
  });
  app2.post("/api/create-subscription", isAuthenticated, async (req, res) => {
    if (!stripe) {
      return res.status(503).json({ message: "Stripe is not available" });
    }
    try {
      const { tierID } = req.body;
      if (!tierID) {
        return res.status(400).json({ message: "Membership tier ID is required" });
      }
      const tier = await storage.getMembershipTier(tierID);
      if (!tier) {
        return res.status(404).json({ message: "Membership tier not found" });
      }
      const userId = req.user.id;
      const user = await storage.getUser(userId);
      if (!user?.email) {
        return res.status(400).json({ message: "User email is required for subscription" });
      }
      let customerId = user.stripeCustomerId;
      if (!customerId) {
        const customer = await stripe.customers.create({
          email: user.email,
          name: `${user.firstName || ""} ${user.lastName || ""}`.trim() || void 0
        });
        customerId = customer.id;
        await storage.updateStripeCustomerId(userId, customerId);
      }
      const subscription = await stripe.subscriptions.create({
        customer: customerId,
        items: [{
          price: tier.stripePriceId === null ? void 0 : tier.stripePriceId
        }],
        payment_behavior: "default_incomplete",
        expand: ["latest_invoice.payment_intent"]
      });
      const businessProfile = await storage.getUserBusinessProfile(userId);
      if (businessProfile) {
        await storage.updateBusinessProfileSubscription(businessProfile.id, subscription.id);
      }
      res.json({
        subscriptionId: subscription.id,
        clientSecret: subscription.latest_invoice?.payment_intent?.client_secret
      });
    } catch (error) {
      console.error("Error creating subscription:", error);
      res.status(500).json({ message: "Failed to create subscription" });
    }
  });
  app2.get("/api/statistics", async (req, res) => {
    try {
      const campaigns2 = await storage.listCampaigns();
      const businessProfiles2 = await storage.listBusinessProfiles();
      const users2 = await storage.getUsersCount();
      const totalDonations = campaigns2.reduce((sum, campaign) => {
        const amount = parseFloat(campaign.currentAmount || "0");
        return sum + amount;
      }, 0);
      const industries = new Set(businessProfiles2.map((profile) => profile.industry).filter(Boolean));
      res.json({
        communityMembers: users2,
        donationsRaised: totalDonations,
        businessMembers: businessProfiles2.length,
        industries: industries.size,
        supportAvailable: "24/7"
      });
    } catch (error) {
      console.error("Error fetching statistics:", error);
      res.status(500).json({ message: "Failed to fetch statistics" });
    }
  });
  app2.get("/api/content-creators", async (req, res) => {
    try {
      const sponsoredOnly = req.query.sponsored === "true";
      const creators = await storage.listContentCreators(sponsoredOnly);
      res.json(creators);
    } catch (error) {
      console.error("Error fetching content creators:", error);
      res.status(500).json({ message: "Failed to fetch content creators" });
    }
  });
  app2.get("/api/content-creators/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const creator = await storage.getContentCreator(id);
      if (!creator) {
        return res.status(404).json({ message: "Content creator not found" });
      }
      res.json(creator);
    } catch (error) {
      console.error("Error fetching content creator:", error);
      res.status(500).json({ message: "Failed to fetch content creator" });
    }
  });
  app2.get("/api/user/content-creator", isAuthenticated, async (req, res) => {
    try {
      const userId = req.user.id;
      const creator = await storage.getUserContentCreator(userId);
      res.json(creator || null);
    } catch (error) {
      console.error("Error fetching user's content creator profile:", error);
      res.status(500).json({ message: "Failed to fetch content creator profile" });
    }
  });
  app2.post("/api/content-creators", isAuthenticated, async (req, res) => {
    try {
      const userId = req.user.id;
      const existingCreator = await storage.getUserContentCreator(userId);
      if (existingCreator) {
        return res.status(400).json({ message: "You already have a content creator profile" });
      }
      const validatedData = insertContentCreatorSchema.parse(req.body);
      const creator = await storage.createContentCreator({
        ...validatedData,
        userId
      });
      res.status(201).json(creator);
    } catch (error) {
      console.error("Error creating content creator:", error);
      if (error instanceof z2.ZodError) {
        return res.status(400).json({ message: "Invalid data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create content creator profile" });
    }
  });
  app2.get("/api/sponsorship-applications", isAuthenticated, async (req, res) => {
    try {
      const userId = req.user.id;
      const applications = await storage.getUserSponsorshipApplications(userId);
      res.json(applications);
    } catch (error) {
      console.error("Error fetching sponsorship applications:", error);
      res.status(500).json({ message: "Failed to fetch sponsorship applications" });
    }
  });
  app2.post("/api/sponsorship-applications", isAuthenticated, async (req, res) => {
    try {
      const userId = req.user.id;
      console.log(`Sponsorship application submission for user: ${userId}`);
      console.log("Request body:", JSON.stringify(req.body, null, 2));
      const existingApplications = await storage.getUserSponsorshipApplications(userId);
      const hasPendingApplication = existingApplications.some((app3) => app3.status === "pending");
      if (hasPendingApplication) {
        console.log(`User ${userId} already has pending application`);
        return res.status(400).json({ message: "You already have a pending sponsorship application" });
      }
      console.log("Validating application data...");
      const validatedData = insertSponsorshipApplicationSchema.parse(req.body);
      console.log("Validation successful, creating application...");
      const application = await storage.createSponsorshipApplication({
        ...validatedData,
        userId
      });
      console.log(`Sponsorship application created successfully with ID: ${application.id}`);
      res.status(201).json(application);
    } catch (error) {
      console.error("Error creating sponsorship application:", error);
      console.error("Error stack:", error instanceof Error ? error.stack : "No stack trace");
      if (error instanceof z2.ZodError) {
        console.error("Validation errors:", error.errors);
        return res.status(400).json({
          message: "Invalid data",
          errors: error.errors.map((err) => ({
            path: err.path.join("."),
            message: err.message,
            code: err.code
          }))
        });
      }
      if (error instanceof Error) {
        console.error("Server error details:", {
          name: error.name,
          message: error.message,
          stack: error.stack
        });
        return res.status(500).json({
          message: "Failed to submit sponsorship application",
          details: process.env.NODE_ENV === "development" ? error.message : void 0
        });
      }
      res.status(500).json({ message: "Failed to submit sponsorship application" });
    }
  });
  app2.post("/api/upload/profile-image", isAuthenticated, upload.single("image"), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No image file provided" });
      }
      const userId = req.user.id;
      const imageUrl = `/uploads/${req.file.filename}`;
      console.log(`Updating user ${userId} profile image to: ${imageUrl}`);
      const updatedUser = await storage.updateUser(userId, { profileImageUrl: imageUrl });
      console.log("Updated user:", JSON.stringify(updatedUser, null, 2));
      res.json({ imageUrl, profileImageUrl: updatedUser.profileImageUrl });
    } catch (error) {
      console.error("Error uploading profile image:", error);
      res.status(500).json({ message: "Failed to upload profile image" });
    }
  });
  app2.post("/api/upload/business-logo", isAuthenticated, upload.single("logo"), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No logo file provided" });
      }
      const userId = req.user.id;
      const logoUrl = `/uploads/${req.file.filename}`;
      const profile = await storage.getUserBusinessProfile(userId);
      if (!profile) {
        return res.status(404).json({ message: "Business profile not found" });
      }
      await storage.updateBusinessProfile(profile.id, { logo: logoUrl });
      res.json({ logoUrl });
    } catch (error) {
      console.error("Error uploading business logo:", error);
      res.status(500).json({ message: "Failed to upload business logo" });
    }
  });
  app2.get("/api/social-media-posts", async (req, res) => {
    try {
      const posts = await storage.listSponsoredSocialMediaPosts();
      res.json(posts);
    } catch (error) {
      console.error("Error fetching social media posts:", error);
      res.status(500).json({ message: "Failed to fetch social media posts" });
    }
  });
  app2.get("/api/content-creators/:id/posts", async (req, res) => {
    try {
      const creatorId = parseInt(req.params.id);
      const posts = await storage.getSocialMediaPostsByCreator(creatorId);
      res.json(posts);
    } catch (error) {
      console.error("Error fetching creator posts:", error);
      res.status(500).json({ message: "Failed to fetch creator posts" });
    }
  });
  app2.post("/api/content-creators/:id/posts", isAuthenticated, async (req, res) => {
    try {
      const creatorId = parseInt(req.params.id);
      const postData = req.body;
      const creator = await storage.getContentCreator(creatorId);
      if (!creator || creator.userId !== req.user.id) {
        return res.status(403).json({ message: "Unauthorized" });
      }
      const post = await storage.createSocialMediaPost({
        ...postData,
        creatorId
      });
      res.status(201).json(post);
    } catch (error) {
      console.error("Error creating social media post:", error);
      res.status(500).json({ message: "Failed to create social media post" });
    }
  });
  app2.get("/api/youtube/video", async (req, res) => {
    try {
      const { url } = req.query;
      if (!url || typeof url !== "string") {
        return res.status(400).json({ message: "YouTube URL is required" });
      }
      const videoData = await youtubeService.getVideoData(url);
      if (!videoData) {
        return res.status(404).json({ message: "Video not found" });
      }
      const formattedData = {
        id: videoData.id,
        title: videoData.title,
        description: videoData.description,
        thumbnail: videoData.thumbnail,
        channelTitle: videoData.channelTitle,
        publishedAt: videoData.publishedAt,
        viewCount: youtubeService.formatCount(videoData.viewCount),
        likeCount: youtubeService.formatCount(videoData.likeCount),
        commentCount: youtubeService.formatCount(videoData.commentCount),
        duration: youtubeService.formatDuration(videoData.duration),
        url
      };
      res.json(formattedData);
    } catch (error) {
      console.error("Error fetching YouTube data:", error);
      res.status(500).json({ message: "Failed to fetch YouTube video data" });
    }
  });
  app2.get("/api/youtube/channel", async (req, res) => {
    try {
      const { handle } = req.query;
      if (!handle || typeof handle !== "string") {
        return res.status(400).json({ message: "Channel handle is required" });
      }
      const channelData = await youtubeService.getChannelData(handle);
      if (!channelData) {
        return res.status(404).json({ message: "Channel not found" });
      }
      const formattedData = {
        id: channelData.id,
        title: channelData.title,
        description: channelData.description,
        thumbnail: channelData.thumbnail,
        subscriberCount: youtubeService.formatCount(channelData.subscriberCount),
        videoCount: youtubeService.formatCount(channelData.videoCount),
        viewCount: youtubeService.formatCount(channelData.viewCount),
        customUrl: channelData.customUrl,
        publishedAt: channelData.publishedAt
      };
      res.json(formattedData);
    } catch (error) {
      console.error("Error fetching YouTube channel data:", error);
      res.status(500).json({ message: "Failed to fetch YouTube channel data" });
    }
  });
  app2.get("/api/youtube/channel-videos", async (req, res) => {
    try {
      const { handle, maxResults = 5 } = req.query;
      if (!handle || typeof handle !== "string") {
        return res.status(400).json({ message: "Channel handle is required" });
      }
      const channelId = await youtubeService.getChannelIdFromHandle(handle);
      if (!channelId) {
        return res.status(404).json({ message: "Channel not found" });
      }
      const videos = await youtubeService.getChannelVideos(channelId, parseInt(maxResults));
      res.json(videos);
    } catch (error) {
      console.error("Error fetching YouTube channel videos:", error);
      res.status(500).json({ message: "Failed to fetch YouTube channel videos" });
    }
  });
  app2.post("/api/admin/populate-creator-content/:creatorId", isAuthenticated, async (req, res) => {
    try {
      const { creatorId } = req.params;
      const { channelHandle } = req.body;
      if (!channelHandle) {
        return res.status(400).json({ message: "Channel handle is required" });
      }
      const channelId = await youtubeService.getChannelIdFromHandle(channelHandle);
      if (!channelId) {
        return res.status(404).json({ message: "Channel not found" });
      }
      const videos = await youtubeService.getChannelVideos(channelId, 5);
      if (videos.length === 0) {
        return res.status(404).json({ message: "No videos found for this channel" });
      }
      await storage.clearCreatorPosts(parseInt(creatorId));
      for (const video of videos) {
        await storage.createSocialMediaPost({
          creatorId: parseInt(creatorId),
          postUrl: `https://www.youtube.com/watch?v=${video.id}`,
          postTitle: video.title,
          postDescription: video.description?.substring(0, 300) + (video.description?.length > 300 ? "..." : ""),
          thumbnailUrl: video.thumbnail,
          platform: "youtube",
          viewCount: parseInt(video.viewCount) || 0,
          likeCount: parseInt(video.likeCount) || 0,
          commentCount: parseInt(video.commentCount) || 0,
          postedAt: new Date(video.publishedAt),
          isSponsored: false
        });
      }
      res.json({ message: `Successfully populated ${videos.length} videos for creator ${creatorId}` });
    } catch (error) {
      console.error("Error populating creator content:", error);
      res.status(500).json({ message: "Failed to populate creator content" });
    }
  });
  app2.get("/api/tiktok/user", async (req, res) => {
    try {
      const { username } = req.query;
      if (!username || typeof username !== "string") {
        return res.status(400).json({ message: "Username is required" });
      }
      const userData = await tiktokService.getUserData(username);
      if (!userData) {
        return res.status(404).json({ message: "User not found" });
      }
      const formattedData = {
        id: userData.id,
        username: userData.username,
        displayName: userData.displayName,
        description: userData.description,
        avatar: userData.avatar,
        followerCount: tiktokService.formatCount(userData.followerCount),
        followingCount: tiktokService.formatCount(userData.followingCount),
        videoCount: tiktokService.formatCount(userData.videoCount),
        likeCount: tiktokService.formatCount(userData.likeCount),
        verified: userData.verified
      };
      res.json(formattedData);
    } catch (error) {
      console.error("Error fetching TikTok user data:", error);
      res.status(500).json({ message: "Failed to fetch TikTok user data" });
    }
  });
  app2.get("/api/tiktok/videos", async (req, res) => {
    try {
      const { username, limit } = req.query;
      if (!username || typeof username !== "string") {
        return res.status(400).json({ message: "Username is required" });
      }
      const videoLimit = limit ? parseInt(limit) : 2;
      console.log(`Processing TikTok videos request for @${username} (limit: ${videoLimit})`);
      const videos = await tiktokService.getUserVideos(username, videoLimit);
      console.log(`TikTok service returned ${videos.length} videos for @${username}`);
      if (videos.length === 0) {
        return res.json([]);
      }
      const formattedVideos = videos.map((video, index2) => {
        console.log(`Formatting TikTok video ${index2 + 1}: ${video.title?.substring(0, 30)}...`);
        return {
          id: video.id,
          title: video.title,
          description: video.description,
          thumbnail: video.thumbnail,
          username: video.username,
          displayName: video.displayName,
          publishedAt: video.publishedAt,
          viewCount: tiktokService.formatCount(video.viewCount),
          likeCount: tiktokService.formatCount(video.likeCount),
          commentCount: tiktokService.formatCount(video.commentCount),
          shareCount: tiktokService.formatCount(video.shareCount),
          duration: video.duration
        };
      });
      console.log(`Returning ${formattedVideos.length} formatted TikTok videos`);
      res.json(formattedVideos);
    } catch (error) {
      console.error("Error fetching TikTok videos:", error);
      res.status(500).json({ message: "Failed to fetch TikTok videos" });
    }
  });
  app2.get("/api/tiktok/test", async (req, res) => {
    try {
      const token = process.env.TIKTOK_API_KEY;
      if (!token) {
        return res.json({ status: "missing_token", message: "TIKTOK_API_KEY not configured" });
      }
      const testResponse = await fetch("https://api.apify.com/v2/acts/clockworks~free-tiktok-scraper", {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      if (testResponse.ok) {
        const actorInfo = await testResponse.json();
        res.json({
          status: "success",
          message: "TikTok API key is valid",
          actor: actorInfo.data?.name || "Unknown",
          tokenPrefix: token.substring(0, 12) + "..."
        });
      } else {
        res.json({
          status: "error",
          message: `API responded with status ${testResponse.status}`,
          details: await testResponse.text()
        });
      }
    } catch (error) {
      res.json({
        status: "error",
        message: "Failed to connect to TikTok API",
        error: error.message
      });
    }
  });
  app2.get("/api/instagram/user", async (req, res) => {
    try {
      const { username } = req.query;
      if (!username || typeof username !== "string") {
        return res.status(400).json({ message: "Username is required" });
      }
      if (username === "luislucero.03") {
        const formattedData2 = {
          id: "58974569831",
          username: "luislucero.03",
          displayName: "Luis Lucero \u2671",
          description: "Christ is King \u271D\nFounder: @modernmedia.llc\nyoutu.be/jxGHJQXm5kY?si=p... and 2 more",
          avatar: "https://ui-avatars.com/api/?name=Luis+Lucero&background=d4a574&color=000&size=100",
          followerCount: "764",
          followingCount: "1002",
          postCount: "65",
          verified: false,
          isPrivate: false
        };
        return res.json(formattedData2);
      }
      const userData = await instagramService.getUserData(username);
      if (!userData) {
        return res.status(404).json({ message: "User not found" });
      }
      const formattedData = {
        id: userData.id,
        username: userData.username,
        displayName: userData.displayName,
        description: userData.description,
        avatar: userData.avatar,
        followerCount: instagramService.formatCount(userData.followerCount),
        followingCount: instagramService.formatCount(userData.followingCount),
        postCount: instagramService.formatCount(userData.postCount),
        verified: userData.verified,
        isPrivate: userData.isPrivate
      };
      res.json(formattedData);
    } catch (error) {
      console.error("Error fetching Instagram user data:", error);
      res.status(500).json({ message: "Failed to fetch Instagram user data" });
    }
  });
  app2.get("/api/proxy-image", async (req, res) => {
    try {
      const imageUrl = req.query.url;
      if (!imageUrl) {
        return res.status(400).json({ error: "URL parameter is required" });
      }
      const response = await fetch(imageUrl, {
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
          "Referer": imageUrl.includes("instagram") ? "https://www.instagram.com/" : "https://www.tiktok.com/"
        }
      });
      if (!response.ok) {
        throw new Error(`Failed to fetch image: ${response.status}`);
      }
      const contentType = response.headers.get("content-type");
      if (contentType) {
        res.setHeader("Content-Type", contentType);
      }
      res.setHeader("Cache-Control", "public, max-age=86400");
      res.setHeader("Access-Control-Allow-Origin", "*");
      const buffer = await response.arrayBuffer();
      res.send(Buffer.from(buffer));
    } catch (error) {
      console.error("Error proxying image:", error);
      res.status(500).json({ error: "Failed to proxy image" });
    }
  });
  const isAdminAuth = async (req, res, next) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Authentication required" });
    }
    const user = await storage.getUser(req.user.id);
    if (!user?.isAdmin) {
      return res.status(403).json({ message: "Admin access required" });
    }
    next();
  };
  app2.get("/api/admin/users", isAdminAuth, async (req, res) => {
    try {
      const users2 = await storage.getAllUsers();
      res.json(users2);
    } catch (error) {
      console.error("Error fetching users:", error);
      res.status(500).json({ message: "Failed to fetch users" });
    }
  });
  app2.get("/api/admin/users/:id", isAdminAuth, async (req, res) => {
    try {
      const { id } = req.params;
      const user = await storage.getUser(id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      const donations2 = await storage.getUserDonations(id);
      const campaigns2 = await storage.getUserCampaigns(id);
      const businessProfile = await storage.getUserBusinessProfile(id);
      res.json({
        user,
        donations: donations2,
        campaigns: campaigns2,
        businessProfile
      });
    } catch (error) {
      console.error("Error fetching user details:", error);
      res.status(500).json({ message: "Failed to fetch user details" });
    }
  });
  app2.get("/api/admin/transactions", isAdminAuth, async (req, res) => {
    try {
      const transactions = await storage.getAllDonations();
      res.json(transactions);
    } catch (error) {
      console.error("Error fetching transactions:", error);
      res.status(500).json({ message: "Failed to fetch transactions" });
    }
  });
  app2.get("/api/admin/campaigns/:id/transactions", isAdminAuth, async (req, res) => {
    try {
      const { id } = req.params;
      const transactions = await storage.getCampaignDonations(id);
      const campaign = await storage.getCampaign(id);
      res.json({
        campaign,
        transactions
      });
    } catch (error) {
      console.error("Error fetching campaign transactions:", error);
      res.status(500).json({ message: "Failed to fetch campaign transactions" });
    }
  });
  app2.put("/api/admin/users/:id", isAdminAuth, async (req, res) => {
    try {
      const { id } = req.params;
      const updateData = req.body;
      const updatedUser = await storage.updateUser(id, updateData);
      res.json(updatedUser);
    } catch (error) {
      console.error("Error updating user:", error);
      res.status(500).json({ message: "Failed to update user" });
    }
  });
  app2.get("/api/ministries", async (req, res) => {
    try {
      const ministries = await storage.getAllMinistries();
      res.json(ministries);
    } catch (error) {
      console.error("Error fetching ministries:", error);
      res.status(500).json({ message: "Failed to fetch ministries" });
    }
  });
  app2.get("/api/ministries/pending", isAuthenticated, async (req, res) => {
    try {
      const userId = req.user.id;
      const user = await storage.getUser(userId);
      if (!user?.isAdmin) {
        return res.status(403).json({ message: "Admin access required" });
      }
      const pendingMinistries = await storage.getPendingMinistries();
      res.json(pendingMinistries);
    } catch (error) {
      console.error("Error fetching pending ministries:", error);
      res.status(500).json({ message: "Failed to fetch pending ministries" });
    }
  });
  app2.get("/api/ministries/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const ministry = await storage.getMinistry(parseInt(id));
      if (!ministry) {
        return res.status(404).json({ message: "Ministry not found" });
      }
      const followersCount = await storage.getMinistryFollowersCount(parseInt(id));
      res.json({
        ...ministry,
        followersCount
      });
    } catch (error) {
      console.error("Error fetching ministry:", error);
      res.status(500).json({ message: "Failed to fetch ministry" });
    }
  });
  app2.post("/api/ministries", isAuthenticated, async (req, res) => {
    try {
      const userId = req.user.id;
      const existingProfile = await storage.getUserMinistryProfile(userId);
      if (existingProfile) {
        return res.status(400).json({ message: "User already has a ministry profile" });
      }
      const profileData = insertMinistryProfileSchema.parse(req.body);
      const profile = await storage.createMinistryProfile({
        ...profileData,
        userId,
        isActive: false
        // Require admin approval
      });
      res.status(201).json(profile);
    } catch (error) {
      console.error("Error creating ministry profile:", error);
      if (error instanceof z2.ZodError) {
        return res.status(400).json({ message: "Invalid profile data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create ministry profile" });
    }
  });
  app2.patch("/api/ministries/:id/approve", isAuthenticated, async (req, res) => {
    try {
      const { id } = req.params;
      const userId = req.user.id;
      const user = await storage.getUser(userId);
      if (!user?.isAdmin) {
        return res.status(403).json({ message: "Admin access required" });
      }
      const ministry = await storage.getMinistry(parseInt(id));
      if (!ministry) {
        return res.status(404).json({ message: "Ministry not found" });
      }
      const updatedMinistry = await storage.updateMinistryProfile(parseInt(id), {
        isActive: true,
        isVerified: true
      });
      res.json(updatedMinistry);
    } catch (error) {
      console.error("Error approving ministry:", error);
      res.status(500).json({ message: "Failed to approve ministry" });
    }
  });
  app2.patch("/api/ministries/:id/reject", isAuthenticated, async (req, res) => {
    try {
      const { id } = req.params;
      const userId = req.user.id;
      const user = await storage.getUser(userId);
      if (!user?.isAdmin) {
        return res.status(403).json({ message: "Admin access required" });
      }
      const ministry = await storage.getMinistry(parseInt(id));
      if (!ministry) {
        return res.status(404).json({ message: "Ministry not found" });
      }
      await storage.deleteMinistryProfile(parseInt(id));
      res.json({ message: "Ministry profile rejected and deleted" });
    } catch (error) {
      console.error("Error rejecting ministry:", error);
      res.status(500).json({ message: "Failed to reject ministry" });
    }
  });
  app2.put("/api/ministries/:id", isAuthenticated, async (req, res) => {
    try {
      const { id } = req.params;
      const userId = req.user.id;
      const ministry = await storage.getMinistry(parseInt(id));
      if (!ministry) {
        return res.status(404).json({ message: "Ministry not found" });
      }
      if (ministry.userId !== userId) {
        return res.status(403).json({ message: "Not authorized to update this ministry" });
      }
      const updateData = insertMinistryProfileSchema.partial().parse(req.body);
      const updatedMinistry = await storage.updateMinistryProfile(parseInt(id), updateData);
      res.json(updatedMinistry);
    } catch (error) {
      console.error("Error updating ministry:", error);
      if (error instanceof z2.ZodError) {
        return res.status(400).json({ message: "Invalid profile data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to update ministry profile" });
    }
  });
  app2.get("/api/ministries/:id/posts", async (req, res) => {
    try {
      const { id } = req.params;
      const posts = await storage.getMinistryPosts(parseInt(id));
      res.json(posts);
    } catch (error) {
      console.error("Error fetching ministry posts:", error);
      res.status(500).json({ message: "Failed to fetch ministry posts" });
    }
  });
  app2.get("/api/ministry-posts/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const postId = parseInt(id);
      if (!postId || isNaN(postId)) {
        return res.status(400).json({ message: "Invalid post ID" });
      }
      const post = await storage.getMinistryPostById(postId);
      if (!post) {
        return res.status(404).json({ message: "Ministry post not found" });
      }
      res.json(post);
    } catch (error) {
      console.error("Error fetching ministry post:", error);
      res.status(500).json({ message: "Failed to fetch ministry post" });
    }
  });
  app2.post("/api/ministry-posts/:id/rsvp", isAuthenticated, async (req, res) => {
    try {
      const userId = req.user?.id;
      if (!userId) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      const postId = parseInt(req.params.id);
      const { status, notes } = req.body;
      if (!["going", "maybe", "not_going"].includes(status)) {
        return res.status(400).json({ message: "Invalid RSVP status" });
      }
      const rsvp = await storage.createOrUpdateRsvp(userId, postId, status, notes);
      res.json(rsvp);
    } catch (error) {
      console.error("Error creating/updating RSVP:", error);
      res.status(500).json({ message: "Failed to create/update RSVP" });
    }
  });
  app2.get("/api/ministry-posts/:id/rsvp", isAuthenticated, async (req, res) => {
    try {
      const userId = req.user?.id;
      if (!userId) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      const postId = parseInt(req.params.id);
      const rsvp = await storage.getRsvpByUserAndPost(userId, postId);
      res.json(rsvp || { status: null });
    } catch (error) {
      console.error("Error fetching RSVP:", error);
      res.status(500).json({ message: "Failed to fetch RSVP" });
    }
  });
  app2.get("/api/ministry-posts/:id/rsvps", async (req, res) => {
    try {
      const postId = parseInt(req.params.id);
      const rsvps = await storage.getRsvpsForPost(postId);
      res.json(rsvps);
    } catch (error) {
      console.error("Error fetching RSVP counts:", error);
      res.status(500).json({ message: "Failed to fetch RSVP counts" });
    }
  });
  app2.delete("/api/ministry-posts/:id/rsvp", isAuthenticated, async (req, res) => {
    try {
      const userId = req.user?.id;
      if (!userId) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      const postId = parseInt(req.params.id);
      await storage.deleteRsvp(userId, postId);
      res.json({ message: "RSVP removed successfully" });
    } catch (error) {
      console.error("Error removing RSVP:", error);
      res.status(500).json({ message: "Failed to remove RSVP" });
    }
  });
  app2.post("/api/ministries/:id/posts", isAuthenticated, async (req, res) => {
    try {
      const { id } = req.params;
      const userId = req.user.id;
      const ministry = await storage.getMinistry(parseInt(id));
      if (!ministry) {
        return res.status(404).json({ message: "Ministry not found" });
      }
      if (ministry.userId !== userId) {
        return res.status(403).json({ message: "Not authorized to post for this ministry" });
      }
      const postData = insertMinistryPostSchema.parse(req.body);
      const post = await storage.createMinistryPost({
        ...postData,
        ministryId: parseInt(id)
      });
      res.status(201).json(post);
    } catch (error) {
      console.error("Error creating ministry post:", error);
      if (error instanceof z2.ZodError) {
        return res.status(400).json({ message: "Invalid post data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create ministry post" });
    }
  });
  app2.get("/api/ministries/:id/events", async (req, res) => {
    try {
      const { id } = req.params;
      const events = await storage.getMinistryEvents(parseInt(id));
      res.json(events);
    } catch (error) {
      console.error("Error fetching ministry events:", error);
      res.status(500).json({ message: "Failed to fetch ministry events" });
    }
  });
  app2.post("/api/ministries/:id/events", isAuthenticated, async (req, res) => {
    try {
      const { id } = req.params;
      const userId = req.user.id;
      const ministry = await storage.getMinistry(parseInt(id));
      if (!ministry) {
        return res.status(404).json({ message: "Ministry not found" });
      }
      if (ministry.userId !== userId) {
        return res.status(403).json({ message: "Not authorized to create events for this ministry" });
      }
      const eventData = insertMinistryEventSchema.parse(req.body);
      const event = await storage.createMinistryEvent({
        ...eventData,
        ministryId: parseInt(id)
      });
      const eventPostContent = `\u{1F4C5} ${eventData.title}

${eventData.description}

\u{1F4CD} ${eventData.location ? eventData.location : "Location TBD"}
\u{1F4C5} ${new Date(eventData.startDate).toLocaleDateString()} at ${new Date(eventData.startDate).toLocaleTimeString()}

${eventData.requiresRegistration ? "Registration required!" : "All are welcome!"}`;
      await storage.createMinistryPost({
        ministryId: parseInt(id),
        title: `New Event: ${eventData.title}`,
        content: eventPostContent,
        type: "event_announcement",
        mediaUrls: eventData.flyerImage ? [eventData.flyerImage] : [],
        isPublished: true
      });
      res.status(201).json(event);
    } catch (error) {
      console.error("Error creating ministry event:", error);
      if (error instanceof z2.ZodError) {
        return res.status(400).json({ message: "Invalid event data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create ministry event" });
    }
  });
  app2.post("/api/ministries/:id/follow", isAuthenticated, async (req, res) => {
    try {
      const { id } = req.params;
      const userId = req.user.id;
      const ministry = await storage.getMinistry(parseInt(id));
      if (!ministry) {
        return res.status(404).json({ message: "Ministry not found" });
      }
      if (ministry.userId === userId) {
        return res.status(400).json({ message: "Cannot follow your own ministry" });
      }
      await storage.followMinistry(userId, parseInt(id));
      res.json({ message: "Successfully followed ministry" });
    } catch (error) {
      console.error("Error following ministry:", error);
      res.status(500).json({ message: "Failed to follow ministry" });
    }
  });
  app2.delete("/api/ministries/:id/follow", isAuthenticated, async (req, res) => {
    try {
      const { id } = req.params;
      const userId = req.user.id;
      await storage.unfollowMinistry(userId, parseInt(id));
      res.json({ message: "Successfully unfollowed ministry" });
    } catch (error) {
      console.error("Error unfollowing ministry:", error);
      res.status(500).json({ message: "Failed to unfollow ministry" });
    }
  });
  app2.get("/api/ministries/:id/following", isAuthenticated, async (req, res) => {
    try {
      const { id } = req.params;
      const userId = req.user.id;
      const isFollowing = await storage.isUserFollowingMinistry(userId, parseInt(id));
      res.json({ isFollowing });
    } catch (error) {
      console.error("Error checking follow status:", error);
      res.status(500).json({ message: "Failed to check follow status" });
    }
  });
  app2.get("/api/feed/ministry-posts", isAuthenticated, async (req, res) => {
    try {
      const userId = req.user.id;
      const ministryPosts2 = await storage.getMinistryFeedPosts(userId);
      res.json(ministryPosts2);
    } catch (error) {
      console.error("Error fetching ministry feed posts:", error);
      res.status(500).json({ message: "Failed to fetch ministry feed posts" });
    }
  });
  app2.get("/api/user/ministry-profile", isAuthenticated, async (req, res) => {
    try {
      const userId = req.user.id;
      const profile = await storage.getUserMinistryProfile(userId);
      res.json(profile);
    } catch (error) {
      console.error("Error fetching user ministry profile:", error);
      res.status(500).json({ message: "Failed to fetch ministry profile" });
    }
  });
  app2.get("/api/user/followed-ministries", isAuthenticated, async (req, res) => {
    try {
      const userId = req.user.id;
      const ministries = await storage.getUserFollowedMinistries(userId);
      res.json(ministries);
    } catch (error) {
      console.error("Error fetching followed ministries:", error);
      res.status(500).json({ message: "Failed to fetch followed ministries" });
    }
  });
  app2.get("/api/user/ministry-feed", isAuthenticated, async (req, res) => {
    try {
      const userId = req.user.id;
      const posts = await storage.getMinistryFeedPosts(userId);
      res.json(posts);
    } catch (error) {
      console.error("Error fetching ministry feed:", error);
      res.status(500).json({ message: "Failed to fetch ministry feed" });
    }
  });
  app2.get("/api/users", async (req, res) => {
    try {
      const users2 = await storage.getAllUsers();
      const validUsers = users2.filter((user) => user.username && user.username !== "null");
      res.json(validUsers);
    } catch (error) {
      console.error("Error fetching users:", error);
      res.status(500).json({ message: "Failed to fetch users" });
    }
  });
  app2.get("/api/users/by-username", async (req, res) => {
    try {
      const { username } = req.query;
      if (!username || username === "null" || username === null) {
        return res.status(400).json({ message: "Valid username parameter is required" });
      }
      const user = await storage.getUserByUsername(username);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(user);
    } catch (error) {
      console.error("Error fetching user by username:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });
  app2.get("/api/users/by-id", async (req, res) => {
    try {
      const { userId } = req.query;
      if (!userId) {
        return res.status(400).json({ message: "UserId parameter is required" });
      }
      const user = await storage.getUser(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(user);
    } catch (error) {
      console.error("Error fetching user by ID:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });
  app2.get("/api/users/:userId/posts", async (req, res) => {
    try {
      const { userId } = req.params;
      const posts = await storage.getUserPosts(userId);
      res.json(posts);
    } catch (error) {
      console.error("Error fetching user posts:", error);
      res.status(500).json({ message: "Failed to fetch user posts" });
    }
  });
  app2.post("/api/creators/import/:platform", isAuthenticated, async (req, res) => {
    try {
      const { platform } = req.params;
      const { url } = req.body;
      const userId = req.user.id;
      if (!url || !platform) {
        return res.status(400).json({ message: "URL and platform are required" });
      }
      const creatorStatus = await storage.getCreatorStatusByUserId(userId);
      if (!creatorStatus.isCreator) {
        return res.status(403).json({ message: "Creator profile required" });
      }
      let importedContent;
      switch (platform) {
        case "youtube":
          importedContent = await importYouTubeContent(url);
          break;
        case "tiktok":
          importedContent = await importTikTokContent(url);
          break;
        case "instagram":
          importedContent = await importInstagramContent(url);
          break;
        default:
          return res.status(400).json({ message: "Unsupported platform" });
      }
      res.json(importedContent);
    } catch (error) {
      console.error("Error importing content:", error);
      res.status(500).json({ message: "Failed to import content" });
    }
  });
  async function importYouTubeContent(url) {
    const videoId = extractYouTubeVideoId(url);
    if (!videoId) {
      throw new Error("Invalid YouTube URL");
    }
    try {
      const videoData = await fetch(`http://localhost:5000/api/youtube/video?videoId=${videoId}`);
      const video = await videoData.json();
      return {
        title: video.title,
        description: video.description,
        thumbnailUrl: video.thumbnailUrl,
        platform: "youtube",
        originalUrl: url
      };
    } catch (error) {
      throw new Error("Failed to fetch YouTube video data");
    }
  }
  async function importTikTokContent(url) {
    return {
      title: "TikTok Video",
      description: "Imported from TikTok",
      thumbnailUrl: "/api/placeholder/400/400",
      platform: "tiktok",
      originalUrl: url
    };
  }
  async function importInstagramContent(url) {
    return {
      title: "Instagram Post",
      description: "Imported from Instagram",
      thumbnailUrl: "/api/placeholder/400/400",
      platform: "instagram",
      originalUrl: url
    };
  }
  function extractYouTubeVideoId(url) {
    const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  }
  app2.post("/api/businesses/:businessId/follow", isAuthenticated, async (req, res) => {
    try {
      const { businessId } = req.params;
      const userId = req.user.id;
      const businessIdInt = parseInt(businessId);
      if (isNaN(businessIdInt)) {
        return res.status(400).json({ message: "Invalid business ID" });
      }
      const business = await storage.getBusinessProfile(businessIdInt);
      if (!business) {
        return res.status(404).json({ message: "Business not found" });
      }
      if (business.userId === userId) {
        return res.status(400).json({ message: "Cannot follow your own business" });
      }
      const isFollowing = await storage.isBusinessFollowing(userId, businessIdInt);
      if (isFollowing) {
        return res.status(400).json({ message: "Already following this business" });
      }
      const follow = await storage.followBusiness(userId, businessIdInt);
      res.json({ message: "Successfully followed business", follow });
    } catch (error) {
      console.error("Error following business:", error);
      res.status(500).json({ message: "Failed to follow business" });
    }
  });
  app2.delete("/api/businesses/:businessId/follow", isAuthenticated, async (req, res) => {
    try {
      const { businessId } = req.params;
      const userId = req.user.id;
      const businessIdInt = parseInt(businessId);
      if (isNaN(businessIdInt)) {
        return res.status(400).json({ message: "Invalid business ID" });
      }
      await storage.unfollowBusiness(userId, businessIdInt);
      res.json({ message: "Successfully unfollowed business" });
    } catch (error) {
      console.error("Error unfollowing business:", error);
      res.status(500).json({ message: "Failed to unfollow business" });
    }
  });
  app2.get("/api/businesses/:businessId/following", isAuthenticated, async (req, res) => {
    try {
      const { businessId } = req.params;
      const userId = req.user.id;
      const businessIdInt = parseInt(businessId);
      if (isNaN(businessIdInt)) {
        return res.status(400).json({ message: "Invalid business ID" });
      }
      const isFollowing = await storage.isBusinessFollowing(userId, businessIdInt);
      res.json({ isFollowing });
    } catch (error) {
      console.error("Error checking business follow status:", error);
      res.status(500).json({ message: "Failed to check follow status" });
    }
  });
  app2.post("/api/users/:userId/follow", isAuthenticated, async (req, res) => {
    try {
      const { userId: targetUserId } = req.params;
      const followerId = req.user.id;
      if (followerId === targetUserId) {
        return res.status(400).json({ message: "Cannot follow yourself" });
      }
      const isFollowing = await storage.isUserFollowing(followerId, targetUserId);
      if (isFollowing) {
        return res.status(400).json({ message: "Already following this user" });
      }
      const follow = await storage.followUser(followerId, targetUserId);
      res.json({ message: "Successfully followed user", follow });
    } catch (error) {
      console.error("Error following user:", error);
      res.status(500).json({ message: "Failed to follow user" });
    }
  });
  app2.delete("/api/users/:userId/follow", isAuthenticated, async (req, res) => {
    try {
      const { userId: targetUserId } = req.params;
      const followerId = req.user.id;
      await storage.unfollowUser(followerId, targetUserId);
      res.json({ message: "Successfully unfollowed user" });
    } catch (error) {
      console.error("Error unfollowing user:", error);
      res.status(500).json({ message: "Failed to unfollow user" });
    }
  });
  app2.get("/api/users/:userId/is-following", isAuthenticated, async (req, res) => {
    try {
      const { userId: targetUserId } = req.params;
      const followerId = req.user.id;
      const isFollowing = await storage.isUserFollowing(followerId, targetUserId);
      res.json({ isFollowing });
    } catch (error) {
      console.error("Error checking follow status:", error);
      res.status(500).json({ message: "Failed to check follow status" });
    }
  });
  app2.get("/api/users/:userId/followers", async (req, res) => {
    try {
      const { userId } = req.params;
      const followers = await storage.getUserFollowers(userId);
      res.json(followers);
    } catch (error) {
      console.error("Error fetching followers:", error);
      res.status(500).json({ message: "Failed to fetch followers" });
    }
  });
  app2.get("/api/users/:userId/following", async (req, res) => {
    try {
      const { userId } = req.params;
      const following = await storage.getUserFollowing(userId);
      res.json(following);
    } catch (error) {
      console.error("Error fetching following:", error);
      res.status(500).json({ message: "Failed to fetch following" });
    }
  });
  app2.get("/api/users/:userId/stats", async (req, res) => {
    try {
      const { userId } = req.params;
      const [followersCount, followingCount] = await Promise.all([
        storage.getUserFollowersCount(userId),
        storage.getUserFollowingCount(userId)
      ]);
      res.json({ followersCount, followingCount });
    } catch (error) {
      console.error("Error fetching user stats:", error);
      res.status(500).json({ message: "Failed to fetch user stats" });
    }
  });
  app2.get("/api/feed/following", isAuthenticated, async (req, res) => {
    try {
      const userId = req.user.id;
      const limit = parseInt(req.query.limit) || 50;
      const posts = await storage.getFollowedUsersPosts(userId, limit);
      res.json(posts);
    } catch (error) {
      console.error("Error fetching following feed:", error);
      res.status(500).json({ message: "Failed to fetch following feed" });
    }
  });
  app2.get("/api/notifications", isAuthenticated, async (req, res) => {
    try {
      const userId = req.user.id;
      const limit = parseInt(req.query.limit) || 50;
      const notifications2 = await storage.getUserNotifications(userId, limit);
      res.json(notifications2);
    } catch (error) {
      console.error("Error fetching notifications:", error);
      res.status(500).json({ message: "Failed to fetch notifications" });
    }
  });
  app2.get("/api/notifications/unread-count", isAuthenticated, async (req, res) => {
    try {
      const userId = req.user.id;
      const count = await storage.getUnreadNotificationCount(userId);
      res.json({ count });
    } catch (error) {
      console.error("Error fetching unread count:", error);
      res.status(500).json({ message: "Failed to fetch unread count" });
    }
  });
  app2.patch("/api/notifications/:id/read", isAuthenticated, async (req, res) => {
    try {
      const { id } = req.params;
      const notificationId = parseInt(id);
      if (isNaN(notificationId)) {
        return res.status(400).json({ message: "Invalid notification ID" });
      }
      await storage.markNotificationAsRead(notificationId);
      res.json({ message: "Notification marked as read" });
    } catch (error) {
      console.error("Error marking notification as read:", error);
      res.status(500).json({ message: "Failed to mark notification as read" });
    }
  });
  app2.patch("/api/notifications/mark-all-read", isAuthenticated, async (req, res) => {
    try {
      const userId = req.user.id;
      await storage.markAllNotificationsAsRead(userId);
      res.json({ message: "All notifications marked as read" });
    } catch (error) {
      console.error("Error marking all notifications as read:", error);
      res.status(500).json({ message: "Failed to mark all notifications as read" });
    }
  });
  app2.delete("/api/notifications/:id", isAuthenticated, async (req, res) => {
    try {
      const { id } = req.params;
      const notificationId = parseInt(id);
      if (isNaN(notificationId)) {
        return res.status(400).json({ message: "Invalid notification ID" });
      }
      await storage.deleteNotification(notificationId);
      res.json({ message: "Notification deleted" });
    } catch (error) {
      console.error("Error deleting notification:", error);
      res.status(500).json({ message: "Failed to delete notification" });
    }
  });
  app2.post("/api/notifications/test", isAuthenticated, async (req, res) => {
    try {
      const userId = req.user.id;
      const { message = "Test notification", type = "info" } = req.body;
      await storage.createNotification({
        userId,
        type,
        title: "Test Notification",
        message,
        relatedId: null,
        relatedType: null
      });
      res.json({ message: "Test notification created successfully" });
    } catch (error) {
      console.error("Error creating test notification:", error);
      res.status(500).json({ message: "Failed to create test notification" });
    }
  });
  app2.post("/api/notifications/test-all", isAuthenticated, async (req, res) => {
    try {
      const userId = req.user.id;
      const testNotifications = [
        {
          type: "follow",
          title: "New Follower",
          message: "TestUser started following you",
          actorName: "TestUser"
        },
        {
          type: "like",
          title: "Someone liked your post",
          message: "TestUser liked your post",
          actorName: "TestUser",
          relatedType: "platform_post"
        },
        {
          type: "comment",
          title: "New comment on your post",
          message: 'TestUser commented: "Great post!"',
          actorName: "TestUser",
          relatedType: "platform_post"
        },
        {
          type: "chat_message",
          title: "New message in Bible Study",
          message: "TestUser: Hello everyone!",
          actorName: "TestUser",
          relatedType: "group_chat"
        }
      ];
      for (const notification of testNotifications) {
        await storage.createNotification({
          userId,
          type: notification.type,
          title: notification.title,
          message: notification.message,
          relatedId: null,
          relatedType: notification.relatedType || null,
          actorName: notification.actorName,
          isRead: false
        });
      }
      res.json({ message: "All test notifications created successfully" });
    } catch (error) {
      console.error("Error creating test notifications:", error);
      res.status(500).json({ message: "Failed to create test notifications" });
    }
  });
  app2.post("/api/notifications/create-samples", isAuthenticated, async (req, res) => {
    try {
      const userId = req.user.id;
      const sampleNotifications = [
        {
          userId,
          type: "like",
          title: "New like on your post",
          message: "Someone liked your recent post about faith and community.",
          relatedId: "1",
          relatedType: "platform_post",
          isRead: false,
          actorName: "John Doe",
          actorImage: "/uploads/sample-avatar.jpg"
        },
        {
          userId,
          type: "comment",
          title: "New comment on your ministry event",
          message: "Sarah Johnson commented on your Beach & Bonfire event.",
          relatedId: "1",
          relatedType: "ministry_post",
          isRead: false,
          actorName: "Sarah Johnson"
        },
        {
          userId,
          type: "follow",
          title: "New follower",
          message: "Michael Brown started following you.",
          relatedId: userId,
          relatedType: "user",
          isRead: false,
          actorName: "Michael Brown"
        },
        {
          userId,
          type: "rsvp",
          title: "Event RSVP update",
          message: "5 new people RSVPed to your upcoming ministry event.",
          relatedId: "1",
          relatedType: "ministry_post",
          isRead: false
        },
        {
          userId,
          type: "ministry_post",
          title: "New ministry post",
          message: "Grace Community Church shared a new event you might be interested in.",
          relatedId: "2",
          relatedType: "ministry_post",
          isRead: true,
          actorName: "Grace Community Church"
        }
      ];
      const createdNotifications = [];
      for (const notificationData of sampleNotifications) {
        const notification = await storage.createNotification(notificationData);
        createdNotifications.push(notification);
      }
      res.json({
        message: "Sample notifications created",
        notifications: createdNotifications
      });
    } catch (error) {
      console.error("Error creating sample notifications:", error);
      res.status(500).json({ message: "Failed to create sample notifications" });
    }
  });
  app2.post("/api/group-chat-queues", isAuthenticated, async (req, res) => {
    try {
      const userId = req.user.id;
      const queueData = insertGroupChatQueueSchema.parse(req.body);
      const queue = await storage.createGroupChatQueue({ ...queueData, creatorId: userId });
      res.json(queue);
    } catch (error) {
      console.error("Error creating group chat queue:", error);
      res.status(500).json({ message: "Failed to create group chat queue" });
    }
  });
  app2.get("/api/group-chat-queues", async (req, res) => {
    try {
      const queues = await storage.listActiveQueues();
      res.json(queues);
    } catch (error) {
      console.error("Error fetching group chat queues:", error);
      res.status(500).json({ message: "Failed to fetch group chat queues" });
    }
  });
  app2.post("/api/group-chat-queues/:id/join", isAuthenticated, async (req, res) => {
    try {
      const userId = req.user.id;
      const queueId = parseInt(req.params.id);
      await storage.joinQueue(queueId, userId);
      res.json({ message: "Successfully joined queue" });
    } catch (error) {
      console.error("Error joining queue:", error);
      res.status(500).json({ message: "Failed to join queue" });
    }
  });
  app2.post("/api/group-chat-queues/:id/leave", isAuthenticated, async (req, res) => {
    try {
      const userId = req.user.id;
      const queueId = parseInt(req.params.id);
      await storage.leaveQueue(queueId, userId);
      res.json({ message: "Successfully left queue" });
    } catch (error) {
      console.error("Error leaving queue:", error);
      res.status(500).json({ message: "Failed to leave queue" });
    }
  });
  app2.delete("/api/group-chat-queues/:id", isAuthenticated, async (req, res) => {
    try {
      const userId = req.user.id;
      const queueId = parseInt(req.params.id);
      await storage.cancelQueue(queueId, userId);
      res.json({ message: "Successfully cancelled queue" });
    } catch (error) {
      console.error("Error cancelling queue:", error);
      res.status(500).json({ message: "Failed to cancel queue" });
    }
  });
  app2.get("/api/group-chats", isAuthenticated, async (req, res) => {
    try {
      const userId = req.user.id;
      const chats = await storage.getUserGroupChats(userId);
      res.json(chats);
    } catch (error) {
      console.error("Error fetching group chats:", error);
      res.status(500).json({ message: "Failed to fetch group chats" });
    }
  });
  app2.get("/api/group-chats/active", async (req, res) => {
    try {
      const chats = await storage.listActiveChats();
      res.json(chats);
    } catch (error) {
      console.error("Error fetching active chats:", error);
      res.status(500).json({ message: "Failed to fetch active chats" });
    }
  });
  app2.get("/api/group-chats/:id/members", async (req, res) => {
    try {
      const chatId = parseInt(req.params.id);
      const members = await storage.getChatMembers(chatId);
      res.json(members);
    } catch (error) {
      console.error("Error fetching chat members:", error);
      res.status(500).json({ message: "Failed to fetch chat members" });
    }
  });
  app2.get("/api/group-chats/:id/messages", async (req, res) => {
    try {
      const chatId = parseInt(req.params.id);
      const messages = await storage.getChatMessages(chatId);
      res.json(messages);
    } catch (error) {
      console.error("Error fetching chat messages:", error);
      res.status(500).json({ message: "Failed to fetch chat messages" });
    }
  });
  app2.get("/api/group-chats/:id", async (req, res) => {
    try {
      const chatId = parseInt(req.params.id);
      const chat = await storage.getGroupChatById(chatId);
      if (!chat) {
        return res.status(404).json({ message: "Chat not found" });
      }
      res.json(chat);
    } catch (error) {
      console.error("Error fetching chat:", error);
      res.status(500).json({ message: "Failed to fetch chat" });
    }
  });
  app2.post("/api/group-chats/:id/messages", isAuthenticated, async (req, res) => {
    try {
      const chatId = parseInt(req.params.id);
      const userId = req.user.id;
      const result = insertGroupChatMessageSchema.safeParse({
        ...req.body,
        chatId,
        userId
      });
      if (!result.success) {
        return res.status(400).json({
          message: "Invalid message data",
          errors: result.error.errors
        });
      }
      const message = await storage.createGroupChatMessage(result.data);
      const messages = await storage.getChatMessages(chatId);
      const newMessage = messages.find((m) => m.id === message.id);
      res.json(newMessage);
    } catch (error) {
      console.error("Error creating chat message:", error);
      res.status(500).json({ message: "Failed to create chat message" });
    }
  });
  app2.post("/api/admin/auto-follow-christ-collective", isAuthenticated, async (req, res) => {
    try {
      await storage.makeAllUsersFollowChristCollective();
      res.json({ message: "Successfully made all users follow Christ Collective Ministry" });
    } catch (error) {
      console.error("Error making all users follow Christ Collective:", error);
      res.status(500).json({ error: "Failed to make all users follow Christ Collective Ministry" });
    }
  });
  app2.get("/api/direct-chats", isAuthenticated, async (req, res) => {
    try {
      const userId = req.user.id;
      const chats = await storage.getUserDirectChats(userId);
      res.json(chats);
    } catch (error) {
      console.error("Error fetching direct chats:", error);
      res.status(500).json({ message: "Failed to fetch direct chats" });
    }
  });
  app2.get("/api/direct-chats/:id", isAuthenticated, async (req, res) => {
    try {
      const chatId = parseInt(req.params.id);
      const userId = req.user.id;
      const chat = await storage.getDirectChatById(chatId, userId);
      if (!chat) {
        return res.status(404).json({ message: "Chat not found" });
      }
      res.json(chat);
    } catch (error) {
      console.error("Error fetching direct chat:", error);
      res.status(500).json({ message: "Failed to fetch direct chat" });
    }
  });
  app2.post("/api/direct-chats", isAuthenticated, async (req, res) => {
    try {
      const userId = req.user.id;
      const { recipientId } = req.body;
      if (!recipientId) {
        return res.status(400).json({ message: "Recipient ID is required" });
      }
      const chat = await storage.getOrCreateDirectChat(userId, recipientId);
      res.json(chat);
    } catch (error) {
      console.error("Error creating direct chat:", error);
      res.status(500).json({ message: "Failed to create direct chat" });
    }
  });
  app2.get("/api/direct-chats/:id/messages", isAuthenticated, async (req, res) => {
    try {
      const chatId = parseInt(req.params.id);
      const messages = await storage.getDirectChatMessages(chatId);
      res.json(messages);
    } catch (error) {
      console.error("Error fetching direct chat messages:", error);
      res.status(500).json({ message: "Failed to fetch direct chat messages" });
    }
  });
  app2.post("/api/direct-chats/:id/messages", isAuthenticated, async (req, res) => {
    try {
      const chatId = parseInt(req.params.id);
      const userId = req.user.id;
      const { message } = req.body;
      if (!message || !message.trim()) {
        return res.status(400).json({ message: "Message cannot be empty" });
      }
      const newMessage = await storage.createDirectMessage({
        chatId,
        senderId: userId,
        message: message.trim()
      });
      const messages = await storage.getDirectChatMessages(chatId);
      const fullMessage = messages.find((m) => m.id === newMessage.id);
      res.json(fullMessage);
    } catch (error) {
      console.error("Error creating direct message:", error);
      res.status(500).json({ message: "Failed to create direct message" });
    }
  });
  app2.patch("/api/direct-messages/:id/read", isAuthenticated, async (req, res) => {
    try {
      const messageId = parseInt(req.params.id);
      await storage.markDirectMessageAsRead(messageId);
      res.json({ message: "Message marked as read" });
    } catch (error) {
      console.error("Error marking message as read:", error);
      res.status(500).json({ message: "Failed to mark message as read" });
    }
  });
  const httpServer = createServer(app2);
  return httpServer;
}

// server/vite.ts
import express2 from "express";
import fs2 from "fs";
import path3 from "path";
import { createServer as createViteServer, createLogger } from "vite";

// server/vite.ts
import { nanoid } from "nanoid";
var viteLogger = createLogger();
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
async function setupVite(app2, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true
  };
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      }
    },
    server: serverOptions,
    appType: "custom"
  });
  app2.use(vite.middlewares);
  app2.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path3.resolve(
        import.meta.dirname,
        "..",
        "client",
        "index.html"
      );
      let template = await fs2.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app2) {
  const distPath = path3.resolve(import.meta.dirname, "public");
  if (!fs2.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app2.use(express2.static(distPath));
  app2.use("*", (_req, res) => {
    res.sendFile(path3.resolve(distPath, "index.html"));
  });
}

// server/index.ts
process.env.TIKTOK_API_KEY = "apify_api_w1R7Q9Ns6isG1ok1VR446cyaTNcNEQ4Ev5dK";
console.log("Apify API configured for live social media data extraction");
var app = express3();
app.use(express3.json());
app.use(express3.urlencoded({ extended: false }));
app.use("/uploads", express3.static(path4.join(process.cwd(), "public", "uploads")));
app.use((req, res, next) => {
  const start = Date.now();
  const path5 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path5.startsWith("/api")) {
      let logLine = `${req.method} ${path5} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
      log(logLine);
    }
  });
  next();
});
(async () => {
  const server = await registerRoutes(app);
  app.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }
  const port = 5e3;
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true
  }, () => {
    log(`serving on port ${port}`);
  });
})();
