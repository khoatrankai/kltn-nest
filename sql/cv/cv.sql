CREATE TABLE IF NOT EXISTS cv_information (
        id INT AUTO_INCREMENT PRIMARY KEY,
        account_id VARCHAR(50) NOT NULL,
        email VARCHAR(50) DEFAULT NULL,
        name VARCHAR(255) DEFAULT NULL,
        phone VARCHAR(20) DEFAULT NULL,
        link VARCHAR(50) DEFAULT NULL,
        address VARCHAR(255) DEFAULT NULL,
        avatar VARCHAR(255) DEFAULT NULL,
        `type` VARCHAR(50) DEFAULT NULL,
        `intent` VARCHAR(1000) DEFAULT NULL,
        `index` TINYINT(4) DEFAULT 0,
        `column` TINYINT(4) DEFAULT 0,
        `cv_index` TINYINT(4) DEFAULT 0,
        FOREIGN KEY (account_id) REFERENCES accounts(id) ON DELETE CASCADE ON UPDATE NO ACTION
);


CREATE TABLE IF NOT EXISTS more_cv_information(
    id INT AUTO_INCREMENT PRIMARY KEY,
    cv_information_id INT DEFAULT NULL,
    content VARCHAR(1000) DEFAULT NULL,
    FOREIGN KEY (cv_information_id) REFERENCES cv_information(id) ON DELETE CASCADE ON UPDATE NO ACTION
);

CREATE TABLE
    IF NOT EXISTS cv_extra_information (
        id INT AUTO_INCREMENT PRIMARY KEY,
        account_id VARCHAR(50) NOT NULL,
        type VARCHAR(255) DEFAULT 'type1',
        `index` TINYINT(4) DEFAULT 0,
        `column` TINYINT(4) DEFAULT 0,
        `cv_index` TINYINT(4) DEFAULT 0,
        FOREIGN KEY (account_id) REFERENCES accounts(id) ON DELETE CASCADE ON UPDATE NO ACTION
    );


CREATE TABLE
    IF NOT EXISTS more_cv_extra_information (
        id INT AUTO_INCREMENT PRIMARY KEY,
        cv_extra_information_id INT NOT NULL,
        position VARCHAR(255) DEFAULT NULL,
        time VARCHAR(50) DEFAULT NULL,
        company VARCHAR(255) DEFAULT NULL,
        description VARCHAR(1000) DEFAULT NULL,
        `index` TINYINT(4) DEFAULT 0,
        FOREIGN KEY (cv_extra_information_id) REFERENCES cv_extra_information(id) ON DELETE CASCADE ON UPDATE NO ACTION
    );

CREATE TABLE
    IF NOT EXISTS cv_project (
        id INT AUTO_INCREMENT PRIMARY KEY,
        account_id VARCHAR(50) NOT NULL,
        type VARCHAR(255) DEFAULT NULL,
        `index` TINYINT(4) DEFAULT 0,
        `column` TINYINT(4) DEFAULT 0,
        `cv_index` TINYINT(4) DEFAULT 0,
        FOREIGN KEY (account_id) REFERENCES accounts(id) ON DELETE CASCADE ON UPDATE NO ACTION

);


CREATE TABLE
    IF NOT EXISTS more_cv_project (
        id INT AUTO_INCREMENT PRIMARY KEY,
        cv_project_id INT NOT NULL,
        time VARCHAR(50) DEFAULT NULL,
        link VARCHAR(50) DEFAULT NULL,
        participant VARCHAR(50) DEFAULT NULL,
        position VARCHAR(100) DEFAULT NULL,
        functionality VARCHAR(1000) DEFAULT NULL,
        technology VARCHAR(1000) DEFAULT NULL,
        `index` TINYINT(4) DEFAULT 0,
        FOREIGN KEY (cv_project_id) REFERENCES cv_project(id) ON DELETE CASCADE ON UPDATE NO ACTION
    );


ALTER TABLE `profiles_cvs` ADD COLUMN `cv_index` TINYINT(4) DEFAULT 0 AFTER `path`;

ALTER TABLE `profiles_cvs` ADD COLUMN `template_id` TINYINT(4) DEFAULT 0 AFTER `cv_index`;


CREATE TABLE IF NOT EXISTS view_companies (
    id INT AUTO_INCREMENT PRIMARY KEY,
    account_id VARCHAR(50) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (account_id) REFERENCES accounts(id) ON DELETE CASCADE ON UPDATE NO ACTION
);


