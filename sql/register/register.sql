CREATE TABLE `accounts_tmp` (
  `id` varchar(50) NOT NULL DEFAULT uuid(),
  `email` varchar(50) DEFAULT NULL,
  `role` tinyint(4) DEFAULT 0,
  `name` varchar(200) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `type` tinyint(4) DEFAULT 0,
  `otp` VARCHAR(6) DEFAULT NULL,
  `otp_expired` BIGINT DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
