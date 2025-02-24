import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Divider } from '@mui/material';

interface EditNodeDialogProps {
  isOpen: boolean;
  nodeName: string;
  nodeId: number;
  onSave: (id: number, newName: string) => void;
  onClose: () => void;
  onClick?: (e: React.MouseEvent) => void;
}

const EditNodeDialog: React.FC<EditNodeDialogProps> = ({ isOpen, nodeName, nodeId, onSave, onClose, onClick }) => {
  const [name, setName] = useState(nodeName);

  useEffect(() => {
    setName(nodeName);
  }, [nodeName]);

  return (
    <Dialog open={isOpen} onClose={onClose} onClick={onClick} sx={{ '& .MuiDialog-paper': { width: 500 } }}>
      <DialogTitle>Rename</DialogTitle>
      <Divider/>
      <DialogContent>
        <TextField
          autoFocus
          margin="normal"
          label="Node Name"
          fullWidth
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </DialogContent>
      <Divider/>
      <DialogActions>
        <Button onClick={onClose} variant="outlined">Cancel</Button>
        <Button onClick={() => onSave(nodeId, name)} variant="contained" color="primary">Rename</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditNodeDialog;
