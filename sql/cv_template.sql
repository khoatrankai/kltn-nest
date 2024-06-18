CREATE TABLE cv_template (
    id INT(11) NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    image VARCHAR(255) NOT NULL,
    status TINYINT(1) NOT NULL DEFAULT 1,
    parent_category_id INT(11) NOT NULL DEFAULT 0,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    CONSTRAINT FK_CvTemplate_CvTemplate FOREIGN KEY (parent_category_id) REFERENCES parent_categories(id) ON DELETE CASCADE ON UPDATE NO ACTION
);


INSERT INTO cv_template (name, image, status, parent_category_id) VALUES ('CV Template 1', 'cv_template_1.png', 1, 2);

INSERT INTO cv_template (name, image, status, parent_category_id) VALUES ('CV Template 2', 'cv_template_2.png', 1, 2);

INSERT INTO cv_template (name, image, status, parent_category_id) VALUES ('CV Template 3', 'cv_template_3.png', 1, 2);
