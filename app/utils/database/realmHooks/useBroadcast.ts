/**
 * Utlity hooks to manage  broadcast.
 * @description Contains all funtion to manage and get data of broadcast schema.
 */

import realm from '../schema';
import {BroadcastInterface} from '../interfaces';
import { store } from '../../../redux/store/store';

// Functions
// Return all broadcast.

let getAllBroadcast = (
  name?: string,
  project_id?: string,
  sort?: boolean,
  start?: number,
  end?: number,
) => {
  const authState = store.getState().auth;
  let broadcast = realm
    .objects('Broadcast')
    .filtered('project_id = $0', project_id?.toString())
    .sorted('createdAt', true);
    if (authState.projectId !== 'all' && authState.userRole !== '2') {
      broadcast = broadcast
      .filtered('project_id = $0', project_id?.toString())
      .filtered('updatedAt = $0', authState.operator_id?.toString());
    }
    

    
  if (name) {
    broadcast = broadcast.filtered('name CONTAINS[c] $0', name);

  }
  if (sort) {
      if (authState.projectId !== 'all' && authState.userRole !== '2') {
        broadcast = broadcast
        .filtered('project_id = $0', project_id?.toString())
        .filtered('updatedAt = $0', authState.operator_id?.toString())
        .sorted('createdAt', false);
      }else{

        broadcast = realm.objects('Broadcast')
        .filtered('project_id = $0', project_id?.toString())
        .sorted('createdAt', false);
      }

    // }
  }

  if (start >= 0 && end) {
    broadcast = broadcast.slice(start, end);
    let t = JSON.parse(JSON.stringify(broadcast));
    return t;
  }
  return broadcast;
};

/**
 * Add a single recent broadcast using parameters.
 * Create new instance if not exist or update existing one.
 * @param props BroadcastInterface
 */
let addBroadcastList = (props: BroadcastInterface) => {
  realm.write(() => {
    realm.create(
      'Broadcast',
      {
        createdAt: props.createdAt,
        id: props.id,
        name: props.name,
        project_id: props.project_id,
        status: props.status,
        successCount: props.successCount,
        templateMessageId: props.templateMessageId,
        updatedAt:props.created_by,
      },
      'modified',
    );
  });
};
let addMultipleBroadcast = (broadcast: BroadcastInterface[]) => {
  broadcast.map(item => {
    addBroadcastList(item);
  });
};

export {addBroadcastList, getAllBroadcast, addMultipleBroadcast};
