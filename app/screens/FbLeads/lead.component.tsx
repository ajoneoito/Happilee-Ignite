/**
 * lead.component.tsx
 * @module lead component.
 * @desc components to lead screens
 * @author Sujitha NeoITO
 * @version 0.0.1
 * @access public
 * ...
 */
import React from 'react';
import {Text, View} from 'react-native';
import {leadsStyle} from './FbLeads.style';
import {getDateString} from '../../utils/functions/funtions';
import useThemedStyles from '../../utils/theming/useThemedStyles';
import {getTimeString, toUpper} from '../../utils/functions/funtions';
interface Data {
  data: any;
  details: any;
}
export const LeadData = (props: Data) => {
  const style = useThemedStyles(leadsStyle);
  return (
    <View style={style.details}>
      <Text style={style.data}>{props.data}</Text>
      <Text numberOfLines={3} style={style.leadData}>
        {props.details}
      </Text>
    </View>
  );
};
interface Details {
  additionalInfo?: any;
  basicInfo?: any;
  notes?: any;
}
interface Note {
  created_at: string;
  text: string;
  updated_at: string;
}

export const Leadsinfo = (props: Details) => {
  const style = useThemedStyles(leadsStyle);
  return (
    <View style={style.infoContainer}>
      {props.basicInfo ? (
        <>
          {Object.keys(props.basicInfo).length !== 0 ? (
            <Text style={style.basicInfo}>Basic Info</Text>
          ) : null}

          {Object.keys(props.basicInfo).map((key: string) => {
            return (
              <View>
                {key === 'status' ? (
                  <>
                    <View style={style.details}>
                      <Text style={style.data}>{key}</Text>
                      <StatusButton statusLabel={props.basicInfo[key]} />
                    </View>
                  </>
                ) : (
                  <LeadData data={key} details={props.basicInfo[key]} />
                )}
              </View>
            );
          })}
        </>
      ) : null}
      {props.additionalInfo ? (
        <>
          {Object.keys(props.additionalInfo).length !== 0 ? (
            <Text style={[style.basicInfo, style.add]}>Additional Info</Text>
          ) : null}

          {Object.keys(props.additionalInfo).map((key: string) => {
            return (
              <View>
                <LeadData
                  data={key}
                  details={
                    key.startsWith('Date Of Birth')
                      ? getDateString(props.additionalInfo[key].value)
                      : props.additionalInfo[key].value
                  }
                />
              </View>
            );
          })}
        </>
      ) : null}

      {props?.notes ? (
        <>
          {props.notes[0] ? <Text style={style.basicInfo}>Notes</Text> : null}
          <View>
            {props?.notes.map((item: Note) => {
              return (
                <View style={style.notes}>
                  <Text style={style.data}>{item.text}</Text>
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
              );
            })}
          </View>
        </>
      ) : null}
    </View>
  );
};

interface Button {
  statusLabel: string;
}
export const StatusButton = (props: Button) => {
  const style = useThemedStyles(leadsStyle);
  return (
    <>
      {props.statusLabel !== null ? (
        <View style={style.statusButton}>
          <Text numberOfLines={1} style={style.statusLabel}>{toUpper(props.statusLabel)}</Text>
        </View>
      ) : null}
    </>
  );
};
import {store} from '../../redux/store/store';
import {setNewLeadsArray} from '../../redux/slices/fbLeads.slice';
import {LEAD_STATUS_ACTION} from '../../redux/actions/fbLeads.action';
import { fbLeadList } from '../../services/interface/fbLeadsInterface';
// New fblead adding via centrifuge hit
export const addFbLeads = (newLeadObject: any, dispatch: any) => {
  const leads = store.getState().fbLeads;
  const filter = store.getState().leadFilter;
  const mergedLeads: fbLeadList = {
    count: leads.count,
    data: [newLeadObject],
  };
  dispatch(setNewLeadsArray(mergedLeads));
  dispatch({type: LEAD_STATUS_ACTION, payload: filter});

  return <></>;
};
