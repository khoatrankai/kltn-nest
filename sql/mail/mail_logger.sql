CREATE TABLE mail_logs (
  id int NOT NULL auto_increment,
  `date` datetime NOT NULL default NOW(),
  account_id varchar(50) NOT NULL DEFAULT uuid(),
  recipient varchar(255) NOT NULL,
  subject varchar(255) NOT NULL,
  template varchar(255) default NULL,
  PRIMARY KEY (id),
CONSTRAINT `FK_MailLog_Account` FOREIGN KEY (`account_id`) REFERENCES `accounts` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
);