import React, { useState } from "react";
import { DataTable } from "../DataTable.jsx"; // adjust path as needed
import { useQuery } from "@tanstack/react-query";
import { Card } from "../../components/ui/card.tsx";
import {
  getAllUsers,
  getratingstore,
  getratingstoreaverage,
} from "../../../api/Getapi.jsx";

const Viewusers = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sorting, setSorting] = useState({ key: "", order: "" });
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 25 });

  const staticData = [
    { id: 1, name: "John Doe", email: "john@example.com", role: "Admin" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "User" },
    { id: 3, name: "Alice Brown", email: "alice@example.com", role: "User" },
  ];

  const { data: getuserrating } = useQuery({
    queryKey: ["get-users-rateing"],
    queryFn: getratingstore,
    staleTime: 0,
    gcTime: Infinity,
  });

  const { data: getuserratingaverage } = useQuery({
    queryKey: ["get-users-rateing-avg"],
    queryFn: getratingstoreaverage,
    staleTime: 0,
    gcTime: Infinity,
  });

  console.log(getuserratingaverage, "getuserratingaverage");

  const columns = [
    // {
    //   accessorKey: "id",
    //   header: () => <div className="text-center">Id</div>,
    //   cell: (info) => <div className="text-center">{info.getValue()}</div>,
    //   enableSorting: true,
    // },
    {
      id: "index",
      header: () => <div className="text-center">Id</div>,
      cell: ({ row }) => <div className="text-center">{row.index + 1}</div>,
      enableSorting: false, // Disable sorting for serial number
    },

    {
      accessorKey: "user.name",
      header: () => <div className="text-center"> User Name</div>,
      cell: (info) => <div className="text-center">{info.getValue()}</div>,
      enableSorting: true,
    },
    {
      accessorKey: "user.email",
      header: () => <div className="text-center">User Email</div>,
      cell: (info) => <div className="text-center">{info.getValue()}</div>,
      enableSorting: true,
    },
    {
      accessorKey: "rating",
      header: () => <div className="text-center">Rating</div>,
      cell: (info) => <div className="text-center">{info.getValue()}</div>,
      enableSorting: true,
    },
  ];

  const handlePageChange = (pageIndex) => {
    setPagination((prev) => ({ ...prev, pageIndex }));
  };

  const handlePageSizeChange = (pageSize) => {
    setPagination((prev) => ({ ...prev, pageSize }));
  };

  const handleSelectChange = (value) => {
    console.log("Selected filter value:", value);
  };

  return (
    <>
      
      <DataTable
        data={getuserrating?.data || []}
        columns={columns}
        // onAddNewClick={() => alert("Add New Clicked")}
        // showAddNewButton="yes"
        // selectOptions={[
        //   { label: "All", value: "all" },
        //   { label: "Admin", value: "admin" },
        //   { label: "User", value: "user" },
        // ]}
        onSelectChange={handleSelectChange}
        pagination={pagination}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
        totalPages={1}
        isLoading={false}
        NoResultText="No users found"
        rowClickPath="/user"
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        filterValue=""
        sorting={sorting}
        setSorting={setSorting}
        totalRecords={staticData.length}
        isClientPortal="No"
        showModal={false}
        setShowModal={() => {}}
        authorityMessage=""
        getuserratingaverage={getuserratingaverage?.data?.averageRating}
      />
    </>
  );
};

export default Viewusers;
