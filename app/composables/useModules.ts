import type { LinkProps } from "@nuxt/ui";
// @ts-expect-error yaml is not typed
import data from "../../content/interfaces.yml";

interface Filter extends Omit<LinkProps, "type"> {
  key: string | number;
  title?: string;
  label?: string;
  icon?: string;
}

const iconsMap = {
  Database: "i-lucide-database",
  Api: "i-lucide-unplug",
  Auth: "i-lucide-shield",
  Payment: "i-lucide-credit-card",
  Cache: "i-lucide-clock",
};

export const useModules = () => {
  const modules = useState<Module[]>("modules", () => []);

  const interfaces = data.interfaces;

  const route = useRoute();
  const router = useRouter();
  async function fetchList() {
    if (modules.value.length) {
      return;
    }

    modules.value = await $fetch("/api/modules");
  }

  const sorts: Filter[] = [
    { key: "downloads", label: "Downloads" },
    { key: "stars", label: "Stars" },
    { key: "publishedAt", label: "Updated" },
    { key: "createdAt", label: "Created" },
  ];

  const orders: Filter[] = [
    { key: "desc", label: "Desc", icon: "i-lucide-arrow-down-wide-narrow" },
    { key: "asc", label: "Asc", icon: "i-lucide-arrow-up-wide-narrow" },
  ];

  const categories = computed<Filter[]>(() => {
    return Object.keys(iconsMap).map((category) => {
      return {
        key: category,
        label: category,
        active: route.query.category === category,
        to: {
          name: "modules",
          query: {
            ...route.query,
            category,
          },
          state: { smooth: "#smooth" },
        },
        icon: iconsMap[category as keyof typeof iconsMap] || undefined,
        click: (e: Event) => {
          if (route.query.category !== category) {
            return;
          }

          e.preventDefault();

          router.replace({ query: { ...route.query, category: undefined } });
        },
      };
    });
  });

  const selectedInterface = computed(() => {
    return interfaces.find((interf: any) => interf.slug === route.query.interface);
  });

  const selectedCategory = computed(() => {
    return categories.value.find((category) => category.label === route.query.category);
  });

  const selectedSort = computed(() => {
    return sorts.find((sort) => sort.key === route.query.sortBy) || sorts[0];
  });

  const selectedOrder = computed(() => {
    return orders.find((order) => order.key === route.query.orderBy) || orders[0];
  });

  const q = computed<string>(() => {
    return route.query.q as string;
  });

  const filteredModules = computed(() => {
    let result = modules.value;

    // Filter by category
    if (selectedCategory.value) {
      result = result.filter((module) =>
        module.category.includes(
          typeof selectedCategory.value?.key === "string" ? selectedCategory.value?.key : "unknown"
        )
      );
    }

    // Filter by interface
    if (selectedInterface.value) {
      result = result.filter((module) =>
        module.interface.includes(
          typeof selectedInterface.value?.slug === "string"
            ? selectedInterface.value?.slug
            : "unknown"
        )
      );
    }

    // Filter by search query
    if (q.value) {
      const search = q.value.toLowerCase();
      result = result.filter((module) => {
        return (
          module.name.toLowerCase().includes(search) ||
          module.description.toLowerCase().includes(search)
        );
      });
    }

    // Sort by selected sort and order
    const sortKey = (selectedSort.value?.key || "downloads") as keyof Module;
    const orderKey = (selectedOrder.value?.key || "desc") as "asc" | "desc";

    result = [...result].sort((a, b) => {
      const valueA = a[sortKey];
      const valueB = b[sortKey];

      // Handle undefined values (they should go to the end)
      if (valueA === undefined) return 1;
      if (valueB === undefined) return -1;

      // For string values
      if (typeof valueA === "string" && typeof valueB === "string") {
        return orderKey === "asc" ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
      }

      // For number/date values
      return orderKey === "asc" ? Number(valueA) - Number(valueB) : Number(valueB) - Number(valueA);
    });

    return result;
  });

  return {
    fetchList,
    filteredModules,
    categories,
    selectedCategory,
    sorts,
    selectedSort,
    orders,
    selectedOrder,
    q,
    selectedInterface,
  };
};
