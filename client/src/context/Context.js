import { createContext, useState, useRef, useEffect } from 'react';
import { io } from 'socket.io-client';
import Peer from 'simple-peer';

const SocketContext = createContext();
const socket = io('http://localhost:8080');

const ContextProvider = ({ children }) => {
    const [callAccepted, setCallAccepted] = useState(false);
    const [callEnded, setCallEnded] = useState(false);
    const [stream, setStream] = useState();
    const [name, setName] = useState('');
    const [call, setCall] = useState({});
    const [me, setMe] = useState('');
    const myVideo = useRef(null);
    const userVideo = useRef(null);
    const connectionRef = useRef();
    
    useEffect(() => {
        navigator.mediaDevices.getUserMedia({ video: true, audio: true })
        .then((currentStream) => {
            setStream(currentStream);
            if (myVideo.current) {
                myVideo.current.srcObject = currentStream;
            }
        });
        
        socket.on('me', (id) => setMe(id));
        socket.on('callUser', ({ from, name: callerName, signal }) => {
            setCall({ isReceivingCall: true, from, name: callerName, signal });
        });
    }, []);
    
    const answerCall = () => {
        setCallAccepted(true);
        const peer = new Peer({ initiator: false, trickle: false, stream });
        peer.on('signal', (data) => {
            socket.emit('answerCall', { signal: data, to: call.from });
        });
        peer.on('stream', (currentStream) => {
            userVideo.current.srcObject = currentStream;
        });
        peer.signal(call.signal);
        connectionRef.current = peer;
    };
    
const callUser = (id) => {
    console.log("Calling user with ID:", id); // Log the ID being called

    const peer = new Peer({ initiator: true, trickle: false, stream });
    
    peer.on('signal', (data) => {
        console.log("Emitting callUser with data:", data); // Log the signal data
        socket.emit('callUser', { userToCall: id, signalData: data, from: me, name });
    });
    
    peer.on('stream', (currentStream) => {
        console.log("Received user stream"); // Log when user stream is received
        if (userVideo.current) {
            userVideo.current.srcObject = currentStream;
        }
    });
    
    socket.on('callAccepted', (signal) => {
        console.log("Call accepted with signal:", signal); // Log when the call is accepted
        setCallAccepted(true);
        peer.signal(signal);
    });
    
    connectionRef.current = peer;
};

    
    const leaveCall = () => {
        setCallEnded(true);
        connectionRef.current.destroy();
        window.location.reload();
    };
    
    return (
        <SocketContext.Provider value={{
            call,
            callAccepted,
            myVideo,
            userVideo,
            stream,
            name,
            setName,
            callEnded,
            me,
            callUser,
            leaveCall,
            answerCall,
        }}
        >
            {children}
        </SocketContext.Provider>
    );
};

export { ContextProvider, SocketContext };