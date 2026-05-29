import { fetchGithubProfile } from "../services/github.service.js";

import {
  createProfile,
  updateProfile,
  getProfileByUsername,
  getAllProfiles,
} from "../models/profile.model.js";


export const analyzeProfile = async (req, res) => {
  try {
    const { username } = req.body;

    if (!username) {
      return res.status(400).json({
        success: false,
        message: "Username is required",
      });
    }

    const { user, repos } = await fetchGithubProfile(username);

    const accountAgeDays = Math.floor(
      (Date.now() - new Date(user.created_at)) /
        (1000 * 60 * 60 * 24)
    );

    let totalStars = 0;
    const languageCount = {};

    for (const repo of repos) {
      totalStars += repo.stargazers_count;

      if (repo.language) {
        languageCount[repo.language] =
          (languageCount[repo.language] || 0) + 1;
      }
    }

    let mostUsedLanguage = null;
    let maxCount = 0;

    for (const language in languageCount) {
      if (languageCount[language] > maxCount) {
        maxCount = languageCount[language];
        mostUsedLanguage = language;
      }
    }

    let topRepository = null;
    let highestStars = -1;

    for (const repo of repos) {
      if (repo.stargazers_count > highestStars) {
        highestStars = repo.stargazers_count;
        topRepository = repo.name;
      }
    }

    const developerScore =
      user.followers +
      totalStars * 2 +
      user.public_repos * 5;

    const profileData = {
      username: user.login,
      name: user.name,
      bio: user.bio,
      followers: user.followers,
      following: user.following,
      public_repos: user.public_repos,
      company: user.company,
      location: user.location,
      profile_url: user.html_url,
      account_age_days: accountAgeDays,
      most_used_language: mostUsedLanguage,
      total_stars: totalStars,
      top_repository: topRepository,
      developer_score: developerScore,
    };

    const existingProfile = await getProfileByUsername(
      profileData.username
    );

    if (existingProfile) {
      await updateProfile(
        profileData.username,
        profileData
      );

      return res.status(200).json({
        success: true,
        message: "Profile updated successfully",
        data: profileData,
      });
    }

    await createProfile(profileData);

    return res.status(201).json({
      success: true,
      message: "Profile analyzed and stored successfully",
      data: profileData,
    });
  } catch (error) {
    console.log(error?.message);

    if (error.response?.status === 404) {
      return res.status(404).json({
        success: false,
        message: "GitHub user not found",
      });
    }

    if (error.response?.status === 403) {
      return res.status(403).json({
        success: false,
        message: "GitHub API rate limit exceeded",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getProfiles = async (req, res) => {
  try {
    const profiles = await getAllProfiles();

    return res.status(200).json({
      success: true,
      count: profiles.length,
      data: profiles,
    });
  } catch (error) {
    console.log(error?.message);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getProfile = async (req, res) => {
  try {
    const { username } = req.params;

    const profile = await getProfileByUsername(username);

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: "Profile not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: profile,
    });
  } catch (error) {
    console.log(error?.message);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};