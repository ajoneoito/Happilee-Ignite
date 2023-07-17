/**
 * TemplateParams.Screen.tsx
 * @module Template Prams screen
 * @desc Screen for sending template  params.
 * @author Sujitha NeoITO
 * @version 0.0.1
 * @access public
 * ...
 */
import {
  Text,
  View,
  Image,
  Pressable,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import React from 'react';
import { t } from 'i18next';
import { C } from '../../constants';
import {
  UPLOAD_CSV_ACTION,
  BROADCAST_LIST_ACTION,
  BROADCAST_SEND_MESSAGE_ACTION,
} from '../../redux/actions/broadcastList.action';
import VideoPlayer from 'react-native-video-player';
import { API_LIMIT } from '../../constants/pagination';
import { toUpper } from '../../utils/functions/funtions';
import Button from '../../components/Button/Button.component';
import Header from '../../components/Header/Header.componenet';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useTemplateParams } from '../../hooks/useTemplateParams';
import InputField from '../../components/InputField/InputField.component';
import { ALERT_TYPE, Dialog, Toast } from '../../components/AlertComponent';
import { START_NEW_CHAT_ACTION } from '../../redux/actions/templates.action';
import RoundButton from '../../components/RoundButton/RoundButton.component';
import { Cancel, Cross, DocumentIcon, Upload, WhiteTickIcon } from '../../assets';

const dgl = C.measures.dgl;

