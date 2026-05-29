CREATE TABLE github_profiles (
id INT AUTO_INCREMENT PRIMARY KEY,
username VARCHAR(100) UNIQUE NOT NULL,
name VARCHAR(255),
bio TEXT,
followers INT DEFAULT 0,
following INT DEFAULT 0,
public_repos INT DEFAULT 0,
company VARCHAR(255),
location VARCHAR(255),
profile_url VARCHAR(500),
account_age_days INT DEFAULT 0,

```
most_used_language VARCHAR(100),
total_stars INT DEFAULT 0,
top_repository VARCHAR(255),
developer_score INT DEFAULT 0,

analyzed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
```

);