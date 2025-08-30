import React, { useState, useEffect, useRef } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import ReactPaginate from "react-paginate";
import {
  getAllRunnersPagination,
  deleteRunner,
  getRunnerById,
  updateRunnerById,
  updateLastScannedByBib,
} from "../../utils/api";
import type {
  Runner,
  UpdateRunnerRequest,
  PaginatedResponse,
} from "../../utils/api";
import useDebounce from "../../hooks/useDebounce";

interface BibCheckerFormProps {
  onSuccess: (success: string) => void;
  onError: (error: string) => void;
  isVersionTwo?: boolean;
}

function TabelDataPelari({
  onSuccess,
  onError,
  isVersionTwo = false,
}: BibCheckerFormProps) {
  const { debounce } = useDebounce();
  const queryClient = useQueryClient();
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [editRunner, setEditRunner] = useState<Runner | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editFormData, setEditFormData] = useState<UpdateRunnerRequest>({
    name: "",
    run_type: "",
    last_scanned: "",
  });

  //const [isAutoScanEnabled, setIsAutoScanEnabled] = useState(true);
  const [bib, setBib] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  // const [searchKeyword, setSearchKeyword] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  // const searchInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    if (!bib.trim()) {
      console.log("Nomor bib harus diisi");
      return;
    }

    try {
      const result = await updateLastScannedByBib(bib.trim(), isVersionTwo);

      if (result.error || !result.data) {
        onError("Bib tidak ditemukan atau terjadi kesalahan");
        setBib("");
        return;
      }

      onSuccess(`Data berhasil di Update ${isVersionTwo ? "(Versi 2)" : ""}`);
      refetchRunners();
      setBib(""); // Reset form
    } catch (error) {
      // onError('Terjadi kesalahan saat melakukan scan');
      console.log(error);
    }
    // finally {
    //   setIsLoading(false);
    // }
  };

  const debounceInput = debounce(handleSubmit, 3000);

  useEffect(() => {
    if (bib) {
      debounceInput();
    }
  }, [bib]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setBib(value);
  };

  const runTypes = ["UMUM", "KIDS & FAMILY"];

  // Fungsi untuk mendapatkan waktu saat ini dalam WIB (GMT+7)
  const getCurrentWIBDateTime = (): string => {
    const now = new Date();
    const wibTime = new Date(now.getTime() + 7 * 60 * 60 * 1000);
    return wibTime.toISOString().slice(0, 19);
  };

  // const convertUTCToWIBDateTime = (utcString: string): string => {
  //   if (!utcString) return getCurrentWIBDateTime();

  //   const utcDate = new Date(utcString);
  //   const wibDate = new Date(utcDate.getTime() + (7 * 60 * 60 * 1000));
  //   return wibDate.toISOString().slice(0, 16);
  // };

  // Fungsi untuk mengonversi WIB datetime-local ke UTC ISO string
  const convertWIBToUTC = (wibDateTime: string): string => {
    if (!wibDateTime) return new Date().toISOString();

    // Parsing datetime-local sebagai WIB
    const localDate = new Date(wibDateTime);
    // Mengurangi 7 jam untuk mengonversi dari WIB ke UTC
    const utcDate = new Date(localDate.getTime() - 7 * 60 * 60 * 1000);
    return utcDate.toISOString();
  };

  // Fungsi untuk format tampilan tanggal dalam WIB
  const formatWIBDateTime = (utcString: string): string => {
    if (!utcString) return "-";

    const utcDate = new Date(utcString);
    // Mengonversi ke WIB
    // const wibDate = new Date(utcDate.getTime() + (7 * 60 * 60 * 1000));

    return utcDate.toLocaleString("id-ID", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
  };

  const {
    data: paginatedData,
    isLoading,
    isError,
    error,
    refetch: refetchRunners,
  } = useQuery<PaginatedResponse, Error>({
    queryKey: ["runnersData", currentPage, itemsPerPage],
    queryFn: async () => {
      const { data: response, error: apiError } = await getAllRunnersPagination(
        {
          page: currentPage,
          limit: itemsPerPage,
          keyword: "",
        }
      );
      if (apiError || !response) {
        throw new Error(apiError ? "Failed to fetch data" : "No data found");
      }
      return response;
    },
    staleTime: 5 * 60 * 1000, // Data akan dianggap "stale" setelah 5 menit
    // refetchInterval: 1 * 1000, // Data akan di-refetch setiap 5 menit
  });

  // Data sudah di-sort oleh API, tidak perlu sorting manual lagi
  const sortedData = paginatedData?.data || [];

  const handlePageChange = (selectedItem: { selected: number }) => {
    setCurrentPage(selectedItem.selected + 1);
  };

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      const { error: deleteError } = await deleteRunner(id);
      if (deleteError) {
        throw new Error("Gagal menghapus data pelari");
      }
      return id;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["runnersData"] });
      setDeletingId(null);
    },

    onError: (error) => {
      console.error("Error deleting runner:", error);
      setDeletingId(null);
      alert("Gagal menghapus data pelari");
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: number;
      data: UpdateRunnerRequest;
    }) => {
      const { error: updateError } = await updateRunnerById(id, data);
      if (updateError) {
        throw new Error("Gagal memperbarui data pelari");
      }
      return { id, data };
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["runnersData"] });
      setIsEditModalOpen(false);
      setEditRunner(null);
    },

    onError: (error) => {
      console.error("Error updating runner:", error);
      alert("Gagal memperbarui data pelari");
    },
  });

  const handleDelete = async (id: number, name: string) => {
    const confirmed = window.confirm(
      `Apakah Anda yakin ingin menghapus data pelari "${name}"?`
    );

    if (confirmed) {
      setDeletingId(id);
      deleteMutation.mutate(id);
    }
  };

  const handleEdit = async (id: number) => {
    const { error, data } = await getRunnerById(id);
    if (error || !data) {
      console.error("Gagal memuat data pelari. Silakan coba lagi", error);
      return;
    }
    setEditRunner(data);
    setEditFormData({
      name: data.name,
      run_type: data.run_type,
      last_scanned: getCurrentWIBDateTime(),
    });
    setIsEditModalOpen(true);
  };

  const handleUpdateSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    if (!editRunner) return;

    if (!editFormData.name) {
      alert("Nama pelari wajib diisi");
      return;
    }

    if (!editFormData.run_type) {
      alert("Tipe lari wajib diisi");
      return;
    }

    const updatedData: UpdateRunnerRequest = {
      name: editFormData.name,
      run_type: editFormData.run_type,
      last_scanned: convertWIBToUTC(editFormData.last_scanned),
    };

    updateMutation.mutate({ id: editRunner.id, data: updatedData });
  };

  const handleEditInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setEditFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setEditRunner(null);
  };

  if (isLoading) {
    return (
      <main className="flex flex-col justify-center items-center w-full h-screen">
        <p className="text-xl font-bold">Memuat data pelari...</p>
      </main>
    );
  }

  if (isError) {
    return (
      <main className="flex flex-col justify-center items-center w-full h-screen">
        <p className="text-xl font-bold text-red-600">
          Error: {error?.message}
        </p>
      </main>
    );
  }

  if (!paginatedData?.data || paginatedData.data.length === 0) {
    return (
      <main className="flex flex-col justify-center items-center w-full h-screen">
        <p className="text-xl font-bold">
          Tidak ada data pelari yang ditemukan.
        </p>
      </main>
    );
  }

  const totalPages =
    paginatedData.pagination?.totalPages ||
    Math.ceil((paginatedData.pagination?.totalItems || 0) / itemsPerPage) ||
    1;
  const totalItems = paginatedData.pagination?.totalItems || 0;
  const currentPageFromApi =
    paginatedData.pagination?.current_page || currentPage;
  const itemsPerPageFromApi =
    paginatedData.pagination?.itemPerPage || itemsPerPage;

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4 text-center">Daftar Pelari</h2>

      {/* Sort Controls */}
      <div className="flex justify-between">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              ref={inputRef}
              type="text"
              id="bib"
              value={bib}
              onChange={handleInputChange}
              // onKeyPress={handleKeyPress}
              placeholder="Scan barcode atau ketik nomor bib"
              className="w-full px-3 py-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent border-4"
              disabled={isLoading}
              autoComplete="off"
            />
          </div>

          {/* Manual submit button - hanya tampil jika auto-scan disabled */}
          {/* {!isAutoScanEnabled && (
            <button
              type="submit"
              disabled={isLoading || !bib.trim()}
              className={`w-full py-2 px-4 rounded-md font-medium transition-colors ${
                isLoading || !bib.trim()
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
              }`}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Scanning...
                </div>
              ) : (
                'Scan Bib'
              )}
            </button>
          )} */}

          {/* Loading indicator untuk auto-scan */}
          {isLoading && (
            <div className="flex items-center justify-center py-2">
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-blue-600"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              <span className="text-sm text-blue-600">Scanning...</span>
            </div>
          )}
        </form>
      </div>

      {/* <div className="flex-1">
        <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
          Cari Pelari
        </label>
        <input
          ref={searchInputRef}
          type="text"
          id="search"
          value={searchKeyword}
          onChange={handleSearchChange}
          placeholder="Cari berdasarkan nama atau BIB"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          autoComplete="off"
        />
      </div> */}

      <div className="mb-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
        <div className="text-sm text-gray-600">
          Menampilkan {sortedData.length} dari {totalItems} data pelari
        </div>
        <div className="text-sm text-gray-500">
          Halaman {currentPageFromApi} dari {totalPages} ({itemsPerPageFromApi}{" "}
          per halaman)
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="py-4 px-6 text-left border-b border-gray-200">
                Nama
              </th>
              <th className="py-4 px-6 text-left border-b border-gray-200">
                Bib
              </th>
              <th className="py-4 px-6 text-left border-b border-gray-200">
                Tipe
              </th>
              <th className="py-4 px-6 text-left border-b border-gray-200">
                <div className="flex items-center">Last Scanned</div>
              </th>
              <th className="py-4 px-6 text-center border-b border-gray-200">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedData.map((pelari, index) => (
              <tr
                key={pelari.id}
                className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
              >
                <td className="py-4 px-6 border-b border-gray-200">
                  {pelari.name}
                </td>
                <td className="py-4 px-6 border-b border-gray-200">
                  {pelari.bib}
                </td>
                <td className="py-4 px-6 border-b border-gray-200">
                  {pelari.run_type}
                </td>
                <td className="py-4 px-6 border-b border-gray-200">
                  <div className="flex items-center">
                    {formatWIBDateTime(pelari.last_scanned)}
                  </div>
                </td>
                <td className="py-4 px-6 border-b border-gray-200 text-center">
                  <div className="flex gap-2 justify-center">
                    <button
                      onClick={() => handleEdit(pelari.id)}
                      className="px-3 py-1 rounded-md bg-blue-600 text-white font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                    >
                      <span className="flex items-center">
                        <svg
                          className="w-4 h-4 mr-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                          ></path>
                        </svg>
                        Edit
                      </span>
                    </button>
                    <button
                      onClick={() => handleDelete(pelari.id, pelari.name)}
                      disabled={deletingId === pelari.id}
                      className={`px-3 py-1 rounded-md text-white font-medium transition-colors ${
                        deletingId === pelari.id
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                      }`}
                    >
                      {deletingId === pelari.id ? (
                        <span className="flex items-center">
                          <svg
                            className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Menghapus...
                        </span>
                      ) : (
                        <span className="flex items-center">
                          <svg
                            className="w-4 h-4 mr-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            ></path>
                          </svg>
                          Hapus
                        </span>
                      )}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {paginatedData?.data && paginatedData.data.length > 0 && (
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-6">
          <ReactPaginate
            forcePage={currentPage - 1}
            pageCount={totalPages}
            pageRangeDisplayed={3}
            marginPagesDisplayed={1}
            onPageChange={handlePageChange}
            containerClassName="flex items-center"
            pageClassName="mx-1"
            pageLinkClassName="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 hover:text-gray-900 rounded-md transition-colors"
            previousClassName="mr-2"
            nextClassName="ml-2"
            previousLabel={
              <span className="flex items-center px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 hover:text-gray-700 transition-colors">
                <svg
                  className="w-4 h-4 mr-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 19l-7-7 7-7"
                  ></path>
                </svg>
                Previous
              </span>
            }
            nextLabel={
              <span className="flex items-center px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 hover:text-gray-700 transition-colors">
                Next
                <svg
                  className="w-4 h-4 ml-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5l7 7-7 7"
                  ></path>
                </svg>
              </span>
            }
            breakLabel={
              <span className="mx-1 px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md">
                ...
              </span>
            }
            activeClassName="bg-blue-600 text-white border-blue-600"
            activeLinkClassName="bg-blue-600 text-white border-blue-600 hover:bg-blue-700 hover:text-white"
            disabledClassName="opacity-50 cursor-not-allowed"
            disabledLinkClassName="cursor-not-allowed hover:bg-white hover:text-gray-500"
          />
        </div>
      )}

      {/* Edit Modal */}
      {isEditModalOpen && editRunner && (
        <div className="fixed inset-0 bg-black bg-opacity-100 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800">
                Edit Pelari
              </h3>
              <button
                onClick={closeEditModal}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              </button>
            </div>

            <form onSubmit={handleUpdateSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="edit-name"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Nama Pelari *
                </label>
                <input
                  type="text"
                  id="edit-name"
                  name="name"
                  value={editFormData.name}
                  onChange={handleEditInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Masukkan nama pelari"
                />
              </div>

              <div>
                <label
                  htmlFor="edit-run_type"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Jenis Lari *
                </label>
                <select
                  id="edit-run_type"
                  name="run_type"
                  value={editFormData.run_type}
                  onChange={handleEditInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Pilih jenis lari</option>
                  {runTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              <div className="hidden">
                <label
                  htmlFor="edit-last_scanned"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Terakhir Discan
                </label>
                <input
                  type="datetime-local"
                  id="edit-last_scanned"
                  name="last_scanned"
                  value={editFormData.last_scanned}
                  onChange={handleEditInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Otomatis terisi dengan waktu sekarang
                </p>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={closeEditModal}
                  className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={updateMutation.isPending}
                  className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                >
                  {updateMutation.isPending ? "Menyimpan..." : "Simpan"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Info box */}
      <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg
              className="h-5 w-5 text-yellow-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-yellow-700">
              <strong>Perhatian:</strong> Tindakan penghapusan tidak dapat
              dibatalkan. Pastikan Anda yakin sebelum menghapus data pelari.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TabelDataPelari;
