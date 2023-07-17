/* eslint-disable react-native/no-inline-styles */

/**
 * ProjectSwitching.Screen.tsx
 * @module Project screen
 * @desc Project listing, and switching.
 * @author Sajmal NeoITO
 * @version 0.0.1
 * @access public
 * ...
 */
import {View, Text, TouchableOpacity, FlatList} from 'react-native';
import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getAllProjects} from '../../utils/database/realmHooks/useProjects';
import {projectStyle} from './Projects.style';
import useThemedStyles from '../../utils/theming/useThemedStyles';
import {SimpleDownArrow} from '../../assets';
import moment from 'moment';
import {t} from 'i18next';
import Header from '../../components/Header/Header.componenet';
import {ALERT_TYPE, Dialog} from '../../components/AlertComponent';
import {PROJECT_TOKEN_GENERATION_ACTION} from '../../redux/actions/project.action';
import {SPINNER_ACTION} from '../../redux/actions/spinner.action';
import useTheme from '../../utils/theming/useTheme';
import {useRoute} from '@react-navigation/native';
import {goBack, resetNavigation} from '../../navigation/useNavigationUtils';
import {RootState} from '../../redux/store/root.reducer';
import globalProject from '../../constants/globalProjects';
import {routeEnum} from '../../enums/route.enum';
import {setAuth} from '../../redux/slices/auth.slice';
import {log} from 'react-native-reanimated';
import {GET_GLOBAL_CHATLIST_ACTION} from '../../redux/actions/chatlist.action';

const ProjectSwitchingScreen = () => {
  const style = useThemedStyles(projectStyle);
  const theme = useTheme();
  const dispatch = useDispatch();
  const {projectID, ProjectName} = useRoute().params;
  const [selectedItem, setSelectedItem] = useState(projectID);
  const auth = useSelector((state: RootState) => state.auth);
  const [projects] = useState(getAllProjects());

  const setSelectedProject = (id: any, project_name: string) => {
    if (projectID === id && ProjectName === project_name) {
      goBack();
    } else {
      Dialog.show({
        button: t('template:CANCEL'),
        butonText: t('project:PROJECT_CONTINUE'),
        type: ALERT_TYPE.SUCCESS,
        title: t('project:PROJECT_ALERT_TITLE'),
        onPressButton: () => {
          dispatch({
            type: SPINNER_ACTION,
            payload: {
              spinning: true,
              title: 'Please wait...',
              body: 'Switching project.',
            },
          });
          if (
            auth.userRole === '2' &&
            id === 'all' &&
            project_name === 'All Projects'
          ) {
            dispatch(
              setAuth({
                ...auth,
                projectId: id,
                projectName: project_name,
              }),
            );
            // dispatch({
            //   type: GET_GLOBAL_CHATLIST_ACTION,
            //   // payload: chatListFilter,
            // });
            resetNavigation({
              index: 1,
              // navigate to project screen if user admin : future feature
              routes: [{name: routeEnum.LOGGEDSCREENS}],
            });
          } else {
            dispatch({
              type: PROJECT_TOKEN_GENERATION_ACTION,
              payload: {
                project_id: id,
                project_name: project_name,
              },
            });
          }
        },
      });
    }
  };

  const renderProjects = (item: ProjectInterface, index: number) => {
    return (
      <TouchableOpacity
        style={style.pressableView}
        onPress={() => {
          setSelectedItem(item.id);
          setSelectedProject(item.id, item.project_name);
        }}>
        <View style={style.mainRow}>
          <View style={style.rowView}>
            <View
              style={[
                style.radioOuterView,
                {
                  borderColor:
                    item.id === selectedItem
                      ? theme.colors.TEXT_COLOR
                      : theme.colors.GRAY_LIHGT,
                },
              ]}>
              <View
                style={[
                  style.radioInnerView,
                  {
                    backgroundColor:
                      item.id === selectedItem
                        ? theme.colors.TEXT_COLOR
                        : 'transparent',
                  },
                ]}
              />
            </View>
            <Text style={style.projectName}>
              {item.project_name === 'All Projects'
                ? 'All Chats'
                : item.project_name}
            </Text>
            <Text style={style.status}>{item.status}</Text>
          </View>
          <View style={{marginTop: 5}}>
            <SimpleDownArrow />
          </View>
        </View>
        {selectedItem === item.id && (
          <View style={style.descView}>
            <View style={[style.rowView, {marginTop: 15}]}>
              <Text style={style.subTextLabel}>{t('project:CREATED_ON')}</Text>
              <Text style={style.subTextValue}>
                : {moment(item.project_creation_time).format('DD MMMM YYYY')}
              </Text>
            </View>
            <View style={style.rowView}>
              <Text style={style.subTextLabel}>{t('project:PLAN')}</Text>
              <Text style={style.subTextValue}>: {item.package_name}</Text>
            </View>
            <View style={style.rowView}>
              <Text style={style.subTextLabel}>{t('project:CATEGORY')}</Text>
              <Text style={style.subTextValue}>: {item.category} </Text>
            </View>
          </View>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View style={style.container}>
      <Header title={t('project:PROJECTS')} arrow />
      <View>
        {auth.userRole === '2' ? (
          <View>{renderProjects(globalProject, -1)}</View>
        ) : null}
        <FlatList
          data={projects}
          renderItem={({item, index}) => renderProjects(item, index)}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </View>
  );
};

export default ProjectSwitchingScreen;
