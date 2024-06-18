DROP TABLE IF EXISTS `communication_categories`;

CREATE TABLE `communication_categories` (
    communication_id int(11) NOT NULL,
    category_id int(11) NOT NULL,
    status tinyint(4) DEFAULT 1,
    created_at datetime DEFAULT current_timestamp(),
    updated_at datetime DEFAULT current_timestamp() ON UPDATE current_timestamp(),
    PRIMARY KEY (communication_id, category_id),
    Constraint FK_Communications_CommunicationCategories FOREIGN KEY (communication_id) REFERENCES communications (id) ON DELETE CASCADE ON UPDATE NO ACTION,
    Constraint FK_Categories_CommunicationCategories FOREIGN KEY (category_id) REFERENCES parent_categories (id) ON DELETE CASCADE ON UPDATE NO ACTION
)