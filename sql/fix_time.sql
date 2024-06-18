-- New column `start_time_new` is Time
-- current start_time is stringDecimals
-- new new_start_time is Time


ALTER TABLE posts
ADD COLUMN new_start_time TIME(6) default '00:00:00'
AFTER start_time;

-- IF start time >= 144000000 THEN start_time_new = start_time - (24 * 16selec * 60 * 60 * 1000)
-- ELSE start_time_new = start_time - (16 * 60 * 60 * 1000)


UPDATE posts
SET start_time_new = CASE
    WHEN start_time >= 144000000 THEN SEC_TO_TIME((start_time / 1000) - (16 * 60 * 60) - (24 * 60 * 60))
    ELSE SEC_TO_TIME((start_time / 1000) - (16 * 60 * 60))
END;

ALTER TABLE posts
ADD COLUMN new_end_time TIME(6) default '00:00:00'
AFTER end_time;

UPDATE posts
SET new_end_time = CASE
    WHEN end_time >= 144000000 THEN SEC_TO_TIME((end_time / 1000) - (16 * 60 * 60) - (24 * 60 * 60))
    ELSE SEC_TO_TIME((end_time / 1000) - (16 * 60 * 60))
END;
