import { useEffect, useState } from "react";
import useTheme from "../utils/theming/useTheme";
import { useRoute } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store/root.reducer";
import { Theme } from "../services/interface/themeInterface";
import useThemedStyles from "../utils/theming/useThemedStyles";
import { templateStyles } from "../screens/templates/Template.style";
import { templateListInterface } from "../services/interface/templateInterfaces";
import { GLOBAL_TEMPLATE_LIST_ACTION, TEMPLATE_LIST_ACTION } from "../redux/actions/templates.action";

export const  useTemplete = () => {
    const style = useThemedStyles(templateStyles);
    const theme = useTheme() as Theme;
    const dispatch = useDispatch();
    const {num, key} = useRoute().params;
    const [active, setActive] = useState(false);
    const [data, setData] = useState<templateListInterface | null>();
  
    const templete = useSelector((state: RootState) => state.templates);
    const auth = useSelector((state: RootState) => state.auth);
    useEffect(() => {
      dispatch({
        type:
          auth.projectId === 'all'
            ? GLOBAL_TEMPLATE_LIST_ACTION
            : TEMPLATE_LIST_ACTION,
      });
    }, []);
    //set data as selected template
   const  handleData =(item:templateListInterface | null) =>{
       if (item) {
         setActive(true);
       } else if (item === null) {
         setActive(false);
       }
       setData(item);
   }
    return{
        num,
        key,
        auth,
        data,
        style,
        theme,
        active,
        templete,
        dispatch,
        handleData,

    }
}