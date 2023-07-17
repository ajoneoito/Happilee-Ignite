/**
 * Entry.Screen.tsx
 * @module Entry screen
 * @desc Initial screen with terms of service
 * @author Sujitha NeoITO
 * @version 0.0.1
 * @access public
 * ...
 */
import {C} from '../../constants';
import React, {useEffect} from 'react';
import {entryStyle} from './Entry.style';
import {Icon, Mascot} from '../../assets';
import {useTranslation} from 'react-i18next';
import {routeEnum} from '../../enums/route.enum';
import {useDispatch, useSelector} from 'react-redux';
import {setAuth} from '../../redux/slices/auth.slice';
import {useIsFocused} from '@react-navigation/native';
import {RootState} from '../../redux/store/root.reducer';
import Button from '../../components/Button/Button.component';
import { ScrollView, StatusBar, Text, View} from 'react-native';
import useThemedStyles from '../../utils/theming/useThemedStyles';
import {GET_ALL_PROJECTS_ACTION} from '../../redux/actions/project.action';
import {navigate, resetNavigation} from '../../navigation/useNavigationUtils';
import {requestMessagingPermission,forgroundFCMListner} from '../../utils/functions/messaging';

const dgl = C.measures.dgl;

const EntryScreen = () => {
  // Theme switching,access the currently active theme
  const style = useThemedStyles(entryStyle);
  const {t} = useTranslation();
  const auth = useSelector((state: RootState) => state.auth);

  const dispatch = useDispatch();
  // This hook returns `true` if the screen is focused, `false` otherwise
  const isFocused = useIsFocused();

  useEffect(() => {
    if (auth.policy === true && isFocused) {
      requestMessagingPermission();
      forgroundFCMListner(dispatch);
      handleLogin();
    }
  }, [isFocused]);



  // Function accepting terms and contitions
  const handlePolicy = () => {
    dispatch(
      setAuth({
        ...auth,
        policy: true,
      }),
    );
    navigate(routeEnum.LOGINSCREEN);
  };

  // Navigating to the login page only terms agreed user.
  const handleLogin = () => {
    if (!auth.logged) {
      navigate(routeEnum.LOGINSCREEN);
    } else {
      if (auth.projectId === '') {
        dispatch({type: GET_ALL_PROJECTS_ACTION});
      } else {
        resetNavigation({
          index: 1,
          routes: [{name: routeEnum.LOGGEDSCREENS}],
        });
      }
    }
  };

  return (
    <View style={style.container}>
      <ScrollView contentContainerStyle={style.scrollWrap}>
        <StatusBar
          barStyle="dark-content"
          hidden={false}
          backgroundColor="transparent"
          translucent={true}
        />
        <View style={style.mainWrapper}>
          <Icon width={dgl * 0.031} height={dgl * 0.031} />
          <Text style={style.welcome}>{t('entryScreen:WELCOME')}</Text>
          <Text style={style.headerText}>{t('entryScreen:APP_NAME')}</Text>
          <Mascot width={dgl * 0.28} height={dgl * 0.28} />
        </View>
        {auth.policy === false ? (
          <View style={style.socondWrapper}>
            <Text style={style.agreeText}>{t('entryScreen:ACCEPT')}</Text>
            <Text style={[style.agreeText, {paddingBottom: dgl * 0.015}]}>
              {t('entryScreen:THE')}{' '}
              <Text onPress={() => {}} style={style.terms}>
                {t('entryScreen:TERMS')}
              </Text>
            </Text>

            <Button
              TextStyle={style.buttonText}
              ButtonContainer={style.button}
              ButtonText={t('entryScreen:CONTINUE')}
              onPress={() => {
                handlePolicy();
              }}
            />
          </View>
        ) : null}
      </ScrollView>
    </View>
  );
};

export default EntryScreen;
