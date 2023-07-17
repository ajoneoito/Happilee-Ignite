import moment from "moment";
import { Linking } from "react-native";
import { useEffect, useState } from "react";
import { routeEnum } from "../enums/route.enum";
import useTheme from "../utils/theming/useTheme";
import { useRoute } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store/root.reducer";
import { navigate } from "../navigation/useNavigationUtils";
import { Theme } from "../services/interface/themeInterface";
import { leadsStyle } from "../screens/FbLeads/FbLeads.style";
import useThemedStyles from "../utils/theming/useThemedStyles";
import { useSharedValue, withTiming } from "react-native-reanimated";
import { getDateString, toUpper } from "../utils/functions/funtions";
import { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import { GLOBAL_TEMPLATE_LIST_ACTION, TEMPLATE_LIST_ACTION } from "../redux/actions/templates.action";
import { LEAD_DATA_UPDATE_ACTION, LEAD_HISTORY_ACTION, LEAD_TYPE_LIST_ACTION } from "../redux/actions/fbLeads.action";
import { ALERT_TYPE, Toast } from "../components/AlertComponent";
import { t } from "i18next";
type AndroidMode = 'date' | 'time';
export interface leadAdditionalInfo {
    type: string;
    value: string | undefined;
}
export interface detailsInterface {
    created_at: string;
    status: string;
    history_info: {
        additionalInfo: {};
        basicInfo: {};
        notes: [];
    };
}

export interface Note {
    created_at: string;
    text: string;
    updated_at: string;
}
export interface status {
    label: string;
    value: string;
    priority: string;
    description: string;
}
export interface LeadTypeItem {
    field_name: string;
    field_type: string;
}
export const useFbLeadDetails = () => {
    const [date, setDate] = useState<string>();
    const [mydate, setMyDate] = useState(new Date(Date.now()));

    const [displaymode, setMode] = useState<AndroidMode>('time');
    const [isDisplayDate, setShow] = useState(false);
    const[selectDate,setSelectDate] = useState(new Date())
    const [dateFollowUp, setDateFollowUp] = useState<string>();

    const style = useThemedStyles(leadsStyle);
    const theme = useTheme() as Theme;
    const { data } = useRoute().params;
    const dispatch = useDispatch();
    const [isVisible, setIsVisible] = useState(false);
    const [modalVisible, setmodalVisible] = useState(false);
    const [calandar, setCalandar] = useState<string | undefined>(
        data?.follow_up_date && getDateString(data?.follow_up_date),
    );
    const [form, setForm] = useState(false);
    const [followUp, setFollowUp] = useState(false);
    const [additionalInfo, setadditionalInfo] = useState<{
        [key: string]: leadAdditionalInfo;
    }>({});

    const [details, setDetails] = useState<detailsInterface>({});
    const [selectedDate, setSelectedDate] = useState<string | undefined>('');
    const [inputValues, setInputValues] = useState<{ [key: string]: string }>({});
    const status = useSelector((state: RootState) => state.leadStatus);
    const auth = useSelector((state: RootState) => state.auth);

    const [notes, setNotes] = useState('');
    const [visible, setVisible] = useState(false);
    const [fieldValue, setFieldValue] = useState('');
    const [noteList, setNoteList] = useState<Note[]>([]);
    const [leadTypeValue, setLeadTypeValue] = useState('');
    const [leadStatus, setLeadStatus] = useState<status>();
    const [leadTypeList, setLeadTypeList] = useState(false);
    const [isTextVisible, setIsTextVisible] = useState(false);
    const [leadTypeItem, setLeadTypeItem] = useState<LeadTypeItem | undefined>();


    const [dataType, setDataType] = useState('text');

    const [params, setparams] = useState(false);
    const [paramList, setParamList] = useState('');

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState('IN');
    //default dial code.
    const [country, setCountry] = useState({
        name: 'India',
        dial_code: 91,
        code: 'IN',
        flag: '🇮🇳',
    });
    const [active, setActive] = useState('lead_details');
    const history = useSelector((state: RootState) => state.fbLeadHistory);
    const leadTypes = useSelector((state: RootState) => state.leadTypeList);
    const [anim, setAnim] = useState(false);
    const [mydates, setDates] = useState(new Date());
    const [displaymodes, setModes] = useState('date');
    const [isDisplayDates, setShows] = useState(false);

    const animation = useSharedValue(0);


    const changeSelectedDate = (event: DateTimePickerEvent, selectedDate: Date | undefined) => {
        setShow(false);
        if (event.type === 'set') {
            const currentDate = selectedDate || mydate;
            setDateFollowUp(`${calandar} ${moment(currentDate).format('hh:mm A')}`);
        }
    };
    const showMode = (currentMode: AndroidMode) => {
        setShow(true);
        setMode(currentMode);
    };
    const displayTimepicker = () => {
        showMode('time');
    };
    const displayDatePicker =()=>{
        showMode('date');
    }
    // animation for lead action
    const startAnimation = () => {
        animation.value = withTiming(360, {
            duration: 200,
        });
        setAnim(!anim);
        if (anim) {
            setTimeout(() => {
                animation.value = withTiming(0);
            }, 10);
        }
    };
    // switch nav bar keys
    const switchScreens = (key: string) => {
        setActive(key);
    };
    // handle modal for history details
    const handleModal = (item: any) => {
        setForm(false);
        setIsVisible(!false);
        setDetails(item);
    };
    const onBackground_Press = () => {
        setIsVisible(!isVisible);
    };
    useEffect(() => {
        let payload = {
            lead_id: data.lead_id,
        };
        dispatch({ type: LEAD_HISTORY_ACTION, payload: payload });
    }, [active]);
    useEffect(() => {
        dispatch({ type: LEAD_TYPE_LIST_ACTION });
    }, []);
    // directing to the  individual lead actions  
    const leadAction = (url: string) => {
        if (url && url !== 'whatsapp') {
            Linking.openURL(url)
                .then(data => {
                    setIsVisible(true);
                    setForm(true);
                })
                .catch(() => { });
        } else if (url === 'whatsapp') {
            dispatch({
                type:
                    auth.projectId === 'all'
                        ? GLOBAL_TEMPLATE_LIST_ACTION
                        : TEMPLATE_LIST_ACTION,
            });
            if("Whatsapp Number (1)" in data?.data?.additionalInfo){

                navigate(routeEnum.NEWCHATSCREEN, {
                    whatsappNumber: data?.data?.additionalInfo["Whatsapp Number (1)"]["value"],
                }); 
            }else{
                Toast.show({
                    type: ALERT_TYPE.WARNING,
                    title: t('authSaga:ALERT_SUCCESS_TITLE'),
                    textBody: 'Please check  whatsapp number given or not',
                  });
            }
     
        } else {
            setForm(true);
            setIsVisible(true);
        }
        setAnim(!anim);
    };

  
    const changeSelectedDates = (event: DateTimePickerEvent, selectedDate:Date | undefined) => {
      setShows(false);
      if (event.type === 'set') {
          const currentDate = selectedDate || mydates;
          setDates(currentDate);
         handleSlectDate(moment(currentDate).format('YYYY-MM-DD'))
 
        if(leadTypeItem?.field_type === 'calender'){
        }else{
            onClickDate(moment(currentDate).format('YYYY-MM-DD'))
        }
      }
    };
    const showModes = (currentMode: AndroidMode) => {
      setShows(true);
      setModes(currentMode);
    };
    const displayDatepickers = () => {
      showModes('date');
      
    };

    const handleInputChange = (text: string, id: string) => {
        setInputValues(prevValues => ({
            ...prevValues,
            [id]: text,
        }));
    };
    useEffect(() => {
        setInputValues(data?.data?.basicInfo);
        setadditionalInfo(data?.data?.additionalInfo);
        setNoteList(data?.data?.notes);
    }, []);
    // setting additional info if the key is otherthan date of birth
    const handleAdditionalInfo = (text: string, id: string) => {
        setadditionalInfo(prevData => ({
            ...prevData,
            [id]: {
                ...prevData[id],
                value: text,
            },
        }));
    };
    // setting input values for additional notes
    const handleInputNoteChange = (index: any, value: string) => {
        let dateobj = new Date();
        const updatedNoteList = [...noteList];

        updatedNoteList[index].text = value;

        updatedNoteList[index].updated_at = dateobj.toISOString();
        setNoteList(updatedNoteList);
    };
    // toogle add new field for additional info
    const addNewField = () => {
        setVisible(!visible);
    };
    // toogle  field for  add new notes
    const addNoteField = () => {
        setIsTextVisible(!isTextVisible);
    };
    // add count to individual fields 
    function countKeysWithPrefix(obj: any, prefix: string) {
        return Object.keys(obj).filter(key => key.startsWith(prefix)).length;
    }


    // Adding  additional info  fields
    const onClickField = () => {
        let count = countKeysWithPrefix(
            additionalInfo,
            toUpper(leadTypeItem?.field_name),
        );


        if (leadTypeItem?.field_type === 'calender') {
            setadditionalInfo(prevData => ({
                ...prevData,
                [toUpper(leadTypeItem.field_name) + ' ' + `(${count + 1})`]: {
                    type: leadTypeItem.field_type,
                    value: selectedDate,
                },
            }));
        } else {
            setadditionalInfo(prevData => ({
                ...prevData,
                [toUpper(leadTypeItem?.field_name) + ' ' + `(${count + 1})`]: {
                    type: leadTypeItem?.field_type ?? '',
                    value: fieldValue,
                },
            }));
        }

        setFieldValue('');
        setLeadTypeValue('');
        setSelectedDate('');
        setLeadTypeItem('');
    };
    // Delete function for delete additional info, update the count of deleted info
    const handleDelete = (key: string) => {
        setadditionalInfo(prevFormData => {
          const newFormData = { ...prevFormData };
          delete newFormData[key];
      
          const prefix = key.substring(0, key.indexOf('(') + 1 ); // Extract the prefix
      console.warn("prefix",prefix)
          let index = 1;
        const updatedFormData: Record<string, any> = {};
      
          Object.keys(newFormData).forEach(existingKey => {
            console.warn("existingKey",existingKey)
            if (existingKey.startsWith(prefix)) {
              const updatedKey = `${prefix}${index})`;
              updatedFormData[updatedKey] = newFormData[existingKey];
              console.warn("updatedKey", )
              index++;
            } else {
              updatedFormData[existingKey] = newFormData[existingKey];
              console.warn("updatedKey2" )
            }
          });
      
          // Return the updated form data
          return updatedFormData;
        });
      };
      
      
      
      
      
      

      
    // Delete function for delete notes
    const handleDeleteNote = (item: Note) => {
        setNoteList(noteList.filter(prev => prev !== item));
    };
    //add  new notes
    const handleNotes = () => {
        if (notes) {
            setNoteList([
                ...noteList,
                {
                    text: notes,
                    created_at: new Date().toISOString(),
                    updated_at: new Date().toISOString(),
                },
            ]);
            setNotes('');
        }
    };


    const onClickStatus = (item: status) => {
        setLeadStatus(item);
    };
    const onClickCalendar = () => {
        setmodalVisible(true);

    };

    const handleFollowUP = () => {
        setFollowUp(true);
    };
    const handleSlectDate = (item: string) => {
        setSelectedDate(item)
    }

    const handleLeadTypeList = () => {
        setLeadTypeList(!leadTypeList)
    }
    const handleLeadTypeValue = (item: any) => {
        setLeadTypeValue(item)
    }
    //handling field items
    const handleOnClickFieldItems = (item: any) => {
        setLeadTypeItem(item);
        if (item.field_type === 'phone_number') {
            setDataType('phone-pad');
        } else {
            setDataType('default');
        }
    }
    const handleOpen = () => {
        setOpen(!open);
    }
    const handleFlagValues = (item: any) => {
        setValue(item);
    }
    const handleonSelectFlag = (item: any) => {
        setCountry(item.flag);
    }
    const handleOpenParams = () => {
        setparams(!params);
    }
    const handleSetParamList = (item: any) => {
        setParamList(item)
    }
    const handleDate = (item: string) => {
        setCalandar(item)
    }
    const onClickCancel = () => {
        setFollowUp(false);
    }
    // update changes
    const handleChanges = () => {
        let payload = {
            lead_id: data.lead_id,
            follow_up_date: calandar,
            ...inputValues,
            status: leadStatus?.label ? leadStatus.label : data.data.basicInfo.status,
            status_id: leadStatus?.value
                ? leadStatus?.value
                : data.lead_status_filter_id,
            notes: noteList,
            ...additionalInfo,
        };
        dispatch({ type: LEAD_DATA_UPDATE_ACTION, payload: payload });
        setActive('history');
        dispatch({ type: LEAD_HISTORY_ACTION, payload: { lead_id: data.lead_id } });
        setIsVisible(false);
    };
    const onClickModal = () => {
        setmodalVisible(false);
    }
    const onClickDate = (item: string) => {
        if (date !== undefined) {
            setadditionalInfo(prevData => ({
                ...prevData,
                [date]: {
                    ...prevData[date],
                    value: item,
                },
            }));

        }

    }
    const handleFieldValue = (text: string) => {
        setFieldValue(text);
    }
    const handleTextNotes = (text: string) => {
        setNotes(text);
    }
    const onClickButton = () => {
        setIsVisible(false);
    }
    const handleSetDate = (key: string) => {
        setDate(key);
    }

    return {
        data,
        anim,
        form,
        open,
        date,
        value,
        auth,
        notes,
        style,
        theme,
        status,
        params,
        active,
        mydate,
        history,
        country,
        visible,
        details,
        noteList,
        followUp,
        calandar,
        dataType,
        isVisible,
        leadTypes,
        animation,
        paramList,
        fieldValue,
        leadStatus,
        displaymode,
        inputValues,
        selectedDate,
        modalVisible,
        leadTypeList,
        dateFollowUp,
        leadTypeItem,
        isDisplayDate,
        isTextVisible,
        leadTypeValue,
        additionalInfo,
        showMode,
        dispatch,
        handleDate,
        handleOpen,
        leadAction,
        handleModal,
        addNewField,
        onClickDate,
        handleNotes,
        handleDelete,
        onClickField,
        addNoteField,
        onClickModal,
        onClickCancel,
        onClickStatus,
        handleChanges,
        onClickButton,
        handleSetDate,
        switchScreens,
        startAnimation,
        handleFollowUP,
        onClickCalendar,
        handleSlectDate,
        handleTextNotes,
        handleDeleteNote,
        handleFieldValue,
        handleOpenParams,
        handleFlagValues,
        displayTimepicker,
        handleInputChange,
        handleonSelectFlag,
        changeSelectedDate,
        handleSetParamList,
        onBackground_Press,
        handleLeadTypeList,
        handleLeadTypeValue,
        handleAdditionalInfo,
        handleInputNoteChange,
        handleOnClickFieldItems,
        displayDatePicker,
        selectDate,
        displayDatepickers,
        showModes,
        changeSelectedDates,
        mydates,
        displaymodes,
        isDisplayDates,

    }
}