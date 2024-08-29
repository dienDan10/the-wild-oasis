import TableOperations from "../../ui/TableOperations";
import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";

function CabinTableOperation() {
  const filterOptions = [
    { label: "All", value: "all" },
    { label: "No discount", value: "no-discount" },
    { label: "With discount", value: "with-discount" },
  ];

  const sortOptions = [
    { value: "sort-asc", label: "Sort by name (A-Z)" },
    { value: "sort-desc", label: "Sort by name (Z-A)" },
    { value: "regularPrice-asc", label: "Sort by price (low to high)" },
    { value: "regularPrice-desc", label: "Sort by price (high to low)" },
    { value: "maxCapacity-asc", label: "Sort by capacity (low to high)" },
    { value: "maxCapacity-desc", label: "Sort by capacity (high to low)" },
  ];

  return (
    <TableOperations>
      <Filter filterField="discount" options={filterOptions} />
      <SortBy options={sortOptions} />
    </TableOperations>
  );
}

export default CabinTableOperation;
