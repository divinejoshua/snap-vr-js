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

    // Define the p5 sketch
    const sketch = (p) => {
      // Setup function is called once at the beginning
      p.setup = () => {
        p.createCanvas(600,500);
        video = p.createCapture(p.VIDEO)
        video.size(600, 500)

        let poseNet = ml5.poseNet(video); 
        // Listen to new 'pose' events
        poseNet.on('pose', (poses) => {
            if (poses.length > 0) {
                const nose = poses[0].pose.keypoints[0];
                noseX = nose.position.x; // Update the nose X-coordinate
                noseY = nose.position.y; // Update the nose Y-coordinate
              }
          });
                    
        video.hide()
      };

      // Draw function is called repeatedly to update the canvas
      p.draw = () => {
        p.image(video, 0, 0, p.width, p.height); // Display the video feed
        p.fill(255, 0, 0); // Set the fill color to red
        p.ellipse(noseX, noseY, 50, 50); // Draw a red ellipse representing the nose
      };
    };

    new p5(sketch, sketchElement); // Create the p5 sketch using the provided function and DOM element reference

        // Cleanup function
    return () => {
            // video.hide(); // Hide the video element
            // poseNet.removeAllListeners(); // Remove all event listeners
            // p5.prototype.remove(sketchElement); // Remove the p5 sketch
        };
    }, []);


  return (
    <div className='camera-canva bg-gray-200 rounded'>
         <video ref={videoRef} style={{ display: 'none' }} />
        <div ref={sketchRef} />
    </div>
  )
}
