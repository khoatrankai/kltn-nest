CREATE TABLE
    `communications` (
        id int(11) NOT NULL AUTO_INCREMENT,
        account_id varchar(50) NOT NULL,
        title varchar(500) DEFAULT NULL,
        content text DEFAULT NULL,
        status tinyint(4) DEFAULT 1,
        created_at datetime DEFAULT current_timestamp(),
        updated_at datetime DEFAULT current_timestamp() ON UPDATE current_timestamp(),
        PRIMARY KEY (id),
        Constraint FK_Accounts_Communications FOREIGN KEY (account_id) REFERENCES accounts (id) ON DELETE NO ACTION ON UPDATE NO ACTION
    )
CREATE TABLE
    `communication_bookmarked` (
        account_id varchar(50) NOT NULL,
        communication_id int(11) NOT NULL,
        created_at datetime DEFAULT current_timestamp(),
        PRIMARY KEY (account_id, communication_id),
        Constraint FK_Accounts_Communications_bookmarks FOREIGN KEY (account_id) REFERENCES accounts (id) ON DELETE NO ACTION ON UPDATE NO ACTION,
        Constraint FK_Communications_Communication_bookmarks FOREIGN KEY (communication_id) REFERENCES communications (id) ON DELETE CASCADE ON UPDATE NO ACTION )




ALTER TABLE communications ADD type TINYINT(11) NOT NULL DEFAULT 1