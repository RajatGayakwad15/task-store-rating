import React, { useState } from "react";
import { DataTable } from "../DataTable.jsx"; // adjust path as needed
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Input } from "../../components/ui/input.js";
import { Eye, EyeOff, Trash, Trash2 } from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllStores, getAllUsers } from "../../../api/Getapi.jsx";
import {
  AddStore,
  AddUser,
  DeleteStore,
  DeleteUser,
} from "../../../api/Postapi.jsx";
import toast from "react-hot-toast";
import { Button } from "../../components/ui/button.tsx";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "../../components/ui/alert-dialog.tsx";

const Viewusers = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sorting, setSorting] = useState({ key: "", order: "" });
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 25 });
  const [isOpen, setIsOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const staticData = [
    { id: 1, name: "John Doe", email: "john@example.com", role: "Admin" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "User" },
    { id: 3, name: "Alice Brown", email: "alice@example.com", role: "User" },
  ];

  const queryClient = useQueryClient();

  const { mutate: adduser, isPending: isaddinguserPending } = useMutation({
    mutationKey: ["add-user"],
    mutationFn: AddUser,
    onSuccess: (data) => {
      console.log("API response in onSuccess:", data);

      handleClose();

      if (!data) {
        toast.error("Something went wrong. Please try again.");
        return;
      }

      if (data.status) {
        toast.success("Added User Successfully");

        // ✅ Refresh store list without page reload
        queryClient.invalidateQueries(["get-all-stores"]);
      } else {
        const errorMessage =
          data?.error || data?.message || "Registration failed.";
        console.log(errorMessage);
        toast.error(errorMessage);
      }
    },
    onError: (error) => {
      console.error("Error adding store:", error);
      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "An unexpected error occurred."
      );
    },
  });

  const { mutate: deleteuser, isPending: isdeleteinguserPending } = useMutation(
    {
      mutationKey: ["delete-user"],
      mutationFn: DeleteUser,
      onSuccess: (data) => {
        console.log("API response in onSuccess:", data); // 👈 Add this line
        handleClose();

        if (!data) {
          toast.error("Something went wrong. Please try again.");
          return;
        }

        if (data.success) {
          toast.success("Delete User Successfully");
          queryClient.invalidateQueries(["get-all-stores"]);
        } else {
          const errorMessage =
            data?.error || data?.message || "Registration failed.";
          console.log(errorMessage);
          toast.error(errorMessage);
        }
      },
      onError: (error) => {
        toast.error(error?.message || "An error occurred.");
      },
    }
  );
  const handleDelete = (e, id) => {
    e.stopPropagation();
    console.log(id, "idqw"); // prevent event bubbling if needed
    deleteuser({ id: id });
  };

  const columns = [
   {
      id: "index",
      header: () => <div className="text-center">Id</div>,
      cell: ({ row }) => <div className="text-center">{row.index + 1}</div>,
      enableSorting: false, // Disable sorting for serial number
    },
    {
      accessorKey: "name",
      header: () => <div className="text-center">User Name</div>,
      cell: (info) => <div className="text-center">{info.getValue()}</div>,
      enableSorting: true,
    },
    {
      accessorKey: "email",
      header: () => <div className="text-center">User Email</div>,
      cell: (info) => <div className="text-center">{info.getValue()}</div>,
      enableSorting: true,
    },
    {
      accessorKey: "role_id",
      header: () => <div className="text-center">Role</div>,
      cell: (info) => {
        const value = info.getValue();
        const row = info.row.original;
        let roleName = "";

        if (value === 1) {
          roleName = "Admin";
        } else if (value === 2 && row.store_id) {
          roleName = "Store";
        } else {
          roleName = "User";
        }

        return <div className="text-center">{roleName}</div>;
      },
      enableSorting: true,
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex space-x-2 justify-center">

          <div className="relative group">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  onClick={(e) => e.stopPropagation()}
         
                  variant="ghost"
                  className="h-8 w-8 p-0 cursor-pointer"
                >
                  <Trash2 size={16} />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent
                className="bg-black/50 backdrop-blur-sm bg-opacity-50"
                onClick={(e) => e.stopPropagation()}
              >
                <AlertDialogHeader>
                  <h2 className="text-lg font-semibold text-red-500">
                    Delete User
                  </h2>
                  <p>
                    Are you sure you want to delete this user? This action
                    cannot be reverted.
                  </p>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                    className="cursor-pointer"
                  >
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(e, row.original.id);
                    }}
                    className="cursor-pointer"
                  >
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            <span className="absolute bottom-full left-1/2 -translate-x-1/2 mt-2 hidden group-hover:block bg-black text-white text-xs px-2 py-1 rounded-md">
              Delete
            </span>
          </div>
        </div>
      ),
      meta: { headClassName: "justify-center" },
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

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  const initialValues = {
    name: "",
    email: "",
    address: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    address: Yup.string().required("Address is required"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters")
      .matches(/[a-z]/, "Password must contain at least one lowercase letter")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(/[0-9]/, "Password must contain at least one number")
      .matches(
        /[@$!%*?&#^()_+\-=\[\]{};':"\\|,.<>\/?]/,
        "Password must contain at least one special character"
      ),
  });



  const handleSubmit = (values, { resetForm }) => {
    console.log("Form values:", values);
    adduser(values);
    resetForm();

  };

  const { data: getuser } = useQuery({
    queryKey: ["get-users"],
    queryFn: getAllUsers,
    staleTime: 0,
    gcTime: Infinity,
  });

  console.log(getuser, "usersData");

  return (
    <>
      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            style={{
              backdropFilter: "blur(2px)",
              backgroundColor: "rgba(16, 16, 16, 0.1)", 
            }}
            onClick={() => setShowModal(false)} 
          />
          <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-black rounded-lg shadow-lg p-6 w-96 relative">
              <h2 className="text-xl font-bold mb-4">Add New User</h2>
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {() => (
                  <Form>
                    <div className="mb-4">
                      <label className="block mb-1 bg-black font-medium">
                        Name
                      </label>
                      <Field
                        name="name"
                        type="text"
                        placeholder="Enter name"
                        className="w-full px-4 py-2 rounded-md   bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-200 placeholder-gray-500"
                      />
                      <ErrorMessage
                        name="name"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block mb-1 font-medium">Email</label>
                      <Field
                        name="email"
                        type="email"
                        placeholder="Enter email"
                        className="w-full px-4 py-2 rounded-md   bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-200 placeholder-gray-500"
                      />
                      <ErrorMessage
                        name="email"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block mb-1 font-medium">Address</label>
                      <Field
                        name="address"
                        as="textarea"
                        placeholder="Enter address"
                        className="w-full px-4 py-2 rounded-md   bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-200 placeholder-gray-500"
                      />
                      <ErrorMessage
                        name="address"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>
                    <div className="mb-4 relative">
                      <label className="block mb-1 bg-black font-medium">
                        Password
                      </label>
                      <Field
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter password"
                        className="w-full px-4 py-2 rounded-md bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-200 placeholder-gray-500 pr-10"
                      />
                      <div
                        className="absolute right-3 top-9 text-white cursor-pointer"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff /> : <Eye />}
                      </div>
                      <ErrorMessage
                        name="password"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>
                    <div className="flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={handleClose}
                        className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400 cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded cursor-pointer"
                      >
                        Submit
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </>
      )}

      <DataTable
        data={getuser?.users || []}
        columns={columns}
        onAddNewClick={handleOpen}
        showAddNewButton="yes"
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
      />
    </>
  );
};

export default Viewusers;
