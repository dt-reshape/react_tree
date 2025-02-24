import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, Divider } from '@mui/material';

interface DeleteConfirmProps {
  isOpen: boolean;
  nodeName: string;
  nodeId: number;
  onConfirm: (id: number) => void;
  onClose: () => void;
  onClick?: (e: React.MouseEvent) => void;
}

const DeleteNodeDialog: React.FC<DeleteConfirmProps> = ({ isOpen, nodeName, nodeId, onConfirm, onClose, onClick }) => {
  return (
    <Dialog open={isOpen} onClose={onClose} onClick={onClick} sx={{ '& .MuiDialog-paper': { width: 500 } }}>
      <DialogTitle>Delete</DialogTitle>
      <Divider/>
      <DialogContent>
        <DialogContentText>
          Do you want to delete "{nodeName}"?
        </DialogContentText>
      </DialogContent>
      <Divider/>
      <DialogActions>
        <Button onClick={onClose} variant="outlined">Cancel</Button>
        <Button onClick={() => onConfirm(nodeId)} variant="outlined" color="secondary">Delete</Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteNodeDialog;
