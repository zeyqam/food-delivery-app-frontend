import SearchBar, { SearchForm } from "@/@/components/SearchBar";
import SearchResultCard from "@/@/components/SearchResultCard";
import SearchResultInfo from "@/@/components/SearchResultInfo";
import { useSearchRestaurants } from "@/api/RestaurantApi";
import { useState } from "react";
import { useParams } from "react-router-dom";

export type SearchState = {
  serachQuery: string;
};

const SearchPage = () => {
  const { city } = useParams();
  const [searchState, setSearchState] = useState<SearchState>({
    serachQuery: "",
  });
  const { results, isLoading } = useSearchRestaurants(searchState, city);

  const setSearchQuery = (searchFormData: SearchForm) => {
    setSearchState((prevState) => ({
      ...prevState,
      serachQuery: searchFormData.searchQuery,
    }));
  };

  const resetSearch = () => {
    setSearchState((prevState) => ({
      ...prevState,
      serachQuery: "",
    }));
  };

  if (isLoading) {
    <span>Loading...</span>;
  }

  if (!results?.data || !city) {
    return <span>No results found</span>;
  }
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
      <div id="cuisines-list">insert cuisine here :)</div>
      <div id="main-content" className="flex flex-col gap-5">
        <SearchBar
          searchQuery={searchState.serachQuery}
          onSubmit={setSearchQuery}
          placeholder="Search by cuisine or Restaurant name"
          onReset={resetSearch}
        />
        <SearchResultInfo total={results.pagination.total} city={city} />
        {results.data.map((restaurant) => (
          <SearchResultCard restaurant={restaurant} />
        ))}
      </div>
    </div>
  );
};

export default SearchPage;
