// src/components/VideoChat.js
import React, { useState, useEffect, useRef } from 'react';
import { Box } from '@chakra-ui/react';
import Controls from './Controls';

const VideoChat = () => {
  const [isMicOn, setIsMicOn] = useState(true);
  const [isCamOn, setIsCamOn] = useState(true);
  const localStreamRef = useRef(null);

  useEffect(() => {
    // Set up the local media stream
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then(stream => {
        localStreamRef.current.srcObject = stream;
      })
      .catch(error => {
        console.error('Error accessing media devices.', error);
      });
  }, []);

  // Function to toggle microphone
  const toggleMic = () => {
    const audioTracks = localStreamRef.current.srcObject.getAudioTracks();
    if (audioTracks.length > 0) {
      audioTracks[0].enabled = !isMicOn;
      setIsMicOn(!isMicOn);
    }
  };

  // Function to toggle camera
  const toggleCam = () => {
    const videoTracks = localStreamRef.current.srcObject.getVideoTracks();
    if (videoTracks.length > 0) {
      videoTracks[0].enabled = !isCamOn;
      setIsCamOn(!isCamOn);
    }
  };

  return (
    <Box p={4}>
      <video ref={localStreamRef} autoPlay muted playsInline style={{ width: '400px' }} />
      {/* Use the Controls component */}
      <Controls
        isMicOn={isMicOn}
        toggleMic={toggleMic}
        isCamOn={isCamOn}
        toggleCam={toggleCam}
      />
    </Box>
  );
};

export default VideoChat;
