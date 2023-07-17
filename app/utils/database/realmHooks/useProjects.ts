/**
 * Utlity hooks to manage projects model
 * @description Contains all funtion to manage and get data of project schema.
 */

import realm from '../schema';
import {ProjectInterface} from '../interfaces';

// Functions
// Return all projects.
let getAllProjects = () => {
  return realm.objects('Projects');
};

/**
 * Add a single project using parameters.
 * Create new instance if not exist or update existing one.
 * @param props ProjectInterface
 */
let addSingleProject = (props: ProjectInterface) => {
  realm.write(() => {
    realm.create(
      'Projects',
      {
        firstName: props.firstName,
        lastName: props.lastName,
        id: props.id,
        status: props.status,
        project_uuid: props.project_uuid,
        is_account_verified: props.is_account_verified,
        phone_number: props.phone_number,
        project_name: props.project_name,
        website_link: props.website_link,
        organization_name: props.organization_name,
        package_name: props.package_name,
        category_id: props.category_id,
        project_creation_time: props.project_creation_time,
        category: props.category,
      },
      'modified',
    );
  });
};

/**
 * Check instance exist on project.
 * @param id of project
 */
let checkExistProject = (projectId: string) => {
  let project = realm.objects('Projects').filtered('id = $0', projectId);
  return project[0];
};

/**
 * Add a multiple project using array.
 * @param Array of projects
 */
let addMultipleProject = (chats: ProjectInterface[]) => {
  chats.map(item => {
    addSingleProject(item);
  });
};

// Remove all chat from chatList model
let deleteAllProject = () => {
  realm.write(() => {
    realm.delete(getAllProjects());
  });
};

export {
  getAllProjects,
  addSingleProject,
  addMultipleProject,
  deleteAllProject,
  checkExistProject,
};
