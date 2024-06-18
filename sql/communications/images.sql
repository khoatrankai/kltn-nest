DROP TABLE IF EXISTS `communication_images`;
CREATE TABLE `communication_images` (
    id int(11) NOT NULL AUTO_INCREMENT,
    communication_id int(11) NOT NULL,
    image varchar(255) NOT NULL,
    status tinyint(4) DEFAULT 1,
    created_at datetime DEFAULT current_timestamp(),
    updated_at datetime DEFAULT current_timestamp() ON UPDATE current_timestamp(),
    PRIMARY KEY (id),
    Constraint FK_Communications_CommunicationImages FOREIGN KEY (communication_id) REFERENCES communications (id) ON DELETE CASCADE ON UPDATE NO ACTION
)