import useTheme from "../utils/theming/useTheme";
import { setTab } from "../redux/slices/tab.slice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store/root.reducer";
import { useCallback, useEffect, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { setCollaps } from "../redux/slices/isCollaps.slice";
import { Theme } from "../services/interface/themeInterface";
import useThemedStyles from "../utils/theming/useThemedStyles";
import { BroadcastStyle } from "../screens/broadcast/Broadcast.style";
import { BackHandler, LayoutAnimation, Platform, UIManager } from "react-native";
import { setSelectAllRecipients } from "../redux/slices/selectAllRecipients.slice";
import { broadcastRecipientsInterface } from "../services/interface/broadcastInterface";
import { setBroadcastRecipientsFilter } from "../redux/slices/broadcastRecipientsFilter.slice";
import { setSelectRecipients, setSelectRecipientsId } from "../redux/slices/selectAllId.slice";
import { BROADCAST_RECIPIENTS_ACTION, BROADCAST_TAG_LIST_ACTION } from "../redux/actions/broadcastList.action";

export const useNewBroadcast =()=>{
    const dispatch = useDispatch();
    const theme = useTheme() as Theme;
    const style = useThemedStyles(BroadcastStyle);
    const [search, setSearch] = useState('');
    const [active, setActive] = useState(false);
    const [itemSelect, setItemSelect] = useState([]);
    const [recipients, setRecipients] = useState<string[]>([]);
    const [selected, setSelected] = useState<broadcastRecipientsInterface[]>([]);

    const recipientsFilterState = useSelector(
      (state: RootState) => state.recipientsFilter,
    );
    const selectAllId = useSelector(
      (state: RootState) => state.selectRecipientsId.ids,
    );
    const selectAll = useSelector(
      (state: RootState) => state.selectAllRecipients.select,
    );
    const recipientsFilter = useSelector(
        (state: RootState) => state.broadcastRecipientsFilter,
      );
      const selectRecipients = useSelector(
        (state: RootState) => state.selectRecipientsId.recipients,
      );
      const recipient = useSelector((state: RootState) => state?.recipients);
    //handling recipients search
    const handleSearch = (value: string) => {
        setSearch(value);
        dispatch(
          setBroadcastRecipientsFilter({
            ...recipientsFilter,
            search: value,
            pageNumber: 1,
          }),
        );
      };
      // Layout animations  for adding and removing recipients
      if (Platform.OS === 'android') {
        UIManager.setLayoutAnimationEnabledExperimental &&
          UIManager.setLayoutAnimationEnabledExperimental(true);
      }
      const setAnimation = () => {
        LayoutAnimation.configureNext({
          duration: 250,
          update: {
            type: LayoutAnimation.Types.easeIn,
            springDamping: 0.5,
          },
        });
        LayoutAnimation.configureNext({
          duration: 500,
          create: {
            type: LayoutAnimation.Types.easeIn,
            property: LayoutAnimation.Properties.scaleXY,
            springDamping: 0.7,
          },
        });
      };
      useFocusEffect(
        useCallback(() => {
          const onBackPress = () => {
            dispatch(setCollaps({collaps: true}));
            return true;
          };
          BackHandler.addEventListener('hardwareBackPress', onBackPress); 
          return () =>
            BackHandler.removeEventListener('hardwareBackPress', onBackPress);
        }, []),
      );
      useEffect(() => {
        dispatch(setTab('recipients'));
        dispatch({
          type: BROADCAST_TAG_LIST_ACTION,
          payload: {pageNumber: 1, limit: 100},
        });
      }, []);
      const options = {
        enableVibrateFallback: true,
        ignoreAndroidSystemSettings: true,
      };
      useEffect(() => {
        selectAllContacts();
      }, [selectAll]);
      const selectAllContacts = () => {
        if (!selectAll || selectAllId[0]) {
          dispatch(
            setSelectAllRecipients({
              select: false,
            }),
          );
          dispatch(setSelectRecipients([])); // Clear the selected recipients
          setRecipients([]); // Clear the recipient IDs
          dispatch(setSelectRecipientsId([]));
        } else {
          const allRecipients = recipient.map(contact => contact.id);
          dispatch(setSelectRecipients(recipient)); // Select all recipients
          setRecipients(allRecipients); // Set all recipient IDs
          dispatch(setSelectRecipientsId(allRecipients));
        }
      };
      // handle the selection or deselection of a profile in the  broadcasting recipients.
      const selectedProfile = (item: broadcastRecipientsInterface) => {
        let temp = selectRecipients.filter(i => i.phoneNumber == item.phoneNumber);
    
        if (temp.length === 0) {
          dispatch(setSelectRecipients([...selectRecipients, item]));
          dispatch(setSelectRecipientsId([...selectAllId, item.id]));
          
        } else {
          let recip = selectRecipients.filter(
            i => i.phoneNumber !== item.phoneNumber,
          );
    
          dispatch(setSelectRecipients(recip));
          let ItemId = selectAllId.filter(i => i !== item.id);
          dispatch(setSelectRecipientsId(ItemId));
        }
      };
      let payload = {
        ...recipientsFilter,
        search: recipientsFilter?.search,
      };
      useEffect(() => {
        dispatch({
          type: BROADCAST_RECIPIENTS_ACTION,
          payload: payload,
        });
      }, [recipientsFilter?.search]);

   
     useEffect(()=>{
      if (selectAllId[0]) {
        setActive(true);
      }else{
        setActive(false);
      }
     },[selectAllId])
     
    return{
        style,
        theme,
        active,
        search,
        options,
        selected,
        selectAll,
        recipient,
        itemSelect,
        recipients,
        selectAllId,
        recipientsFilter,
        selectRecipients,
        recipientsFilterState,
        setAnimation,
        handleSearch,
        selectedProfile,

    }
}