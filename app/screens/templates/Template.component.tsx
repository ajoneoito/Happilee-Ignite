import {Arrow} from '../../assets';
import React, { useState} from 'react';
import Animated from 'react-native-reanimated';
import {templateStyles} from './Template.style';
import useTheme from '../../utils/theming/useTheme';
import {toUpper} from '../../utils/functions/funtions';
import { Theme } from '../../services/interface/themeInterface';
import useThemedStyles from '../../utils/theming/useThemedStyles';
import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import {templateListInterface} from '../../services/interface/templateInterfaces';
interface Item {
  data: templateListInterface[];
  onClickItem: (item: templateListInterface | null) => void;
}
export const TemplateList = (props: Item) => {
  const theme = useTheme() as Theme;
  const {data, onClickItem} = props;
  const style = useThemedStyles(templateStyles);
  const [selecetd, setSelected] = useState<string | null | undefined>('');
  const [selectedItems, setSelectedItems] = useState<(string | undefined)[]>(
    [],
  );

  const [index, setIndex] = useState<string | undefined>('');
  const handleTemplate = (item: templateListInterface) => {
    setIndex(item.id);
    setSelected(selecetd === item.id ? null : item.id);
  };
  const renderItem = ({item}: {item: templateListInterface}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          setSelectedItems([item.id]);
          const isSelected = selectedItems.includes(item.id);
          handleTemplate(item);
          if (!isSelected) {
            onClickItem(item);
          } else {
            onClickItem(null);
            setSelectedItems([]);
          }
        }}
        style={style.contentContainer}>
        <View style={style.containerOne}>
          <View
            style={[
              style.radioButton,
              index === item.id && selecetd !== null
                ? {borderColor: theme.colors.TEXT_COLOR}
                : {
                    borderColor: theme.colors.ASH,
                  },
            ]}>
            <View
              style={[
                style.circle,
                index === item.id && selecetd
                  ? {backgroundColor: theme.colors.TEXT_COLOR, borderColor: theme.colors.TEXT_COLOR}
                  : {
                      backgroundColor: 'transparent',
                      borderColor: 'transparent',
                    },
              ]}
            />
          </View>

          <Text numberOfLines={1} style={style.templateBody}>
            {toUpper(item.elementName)}
          </Text>
          <Arrow style={style.arrow} />
        </View>
        {index === item.id && selecetd ? (
          <Animated.View style={style.templateBox}>
            <Text style={style.text}>{item?.templateBody?.text}</Text>
          </Animated.View>
        ) : null}
      </TouchableOpacity>
    );
  };
  return (
    <View>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, key) => key.toString()}
      />
    </View>
  );
};
