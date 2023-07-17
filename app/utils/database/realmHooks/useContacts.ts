/**
 * Utlity hooks to manage contacts model
 * @description Contains all funtion to manage and get data of project schema.
 */

import realm from '../schema';
import {ContactInterface} from '../interfaces';
/**
 * Utlity hooks to manage chat history model
 * @description Contains all funtion to manage and get data of chat history schema.
 */

/**
 * Returns all tags of a contact.
 * @param contact_id
 **/
let getTagsOfContacts = (contact_id: string) => {
  return realm.objects('Tags').filtered('contact_id = $0', '' + contact_id);
};

/**
 * Returns all parameters of a contact.
 * @param contact_id
 **/
let getParametersOfContact = (contact_id: string) => {
  return realm
    .objects('Parameters')
    .filtered('contact_id = $0', '' + contact_id);
};

/**
 * delete all parameters of.
 * @param contact_id
 **/
let deleteParameter = (contact_id: string) => {
  realm.write(() => {
    realm.delete(
      realm.objects('Parameters').filtered('contact_id = $0', '' + contact_id),
    );
  });
};

/**
 * delete all tags of.
 * @param contact_id
 **/
let deleteTag = (contact_id: string) => {
  realm.write(() => {
    realm.delete(
      realm.objects('Tags').filtered('contact_id = $0', '' + contact_id),
    );
  });
};

/**
 * Return all contacts based on projectId.
 * @param projectId, start, end
 */
let getContacts = (
  projectId: string,
  offset?: number,
  limit?: number,
  search?: string,
  tag_filter?: String[],
) => {
  let contacts = realm
    .objects('Contacts')
    .sorted('created_at', true)
    .filtered('projectId = $0', projectId);
  if (search) {
    try {
      contacts = contacts?.filtered('contact_name CONTAINS[c] $0', search);
    } catch (e) {
      console.log('err', e);
    }
  }
  let t = JSON.parse(JSON.stringify(contacts));
  t?.forEach(item => {
    //append parameters
    item.parameters = getParametersOfContact(item?.id);
    //append tags
    item.tags = getTagsOfContacts(item?.id);
  });
  if (tag_filter?.length > 0) {
    t = t?.filter(item =>
      item?.tags?.some(r => tag_filter?.includes(r?.tag_name)),
    );
  }
  if (offset && limit) {
    t = t.slice(offset, limit);
    return t; //offset, limit present when requested from components here we are sending deep copied object
  }
  return contacts; //for deleteing all contacts it need to realm object
};

/**
 * Add a single contact using props.
 * Create new instance if not exist or update existing one.
 * @param props contactInterface
 */
let addSingleContact = (props: ContactInterface) => {
  realm.write(() => {
    try {
      realm.create(
        'Contacts',
        {
          whatsapp_availability: props.whatsapp_availability,
          projectId: props.projectId,
          id: props.id,
          is_subscribed: props.is_subscribed,
          candidate_id: props.candidate_id,
          contact_name: props.contact_name,
          phoneNumber: props.phoneNumber,
          created_at: new Date(props.created_at),
        },
        'modified',
      );

      props?.tags?.map(item => {
        realm.create(
          'Tags',
          {tag_name: item.tag_name, contact_id: props?.id, id: '' + item?.id},
          'modified',
        );
      });
      props?.parameters?.map(item => {
        realm.create(
          'Parameters',
          {...item, param_id: '' + item.param_id, contact_id: props?.id},
          'modified',
        );
      });
    } catch (err) {
      console.log('error', err);
    }
  });
};

/**
 * Check instance exist on Contact.
 * @param id of contact
 */
let checkContactExist = (id: string) => {
  let history = realm.objects('ChatHistory').filtered('id = $0', id);
  return history;
};

/**
 * Add a multiple contact using array.
 * @param Array of contacts
 */
let addMultipleContacts = (contacts: ContactInterface[]) => {
  contacts.map(item => {
    addSingleContact(item);
  });
};

/**
 *  Remove all contacts from contacts model using projectid
 * @param projectId
 */
let deleteContacts = (projectId: string) => {
  let contacts = getContacts(projectId);
  contacts.map(item => {
    //remove all parameters,tags when deleteing all contacts
    deleteParameter(item?.id);
    deleteTag(item?.id);
  });
  realm.write(() => {
    realm.delete(contacts);
  });
};

// Delete single contact using contact id
let deleteSingleContact = (id: string) => {
  realm.write(() => {
    const contact = realm.objects('Contacts').filtered('id = $0', id);
    realm.delete(contact);
  });
};

//Update single contact using object
let updateContact = (contact: ContactInterface) => {
  addSingleContact(contact);
};

//Update multiple contact intance using array of contacts
let updateMultipleContact = (contacts: ContactInterface[]) => {
  contacts.map(item => {
    addSingleContact(item);
  });
};

export {
  getContacts,
  addSingleContact,
  checkContactExist,
  addMultipleContacts,
  deleteContacts,
  deleteSingleContact,
  updateContact,
  updateMultipleContact,
};
