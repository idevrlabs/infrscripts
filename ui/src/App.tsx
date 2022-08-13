import React from 'react';
import Button from '@mui/material/Button';
import { createDockerDesktopClient } from '@docker/extension-api-client';
import { Stack, TextField, Typography } from '@mui/material';
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';

const rows: GridRowsProp = [
  { id: 1, col1: 'Hello', col2: 'Infra',col3:'github',col4:'10' },
  { id: 2, col1: 'DataGridPro', col2: 'Infra2' ,col3:'github',col4:'10'},
  { id: 3, col1: 'MUI', col2: 'is Amazing Infra3' ,col3:'github',col4:'10'},
];

const columns: GridColDef[] = [
  { field: 'col1', headerName: 'Author', width: 150 },
  { field: 'col2', headerName: 'Title', width: 150 },
  { field: 'col3', headerName: 'Source', width: 100 },
  { field: 'col4', headerName: 'User Ratings', width: 60 },

];
// Note: This line relies on Docker Desktop's presence as a host application.
// If you're running this React app in a browser, it won't work properly.
const client = createDockerDesktopClient();

function useDockerDesktopClient() {
  return client;
}

export function App() {
  const [response, setResponse] = React.useState<string>();
  const [token, setToken] = React.useState<string>();
  const [user,setUser]=React.useState<string>();
  
  const ddClient = useDockerDesktopClient();

  const fetchAndDisplayResponse = async () => {
    const result = await ddClient.extension.vm?.service?.get('/hello');
    setResponse(JSON.stringify(result));
  };

  const execSignOff = async () => {
    const result = await ddClient.extension.vm?.service?.get('/signoff?token=123456');
    setResponse(JSON.stringify(result));
  };

const fetchLoginTokenAndDisplayToken = async() => {
  const result = await ddClient.host.openExternal("https://authorization-server.com/authorize?response_type=code&client_id=T70hJ3ls5VTYG8ylX3CZsfIu&redirect_uri=${REDIRECT_URI}&scope=photo+offline_access&state=kH_0FdAtjCfYjOkF");
  setToken(JSON.stringify(result));
}

const signupAndDisplayToken = async() => {
  const result = await ddClient.host.openExternal("https://authorization-server.com/authorize?response_type=code&client_id=T70hJ3ls5VTYG8ylX3CZsfIu&redirect_uri=${REDIRECT_URI}&scope=photo+offline_access&state=kH_0FdAtjCfYjOkF");
  setToken(JSON.stringify(result));
}

enum messageType {success,error,warning};

const showToastMessage=(m: string, mType:messageType) => {  
  switch(mType){
    case messageType.success:ddClient.desktopUI.toast.success(m);break;
    case messageType.error:ddClient.desktopUI.toast.error(m);break;
    case messageType.warning:ddClient.desktopUI.toast.warning(m);break;
  }
}
const showToastSuccessMessage = (m: string)=>{ddClient.desktopUI.toast.success(m);}
  const showToastErrorMessage = (m: string)=>{ddClient.desktopUI.toast.error(m);}
  const showToastWarningMessage = (m: string)=>{ddClient.desktopUI.toast.warning(m);}
  const dispMesgOnClickHandler =(e: React.MouseEvent<HTMLButtonElement>, mesg?: string,mType?:messageType) =>{
    showToastMessage(mesg,mType);
  }
  
  return (
    <>
  <Typography variant="h3">Info Scripts</Typography>
      <Stack direction="row" alignItems="start" spacing={2} sx={{ mt: 4 }}>
        <Button variant="contained" onClick={fetchAndDisplayResponse}>
          Call backend
        </Button>
        <Button variant="contained" onClick={execSignOff}>
          Sign Out
        </Button>
        <Button variant="contained" onClick={signupAndDisplayToken}>
          Sign Up
        </Button>
        <Button variant="contained" onClick={(e)=>{dispMesgOnClickHandler(e,"success message",messageType.success)}}>
          Show Message
        </Button>
</Stack>
<div style={{ height: 300, width: '100%' }}>
      <DataGrid rows={rows} columns={columns} />
    </div>
<Stack direction="row" alignItems="start" spacing={2} sx={{ mt: 4 }}>
        <TextField
          label="Backend response"
          sx={{ width: 480 }}
          disabled
          multiline
          variant="outlined"
          minRows={5}
          value={response ?? ''}
        />
        <TextField
          label="Authentication response"
          sx={{ width: 480 }}
          disabled
          multiline
          variant="outlined"
          minRows={5}
          value={token ?? ''}
        />
   </Stack>
    </>
  );
}
/*
 
    <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
        This is a basic page rendered with MUI, using Docker's theme. Read the
        MUI documentation to learn more. Using MUI in a conventional way and
        avoiding custom styling will help make sure your extension continues to
        look great as Docker's theme evolves.
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
        Pressing the below button will trigger a request to the backend. Its
        response will appear in the textarea.
      </Typography>
*/