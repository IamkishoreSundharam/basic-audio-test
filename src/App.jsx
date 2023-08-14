import React, { useState, useRef, useEffect } from "react";
import "./index.css";
import AudioAnalyser from "react-audio-analyser";

const App = () => {
  const [status, setStatus] = useState("");
  const [audioSrc, setAudioSrc] = useState(null);
  const [audioType, setAudioType] = useState("audio/wav");
  
const[mediaRecorder,setMediaRecorder]=useState(null)

// function startRecording() { 
//   navigator.mediaDevices
//   .getUserMedia({
//     audio: true,
//     video: false
//   })
//   .then((stream) => {
//     setMediaRecorder(stream);
//     console.log("start", mediaRecorder);
//   });
// } 

const stopWebCam = () => {
  console.log('executing --> stopwebcam function')
  if (mediaRecorder) {
    mediaRecorder.getTracks().forEach((track) => {
      track.stop();
    });
    // mediaRecorder.stop();
    console.log("stop", mediaRecorder);
    setMediaRecorder(null);
  }
};
  
  const controlAudio = (newStatus) => {
    setStatus(newStatus);  
  };

  const changeScheme = (e) => {
    setAudioType(e.target.value);
  };

  const audioProps = {
    audioType,
    status,
    audioSrc,
    timeslice: 1000,
    startCallback: (e) => {
      console.log("succ start", e);
      console.log("PACKAGE STREAMER",e.target.stream);
      setMediaRecorder(e.target.stream);
    },
    pauseCallback: (e) => {
      console.log("succ pause", e);
    },
    stopCallback: (e) => {
      setAudioSrc(window.URL.createObjectURL(e));
      console.log("succ stop", e);
    },
    onRecordCallback: (e) => {
      console.log("recording", e);
    },
    errorCallback: (err) => {
      console.log("error", err);
    }
  };

  // if(status==='recording'){
  //   console.log('recod --> executing startrecording function');
  //   startRecording();
  // }
  // else if(status==='inactive'){
  //   console.log('inactive --> executing stopcallback function');
  //   stopWebCam();
  // }

  return (
    <div>
      <AudioAnalyser {...audioProps}>
        <div className="btn-box">
          {status !== "recording" && (
            <button
              className="iconfont icon-start"
              title="开始"
              onClick={() => controlAudio("recording")}
            >
              start
            </button>
          )}
          {status === "recording" && (
            <button
              className="iconfont icon-pause"
              title="暂停"
              onClick={() => controlAudio("paused")}
            >
              pause
            </button>
          )}
          <button
            className="iconfont icon-stop"
            title="停止"
            onClick={() => controlAudio("inactive")}
          >
            END
          </button>
        </div>
      </AudioAnalyser>
          {/* <button onClick={()=>startRecording()}>
            start mic
          </button> */}
          <button onClick={()=>stopWebCam()}>
            END MIC
          </button>
      <p>choose output type</p>
      <select
        name=""
        id=""
        onChange={(e) => changeScheme(e)}
        value={audioType}
      >
        <option value="audio/webm">audio/webm</option>
        <option value="audio/wav">audio/wav</option>
        <option value="audio/mp3">audio/mp3</option>
      </select>
    </div>
  );
};

export default App;
