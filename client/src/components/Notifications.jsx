// src/components/Notifications.jsx
import { useContext, useEffect } from "react";
import { Box, Button, useToast, Text } from "@chakra-ui/react";
import { SocketContext } from "../context/Context";

const Notifications = () => {
  const { answerCall, call, callAccepted } = useContext(SocketContext);
  const toast = useToast();

  useEffect(() => {
    if (call.isReceivingCall && !callAccepted) {
      toast({
        position: "top-right", // Changed to top-right to display at the top right corner
        duration: 10000, // Display duration in milliseconds
        isClosable: true,
        render: () => (
          <Box
            color="white"
            p={3}
            bg="teal.500"
            borderRadius="md"
            boxShadow="md"
            display="flex"
            flexDirection="column"
            alignItems="center"
          >
            <Text fontSize="lg" fontWeight="bold">
              {call.name || "Unknown"} is calling you
            </Text>
            <Button mt={2} colorScheme="green" onClick={answerCall}>
              Answer
            </Button>
          </Box>
        ),
      });
    }
  }, [call, callAccepted, answerCall, toast]);

  return null; // No direct rendering on the page
};

export default Notifications;
