CREATE TABLE communication_notifications (
    id serial PRIMARY KEY,
    type tinyint NOT NULL DEFAULT 0,
    communication_id int NOT NULL REFERENCES communications(id) ON DELETE CASCADE,
    comment_id int NOT NULL REFERENCES communication_comments(id) ON DELETE CASCADE,
    status int NOT NULL DEFAULT 0,
    created_at datetime NOT NULL DEFAULT NOW(),
    updated_at datetime NOT NULL DEFAULT NOW() ON UPDATE NOW()
)