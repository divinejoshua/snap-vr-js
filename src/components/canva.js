import { React, useEffect, useRef, useState } from 'react'
import ml5 from 'ml5';
import p5 from 'p5';
import ImageHat1 from '../assets/wears/hat-1.png';
import ImageHat2 from '../assets/wears/hat-2.png';
import ImageHat3 from '../assets/wears/hat-3.png';


export default function Canva({itemSelected}) {

    const videoRef = useRef(null);
    const sketchRef = useRef(null);
    const ImageRef = useRef(null);
    const itemNumberRef = useRef(null);

    function createSketch(itemSelected) {

        const videoElement = videoRef.current;
        const sketchElement = sketchRef.current;
        let ImageHat1Element =ImageRef.current;
        let ImageHat2Element =ImageRef.current;
        let ImageHat3Element =ImageRef.current;
        let itemNumberRefN =itemNumberRef.current;
        

        // videoElement.style.display = 'none';

        let video; // Video capture
        let poseNet; // PoseNet model

        let leftEyeX = 0; //Forehead position
        let leftEyeY = 0; //Forehead position

        let rightEyeX = 0; //Forehead position
        let rightEyeY = 0; //Forehead position

        const sketch = (context) => {
            let selected = itemSelected
            let canvas;

            context.preload = () => {
                // Load the image file
                ImageHat1Element = context.loadImage(ImageHat1);
                ImageHat2Element = context.loadImage(ImageHat2);
                ImageHat3Element = context.loadImage(ImageHat3);
              };
    
            context.setup = () => {

                // Get Height and width of the parent element 
                const { offsetWidth, offsetHeight } = sketchElement.parentElement;
                canvas = context.createCanvas(offsetWidth, offsetHeight); //Create the canvas
                video = context.createCapture(context.VIDEO);
                video.size(offsetWidth, offsetHeight);

                // Load the poseNet model  
                poseNet = ml5.poseNet(video, () => {
                    // console.log('Model loaded!');
                });
                
                // Locate poses on the camera
                poseNet.on('pose', (poses) => {
                    if (poses.length > 0) {
                        // Get right Eye positions 
                        const rightEye = poses[0].pose.keypoints[1];
                        rightEyeX = rightEye.position.x;
                        rightEyeY = rightEye.position.y;

                         // Get left Eye positions 
                        const leftEye = poses[0].pose.keypoints[2];
                        leftEyeX = leftEye.position.x;
                        leftEyeY = leftEye.position.y;
                    }
                });

                video.hide();
            
            };
    
            // Create the virtual element on the camera
            context.draw = () => { 
                context.image(video, 0, 0, context.width, context.height);

                // Accessory wear 
                // itemSelected

                // Hat Items 
                if(Number(itemNumberRefN.textContent)===2) {
                    context.image(ImageHat1Element, ((leftEyeX + rightEyeX) / 2)-110, ((leftEyeY + rightEyeY) / 2)-200, 220, 220);
                }
                if(Number(itemNumberRefN.textContent)===4) {
                    context.image(ImageHat2Element, ((leftEyeX + rightEyeX) / 2)-110, ((leftEyeY + rightEyeY) / 2)-200, 220, 220);
                }
                if(Number(itemNumberRefN.textContent)===6) {
                    context.image(ImageHat3Element, ((leftEyeX + rightEyeX) / 2)-110, ((leftEyeY + rightEyeY) / 2)-200, 220, 220);
                }
            };
    
        };

         // Initiate p5 
         new p5(sketch, sketchElement);
        //  console.clear()

    }



   
        
    useEffect(() => {
        // Initialize the PoseNet model and p5 sketch
        createSketch(itemSelected)
    }, [itemSelected]);

    

  return (
    <div className='camera-canva bg-gray-200 rounded' style={{ borderRadius: '10px', overflow: 'hidden'}}>
         <video ref={videoRef} style={{
            display: 'none',
            maxWidth: '100%',
            maxHeight: '400px',
            objectFit: 'contain',
            aspectRatio: '2/3',
  }} />
        <div ref={sketchRef}/>

        <p ref={itemNumberRef}>{itemSelected}</p>
        {/* <img ref={ImageRef} src={ImageHat1} alt="Nose" style={{ display: 'none' }} /> */}
    </div>
    

  )
}
