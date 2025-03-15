import { useState } from 'react';
import { Popover, Input, Button } from '@mui/material';

interface AddLinkPopoverProps {
  anchorEl: HTMLElement | null;
  onClose: () => void;
  onLinkAdd: (link: string) => void;
}

const AddLinkPopover: React.FC<AddLinkPopoverProps> = ({ anchorEl, onClose, onLinkAdd }) => {
  const [link, setLink] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLink(event.target.value);
  };

  const handleAddLink = () => {
    onLinkAdd(link);
    onClose();
  };

  return (
    <Popover
      open={Boolean(anchorEl)}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
    >
      <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <Input
          placeholder="Enter link"
          value={link}
          onChange={handleInputChange}
          fullWidth
        />
        <Button variant="contained" color="primary" onClick={handleAddLink}>
          Add Link
        </Button>
      </div>
    </Popover>
  );
};

export default AddLinkPopover;