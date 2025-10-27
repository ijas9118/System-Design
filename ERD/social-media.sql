CREATE TABLE
  users (
    user_id SERIAl PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(200) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  );

CREATE TABLE
  posts (
    post_id SERIAl PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users (user_id),
    CONTENT TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  );

CREATE TABLE
  likes (
    like_id serial PRIMARY KEY,
    post_id INTEGER NOT NULL REFERENCES posts (post_id),
    user_id INTEGER NOT NULL REFERENCES users (user_id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  );

CREATE TABLE
  COMMENTS (
    comment_id serial PRIMARY KEY,
    post_id INTEGER NOT NULL REFERENCES posts (post_id),
    user_id INTEGER NOT NULL REFERENCES users (user_id),
    COMMENT TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  );

CREATE TABLE
  follows (
    follower_id INTEGER NOT NULL REFERENCES users (user_id),
    followed_id INTEGER NOT NULL REFERENCES users (user_id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (followed_id, follower_id)
  );

CREATE INDEX idx_posts_user_id ON posts (user_id);

CREATE INDEX idx_comments_post_id ON COMMENTS (post_id);

CREATE INDEX idx_likes_post_id ON likes (post_id);

CREATE INDEX idx_posts_created_at ON posts (created_at DESC)