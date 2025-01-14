"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Pagination from "@/app/components/blocks/Pagination";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { RiDeleteBin6Line } from "react-icons/ri";
import Swal from "sweetalert2";
import axios from "axios";

interface QueryFields {
  _id: string;
  name: string;
  mobile: string;
  requirement: string;
}

const Query = () => {
  const router = useRouter();
  const [currentQueryPage, setCurrentQueryPage] = useState(1);
  const [queryData, setQueryData] = useState<QueryFields[]>([]);
  const entriesPerPage = 10;
  const [sessionId, setSessionId] = useState<string | null>(null);

  useEffect(() => {
    // This will run only on the client after the initial render
    const sessionId = localStorage.getItem("adminSessionId");
    if (!sessionId) {
      router.push("/admin"); // Redirect if no sessionId
    } else {
      setSessionId(sessionId);
    }
  }, []);

  // Function to fetch products data
  const getProducts = async () => {
    try {
      const response = await axios.get("/api/query");
      setQueryData(response.data.data); // Assuming response.data contains the product data
    } catch (error) {
      console.error("Error fetching products data:", error);
      return []; // Return empty array on error
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const handleProductPageChange = (page: number) => {
    setCurrentQueryPage(page);
  };

  const totalEntries = queryData.length;
  const paginatedRows = queryData.slice(
    (currentQueryPage - 1) * entriesPerPage,
    currentQueryPage * entriesPerPage
  );

  const deleteQuery = async (id: string) => {
    try {
      // Send DELETE request to the product API with the ID as a search query parameter
      const response = await axios.delete(`/api/query?id=${id}`);

      return response.data; // Return the response or handle as needed
    } catch (error) {
      console.error("Error deleting query:", error);
      throw error; // Optionally handle the error or return an appropriate response
    }
  };

  return (
    sessionId && (
      <div className="flex justify-start items-center w-full">
        <div className="p-5 bg-slate-50 w-full flex flex-col justify-between h-[100dvh]">
          <div>
            <div className="flex justify-between w-full items-center">
              <h1 className="text-2xl font-semibold">User Query</h1>
            </div>

            <Box my={1}>
              <TableContainer component={Paper} sx={{ width: "100%" }}>
                <Table aria-label="gallery table">
                  <TableHead sx={{ background: "#cdb4db" }}>
                    <TableRow>
                      <TableCell>Sl No</TableCell>
                      <TableCell>Name</TableCell>
                      <TableCell>Mobile</TableCell>
                      <TableCell>Requirement</TableCell>
                      <TableCell align="center">Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {paginatedRows.map((row, index) => (
                      <TableRow key={row._id}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{row.name}</TableCell>
                        <TableCell>{row.mobile}</TableCell>
                        <TableCell>{row.requirement}</TableCell>
                        <TableCell sx={{ textAlign: "center" }}>
                          <RiDeleteBin6Line
                            color="error"
                            style={{
                              cursor: "pointer",
                              color: "red",
                              margin: "0 auto",
                            }}
                            onClick={() =>
                              Swal.fire({
                                title: "Are you sure?",
                                text: "You won't be able to revert this!",
                                icon: "warning",
                                showCancelButton: true,
                                confirmButtonColor: "#cdb4db",
                                cancelButtonColor: "#d33",
                                confirmButtonText: "Yes, delete it!",
                              }).then((result) => {
                                if (result.isConfirmed) {
                                  deleteQuery(row._id)
                                    .then(() => {
                                      Swal.fire(
                                        "Deleted!",
                                        "Your file has been deleted.",
                                        "success"
                                      );
                                      getProducts();
                                    })
                                    .catch((err) => console.error(err));
                                }
                              })
                            }
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </div>
          <Pagination
            totalEntries={totalEntries}
            entriesPerPage={entriesPerPage}
            currentPage={currentQueryPage}
            onPageChange={handleProductPageChange}
          />
        </div>
      </div>
    )
  );
};

export default Query;
