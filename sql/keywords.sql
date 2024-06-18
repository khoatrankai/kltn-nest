-- CREATE TABLE `keyword_districts` (
--   `keyword_id` int(11) NOT NULL,
--   `district_id` varchar(20) NOT NULL,
--   PRIMARY KEY (`keyword_id`,`district_id`),
--   KEY `district_id` (`district_id`),
--   CONSTRAINT `keyword_districts_ibfk_1` FOREIGN KEY (`keyword_id`) REFERENCES `keywords_notification` (`id`) ON DELETE CASCADE,
--   CONSTRAINT `keyword_districts_ibfk_2` FOREIGN KEY (`district_id`) REFERENCES `districts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
-- ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- CREATE TABLE keyword_categories (
--     keyword_id INTEGER NOT NULL,
--     category_id INTEGER NOT NULL,
--     PRIMARY KEY (keyword_id, category_id),
--     FOREIGN KEY (keyword_id) REFERENCES keywords_notification (id) ON UPDATE CASCADE ON DELETE CASCADE,
--     FOREIGN KEY (category_id) REFERENCES parent_categories (id)
-- );

-- CREATE TABLE `keyword_categories` (
--   `keyword_id` int(11) NOT NULL,
--   `category_id` int(11) NOT NULL,
--   PRIMARY KEY (`keyword_id`,`category_id`),
--   KEY `category_id` (`category_id`),
--   CONSTRAINT `keyword_categories_ibfk_1` FOREIGN KEY (`keyword_id`) REFERENCES `keywords_notification` (`id`) ON UPDATE CASCADE ON DELETE CASCADE,
--   CONSTRAINT `keyword_categories_ibfk_2` FOREIGN KEY (`category_id`) REFERENCES `child_categories` (`id`) ON UPDATE CASCADE ON DELETE CASCADE
-- ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci


-- alter table keywords_notification drop CONSTRAINT `FK_Keyword_District`;
-- alter table keywords_notification drop CONSTRAINT `FK_Keyword_Category`;
-- alter table keywords_notification drop CONSTRAINT `FK_Keyword_Account`;
-- alter table keywords_notification drop index `account_id`;
-- alter table keywords_notification CONSTRAINT `FK_Keyword_Category` FOREIGN KEY (`category_id`) REFERENCES `parent_categories` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;
-- alter table keywords_notification CONSTRAINT `FK_Keyword_District` FOREIGN KEY (`district_id`) REFERENCES `districts` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;
--   CONSTRAINT `keyword_categories_ibfk_1` FOREIGN KEY (`keyword_id`) REFERENCES `keywords_notification` (`id`) ON UPDATE CASCADE,
--   CONSTRAINT `keyword_categories_ibfk_2` FOREIGN KEY (`category_id`) REFERENCES `child_categories` (`id`)
-- ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci


-- alter table keywords_notification add CONSTRAINT `FK_Keyword_Account` FOREIGN KEY (`account_id`) REFERENCES `accounts` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;


INSERT INTO keyword_districts
SELECT id, district_id
FROM keywords_notification
WHERE district_id IS NOT NULL
ON DUPLICATE KEY UPDATE keyword_id = VALUES(keyword_id), district_id = VALUES(district_id);


-- category_id is id of parent_categories
-- add to keyword_categories table max 10 child_categories of parent_categories
INSERT INTO keyword_categories
SELECT keywords_notification.id, child_categories.id AS category_id
FROM keywords_notification
JOIN (SELECT id, parent_category_id FROM child_categories LIMIT 10) AS child_categories
ON keywords_notification.category_id = child_categories.parent_category_id
ON DUPLICATE KEY UPDATE keyword_id = VALUES(keyword_id), category_id = VALUES(category_id);
