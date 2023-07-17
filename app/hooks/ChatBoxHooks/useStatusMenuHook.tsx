import {useState} from 'react';
import {C} from '../../constants';
import {statusMenu} from '../../interface/ChatboxInterface';
import ChatBoxStyle from '../../screens/ChatBox/ChatBox.style';
import useThemedStyles from '../../utils/theming/useThemedStyles';

// this hook is used in ChatBoxStatusMenu.tsx screen,
// this hook maily used to update local state variables and invoking some callback handlers
export const useStatusMenuHook = (props: statusMenu) => {
  const dgl = C.measures.dgl;
  const [opended, setOpened] = useState(false);
  const [upArrow, setUpArrow] = useState(false);
  const [selectedStatus, setselectedStatus] = useState(
    props?.status?.toUpperCase(),
  );
  const {ChatBoxStyles} = useThemedStyles(ChatBoxStyle);
  const [selectedStatusIndex, setselectedStatusIndex] = useState(0);

  const onPressStatusMenu = (bool: boolean) => {
    setUpArrow(bool);
    setOpened(bool);
  };

  const onPress = (item: string, index: number) => {
    setselectedStatus(item);
    props?.onChangeStatus(item);
    setselectedStatusIndex(index);
  };

  const updateArrow = (bool: boolean) => {
    setUpArrow(bool);
  };
  return {
    dgl,
    opended,
    upArrow,
    ChatBoxStyles,
    selectedStatus,
    selectedStatusIndex,
    onPress,
    updateArrow,
    onPressStatusMenu,
  };
};
