explain
SELECT
	posts.id, posts.company_resource_id
FROM posts use index(rev_id_idx)
INNER JOIN wards ON posts.ward_id = wards.id
INNER JOIN districts ON districts.id = wards.district_id
INNER JOIN (SELECT * FROM posts_categories GROUP BY post_id) as posts_categories ON posts_categories.post_id = posts.id
INNER JOIN child_categories ON child_categories.id = posts_categories.category_id
WHERE posts.status = 1
	AND (posts.expired_date IS NULL OR posts.expired_date >= NOW())
	AND (posts.end_date IS NULL OR posts.end_date >= UNIX_TIMESTAMP(CURRENT_TIMESTAMP()) * 1000)
    WHERE (posts.company_resource_id = 2 AND id < 84215) OR (posts.company_resource_id != 2 AND id < 84215)
GROUP BY posts.id
ORDER BY created_at_date DESC, field(company_resource_id,2) desc, posts.id desc
LIMIT 21 OFFSET 0