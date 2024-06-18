CREATE TABLE cv_layouts (
    id SERIAL PRIMARY KEY,
    account_id VARCHAR(50) NOT NULL,
    cv_index INT NOT NULL,
    layout VARCHAR(255) NOT NULL,
    color VARCHAR(255) NOT NULL
);

--  cv_information
ALTER TABLE cv_information RENAME COLUMN `index` TO `row`;

ALTER TABLE cv_information ADD COLUMN part INT NOT NULL;

ALTER TABLE cv_information ADD COLUMN color varchar(255);

-- cv_project

ALTER TABLE cv_project ADD COLUMN color varchar(255);

ALTER TABLE cv_project ADD COLUMN part INT NOT NULL; 

ALTER TABLE cv_project RENAME COLUMN `index` TO `row`;

-- cv_extra_information

ALTER TABLE cv_extra_information ADD COLUMN color varchar(255);

ALTER TABLE cv_extra_information ADD COLUMN part INT NOT NULL;

ALTER TABLE cv_extra_information RENAME COLUMN `index` TO `row`;



ALTER TABLE cv_extra_information RENAME COLUMN `column` TO `col`;

ALTER TABLE cv_project RENAME COLUMN `column` TO `col`;

ALTER TABLE cv_information RENAME COLUMN `column` TO `col`;

ALTER TABLE cv_extra_information ADD COLUMN part INT DEFAULT 0;

-- New

ALTER TABLE cv_extra_information DROP COLUMN part;

ALTER TABLE cv_extra_information ADD COLUMN part INT DEFAULT 0;

ALTER TABLE cv_information DROP COLUMN part;

ALTER TABLE cv_information ADD COLUMN part INT DEFAULT 0;


-- New 8/6/2024

ALTER TABLE cv_project DROP COLUMN color;


