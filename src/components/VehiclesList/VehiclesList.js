import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useCurrentPageList } from '../../common/contexts/PagingContext';
import { usePopupModal } from '../../common/contexts/PopupModalContext';

import VehicleListItem from './VehicleListItem';
import VehicleListItemPopup from './VehicleListItemPopup';
import VehiclesListPaging from '../VehiclesListFunctionality/VehiclesListPaging';
import VehiclesListSorting from '../VehiclesListFunctionality/VehiclesListSorting';

import './VehiclesList.scss';
import { useSortingStyle } from '../../common/contexts/SortingContext';

const VehiclesList = () => {
  const currentPageList = useCurrentPageList();
  const { popup } = usePopupModal();
  const { listStyle } = useSortingStyle();

  return (
    <div className='vehicles-list'>
      <VehiclesListSorting />
      <ul className={'vehicles-list__list ul-' + listStyle}>
        {currentPageList &&
          currentPageList.map((vehicle) => (
            <VehicleListItem
              key={uuidv4()}
              vehicle={vehicle}
            />
          ))}
      </ul>
      {popup && (
        <VehicleListItemPopup />
      )}
      <VehiclesListPaging />
    </div>
  );
};

export default VehiclesList;
