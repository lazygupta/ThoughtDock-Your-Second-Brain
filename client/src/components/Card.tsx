import { DeleteIcon } from "../icons/DeleteIcon";
import { ShareIcon } from "../icons/ShareIcon";
import { TwitterIcon } from "../icons/TwitterIcon";
import { YouTubeIcon } from "../icons/YoutubeIcon";

interface CardProps {
    title: string,
    link: string,
    type: "twitter" | "youtube"
}

export function Card({ title, link, type }: CardProps) {
    return <div>
        <div className="p-4 bg-white rounded-md border-gray-200 max-w-72 border">
            <div className="flex justify-between">
                <div className="flex items-center text-md font-semibold">
                    <div className="pr-2 text-gray-500 ">
                        {type == "youtube" && <YouTubeIcon size="md" />}
                        {type == "twitter" && <TwitterIcon size="md" />}
                    </div>
                    {title}
                </div>
                <div className="flex items-center">
                    <div className="pr-2 text-gray-500">
                        <a href={link.replace("embed", "watch")} target="_blank">
                            <ShareIcon size="md" />
                        </a>
                    </div>
                    <div className="text-gray-500 cursor-pointer">
                        <DeleteIcon size="md" />
                    </div>
                </div>
            </div>

            {type == "youtube" &&
                <iframe className="w-full pt-4" src={link.replace("watch", "embed")} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>}

            {type == "twitter" && <blockquote className="twitter-tweet">
                <a href={link}></a>
            </blockquote>}

            <div className="flex gap-2 mt-2 text-sm font-semibold ml-2">
                <span className={` text-purple-500 bg-purple-300 rounded-md p-1  `}>
                    #design
                </span>
                <span className={` text-purple-500 bg-purple-300 rounded-md p-1  `}>
                    #productivity
                </span>
            </div>




        </div>
    </div>

}