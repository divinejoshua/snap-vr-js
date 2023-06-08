import { React, useEffect, useRef } from 'react'
import ml5 from 'ml5';
import p5 from 'p5';

export default function Canva() {

    const videoRef = useRef(null);
    const sketchRef = useRef(null);

    function createSketch() {

        const videoElement = videoRef.current;
        const sketchElement = sketchRef.current;

        let video; // Video capture
        let poseNet; // PoseNet model
        let noseX = 0; // X-coordinate of the nose position
        let noseY = 0; // Y-coordinate of the nose position

        const sketch = (p) => {
            let canvas;
    
            p.setup = () => {

                // Get Height and width of the parent element 
                const { offsetWidth, offsetHeight } = sketchElement.parentElement;
                canvas = p.createCanvas(offsetWidth, offsetHeight); //Create the canvas
                video = p.createCapture(p.VIDEO);
                video.size(offsetWidth, offsetHeight);

                // Load the poseNet model  
                poseNet = ml5.poseNet(video, () => {
                    console.log('Model loaded!');
                });
                
                // Locate poses on the camera
                poseNet.on('pose', (poses) => {
                    if (poses.length > 0) {
                    const nose = poses[0].pose.keypoints[0];
                    noseX = nose.position.x;
                    noseY = nose.position.y;
                    }
                });

                video.hide();
            
            };
    
            // Create the virtual element on the camera
            p.draw = () => {
                p.image(video, 0, 0, p.width, p.height);
                p.fill(255, 0, 0);
                p.ellipse(noseX, noseY, 50, 50);
            };
    
        };

         // Initiate p5 
         new p5(sketch, sketchElement);
         console.clear()

    }



    useEffect(() => {
        // Initialize the PoseNet model and p5 sketch
        createSketch()
    }, []);

    

  return (
    <div className='camera-canva bg-gray-200 rounded' style={{ borderRadius: '10px', overflow: 'hidden'}}>
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
