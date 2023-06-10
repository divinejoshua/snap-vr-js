import { React, useEffect, useRef, useState } from 'react'
import ml5 from 'ml5';
import p5 from 'p5';
import ImageHat1 from '../assets/wears/hat-1.png';
import ImageHat2 from '../assets/wears/hat-2.png';
import ImageHat3 from '../assets/wears/hat-3.png';

import ImageGlass1 from '../assets/wears/glass-1.png';
import ImageGlass2 from '../assets/wears/glass-2.png';
import ImageGlass3 from '../assets/wears/glass-3.png';
import ImageGlass4 from '../assets/wears/glass-4.png';
import ImageGlass5 from '../assets/wears/glass-5.png';
import ImageGlass6 from '../assets/wears/glass-6.png';


export default function Canva({itemSelected}) {

    const videoRef = useRef(null);
    const sketchRef = useRef(null);
    const ImageRef = useRef(null);
    const itemNumberRef = useRef(null);

    function createSketch(itemSelected) {

        const videoElement = videoRef.current;
        const sketchElement = sketchRef.current;
        let itemNumberRefN =itemNumberRef.current;

        // Hat Images 
        let ImageHat1Element =ImageRef.current;
        let ImageHat2Element =ImageRef.current;
        let ImageHat3Element =ImageRef.current;
        
        // Glasses Images 
        let ImageGlass1Element =ImageRef.current;
        let ImageGlass2Element =ImageRef.current;
        let ImageGlass3Element =ImageRef.current;
        let ImageGlass4Element =ImageRef.current;
        let ImageGlass5Element =ImageRef.current;
        let ImageGlass6Element =ImageRef.current;
        
        

        // videoElement.style.display = 'none';

        let video; // Video capture
        let poseNet; // PoseNet model

        let leftEyeX = 0; //Left eye position
        let leftEyeY = 0; //Left eye position

        let rightEyeX = 0; //Right eye position
        let rightEyeY = 0; //Right eye position

        const sketch = (context) => {
            let selected = itemSelected
            let canvas;

            context.preload = () => {
                // Load the image file
                ImageHat1Element = context.loadImage(ImageHat1);
                ImageHat2Element = context.loadImage(ImageHat2);
                ImageHat3Element = context.loadImage(ImageHat3);
                ImageGlass1Element = context.loadImage(ImageGlass1);
                ImageGlass2Element = context.loadImage(ImageGlass2);
                ImageGlass3Element = context.loadImage(ImageGlass3);
                ImageGlass4Element = context.loadImage(ImageGlass4);
                ImageGlass5Element = context.loadImage(ImageGlass5);
                ImageGlass6Element = context.loadImage(ImageGlass6);
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

                // Glasses Items s
                if(Number(itemNumberRefN.textContent)===1) {
                    context.image(ImageGlass1Element, ((leftEyeX + rightEyeX) / 2)-110, ((leftEyeY + rightEyeY) / 2)-100, 220, 220);
                }
                if(Number(itemNumberRefN.textContent)===3) {
                    context.image(ImageGlass2Element, ((leftEyeX + rightEyeX) / 2)-110, ((leftEyeY + rightEyeY) / 2)-100, 220, 220);
                }
                if(Number(itemNumberRefN.textContent)===5) {
                    context.image(ImageGlass3Element, ((leftEyeX + rightEyeX) / 2)-110, ((leftEyeY + rightEyeY) / 2)-100, 220, 220);
                }
                if(Number(itemNumberRefN.textContent)===7) {
                    context.image(ImageGlass4Element, ((leftEyeX + rightEyeX) / 2)-110, ((leftEyeY + rightEyeY) / 2)-100, 220, 220);
                }
                if(Number(itemNumberRefN.textContent)===8) {
                    context.image(ImageGlass5Element, ((leftEyeX + rightEyeX) / 2)-110, ((leftEyeY + rightEyeY) / 2)-100, 220, 220);
                }
                if(Number(itemNumberRefN.textContent)===9) {
                    context.image(ImageGlass6Element, ((leftEyeX + rightEyeX) / 2)-110, ((leftEyeY + rightEyeY) / 2)-100, 220, 220);
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
