import { useEffect, useState } from "react";
import { addons } from "../constants/filterOptions";
import { setAddon } from "../redux/slices/addon.slice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store/root.reducer";
import { navigate } from "../navigation/useNavigationUtils";
import { FbLeadStyle } from "../screens/addons/Addons.style";
import useThemedStyles from "../utils/theming/useThemedStyles";
import { ADD_ONS_ACTION } from "../redux/actions/fbLeads.action";
import { addonsList } from "../services/interface/fbLeadsInterface";
import { setAddonListFilter } from "../redux/slices/addonListFilter.slice";

export const useAddonsScreen =()=>{
    const dispatch = useDispatch();
    const [search, setSearch] = useState('');
    const style = useThemedStyles(FbLeadStyle);
    const addonListFilter = useSelector(
      (state: RootState) => state.addonListFilter,
    );
    const addonList = useSelector((state: RootState) => state.addonsList);
    let payload = {
        search: addonListFilter.search,
        category: 'new',
        appsListType: 'subscribed',
    };
      useEffect(() => {
        dispatch({type: ADD_ONS_ACTION, payload: payload});
      }, [addonListFilter]);
      // search item
      const searchData = (value: string) => {
        setSearch(value);
        dispatch(
          setAddonListFilter({
            ...addonListFilter,
            search: value,
          }),
        );
      };
    // navigate to the particular  addon screen
  const handleClick = (item: addonsList) => {
    addons.find(add => {
      if (add.key === item.id) {
        navigate(add.screen);
        dispatch(setAddon(item));
      }
    });
  };
    return{
        style,
        search,
        addonList,
        addonListFilter,
        dispatch,
        searchData,
        handleClick,



    }
}