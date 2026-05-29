import pool from "../config/db.js";

export const getProfileByUsername = async (username) => {
  const [rows] = await pool.execute(
    "SELECT * FROM github_profiles WHERE username=?",
    [username]
  );

  return rows[0];
};

export const createProfile = async (data) => {
  const query = `
    INSERT INTO github_profiles
    (
      username,
      name,
      bio,
      followers,
      following,
      public_repos,
      company,
      location,
      profile_url,
      account_age_days,
      most_used_language,
      total_stars,
      top_repository,
      developer_score
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  await pool.execute(query, [
    data.username,
    data.name,
    data.bio,
    data.followers,
    data.following,
    data.public_repos,
    data.company,
    data.location,
    data.profile_url,
    data.account_age_days,
    data.most_used_language,
    data.total_stars,
    data.top_repository,
    data.developer_score,
  ]);
};

export const getAllProfiles = async () => {
  const [rows] = await pool.execute(
    "SELECT * FROM github_profiles ORDER BY id DESC"
  );

  return rows;
};


export const updateProfile = async (username, data) => {
  const query = `
    UPDATE github_profiles
    SET
      name=?,
      bio=?,
      followers=?,
      following=?,
      public_repos=?,
      company=?,
      location=?,
      profile_url=?,
      account_age_days=?,
      most_used_language=?,
      total_stars=?,
      top_repository=?,
      developer_score=?
    WHERE username=?
  `;

  await pool.execute(query, [
    data.name,
    data.bio,
    data.followers,
    data.following,
    data.public_repos,
    data.company,
    data.location,
    data.profile_url,
    data.account_age_days,
    data.most_used_language,
    data.total_stars,
    data.top_repository,
    data.developer_score,
    username,
  ]);
};