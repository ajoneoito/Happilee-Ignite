import DocumentPicker, {
    DocumentPickerResponse,
    DirectoryPickerResponse,
} from 'react-native-document-picker';
import { t } from "i18next";
import RNFetchBlob from 'react-native-blob-util';
import useTheme from "../utils/theming/useTheme";
import FileViewer from 'react-native-file-viewer';
import React, { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store/root.reducer";
import ReactNativeBlobUtil from 'react-native-blob-util';
import { Theme } from "../services/interface/themeInterface";
import useThemedStyles from "../utils/theming/useThemedStyles";
import { createThumbnail } from 'react-native-create-thumbnail';
import { ALERT_TYPE, Toast } from "../components/AlertComponent";
import { Alert, PermissionsAndroid, Platform } from "react-native";
import { CSV_S3_URL, DOCUMENT_PATH } from "../constants/folderPath";
import { templateStyles } from "../screens/templates/Template.style";
import { UPLOAD_BROADCAST_FILE } from "../redux/actions/broadcastList.action";


export interface PickedDocument {
    name: string;
    type: string;
    size: number;
    uri: string;

}
export const useTemplateParams = () => {

    const theme = useTheme() as Theme;
    const dispatch = useDispatch();
    const { num, key, data } = useRoute().params;
    const style = useThemedStyles(templateStyles);
    const [inputValues, setInputValues] = useState<{ [key: string]: string }>({});
    const [broadcastName, setBroadcastName] = useState('');
    const templete = useSelector((state: RootState) => state.templateListFilter);
    const [length, setLength] = useState(false);
    const [upload, setUpload] = useState<FormData>();
    const [inputData, setInputData] = useState([]);
    const [isVisible, setIsVisible] = useState(false);
    const [result, setResult] = useState<PickedDocument | DocumentPickerResponse>()
    const [imageUpload, setImageUpload] = React.useState<DocumentPickerResponse | DirectoryPickerResponse | null>(null);


    const [thumbnailUrl, setThumbnailUrl] = useState<string | null>();
    const uploadImageFile = useSelector(
        (state: RootState) => state.broadcastFileUpload,
    );
    let temp;
    // If the template format is text then concat header,template body  and footer  response.
    if (templete.header?.format === 'TEXT') {
        if (
            templete.header?.text &&
            templete?.templateBody?.text &&
            templete?.footer
        ) {
            temp = templete.header?.text
                ?.concat(templete?.templateBody?.text)
                .concat(templete?.footer);
        } else if (
            templete.header?.text &&
            templete?.templateBody?.text &&
            !templete?.footer
        ) {
            temp = templete.header?.text?.concat(templete?.templateBody?.text);
        } else if (
            templete.header?.text &&
            templete?.templateBody?.text &&
            templete?.footer
        ) {
            temp = (templete?.templateBody?.text).concat(templete?.footer);
        }
    } else {
        temp = templete?.templateBody?.text;
    }


    useEffect(() => {
        handleInputChange;
    }, [setInputValues]);
    // handling parameters  filed  values 
    const handleInputChange = (text: string, id: string, paramName: string) => {
        setInputValues(prevValues => ({
            ...prevValues,
            [id]: text,
        }));

        setInputData(prevData => ({
            ...prevData,
            [paramName]: text,
        }));
    };

    // replace all the parameter variable ({{item}}) with the entered inputData values.
    for (let item in inputData) {
        temp = temp?.replaceAll(
            `{{${item}}}`,
            `${inputData[item] || `{{${item}}}`}`,
        );
    }

    const updatedObject: { name?: string; value: string }[] = [];
    // updating params as array of objects
    const handleParams = () => {
        try {
            if (templete?.template_message_custom_params?.length) {
                for (
                    let i = 0;
                    i < templete?.template_message_custom_params?.length;
                    i++
                ) {
                    for (const values in inputValues) {
                        if (values === templete?.template_message_custom_params[i].id) {
                            updatedObject.push({
                                name: templete?.template_message_custom_params[i].paramName,
                                value: inputValues[values],
                            });
                        }
                    }
                }
            }
        } catch (error) {
            console.log(error);
        }
    };
    const handleValidate = () => {
        if (
            updatedObject.length === templete?.template_message_custom_params.length
        ) {
            setLength(true);
        }
        return length;
    };
    //  upload document with the required filetype
    const uploadDocument = async (fileType: string) => {
        handleParams();
        try {
            if (fileType === 'image') {
                const res = await DocumentPicker.pickSingle({
                    type: [DocumentPicker.types.images],
                });
                // check file size between 64MB and 64 KB
                if (res && res.size && res?.size <= 16777216 && res?.size >= 64000) {
                    setImageUpload(res);
                    let body = new FormData();
                    body.append('file', {
                        uri: res.uri.replace('file://', ''),
                        name: res.name,
                        type: res.type,
                    });

                    handleImage(body);
                } else {
                    Toast.show({
                        type: ALERT_TYPE.WARNING,
                        title: 'Media is limited to 16Kb and 16Mb',
                    });
                }
            } else {
                const res = await DocumentPicker.pickSingle({
                    type: [DocumentPicker.types.csv],
                });
                if (fileType === 'csv') {
                    if (
                        res.type === 'text/csv' ||
                        res.type === 'text/comma-separated-values'
                    ) {
                        setIsVisible(false);
                        setResult(res);
                    } else {
                        setIsVisible(true);
                    }

                    let body = new FormData();

                    body.append('contacts', {
                        uri: res.uri,
                        name: res.name,
                        type: 'text/csv',
                    });

                    if (updatedObject.length !== 0 && imageUpload?.uri) {
                        updatedObject.push({
                            name: 'url',
                            value: uploadImageFile?.s3_url,
                        });
                        body.append('template_params', JSON.stringify(updatedObject));
                    } else if (updatedObject.length !== 0 && !imageUpload?.uri) {
                        body.append('template_params', JSON.stringify(updatedObject));
                    } else if (updatedObject.length === 0 && imageUpload?.uri) {
                        temp = [{ name: 'url', value: uploadImageFile?.s3_url }];
                        body.append('template_params', JSON.stringify(temp));
                    }

                    setUpload(body);
                }
            }
        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
            } else {
                throw err;
            }
        }
    };
    // Generating thumbnail for the template video 
    async function generateThumbnail() {
        if (templete.header?.format === 'VIDEO') {
            try {
                const response = await createThumbnail({
                    url: templete.headerUrl,
                    timeStamp: 1000,
                });

                setThumbnailUrl(response.path);
            } catch (err) {
                console.error(err);
            }
        }
    }
    useEffect(() => {
        generateThumbnail();
    }, []);
    const uniqueParams = Object.values(
        templete?.template_message_custom_params?.reduce((unique: any, param: any) => {
            if (!unique[param.paramName]) {
                unique[param.paramName] = param;
            }

            return unique;
        }, {}),
    );
    //Broadcast upload image request with the selected image
    const handleImage = (body: FormData) => {
        dispatch({
            type: UPLOAD_BROADCAST_FILE,
            payload: body,
        });
    };
    // Cancel the selected image
    const handleImageDelete = () => {
        setImageUpload(null);
    };
    //Handling selected image to update
    const handleOnSelectItems = () => {
        if (updatedObject.length !== 0 && imageUpload?.uri) {
            updatedObject.push({
                name: 'url',
                value: uploadImageFile?.s3_url,
            });
            return updatedObject;
        }
    };
    // Open downloaded sample csv file 
    const selectOneFile = () => {
        FileViewer.open(
            '/storage/emulated/0/Android/Media/com.happilee/Happilee/Media/Happilee Documents/broadcast_sample.csv',
        )
            .then(() => {
            })
            .catch(_err => {
                const errorMessage = _err.toString();
                Toast.show({
                    type: ALERT_TYPE.WARNING,
                    title: t('authSaga:ALERT_SUCCESS_TITLE'),
                    textBody: _err.toString(),
                });
            });
    };

    // Download sample csv file 
    const downloadAttachment = () => {
        let downloadsPath: string = '';

        if (Platform.OS === 'android') {
            const deviceModel = Platform.constants.Model;

            // Check if the device is a Redmi device
            if (deviceModel && deviceModel.includes('Redmi')) {
                downloadsPath = '/storage/emulated/0/Download/';
            } else {
                downloadsPath = RNFetchBlob.fs.dirs.DownloadDir;
            }
        } else {
            downloadsPath = RNFetchBlob.fs.dirs.DocumentDir;
        }
        if (Platform.OS === 'ios') {
        } else {
            try {
                PermissionsAndroid.requestMultiple([
                    PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
                    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                ]).then(granted => {
                    if (
                        granted['android.permission.READ_EXTERNAL_STORAGE'] ===
                        PermissionsAndroid.RESULTS.GRANTED &&
                        granted['android.permission.WRITE_EXTERNAL_STORAGE'] ===
                        PermissionsAndroid.RESULTS.GRANTED
                    ) {
                        downloadDocument(downloadsPath);
                    } else {
                        Alert.alert('Allow storage_permission');
                    }
                });
            } catch (err) {
                //To handle permission related issue
                console.log('error', err);
            }
        }
    };
    // Download document to the given path
    const downloadDocument = (path: string) => {
        try {
            if (Platform.OS === 'android') {
                const { config } = ReactNativeBlobUtil;
                let options = {
                    fileCache: true,
                    addAndroidDownloads: {
                        useDownloadManager: true,
                        notification: false,
                        mime: 'text/csv',
                        path: `${path}/broadcast_sample.csv`,
                    },
                };
                const url = CSV_S3_URL;
                config(options)
                    .fetch('GET', url)
                    .then(() => {
                        let documentPath = DOCUMENT_PATH;
                        ReactNativeBlobUtil.fs
                            .exists(documentPath)
                            .then(response => {
                                if (response === false) {
                                    ReactNativeBlobUtil.fs
                                        .mkdir(documentPath)
                                        .then(() => {
                                            ReactNativeBlobUtil.fs.mv(
                                                `${path}/broadcast_sample.csv`,
                                                `${documentPath}/broadcast_sample.csv`,
                                            );
                                            sampleDownload()
                                        })

                                        .catch(error => {
                                            console.log(error, 'chat page');
                                        });
                                } else {
                                    ReactNativeBlobUtil.fs.mv(
                                        `${path}/broadcast_sample.csv`,
                                        `${documentPath}/broadcast_sample.csv`,
                                    );
                                    sampleDownload();
                                }
                            })
                            .catch(error => {
                                console.log(error, 'erros dir');
                            });
                    })
                    .catch((error: any) => {
                        console.error(error);
                    });
            }
        } catch (error) { }
    };
    // Alert to view downloaded  sample csv file
    const sampleDownload = () => {
        Alert.alert(
            'Download Success full',
            'Click to view sample csv file',
            [
                {
                    text: 'cancel',
                    onPress: () => {
                    },
                    style: 'cancel',
                },
                {
                    text: 'continue',
                    onPress: () => {
                        selectOneFile();
                    },
                },
            ],
        )
    }
    //Handling broadcast name in broadcast field
    const handleOnchange = (name: string) => {
        setBroadcastName(name)
    }
    // Cancel selected csv file
    const handleCancelUploadCsv = () => {
        setUpload(undefined);
    }
    return {
        num,
        data,
        key,
        temp,
        theme,
        style,
        result,
        upload,
        length,
        templete,
        inputData,
        isVisible,
        inputValues,
        imageUpload,
        thumbnailUrl,
        uniqueParams,
        broadcastName,
        uploadImageFile,
        updatedObject,
        dispatch,
        handleImage,
        handleInputChange,
        handleParams,
        selectOneFile,
        uploadDocument,
        handleValidate,
        handleOnchange,
        downloadDocument,
        handleImageDelete,
        downloadAttachment,
        handleOnSelectItems,
        handleCancelUploadCsv,

    }
}   