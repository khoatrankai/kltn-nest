CREATE TABLE service_recruitment (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description VARCHAR(1000) NOT NULL,
    price INT NOT NULL,
    discount INT NOT NULL,
    expiration INT NOT NULL,
    icon VARCHAR(255) NOT NULL DEFAULT 'default.png',
    status INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE service_recruitment_images (
    id INT AUTO_INCREMENT PRIMARY KEY,
    service_recruitment_id INT NOT NULL,
    image VARCHAR(255) NOT NULL,
    status INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    -- constraint
    CONSTRAINT fk_service_recruitment_images_service_recruitment_id FOREIGN KEY (service_recruitment_id) REFERENCES service_recruitment(id)
);

ALTER TABLE service_recruitment ADD COLUMN type VARCHAR(50) NOT NULL DEFAULT 'V1' COMMENT 'V1: Basic, V2: Pro, V3: Premium, V4: Ultimate' AFTER icon;


CREATE TABLE service_history (
    id INT AUTO_INCREMENT PRIMARY KEY,
    account_id VARCHAR(50) NOT NULL,
    service_recruitment_id INT NOT NULL,
    service_name VARCHAR(255) NOT NULL,
    service_description VARCHAR(1000) NOT NULL,
    service_price INT NOT NULL,
    service_type VARCHAR(50) NOT NULL,
    service_expiration INT NOT NULL,
    status INT NOT NULL DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_service_history_service_recruitment_id FOREIGN KEY (service_recruitment_id) REFERENCES service_recruitment(id),
    CONSTRAINT fk_service_history_account_id FOREIGN KEY (account_id) REFERENCES accounts(id)
);

DELIMITER //

CREATE TRIGGER before_insert_service_history
BEFORE INSERT ON service_history
FOR EACH ROW
BEGIN
    DECLARE svc_name VARCHAR(255);
    DECLARE svc_desc VARCHAR(1000);
    DECLARE svc_price INT;
    DECLARE svc_type VARCHAR(50);
    DECLARE svc_expiration INT;

    SELECT name, description, price, type, expiration
    INTO svc_name, svc_desc, svc_price, svc_type, svc_expiration
    FROM service_recruitment
    WHERE id = NEW.service_recruitment_id;

    SET NEW.service_name = svc_name;
    SET NEW.service_description = svc_desc;
    SET NEW.service_price = svc_price;
    SET NEW.service_type = svc_type;
    SET NEW.service_expiration = svc_expiration;
END//

DELIMITER ;




