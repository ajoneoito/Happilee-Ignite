/* eslint-disable react-native/no-inline-styles */
/**
 * InitialProject.Screen.tsx
 * @module Project screen
 * @desc Project listing, and switching.
 * @author Saifali NeoITO
 * @version 0.0.1
 * @access public
 * ...
 */
import React, {useState} from 'react';
import {projectStyle} from './Projects.style';
import {SimpleDownArrow} from '../../assets';
import {useTranslation} from 'react-i18next';
import {useDispatch, useSelector} from 'react-redux';
import {Text, TouchableOpacity, View} from 'react-native';
import useThemedStyles from '../../utils/theming/useThemedStyles';
import {getAllProjects} from '../../utils/database/realmHooks/useProjects';
import {FlatList} from 'react-native-gesture-handler';
import {SPINNER_ACTION} from '../../redux/actions/spinner.action';
import {PROJECT_TOKEN_GENERATION_ACTION} from '../../redux/actions/project.action';
import Animated from 'react-native-reanimated';
import moment from 'moment';
import Header from '../../components/Header/Header.componenet';
import {RootState} from '../../redux/store/root.reducer';
import globalProject from '../../constants/globalProjects';
import {resetNavigation} from '../../navigation/useNavigationUtils';
import {routeEnum} from '../../enums/route.enum';
import {setAuth} from '../../redux/slices/auth.slice';

const ProjectScreen = () => {
  // Theme switching,access the currently active theme
  const style = useThemedStyles(projectStyle);
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const [projects] = useState(getAllProjects());
  const auth = useSelector((state: RootState) => state.auth);
  const renderProjects = (item: ProjectInterface) => {
    return (
      <TouchableOpacity
        style={[style.pressableView, {elevation: 3, marginBottom: 2}]}
        onPress={() => setSelectedProject(item.id, item.project_name)}>
        <View style={style.mainRow}>
          <View style={style.rowView}>
            <Text style={style.projectName}>
              {item.project_name === 'All Projects'
                ? 'All Chats'
                : item.project_name}
            </Text>
            <Text style={style.status}>{item.status}</Text>
          </View>
          <Animated.View style={{transform: [{rotate: '270deg'}]}}>
            <SimpleDownArrow />
          </Animated.View>
        </View>
        {item.id !== 'all' ? (
          <>
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
          </>
        ) : null}
      </TouchableOpacity>
    );
  };

  const setSelectedProject = (id: string, project_name: string) => {
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
  };

  return (
    <View style={style.container}>
      <Header title={t('project:CHOOSE_PROJECT')} />
      {auth.userRole === '2' ? (
        <View>{renderProjects(globalProject)}</View>
      ) : null}
      <FlatList
        data={projects}
        renderItem={({item}) => renderProjects(item)}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

export default ProjectScreen;
