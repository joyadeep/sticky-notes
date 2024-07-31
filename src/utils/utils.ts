const autoGrow = (inputRef:React.MutableRefObject<any>)=>{

    const {current} = inputRef;
    current.style.height = "auto";
    current.style.height = current.scrollHeight + "px";

}

const setZindex = (cardRef:React.MutableRefObject<any>)=>{
    cardRef.current.style.zIndex = 999;
}

const setNewOffset = (cardRef:React.MutableRefObject<any>,mouseMoveDir={x:0,y:0},windowWidth?:number,windowHeight?:number,width?:number) => {
    let offsetLeft = cardRef.current.offsetLeft - mouseMoveDir.x
    let offsetTop = cardRef.current.offsetTop - mouseMoveDir.y


    if (width && windowHeight && windowWidth) {
        if (offsetLeft + width > windowWidth) {
            offsetLeft = windowWidth - width
        }
        if (offsetTop + cardRef.current.offsetHeight > (windowHeight-56)){
            offsetTop = windowHeight - cardRef.current.offsetHeight -56
        }
    }
    return {
        x: offsetLeft < 0 ? 0 : offsetLeft,
        y: offsetTop < 0 ? 0 : offsetTop
    }
}

const bodyParser = (body:any)=>{
    try {
        return JSON.parse(body);
    } catch (error) {
        return body;
    }
  }

export {autoGrow,setZindex,setNewOffset,bodyParser}