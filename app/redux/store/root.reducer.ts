import {combineReducers} from 'redux';
import {tab} from '../slices/tab.slice';
import {auth} from '../slices/auth.slice';
import {addon} from '../slices/addon.slice';
import {tagList} from '../slices/tagList.slice';
import {spinner} from '../slices/spinner.slice';
import {fbLeads} from '../slices/fbLeads.slice';
import {chatList} from '../slices/chatlist.slice';
import {isCollaps} from '../slices/isCollaps.slice';
import {broadcast} from '../slices/broadcast.slice';
import {templates} from '../slices/templates.slice';
import {audioTrack} from '../slices/audioTrack.slice';
import {addonsList} from '../slices/addonsList.slice';
import {leadStatus} from '../slices/leadStatus.slice';
import {leadFilter} from '../slices/leadFilter.slice';
import {contactList} from '../slices/contactList.slice';
import {chatHistory} from '../slices/chathistory.slice';
import {audioPlayer} from '../slices/audioPlayer.slice';
import {PresentScreen} from '../slices/screenName.slice';
import {fbLeadFilter} from '../slices/fbLeadFilter.slice';
import {tagListQuery} from '../slices/tagListQuery.slice';
import {broadcastList} from '../slices/broadcastList.slice';
import {imageToUpload} from '../slices/imageToUpload.slice';
import {imagePreviewData} from '../slices/imagePreviewData';
import {leadTypeList} from '../slices/fbLeadTypeList.slice';
import {fbLeadHistory} from '../slices/fbLeaddHistory.slice';
import {broadcastLogList} from '../slices/broadcastLog.slice';
import {chatListFilter} from '../slices/chatlistfilter.slice';
import {chatHistoryFilter} from '../slices/chathistoryfilter';
import {broadcastTags} from '../slices/broadcastTagList.slice';
import {recipients} from '../slices/broadcastRecipients.slice';
import {selectRecipientsId} from '../slices/selectAllId.slice';
import {addonListFilter} from '../slices/addonListFilter.slice';
import {paramsList} from '../slices/broadcastFilterPrams.slice';
import {broadcastFilter} from '../slices/broadcastfilter.slice';
import {templateListFilter} from '../slices/templatefilter.slice';
import {candidateDetails} from '../slices/candidateDetails.slice';
import {recipientsFilter} from '../slices/recipientsFilter.slice';
import {closeAduioPlayer} from '../slices/closeAudioPlayer.slice';
import {contactListFilter} from '../slices/contactListFilter.slice';
import {selectAllRecipients} from '../slices/selectAllRecipients.slice';
import {broadcastFileUpload} from '../slices/broadcastFileUpload.slice';
import {candidateSelectedTags} from '../slices/candidateSelectedTags.slice';
import {candidatePreDefinedTags} from '../slices/candidatePreDefinedTags.slice';
import {broadcastRecipientsFilter} from '../slices/broadcastRecipientsFilter.slice';
import {broadcastListCollection} from '../slices/broadcastListCollection.slice';
import {updateBroadcast} from '../slices/updateBroadcast.slice';
import {skeleton} from '../slices/skeleton.slice';
export const rootReducer = combineReducers({
  auth: auth.reducer,
  spinner: spinner.reducer,
  chatList: chatList.reducer,
  chatListFilter: chatListFilter.reducer,
  tab: tab.reducer,
  chatHistory: chatHistory.reducer,
  chatHistoryFilter: chatHistoryFilter.reducer,
  templates: templates.reducer,
  templateListFilter: templateListFilter.reducer,
  candidateDetails: candidateDetails.reducer,
  canditatePreDefinedTags: candidatePreDefinedTags.reducer,
  candidateSelectedTags: candidateSelectedTags.reducer,
  contactList: contactList.reducer,
  contactListFilter: contactListFilter.reducer,
  tagList: tagList.reducer,
  tagListQuery: tagListQuery.reducer,
  imageToUpload: imageToUpload.reducer,
  recipients: recipients.reducer,
  broadcastFilter: broadcastFilter.reducer,
  broadcast: broadcast.reducer,
  broadcastTags: broadcastTags.reducer,
  paramsList: paramsList.reducer,
  broadcastRecipientsFilter: broadcastRecipientsFilter.reducer,
  broadcastLogList: broadcastLogList.reducer,
  imagePreviewData: imagePreviewData.reducer,
  broadcastFileUpload: broadcastFileUpload.reducer,
  audioPlayer: audioPlayer.reducer,
  closeAudioPLayer: closeAduioPlayer.reducer,
  PresentScreen: PresentScreen.reducer,
  audioTrack: audioTrack.reducer,
  recipientsFilter: recipientsFilter.reducer,
  addonsList: addonsList.reducer,
  addonListFilter: addonListFilter.reducer,
  addon: addon.reducer,
  fbLeads: fbLeads.reducer,
  leadStatus: leadStatus.reducer,
  leadFilter: leadFilter.reducer,
  fbLeadHistory: fbLeadHistory.reducer,
  leadTypeList: leadTypeList.reducer,
  fbLeadFilter: fbLeadFilter.reducer,
  selectAllRecipients: selectAllRecipients.reducer,
  selectRecipientsId: selectRecipientsId.reducer,
  broadcastList: broadcastList.reducer,
  isCollaps: isCollaps.reducer,
  broadcastListCollection: broadcastListCollection.reducer,
  updateBroadcast: updateBroadcast.reducer,
  skeleton : skeleton.reducer,
  
});

export type RootState = ReturnType<typeof rootReducer>;
