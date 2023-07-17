/**
 * LeadDetails.Screen.tsx
 * @module LeadDetails screen
 * @desc Screen for fb lead details
 * .
 * @author Sujitha NeoITO
 * @version 0.0.1
 * @access public
 * ...
 */
import {
  Delete,
  Action,
  AddIcon,
  DateIcon,
  SmsAction,
  CancelIcon,
  CallAction,
  FormAction,
  EmailAction,
  WhiteTickIcon,
  WhatsappAction,
} from '../../assets';
import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Pressable,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import moment, { isDate } from 'moment';
import { t } from 'i18next';
import Animated, {
  FadeInDown,
  FadeOutDown,
} from 'react-native-reanimated';
import { C } from '../../constants';
import Modal from 'react-native-modal';
import { StatusButton, Leadsinfo } from './lead.component';
import { leadDetailsNav } from '../../constants/filterOptions';
import Header from '../../components/Header/Header.componenet';
import { useFbLeadDetails } from '../../hooks/useFbLeadDetails';
import { formatDate, toUpper } from '../../utils/functions/funtions';
import InputField from '../../components/InputField/InputField.component';
import DropDown from '../../components/DropdownPicker/drodpDown.component';
import { getDateString, getTimeString } from '../../utils/functions/funtions';
import RoundButton from '../../components/RoundButton/RoundButton.component';
import DatePicker from '../../components/DateComponent/DatePicker.component';
import RNDateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { ALERT_TYPE, Toast } from '../../components/AlertComponent';

const dgl = C.measures.dgl;


interface items {
  key: string;
  title: string;
}

interface leadHistory {
  created_at: string;
  status: string;
}

