/**
 * Header.tsx
 * @module Comman Header component.
 * @desc Common header component used in screen except chat component.
 * @author Saifali NeoITO
 * @version 0.0.1
 * @access public
 * @todo Need to add error hadler
 * ...
 */
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TextInput,
  FlatList,
  Platform,
} from 'react-native';
import {
  HeaderArrow,
  WhiteIcon,
  Happilee,
  Search,
  Filter,
  Menu,
  Hamburger,
} from '../../assets';
import Animated, {
  withTiming,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import {C} from '../../constants';
import React, {useEffect, useState} from 'react';
import MenuComponent from './Menu.component';
import Collapsible from 'react-native-collapsible';
import useTheme from '../../utils/theming/useTheme';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../redux/store/root.reducer';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {setCollaps} from '../../redux/slices/isCollaps.slice';
import useThemedStyles from '../../utils/theming/useThemedStyles';
import {DrawerActions, useNavigation} from '@react-navigation/native';
import ContactFilter from '../../screens/newChat/ContactFilter.component';
import BroadcastFilter from '../../screens/broadcast/BroadcastFilter.component';
import {BROADCAST_RECIPIENTS_ACTION} from '../../redux/actions/broadcastList.action';
import {setTab} from '../../redux/slices/tab.slice';
import { Theme } from '../../services/interface/themeInterface';
import { routeEnum } from '../../enums/route.enum';
import { navigate } from '../../navigation/useNavigationUtils';
const dgl = C.measures.dgl;
interface Props {
  logo?: boolean;
  hamburger?: boolean;
  title?: string | null;
  subTitle?: string;
  search?: boolean;
  filter?: boolean;
  menu?: boolean;
  arrow?: boolean;
  value?: string;
  goBack?: boolean;
  onChangeText?: any;
  searchText?: string;
  modalFilter?: boolean;
  img?: string | HTMLImageElement;
  statusLabel?: string;
  isCollapsed?: boolean;
  setSearchText?: (value: string) => void;
  setPrimaryFilter?: (value: string) => void;
  setSecondaryFilter?: (value: string) => void;
}
export interface newBroadcast {
  id: string;
  tagName: string;
  createdAt: string;
  updatedAt: string;
}
const Header = (props: Props) => {
  const dispatch = useDispatch();
  const style = useThemedStyles(styles);
  const theme = useTheme() as Theme;
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [primary, setPrimary] = useState('');
  const [secondary, setSecondary] = useState('');
  const SEARCH_SWITCH = useSharedValue(false);
  const FILTER_SWITCH = useSharedValue(false);
  const navigation = useNavigation();
  //Broadcast Filter component states
  const activeTab = useSelector((state: RootState) => state.tab);
  const AudioState = useSelector((state: RootState) => state.closeAudioPLayer);
  const [selectedTags] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [active, setActive] = useState<newBroadcast[]>([]);
  const [condition, setCondition] = useState('');
  const [selectParams, setSelectPrams] = useState('');
  const [paramFilter, setParamFilter] = useState<{}[]>([]);
  const collaps = useSelector((state: RootState) => state?.isCollaps);
  const recipientsFilter = useSelector(
    (state: RootState) => state.broadcastRecipientsFilter,
  );
  const animatedStyleLogo = useAnimatedStyle(() => {
    return {
      width:
        SEARCH_SWITCH.value || FILTER_SWITCH.value
          ? withTiming('0%')
          : withTiming('64%'),
    };
  });
  const animatedTextStyle = useAnimatedStyle(() => {
    return {
      display: SEARCH_SWITCH.value || FILTER_SWITCH.value ? 'none' : 'flex',
    };
  });
  const animatedStyle1 = useAnimatedStyle(() => {
    return {
      height: SEARCH_SWITCH.value || FILTER_SWITCH.value ? 0 : 20,
    };
  });

  const animatedSearchBar = useAnimatedStyle(() => {
    return {
      width: SEARCH_SWITCH.value ? withTiming('100%') : withTiming('0%'),
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.colors.TEXT_COLOR,
      alignContent: 'center',
    };
  });

  const animatedFilterBar = useAnimatedStyle(() => {
    return {
      width: FILTER_SWITCH.value ? withTiming('100%') : withTiming('0%'),
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.colors.TEXT_COLOR,
      alignContent: 'center',
    };
  });

  const animatedMenuBar = useAnimatedStyle(() => {
    return {
      width:
        SEARCH_SWITCH.value || FILTER_SWITCH.value
          ? withTiming('0%')
          : withTiming('30%'),
      flexDirection: 'row',
      justifyContent: 'flex-end',
    };
  });

  const renderPrimaryFilters = (item: any) => {
    return (
      <TouchableOpacity
        style={[
          style.primaryBox,
          {
            backgroundColor:
              primary === item.key
                ? theme.colors.BACKGROUND
                : theme.colors.TEXT_COLOR,
          },
        ]}
        onPress={() => {
          setPrimary(item.key);
          props.setPrimaryFilter(item.key);
          setSecondary('');
        }}>
        <Text
          style={[
            style.primaryText,
            {
              color:
                primary === item.key
                  ? theme.colors.TEXT_COLOR
                  : theme.colors.BACKGROUND,
            },
          ]}>
          {item.title}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderSecondaryFilters = (item: any) => {
    return (
      <TouchableOpacity
        disabled={item.clickable.includes(primary) ? false : true}
        style={[
          style.primaryBox,
          {
            backgroundColor:
              secondary === item.key
                ? theme.colors.BACKGROUND
                : theme.colors.TEXT_COLOR,
          },
        ]}
        onPress={() => {
          setSecondary(item.key);
          props.setSecondaryFilter(item.key);
        }}>
        <Text
          style={[
            style.primaryText,
            {
              color:
                secondary === item.key
                  ? theme.colors.TEXT_COLOR
                  : theme.colors.BACKGROUND,
            },
          ]}>
          {item.title}
        </Text>
      </TouchableOpacity>
    );
  };
  //Broadcast filter state updation
  const handleMatchCondition = (item: string) => {
    setCondition(item);
  };
  const handleSelectParams = (item: string) => {
    setSelectPrams(item);
  };
  let matchCondition: string;
  const handleFilter = (tagFilter: newBroadcast[]) => {
    const tag = tagFilter ?? active;
    const payload = {
      tag_filter: tag.map(item => item.tagName),
      parameter_filter:
        selectParams.length && condition.length && input.length
          ? [
              ...paramFilter,
              {parameter: selectParams, condition: condition, value: input},
            ]
          : paramFilter.length && input.length === 0
          ? [...paramFilter]
          : null,
      match_condition: matchCondition,
      pageNumber: 1,
      limit: 100,
      search: '',
      is_select_all: false,
    };
    dispatch({type: BROADCAST_RECIPIENTS_ACTION, payload: payload});
    setIsVisible(false);
  };
  const selectedProfile = (item: newBroadcast) => {
    let tempArray: newBroadcast[] = [];
    if (active.includes(item)) {
      tempArray = active.filter(i => i !== item);
    } else {
      tempArray = [...active, item];
    }
    setActive([...tempArray]);
    handleFilter(tempArray);
  };
  const handleModal = () => {
    setIsVisible(!false);
  };
  const handleIsModalInvisible = () => {
    setIsVisible(false);
  };
  const onBackground_Press = () => {
    setIsVisible(!isVisible);
  };
  let input = '';
  const menuFn = () => {
    navigation.dispatch(DrawerActions.toggleDrawer());
  };
  const handleBack = () => {
    if (activeTab === 'recipients') {
      dispatch(setTab('broadcast'));
    }
  };
  // const handleSearch =()=>{

  // }
  useEffect(() => {
    if (props.search && SEARCH_SWITCH.value === true) {
      SEARCH_SWITCH.value = false;
    }
  }, [activeTab]);
  return (
    <>
      <View
        style={[
          style.conatiner,
          AudioState?.isAudioPlaying === null ? undefined : style.paddingTop,
        ]}>
        <StatusBar
          // hidden={false}
          // backgroundColor="transparent"
          // translucent={true}
          // barStyle={'light-content'}
          backgroundColor={theme.colors.TEXT_COLOR}
        />
        <Animated.View style={animatedStyleLogo}>
          {props.logo ? (
            <View style={style.logoC}>
              {props.hamburger ? (
                <Hamburger onPress={menuFn} style={style.hamburger} />
              ) : null}
              <WhiteIcon width={dgl * 0.027} height={dgl * 0.03} />
              <Happilee width={dgl * 0.1} height={dgl * 0.03} />
            </View>
          ) : (
            <Animated.View style={[style.titleC, animatedStyle1]}>
              {props.arrow ? (
                <TouchableOpacity
                  hitSlop={{top: 15, bottom: 15, left: 15, right: 15}}
                  onPress={() => {
                    
                    handleBack();
                    if(props.goBack){
                      navigate(routeEnum.ADDONSSCREEN)
                    }else {
                      navigation.goBack()
                     
                    }
                

                  }}>
                  <HeaderArrow  
                    style={style.headerArrow}
                    height={dgl * 0.02}
                    width={dgl * 0.02}
                  />
                </TouchableOpacity>
              ) : null}
              <View style={style.subBox}>
                {props.title && props.img ? (
                  <Animated.View style={style.imageContainer}>
                    {props.img}
                    <Animated.Text
                      style={[
                        style.titleText,
                        animatedTextStyle,
                        {paddingHorizontal: 10},
                      ]}>
                      {props.title}
                    </Animated.Text>
                  </Animated.View>
                ) : null}
                {props.title && !props.img ? (
                  <Animated.Text style={[style.titleText, animatedTextStyle]}>
                    {props.title}
                  </Animated.Text>
                ) : null}
                {props.subTitle ? (
                  <Animated.Text style={[style.subText, animatedTextStyle]}>
                    {props.subTitle}
                  </Animated.Text>
                ) : null}
              </View>
            </Animated.View>
          )}
        </Animated.View>
        <Animated.View style={animatedSearchBar}>
          <TouchableOpacity
            onPress={() => {
              SEARCH_SWITCH.value = false;
              props.setSearchText('');
              // handleSearch();
            }}>
            {Platform.OS === 'ios' && !SEARCH_SWITCH.value ? null : (
              <HeaderArrow height={dgl * 0.02} width={dgl * 0.02} />
            )}
          </TouchableOpacity>
          <TextInput
            value={props.searchText}
            onChangeText={props.setSearchText}
            placeholder="Search here..."
            placeholderTextColor={theme.colors.BACKGROUND}
            style={style.searchInput}
          />
        </Animated.View>
        <Animated.View style={animatedFilterBar}>
          <TouchableOpacity
            onPress={() => {
              FILTER_SWITCH.value = false;
              setIsCollapsed(true);
              setPrimary('');
              setSecondary('');
              props.setPrimaryFilter('');
              dispatch(setCollaps({collaps: true}));
              // {
              //   activeTab === 'recipients'
              //     ? dispatch({
              //         type: BROADCAST_RECIPIENTS_ACTION,
              //         payload: recipientsFilter,
              //       })
              //     : null;
              // }
            }}>
            {Platform.OS === 'ios' &&
            !SEARCH_SWITCH.value &&
            !FILTER_SWITCH.value ? null : (
              <HeaderArrow height={dgl * 0.02} width={dgl * 0.02} />
            )}
          </TouchableOpacity>
          <TextInput
            // value={props.searchText}
            // onChangeText={props.setSearchText}
            placeholder="Filter..."
            placeholderTextColor={theme.colors.BACKGROUND}
            style={style.searchInput}
            editable={false}
          />
        </Animated.View>
        <Animated.View style={animatedMenuBar}>
          {props.search ? (
            <TouchableOpacity
              style={style.touchable}
              onPress={() => {
                SEARCH_SWITCH.value = true;
              }}>
              <Search width={dgl * 0.03} height={dgl * 0.023} />
            </TouchableOpacity>
          ) : null}
          {props.filter ? (
            <TouchableOpacity
              style={style.touchable}
              onPress={() => {
                FILTER_SWITCH.value = true;
                setIsCollapsed(false);
                dispatch(setCollaps({collaps: false}));
              }}>
              <Filter width={dgl * 0.03} height={dgl * 0.023} />
            </TouchableOpacity>
          ) : null}
          {props.menu && <MenuComponent />}
          {props.statusLabel && (
            <View style={style.status}>
              <Text numberOfLines={1} style={style.statusLabel}>{props.statusLabel}</Text>
            </View>
          )}
        </Animated.View>
      </View>
      <Collapsible collapsed={isCollapsed}>
        {activeTab === 'chats' && (
          <View style={style.collapsedView}>
            {/* Use active tab state for diffrent filter option in future,
             Now only chatlist filter is renderd, without any condition. */}

            <FlatList
              numColumns={3}
              data={C.filters.chatlistPrimary}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item}) => renderPrimaryFilters(item)}
            />
            <View style={style.secondaryBox}>
              <FlatList
                numColumns={3}
                data={C.filters.chatlistSecondary}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item}) => renderSecondaryFilters(item)}
              />
            </View>
          </View>
        )}
        {activeTab === 'Contacts' && <ContactFilter />}
      </Collapsible>
      {activeTab === 'recipients' && !collaps.collaps && (
        <BroadcastFilter
          isVisible={isVisible}
          handleModal={handleModal}
          selectedProfile={item => {
            selectedProfile(item);
          }}
          selectedOptions={selectedTags}
          handleIsModalInvisible={handleIsModalInvisible}
          onBackground_Press={onBackground_Press}
          setMatchCondition={(item: string) => {
            handleMatchCondition(item);
          }}
          selectPrams={(item: string) => {
            handleSelectParams(item);
          }}
          handleValues={(item: string) => {
            if (selectParams === 'phone') {
              input = '91'.concat(item);
            } else {
              input = item;
            }
          }}
          handleFilterParams={(item: string) => {
            matchCondition = item;
            if (selectParams.length && condition.length && input.length) {
              setParamFilter([
                ...paramFilter,
                {parameter: selectParams, condition: condition, value: input},
              ]);
            }
            handleFilter();
          }}
        />
      )}
    </>
  );
};