export default function TemplateParams() {
  const {
    key,
    num,
    temp,
    theme,
    style,
    result,
    upload,
    templete,
    isVisible,
    inputValues,
    imageUpload,
    uniqueParams,
    thumbnailUrl,
    broadcastName,
    updatedObject,
    uploadImageFile,
    dispatch,
    handleParams,
    uploadDocument,
    handleValidate,
    handleOnchange,
    handleInputChange,
    handleImageDelete,
    downloadAttachment,
    handleOnSelectItems,
    handleCancelUploadCsv,
  }= useTemplateParams();


  try {

    return (
      <>
        <Header arrow title={toUpper(templete?.elementName)} />
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={style.templatePramsContainer}>
          <View style={style.wrapper}>
            <View style={style.textBox}>
              <Text style={style.templateText}>{temp}</Text>
              {templete.header?.format === 'IMAGE' ? (
                <>
                  {imageUpload?.uri ? (
                    <View style={style.imageUpload}>
                      <TouchableOpacity
                        onPress={() => {
                          handleImageDelete();
                        }}
                        hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}>
                        <Cancel
                          stroke="white"
                          width={dgl * 0.02}
                          height={dgl * 0.02}
                          style={style.cancel}
                        />
                      </TouchableOpacity>
                      <Image
                        resizeMode={'contain'}
                        style={[style.image]}
                        source={{ uri: imageUpload?.uri }}
                      />
                    </View>
                  ) : (
                    <Image
                      style={style.image}
                      source={{ uri: templete?.headerUrl }}
                    />
                  )}
                  <Button
                    TextStyle={style.textStyle}
                    ButtonContainer={style.ButtonContainer}
                    ButtonText={'Upload image'}
                    onPress={() => {
                      uploadDocument('image');
                    }}
                  />
                </>
              ) : null}
              {templete.header?.format === 'VIDEO' ? (
                <>
                  {thumbnailUrl ? (
                    <>
                      <ActivityIndicator
                        style={style.activityIndicator}
                        size="large"
                        color={theme.colors.TEXT_COLOR}
                      />
                      <VideoPlayer
                        video={{
                          uri: templete.headerUrl,
                        }}
                        pauseOnPress
                        endWithThumbnail
                        autoplay={false}
                        defaultMuted={true}
                        disableFullscreen={false}
                        thumbnail={{ uri: thumbnailUrl }}
                        style={style.vedio}
                        resizeMode="contain"
                        fullscreen={true}
                      />
                    </>
                  ) : (
                    <ActivityIndicator
                      style={style.indicator}
                      size="small"
                      color={theme.colors.TEXT_COLOR}
                    />
                  )}
                </>
              ) : null}
            </View>
            {key === 'broadcast' || key === 'upload' ? (
              <View style={style.broadcastName}>
                <InputField
                  active={true}
                  edit={true}
                  placeholder={'Broadcast Name'}
                  headerText={'Broadcast Name'}
                  value={broadcastName}
                  onChangeText={(name: string) => handleOnchange(name)}
                />
              </View>
            ) : null}

            {templete.template_message_custom_params[0]?.paramName ? (
              <View style={style.paramSub}>
                <Text style={style.paramHeader}>Parameters</Text>
              </View>
            ) : null}

            {uniqueParams?.map((item: any) => {
              return (
                <View style={style.paramSub}>
                  <InputField
                    key={item.id}
                    active={true}
                    edit={true}
                    placeholder={item.paramName}
                    headerText={item.paramName}
                    value={inputValues[item.id]}
                    onChangeText={(text: string) =>
                      handleInputChange(text, item.id, item.paramName)
                    }
                  />
                </View>
              );
            })}
            {key === 'upload' ? (
              <>
                <View>
                  {!upload || result === undefined || isVisible ? (
                    <View>
                      <View style={style.upload}>
                        <TouchableOpacity
                          onPress={() => {
                            uploadDocument('csv');
                          }}
                          style={style.docCont}>
                          <Upload width={dgl * 0.024} height={dgl * 0.024} />
                          <Text style={style.uploadText}>
                            Select files to upload
                          </Text>
                        </TouchableOpacity>
                        <View>
                          <Text style={style.format}>Supported format: CSV</Text>
                        </View>
                      </View>
                      {isVisible && (
                        <Text style={style.formatcsv}>
                          Please choose a valid format file
                        </Text>
                      )}
                    </View>
                  ) : (
                    <View style={style.doc}>
                      {result?.name && !isVisible ? (
                        <>
                          <DocumentIcon />
                          <Text style={style.docName}>{result?.name}</Text>
                          <Pressable
                            onPress={() => {
                              handleCancelUploadCsv();

                            }}
                            style={style.uploadContainer}>
                            <Cross fill="black" stroke="black" />
                          </Pressable>
                        </>
                      ) : null}
                    </View>
                  )}
                  <View style={style.download}>
                    <Text style={style.sampleCsv}>
                      You can download the sample format of csv :
                    </Text>
                    <Button
                      TextStyle={style.textStyle}
                      ButtonContainer={style.downloadButton}
                      ButtonText={'Download'}
                      onPress={() => {
                        downloadAttachment();
                      }}
                    />


                  </View>

                </View>
              </>
            ) : null}
          </View>
        </ScrollView>
        <RoundButton
          onPress={() => {
            handleParams();
            handleValidate();
            Dialog.show({
              button: t('template:CANCEL'),
              butonText: t('template:SEND_TEMPLATE'),
              type: ALERT_TYPE.SUCCESS,
              title: t('template:TITLE'),
              onPressButton: () => {
                try {
                  if (
                    key === 'broadcast' &&
                    updatedObject.length === uniqueParams.length &&
                    broadcastName
                  ) {
                    handleOnSelectItems();
                    let payload = {
                      parameter_filter: [],
                      tag_filter: [''],
                      match_condition: 'all',
                      recipients: num,
                      templateId: templete?.id,
                      name: broadcastName,
                      template_params:
                        updatedObject.length !== 0 && imageUpload?.uri
                          ? updatedObject
                          : updatedObject.length !== 0 && !imageUpload?.uri
                            ? updatedObject
                            : updatedObject.length === 0 && imageUpload?.uri
                              ? [{ name: 'url', value: uploadImageFile?.s3_url }]
                              : [],
                    };

                    dispatch({
                      type: BROADCAST_SEND_MESSAGE_ACTION,
                      payload: payload,
                    });
                    dispatch({
                      type: BROADCAST_LIST_ACTION,
                      payload: {
                        limit: API_LIMIT,
                        pageNumber: 1,
                        sort: 'createdAt',
                        order: 'DESC',
                      },
                    });
                  } else if (
                    key === 'upload' &&
                    updatedObject.length >= uniqueParams.length &&
                    broadcastName &&
                    upload
                  ) {
                    dispatch({
                      type: UPLOAD_CSV_ACTION,
                      payload: {
                        params: {
                          template_id: templete?.id,
                          name: broadcastName,
                        },
                        file: upload,
                      },
                    });
                  } else if (key === 'chat' || !key) {
                    handleOnSelectItems();
                    let payload = {
                      candidate_details: {
                        phone_number: num,
                        // country_code: '91',
                      },
                      template_message_id: templete?.id,
                      template_params:
                        updatedObject.length !== 0 && imageUpload?.uri
                          ? updatedObject
                          : updatedObject.length !== 0 && !imageUpload?.uri
                            ? updatedObject
                            : updatedObject.length === 0 && imageUpload?.uri
                              ? [{ name: 'url', value: uploadImageFile?.s3_url }]
                              : [],
                    };
                    dispatch({ type: START_NEW_CHAT_ACTION, payload: payload });
                  } else {
                    Toast.show({
                      type: ALERT_TYPE.WARNING,
                      title: 'Please fill all given fields',
                    });
                  }
                } catch (error) {
                  console.log(error);
                }
              },
            });
          }}
          child={<WhiteTickIcon />}
        />
      </>
    );
  } catch (error) {

  }
}



