CREATE TABLE IF NOT EXISTS cv_categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cv_index TINYINT(4),
    account_id VARCHAR(50),
    parent_category_id INT,
    ward_id VARCHAR(20),
    percent TINYINT(4),
    CONSTRAINT fk_parent_category_id FOREIGN KEY (parent_category_id) REFERENCES parent_categories(id),
    CONSTRAINT fk_ward_id FOREIGN KEY (ward_id) REFERENCES wards(id)
);


CREATE TABLE IF NOT EXISTS cvs_posts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    account_id VARCHAR(50),
    cv_index TINYINT(4),
    post_id INT,
    type TINYINT(4),
    CONSTRAINT fk_post_id FOREIGN KEY (post_id) REFERENCES posts(id)
);


