import axios from "axios"
import { BACKEND_URL } from "../config/config"
import { CopyIcon } from "../icons/CopyIcon"
import { CrossIcon } from "../icons/CrossIcon"
import { Button } from "./ui/Button"

interface ShareModalProps {
    open: boolean,
    onClose: () => void
}

export  function ShareModal({ open, onClose }: ShareModalProps) {

    async function share () {
        const response = await axios.post(BACKEND_URL+"/api/v1/brain/share" ,{
            share: true
        },{
            headers:{
                "authorization": localStorage.getItem("authorization")
            }
        })

        // @ts-ignore
        const hash = await response.data?.hash

        alert(BACKEND_URL+"/api/v1/brain/share"+`/${hash}`)
    }
    return <div>
        {open && <div>
            <div className="w-screen h-screen bg-slate-500 fixed top-0 left-0 opacity-60 flex justify-center">
            </div>
            <div className="w-screen h-screen fixed top-0 left-0 flex justify-center" >
                <div className="flex flex-col justify-center items-center ">
                    <span className="bg-white p-4 fixed rounded-2xl">
                        <div className="flex justify-between max-w-96 items-center">
                            <div className="font-bold">
                                Share Your Second Brain
                            </div>
                            <div onClick={onClose} className="cursor-pointer">
                                <CrossIcon />
                            </div>
                        </div>
                        <div className="max-w-96 pt-6 font-light">
                            Share your entire collection of notes,documents, tweets, and videos with others. They'll be able to import your content into their own Thought Dock.
                            
                        </div>
                        <div className="flex justify-between items-center ">
                           <Button variant="share" text="Share Now" size="share" startIcon={<CopyIcon/>} onClick={share}/> 
                        </div>
                    </span>
                </div>
            </div>
        </div>}
    </div>
}