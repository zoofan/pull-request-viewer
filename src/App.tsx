import {useEffect, useState} from "react";
import {Card, Button} from "@radix-ui/themes";
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
    // Default repo (user can change this in FilterBar)
    repository: "facebook/react",
  });

  // All PR data (up to 500) from GitHub
  const [pullRequests, setPullRequests] = useState<PullRequest[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Client-side pagination (20 per page)
  const [page, setPage] = useState(1);
  const RESULTS_PER_PAGE = 20;

  // Whenever repository changes, reset page to 1
  useEffect(() => {
    setPage(1);
  }, [filters.repository]);

  useEffect(() => {
    const repo = filters.repository.trim() || "facebook/react";

    const fetchUpTo500PRs = async () => {
      setLoading(true);
      setError("");
      let allPRs: PullRequest[] = [];
      let currentPage = 1;

      // Fetch up to 5 pages * 100 each = 500
      try {
        while (currentPage <= 5) {
          const url = `https://api.github.com/repos/${repo}/pulls?state=all&per_page=100&page=${currentPage}`;
          const response = await fetch(url);

          if (response.status === 403) {
            setError(
              "GitHub API rate limit reached. Please wait a few minutes before trying again."
            );
            break; // Stop further requests
          }

          if (!response.ok) {
            throw new Error(
              `GitHub API error: ${response.status} ${response.statusText}`
            );
          }

          const data: PullRequest[] = await response.json();
          allPRs = [...allPRs, ...data];

          // If fewer than 100 returned, no more pages to fetch
          if (data.length < 100) {
            break;
          }

          currentPage++;
        }

        setPullRequests(allPRs);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUpTo500PRs();
  }, [filters.repository]);

  // Apply client-side filters
  const filteredPRs = pullRequests.filter((pr) => {
    const createdDate = new Date(pr.created_at);

    // 1. Status filter: "All" => no filter
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
      // Ensure only "open" PRs are marked as at risk
      if (!(pr.state === "open" && isOverAWeek)) {
        return false;
      }
    }

    return true;
  });

  // Now apply client-side pagination to `filteredPRs` => 20 per page
  const totalPages = Math.ceil(filteredPRs.length / RESULTS_PER_PAGE);

  // Ensure page is within valid range (e.g. if we get fewer results than expected)
  const currentPage = Math.min(page, totalPages) || 1;

  const startIndex = (currentPage - 1) * RESULTS_PER_PAGE;
  const endIndex = startIndex + RESULTS_PER_PAGE;
  const displayedPRs = filteredPRs.slice(startIndex, endIndex);

  // Handlers
  const handlePrev = () => {
    if (currentPage > 1) {
      setPage((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setPage((prev) => prev + 1);
    }
  };

  return (
    <div className="h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 bg-gray-50 flex items-start justify-center py-8">
        <div className="container max-w-6xl mx-auto px-6">
          <Card className="p-6 rounded-xl shadow-lg bg-white">
            <h1 className="text-2xl font-semibold text-gray-700 mb-4">
              Pull Requests (showing 20 per page) – {filters.repository}
            </h1>

            <FilterBar filters={filters} setFilters={setFilters} />

            {loading && <div>Loading up to 500 PRs...</div>}
            {error && <div className="text-red-600">{error}</div>}

            {!loading && !error && (
              <>
                <PullRequestTable pullRequests={displayedPRs} />

                {/* Client-Side Pagination Controls */}
                {filteredPRs.length > 0 && (
                  <div className="flex justify-center items-center gap-4 mt-6">
                    <Button
                      variant="soft"
                      disabled={currentPage <= 1}
                      onClick={handlePrev}
                    >
                      Prev
                    </Button>
                    <span>
                      Page {currentPage} of {totalPages}
                    </span>
                    <Button
                      variant="soft"
                      disabled={currentPage >= totalPages}
                      onClick={handleNext}
                    >
                      Next
                    </Button>
                  </div>
                )}
              </>
            )}
          </Card>
        </div>
      </main>
    </div>
  );
}

export default App;
