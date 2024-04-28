import { useGetMyCodesQuery, useUpdateUserMutation } from "@/redux/slices/api";
import { Link, useNavigate } from 'react-router-dom';
import { Textarea } from "@/components/ui/textarea"
import { Button } from '@/components/ui/button';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import CodeItem from '@/components/CodeItem';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input";
import { Save } from "lucide-react";
import { handleError } from "@/utils/handleError";
import { updateCurrentUser } from "@/redux/slices/AppSlice";
import { useState } from "react";
import axios from 'axios'

const Profile = () => {

    const navigate = useNavigate()

    const [newUsername, setNewUsername] = useState("")
    const [newBio, setNewBio] = useState("")
    const [avatar, setAvatar] = useState(null)

    const currentUser = useSelector((state: RootState) => state.AppSlice.currentUser)
    const isLoggedIn = useSelector((state: RootState) => state.AppSlice.isLoggedIn)
    const dispatch = useDispatch()

    interface MyCodesItem {
        fullCode: {
            html: string,
            css: string,
            javascript: string
        },
        _id: string,
        title: string,
    }

    //@ts-ignore
    const { data: myCodes } = useGetMyCodesQuery();

    if (!isLoggedIn) {
        navigate("/login")
    };


    async function handleUpdateUser() {

        const form = new FormData()

        form.append("username", newUsername)
        form.append("bio", newBio)
        form.append("avatar", avatar)

        console.log(form)

        const response = await axios.post("http://localhost:4000/auth/update", form, {
            withCredentials: true,
        });
        console.log(response)
        dispatch(updateCurrentUser(response.data))
    }

    return (
        <div className='w-full h-[calc(100dvh-60px)] bg-gray-800 text-white text-2xl font-bold'>
            <div className='w-[800px] bg-black p-4 rounded-lg flex'>
                <div>
                    <img className='w-60 rounded-full' src={`http://localhost:4000/${currentUser?.picture}`} alt="avatar" />
                </div>
                <div>
                    <h2>{currentUser?.username}</h2>
                    <h2>{currentUser?.bio}</h2>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button variant="success" size="icon">
                                <Save size={16} />
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle className="flex gap-1 justify-center items-center">
                                    Save your Code!
                                </DialogTitle>
                            </DialogHeader>
                            <Input value={newUsername} onChange={(e) => setNewUsername(e.target.value)} placeholder="Username" />
                            <Textarea value={newBio} onChange={(e) => setNewBio(e.target.value)} placeholder="Bio" />
                            <Input onChange={(e) => setAvatar(e.target.files[0])} type="file" />
                            <Button onClick={handleUpdateUser}>Обновить</Button>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>
            <div>
                <h2>Ваш код</h2>
                {myCodes?.length !== 0 ? (
                    <div className="p-3 grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-3">
                        {myCodes?.map((item: MyCodesItem) => {
                            return <CodeItem isDelete={true} title={item.title} _id={item._id} />;
                        })}
                    </div>
                ) : (
                    <>
                        <p className="text-center font-mono text-slate-600 p-3">
                            You don't have any saved codes. <Link to="/editor">Create One</Link>
                        </p>
                    </>
                )}
            </div>
        </div>
    )
}

export default Profile