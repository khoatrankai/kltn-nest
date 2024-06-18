-- CV Information

ALTER TABLE cv_information ADD COLUMN pad_index INT DEFAULT 0;

ALTER TABLE more_cv_information ADD COLUMN pad_index INT DEFAULT 0;

-- Cv Extra Information

ALTER TABLE cv_extra_information ADD COLUMN pad_index INT DEFAULT 0;

ALTER TABLE more_cv_extra_information ADD COLUMN pad_index INT DEFAULT 0;

-- CV Projects

ALTER TABLE cv_project ADD COLUMN pad_index INT DEFAULT 0;

ALTER TABLE more_cv_project ADD COLUMN pad_index INT DEFAULT 0;

-- CV layout

ALTER TABLE cv_layouts ADD COLUMN pad VARCHAR(255) DEFAULT NULL;

ALTER TABLE cv_layouts ADD COLUMN pad_part VARCHAR(255) DEFAULT NULL;

ALTER TABLE cv_layouts ADD COLUMN color_topic VARCHAR(255) DEFAULT NULL;

ALTER TABLE cv_layouts ADD COLUMN index_topic INT DEFAULT 0;

ALTER TABLE cv_layouts ADD COLUMN color INT DEFAULT 0;

ALTER TABLE cv_layouts ADD COLUMN color_text VARCHAR(255) DEFAULT NULL;

-- ADD name for more_cv_project

ALTER TABLE more_cv_project ADD COLUMN name VARCHAR(1000) DEFAULT NULL AFTER cv_project_id;



-- Update cv information

ALTER TABLE cv_information MODIFY COLUMN link VARCHAR(255);


ALTER TABLE more_cv_project MODIFY COLUMN link VARCHAR(255);

ALTER TABLE more_cv_extra_information MODIFY COLUMN description VARCHAR(5000);