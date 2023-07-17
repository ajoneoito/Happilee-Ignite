
# Add language translation
```bash
copy translations folder to src folder 
```
```bash
I have added settings, navigation related translation in respective file names. 
```

## Add new language or add transaltions


```bash
1. to add new language hindi, add a folder with shortcode mybe hi inside translations/languages/hi then add index.js, respect page named files and import those in index.js file. In repective file name we can add the translations

```
[refrence for languages file nameing](https://github.com/chatwoot/chatwoot-mobile-app/tree/develop/src/i18n)

[tutorial follwoed](https://www.crowdbotics.com/blog/how-to-offer-multi-language-support-in-a-react-native-app)

## Install dependencies


```bash
  npm i i18next
  npm i react-i18next
  npm i react-native-localize
  npm i @react-native-async-storage/async-storage
```




## Setup

import the translations folder in index.js root file
```bash
import "./src/translations/index"
```
import in screen u want to translate 
```bash
import {useTranslation} from 'react-i18next';

```

translate
```bash
//useing example
function HomeScreen({navigation}) {
    const {t} = useTranslation();
    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text>{t('navigate:HOME')}</Text>
            <Button title="Go to Details" onPress={() => navigation.navigate('Details')} />
        </View>
    );
}

//settings page for selecting language

import * as React from 'react';
import {Button, View, Text, Pressable, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useTranslation} from 'react-i18next';

function SettingScreen() {
    const LANGUAGES = [
        {code: 'en', label: 'English'},
        {code: 'ml', label: 'Malayalam'},
    ];
    const {i18n, t} = useTranslation();
    const selectedLanguageCode = i18n.language;

    const setLanguage = code => {
        return i18n.changeLanguage(code);
    };

    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <Text style={styles.title}>{t('settings:LANGUAGE_SELECTOR')}</Text>
            </View>
            {LANGUAGES.map(language => {
                const selectedLanguage = language.code === selectedLanguageCode;

                return (
                    <Pressable key={language.code} style={styles.buttonContainer} disabled={selectedLanguage} onPress={() => setLanguage(language.code)}>
                        <Text style={[selectedLanguage ? styles.selectedText : styles.text]}>{language.label}</Text>
                    </Pressable>
                );
            })}
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        paddingTop: 60,
        paddingHorizontal: 16,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    title: {
        color: '#444',
        fontSize: 28,
        fontWeight: '600',
    },
    buttonContainer: {
        marginTop: 10,
    },
    text: {
        fontSize: 18,
        color: '#000',
        paddingVertical: 4,
    },
    selectedText: {
        fontSize: 18,
        fontWeight: '600',
        color: 'tomato',
        paddingVertical: 4,
    },
});


```
