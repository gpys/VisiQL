import React from 'react';
import { useState } from 'react';
import Navbar from './Navbar';
//@ts-ignore
import DBInput from './DBInput';
//@ts-ignore
import NotSignedIn from './NotSignedIn';
import ProjectSide from './ProjectSide';

type HomepageProps = {
  loggedIn: Boolean;
  setCurrentUserId: Function;
  currentUserId: Number;
  dbSchemaData: String;
  dbSchemaDataOnChange: Function;
  treeData: Object;
  setTreeData: Function;
  resolverData: String;
  setResolverData: Function;
  blankTree: Object;
  projectId: Number;
  setProjectId: Function;
  projectName: String;
  setProjectName: Function;
  notSignedInPop: Boolean;
  setNotSignedInPop: Function;
  showTree: boolean;
  setShowTree: Function;
};

const Homepage = ({
  loggedIn,
  setCurrentUserId,
  currentUserId,
  dbSchemaData,
  dbSchemaDataOnChange,
  treeData,
  setTreeData,
  resolverData,
  setResolverData,
  blankTree,
  projectId,
  setProjectId,
  projectName,
  setProjectName,
  notSignedInPop,
  setNotSignedInPop,
  showTree,
  setShowTree,
}: HomepageProps) => {

  return (
    <div id='homepage-container'>
      <Navbar
        loggedIn={loggedIn}
        setCurrentUserId={setCurrentUserId}
        notSignedInPop={notSignedInPop}
        setNotSignedInPop={setNotSignedInPop}
        setTreeData={setTreeData}
        dbSchemaDataOnChange={dbSchemaDataOnChange}
        setResolverData={setResolverData}
        blankTree={blankTree}
      />
      <DBInput currentUserId={currentUserId} dbSchemaData={dbSchemaData} dbSchemaDataOnChange={dbSchemaDataOnChange} 
      treeData={treeData} setTreeData={setTreeData} resolverData={resolverData} setResolverData={setResolverData} 
      projectId={projectId} setProjectId={setProjectId} projectName={projectName} setProjectName={setProjectName}showTree={showTree} setShowTree={setShowTree}/>
      <NotSignedIn trigger={notSignedInPop} close={setNotSignedInPop} />
      {/* <ProjectSide /> */}
    </div>
  );
};

export default Homepage;


