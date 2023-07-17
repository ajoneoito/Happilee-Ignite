/* For offline  storage*/
//Define all schemas(models) here.
import Realm from 'realm';
// Declare ChatList Schema
class ChatList extends Realm.Object<ChatList> {
  id: string | undefined;
  chatName!: string;
  chatUid: string | undefined;
  fileName: string | undefined;
  messageType: string | undefined;
  candidateId!: string;
  messageText!: string;
  status!: string;
  message_created_time!: Date;
  operatorid: string | undefined;
  master_operator_id: string | undefined;
  isCandidateReplied!: boolean;
  currentUnreadMessageCount!: number;
  chatExpiringTime!: string;
  chatStartedTime!: string;
  isMessageRead!: boolean;
  candidatePhoneNumber!: string;
  operator_name!: string;
  firstName!: string;
  projectId!: string;
  project_name!: string;

  static primaryKey = 'id';

  constructor(realm: Realm) {
    super(realm, {});
  }
}
// Declare ChatHistory Schema
class ChatHistory extends Realm.Object<ChatHistory> {
  id: string | undefined;
  chatId?: string;
  whatsappMessageId?: string;
  conversationId?: string;
  ticketId?: string;
  owner?: boolean;
  messageText?: string;
  isMessageRead?: boolean;
  messageType?: string;
  senderName?: string | undefined;
  waId?: string | undefined;
  timestamp?: Date;
  messageStatusString?: string;
  chatUid?: string;
  eventType?: string;
  senderId?: string;
  recieverId?: string;
  status?: string;
  fileName?: string;
  fileType?: string;
  fileLocationUrl?: string;
  localFileLocation?: string;
  templateMessageId?: string;
  mediaId?: string;
  mime_type?: string;
  sha256?: string;
  createdAt?: Date;
  updatedAt?: Date;
  media_caption?: string;

  static primaryKey = 'id';

  constructor(realm: Realm) {
    super(realm, {});
  }
}

class Projects extends Realm.Object<Projects> {
  id?: string;
  firstName?: string;
  lastName?: string;
  status?: string;
  project_uuid?: string;
  is_account_verified?: boolean;
  phone_number?: any;
  project_name?: string;
  website_link?: string;
  organization_name?: string;
  package_name?: string;
  category_id?: string;
  project_creation_time?: string;
  category?: string;

  static primaryKey = 'id';

  constructor(realm: Realm) {
    super(realm, {});
  }
}

class Parameters extends Realm.Object<Parameters> {
  param_id?: string;
  param_value?: string;
  param_name?: string;
  contact_id?: string;

  static primaryKey = 'param_id';

  constructor(realm: Realm) {
    super(realm, {});
  }
}
class Tags extends Realm.Object<Tags> {
  id?: string;
  tag_name?: string;
  contact_id?: string;

  static primaryKey = 'id';

  constructor(realm: Realm) {
    super(realm, {});
  }
}
class Contacts extends Realm.Object<Contacts> {
  id?: string;
  whatsapp_availability?: string;
  projectId?: string;
  is_subscribed?: boolean;
  candidate_id?: string;
  contact_name?: string;
  phoneNumber?: string;
  created_at?: Date;
  //tags?: Realm.List<Tags> | [];
  //parameters?: Realm.List<Parameters> | [];

  static primaryKey = 'id';

  constructor(realm: Realm) {
    super(realm, {});
  }
}
//create broadcast
class Broadcast extends Realm.Object<Broadcast> {
  id?: string;
  createdAt?: string;
  name?: string;
  project_id?: string;
  status?: string;
  updatedAt?: string;
  templateMessageId?: string;
  static primaryKey = 'id';
  constructor(realm: Realm) {
    super(realm, {});
  }
}

// Create realm
let realm = new Realm({
  schema: [
    ChatList,
    ChatHistory,
    Projects,
    Tags,
    Parameters,
    Contacts,
    Broadcast,
  ],
  schemaVersion: 1,
  // deleteRealmIfMigrationNeeded: true,
});

export default realm;
