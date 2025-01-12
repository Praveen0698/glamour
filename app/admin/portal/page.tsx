"use client";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
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

interface GalleryItem {
  _id: string;
  image: string;
}

interface ProductItem {
  _id: string;
  image: string;
  title: string;
}

const uploadGallery = async (imageGallery: File | null) => {
  if (!imageGallery) {
    console.error("No image selected for upload");
    return; // Exit the function if no image is selected
  }

  try {
    // Create a FormData instance to send the image file
    const formData = new FormData();
    formData.append("image", imageGallery);

    // Send the POST request to the API with the image file
    const response = await axios.post("/api/gallery", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    // Handle the response after the image upload
    return response.data; // Or handle accordingly based on the API response
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error; // Optionally handle the error or return an appropriate response
  }
};
const uploadProduct = async (
  imageProduct: File | null,
  titleProduct: string
) => {
  // Check if either the image or title is missing
  if (!imageProduct || !titleProduct) {
    console.error("No image or title selected for upload");
    return; // Exit the function if no image or title is selected
  }

  try {
    // Create a FormData instance to send the image file
    const formData = new FormData();

    // Only append image if it's not null
    if (imageProduct) {
      formData.append("image", imageProduct);
    }

    // Only append title if it's a non-empty string
    if (titleProduct) {
      formData.append("title", titleProduct);
    }

    // Send the POST request to the API with the image file
    const response = await axios.post("/api/products", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    // Handle the response after the image upload
    return response.data; // Or handle accordingly based on the API response
  } catch (error) {
    console.error("Error uploading product:", error);
    throw error; // Optionally handle the error or return an appropriate response
  }
};

const Upload = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentProductPage, setCurrentProductPage] = useState(1);
  const [getGalleryData, setGetGalleryData] = useState<GalleryItem[]>([]);
  const [getProductsData, setProductsData] = useState<ProductItem[]>([]);
  const entriesPerPage = 5;
  const entriesProductPerPage = 5;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalProductOpen, setIsModalProductOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement | null>(null); // Explicitly type the ref
  const modalProductRef = useRef<HTMLDivElement | null>(null); // Explicitly type the ref
  const sessionId =
    typeof window !== "undefined"
      ? localStorage.getItem("adminSessionId")
      : null;
  useEffect(() => {
    if (!sessionId) {
      router.push("/admin"); // Redirect to login if session ID doesn't exist
    }
  }, [router]);

  const [imageGallery, setImageGallery] = useState<File | null>(null);
  const [imageProduct, setImageProduct] = useState<File | null>(null);
  const [titleProduct, setTitleProduct] = useState<string>("");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageGallery(e.target.files[0]); // Set the image file to state
    }
  };

  // Function to fetch gallery data
  const getGallery = async () => {
    try {
      const response = await axios.get("/api/gallery");
      setGetGalleryData(response.data.data);
    } catch (error) {
      console.error("Error fetching gallery data:", error);
      return []; // Return empty array on error
    }
  };

  // Function to fetch products data
  const getProducts = async () => {
    try {
      const response = await axios.get("/api/products");
      setProductsData(response.data.data); // Assuming response.data contains the product data
    } catch (error) {
      console.error("Error fetching products data:", error);
      return []; // Return empty array on error
    }
  };

  useEffect(() => {
    getGallery();
    getProducts();
  }, []);

  const handleModalToggle = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleModalProductToggle = () => {
    setIsModalProductOpen(!isModalProductOpen);
  };

  const handleOutsideClick = (e: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      setIsModalOpen(false);
    }
  };

  const handleOutsideProductClick = (e: MouseEvent) => {
    if (
      modalProductRef.current &&
      !modalProductRef.current.contains(e.target as Node)
    ) {
      setIsModalProductOpen(false);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const totalEntries = getGalleryData.length;
  const paginatedRows = getGalleryData.slice(
    (currentPage - 1) * entriesPerPage,
    currentPage * entriesPerPage
  );

  const handleProductPageChange = (page: number) => {
    setCurrentProductPage(page);
  };

  const totalProductEntries = getProductsData.length;
  const paginatedProductRows = getProductsData.slice(
    (currentProductPage - 1) * entriesProductPerPage,
    currentProductPage * entriesProductPerPage
  );

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    if (imageGallery) {
      await uploadGallery(imageGallery);
      getGallery();
      handleModalToggle();
      setLoading(false);
    } else {
      console.log("No image selected");
    }
  };

  const handleSubmitProduct = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    if (imageProduct && titleProduct) {
      await uploadProduct(imageProduct, titleProduct);
      getProducts();
      handleModalProductToggle();
      setLoading(false);
    }
  };

  const deleteProduct = async (id: string) => {
    try {
      // Send DELETE request to the product API with the ID as a search query parameter
      const response = await axios.delete(`/api/products?id=${id}`);

      return response.data; // Return the response or handle as needed
    } catch (error) {
      console.error("Error deleting product:", error);
      throw error; // Optionally handle the error or return an appropriate response
    }
  };
  const deleteGallery = async (id: string) => {
    try {
      // Send DELETE request to the product API with the ID as a search query parameter
      const response = await axios.delete(`/api/gallery?id=${id}`);

      return response.data; // Return the response or handle as needed
    } catch (error) {
      console.error("Error deleting product:", error);
      throw error; // Optionally handle the error or return an appropriate response
    }
  };

  return (
    sessionId && (
      <div className="flex justify-start items-center w-full">
        <div className="p-5 bg-slate-50 w-full flex flex-col justify-between h-[100dvh]">
          <div>
            <div className="flex justify-between w-full items-center">
              <h1 className="text-2xl font-semibold">Products</h1>
              <button
                onClick={handleModalProductToggle}
                className=" w-[6rem] p-2 text-sm bg-[#cdb4db] text-white rounded-md"
              >
                Add Product
              </button>
            </div>
            {isModalProductOpen && (
              <div
                className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
                onClick={(e) =>
                  handleOutsideProductClick(e as unknown as MouseEvent)
                }
              >
                <motion.div
                  ref={modalProductRef}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  className="bg-white p-6 rounded-lg w-[90%] md:w-[40%] shadow-lg"
                >
                  <h2 className="text-2xl font-bold mb-4 text-center">
                    Products
                  </h2>
                  <form className="space-y-4" onSubmit={handleSubmitProduct}>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Image
                      </label>
                      <input
                        type="file"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          if (e.target.files && e.target.files[0]) {
                            setImageProduct(e.target.files[0]); // Set the image file to state
                          }
                        }}
                        className="w-full px-4 py-2 outline-none border rounded-md focus:ring-2 focus:ring-[#cdb4db]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Title
                      </label>
                      <input
                        type="text"
                        onChange={(e) => setTitleProduct(e.target.value)}
                        className="w-full px-4 py-2 outline-none border rounded-md focus:ring-2 focus:ring-[#cdb4db]"
                        placeholder="Enter your product title"
                      />
                    </div>
                    <div className="flex justify-end gap-4">
                      <button
                        type="button"
                        onClick={handleModalProductToggle}
                        className="px-6 py-2 bg-gray-300 text-gray-700 rounded-md"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-6 py-2 bg-[#cdb4db] text-white rounded-md"
                      >
                        {loading ? "Submitting..." : "Submit"}
                      </button>
                    </div>
                  </form>
                </motion.div>
              </div>
            )}
            <Box my={4}>
              <TableContainer component={Paper} sx={{ width: "100%" }}>
                <Table aria-label="gallery table">
                  <TableHead sx={{ background: "#cdb4db" }}>
                    <TableRow>
                      <TableCell>Sl No</TableCell>
                      <TableCell>Image</TableCell>
                      <TableCell>Title</TableCell>
                      <TableCell align="center">Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {paginatedProductRows.map((row, index) => (
                      <TableRow key={row._id}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>
                          <img
                            src={row.image}
                            alt="Gallery Image"
                            style={{ width: "60px", height: "60px" }}
                          />
                        </TableCell>
                        <TableCell>{row.title}</TableCell>
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
                                  deleteProduct(row._id)
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
            totalEntries={totalProductEntries}
            entriesPerPage={entriesProductPerPage}
            currentPage={currentProductPage}
            onPageChange={handleProductPageChange}
          />
        </div>
        <div className="p-5 bg-slate-50 w-full flex flex-col justify-between h-[100dvh]">
          <div>
            <div className="flex justify-between w-full items-center">
              <h1 className="text-2xl font-semibold">Gallery</h1>
              <button
                onClick={handleModalToggle}
                className=" w-[6rem] p-2 text-sm bg-[#cdb4db] text-white rounded-md"
              >
                Add Gallery
              </button>
            </div>
            {isModalOpen && (
              <div
                className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
                onClick={(e) => handleOutsideClick(e as unknown as MouseEvent)}
              >
                <motion.div
                  ref={modalRef}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  className="bg-white p-6 rounded-lg w-[90%] md:w-[40%] shadow-lg"
                >
                  <h2 className="text-2xl font-bold mb-4 text-center">
                    Gallery
                  </h2>
                  <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Image
                      </label>
                      <input
                        type="file"
                        onChange={handleImageChange}
                        className="w-full px-4  outline-none py-2 border rounded-md focus:ring-2 focus:ring-[#cdb4db]"
                        placeholder="Enter your name"
                      />
                    </div>
                    <div className="flex justify-end gap-4">
                      <button
                        type="button"
                        onClick={handleModalToggle}
                        className="px-6 py-2 bg-gray-300 text-gray-700 rounded-md"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-6 py-2 bg-[#cdb4db] text-white rounded-md"
                      >
                        {loading ? "Submitting..." : "Submit"}
                      </button>
                    </div>
                  </form>
                </motion.div>
              </div>
            )}
            <Box my={4}>
              <TableContainer component={Paper} sx={{ width: "100%" }}>
                <Table aria-label="gallery table">
                  <TableHead sx={{ background: "#cdb4db" }}>
                    <TableRow>
                      <TableCell>Sl No</TableCell>
                      <TableCell>Image</TableCell>
                      <TableCell align="center">Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {paginatedRows.map((row, index) => (
                      <TableRow key={row._id}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>
                          <img
                            src={row.image}
                            alt="Gallery Image"
                            style={{ width: "60px", height: "60px" }}
                          />
                        </TableCell>
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
                                  deleteGallery(row._id)
                                    .then(() => {
                                      Swal.fire(
                                        "Deleted!",
                                        "Your file has been deleted.",
                                        "success"
                                      );
                                      getGallery();
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
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    )
  );
};

export default Upload;
