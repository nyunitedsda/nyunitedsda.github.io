import { Box, Button, Card, CardActions, CardContent, Paper, Stack, type SxProps, TextField, type Theme, useMediaQuery, useTheme } from '@mui/material';
import { type FC, useCallback, useMemo } from 'react';

const contentSx: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  gap: 2,
}

const nameSx: SxProps<Theme> = {
  width: '100%',
  gap: 2,
}

const rootSx: SxProps<Theme> = {
  p: 2
}

const actionSx: SxProps<Theme> = {
  display: 'flex',
  justifyContent: 'flex-end',
  width: '100%'
}

const SEND_MESSAGE = 'Send Message';

const ContactForm: FC = () => {

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const direction = useMemo(() => isMobile ? 'column' : 'row', []);

  const handleBtnClick = useCallback(() => { }, []);

  return (
      <Card sx={rootSx}>
        <CardContent sx={contentSx}>
          <Stack
            direction={direction}
            sx={nameSx}
            useFlexGap
            spacing={2}
          >
            <TextField
              label='First Name'
              name='firstName'
              sx={{ width: { xs: '100%', md: '50%' } }}
              type='text'
            // onChange={}
            // value={}
            />
            <TextField
              label='Last Name'
              name='lastName'
              sx={{ width: { xs: '100%', md: '50%' } }}
              type='text'
            // onChange={}
            // value={}
            />
          </Stack>
          <TextField
            fullWidth
            label='Email'
            name='email'
            type='email'

          // onChange={}
          // value={}
          />
          <TextField
            fullWidth
            label='Subject'
            name='subject'
            type='text'
          // onChange={}
          // value={}
          />
          <TextField
            fullWidth
            label='Message'
            minRows={3}
            multiline
            name='message'
            type='text'
          // onChange={}
          // value={}
          />


        </CardContent>
        <CardActions sx={actionSx}>
          <Button
            color='primary'
            onClick={handleBtnClick}
            variant='contained'
          >
            {SEND_MESSAGE}
          </Button >
        </CardActions>
      </Card>    
  )
};

export default ContactForm;
