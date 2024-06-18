-- ALTER table posts ADD column `created_at_date` date default NOW();

-- UPDATE posts set created_at_date = created_at;

-- ALTER TABLE posts ADD COLUMN company_resource_id tinyint(4) default 2;

-- ALTER TABLE posts ADD COLUMN `url` varchar(255) NOT NULL DEFAULT 'https://neoworks.vn';

-- UPDATE posts set company_resource_id = (SELECT company from post_resource where post_resource.post_id = posts.id);

-- UPDATE posts set `url` = (SELECT `url` from post_resource where post_resource.post_id = posts.id) WHERE company_resource_id != 2;

-- CREATE INDEX idx_sort_fields ON posts(`created_at_date` DESC, `company_resource_id`, `id` DESC);