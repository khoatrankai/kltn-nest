CREATE TABLE forgot_password (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) NOT NULL,
  token VARCHAR(255) NOT NULL,
  ip VARCHAR(255) NOT NULL,
  status INT DEFAULT 0,
  expires_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- https://res.cloudinary.com/ddwjnjssj/image/upload/v1696950746/images/hot-topics/influencer.png
-- https://res.cloudinary.com/ddwjnjssj/image/upload/v1709951526/images/hot-topics/pdk3o49beqycmnndx0ed.png

-- UPDATE hot_topics SET image = 'https://res.cloudinary.com/ddwjnjssj/image/upload/v1709951526/images/hot-topics/pdk3o49beqycmnndx0ed.png' WHERE id = 1;

ALTER TABLE accounts drop column name;

ALTER TABLE accounts add column is_active int default 0;

ALTER TABLE companies add column is_active int default 0;


CREATE TABLE follow_companies (
  id INT AUTO_INCREMENT PRIMARY KEY,
  company_id INT NOT NULL,
  account_id VARCHAR(50) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (company_id) REFERENCES companies(id)
);

-- view jobs 

CREATE TABLE view_jobs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  post_id INT NOT NULL,
  account_id VARCHAR(50) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (post_id) REFERENCES posts(id)
);
