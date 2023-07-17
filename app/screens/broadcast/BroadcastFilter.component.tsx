/* eslint-disable react-hooks/exhaustive-deps */
/**
 * BroadcastFilter.component.tsx
 * @module  NewBroadcastFilter component
 * @desc Component for filtering recipients.
 * @author Sujitha NeoITO
 * @version 0.0.1
 * @access public
 * ...
 */
import {t} from 'i18next';
import {
  newBroadcastFilter,
  broadcastMatchFilterParams,
} from '../../constants/filterOptions';
import {Add, CancelIcon} from '../../assets';
import {BroadcastStyle} from './Broadcast.style';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {API_LIMIT} from '../../constants/pagination';
import {RootState} from '../../redux/store/root.reducer';
import Button from '../../components/Button/Button.component';
import useThemedStyles from '../../utils/theming/useThemedStyles';
import ModalStructure from '../../components/Modal/Modal.component';
import InputField from '../../components/InputField/InputField.component';
import DropDown from '../../components/DropdownPicker/drodpDown.component';
import {BROADCAST_FILTER_PARAMS_ACTION} from '../../redux/actions/broadcastList.action';
import {FlatList, Pressable, ScrollView, Text, TouchableOpacity, View} from 'react-native';
interface Item {
  selectedProfile: (item: newBroadcast) => void;
  isVisible: boolean;
  handleModal: () => void;
  selectedOptions: any;
  onBackground_Press?: () => void;
  handleIsModalInvisible?: () => void;
  setMatchCondition: (value: string) => void;
  selectPrams: (value: string) => void;
  handleValues: (input: string) => void;
  handleFilterParams: (temp: string) => void;
}
export interface newBroadcastFilter {
  key: string;
  title: string;
}
export interface newBroadcast {
  id: string;
  tagName: string;
  createdAt: string;
  updatedAt: string;
}
export interface INewArray {
  name: string;
  value: string;
}
export interface ReadMore {
  text: string,
  maxLength: number,
}
const BroadcastFilter = (props: Item) => {
  const {
    selectedProfile,
    isVisible,
    handleModal,
    handleIsModalInvisible,
    onBackground_Press,
    setMatchCondition,
    selectPrams,
    handleValues,
    handleFilterParams,
  } = props;
  const [selecetd, setSelected] = useState<newBroadcastFilter | null>();
  const [index, setIndex] = useState<newBroadcastFilter>();
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  // Drop down states
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');

  const [params, setparams] = useState(false);
  const [paramList, setParamList] = useState('');
  // state for input field onchange
  const [input, setInput] = useState('');
  const [activeFilter, setActiveFilter] = useState(false);
  const style = useThemedStyles(BroadcastStyle);
  const broadcastFilterTags = useSelector(
    (state: RootState) => state.broadcastTags,
  );
  const FilterParams = useSelector((state: RootState) => state.paramsList);
  const [matchAll, setMatchAll] = useState(false);
  const [match, setMatch] = useState('all');
  const recipient = useSelector((state: RootState) => state?.recipients);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: BROADCAST_FILTER_PARAMS_ACTION,
      payload: {pageNumber: 1, limit: API_LIMIT},
    });
  }, []);
  // switch between match all, match any  filters
  const handleFilterItems = (item: newBroadcastFilter) => {
    setIndex(item);
    setSelected(selecetd === item ? null : item);
    if (item.title === 'Match All') {
      setMatch('all');
    } else {
      setMatch('any');
    }
  };
  useEffect(() => {
    handleFilterParams(match);
  }, [match]);
  const renderItem = (item: newBroadcastFilter) => {
    return (
      <TouchableOpacity
        onPress={() => {
          handleFilterItems(item);
          setMatchAll(true);
        }}
        style={style.mainWrap}>
        <View style={style.containerOne}>
          <View
            style={[
              style.radioButton,
              (index === item && selecetd !== null) ||
              (item.title === 'Match All' && !matchAll)
                ? style.circleActive
                : style.circleDisable,
            ]}
          />
          <View
            style={[
              style.circle,
              (index === item && selecetd) ||
              (item.title === 'Match All' && !matchAll)
                ? style.circleBgActive
                : style.circleBg,
            ]}
          />
        </View>
        <Text style={style.title}>{item.title}</Text>
      </TouchableOpacity>
    );
  };

  const handleTags = (item: newBroadcast) => {
    if (selectedTags.includes(item.id)) {
      setSelectedTags(selectedTags.filter(i => i !== item.id));
    } else {
      setSelectedTags([...selectedTags, item.id]);
    }
  };
  const renderTagItem = (item: newBroadcast) => {
    return item.tagName ? (
      <Pressable
        onPress={() => {
          handleTags(item);
          selectedProfile(item);
        }}
        style={[
          style.tagButton,
          selectedTags.includes(item.id) ? style.bgDark : style.bgActive,
        ]}>
        <Text
          style={[
            style.tagName,
            selectedTags.includes(item.id) ? style.text : style.activeText,
          ]}>
          {item.tagName}
        </Text>
      </Pressable>
    ) : null;
  };
  const newArray: INewArray[] = [];
  const handleParams = () => {
    FilterParams?.forEach(item => {
      newArray.push({name: item, value: item});
    });
  };
  handleParams();
  const EmptyListMessage = () => {
    return (
      <Text style={style.emptyText}>Oops! We are sorry - No results found</Text>
    );
  };
  const handleClear = () => {
    setParamList('');
    setValue('');
    setInput('');
  };

  return (
    <>
      <View style={style.paramConatiner}>
        <View style={style.wrapper}>
          <FlatList
            contentContainerStyle={style.contentContainer}
            horizontal
            data={newBroadcastFilter}
            renderItem={item => renderItem(item.item)}
            keyExtractor={(item, key) => key.toString()}
          />
        </View>
        <View style={style.filter}>
          <Text style={style.param}>{t('broadcast:FILTER')}</Text>
          <TouchableOpacity onPress={handleModal} style={style.createParams}>
            <Add />
            <Text style={style.createText}>{t('broadcast:CREATE')}</Text>
          </TouchableOpacity>
          {activeFilter ? (
            <Button
              ButtonContainer={style.ButtonContainer}
              ButtonText={`Experience matches ${recipient.length}`}
              icon={<CancelIcon />}
              active={true}
              iconPress={() => {
                setActiveFilter(false);
              }}
            />
          ) : null}
        </View>
        <View style={style.tags}>
          <Text style={style.param}>{t('broadcast:FILTERBY')}</Text>
          <View style={style.tagContainer}>
            <FlatList
              nestedScrollEnabled
              contentContainerStyle={style.tagwrap}
              data={broadcastFilterTags}
              renderItem={item => renderTagItem(item.item)}
              keyExtractor={(item, key) => key.toString()}
              ListEmptyComponent={EmptyListMessage}
            />
          </View>
        </View>
        <ModalStructure
          onBackgroundPress={onBackground_Press}
          onBackground_Press={onBackground_Press}
          handleIsModalInvisible={handleIsModalInvisible}
          isVisible={isVisible}
          modalHeaderText={t('broadcast:CREATECONDITION')}>
          <View style={style.modal}>
            <DropDown
              placeholder={t('broadcast:SELECT_PARAMS')}
              open={params}
              value={paramList}
              items={newArray}
              schema={{
                label: 'name', // required
                value: 'value',
              }}
              setOpen={setparams}
              setValue={setParamList}
              onSelectItem={item => {
                selectPrams(item.value);
              }}
            />
          </View>

          <View style={style.modal}>
            <DropDown
              placeholder={t('broadcast:CONDITION')}
              open={open}
              value={value}
              items={broadcastMatchFilterParams}
              schema={{
                label: 'name', // required
                value: 'value',
              }}
              setOpen={setOpen}
              setValue={setValue}
              onSelectItem={item => {
                setMatchCondition(item.value);
              }}
            />
          </View>
          <View style={[style.modal, style.inputContainer]}>
            <InputField
              placeholder={t('broadcast:VALUE')}
              headerText={t('broadcast:VALUE')}
              value={input}
              onChangeText={(text: string) => {
                setInput(text);
              }}
            />
          </View>
          <View style={style.btn}>
            <Button
              ButtonContainer={style.modal}
              ButtonText={t('broadcast:BTNTITLE')}
              onPress={() => {
                handleValues(input);
                handleFilterParams(match);
                handleClear();
              }}
            />
          </View>
        </ModalStructure>
      </View>
    </>
  );
};

export default BroadcastFilter;

// template text read more 
export const ReadMoreText = (props: ReadMore) => {
  const style = useThemedStyles(BroadcastStyle);
  const [readMore, setReadMore] = useState(false);

  return (
    <>
      {!readMore ? (
        <Text style={[style.templateText,style.textContainer]}>
          {props.text.length > props.maxLength ? `${props.text.substring(0, props.maxLength)}...` : props.text}
          {props.text.length > props.maxLength && (
            <Text
            style={style.readmore}
              onPress={() => {
                setReadMore(true);
              }}
            >
              {' '}
              Read more...
            </Text>
          )}
        </Text>
      ) : (
        <ScrollView style={[style.textStyle]}>
          <Text style={[style.templateText,style.textContainer]}>{props.text}</Text>
          <Text
              style={style.readmore}
            onPress={() => {
              setReadMore(false);
            }}
          >
            {' '}
            Less...
          </Text>
        </ScrollView>
      )}
    </>
  );
};


