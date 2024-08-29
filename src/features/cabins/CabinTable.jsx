import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import { useCabins } from "./useCabins";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";
import Empty from "../../ui/Empty";

function CabinTable() {
  const { isLoading, cabins } = useCabins();
  const [searchParams] = useSearchParams();

  if (isLoading) {
    return <Spinner />;
  }

  if (!cabins.length) return <Empty resourceName="Cabins" />;

  // if there is no filter value, set default to all
  const filterValue = searchParams.get("discount") || "all";
  const sortValue = searchParams.get("sortBy") || "sort-asc";

  // filter
  let filteredCabins;

  if (filterValue === "all") {
    filteredCabins = cabins;
  } else if (filterValue === "no-discount") {
    filteredCabins = cabins.filter((cabin) => cabin.discount !== 0);
  } else if (filterValue === "with-discount") {
    filteredCabins = cabins.filter((cabin) => cabin.discount === 0);
  }

  // sort
  let sortedCabins;

  if (sortValue === "sort-asc") {
    sortedCabins = filteredCabins.sort((cabin1, cabin2) =>
      cabin1.name.localeCompare(cabin2.name)
    );
  } else if (sortValue === "sort-desc") {
    sortedCabins = filteredCabins.sort((cabin1, cabin2) =>
      cabin2.name.localeCompare(cabin1.name)
    );
  } else if (sortValue === "regularPrice-asc") {
    sortedCabins = filteredCabins.sort(
      (cabin1, cabin2) => cabin1.regularPrice - cabin2.regularPrice
    );
  } else if (sortValue === "regularPrice-desc") {
    sortedCabins = filteredCabins.sort(
      (cabin1, cabin2) => cabin2.regularPrice - cabin1.regularPrice
    );
  } else if (sortValue === "maxCapacity-asc") {
    sortedCabins = filteredCabins.sort(
      (cabin1, cabin2) => cabin1.maxCapacity - cabin2.maxCapacity
    );
  } else if (sortValue === "maxCapacity-desc") {
    sortedCabins = filteredCabins.sort(
      (cabin1, cabin2) => cabin2.maxCapacity - cabin1.maxCapacity
    );
  }

  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={sortedCabins}
          render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
        />
      </Table>
    </Menus>
  );
}

export default CabinTable;
