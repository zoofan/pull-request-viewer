import React, {useEffect, useState} from "react";
import {Card} from "@radix-ui/themes";
import Navbar from "./components/Navbar";
import FilterBar from "./components/FilterBar";
import PullRequestTable from "./components/PullRequestTable";

type PullRequest = {
  number: number;
  title: string;
  user: {
    login: string;
  };
  state: string; // "open" or "closed"
  created_at: string;
  closed_at: string | null;
  additions: number;
  deletions: number;
};

function App() {
  const [filters, setFilters] = useState({
    status: "All",
    dateRangeStart: "",
    dateRangeEnd: "",
    atRisk: false,
    repository: "facebook/react", // default
  });

  const [pullRequests, setPullRequests] = useState<PullRequest[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    // If user clears out the input, you might want to skip fetch
    // or default to 'facebook/react' again.
    const repo = filters.repository.trim() || "facebook/react";

    const fetchPublicRepoPRs = async () => {
      setLoading(true);
      setError("");

      try {
        // "state=all" => includes open and closed
        // "per_page=100" => fetch up to 100 PRs in one request
        const response = await fetch(
          `https://api.github.com/repos/${repo}/pulls?state=all&per_page=100`
        );

        if (!response.ok) {
          throw new Error(
            `GitHub API error: ${response.status} ${response.statusText}`
          );
        }

        const data = await response.json();
        setPullRequests(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPublicRepoPRs();
  }, [filters.repository]);

  // Filter logic
  const filteredPRs = pullRequests.filter((pr) => {
    const createdDate = new Date(pr.created_at);

    // 1. Status filter: "All" => no filtering
    if (filters.status !== "All") {
      if (pr.state !== filters.status.toLowerCase()) {
        return false;
      }
    }

    // 2. Date Range Start
    if (filters.dateRangeStart) {
      const start = new Date(filters.dateRangeStart);
      if (createdDate < start) {
        return false;
      }
    }

    // 3. Date Range End
    if (filters.dateRangeEnd) {
      const end = new Date(filters.dateRangeEnd);
      if (createdDate > end) {
        return false;
      }
    }

    // 4. "at risk": older than 7 days & still open
    if (filters.atRisk) {
      const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
      const isOverAWeek = createdDate < sevenDaysAgo;
      if (pr.state === "open" && !isOverAWeek) {
        return false;
      }
    }

    return true;
  });

  return (
    <div className="h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 bg-gray-50 flex items-start justify-center py-8">
        <div className="container max-w-6xl mx-auto px-6">
          <Card className="p-6 rounded-xl shadow-lg bg-white">
            <h1 className="text-2xl font-semibold text-gray-700 mb-4">
              Pull Requests
            </h1>

            <FilterBar filters={filters} setFilters={setFilters} />

            {loading && (
              <div>Loading Pull Requests for {filters.repository}...</div>
            )}
            {error && <div className="text-red-600">{error}</div>}

            {!loading && !error && (
              <PullRequestTable pullRequests={filteredPRs} />
            )}
          </Card>
        </div>
      </main>
    </div>
  );
}

export default App;
