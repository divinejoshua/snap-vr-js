import { React, useEffect, useRef } from 'react'
import ml5 from 'ml5';
import p5 from 'p5';

export default function Canva() {

    const videoRef = useRef(null);
    const sketchRef = useRef(null);
 // Initialize the PoseNet model and p5 sketch
 useEffect(() => {
    const videoElement = videoRef.current;
    const sketchElement = sketchRef.current;

    let video; // Video capture
    let poseNet; // PoseNet model
    let noseX = 0; // X-coordinate of the nose position
    let noseY = 0; // Y-coordinate of the nose position

    const sketch = (p) => {
        let canvas;
  
        p.setup = () => {
          const { offsetWidth, offsetHeight } = sketchElement.parentElement;
          canvas = p.createCanvas(offsetWidth, offsetHeight);
          video = p.createCapture(p.VIDEO);
          video.size(offsetWidth, offsetHeight);
          video.hide();
          poseNet = ml5.poseNet(video, () => {
            console.log('Model loaded!');
          });
          poseNet.on('pose', (poses) => {
            if (poses.length > 0) {
              const nose = poses[0].pose.keypoints[0];
              noseX = nose.position.x;
              noseY = nose.position.y;
            }
          });
        };
  
        p.draw = () => {
          p.image(video, 0, 0, p.width, p.height);
          p.fill(255, 0, 0);
          p.ellipse(noseX, noseY, 50, 50);
        };
  
        p.windowResized = () => {
          const { offsetWidth, offsetHeight } = videoElement.parentElement;
          p.resizeCanvas(offsetWidth, offsetHeight);
          video.size(offsetWidth, offsetHeight);
        };
      };
  
      new p5(sketch, sketchElement);
  
      return () => {
        video.hide();
        poseNet.removeAllListeners();
        p5.prototype.remove(sketchElement);
      };
    }, []);

    

  return (
    <div className='camera-canva bg-gray-200 rounded' style={{ borderRadius: '10px', overflow: 'hidden' }}>
         <video ref={videoRef} style={{
            display: 'none',
            maxWidth: '100%',
            maxHeight: '400px',
            objectFit: 'contain',
            aspectRatio: '2/3',
  }} />
        <div ref={sketchRef} />
    </div>
  )
}
