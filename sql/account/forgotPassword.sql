
CREATE TABLE IF NOT EXISTS `forgot_password` (
    id INT NOT NULL AUTO_INCREMENT,
    email VARCHAR(255) NOT NULL,
    account_id VARCHAR(50) NOT NULL,
    otp VARCHAR(6) NOT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    otp_expired BIGINT(20) NOT NULL,
    PRIMARY KEY (id),
    Constraint FK_Accounts_ForgotPasswords FOREIGN KEY (account_id) REFERENCES accounts (id) ON DELETE NO ACTION ON UPDATE NO ACTION

);