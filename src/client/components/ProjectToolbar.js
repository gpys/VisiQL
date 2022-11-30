import React, { useState } from 'react';
import {
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
  TextField,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DownloadIcon from '@mui/icons-material/Download';
import SaveIcon from '@mui/icons-material/Save';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import UpgradeIcon from '@mui/icons-material/Upgrade' //for update 
import SaveProject from './SaveProject';
import ProjectSaved from './ProjectSaved';



const ProjectToolbar = (props) => {
  const { currentUserId, schemaData, treeData, resolverData, projectId, projectName, setProjectName } = props;

  const [saveProjExpand, setSaveProjExpand] = useState(false);
  const [projectSaved, setProjectSaved] = useState(false);

const useInput = e => { //click event from saveproject
  setProjectName(e.target.value);
};

  const saveProjectFunc = () => {
    if (projectName === '') return alert('Please enter a project name');
    if (
      props.schemaData === 'Enter a Postgres DB link to generate your schema...'
    )
      return alert('Please enter a database link to start your project');
    if (!props.currentUserId)
      return alert('You must be signed in to save a project');

    const date = (new Date()).toString(); 
    const body = {
      user: currentUserId,
      projectName: projectName,
      schemaData: schemaData,
      treeData: treeData,
      date: date, 
      resolverData: resolverData,
    };
    console.log('post body', body);
    fetch('/projects/save', {
      method: 'POST',
      headers: {
        'Content-Type': 'Application/JSON',
      },
      body: JSON.stringify(body),
    })
      .then((data) => data.json())
      .then((data) => {
        console.log(data);
      })
      .catch((err) => console.log('dbLink fetch /project/save: ERROR:', err));
    setProjectSaved(true);
    setSaveProjExpand(false);
    setProjectName(''); //clear projectname after save
  };
const updateProjectFunc = async () => {
  if (!projectId) return alert('Please load a saved project.')
  const date = (new Date()).toString();
  const body = {
    id: projectId,
    // user: currentUserId,
    name: projectName,
    schema: schemaData,
    // tree: treeData,
    date: date, 
    resolver: resolverData,
  };
  const request = await fetch('/projects/update', {
    method: 'PATCH',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(body),
  });
  const response = request.json();
}

  const actions = [
    { icon: <DownloadIcon fontSize='large' />, name: 'Download' },
    {
      icon: <SaveIcon fontSize='large' />,
      name: 'Save Project',
    },
    { icon: <FolderOpenIcon fontSize='large' />, name: 'View Projects' },
    { icon: <UpgradeIcon fontSize='large' />, name: 'Update Project'}, //figure out how to add save project func to this
  ];
  const actionSize = {
    width: 90,
    height: 90,
    tooltip: {
      fontSize: 90,
    },
  };
  const classes = {
    tooltip: {
      fontSize: 90,
    },
  };

  return (
    <div>
      <SpeedDial
        ariaLabel='SpeedDial openIcon example'
        sx={{
          '& .MuiFab-primary': {
            width: 100,
            height: 100,
            backgroundColor: '#ed6a5a',
            '&:hover': { backgroundColor: '#f1887b' },
          },
          position: 'absolute',
          bottom: 96,
          right: 66,
        }}
        icon={<SpeedDialIcon openIcon={<EditIcon />} />}
      >
        {actions.map((action) => (
          <SpeedDialAction
            sx={actionSize}
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            TooltipClasses={classes}
            onClick={() => {
              setSaveProjExpand(true);
            }}
          />
        ))}
      </SpeedDial>
      <SaveProject
        trigger={saveProjExpand}
        close={setSaveProjExpand}
        saveProjectFunc={saveProjectFunc}
        projectName={projectName}
        useInput={useInput}
      />
      <ProjectSaved trigger={projectSaved} close={setProjectSaved} />
    </div>
  );
};

export default ProjectToolbar;
