CREATE TABLE
    IF NOT EXISTS `academic_types` (
        `id` TINYINT(4) NOT NULL AUTO_INCREMENT,
        `value` VARCHAR(50) NOT NULL,
        `value_en` VARCHAR(100) NOT NULL,
        `value_ko` VARCHAR(50) NOT NULL,
        `status` TINYINT(4) NOT NULL DEFAULT 1,
        PRIMARY KEY (`id`)
    )

ALTER TABLE
    `profiles_educations`
ADD
    COLUMN `academic_type_id` TINYINT(4) DEFAULT 8 AFTER `extra_information`;

INSERT INTO
    `academic_types` (
        value,
        value_en,
        value_ko,
        status
    )
VALUES (
        'Cấp 1',
        'Primary school',
        '초등학교',
        1
    );

INSERT INTO
    `academic_types` (
        value,
        value_en,
        value_ko,
        status
    )
VALUES (
        'Cấp 2',
        'Secondary school',
        '중학교',
        1
    );

INSERT INTO
    `academic_types` (
        value,
        value_en,
        value_ko,
        status
    )
VALUES (
        'Cấp 3',
        'High school',
        '고등학교',
        1
    );

INSERT INTO
    `academic_types` (
        value,
        value_en,
        value_ko,
        status
    )
VALUES (
        'Trung cấp/ nghề',
        'Trade school',
        '전문학교',
        1
    );

INSERT INTO
    `academic_types` (
        value,
        value_en,
        value_ko,
        status
    )
VALUES (
        'Cao đẳng',
        'Community College',
        '전문 대학',
        1
    );

INSERT INTO
    `academic_types` (
        value,
        value_en,
        value_ko,
        status
    )
VALUES (
        'Đại học',
        'University',
        '대학교',
        1
    );

INSERT INTO
    `academic_types` (
        value,
        value_en,
        value_ko,
        status
    )
VALUES (
        'Sau đại học (Thạc sĩ, Tiến sĩ)',
        "After university (Master's degree, Doctoral degree)",
        '대학 졸업 후 (석사, 박사)',
        1
    );

INSERT INTO
    `academic_types` (
        value,
        value_en,
        value_ko,
        status
    )
VALUES ('Khác', 'Other', '다른', 1);

ALTER TABLE
    `profiles_educations`
ADD
    CONSTRAINT FK_AcademicTypes_ProfilesEducations FOREIGN KEY (academic_type_id) REFERENCES academic_types(id) ON DELETE CASCADE ON UPDATE NO ACTION;

CREATE TABLE
    IF NOT EXISTS `candidate_bookmarked` (
        candidate_id varchar(50) NOT NULL,
        recruit_id varchar(50) NOT NULL,
        created_at datetime DEFAULT current_timestamp(),
        PRIMARY KEY (candidate_id, recruit_id),
        Constraint FK_Candidate_Candidate_Bookmarked FOREIGN KEY (candidate_id) REFERENCES accounts (id) ON DELETE CASCADE ON UPDATE NO ACTION,
        Constraint FK_Recruit_Candidate_Bookmarked FOREIGN KEY (recruit_id) REFERENCES accounts (id) ON DELETE CASCADE ON UPDATE NO ACTION
    )

CREATE TABLE
    IF NOT EXISTS `view_profiles` (
        `id` TINYINT(4) NOT NULL AUTO_INCREMENT,
        recruit_id varchar(50) NOT NULL,
        profile_id varchar(50) NOT NULL,
        created_at datetime DEFAULT current_timestamp(),
        PRIMARY KEY (id),
        Constraint FK_Profile_View_Profiles FOREIGN KEY (profile_id) REFERENCES accounts (id) ON DELETE CASCADE ON UPDATE NO ACTION,
        Constraint FK_Recruit_View_Profiles FOREIGN KEY (recruit_id) REFERENCES accounts (id) ON DELETE CASCADE ON UPDATE NO ACTION
    )


DELETE FROM `profiles_skills`;
DELETE FROM `skill_level_types`;

INSERT INTO `skill_level_types` (value, value_en, value_ko) VALUES ('Tập sự', 'Novice', '초심자');
INSERT INTO `skill_level_types` (value, value_en, value_ko) VALUES ('Sơ cấp', 'Beginner', '초급');
INSERT INTO `skill_level_types` (value, value_en, value_ko) VALUES ('Kinh nghiệm', 'Experienced', '경험이풍부한');
INSERT INTO `skill_level_types` (value, value_en, value_ko) VALUES ('Thành thạo', 'Skillful', '잘만들어진');
INSERT INTO `skill_level_types` (value, value_en, value_ko) VALUES ('Chuyên gia', 'Expert', '전문가');

DELETE FROM `profiles_languages`;

DELETE FROM `language_level_types`;

INSERT INTO `language_level_types`  (value, value_en, value_ko) VALUES ('Sơ cấp','Primary','주요한');
INSERT INTO `language_level_types`  (value, value_en, value_ko) VALUES ('Trung cấp','Intermediate','중간의');
INSERT INTO `language_level_types`  (value, value_en, value_ko) VALUES ('Cao cấp','Hight-level','높은레벨');
INSERT INTO `language_level_types`  (value, value_en, value_ko) VALUES ('Thành thạo','Skillful','토종의');