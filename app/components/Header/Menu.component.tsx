/* eslint-disable react-native/no-inline-styles */
/**
 * Menu.Component.tsx
 * @module Menu component
 * @desc Home screen Menu section
 * @author Sajmal NeoITO
 * @version 0.0.1
 * @access public
 * ...
 */
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from 'react-native-popup-menu';
import {C} from '../../constants';
import React, {useState} from 'react';
import {VerticalDots} from '../../assets';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../redux/store/root.reducer';
import {View, Text, Pressable, StyleSheet} from 'react-native';
import {setSelectAllRecipients} from '../../redux/slices/selectAllRecipients.slice';

const dgl = C.measures.dgl;
const MenuComponent = () => {
  const dispatch = useDispatch();
  const [opended, setOpened] = useState(false);
  const updateMenuState = (val: boolean) => {
    setOpened(val);
  };
  const activeTab = useSelector((state: RootState) => state.tab);
  const selectAll = useSelector(
    (state: RootState) => state.selectAllRecipients.select,
  );
  const selectAllId = useSelector(
    (state: RootState) => state.selectRecipientsId.ids,
  );
  return (
    <Menu
      onBackdropPress={() => {
        updateMenuState(false);
      }}
      opened={opended}>
      <MenuTrigger
        onPress={() => {
          updateMenuState(true);
        }}>
        <VerticalDots width={dgl * 0.03} height={dgl * 0.023} />
      </MenuTrigger>
      <MenuOptions optionsContainerStyle={styles.menu}>
        <MenuOption style={{zIndex: 10}}>
          <Pressable
            onPress={() => {
              setOpened(false);
            }}>
            <View style={styles.row}>
              {activeTab === 'recipients' ? (
                <Text
                  onPress={() => {
                    dispatch(
                      setSelectAllRecipients({
                        select: !selectAll,
                      }),
                    );
                  }}
                  style={styles.text}>
                  {selectAll
                    ? 'Unselect All'
                    : selectAllId[0]
                    ? 'Unselect All'
                    : 'Select All'}
                </Text>
              ) : (
                <Text style={styles.text}>In progress ...</Text>
              )}
            </View>
          </Pressable>
        </MenuOption>
      </MenuOptions>
    </Menu>
  );
};

const styles = StyleSheet.create({
  menu: {
    width: '40%',
    borderRadius: 6,
    marginTop: dgl * 0.03,
    marginLeft: -dgl * 0.01,
    paddingHorizontal: 10,
  },
  row: {
    flexDirection: 'row',
    marginVertical: 12,
    alignItems: 'center',
    width: '98%',
  },
  btn: {
    borderWidth: 1,
    borderColor: '#199CD9',
    alignSelf: 'flex-start',
    borderRadius: 20,
    padding: 5,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  btnText: {
    color: '#199CD9',
    fontSize: dgl * 0.014,
    fontFamily: C.font.Medium,
    marginLeft: 10,
  },
  projectName: {
    color: '#012040',
    fontSize: dgl * 0.018,
    fontFamily: C.font.SemiBold,
    marginLeft: 10,
    marginTop: 4,
  },
  text: {
    color: '#012040',
    fontSize: dgl * 0.016,
    fontFamily: C.font.Medium,
    marginLeft: 10,
    marginTop: 2,
  },
});

export default MenuComponent;
