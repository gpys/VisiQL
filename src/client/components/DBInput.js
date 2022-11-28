import React from 'react';
import { TextField, Button } from '@mui/material';
import { useState } from 'react';
import SchemaContainer from './SchemaContainer';
import SchemaContainerKelly from './SchemaContainerKelly';
import VisualizerContainer from './VisualizerContainer';
import ProjectToolbar from './ProjectToolbar';


const useInput = (init) => {
  const [value, setValue] = useState(init);
  const onChange = (e) => {
    setValue(e.target.value);
  };
  return [value, onChange];
};

const DBInput = (props) => {
  const [dbLink, dbLinkOnChange] = useInput('');
  const [dataReceived, setDataReceived] = useState(false);
  
  const { dbSchemaData, dbSchemaDataOnChange, treeData, setTreeData, resolverData, setResolverData } = props;

  const saveDBLink = (event) => {
    if (dbLink === '') {
      return alert('Please enter a database link');
    } else if (!dbLink.includes('postgres')) {
      return alert('Please enter a postgres database link');
    } else {
      const body = { dbLink };
      fetch('/db', {
        method: 'POST',
        headers: {
          'Content-Type': 'Application/JSON',
        },
        body: JSON.stringify(body),
      })
        .then((data) => data.json())
        .then((data) => {
          console.log(data);
          dbSchemaDataOnChange(data.schemaString);
          setResolverData(data.resolverString);
          setDataReceived(true);
          setTreeData(data.tree);
          console.log(dbSchemaData);
        })
        .catch((err) => console.log('dbLink fetch /db: ERROR:', err));
    }
  };

  return (
    <div className='input-and-visualizer'>
      <div className='db-input'>
        <form className='db-input'>
          <TextField
            className='db-textfield'
            placeholder='Enter a Postgres DB link...'
            style={{ width: 900 }}
            inputProps={{ style: { fontSize: 30 } }}
            variant='outlined'
            value={dbLink}
            onChange={dbLinkOnChange}
          />
          <Button
            className='submit-button'
            variant='contained'
            onClick={saveDBLink}
            sx={{
              backgroundColor: '#ed6a5a',
              ':hover': { backgroundColor: '#f1887b' },
            }}
          >
            {' '}
            Submit{' '}
          </Button>
        </form>
      </div>
      <div className='schema-vis-container'>
        <SchemaContainerKelly
          dataReceived={dataReceived}
          dbSchemaData={dbSchemaData}
          dbSchemaDataOnChange={dbSchemaDataOnChange}
          resolverData={resolverData}
        />
        <VisualizerContainer data={treeData} />
        <ProjectToolbar
          schemaData={dbSchemaData}
          treeData={treeData}
          currentUserId={props.currentUserId}
        />
      </div>
    </div>
  );
};

export default DBInput;
