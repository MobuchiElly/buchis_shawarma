import { useState, useEffect } from "react";

const useBodyScroll = () => {
    const [mscroll, setMscroll] = useState(false);

    useEffect(() => {
    document.body.style.overflowY = mscroll ? 'hidden' : 'auto';
    }, [mscroll]);

    const hideScroll = () => setMscroll(false);
    const showScroll = () => setMscroll(true); 

    return [mscroll, hideScroll, showScroll];
    
}


export default useBodyScroll;