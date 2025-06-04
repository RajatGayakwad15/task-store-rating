import React, { useState } from "react";
import { Search, X } from "lucide-react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Button } from "../components/ui/button.tsx";
import { Input } from "../components/ui/input.tsx";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select.tsx";
import { useNavigate } from "react-router-dom";
import { Skeleton } from "../components/ui/skeleton.tsx";

export function DataTable({
  data,
  columns,
  onAddNewClick,
  showAddNewButton,
  selectOptions = [],
  onSelectChange,
  pagination = { pageIndex: 0, pageSize: 25 },
  onPageChange,
  onPageSizeChange,
  totalPages,
  isLoading,
  NoResultText,
  rowClickPath,
  searchQuery,
  setSearchQuery,
  filterValue,
  sorting,
  setSorting,
  totalRecords,
  isClientPortal,
  showModal,
  setShowModal,
  authorityMessage,
  getuserratingaverage,
}) {
  const navigate = useNavigate();
  const [selectedValue, setSelectedValue] = useState("all");

  const table = useReactTable({
    data,
    columns,
    manualPagination: true,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: { pagination, globalFilter: searchQuery },
    onPaginationChange: onPageChange,
    onGlobalFilterChange: setSearchQuery,
  });

  const pageIndex = pagination.pageIndex || 0;
  const pageSize = pagination.pageSize || 25;

  const handleSort = (column) => {
    if (!column.getCanSort()) return;
    const isAsc = sorting.key === column.id && sorting.order === "asc";
    setSorting({ key: column.id, order: isAsc ? "desc" : "asc" });
    column.toggleSorting(isAsc);
  };

  const getSortIcon = (column) => {
    if (!column?.getCanSort()) return null;
    const isSorted = sorting.key === column.id;
    return (
      <div className="flex flex-col items-center gap-0.5">
        <div
          className={`w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-white ${
            isSorted && sorting.order === "asc" ? "opacity-100" : "opacity-50"
          }`}
        />
        <div
          className={`w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-white mt-px ${
            isSorted && sorting.order === "desc" ? "opacity-100" : "opacity-50"
          }`}
        />
      </div>
    );
  };

  return (
    <div className="w-full px-6">
      <div className="flex items-center justify-start py-4">
        <div className="relative min-w-[300px]">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={18}
          />
          <Input
            placeholder="Search"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            className="pl-10 pr-10 w-full"
          />
          {searchQuery && (
            <X
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer"
              size={18}
              onClick={() => setSearchQuery("")}
            />
          )}
        </div>

        {selectOptions.length > 0 && (
          <div className="mx-2">
            <Select
              value={filterValue ? filterValue : selectedValue}
              onValueChange={(value) => {
                onSelectChange?.(value);
              }}
            >
              <SelectTrigger className="w-[180px] cursor-pointer">
                <SelectValue placeholder="Select an option" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {selectOptions.map((option) => (
                    <SelectItem
                      key={option.value}
                      value={option.value}
                      className="cursor-pointer"
                    >
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        )}

        <div className="flex items-center justify-end w-full">
          {showAddNewButton === "yes" && (
            <Button
              size="sm"
              className="cursor-pointer mr-2"
              onClick={onAddNewClick}
              variant="outline"
            >
              Add New
            </Button>
          )}

          <Button size="sm" className=" mr-2" variant="outline">
            Average : {getuserratingaverage}
          </Button>
        </div>
      </div>

      {false ? (
        <></>
      ) : (
        <div>
          <div className="rounded-md border overflow-x-auto h-[calc(100vh-199px)]">
            <Table>
              <TableHeader className="bg-zinc-900">
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id} className="hover:bg-zinc-900">
                    {headerGroup.headers.map((header) => (
                      <TableHead
                        key={header.id}
                        className="text-white text-base text-center"
                        onClick={() => handleSort(header.column)}
                      >
                        <span
                          className={`flex justify-center items-center gap-1 px-3 py-1 rounded-md transition ${
                            header.column.columnDef.enableSorting
                              ? "hover:bg-muted/50 cursor-pointer"
                              : ""
                          } ${
                            header.column.columnDef.meta?.headClassName || ""
                          }`}
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                          {getSortIcon(header.column)}
                        </span>
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>

              <TableBody>
                {isLoading ? (
                  Array.from({ length: pagination.pageSize }).map(
                    (_, rowIndex) => (
                      <TableRow key={rowIndex}>
                        {Array.from({ length: columns.length }).map(
                          (_, colIndex) => (
                            <TableCell key={colIndex} className="text-center">
                              <Skeleton className="h-6 w-full" />
                            </TableCell>
                          )
                        )}
                      </TableRow>
                    )
                  )
                ) : table.getRowModel().rows.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      className="text-center cursor-pointer"
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id} className="text-center px-5">
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-24 text-center"
                    >
                      {authorityMessage ||
                        NoResultText ||
                        "Something went wrong"}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          <div className="flex items-center justify-end space-x-2 py-4"></div>
          {isClientPortal === "Yes" && showModal === true && <></>}
        </div>
      )}
    </div>
  );
}
