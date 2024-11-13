// src/components/Controls.js
import React from 'react';
import { Button, Box } from '@chakra-ui/react';
import { FaMicrophone, FaMicrophoneSlash, FaVideo, FaVideoSlash } from 'react-icons/fa';

const Controls = ({ isMicOn, toggleMic, isCamOn, toggleCam }) => {
  return (
    <Box mt={4}>
      {/* Microphone Toggle Button */}
      <Button onClick={toggleMic} leftIcon={isMicOn ? <FaMicrophone /> : <FaMicrophoneSlash />}>
        {isMicOn ? 'Mute Mic' : 'Unmute Mic'}
      </Button>

      {/* Camera Toggle Button */}
      <Button onClick={toggleCam} leftIcon={isCamOn ? <FaVideo /> : <FaVideoSlash />} ml={4}>
        {isCamOn ? 'Turn Off Cam' : 'Turn On Cam'}
      </Button>
    </Box>
  );
};

export default Controls;
