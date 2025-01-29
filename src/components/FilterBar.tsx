import React from "react";
import {Select, Checkbox} from "@radix-ui/themes";

interface FilterState {
  status: string;
  dateRangeStart: string;
  dateRangeEnd: string;
  atRisk: boolean;
  repository: string;
}

interface FilterBarProps {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
}

const FilterBar: React.FC<FilterBarProps> = ({filters, setFilters}) => {
  const updateFilters = (key: keyof FilterState, value: any) => {
    setFilters((prev) => ({...prev, [key]: value}));
  };

  return (
    <div className="flex flex-col lg:flex-row gap-4 mb-4">
      {/* Date Range Start */}
      <div className="flex flex-col">
        <label className="text-sm font-medium mb-1 text-gray-600">
          Opened After
        </label>
        <input
          type="date"
          value={filters.dateRangeStart}
          onChange={(e) => updateFilters("dateRangeStart", e.target.value)}
          className="border border-gray-300 p-2 rounded outline-none focus:border-blue-500 transition-colors"
        />
      </div>

      {/* Date Range End */}
      <div className="flex flex-col">
        <label className="text-sm font-medium mb-1 text-gray-600">
          Opened Before
        </label>
        <input
          type="date"
          value={filters.dateRangeEnd}
          onChange={(e) => updateFilters("dateRangeEnd", e.target.value)}
          className="border border-gray-300 p-2 rounded outline-none focus:border-blue-500 transition-colors"
        />
      </div>

      {/* Status Filter */}
      <div className="flex flex-col">
        <label className="text-sm font-medium mb-1 text-gray-600">Status</label>
        <Select.Root
          value={filters.status}
          onValueChange={(value) => updateFilters("status", value)}
        >
          <Select.Trigger className="border border-gray-300 p-2 rounded outline-none focus:border-blue-500 transition-colors w-44">
            {filters.status}
          </Select.Trigger>
          <Select.Content>
            <Select.Item value="All">All</Select.Item>
            <Select.Item value="open">Open</Select.Item>
            <Select.Item value="closed">Closed</Select.Item>
          </Select.Content>
        </Select.Root>
      </div>

      {/* At-Risk Checkbox */}
      <div className="flex items-center gap-2 mt-4 lg:mt-0">
        <Checkbox
          checked={filters.atRisk}
          onCheckedChange={(checked) => updateFilters("atRisk", checked)}
          className="bg-white border border-gray-300 hover:bg-gray-50"
        />
        <label className="text-sm font-medium text-gray-600">
          Show At-Risk PRs
        </label>
      </div>

      {/* Repository Filter */}
      <div className="flex flex-col flex-1">
        <label className="text-sm font-medium mb-1 text-gray-600">
          Repository
        </label>
        <input
          type="text"
          value={filters.repository}
          onChange={(e) => updateFilters("repository", e.target.value)}
          className="border border-gray-300 p-2 rounded outline-none focus:border-blue-500 transition-colors"
          placeholder="e.g., facebook/react"
        />
      </div>
    </div>
  );
};

export default FilterBar;
