import { Code, Trash2 } from 'lucide-react'
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Link } from 'react-router-dom'

interface CodeItemProps {
    title: string,
    _id?: string,
    owner?: Object,
}

const CodeItem = ({ title, _id, owner }: CodeItemProps) => {

    return (
        <div className="p-3 rounded cursor-pointer bg-slate-900 flex justify-start items-center flex-col gap-3">
            <Link to={`/editor/${_id}`}>
                <div className="__top flex justify-start items-start gap-3 w-full">
                    <Code />
                    <p className="font-mono font-bold text-lg">{title}</p>
                </div>
            </Link>
            <Separator />
            {owner && (
                <div className="flex items-center gap-x-3 justify-end">
                    <Avatar>
                        <AvatarImage src={`http://localhost:4000/${owner?.picture}`} />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <Link to={`/user/${owner?._id}`} className=" text-gray-500 text-center">
                        {owner?.username}
                    </Link>
                </div>
            )}
        </div>
    )
}

export default CodeItem