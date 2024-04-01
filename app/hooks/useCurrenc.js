import { useQuery } from "react-query";
import { getData } from "../services/getData";
import { toast } from "@/components/ui/use-toast";
import { format } from "date-fns";

export function useCurrency(date) {
  const { data: dataset, isLoading: isPending } = useQuery({
    queryKey: [
      "operations",
      {
        datefrom: date?.from ? format(date.from, "dd.MM.yyyy") : null,
        dateto: date?.to ? format(date.to, "dd.MM.yyyy") : null,
      },
    ],
    queryFn: () => getData(date),
    onError: (e) =>
      toast({
        variant: "destructive",
        title: "Упс... Что-то пошло не так",
        description: e.message,
      }),
  });
  return { dataset, isPending };
}
