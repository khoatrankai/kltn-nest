CREATE TABLE IF NOT EXISTS `communication_comment_images` (
    id int(11) NOT NULL AUTO_INCREMENT,
    comment_id int(11) NOT NULL,
    image varchar(255) NOT NULL,
    status tinyint(4) DEFAULT 1,
    created_at datetime DEFAULT current_timestamp(),
    updated_at datetime DEFAULT current_timestamp() ON UPDATE current_timestamp(),
    PRIMARY KEY (id),
    Constraint FK_CommunicationComments_CommunicationCommentImages FOREIGN KEY (comment_id) REFERENCES communication_comments (id) ON DELETE CASCADE ON UPDATE NO ACTION
)