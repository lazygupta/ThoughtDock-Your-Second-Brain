import { useRef, useState } from "react";
import { CrossIcon } from "../icons/CrossIcon";
import Input from "./Input";
import { Button } from "./ui/Button";
import { BACKEND_URL } from "../config/config";
import axios from "axios";

enum ContentType {
    Youtube = "youtube",
    Twitter = "twitter"
}

interface CreateContentModalProps {
    open: boolean;
    onClose: () => void;
  };

export function CreateContentModal({ open, onClose }: CreateContentModalProps ) {
    const titleRef = useRef<HTMLInputElement>();
    const linkRef = useRef<HTMLInputElement>();
    const [type, setType] = useState(ContentType.Youtube)

    async function uponSubmitting () {
        const title = titleRef.current?.value;
        const link= linkRef.current?.value;
    
        await axios.post(BACKEND_URL+"/api/v1/content" ,{
            title,
            link,
            type
        },{
            headers:{
                "authorization": localStorage.getItem("authorization")
            }
        })

        onClose();
    }


    return <div>
        {open && <div>
            <div className="w-screen h-screen bg-slate-500 fixed top-0 left-0 opacity-60 flex justify-center">
            </div>
            <div className="w-screen h-screen fixed top-0 left-0 flex justify-center" >
                <div className="flex flex-col justify-center items-center">
                    <span className="bg-white p-4 fixed rounded">
                        <div className="flex justify-end">
                            <div onClick={onClose} className="cursor-pointer">
                                <CrossIcon />
                            </div>
                        </div>
                        <div>
                            <Input placeholder="Title" type="text" reference={titleRef}/>
                            <Input placeholder="Link" type="text" reference={linkRef}/>
                            <div className="flex justify-center font-medium pb-2">
                                Types
                            </div>
                            <div className="flex gap-4 justify-center pb-4">
                                <Button variant={type == ContentType.Youtube ? "primary" : "secondary"} size="sm" text="Youtube" onClick={() => {
                                    setType(ContentType.Youtube)
                                }} />
                                <Button variant={type == ContentType.Twitter ? "primary" : "secondary"} size="sm" text="Twitter" onClick={() => {
                                    setType(ContentType.Twitter)
                                }} />
                            </div>
                        </div>

                        <div className="flex justify-center">
                            <Button variant="primary" text="Submit" size="md" onClick={uponSubmitting}/>
                        </div>
                    </span>
                </div>
            </div>
        </div>}

    </div>
}
