import React, { useEffect } from 'react';
import { useState, createContext, useContext } from "react";
import { useData } from "./VehiclesContext";
import { useSorting } from "./SortingContext";
import { useFavorites, useFavoriteVehicles } from "./FavoritesContext";
import PropTypes from 'prop-types';

const CurrentPageListContext = createContext({});
const PagesContext = createContext(1);
const NavigatePageContext = createContext(null);
const SearchTermContext = createContext("");

export const useCurrentPageList = () => useContext(CurrentPageListContext);
export const usePages = () => useContext(PagesContext);
export const useNavigatePage = () => useContext(NavigatePageContext);
export const useSearchTerm = () => useContext(SearchTermContext);

const PagingProvider = ({ children }) => {
  const vehicles = useData();
  const { sortList } = useSorting();
  const { favoritesPage } = useFavorites();
  const { favoriteVehicles } = useFavoriteVehicles();

  const [currentPage, updateCurrentPage] = useState(1);
  const [searchedTerm, changeSearchedTerm] = useState("");

  const vehiclesList = !favoritesPage ? vehicles : favoriteVehicles;

  const searchedDataHandler = () => {
    return vehiclesList.filter(
      (vehicle) =>
        vehicle.vehicleBrand
          .toLowerCase()
          .includes(searchedTerm.toLowerCase()) ||
        vehicle.vehicleModel.toLowerCase().includes(searchedTerm.toLowerCase())
    );
  };

  const numberOfPages = () =>
    Math.ceil(searchedDataHandler().length / numberPerPage);

  const listSortedByName = sortList(searchedDataHandler());
  const numberPerPage = 8;
  const currentPageList = listSortedByName.slice(
    (currentPage - 1) * numberPerPage,
    numberPerPage * currentPage
  );

  const searchHandler = (e) => {
    changeSearchedTerm(e.target.value);
  };

  useEffect(() => {
    updateCurrentPage(1);
  }, [favoritesPage])

  return (
    <CurrentPageListContext.Provider value={ currentPageList }>
      <PagesContext.Provider value={ numberOfPages }>
        <SearchTermContext.Provider value={{ searchedTerm, searchHandler }}>
          <NavigatePageContext.Provider
            value={ updateCurrentPage }
          >
            {children}
          </NavigatePageContext.Provider>
        </SearchTermContext.Provider>
      </PagesContext.Provider>
    </CurrentPageListContext.Provider>
  );
};

PagingProvider.propTypes = {
  children: PropTypes.node.isRequired
}

export default PagingProvider;
