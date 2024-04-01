import { useQuery } from "@tanstack/react-query";

export function useCurrency() {
  const { data: dataset, isPending } = useQuery({
    queryKey: ["operations", date],
    queryFn: () => getData(date),
  });
  return { dataset, isPending };
}
