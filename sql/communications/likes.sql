DROP TABLE IF EXISTS `communication_likes`;

CREATE TABLE `communication_likes` (
    communication_id int(11) NOT NULL,
    account_id varchar(50) NOT NULL,
    status tinyint(4) DEFAULT 1,
    created_at datetime DEFAULT current_timestamp(),
    updated_at datetime DEFAULT current_timestamp() ON UPDATE current_timestamp(),
    PRIMARY KEY (communication_id, account_id),
    Constraint FK_Communications_CommunicationLikes FOREIGN KEY (communication_id) REFERENCES communications (id) ON DELETE CASCADE ON UPDATE NO ACTION,
    Constraint FK_Accounts_CommunicationLikes FOREIGN KEY (account_id) REFERENCES accounts (id) ON DELETE CASCADE ON UPDATE NO ACTION
)