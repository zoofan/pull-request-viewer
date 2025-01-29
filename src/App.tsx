import React, {useState} from "react";
import {Card} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import {Select} from "@/components/ui/select";
import {Switch} from "@/components/ui/switch";



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
          <Card>
            <CardContent>
              <div className="flex gap-4 mb-4">
                <Input
                  type="date"
                  value={filters.dateRange}
                  onChange={(e) =>
                    setFilters({...filters, dateRange: e.target.value})
                  }
                  placeholder="Filter by date"
                />
                <Select
                  onChange={(e) =>
                    setFilters({...filters, status: e.target.value})
                  }
                >
                  <SelectItem value="">All Statuses</SelectItem>
                  <SelectItem value="Open">Open</SelectItem>
                  <SelectItem value="Closed">Closed</SelectItem>
                </Select>
                <Checkbox
                  checked={filters.atRisk}
                  onCheckedChange={(checked) =>
                    setFilters({...filters, atRisk: checked})
                  }
                >
                  Show At-Risk PRs
                </Checkbox>
                <Input
                  type="text"
                  value={filters.repository}
                  onChange={(e) =>
                    setFilters({...filters, repository: e.target.value})
                  }
                  placeholder="Filter by repository"
                />
              </div>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableHeaderCell>Status</TableHeaderCell>
                    <TableHeaderCell>Title</TableHeaderCell>
                    <TableHeaderCell>Number</TableHeaderCell>
                    <TableHeaderCell>Repository</TableHeaderCell>
                    <TableHeaderCell>Author</TableHeaderCell>
                    <TableHeaderCell>Lines Added</TableHeaderCell>
                    <TableHeaderCell>Lines Removed</TableHeaderCell>
                    <TableHeaderCell>Comments</TableHeaderCell>
                    <TableHeaderCell>Date Opened</TableHeaderCell>
                    <TableHeaderCell>Date Closed</TableHeaderCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {pullRequests.map((pr) => (
                    <TableRow
                      key={pr.number}
                      className={
                        new Date(pr.dateOpened) <
                        new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
                          ? "bg-red-100"
                          : ""
                      }
                    >
                      <TableCell>{pr.status}</TableCell>
                      <TableCell>{pr.title}</TableCell>
                      <TableCell>#{pr.number}</TableCell>
                      <TableCell>{pr.repository}</TableCell>
                      <TableCell>{pr.author}</TableCell>
                      <TableCell>{pr.linesAdded}</TableCell>
                      <TableCell>{pr.linesRemoved}</TableCell>
                      <TableCell>{pr.comments}</TableCell>
                      <TableCell>
                        {format(new Date(pr.dateOpened), "yyyy-MM-dd")}
                      </TableCell>
                      <TableCell>
                        {pr.dateClosed
                          ? format(new Date(pr.dateClosed), "yyyy-MM-dd")
                          : "-"}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}


export default App;
