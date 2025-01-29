import React, {useState} from "react";
import {Button, Card, Checkbox, Select, Table} from "@radix-ui/themes";
import {format} from "date-fns";

function App() {
  const [filters, setFilters] = useState({
    dateRange: "",
    status: "",
    atRisk: false,
    repository: "",
  });

  const pullRequests = [
    // Sample data for UI rendering
    {
      status: "Open",
      title: "Fix login bug",
      number: 123,
      repository: "repo-1",
      author: "johndoe",
      linesAdded: 50,
      linesRemoved: 10,
      comments: 5,
      dateOpened: "2025-01-20",
      dateClosed: null,
    },
    {
      status: "Closed",
      title: "Update readme",
      number: 456,
      repository: "repo-2",
      author: "janedoe",
      linesAdded: 10,
      linesRemoved: 5,
      comments: 2,
      dateOpened: "2025-01-10",
      dateClosed: "2025-01-15",
    },
  ];

  return (
    <div className="h-screen flex flex-col">
      {/* Navbar */}
      <nav className="w-full bg-white shadow-md p-4 flex justify-between items-center">
        <div className="text-lg font-bold">MyApp</div>
        <div>
          <Button variant="outline">Sign In</Button>
        </div>
      </nav>

      {/* Empty Page Content */}
      <main className="flex-1 bg-gray-100 flex items-center justify-center">
        <div className="container mx-auto p-6">
          <Card className="p-4">
            <div className="flex gap-4 mb-4">
              <input
                type="date"
                value={filters.dateRange}
                onChange={(e) =>
                  setFilters({...filters, dateRange: e.target.value})
                }
                className="border p-2 rounded"
                placeholder="Filter by date"
              />
              <Select.Root
                value={filters.status}
                onValueChange={(value) =>
                  setFilters({...filters, status: value})
                }
              >
                <Select.Trigger className="border p-2 rounded">
                  {filters.status}
                </Select.Trigger>
                <Select.Content>
                  <Select.Item value="Open">Open</Select.Item>
                  <Select.Item value="Closed">Closed</Select.Item>
                </Select.Content>
              </Select.Root>
              <div className="flex items-center gap-2">
                <Checkbox
                  checked={filters.atRisk}
                  onCheckedChange={(checked) =>
                    setFilters({...filters, atRisk: checked})
                  }
                />
                <label>Show At-Risk PRs</label>
              </div>
              <input
                type="text"
                value={filters.repository}
                onChange={(e) =>
                  setFilters({...filters, repository: e.target.value})
                }
                className="border p-2 rounded"
                placeholder="Filter by repository"
              />
            </div>
            <Table.Root className="w-full border-collapse border">
              <Table.Header>
                <Table.Row className="bg-gray-200">
                  <Table.ColumnHeaderCell>Status</Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell>Title</Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell>Number</Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell>Repository</Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell>Author</Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell>Lines Added</Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell>Lines Removed</Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell>Comments</Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell>Date Opened</Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell>Date Closed</Table.ColumnHeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {pullRequests.map((pr) => (
                  <Table.Row
                    key={pr.number}
                    className={
                      new Date(pr.dateOpened) <
                      new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
                        ? "bg-red-100"
                        : ""
                    }
                  >
                    <Table.RowHeaderCell>{pr.status}</Table.RowHeaderCell>
                    <Table.Cell>{pr.title}</Table.Cell>
                    <Table.Cell>#{pr.number}</Table.Cell>
                    <Table.Cell>{pr.repository}</Table.Cell>
                    <Table.Cell>{pr.author}</Table.Cell>
                    <Table.Cell>{pr.linesAdded}</Table.Cell>
                    <Table.Cell>{pr.linesRemoved}</Table.Cell>
                    <Table.Cell>{pr.comments}</Table.Cell>
                    <Table.Cell>
                      {format(new Date(pr.dateOpened), "yyyy-MM-dd")}
                    </Table.Cell>
                    <Table.Cell>
                      {pr.dateClosed
                        ? format(new Date(pr.dateClosed), "yyyy-MM-dd")
                        : "-"}
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table.Root>
          </Card>
        </div>
      </main>
    </div>
  );
}

export default App;
