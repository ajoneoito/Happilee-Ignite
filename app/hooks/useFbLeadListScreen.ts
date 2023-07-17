import { FlatList } from "react-native";
import useTheme from "../utils/theming/useTheme";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store/root.reducer";
import { Theme } from "../services/interface/themeInterface";
import { leadsStyle } from "../screens/FbLeads/FbLeads.style";
import useThemedStyles from "../utils/theming/useThemedStyles";
import { removeDuplicates } from "../utils/functions/funtions";
import { setInitialArray } from "../redux/slices/fbLeads.slice";
import { setLeadFilter } from "../redux/slices/leadFilter.slice";
import { setFbLeadFilter } from "../redux/slices/fbLeadFilter.slice";
import { MANAGE_SKELETON_LOADING } from "../redux/actions/skeleton.action";
import { FB_LEADS_LIST_ACTION, LEAD_STATUS_ACTION } from "../redux/actions/fbLeads.action";
import useDebouncedSearch from "./useDebouncedSearch";

export const useFbLeadListScreen = ()=>{
    const style = useThemedStyles(leadsStyle);
  const dispatch = useDispatch();
  let leads = removeDuplicates(
    useSelector((state: RootState) => state.fbLeads?.data),
  );

  const theme = useTheme() as Theme;
  const ref = useRef<FlatList>(null);
  const addon = useSelector((state: RootState) => state.addon);
  const status = useSelector((state: RootState) => state.leadStatus);
  const filter = useSelector((state: RootState) => state.leadFilter);

  const [active, setActive] = useState('status');
  const [activeStatus, setActiveStatus] = useState('new');
  const [newStatus, setNewStatus] = useState(true);
  const [search, setSearch] = useState('');
  const [loader,setLoader] = useState(false)
  const searchFilter = useSelector((state: RootState) => state.fbLeadFilter);
  const skeleton = useSelector((state: RootState) => state.skeleton);
  const searchQuery = useDebouncedSearch(search, 500);
    // handle search values
  const handleSearch = (value: string) => {
    setSearch(value);
    dispatch(
      setFbLeadFilter({
        ...searchFilter,
        search: value,
      }),
    );
  };
  useEffect(() => {
    let payload = {
      ...filter,
      search: searchFilter?.search,
    };
    if (searchFilter?.search === '') {
      dispatch({type: MANAGE_SKELETON_LOADING, payload: {skeleton:true}});
      dispatch(setInitialArray());
      
    }
    dispatch({type: FB_LEADS_LIST_ACTION, payload: payload});
  }, [filter, searchQuery]);
  useEffect(() => {
    dispatch({type: MANAGE_SKELETON_LOADING, payload: {skeleton:true}});
    dispatch(setInitialArray());
    setActiveStatus('new');
    setActive('status');
    
    dispatch({type: LEAD_STATUS_ACTION, payload: filter});
    setLoader(true)
  }, []);
  const switchScreens = (key: string) => {
    setActive(key);
    dispatch({type: MANAGE_SKELETON_LOADING, payload: true});
    dispatch(setInitialArray());
  
    if (key === 'follow_up') {
      setActiveStatus('today');
      dispatch(
        setLeadFilter({
          ...filter,
          filter_type: key,
          filter_key: 'today',
        }),
      );
      setLoader(true)
    } else {
      setActiveStatus('new');

      dispatch(
        setLeadFilter({
          ...filter,
          filter_type: key,
          filter_key: 'new',
        }),
      );
      setLoader(true)
    }
  };
  const handleStatus = () => {
    setNewStatus(!newStatus);
    setActiveStatus('new');
    dispatch(
      setLeadFilter({
        ...filter,
        filter_key: 'new',
      }),
    );
  };
  const loadMoredata = () => {
    if (searchFilter.hasNextPage === true) {
      dispatch({
        type: FB_LEADS_LIST_ACTION,
        payload: {
          ...filter,
          pageNumber: searchFilter.pageNumber + 1,
        },
      });
    }
  };
    // switch status filter keys
    const switchStatus = (key: string,item) => {
        dispatch({type: MANAGE_SKELETON_LOADING, payload: true});
        dispatch(setInitialArray());
        
    
        // if (ref.current != null && key !="today" && key !="tomorrow" && key !="overdue" )   { 
        //   ref.current.scrollToItem({
        //     item: item,
        //     animated: true,
        //     viewPosition: 0,
        //   });
        // }
        setActiveStatus(key);
        dispatch(
          setLeadFilter({
            ...filter,
            filter_key: key,
          }),
        );
      };
    return{
        ref,
        style,
        leads,
        theme,
        addon,
        status,
        filter,
        active,
        search,
        loader,
        skeleton,
        newStatus,
        activeStatus,
        searchFilter,
        dispatch,
        handleSearch,   
        switchStatus,
        switchScreens,
        loadMoredata,

    }
}