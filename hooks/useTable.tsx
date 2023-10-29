import { ApiResponse, TableTypes, UseTableDataItem } from "@/lib/types";
import axios from "axios";
import { useEffect, useState } from "react";

export interface UseTableProps<T> {
  type: TableTypes;
  initialPage: number;
  limit: number;
}

interface PagedResponse<T> {
  items: T[];
  totalPages: number;
}

interface UseTable<T> {
  data: T[];
  page: number;
  totalPages: number;
  loading: boolean;
  goToNextPage: () => void;
  goToPrevPage: () => void;
  itemClicked: (item: T) => void;
  itemRemoved: (itemId: string) => void;
}
function useTable<T extends UseTableDataItem<T>>({
  type,
  initialPage,
  limit,
}: UseTableProps<T>): UseTable<T> {
  const [data, setData] = useState<T[]>([]);
  const [page, setPage] = useState<number>(initialPage);
  const [loading, setLoading] = useState<boolean>(true);
  const [totalPages, setTotalPages] = useState<number>(0);

  const getUrl = (type: TableTypes): string => {
    switch (type) {
      case TableTypes.VOLUNTEERS:
        return "volunteer";
      default:
        throw new Error("Invalid type");
    }
  };

  // Fetch data
  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        setLoading(true);
        const response = await axios.get<ApiResponse<T>>(
          `api/${getUrl(type)}?page=${page}&limit=${limit}`
        );
        if (response.data?.result) {
          setData((response.data?.result as T[]) ?? []);
        }
      } catch (error) {
        console.error("An error occurred while fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [type, page, limit]);

  // Pagination
  const goToNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const goToPrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  // Events
  const itemClicked = (item: T) => {
    console.log(`Item clicked: ${item.id}`);
    // Fire any additional event logic here
  };

  const itemRemoved = (itemId: string) => {
    setData(data.filter((item) => item.id !== itemId));
    console.log(`Item removed: ${itemId}`);
    // Fire any additional event logic here
  };

  return {
    data,
    page,
    totalPages,
    loading,
    goToNextPage,
    goToPrevPage,
    itemClicked,
    itemRemoved,
  };
}

export default useTable;
