import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

const searchParams = useSearchParams();
const pathname = usePathname();
const { replace } = useRouter();

export const handleSearch = useDebouncedCallback((term: string) => {
  const params = new URLSearchParams(searchParams);
  if (term) {
    params.set("query", term);
  } else {
    params.delete("query");
  }
  replace(`${pathname}?${params.toString()}`);
}, 300);