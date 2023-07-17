import {t} from 'i18next';
import {C} from '../../constants';
import React, {useState} from 'react';
import {CallIcon, SMSIcon} from '../../assets';

/**
 * useDefaultMenuHook is used in ChatBoxDefaultMenu.tsx
 * This is a menuprovider component, when user press on the 3 vertical dots, a popup will be shown and listing 2 labels
 * >> call and sms
 * The other functions are used to update the state when the lebels are pressed.
 */

export const useDefaultMenuHook = () => {
  const dgl = C.measures.dgl;
  const [selectedindex, setSelectedindex] = useState(0);
  const [opended, setOpened] = useState(false);
  const data = [
    {
      key: 'call',
      value: t('chatBox:CALL'),
      icon: <CallIcon width={dgl * 0.05} height={dgl * 0.03} />,
    },
    {
      key: 'sms',
      value: t('chatBox:SMS'),
      icon: <SMSIcon width={dgl * 0.05} height={dgl * 0.03} />,
    },
  ];

  const updateMenuState = (val: boolean) => {
    setOpened(val);
  };

  const onPress = (index: number, val: boolean) => {
    setSelectedindex(index);
    setOpened(val);
  };

  return {data, opended, selectedindex, updateMenuState, onPress};
};
