/**
 * Dropdown.tsx
 * @module Dropdown picker component.
 * @desc Item picker from a list of array.
 * @author Saifali NeoITO
 * @version 0.0.1
 * @access public
 * @todo Need to add error hadler
 * ...
 */
import React from 'react';
import DropDownPicker from 'react-native-dropdown-picker';

import {StyleSheet, View, Text} from 'react-native';
import {DropDownPickerBaseProps} from './interface';
import useThemedStyles from '../../utils/theming/useThemedStyles';
import {C} from '../../constants';
import {DownArrow} from '../../assets';
const dgl = C.measures.dgl;
/**
 * Dropdown picker component.
 * @see https://hossein-zare.github.io/react-native-dropdown-picker-website/docs/usage
 * @param {DropDownPickerBaseProps} props Dropdown picker component props.
 */
const DropDown = (props: DropDownPickerBaseProps<any>) => {
  const style = useThemedStyles(styles);
  return (
    <View style={style.mainContainer}>
      {props.header ? (
        <Text style={[style.title, props.titleStyle]}>{props.header}</Text>
      ) : null}
      <DropDownPicker
        title={props.title}
        titleProps={style.title}
        open={props.open}
        multiple={props.multiple}
        value={props.value}
        items={props.items}
        schema={props.schema}
        setOpen={props.setOpen}
        setValue={props.setValue}
        onChangeSearchText={
          props?.multiple ? props.onChangeSearchText : () => {}
        }
        setItems={props?.multiple ? props?.setItems : null}
        disableLocalSearch={props?.multiple ? true : false} // required for remote search
        mode={props.multiple ? 'BADGE' : 'SIMPLE'}
        listMode="MODAL"
        placeholder={props.placeholder}
        closeAfterSelecting={true}
        placeholderStyle={style.placeholderStyle}
        style={style.dropdown}
        // listItemContainerStyle={style.dropcontainer}
        labelStyle={[style.label, props.label]}
        listItemLabelStyle={[style.label, props.label]}
        // dropDownContainerStyle={style.dropcontainer1}
        // searchContainerStyle={style.search}
        onChangeValue={props.onChangeValue}
        searchable={true}
        // autoScroll={true}
        onSelectItem={props.onSelectItem}
        onClose={props.onClose}
        searchPlaceholder={props.searchPlaceholder}
        // labelProps={style.selectedItemProp}
        // containerStyle={style.container}
        ArrowDownIconComponent={() => (
          <DownArrow width={dgl * 0.035} height={dgl * 0.0068} />
        )}
        // ArrowDownIconComponent={({style}) => <MyArrowDownIcon style={style} />}
      />
    </View>
  );
};

export default DropDown;

export const styles = (theme: any) =>
  StyleSheet.create({
    mainContainer: {width: '100%', marginBottom: dgl * 0.013},
    title: {
      color: theme.colors.TEXT_COLOR,
      fontFamily: C.font.SemiBold,
      fontSize: dgl * 0.012,
      paddingTop: dgl * 0.007,
    },
    placeholderStyle: {
      color: theme.colors.PRIMARY,
      fontFamily: C.font.SemiBold,
      fontSize: dgl * 0.012,
      paddingLeft:2,
    },
    dropdown: {
      backgroundColor: theme.colors.FIELD,
      borderWidth: 0,
      height: dgl * 0.065,
    },
    label: {
      color: theme.colors.PRIMARY,
      fontFamily: C.font.Regular,
      fontSize: dgl * 0.014,
      paddingLeft: dgl * 0.003,
    },
    search: {},
  });
