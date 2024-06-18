CREATE TABLE IF NOT EXISTS `communication_comments` (
    id int(11) NOT NULL AUTO_INCREMENT,
    communication_id int(11) NOT NULL,
    account_id varchar(50) NOT NULL,
    content text DEFAULT NULL,
    parent_comment_id int(11) DEFAULT NULL,
    status tinyint(4) DEFAULT 1,
    created_at datetime DEFAULT current_timestamp(),
    updated_at datetime DEFAULT current_timestamp() ON UPDATE current_timestamp(),
    PRIMARY KEY (id),
    Constraint FK_Communications_CommunicationComments FOREIGN KEY (communication_id) REFERENCES communications (id) ON DELETE CASCADE ON UPDATE NO ACTION,
    Constraint FK_Accounts_CommunicationComments FOREIGN KEY (account_id) REFERENCES accounts (id) ON DELETE CASCADE ON UPDATE NO ACTION,
    Constraint FK_CommunicationComments_CommunicationComments FOREIGN KEY (parent_comment_id) REFERENCES communication_comments (id) ON DELETE CASCADE ON UPDATE NO ACTION
)

