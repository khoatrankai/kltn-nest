CREATE TABLE user_point_histories (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id VARCHAR(50) NOT NULL,
    order_id VARCHAR(50) NOT NULL,
    amount INT NOT NULL,
    description VARCHAR(1000) DEFAULT NULL,
    status TINYINT(4) NOT NULL DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE user_point_histories ADD CONSTRAINT fk_user_point_histories_user_id FOREIGN KEY (user_id) REFERENCES accounts(id);

ALTER TABLE profiles ADD COLUMN point INT NOT NULL DEFAULT 0;
