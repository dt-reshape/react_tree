import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Divider } from '@mui/material';

interface AddNodeDialogProps {
  isOpen: boolean;
  parentId: number;
  onAdd: (parentId: number, newName: string) => void;
  onClose: () => void;
  onClick?: (e: React.MouseEvent) => void;
}

const AddNodeDialog: React.FC<AddNodeDialogProps> = ({ isOpen, parentId, onAdd, onClose, onClick }) => {
  const [name, setName] = useState('');

  const handleAdd = () => {
    onAdd(parentId, name);
    setName('');
  };

  return (
    <Dialog open={isOpen} onClose={onClose} onClick={onClick} sx={{ '& .MuiDialog-paper': { width: 500 } }}>
      <DialogTitle>Add</DialogTitle>
      <Divider/>
      <DialogContent>
        <TextField
          autoFocus
          label="Node Name"
          fullWidth
          margin={'normal'}
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </DialogContent>
      <Divider/>
      <DialogActions>
        <Button onClick={onClose} variant="outlined">Cancel</Button>
        <Button onClick={handleAdd} variant="contained" color="primary">Add</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddNodeDialog;
