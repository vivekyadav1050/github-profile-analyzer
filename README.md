# GitHub Profile Analyzer API

## Overview

GitHub Profile Analyzer API is a backend application built with Node.js, Express.js, MySQL, and the GitHub REST API. The system analyzes GitHub user profiles, generates meaningful developer insights, and stores the analyzed data for future access.

Instead of simply returning raw GitHub data, the application performs additional analysis such as identifying the most used programming language, calculating total repository stars, detecting the top-performing repository, and generating a custom developer score.

---

## Features

### Core Features

* Fetch GitHub user profile using username
* Retrieve public repositories from GitHub
* Store analyzed profile data in MySQL
* Fetch all analyzed profiles
* Fetch a specific profile by username
* Update existing profile analysis automatically

### Advanced Insights

* Most Used Programming Language
* Total Stars Across All Repositories
* Top Repository Detection
* Developer Score Calculation
* Account Age Analysis
* Repository Statistics Aggregation

### Reliability

* GitHub API Rate Limit Handling
* Invalid Username Validation
* Centralized Error Handling
* Duplicate Profile Prevention
* Secure Environment Variable Management

---

## Tech Stack

| Technology      | Purpose              |
| --------------- | -------------------- |
| Node.js         | Backend Runtime      |
| Express.js      | REST API Framework   |
| MySQL           | Database             |
| GitHub REST API | External Data Source |
| Axios           | HTTP Client          |
| Aiven MySQL     | Cloud Database       |

---

## System Architecture

Client Request

↓

Express API

↓

GitHub REST API

↓

Profile Analysis Engine

↓

MySQL Database

↓

JSON Response

---

## Database Schema

### github_profiles

| Column             | Type         |
| ------------------ | ------------ |
| id                 | INT          |
| username           | VARCHAR(100) |
| name               | VARCHAR(255) |
| bio                | TEXT         |
| followers          | INT          |
| following          | INT          |
| public_repos       | INT          |
| company            | VARCHAR(255) |
| location           | VARCHAR(255) |
| profile_url        | VARCHAR(500) |
| account_age_days   | INT          |
| most_used_language | VARCHAR(100) |
| total_stars        | INT          |
| top_repository     | VARCHAR(255) |
| developer_score    | INT          |
| analyzed_at        | TIMESTAMP    |

---

## API Endpoints

### Analyze GitHub Profile

POST /api/github/analyze

Request

```json
{
  "username": "torvalds"
}
```

---

### Get All Profiles

GET /api/github/profiles

---

### Get Single Profile

GET /api/github/profiles/:username

Example:

```http
GET /api/github/profiles/torvalds
```

---

## Developer Score Formula

The application generates a custom developer score using:

Developer Score =
Followers +
(Total Stars × 2) +
(Public Repositories × 5)

This score provides a simple indicator of repository popularity and community engagement.

---

## Installation

### Clone Repository

```bash
git clone https://github.com/vivekyadav1050/github-profile-analyzer.git
```

### Install Dependencies

```bash
npm install
```

### Create Environment Variables

```env
DB_HOST=
DB_PORT=
DB_USER=
DB_PASSWORD=
DB_NAME=
GITHUB_TOKEN=
```

### Start Application

```bash
npm start
```

---

## Sample Response

```json
{
  "success": true,
  "data": {
    "username": "torvalds",
    "followers": 305000,
    "public_repos": 11,
    "most_used_language": "C",
    "total_stars": 200000,
    "top_repository": "linux",
    "developer_score": 705000
  }
}
```

---

## Future Improvements

* Repository Activity Analysis
* Contribution Heatmap Integration
* GitHub Organization Insights
* Repository Language Distribution Charts
* Profile Analytics Dashboard
* Caching Layer with Redis

---

## Author

Vivek Yadav

Backend Developer | Node.js | Express.js | MySQL
