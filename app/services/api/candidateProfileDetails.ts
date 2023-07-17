import {ALERT_TYPE, Toast} from '../../components/AlertComponent';
import {contactInfoEndpoints} from '../enums/contactInfoEndpoints';
import {request} from '../request/request';

export const retrieveCandidateDetails = async params => {
  const response = await request
    .get(contactInfoEndpoints.CandidateProfileDetails, {params: params})
    .then(result => {
      return result;
    })
    .catch(error => {
      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: 'Failed',
        textBody: error?.response?.data?.message,
      });
      return false;
    });
  return response;
};

export const ListAllCandidateTags = async params => {
  const response = await request
    .get(contactInfoEndpoints.ListAllCandidateTags, {params: params})
    .then(result => {
      return result;
    })
    .catch(error => {
      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: 'Failed',
        textBody: error?.response?.data?.message,
      });
      return false;
    });
  return response;
};

export const retrieveCandidatePreDefinedTags = async params => {
  const response = await request
    .get(contactInfoEndpoints.CandidatePreDefinedTags, {params: params})
    .then(result => {
      return result;
    })
    .catch(error => {
      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: 'Failed',
        textBody: error?.response?.data?.message,
      });
      return false;
    });
  return response;
};

export const addNewTagServiceCall = async body => {
  const response = await request
    .post(contactInfoEndpoints.AddNewTag, body)
    .then(result => {
      return result;
    })
    .catch(() => {
      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: 'Failed',
        textBody: 'Tag Already Exist',
      });
      return false;
    });
  return response;
};

export const removeTagServiceCall = async body => {
  const response = await request
    .post(contactInfoEndpoints.DeleteTag, body)
    .then(result => {
      return result;
    })
    .catch(error => {
      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: 'Failed',
        textBody: error?.response?.data?.message,
      });
      return false;
    });
  return response;
};

export const blockContact = async body => {
  const response = await request
    .post(contactInfoEndpoints.BlockContact, body)
    .then(result => {
      return result;
    })
    .catch(error => {
      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: 'Failed',
        textBody: error?.response?.data?.message,
      });
      return false;
    });
  return response;
};

export const editParameters = async body => {
  const response = await request
    .post(contactInfoEndpoints.EditParameters, body)
    .then(result => {
      return result;
    })
    .catch(error => {
      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: 'Failed to add parameters',
        textBody: error?.response?.data?.message,
      });
      return false;
    });
  return response;
};

export const deleteParameters = async body => {
  const response = await request
    .post(contactInfoEndpoints.DeleteParameter, body)
    .then(result => {
      return result;
    })
    .catch(error => {
      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: 'Failed to delete parameters',
        textBody: error?.response?.data?.message,
      });
      return false;
    });
  return response;
};

export const addNotes = async body => {
  const response = await request
    .post(contactInfoEndpoints.AddNewNote, body)
    .then(result => {
      return result;
    })
    .catch(error => {
      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: 'Failed to add Note',
        textBody: error?.response?.data?.message,
      });
      return false;
    });
  return response;
};

export const editNotes = async body => {
  const response = await request
    .post(contactInfoEndpoints.EditNote, body)
    .then(result => {
      return result;
    })
    .catch(error => {
      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: 'Failed to edit Note',
        textBody: error?.response?.data?.message,
      });
      return false;
    });
  return response;
};

export const deleteNotes = async body => {
  const response = await request
    .post(contactInfoEndpoints.DeleteNote, body)
    .then(result => {
      return result;
    })
    .catch(error => {
      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: 'Failed to delete parameters',
        textBody: error?.response?.data?.message,
      });
      return false;
    });
  return response;
};
