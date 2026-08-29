"use client";

import { useEffect, useState } from "react";

type GithubStats = {
  publicRepos: number;
  followers: number;
} | null;

function parseUsername(url: string): string | null {
  try {
    const parsed = new URL(url);
    if (!parsed.hostname.includes("github.com")) return null;
    const [username] = parsed.pathname.replace(/^\//, "").split("/");
    return username || null;
  } catch {
    return null;
  }
}

// Optional live enhancement — silently degrades to `null` (no UI shown)
// if the URL isn't a real GitHub profile yet, or the request fails.
export function useGithubStats(githubUrl: string) {
  const [stats, setStats] = useState<GithubStats>(null);

  useEffect(() => {
    const username = parseUsername(githubUrl);
    if (!username) return;

    let cancelled = false;
    fetch(`https://api.github.com/users/${username}`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (cancelled || !data) return;
        setStats({
          publicRepos: data.public_repos ?? 0,
          followers: data.followers ?? 0,
        });
      })
      .catch(() => {
        // network/API failure — leave stats as null, UI degrades gracefully
      });

    return () => {
      cancelled = true;
    };
  }, [githubUrl]);

  return stats;
}
