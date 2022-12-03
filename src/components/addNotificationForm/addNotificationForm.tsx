import React, {ChangeEvent, SyntheticEvent, useState, FC} from 'react';
import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from '@mui/material';

import {NotificationType} from '../../reducers/notifications/notifications';
import {notificationsService} from '../../services/notifications';

type PropsType = {
  onSubmit: () => void;
};

const selectItems: Array<NotificationType> = [
  'warning',
  'error',
  'info',
  'success',
];

export const AddNotificationForm: FC<PropsType> = ({onSubmit}) => {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [type, setType] = useState(selectItems[0]);

  const onFormSubmit = (
    event: SyntheticEvent<HTMLFormElement, SubmitEvent>,
  ) => {
    event.preventDefault();

    notificationsService.add({
      title,
      text,
      type,
      date: new Date().toISOString(),
      viewsCount: 0,
    });

    onSubmit();
  };

  const handleSelectTypeChange = (event: SelectChangeEvent) => {
    // TODO solve the dangerous cast
    setType(event.target.value as NotificationType);
  };
  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };
  const handleTextChange = (event: ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  return (
    <Box
      maxWidth={400}
      bgcolor="white"
      component="form"
      onSubmit={onFormSubmit}
      padding={2}
      borderRadius={1}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            onChange={handleTitleChange}
            name="title"
            required
            fullWidth
            id="title"
            label="Title"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            onChange={handleTextChange}
            required
            fullWidth
            id="text"
            label="Text"
            name="text"
            multiline
            rows={3}
          />
        </Grid>
        <Grid item xs={5} display="flex">
          <FormControl fullWidth>
            <InputLabel id="select-type">Type</InputLabel>
            <Select
              labelId="select-type"
              value={type}
              label="Type"
              onChange={handleSelectTypeChange}>
              {selectItems.map(item => (
                <MenuItem key={item} value={item}>
                  {item}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <Button type="submit" fullWidth variant="contained" sx={{mt: 3, mb: 2}}>
        Create
      </Button>
    </Box>
  );
};
