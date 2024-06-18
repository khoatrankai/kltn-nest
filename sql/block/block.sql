CREATE TABLE block_reasons (
    id INT AUTO_INCREMENT PRIMARY KEY,
    reason VARCHAR(1000) NOT NULL,
    status TINYINT(1) DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

INSERT INTO block_reasons (reason) VALUES ('Spamming');
INSERT INTO block_reasons (reason) VALUES ('Abusing');
INSERT INTO block_reasons (reason) VALUES ('Violating');
INSERT INTO block_reasons (reason) VALUES ('Other');

ALTER TABLE accounts ADD COLUMN status TINYINT(1) DEFAULT 1;