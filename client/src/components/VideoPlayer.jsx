// src/components/VideoPlayer.jsx
import { Grid, Box, Heading } from "@chakra-ui/react";
import { useContext, useState } from "react";
import { SocketContext } from "../context/Context";
import Controls from "./Controls"; // Import the Controls component

const VideoPlayer = () => {
  const { name, callAccepted, myVideo, userVideo, callEnded, stream, call } =
    useContext(SocketContext);
  const [isMicOn, setIsMicOn] = useState(true);
  const [isCamOn, setIsCamOn] = useState(true);

  // Function to toggle microphone
  const toggleMic = () => {
    if (stream) {
      const audioTracks = stream.getAudioTracks();
      if (audioTracks.length > 0) {
        audioTracks[0].enabled = !isMicOn;
        setIsMicOn(!isMicOn);
      }
    }
  };

  // Function to toggle camera
  const toggleCam = () => {
    if (stream) {
      const videoTracks = stream.getVideoTracks();
      if (videoTracks.length > 0) {
        videoTracks[0].enabled = !isCamOn;
        setIsCamOn(!isCamOn);
      }
    }
  };

  return (
    <Grid justifyContent="center" templateColumns="repeat(2, 1fr)" mt="12">
      {/* My video */}
      {stream && (
        <Box>
          <Grid colSpan={1}>
            <Heading as="h5">{name || "Name"}</Heading>
            <video playsInline muted ref={myVideo} autoPlay width="600" />
          </Grid>
        </Box>
      )}

      {/* User's video */}
      {callAccepted && !callEnded && (
        <Box>
          <Grid colSpan={1}>
            <Heading as="h5">{call.name || "Name"}</Heading>
            <video playsInline ref={userVideo} autoPlay width="600" />
          </Grid>
        </Box>
      )}

      {/* Controls for Microphone and Camera */}
      <Controls
        isMicOn={isMicOn}
        toggleMic={toggleMic}
        isCamOn={isCamOn}
        toggleCam={toggleCam}
      />
    </Grid>
  );
};

export default VideoPlayer;
