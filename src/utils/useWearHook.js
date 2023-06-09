import { useState } from "react";

const useWears = () => {

    // STATES 
    const [accessoryList, setaccessoryList] = useState([
        { name: 'https://wearkit-vr.brimble.app/wears/none.jpg', id: 0, type: 'glasses'},
        { name: 'https://wearkit-vr.brimble.app/wears/glass-1.jpg', id: 1, type: 'glasses' },
        { name: 'https://wearkit-vr.brimble.app/wears/hat-1.jpg', id: 2, type: 'hat'},
        { name: 'https://wearkit-vr.brimble.app/wears/glass-2.jpg', id: 3, type: 'glasses' },
        { name: 'https://wearkit-vr.brimble.app/wears/hat-2.jpg', id: 4, type: 'hat' },
        { name: 'https://wearkit-vr.brimble.app/wears/glass-3.jpg', id: 5, type: 'glasses' },
        { name: 'https://wearkit-vr.brimble.app/wears/hat-3.jpg', id: 6, type: 'hat' },
        { name: 'https://wearkit-vr.brimble.app/wears/glass-4.jpg', id: 7, type: 'glasses'},
        { name: 'https://wearkit-vr.brimble.app/wears/glass-5.jpg', id: 8, type: 'glasses'},
        { name: 'https://wearkit-vr.brimble.app/wears/glass-6.jpg', id: 9, type: 'glasses' },
    ]);

    const [active, setactive] = useState(0);

    // function


    return {accessoryList, active, setactive};
}
 
export default useWears;