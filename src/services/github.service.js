import axios from "axios";

import dotenv from "dotenv";
dotenv.config();

const headers = {
  Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
};

export const fetchGithubProfile = async (username) => {
  const userResponse = await axios.get(
    `${process.env.GITHUB_API_BASE_URL}/users/${username}`,
    { headers }
  );

  const reposResponse = await axios.get(
    `${process.env.GITHUB_API_BASE_URL}/users/${username}/repos?per_page=100`,
    { headers }
  );


  return {
    user: userResponse.data,
    repos: reposResponse.data,
  };
};