export default Header;

export const styles = (theme: any) =>
  StyleSheet.create({
    conatiner: {
      backgroundColor: theme.colors.TEXT_COLOR,
      padding: dgl * 0.013,
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      paddingTop: Platform.OS === 'ios' ? dgl * 0.06 : dgl * 0.013,
    },
    firstC: {
      width: '64%',
    },
    secondC: {
      width: '30%',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    touchable: {width: '100%', marginHorizontal: 3},
    logoC: {flexDirection: 'row', alignItems: 'center'},
    titleC: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    titleText: {
      fontFamily: C.font.Medium,
      color: theme.colors.BACKGROUND,
      fontSize: dgl * 0.015,
    },
    subText: {
      fontFamily: C.font.Light,
      color: theme.colors.BACKGROUND,
      fontSize: dgl * 0.013,
    },
    subBox: {
      alignSelf: 'center',
      marginLeft: dgl * 0.008,
    },
    searchInput: {
      fontFamily: C.font.Medium,
      fontSize: dgl * 0.016 * theme.fontRef,
      color: theme.colors.BACKGROUND,
      alignContent: 'center',
      justifyContent: 'center',
      alignItems: 'center',
      width: '90%',
      marginLeft: '2%',
      padding: 0,
    },
    filterTitle: {
      fontFamily: C.font.Medium,
      fontSize: dgl * 0.016 * theme.fontRef,
      color: theme.colors.BACKGROUND,
      marginLeft: '2%',
      alignSelf: 'center',
    },
    collapsedView: {
      backgroundColor: theme.colors.TEXT_COLOR,
      paddingHorizontal: dgl * 0.02,
      flex: 0, // Dont remove it.
    },
    primaryBox: {
      padding: 6,
      borderColor: theme.colors.BACKGROUND,
      margin: 5,
      borderRadius: dgl * 0.02,
      borderWidth: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    primaryText: {
      fontFamily: C.font.Medium,
      fontSize: dgl * 0.012 * theme.fontRef,
    },
    secondaryBox: {
      borderTopColor: theme.colors.BACKGROUND,
      borderTopWidth: 0.7,
      marginTop: dgl * 0.008,
      paddingTop: dgl * 0.008,
    },
    headerArrow: {
      paddingVertical: dgl * 0.07,
      paddingHorizontal: 10,
    },
    hamburger: {
      marginRight: dgl * 0.012,
    },
    imageContainer: {
      flexDirection: 'row',
      paddingHorizontal: 5,
      justifyContent: 'center',
      alignItems: 'center',
    },
    status: {
      paddingHorizontal: 8,
      borderRadius: 100,
      borderWidth: 1,
      backgroundColor: theme.colors.V_LIGHT_GREEN,
      marginLeft: dgl * 0.03,
      borderColor: 'transparent',
      alignItems: 'center',
      justifyContent: 'center',
    },
    statusLabel: {
      alignSelf: 'center',
      color: theme.colors.GREEN_LIGHT,
      fontFamily: C.font.Regular,
      fontSize: dgl * 0.014,
    },
    paddingTop: {paddingTop: Platform.OS === 'android' ? '15%' : '33%'},
  });
