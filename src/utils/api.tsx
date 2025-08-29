const RUNNERS_API_URL = import.meta.env.VITE_APP_RUNNERS_API_BASE_URL;

export interface Runner {
  bib: string;
  id: number;
  name: string;
  run_type: string;
  last_scanned: string;
  createdAt: string;
  updatedAt: string;
}

export interface RunnerRequest {
  bib: string;
  name: string;
  run_type: string;
  last_scanned?: string | null;
}

export interface DeleteResponse {
  success: boolean;
  message: string;
  data: null;
  eror: null;
}

export interface UpdateRunnerRequest {
  name: string;
  last_scanned: string;
  run_type: string;
}

export interface UpdateRunnerResponse {
  success: boolean;
  message: string;
  data: Runner;
  eror: null;
}

export interface GetRunnerByIdResponse {
  success: boolean;
  message: string;
  data: Runner;
  eror: null;
}

export interface GetLastScannerResponse {
  success: boolean;
  message: string;
  data: Runner;
  eror: null;
}

export interface UpdateLastScannedResponse {
  success: boolean;
  message: string;
  data: Runner;
  eror: null;
}

export interface PaginatedResponse {
  status: boolean;
  message: string;
  data: Runner[];
  eror: null;
  pagination?: {
    current_page: number;
    totalPages: number;
    totalItems: number;
    itemPerPage: number;
  };
}

export interface PaginationParams {
  page?: number;
  limit?: number;
  keyword?: string;
  sortBy?: "updatedAt" | "last_scanned" | "name" | "bib" | "run_type";
  sortOrder?: "asc" | "desc";
}

async function createRunner(
  runnerData: RunnerRequest
): Promise<{ error: boolean; data: Runner[] | null }> {
  try {
    const response = await fetch(RUNNERS_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(runnerData),
    });
    const json = await response.json();

    if (!response.ok) {
      // Jika API mengembalikan pesan error dalam JSON, sesuaikan di sini
      throw new Error(`Failed to create runner: ${response.statusText}`);
    }

    const runners: Runner[] = json.data;
    return { error: false, data: runners };
  } catch (error) {
    console.error("Error creating runner:", error);
    return { error: true, data: null };
  }
}

async function getAllRunnersPagination(
  params: PaginationParams = {}
): Promise<{ error: boolean; data: PaginatedResponse | null }> {
  try {
    const {
      page = 1,
      limit = 10,
      keyword = "",
      sortBy = "updatedAt",
      sortOrder = "desc",
    } = params;

    const searchParams = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      keyword: keyword,
      sortBy: sortBy,
      sortOrder: sortOrder,
    });

    const response = await fetch(
      `${RUNNERS_API_URL}?${searchParams.toString()}`
    );
    const json = await response.json();

    if (!response.ok) {
      throw new Error(`Failed to fetch runners: ${response.statusText}`);
    }

    return { error: false, data: json };
  } catch (error) {
    console.error("Error fetching runners:", error);
    return { error: true, data: null };
  }
}

async function getAllRunners(): Promise<{
  error: boolean;
  data: Runner[] | null;
}> {
  try {
    const response = await fetch(RUNNERS_API_URL);
    const json = await response.json();

    if (!response.ok) {
      // Jika API mengembalikan pesan error dalam JSON, sesuaikan di sini
      throw new Error(`Failed to fetch runners: ${response.statusText}`);
    }

    const runners: Runner[] = json.data;
    return { error: false, data: runners };
  } catch (error) {
    console.error("Error fetching runners:", error);
    return { error: true, data: null };
  }
}

async function deleteRunner(
  id: number
): Promise<{ error: boolean; data: DeleteResponse | null }> {
  try {
    const response = await fetch(`${RUNNERS_API_URL}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();

    if (!response.ok) {
      throw new Error(`Failed to delete runner: ${response.statusText}`);
    }

    return { error: false, data: json };
  } catch (error) {
    console.error("Error deleting runner:", error);
    return { error: true, data: null };
  }
}

async function getRunnerById(
  id: number
): Promise<{ error: boolean; data: Runner | null }> {
  try {
    const response = await fetch(`${RUNNERS_API_URL}/${id}`);
    const json = await response.json();

    if (!response.ok) {
      throw new Error(`Failed to fetch runner: ${response.statusText}`);
    }

    return { error: false, data: json.data };
  } catch (error) {
    console.error("Error fetching runner:", error);
    return { error: true, data: null };
  }
}

async function updateRunnerById(
  id: number,
  runnerData: UpdateRunnerRequest
): Promise<{ error: boolean; data: UpdateRunnerResponse | null }> {
  try {
    const response = await fetch(`${RUNNERS_API_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(runnerData),
    });
    const json = await response.json();

    if (!response.ok) {
      throw new Error(`Failed to update runner: ${response.statusText}`);
    }

    return { error: false, data: json };
  } catch (error) {
    console.error("Error updating runner:", error);
    return { error: true, data: null };
  }
}

async function getLastScannerRunner(
  isTwo: boolean = false
): Promise<{ error: boolean; data: Runner | null }> {
  try {
    const response = await fetch(
      `${RUNNERS_API_URL}/last-scanned` + (isTwo ? "?last_scanned_2=true" : "")
    );
    const json: GetLastScannerResponse = await response.json();

    if (!response.ok) {
      throw new Error(`Failed to fetch runner: ${response.statusText}`);
    }

    return { error: false, data: json.data };
  } catch (error) {
    console.error("Error fetching runner:", error);
    return { error: true, data: null };
  }
}

async function updateLastScannedByBib(
  bib: string,
  isTwo: boolean = false
): Promise<{ error: boolean; data: UpdateLastScannedResponse | null }> {
  try {
    const response = await fetch(`${RUNNERS_API_URL}/scan-bib`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        bib: bib,
        last_scanned_2: isTwo ? "true" : "false",
      }),
    });

    const json: UpdateLastScannedResponse = await response.json();

    if (!response.ok) {
      throw new Error(`Failed to update last scanned: ${response.statusText}`);
    }

    return { error: false, data: json };
  } catch (error) {
    console.error("Error updating last scanned:", error);
    return { error: true, data: null };
  }
}

export {
  getAllRunners,
  createRunner,
  deleteRunner,
  getRunnerById,
  updateRunnerById,
  getLastScannerRunner,
  updateLastScannedByBib,
  getAllRunnersPagination,
};
