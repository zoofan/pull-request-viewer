import React from "react";
import {Table} from "@radix-ui/themes";
import {format} from "date-fns";

type PullRequest = {
  number: number;
  title: string;
  user: {login: string};
  state: string;
  created_at: string;
  closed_at: string | null;
  additions: number;
  deletions: number;
};

interface PullRequestTableProps {
  pullRequests: PullRequest[];
}

const PullRequestTable: React.FC<PullRequestTableProps> = ({pullRequests}) => {
  return (
    <div className="overflow-auto rounded-lg shadow-md">
      <Table.Root className="w-full border-collapse bg-white">
        <Table.Header>
          <Table.Row className="bg-gray-100 text-sm uppercase text-gray-700 tracking-wider">
            <Table.ColumnHeaderCell className="p-3">
              Status
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="p-3">
              Title
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="p-3">
              Number
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="p-3">
              Author
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="p-3">
              Lines Added
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="p-3">
              Lines Removed
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="p-3">
              Date Opened
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="p-3">
              Date Closed
            </Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {pullRequests.map((pr) => {
            const createdDate = new Date(pr.created_at);
            const closedDate = pr.closed_at ? new Date(pr.closed_at) : null;

            // "At-Risk" = older than 7 days & still open
            const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
            const isOlderThan7Days =
              createdDate < sevenDaysAgo && pr.state === "open";

            return (
              <Table.Row
                key={pr.number}
                className={`text-sm border-b last:border-0 ${
                  isOlderThan7Days
                    ? "bg-yellow-50"
                    : "bg-white hover:bg-gray-50"
                }`}
              >
                <Table.RowHeaderCell className="p-3 font-semibold text-gray-600">
                  {pr.state}
                </Table.RowHeaderCell>
                <Table.Cell className="p-3 whitespace-nowrap">
                  {pr.title}
                </Table.Cell>
                <Table.Cell className="p-3 whitespace-nowrap">
                  #{pr.number}
                </Table.Cell>
                <Table.Cell className="p-3 whitespace-nowrap">
                  {pr.user.login}
                </Table.Cell>
                <Table.Cell className="p-3">{pr.additions}</Table.Cell>
                <Table.Cell className="p-3">{pr.deletions}</Table.Cell>
                <Table.Cell className="p-3">
                  {format(createdDate, "yyyy-MM-dd")}
                </Table.Cell>
                <Table.Cell className="p-3">
                  {closedDate ? format(closedDate, "yyyy-MM-dd") : "-"}
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table.Root>
    </div>
  );
};

export default PullRequestTable;
