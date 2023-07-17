import {C} from '../../constants';
import React, {useState} from 'react';
import {Left, Right} from '../../assets';
import {Calendar} from 'react-native-calendars';
import useTheme from '../../utils/theming/useTheme';
import ModalStructure from '../Modal/Modal.component';
import {formatDate} from '../../utils/functions/funtions';
import {StyleSheet, Text, View, ViewStyle} from 'react-native';
import useThemedStyles from '../../utils/theming/useThemedStyles';

interface Props {
  label?: string;
  on_press?: () => void;
  title?: string;
  modalHeaderStyle?: ViewStyle;
  modalHeader?: ViewStyle;
  modalHeaderText?: string;
  reset?: () => void;
  submit?: any;
  required?: string;
  placeholder?: string;
  minDate?: any;
  maxDate?: any;
  isVisible?: boolean;
  handleSubmit?: () => void;
  handleDate: (item:string ) => void;
  handleCancel?: () => void;
}
const dgl = C.measures.dgl;
const DatePicker = (props: Props) => {
  const style = useThemedStyles(styles);
  const theme = useTheme();
  const [selectDate, setSelectDate] = useState(
    formatDate(new Date()).split('-').reverse().join('-'),
  );
  const [days, setDays] = useState({});


  return (
    <ModalStructure
      modalHeader={{paddingBottom: 0}}
      isVisible={props.isVisible}>
      <View style={style.calandarStyle}>
        <Calendar
          current={formatDate(new Date()).split('-').reverse().join('-')}
          minDate={props?.minDate}
          maxDate={props?.maxDate}
          hideDayNames={true}
          firstDay={1}
          hideExtraDays={true}
          style={style.calandar}
          onDayPress={day => {
            setDays(day);
            setSelectDate(day.dateString);
            props.handleDate(day.dateString);
          }}
          renderArrow={direction => {
            if (direction == 'left') {
              return <Left />;
            }
            if (direction == 'right') {
              return <Right />;
            }
          }}
          markingType={'custom'}
          markedDates={{
            [selectDate]: {
              selected: true,
              selectedColor: theme.colors.TEXT_COLOR,
              selectedTextColor: '#ffffff',
              disableTouchEvent: true,
            },
          }}
          theme={{
            backgroundColor: '#ffffff',
            calendarBackground: '#ffffff',
            selectedDayTextColor: '#101010',
            selectedDayBackgroundColor: '#ffffff',
            textDayFontFamily: C.font.Medium,
            textDayFontSize: 18,
            textDayFontWeight: '600',
            dayTextColor: '#101010',
            monthTextColor: '#404040',
            textMonthFontFamily: C.font.Bold,
            textMonthFontSize: 20,
            textDisabledColor: '#808080',
          }}
        />
      </View>
      <View style={style.cancel}>
        <Text onPress={props.handleCancel} style={style.textStyle}>
          CANCEL
        </Text>
        <Text onPress={props.handleSubmit} style={style.textStyle}>
          OK
        </Text>
      </View>
    </ModalStructure>
  );
};

export default DatePicker;

const styles = (theme: any) =>
  StyleSheet.create({
    calandarStyle: {},
    calandar: {
      width: '100%',
      justifyContent: 'center',
      alignContent: 'center',
      alignSelf: 'center',
      paddingBottom: 10,
    },
    modalStyle: {
      justifyContent: 'flex-end',
      maxHeight: '100%',
      minHeight: '50%',
      margin: 0,
    },
    textStyle: {
      color: theme.colors.TEXT_COLOR,
      fontSize: dgl * 0.019,
      fontFamily: C.font.SemiBold,
      marginHorizontal: 5,
    },
    cancel: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      padding: 10,
    },
  });