const LeadDetails = () => {
  const {
    data,
    anim,
    form,
    open,
    date,
    value,
    notes,
    style,
    theme,
    status,
    params,
    active,
    mydate,
    history,
    visible,
    mydates,
    details,
    noteList,
    followUp,
    calandar,
    dataType,
    isVisible,
    leadTypes,
    paramList,
    fieldValue,
    displaymode,
    inputValues,
    selectedDate,
    leadTypeList,
    displaymodes,
    dateFollowUp,
    leadTypeItem,
    isDisplayDate,
    isTextVisible,
    leadTypeValue,
    additionalInfo,
    isDisplayDates,
    handleDate,
    handleOpen,
    leadAction,
    handleModal,
    addNewField,
    handleNotes,
    handleDelete,
    onClickField,
    addNoteField,
    onClickStatus,
    handleChanges,
    onClickButton,
    handleSetDate,
    switchScreens,
    startAnimation,
    handleFollowUP,
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
    displayDatepickers,
    changeSelectedDates,
    onClickCancel,
   


  } = useFbLeadDetails();








  const renderItem = (item: items) => {
    return (
      <TouchableOpacity
        onPress={() => switchScreens(item.key)}
        style={[
          style.detailsNavTab,
          {
            borderBottomColor:
              item.key === active
                ? theme.colors.BACKGROUND
                : theme.colors.TEXT_COLOR,
          },
        ]}>
        <Text
          style={[
            style.navTabHeader,
            style.detailsTitle,
            {
              opacity: item.key === active ? 1 : 0.4,
            },
          ]}>
          {item.title}
        </Text>
      </TouchableOpacity>
    );
  };

  interface Props {
    handleModal?: () => void;
    created_at: string;
    status: string;
  }
  const HistoryDetails = (props: Props) => {
    return (
      <TouchableOpacity onPress={props.handleModal} style={style.history}>
        <DateIcon />
        <Text style={style.created_at}>
          {' '}
          {getDateString(props.created_at)}
        </Text>
        <View style={style.buttonContainer}>
          <StatusButton statusLabel={props.status} />
        </View>
      </TouchableOpacity>
    );
  };
  interface Action {
    handleAction?: () => void;
    svg?: any;
  }
  const LeadAction = (props: Action) => {
    return (
      <TouchableOpacity style={style.roundBotton} onPress={props.handleAction}>
        <View style={style.svgStyle}>{props.svg}</View>
      </TouchableOpacity>
    );
  };
  const renderLeadHistory = (item: leadHistory) => {
    return (
      <HistoryDetails
        status={item?.status}
        created_at={item.created_at}
        handleModal={() => handleModal(item)}
      />
    );
  };

  try {
    return (
      <>
        <Header
          arrow
          title={toUpper(data.name)}
          statusLabel={toUpper(data?.status_name)}
        />
        <View style={style.Detailscontainer}>
          <View style={style.headerSection}>
            <FlatList
              numColumns={2}
              contentContainerStyle={style.searchDetailsNav}
              data={leadDetailsNav}
              keyExtractor={index => index.toString()}
              renderItem={item => renderItem(item.item)}
            />
          </View>
          <ScrollView style={style.historyContentContainer}>
            {active === 'lead_details' ? (
              <Leadsinfo
                additionalInfo={data?.data?.additionalInfo}
                basicInfo={data?.data?.basicInfo}
                notes={data?.data?.notes}
              />
            ) : (
              <View style={style.historyContainer}>
                <FlatList
                  data={history}
                  renderItem={item => renderLeadHistory(item.item)}
                />
              </View>
            )}
          </ScrollView>

          {anim ? (
            <Animated.View
              style={style.animated}
              entering={FadeInDown}
              exiting={FadeOutDown}>
              <LeadAction
                handleAction={() => {
                  leadAction('');
                }}
                svg={<FormAction />}
              />
              <LeadAction
                handleAction={() => {
                  leadAction(
                    'whatsapp',
                    // `whatsapp://send?text=hello&phone=${data.data.additionalInfo['Whatsapp Number'].value}`,
                  );
                }}
                svg={<WhatsappAction />}
              />
              <LeadAction
                handleAction={() => {
                  leadAction(`mailto:${data.data.basicInfo.email}`);
                }}
                svg={<EmailAction />}
              />
              <LeadAction
                handleAction={() => {
                  if(data.data.basicInfo.phone_number || ("mobile" in data?.data?.additionalInfo))
                  {  data.data.basicInfo.phone_number ?
                  leadAction(`tel:${data.data.basicInfo.phone_number}`) : leadAction(`tel:${data?.data?.additionalInfo["mobile"]["value"]}`) 
                 }else{
                  Toast.show({
                    type: ALERT_TYPE.WARNING,
                    title: 'Please check Phone number is given or not',
                });
                 }
                }}
                svg={<CallAction />}
              />
              <LeadAction
                handleAction={() => {

                  if(data.data.basicInfo.phone_number || ("mobile" in data?.data?.additionalInfo))
                  {  data.data.basicInfo.phone_number ?
                  leadAction(
                    `sms:${data.data.basicInfo.phone_number}?body=Hi ${data.data.basicInfo.name}`,
                  ):  leadAction(
                    `sms:${data?.data?.additionalInfo["mobile"]["value"]}?body=Hi ${data.data.basicInfo.name}`,
                  )
                  }
                }}
                svg={<SmsAction />}
              />
            </Animated.View>
          ) : null}
          {anim ? (
            <RoundButton
              container={style.actionConatiner}
              onPress={startAnimation}
              child={<CancelIcon width={dgl * 0.019} height={dgl * 0.019} />}
              backgroundColor={theme.colors.TEXT_COLOR}
            />
          ) : (
            <RoundButton
              container={style.actionConatiner}
              onPress={startAnimation}
              child={<Action />}
              backgroundColor={theme.colors.TEXT_COLOR}
            />
          )}
          <Modal
            style={style.modalStyle}
            animationInTiming={1000}
            animationOutTiming={1000}
            isVisible={isVisible}
            onBackButtonPress={onBackground_Press}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              style={style.modalContainer}>
              <View style={style.modalHeader}>
                <Text style={style.madalHeaderText}>
                  {form ? 'Add details' : 'History Details'}
                </Text>
                <CancelIcon
                  onPress={onBackground_Press}
                  style={style.cancel}
                  stroke={'#D1D5DA'}
                  hitSlop={{ top: 15, bottom: 15, left: 30, right: 30 }}
                />
              </View>
              <View style={style.singleLine} />
              {form ? (
                <View style={style.form}>
                  <Text style={style.basicInfo}>Basic info</Text>
                  {Object.keys(inputValues)
                    .filter(key => key !== 'status')
                    .map((key: string) => {
                      return (
                        <View style={[key === 'phone_number' ? style.phone : {}]}>
                          {key === 'phone_number' ? (
                            <View style={style.dialContainer}>
                              <DropDown
                                title={t('loginScreen:COUNTRY')}
                                open={open}
                                value={value}
                                items={C.flags}
                                schema={{
                                  label: open ? 'name' : 'label', // required
                                  value: 'code',
                                }}
                                setOpen={handleOpen}
                                setValue={handleFlagValues}
                                onSelectItem={(item: any) => {
                                  handleonSelectFlag(item)

                                }}
                              />
                            </View>
                          ) : null}
                          <View
                            style={[
                              style.paramSub,
                              key === 'phone_number'
                                ? { width: '63%' }
                                : { width: '100%' },
                            ]}>
                            <InputField
                              headerText={toUpper(key)}
                              key={key}
                              placeholder={toUpper(key)}
                              value={inputValues[key]}
                              onChangeText={(text: string) =>
                                handleInputChange(text, key)
                              }
                            />
                          </View>
                        </View>
                      );
                    })}
                  <View style={style.params}>
                    <DropDown
                      title={'Lead status'}
                      placeholder={data.data.basicInfo.status}
                      open={params}
                      value={paramList}
                      items={status.dynamic_statuses}
                      schema={{
                        label: 'label',
                        value: 'value',
                      }}
                      setOpen={handleOpenParams}
                      setValue={handleSetParamList}

                      onSelectItem={(item: any) => {
                        onClickStatus(item);
                      }}
                    />
                  </View>
                  <InputField
                    value={dateFollowUp ? dateFollowUp : calandar}
                    headerText={'Next Follow Up Date'}
                    placeholder={'Select Date'}
                    focus={(item) => (item ? handleFollowUP() : null)}
                    svg={
                      <DateIcon
                        onPress={() => {
                          handleFollowUP();
                        }}
                        style={style.followUp}
                      />
                    }
                    edit={true}
                    onChangeText={() => handleFollowUP()}
                  />
                  <Text style={[style.basicInfo, style.addInfo]}>
                    Additional Info
                  </Text>
                  {Object.keys(additionalInfo)
                    .filter(keys => keys !== undefined)
                    .map((key) => {
                      return (

                        <View>
                          {key !== undefined && (

                            <View
                              style={[
                                style.paramSub,
                                style.additionalInfoContainer,
                              ]}>
                              <View style={style.inputStyle}>
                                <InputField
                                  headerText={toUpper(key)}
                                  inputStyle={style.InputField}
                                  key={key}
                                  placeholder={toUpper(key)}
                                  svg={
                                    <DateIcon
                                      onPress={() => {
                                        displayDatepickers()
                                        handleSetDate(key)
                                      }}
                                      style={style.DateIcon}
                                    />
                                  }
                                  edit={
                                    key.startsWith('Date Of Birth') ? true : false
                                  }
                                  value={
                                    key.startsWith('Date Of Birth')
                                      ? getDateString(additionalInfo[key].value)
                                      : additionalInfo[key].value ?? ''
                                  }
                                  onChangeText={(text: string) => {
                                    if (key.startsWith('Date Of Birth')) {
                                      displayDatepickers()
                                      handleSetDate(key)

                                    } else {
                                      handleAdditionalInfo(text, key);
                                    }
                                  }}
                                />
                              </View>
                              <Delete
                                onPress={() => {
                                  handleDelete(key);
                                }}
                                style={style.delete}
                              />
                            </View>
                          )}
                        </View>
                      );
                    })}
                  {visible ? (
                    <View style={style.addField}>
                      <DropDown
                        title={'Field type'}
                        placeholder={'Select'}
                        open={leadTypeList}
                        value={leadTypeValue}
                        items={leadTypes}
                        schema={{
                          label: 'field_name', // required
                          value: 'field_type',
                        }}
                        setOpen={handleLeadTypeList}
                        setValue={handleLeadTypeValue}
                        onSelectItem={(item: any) => {
                          handleOnClickFieldItems(item)

                        }}
                      />
                      <View style={style.field}>
                        <View style={style.fieldConatiner}>
                          <View style={style.inputField}>
                            <InputField
                              svg={
                                leadTypeItem?.field_type === 'calender' ? (
                                  <DateIcon
                                    onPress={() => {
                                      displayDatepickers()

                                    }}
                                    style={style.followUp}
                                  />
                                ) : (
                                  ''
                                )
                              }
                              edit={true}
                              keyboardType={dataType}
                              active={true}
                              placeholder={'Value'}
                              value={
                                leadTypeItem?.field_type === 'calender'
                                  ? selectedDate
                                  : fieldValue
                              }
                              onChangeText={(text: string) => {
                                if (leadTypeItem?.field_type === 'calender') {
                                  displayDatepickers()

                                }
                                handleFieldValue(text)
                              }}
                            />
                          </View>
                        </View>
                        <RoundButton
                          container={style.RoundBtnConatiner}
                          backgroundColor={theme.colors.TEXT_COLOR}
                          onPress={() => {
                            if ((leadTypeItem?.field_type != undefined && fieldValue) || selectedDate) {

                              onClickField();
                            }
                          }}
                          child={
                            <WhiteTickIcon
                              width={dgl * 0.024}
                              height={dgl * 0.024}
                            />
                          }
                        />
                      </View>
                    </View>
                  ) : null}
                  <Pressable
                    style={style.addButtonView}
                    onPress={() => {
                      addNewField();
                    }}>
                    <AddIcon />
                    <Text style={[style.heading, style.addheading]}>
                      ADD NEW FIELD
                    </Text>
                  </Pressable>
                  <Text style={style.basicInfo}>Notes</Text>
                  {noteList.map((item, index) => {
                    return (
                      <View
                        style={[style.paramSub, style.additionalInfoContainer]}>
                        <View style={[style.inputContainer, style.inputStyle]}>
                          <TextInput
                            key={index}
                            value={item?.text}
                            style={style.input}
                            multiline={true}
                            maxLength={256}
                            onChangeText={(text: string) => {
                              handleInputNoteChange(index, text);
                            }}
                          />
                          <View style={style.timeZone}>
                            <Text style={style.date}>
                              {getDateString(item.updated_at)}
                            </Text>
                            <View style={style.dateItem}>
                              <Text style={style.dot}>{'\u2B24'}</Text>
                            </View>
                            <Text style={style.date}>
                              {getTimeString(item.updated_at)}
                            </Text>
                          </View>
                        </View>
                        <Delete
                          onPress={() => {
                            handleDeleteNote(item);
                          }}
                          style={style.delete}
                        />
                      </View>
                    );
                  })}
                  {isTextVisible ? (
                    <View style={style.addField}>
                      <View>
                        <View style={[style.field]}>
                          <View style={style.inputContainer}>
                            <TextInput
                              style={style.input}
                              multiline={true}
                              maxLength={256}
                              placeholderTextColor={theme?.colors.PRIMARY}
                              placeholder={'Note text'}
                              value={notes}
                              onChangeText={(text: string) => {
                                handleTextNotes(text)

                              }}
                            />
                          </View>
                          <RoundButton
                            container={style.RoundBtnConatiner}
                            backgroundColor={theme.colors.TEXT_COLOR}
                            onPress={() => {
                              handleNotes();
                            }}
                            child={
                              <WhiteTickIcon
                                width={dgl * 0.024}
                                height={dgl * 0.024}
                              />
                            }
                          />
                        </View>
                      </View>
                    </View>
                  ) : null}

                  <Pressable
                    style={style.addButtonView}
                    onPress={() => {
                      addNoteField();
                    }}>
                    <AddIcon />
                    <Text style={[style.heading, style.addheading]}>
                      ADD NEW NOTE
                    </Text>
                  </Pressable>
                  <View style={style.buttonConatiner}>
                    <Pressable
                      style={style.button1}
                      onPress={() => {
                        onClickButton()

                      }}>
                      <Text style={style.btnText1}>CANCEL</Text>
                    </Pressable>
                    <Pressable
                      onPress={() => {
                        handleChanges();
                      }}
                      style={style.button2}>
                      <Text style={style.btnText2}>SAVE CHANGES</Text>
                    </Pressable>
                  </View>
                  {isDisplayDate && displaymode == 'time' && (
                    <RNDateTimePicker
                      negativeButton={{ label: 'Cancel', textColor: '#199CD9' }}
                      positiveButton={{ label: 'OK', textColor: '#199CD9' }}
                      textColor="white"
                      value={mydate}
                      mode={displaymode}
                      display="default"
                      onChange={(event: DateTimePickerEvent, select: Date | undefined) => {
                        changeSelectedDate(event, select);
                      }}
                    />
                  )}


                  {isDisplayDates && (
                    <DateTimePicker
                      testID="dateTimePicker"
                      value={mydates}
                      mode={displaymodes}
                      is24Hour={true}
                      display="default"
                      onChange={changeSelectedDates}
                      maximumDate={new Date()}
                    />
                  )}
                  <DatePicker
                    minDate={formatDate(new Date())
                      .split('-')
                      .reverse()
                      .join('-')}
                    handleDate={item =>
                      handleDate(item)

                    }
                    handleSubmit={() => {
                      onClickCancel();
                      displayTimepicker();
                    }}
                    isVisible={followUp}
                    handleCancel={() => {
                      onClickCancel();
                    }}
                  />
                </View>
              ) : (
                // History details
                <>
                  <View style={style.modalContent}>
                    <DateIcon />
                    <Text style={style.created_at}>
                      {' '}
                      {moment.utc(details?.created_at).format('D MMMM YYYY')}
                    </Text>
                    <View style={style.buttonContainer}>
                      <StatusButton statusLabel={details?.status} />
                    </View>
                  </View>

                  <View style={style.LeadsinfoCont}>
                    <Leadsinfo
                      additionalInfo={details?.history_info?.additionalInfo}
                      basicInfo={details?.history_info?.basicInfo}
                      notes={details?.history_info?.notes}
                    />
                  </View>
                </>
              )}
            </ScrollView>
          </Modal>
        </View>
      </>
    );
  } catch (error) {

  }
};

export default LeadDetails;
